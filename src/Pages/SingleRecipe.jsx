import React, { useContext, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { recepiecontext } from '../context/RecipesContext'

const CATEGORIES = [
  { value: 'breakfast', label: '🥞 Breakfast' },
  { value: 'lunch',     label: '🥗 Lunch' },
  { value: 'dinner',    label: '🍲 Dinner' },
  { value: 'desserts',  label: '🍰 Desserts' },
  { value: 'drinks',    label: '🍹 Drinks' },
  { value: 'snacks',    label: '🥨 Snacks' },
]

const CAT_STYLE = {
  breakfast: { bg: '#FFF0D6', color: '#C97B22' },
  lunch:     { bg: '#E8F5E9', color: '#5A8A3C' },
  dinner:    { bg: '#FCE4EC', color: '#C2185B' },
  desserts:  { bg: '#EDE7F6', color: '#6A1B9A' },
  drinks:    { bg: '#E3F2FD', color: '#1565C0' },
  snacks:    { bg: '#FFF3E0', color: '#E65100' },
}

function playSuccessSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const notes = [523.25, 659.25, 783.99]
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain); gain.connect(ctx.destination)
      osc.type = 'sine'; osc.frequency.value = freq
      const start = ctx.currentTime + i * 0.12
      gain.gain.setValueAtTime(0, start)
      gain.gain.linearRampToValueAtTime(0.2, start + 0.04)
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.3)
      osc.start(start); osc.stop(start + 0.35)
    })
  } catch (_) {}
}

function Section({ title, children }) {
  return (
    <div className="bg-white rounded-3xl border border-[#EDE0D4] p-6 shadow-sm space-y-3">
      <h3 className="text-base font-bold text-[#1A1A1A]">{title}</h3>
      {children}
    </div>
  )
}

function SingleRecipe() {
  const { data, setData } = useContext(recepiecontext)
  const params   = useParams()
  const navigate = useNavigate()

  const recipe = data.find((item) => item.id === params.id)

  /* ── Favourites ── */
  const [favourite, setFavourite] = useState(
    () => JSON.parse(localStorage.getItem('fav')) || []
  )
  const isFav = favourite.some((f) => f.id === recipe?.id)

  const favHandler = () => {
    const updated = [...favourite, recipe]
    setFavourite(updated)
    localStorage.setItem('fav', JSON.stringify(updated))
    toast.success('❤️ Added to favourites!')
  }
  const unfavHandler = () => {
    const updated = favourite.filter((f) => f.id !== recipe?.id)
    setFavourite(updated)
    localStorage.setItem('fav', JSON.stringify(updated))
    toast.info('💔 Removed from favourites')
  }

  /* ── Edit form ── */
  const [editOpen, setEditOpen] = useState(false)
  const [preview,  setPreview]  = useState(recipe?.image || '')

  const { register, handleSubmit } = useForm({
    defaultValues: {
      image:        recipe?.image        || '',
      title:        recipe?.title        || '',
      description:  recipe?.description  || '',
      Ingridients:  recipe?.Ingridients  || '',
      Instructions: recipe?.Instructions || '',
      category:     recipe?.category     || '',
      cookTime:     recipe?.cookTime     || '',
    },
  })

  /* ── Not found ── */
  if (!recipe) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center" style={{ background: '#FFFBF5' }}>
        <div className="text-6xl mb-4">🍽️</div>
        <h1 className="text-3xl font-black text-[#1A1A1A] mb-2" style={{ fontFamily:"'Playfair Display',serif" }}>
          Recipe not found
        </h1>
        <Link to="/recipes" className="mt-4 text-[#E85D26] font-bold hover:underline">← Back to Recipes</Link>
      </main>
    )
  }

  /* ── Update ── */
  const onUpdate = (updated) => {
    const idx      = data.findIndex((item) => item.id === params.id)
    const copyData = [...data]
    copyData[idx]  = { ...copyData[idx], ...updated }
    setData(copyData)
    localStorage.setItem('recipes', JSON.stringify(copyData))
    playSuccessSound()
    toast.success('✅ Recipe updated!')
    setEditOpen(false)
  }

  /* ── Delete ── */
  const deleteHandler = () => {
    if (!window.confirm('Delete this recipe? This cannot be undone.')) return
    const filtered = data.filter((item) => item.id !== params.id)
    setData(filtered)
    localStorage.setItem('recipes', JSON.stringify(filtered))
    toast.success('🗑️ Recipe deleted')
    navigate('/recipes')
  }

  const cat = CAT_STYLE[recipe.category] || { bg: '#F5F5F5', color: '#555' }

  /* ── Render ingredient lines ── */
  const ingredientLines = (recipe.Ingridients || '').split('\n').filter(Boolean)
  const instructionLines = (recipe.Instructions || '').split('\n').filter(Boolean)

  return (
    <main
      className="min-h-screen pt-24 pb-20 px-4"
      style={{ fontFamily: "'DM Sans', sans-serif", background: '#FFFBF5' }}
    >
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <div className="max-w-4xl mx-auto space-y-6">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[#9A7B6E]">
          <Link to="/" className="hover:text-[#E85D26] transition-colors">Home</Link>
          <span>/</span>
          <Link to="/recipes" className="hover:text-[#E85D26] transition-colors">Recipes</Link>
          <span>/</span>
          <span className="text-[#1A1A1A] font-medium truncate max-w-xs">{recipe.title}</span>
        </div>

        {/* Hero Card */}
        <div className="bg-white rounded-3xl border border-[#EDE0D4] overflow-hidden shadow-md">
          {/* Image / placeholder */}
          <div
            className="w-full h-64 md:h-80 flex items-center justify-center text-8xl"
            style={{ background: cat.bg }}
          >
            {recipe.image
              ? <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
              : <span>🍽️</span>
            }
          </div>

          <div className="p-6 md:p-8">
            {/* Meta row */}
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="text-xs font-bold px-3 py-1.5 rounded-full capitalize" style={{ background: cat.bg, color: cat.color }}>
                {recipe.category || 'General'}
              </span>
              {recipe.cookTime && (
                <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-[#F5F5F0] text-[#3D2B1F]">
                  ⏱ {recipe.cookTime}
                </span>
              )}
            </div>

            <h1
              className="text-3xl md:text-4xl font-black text-[#1A1A1A] mb-3 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {recipe.title}
            </h1>
            <p className="text-[#6B4C3B] text-base leading-relaxed mb-6">{recipe.description}</p>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={isFav ? unfavHandler : favHandler}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                  isFav
                    ? 'bg-red-50 text-red-500 border border-red-200 hover:bg-red-100'
                    : 'bg-[#FFF0E0] text-[#E85D26] border border-[#F5D5BE] hover:bg-[#FFE4CC]'
                }`}
              >
                {isFav ? '💔 Remove Favourite' : '❤️ Add to Favourites'}
              </button>
              <button
                onClick={() => setEditOpen(!editOpen)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold bg-[#F5F5F0] text-[#3D2B1F] border border-[#EDE0D4] hover:border-[#E85D26] hover:text-[#E85D26] transition-all duration-300"
              >
                ✏️ {editOpen ? 'Close Edit' : 'Edit Recipe'}
              </button>
              <button
                onClick={deleteHandler}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold bg-red-50 text-red-500 border border-red-200 hover:bg-red-100 transition-all duration-300"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        </div>

        {/* Ingredients */}
        <Section title="🧄 Ingredients">
          <ul className="space-y-2">
            {ingredientLines.map((line, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-[#3D2B1F]">
                <span
                  className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{ background: '#E85D26' }}
                >
                  {i + 1}
                </span>
                {line}
              </li>
            ))}
          </ul>
        </Section>

        {/* Instructions */}
        <Section title="👨‍🍳 Instructions">
          <ol className="space-y-4">
            {instructionLines.map((step, i) => {
              const clean = step.replace(/^\d+\.\s*/, '')
              return (
                <li key={i} className="flex gap-4">
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-black flex-shrink-0 mt-0.5"
                    style={{ background: '#1A1A1A' }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-sm text-[#3D2B1F] leading-relaxed">{clean}</p>
                </li>
              )
            })}
          </ol>
        </Section>

        {/* Edit Form */}
        {editOpen && (
          <div className="bg-white rounded-3xl border border-[#EDE0D4] p-6 shadow-sm space-y-5">
            <h2
              className="text-xl font-black text-[#1A1A1A]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              ✏️ Edit Recipe
            </h2>
            <form onSubmit={handleSubmit(onUpdate)} className="space-y-4">
              {/* Image URL */}
              <div className="space-y-1">
                <label className="text-sm font-semibold text-[#3D2B1F]">Image URL</label>
                <input
                  type="url"
                  {...register('image')}
                  onBlur={(e) => setPreview(e.target.value)}
                  className="w-full bg-[#FFFBF5] border border-[#EDE0D4] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#E85D26] transition-colors"
                />
                {preview && (
                  <img src={preview} alt="preview" className="mt-2 h-32 w-full object-cover rounded-xl" onError={() => setPreview('')} />
                )}
              </div>

              {/* Title */}
              <div className="space-y-1">
                <label className="text-sm font-semibold text-[#3D2B1F]">Title</label>
                <input
                  type="text"
                  {...register('title', { required: true })}
                  className="w-full bg-[#FFFBF5] border border-[#EDE0D4] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#E85D26] transition-colors"
                />
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-sm font-semibold text-[#3D2B1F]">Description</label>
                <textarea rows={3} {...register('description')}
                  className="w-full bg-[#FFFBF5] border border-[#EDE0D4] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#E85D26] transition-colors resize-none"
                />
              </div>

              {/* Category + Cook Time */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-[#3D2B1F]">Category</label>
                  <select {...register('category')}
                    className="w-full bg-[#FFFBF5] border border-[#EDE0D4] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#E85D26] transition-colors cursor-pointer"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-[#3D2B1F]">Cook Time</label>
                  <input type="text" {...register('cookTime')}
                    className="w-full bg-[#FFFBF5] border border-[#EDE0D4] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#E85D26] transition-colors"
                  />
                </div>
              </div>

              {/* Ingredients */}
              <div className="space-y-1">
                <label className="text-sm font-semibold text-[#3D2B1F]">Ingredients (one per line)</label>
                <textarea rows={6} {...register('Ingridients')}
                  className="w-full bg-[#FFFBF5] border border-[#EDE0D4] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#E85D26] transition-colors resize-none font-mono"
                />
              </div>

              {/* Instructions */}
              <div className="space-y-1">
                <label className="text-sm font-semibold text-[#3D2B1F]">Instructions (one step per line)</label>
                <textarea rows={7} {...register('Instructions')}
                  className="w-full bg-[#FFFBF5] border border-[#EDE0D4] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#E85D26] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#E85D26] text-white font-black rounded-2xl hover:bg-[#c94e1f] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-xl"
              >
                ✅ Save Changes
              </button>
            </form>
          </div>
        )}

        {/* Back link */}
        <div className="text-center pt-4">
          <Link to="/recipes" className="text-sm text-[#9A7B6E] hover:text-[#E85D26] transition-colors font-medium">
            ← Back to all recipes
          </Link>
        </div>
      </div>
    </main>
  )
}

export default SingleRecipe
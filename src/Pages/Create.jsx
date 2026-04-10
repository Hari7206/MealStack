import { nanoid } from 'nanoid'
import { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { recepiecontext } from '../context/RecipesContext'
import { useNavigate } from 'react-router-dom'

const CATEGORIES = [
  { value: 'breakfast', label: '🥞 Breakfast' },
  { value: 'lunch', label: '🥗 Lunch' },
  { value: 'dinner', label: '🍲 Dinner' },
  { value: 'desserts', label: '🍰 Desserts' },
  { value: 'drinks', label: '🍹 Drinks' },
  { value: 'snacks', label: '🥨 Snacks' },
]

function playSuccessSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const notes = [523.25, 659.25, 783.99, 1046.5] // C5 E5 G5 C6
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.type = 'sine'
      osc.frequency.value = freq
      const start = ctx.currentTime + i * 0.13
      gain.gain.setValueAtTime(0, start)
      gain.gain.linearRampToValueAtTime(0.22, start + 0.04)
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35)
      osc.start(start)
      osc.stop(start + 0.38)
    })
  } catch (_) {}
}

function FieldWrapper({ label, hint, error, children }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-[#3D2B1F]">{label}</label>
      {children}
      {hint && !error && <p className="text-xs text-[#9A7B6E]">{hint}</p>}
      {error && <p className="text-xs text-red-500 font-medium">⚠ {error}</p>}
    </div>
  )
}

function Create() {
  const navigate = useNavigate()
  const { data, setData } = useContext(recepiecontext)
  const [preview, setPreview] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm()

  const imageUrl = watch('image')

  function onSubmit(recipe) {
    setSubmitting(true)
    setTimeout(() => {
      recipe.id = nanoid()
      recipe.createdAt = new Date().toISOString()
      const updated = [...data, recipe]
      localStorage.setItem('recipes', JSON.stringify(updated))
      setData(updated)
      playSuccessSound()
      toast.success('🎉 Recipe created successfully!', {
        style: { fontFamily: "'DM Sans', sans-serif", fontWeight: 600 },
      })
      reset()
      setPreview('')
      setSubmitting(false)
      navigate('/recipes')
    }, 600)
  }

  return (
    <main
      className="min-h-screen pt-28 pb-20 px-4"
      style={{ fontFamily: "'DM Sans', sans-serif", background: '#FFFBF5' }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <span className="inline-block bg-[#E85D26]/10 text-[#E85D26] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
            ✏️ Share Your Recipe
          </span>
          <h1
            className="text-4xl md:text-5xl font-black text-[#1A1A1A] leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Create a New Recipe
          </h1>
          <p className="text-[#9A7B6E] mt-2 text-base">
            Fill in the details below and share your culinary masterpiece with the world.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Image URL + Preview */}
          <div className="bg-white rounded-3xl border border-[#EDE0D4] p-6 shadow-sm space-y-5">
            <h2 className="text-lg font-bold text-[#1A1A1A] flex items-center gap-2">
              📸 <span>Recipe Photo</span>
            </h2>

            <FieldWrapper
              label="Image URL"
              hint="Paste a direct image link (jpg, png, webp)"
              error={errors.image?.message}
            >
              <input
                type="url"
                placeholder="https://example.com/photo.jpg"
                {...register('image', {
                  pattern: {
                    value: /^https?:\/\/.+\..+/,
                    message: 'Please enter a valid URL',
                  },
                })}
                onBlur={(e) => setPreview(e.target.value)}
                className="w-full bg-[#FFFBF5] border border-[#EDE0D4] rounded-xl px-4 py-3 text-sm text-[#1A1A1A] placeholder-[#C4A88A] focus:outline-none focus:border-[#E85D26] transition-colors duration-200"
              />
            </FieldWrapper>

            {/* Image preview */}
            <div
              className="w-full h-52 rounded-2xl border-2 border-dashed border-[#EDE0D4] overflow-hidden flex items-center justify-center transition-all duration-300"
              style={{ background: preview ? 'transparent' : '#FFF8F3' }}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Recipe preview"
                  className="w-full h-full object-cover rounded-2xl"
                  onError={() => setPreview('')}
                />
              ) : (
                <div className="text-center text-[#C4A88A] space-y-1">
                  <div className="text-5xl">🖼️</div>
                  <p className="text-xs font-medium">Image preview appears here</p>
                </div>
              )}
            </div>
          </div>

          {/* Basic Info */}
          <div className="bg-white rounded-3xl border border-[#EDE0D4] p-6 shadow-sm space-y-5">
            <h2 className="text-lg font-bold text-[#1A1A1A] flex items-center gap-2">
              📝 <span>Basic Info</span>
            </h2>

            <FieldWrapper
              label="Recipe Title"
              hint="Give your dish a catchy, descriptive name"
              error={errors.title?.message}
            >
              <input
                type="text"
                placeholder="e.g. Grandma's Butter Chicken"
                {...register('title', { required: 'Title is required' })}
                className="w-full bg-[#FFFBF5] border border-[#EDE0D4] rounded-xl px-4 py-3 text-sm text-[#1A1A1A] placeholder-[#C4A88A] focus:outline-none focus:border-[#E85D26] transition-colors duration-200"
              />
            </FieldWrapper>

            <FieldWrapper
              label="Description"
              hint="What makes this recipe special? A short intro works great."
              error={errors.description?.message}
            >
              <textarea
                rows={3}
                placeholder="A rich, creamy curry that's been in the family for generations..."
                {...register('description', { required: 'Description is required' })}
                className="w-full bg-[#FFFBF5] border border-[#EDE0D4] rounded-xl px-4 py-3 text-sm text-[#1A1A1A] placeholder-[#C4A88A] focus:outline-none focus:border-[#E85D26] transition-colors duration-200 resize-none"
              />
            </FieldWrapper>

            {/* Category + Cook time row */}
            <div className="grid grid-cols-2 gap-4">
              <FieldWrapper label="Category" error={errors.category?.message}>
                <select
                  {...register('category', { required: 'Pick a category' })}
                  className="w-full bg-[#FFFBF5] border border-[#EDE0D4] rounded-xl px-4 py-3 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#E85D26] transition-colors duration-200 cursor-pointer"
                >
                  <option value="">Select category</option>
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </FieldWrapper>

              <FieldWrapper label="Cook Time" hint="e.g. 30 min" error={errors.cookTime?.message}>
                <input
                  type="text"
                  placeholder="45 min"
                  {...register('cookTime', { required: 'Cook time is required' })}
                  className="w-full bg-[#FFFBF5] border border-[#EDE0D4] rounded-xl px-4 py-3 text-sm text-[#1A1A1A] placeholder-[#C4A88A] focus:outline-none focus:border-[#E85D26] transition-colors duration-200"
                />
              </FieldWrapper>
            </div>
          </div>

          {/* Ingredients */}
          <div className="bg-white rounded-3xl border border-[#EDE0D4] p-6 shadow-sm space-y-5">
            <h2 className="text-lg font-bold text-[#1A1A1A] flex items-center gap-2">
              🧄 <span>Ingredients</span>
            </h2>
            <FieldWrapper
              label="Ingredients List"
              hint="List each ingredient on a new line, e.g. 2 cups flour"
              error={errors.Ingridients?.message}
            >
              <textarea
                rows={6}
                placeholder={`2 cups basmati rice\n400g chicken breast\n1 cup heavy cream\n2 tbsp butter\nSalt and pepper to taste`}
                {...register('Ingridients', { required: 'Ingredients are required' })}
                className="w-full bg-[#FFFBF5] border border-[#EDE0D4] rounded-xl px-4 py-3 text-sm text-[#1A1A1A] placeholder-[#C4A88A] focus:outline-none focus:border-[#E85D26] transition-colors duration-200 resize-none font-mono leading-relaxed"
              />
            </FieldWrapper>
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-3xl border border-[#EDE0D4] p-6 shadow-sm space-y-5">
            <h2 className="text-lg font-bold text-[#1A1A1A] flex items-center gap-2">
              👨‍🍳 <span>Instructions</span>
            </h2>
            <FieldWrapper
              label="Step-by-Step Instructions"
              hint="Write each step on a new line. Number them for clarity."
              error={errors.Instructions?.message}
            >
              <textarea
                rows={8}
                placeholder={`1. Marinate the chicken in yogurt and spices for 30 minutes.\n2. Heat butter in a pan over medium heat.\n3. Add onions and sauté until golden brown.\n4. Add the marinated chicken and cook for 10 minutes.\n5. Pour in cream and simmer for 15 minutes.`}
                {...register('Instructions', { required: 'Instructions are required' })}
                className="w-full bg-[#FFFBF5] border border-[#EDE0D4] rounded-xl px-4 py-3 text-sm text-[#1A1A1A] placeholder-[#C4A88A] focus:outline-none focus:border-[#E85D26] transition-colors duration-200 resize-none leading-relaxed"
              />
            </FieldWrapper>
          </div>

          {/* Submit */}
          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={() => navigate('/recipes')}
              className="flex-1 py-4 rounded-2xl border-2 border-[#EDE0D4] text-[#9A7B6E] font-bold text-base hover:border-[#E85D26] hover:text-[#E85D26] transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-[2] py-4 rounded-2xl bg-[#E85D26] text-white font-black text-base shadow-xl hover:bg-[#c94e1f] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                    <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Saving…
                </>
              ) : (
                '🚀 Publish Recipe'
              )}
            </button>
          </div>

        </form>
      </div>
    </main>
  )
}

export default Create
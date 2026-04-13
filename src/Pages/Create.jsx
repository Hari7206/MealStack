import { nanoid } from 'nanoid'
import { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { recepiecontext } from '../context/RecipesContext'
import { useNavigate } from 'react-router-dom'

const CATEGORIES = [
  { value: 'breakfast', label: 'Breakfast' },
  { value: 'lunch',     label: 'Lunch'     },
  { value: 'dinner',    label: 'Dinner'    },
  { value: 'desserts',  label: 'Desserts'  },
  { value: 'drinks',    label: 'Drinks'    },
  { value: 'snacks',    label: 'Snacks'    },
]

function playSuccessSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const notes = [523.25, 659.25, 783.99, 1046.5]
    notes.forEach((freq, i) => {
      const osc  = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain); gain.connect(ctx.destination)
      osc.type = 'sine'; osc.frequency.value = freq
      const start = ctx.currentTime + i * 0.13
      gain.gain.setValueAtTime(0, start)
      gain.gain.linearRampToValueAtTime(0.22, start + 0.04)
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35)
      osc.start(start); osc.stop(start + 0.38)
    })
  } catch (_) {}
}

/* shared input class */
const inputCls = `
  w-full border border-[#E8E2D9] rounded-xl px-4 py-3 text-sm text-[#1A1A1A]
  bg-[#FAFAF8] placeholder-[#BDB5A8]
  focus:outline-none focus:border-[#1A1A1A] transition-colors duration-200
`

function Create() {
  const navigate = useNavigate()
  const { data, setData }   = useContext(recepiecontext)
  const [submitting, setSubmitting] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  function onSubmit(recipe) {
    setSubmitting(true)
    setTimeout(() => {
      recipe.id        = nanoid()
      recipe.createdAt = new Date().toISOString()
      const updated    = [...data, recipe]
      localStorage.setItem('recipes', JSON.stringify(updated))
      setData(updated)
      playSuccessSound()
      toast.success('🎉 Recipe published!', { style: { fontFamily: "'DM Sans', sans-serif", fontWeight: 600 } })
      reset()
      setSubmitting(false)
      navigate('/recipes')
    }, 600)
  }

  return (
    <main
      className="min-h-screen"
      style={{ fontFamily: "'DM Sans', sans-serif", background: '#F9F7F4' }}
    >
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* ── Top label bar — like "Plan Trip" in reference ── */}
      <div className="pt-28 pb-0 px-8 md:px-16 max-w-7xl mx-auto">
        <span className="text-xs font-bold text-[#9A8F83] uppercase tracking-widest">
          <i className="ri-lightbulb-ai-line"></i> Share Your Recipe
        </span>
      </div>

      {/* ── Split layout: heading left, subtext right ── */}
      <div className="px-8 md:px-16 max-w-7xl mx-auto pt-4 pb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E8E2D9]">
        <h1
          className="text-5xl md:text-6xl font-black text-[#1A1A1A] leading-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Create a<br />New Recipe
        </h1>
        <p className="text-[#9A8F83] text-base max-w-xs leading-relaxed md:text-right">
          Fill in the details below and share your culinary masterpiece with the world. We'll confirm it's live instantly.
        </p>
      </div>

      {/* ── Main form + side panel ── */}
      <div className="px-8 md:px-16 max-w-7xl mx-auto py-12 flex flex-col lg:flex-row gap-12">

        {/* LEFT — form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex-[1.4] space-y-6">

          {/* Row 1: Title + Cook Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#6B6560] uppercase tracking-widest">Recipe Title</label>
              <input
                type="text"
                placeholder="e.g. Grandma's Butter Chicken"
                {...register('title', { required: 'Required' })}
                className={inputCls}
              />
              {errors.title && <p className="text-xs text-red-400">{errors.title.message}</p>}
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#6B6560] uppercase tracking-widest">Cook Time</label>
              <input
                type="text"
                placeholder="e.g. 45 min"
                {...register('cookTime', { required: 'Required' })}
                className={inputCls}
              />
              {errors.cookTime && <p className="text-xs text-red-400">{errors.cookTime.message}</p>}
            </div>
          </div>

          {/* Row 2: Category + Image URL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#6B6560] uppercase tracking-widest">Category</label>
              <select
                {...register('category', { required: 'Required' })}
                className={inputCls + ' cursor-pointer'}
              >
                <option value="">Select a category...</option>
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
              {errors.category && <p className="text-xs text-red-400">{errors.category.message}</p>}
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#6B6560] uppercase tracking-widest">Image URL</label>
              <input
                type="url"
                placeholder="https://..."
                {...register('image')}
                className={inputCls}
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#6B6560] uppercase tracking-widest">Description</label>
            <textarea
              rows={3}
              placeholder="What makes this dish special? A short intro..."
              {...register('description', { required: 'Required' })}
              className={inputCls + ' resize-none'}
            />
            {errors.description && <p className="text-xs text-red-400">{errors.description.message}</p>}
          </div>

          {/* Ingredients */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#6B6560] uppercase tracking-widest">Ingredients</label>
            <p className="text-xs text-[#BDB5A8]">One ingredient per line</p>
            <textarea
              rows={6}
              placeholder={'2 cups basmati rice\n400g chicken breast\n1 cup heavy cream\n2 tbsp butter\nSalt and pepper'}
              {...register('Ingridients', { required: 'Required' })}
              className={inputCls + ' resize-none font-mono'}
            />
            {errors.Ingridients && <p className="text-xs text-red-400">{errors.Ingridients.message}</p>}
          </div>

          {/* Instructions */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#6B6560] uppercase tracking-widest">Instructions</label>
            <p className="text-xs text-[#BDB5A8]">One step per line, number them for clarity</p>
            <textarea
              rows={8}
              placeholder={'1. Marinate chicken for 30 minutes.\n2. Heat butter in a pan.\n3. Add onions and cook until golden.\n4. Pour in cream and simmer.\n5. Serve hot with rice.'}
              {...register('Instructions', { required: 'Required' })}
              className={inputCls + ' resize-none'}
            />
            {errors.Instructions && <p className="text-xs text-red-400">{errors.Instructions.message}</p>}
          </div>

          {/* Submit row */}
          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={() => navigate('/recipes')}
              className="flex-1 py-3.5 rounded-xl border border-[#E8E2D9] text-[#9A8F83] font-bold text-sm hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-[2] py-3.5 rounded-xl font-black text-sm text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2"
              style={{ background: '#1A1A1A' }}
            >
              {submitting ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                    <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Publishing…
                </>
              ) : (
                'Publish Recipe →'
              )}
            </button>
          </div>
        </form>

        {/* RIGHT — info panel, like the image panel in reference */}
        <div className="lg:flex-[0.6] space-y-6">

          {/* Image placeholder */}
          <div
  className="w-full h-64 rounded-2xl overflow-hidden relative flex items-center justify-center bg-cover bg-center"
  style={{
    backgroundImage:
      "url('https://i.pinimg.com/736x/84/46/8a/84468ad1089188082cea512a21f8142e.jpg')",
  }}
>
  {/* Dark overlay */}
  <div className="absolute inset-0 bg-black/60"></div>

  {/* Content */}
  <div className="relative text-center text-white space-y-2">
    <p className="text-xs font-semibold">Recipe image preview</p>
    <p className="text-xs opacity-80">
      Paste a URL in the form to see it here
    </p>
  </div>

  {/* Badge */}
  <span className="absolute top-3 right-3 bg-white text-[#1A1A1A] text-xs font-bold px-3 py-1.5 rounded-full shadow">
    Your Dish
  </span>
</div>

          {/* Tips panel */}
          <div className="rounded-2xl border border-[#E8E2D9] bg-white p-6 space-y-4">
            <h3 className="text-sm font-black text-[#1A1A1A] uppercase tracking-widest">Tips for a great recipe</h3>
            <div className="space-y-3">
              {[
                { icon: '>', tip: 'Use precise measurements — cups, grams, tablespoons.' },
                { icon: '>', tip: 'Number each instruction step clearly.' },
                { icon: '>', tip: 'Mention spice level, dietary tags, or allergens.' },
                { icon: '>', tip: 'Include prep time and cook time separately if possible.' },
              ].map((t) => (
                <div key={t.tip} className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0 mt-0.5">{t.icon}</span>
                  <p className="text-xs text-[#9A8F83] leading-relaxed">{t.tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact-style info blocks like the reference */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: <i class="ri-share-forward-fill"></i>, label: 'Free to Share', sub: 'Always' },
              { icon: <i class="ri-live-fill"></i>, label: 'Live Instantly', sub: 'No waiting' },
              { icon: <i class="ri-team-fill"></i>, label: 'Community', sub: 'Loved by all' },
            ].map((b) => (
              <div key={b.label} className="rounded-2xl border border-[#E8E2D9] bg-white p-4 text-center space-y-1">
                <div className="text-2xl">{b.icon}</div>
                <p className="text-xs font-black text-[#1A1A1A]">{b.label}</p>
                <p className="text-xs text-[#BDB5A8]">{b.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Create
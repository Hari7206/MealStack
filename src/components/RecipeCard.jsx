import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CATEGORY_STYLES = {
  breakfast: { bg: '#FFF3DC', accent: '#F4A800', light: '#FFFBEE' },
  lunch:     { bg: '#DCEFDC', accent: '#5A8A3C', light: '#F0FAF0' },
  dinner:    { bg: '#FFE0EC', accent: '#C2185B', light: '#FFF5F8' },
  desserts:  { bg: '#EDE0FF', accent: '#7C3AED', light: '#F8F4FF' },
  drinks:    { bg: '#DCF0FF', accent: '#1565C0', light: '#F0F8FF' },
  snacks:    { bg: '#FFE8D0', accent: '#E85D26', light: '#FFF8F3' },
}

const TAG_LABELS = {
  breakfast: ['Morning', 'Quick'],
  lunch:     ['Fresh', 'Healthy'],
  dinner:    ['Hearty', 'Filling'],
  desserts:  ['Sweet', 'Treat'],
  drinks:    ['Chilled', 'Refreshing'],
  snacks:    ['Crispy', 'Snack'],
}

function RecipeCard({ recipe }) {
  const cat  = CATEGORY_STYLES[recipe.category] || { bg: '#EFEFEF', accent: '#888', light: '#FAFAFA' }
  const tags = TAG_LABELS[recipe.category] || ['Recipe']
  const [imgOk, setImgOk] = useState(true)

  const showImage = recipe.image && imgOk

  return (
    <Link
      to={`/recipes/details/${recipe.id}`}
      className="group block relative rounded-[2rem] overflow-hidden transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl"
      style={{
        background: cat.light,
        boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute w-28 h-28 rounded-full -top-6 -right-6 opacity-50 transition-transform duration-500 group-hover:scale-125 pointer-events-none"
        style={{ background: cat.bg }}
      />
      <div
        className="absolute w-16 h-16 rounded-full bottom-24 -left-4 opacity-30 transition-transform duration-500 group-hover:scale-110 pointer-events-none"
        style={{ background: cat.bg }}
      />

      {/* ── Image panel ── */}
      <div className="relative h-52 rounded-[1.75rem] mx-3 mt-3 overflow-hidden">

        {showImage ? (
          /* Real image */
          <img
            src={recipe.image}
            alt={recipe.title}
            onError={() => setImgOk(false)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          /* Plain grey placeholder — no emoji, no coloured bg */
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-2"
            style={{ background: '#E8E4DE' }}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#B5AFA8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <span style={{ fontSize: '11px', color: '#B5AFA8', fontWeight: 600, letterSpacing: '0.05em' }}>
              No image
            </span>
          </div>
        )}

        {/* Cook time pill */}
        {recipe.cookTime && (
          <span
            className="absolute top-3 right-3 text-xs font-bold px-3 py-1.5 rounded-full shadow-md z-10"
            style={{ background: 'rgba(255,255,255,0.93)', color: cat.accent }}
          >
            ⏱ {recipe.cookTime}
          </span>
        )}
      </div>

      {/* ── Body ── */}
      <div className="px-5 pt-4 pb-5 space-y-3 relative z-10">
        <h2
          className="font-black text-[#1A1A1A] text-[1.05rem] leading-snug line-clamp-2 group-hover:text-[#E85D26] transition-colors duration-200"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {recipe.title || 'Untitled Recipe'}
        </h2>

        {/* Tags */}
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="text-xs font-semibold capitalize px-2.5 py-1 rounded-full"
            style={{ background: cat.bg, color: cat.accent }}
          >
            {recipe.category || 'General'}
          </span>
          {tags.map((t) => (
            <span
              key={t}
              className="text-xs font-medium text-[#9A7B6E] border border-[#EDE0D4] px-2.5 py-1 rounded-full"
            >
              {t}
            </span>
          ))}
        </div>

        <p className="text-sm text-[#9A7B6E] leading-relaxed line-clamp-2">
          {recipe.description || 'No description provided.'}
        </p>

        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-[#C4A88A] font-medium">
            {recipe.createdAt
              ? new Date(recipe.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
              : ''}
          </span>
          <span
            className="text-xs font-black px-4 py-2 rounded-full transition-all duration-300 group-hover:shadow-lg group-hover:scale-105"
            style={{ background: cat.accent, color: '#fff' }}
          >
            View →
          </span>
        </div>
      </div>
    </Link>
  )
}

export default RecipeCard
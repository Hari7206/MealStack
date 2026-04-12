import React, { useContext, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { recepiecontext } from '../context/RecipesContext'
import RecipeCard from '../components/RecipeCard'

const CATEGORIES = ['all', 'breakfast', 'lunch', 'dinner', 'desserts', 'drinks', 'snacks']
const CAT_EMOJI   = { all:'🍽️', breakfast:'🥞', lunch:'🥗', dinner:'🍲', desserts:'🍰', drinks:'🍹', snacks:'🥨' }

function Recipes() {
  const { data } = useContext(recepiecontext)
  const [search, setSearch]     = useState('')
  const [active, setActive]     = useState('all')

  const filtered = useMemo(() => {
    return data.filter((r) => {
      const matchCat  = active === 'all' || r.category === active
      const matchText = r.title?.toLowerCase().includes(search.toLowerCase()) ||
                        r.description?.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchText
    })
  }, [data, search, active])

  return (
    <main
      className="min-h-screen pt-28 pb-20 px-4"
      style={{ fontFamily: "'DM Sans', sans-serif", background: '#FFFBF5' }}
    >
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="inline-block bg-[#E85D26]/10 text-[#E85D26] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-3">
              🍴 All Recipes
            </span>
            <h1
              className="text-4xl md:text-5xl font-black text-[#1A1A1A]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Find Your Next Meal
            </h1>
            <p className="text-[#9A7B6E] mt-1">{data.length} recipes and counting</p>
          </div>
          <Link
            to="/create-recipes"
            className="self-start md:self-auto flex items-center gap-2 bg-[#E85D26] text-white font-bold text-sm px-6 py-3 rounded-full shadow-lg hover:bg-[#c94e1f] hover:scale-105 transition-all duration-300"
          >
            + Add Recipe
          </Link>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C4A88A] text-lg">🔍</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search recipes, ingredients..."
            className="w-full bg-white border border-[#EDE0D4] rounded-2xl pl-11 pr-4 py-3.5 text-sm text-[#1A1A1A] placeholder-[#C4A88A] focus:outline-none focus:border-[#E85D26] transition-colors duration-200 shadow-sm"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#C4A88A] hover:text-[#E85D26] text-lg transition-colors"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category pills */}
        <div className="flex gap-2 flex-wrap mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold capitalize transition-all duration-200 ${
                active === cat
                  ? 'bg-[#E85D26] text-white shadow-md scale-105'
                  : 'bg-white border border-[#EDE0D4] text-[#3D2B1F] hover:border-[#E85D26] hover:text-[#E85D26]'
              }`}
            >
              {CAT_EMOJI[cat]} {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="text-6xl mb-4">🍽️</div>
            <h2 className="text-2xl font-black text-[#1A1A1A] mb-2" style={{ fontFamily:"'Playfair Display',serif" }}>
              No recipes found
            </h2>
            <p className="text-[#9A7B6E] mb-6">Try a different search or category, or add your own!</p>
            <Link
              to="/create-recipes"
              className="bg-[#E85D26] text-white font-bold px-7 py-3 rounded-full hover:bg-[#c94e1f] transition-all"
            >
              + Create Recipe
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}

export default Recipes
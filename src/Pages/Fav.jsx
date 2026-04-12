import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import RecipeCard from '../components/RecipeCard'

function Fav() {
  const [favourites, setFavourites] = useState(
    () => JSON.parse(localStorage.getItem('fav')) || []
  )

  const removeAll = () => {
    setFavourites([])
    localStorage.setItem('fav', JSON.stringify([]))
  }

  return (
    <main
      className="min-h-screen pt-28 pb-20 px-4"
      style={{ fontFamily: "'DM Sans', sans-serif", background: '#FFFBF5' }}
    >
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="inline-block bg-red-50 text-red-400 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-3">
              ❤️ Your Favourites
            </span>
            <h1
              className="text-4xl md:text-5xl font-black text-[#1A1A1A]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Saved Recipes
            </h1>
            <p className="text-[#9A7B6E] mt-1">
              {favourites.length} {favourites.length === 1 ? 'recipe' : 'recipes'} saved
            </p>
          </div>
          {favourites.length > 0 && (
            <button
              onClick={removeAll}
              className="self-start md:self-auto text-sm font-bold text-red-400 border border-red-200 px-5 py-2.5 rounded-full hover:bg-red-50 transition-all"
            >
              🗑️ Clear All
            </button>
          )}
        </div>

        {/* Empty state */}
        {favourites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="text-7xl mb-6 animate-bounce">💔</div>
            <h2
              className="text-2xl font-black text-[#1A1A1A] mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              No favourites yet
            </h2>
            <p className="text-[#9A7B6E] mb-8 max-w-sm">
              Browse our recipes and tap the heart icon on any recipe to save it here.
            </p>
            <Link
              to="/recipes"
              className="bg-[#E85D26] text-white font-bold px-8 py-3.5 rounded-full shadow-lg hover:bg-[#c94e1f] hover:scale-105 transition-all duration-300"
            >
              Explore Recipes →
            </Link>
          </div>
        ) : (
          <>
            {/* Favourite cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favourites.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>

            {/* Discover more banner */}
            <div
              className="mt-14 rounded-3xl px-8 py-10 text-center relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #1A1A1A, #2D1A0E)' }}
            >
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/5" />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/5" />
              <h2
                className="text-2xl md:text-3xl font-black text-white mb-2 relative"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Hungry for more?
              </h2>
              <p className="text-[#C4A88A] mb-6 relative">
                Discover hundreds more recipes waiting to be saved.
              </p>
              <Link
                to="/recipes"
                className="inline-block bg-[#E85D26] text-white font-bold px-8 py-3 rounded-full hover:bg-[#c94e1f] hover:scale-105 transition-all duration-300 relative shadow-xl"
              >
                Browse All Recipes →
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  )
}

export default Fav
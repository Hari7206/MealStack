import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

/* ─── tiny sample data so the cards render without context ─── */
const FEATURED = [
  {
    id: 1,
    title: 'Butter Chicken Masala',
    time: '45 min',
    category: 'Indian',
     img:'https://i.pinimg.com/1200x/f3/2f/f6/f32ff620b26ca36f7a8546a1d4fe9cdc.jpg',
    color: '#FFF0E0',
    accent: '#E85D26',
  },
  {
    id: 2,
    title: 'Creamy Mushroom Pasta',
    time: '30 min',
    category: 'Italian',
    img:'https://i.pinimg.com/1200x/80/98/10/809810b02c3682cd3f4937835f664660.jpg',
    color: '#F0F7E6',
    accent: '#5A8A3C',
  },
  {
    id: 3,
    title: 'Classic  Burger',
    time: '25 min',
    category: 'American',
   img:'https://i.pinimg.com/1200x/71/2b/bb/712bbbb3cf161176dba36f23551b7061.jpg',
    color: '#FEF3E2',
    accent: '#C97B22',
  },
  {
    id: 4,
    title: 'Mango Tango Smoothie',
    time: '10 min',
    category: 'Drinks',
     img:'https://i.pinimg.com/736x/10/2e/72/102e724d8f94c7825ccdab3ea4efebea.jpg',
    color: '#FFF8E1',
    accent: '#F4A800',
  },
]

const CATEGORIES = [
  { label: 'Breakfast', img: 'https://i.pinimg.com/1200x/8b/c8/37/8bc8378a740f93b9dab9b28d14cd3acf.jpg' },
  { label: 'Lunch', img: 'https://i.pinimg.com/736x/49/3c/61/493c6172277e7b27fe0566f02348702a.jpg' },
  { label: 'Dinner', img: 'https://images.unsplash.com/photo-1599680262375-4691454cb693?q=80&w=704&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { label: 'Desserts', img: 'https://images.unsplash.com/photo-1520080906273-ac3114063b21?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { label: 'Drinks', img: 'https://images.unsplash.com/photo-1640108290666-8352194d4d04?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { label: 'Snacks', img: 'https://i.pinimg.com/736x/0d/6c/8e/0d6c8ea688113ac9ce4a4e3a06f591af.jpg' },
];

const STEPS = [
  {title: 'Browse Recipes', desc: 'Explore hundreds of chef-curated dishes from every cuisine.' },
  { title: 'Create Your Own', desc: 'Add your secret family recipes to build your personal cookbook.' },
  { title: 'Save Favourites', desc: 'Bookmark dishes you love and revisit them anytime.' },
]

function Home() {
  const heroRef = useRef(null)

  /* subtle parallax on hero illustration */
  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const move = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 20
      el.style.transform = `translate(${x}px, ${y}px)`
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <main
      className="min-h-screen overflow-x-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif", background: '#FFFBF5' }}
    >
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* ══════════════════════════════
          HERO SECTION
      ══════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* warm blob background */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(ellipse 80% 70% at 70% 40%, #FFD9B8 0%, #FFFBF5 60%)',
          }}
        />
        {/* decorative circles */}
        <div className="absolute top-24 right-8 w-72 h-72 rounded-full bg-[#E85D26]/10 -z-10" />
        <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-[#F4A800]/15 -z-10" />

        <div className="max-w-7xl mx-auto px-6 pt-28 pb-16 grid md:grid-cols-2 gap-12 items-center w-full">
          {/* Left copy */}
          <div className="space-y-7">
            <span className="inline-block bg-[#E85D26]/10 text-[#E85D26] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
              🍴 Your Personal Recipe Book
            </span>
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] text-[#1A1A1A]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Cook with{' '}
              <span className="relative inline-block text-[#E85D26]">
                passion
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  fill="none"
                >
                  <path
                    d="M2 8 Q50 2 100 8 Q150 14 198 8"
                    stroke="#E85D26"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.5"
                  />
                </svg>
              </span>
              ,<br />share with love.
            </h1>
            <p className="text-[#6B4C3B] text-lg leading-relaxed max-w-md">
              Discover thousands of recipes, create your own culinary masterpieces,
              and save your all-time favourites — all in one place.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/recipes"
                className="bg-[#E85D26] text-white font-bold text-base px-8 py-4 rounded-full shadow-xl hover:bg-[#c94e1f] hover:scale-105 transition-all duration-300"
              >
                Explore Recipes →
              </Link>
              <Link
                to="/create-recipes"
                className="bg-white text-[#1A1A1A] font-bold text-base px-8 py-4 rounded-full shadow-md border border-[#E8D5C4] hover:border-[#E85D26] hover:text-[#E85D26] hover:scale-105 transition-all duration-300"
              >
                + Create Recipe
              </Link>
            </div>

            {/* quick stats */}
            <div className="flex gap-8 pt-4">
              {[['500+', 'Recipes'], ['50+', 'Cuisines'], ['100%', 'Free']].map(
                ([num, label]) => (
                  <div key={label}>
                    <p
                      className="text-3xl font-black text-[#E85D26]"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {num}
                    </p>
                    <p className="text-sm text-[#9A7B6E] font-medium">{label}</p>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Right illustration */}
          <div
            ref={heroRef}
            className="relative flex justify-center items-center transition-transform duration-100 ease-out"
          >
            <div className="relative w-80 h-80 md:w-[420px] md:h-[420px]">
              {/* plate circle */}
              <div className="absolute inset-0 rounded-full bg-white shadow-2xl" />
              {/* big emoji */}
              <div className="absolute inset-0 flex items-center justify-center text-[9rem] bg-[url('https://i.pinimg.com/736x/bb/2a/ea/bb2aea69aa74efce92f297d68d2cf7a2.jpg')] bg-cover bg-center rounded-[50%]">
                🍜
              </div>
              {/* floating chips */}
              {[
                { emoji: '🌶️', label: 'Spicy', top: '5%', left: '-8%', color: '#FFE0D6' },
                { emoji: '🧄', label: 'Fresh', top: '60%', left: '-12%', color: '#E8F5E9' },
                { emoji: '⏱️', label: '30 min', top: '5%', right: '-8%', color: '#FFF8E1' },
                { emoji: '⭐', label: '4.9', top: '65%', right: '-10%', color: '#FFF3E0' },
              ].map((chip) => (
                <div
                  key={chip.label}
                  className="absolute flex items-center gap-1.5 px-3 py-2 rounded-full shadow-lg text-sm font-semibold text-[#1A1A1A] animate-bounce"
                  style={{
                    background: chip.color,
                    top: chip.top,
                    left: chip.left,
                    right: chip.right,
                    animationDuration: `${2 + Math.random() * 2}s`,
                  }}
                >
                  <span>{chip.emoji}</span>
                  <span>{chip.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          CATEGORIES ROW
      ══════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2
          className="text-3xl font-black text-[#1A1A1A] mb-8"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Browse by Category
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
         {CATEGORIES.map((cat) => (
  <Link
    key={cat.label}
    to={`/recipes?category=${cat.label.toLowerCase()}`}
    className="relative h-40 rounded-2xl overflow-hidden group cursor-pointer"
  >
    {/* Background Image */}
    <div
      className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
      style={{ backgroundImage: `url(${cat.img})` }}
    ></div>

    {/* Dark Overlay */}
    <div className="absolute inset-0 bg-black/30"></div>

    {/* Label */}
    <div className="relative z-10 flex items-center justify-center h-full">
      <span className="text-white text-lg font-bold tracking-wide">
        {cat.label}
      </span>
    </div>
  </Link>
))}
        </div>
      </section>

      {/* ══════════════════════════════
          FEATURED RECIPES
      ══════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 py-8 pb-20">
        <div className="flex items-end justify-between mb-8">
          <h2
            className="text-3xl font-black text-[#1A1A1A]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Featured Recipes
          </h2>
          <Link
            to="/recipes"
            className="text-[#E85D26] text-sm font-bold hover:underline underline-offset-4"
          >
            View all →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED.map((r) => (
            <Link
              key={r.id}
              to={`/recipes/details/${r.id}`}
              className="group rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-400 cursor-pointer"
              style={{ background: r.color }}
            >
              {/* emoji plate */}
              <div className="flex items-center justify-center h-44 text-7xl  bg-cover bg-center "
              
               
  style={{ backgroundImage: `url(${r.img})` }}>
              </div>
              {/* info */}
              <div className="bg-white px-4 py-4 space-y-2">
                <span
                  className="text-xs font-bold px-2 py-1 rounded-full"
                  style={{ background: r.color, color: r.accent }}
                >
                  {r.category}
                </span>
                <h3 className="font-bold text-[#1A1A1A] text-base leading-snug">
                  {r.title}
                </h3>
                <div className="flex items-center justify-between text-xs text-[#9A7B6E] font-medium">
                  <span>⏱ {r.time}</span>
                  <span className="text-[#E85D26] font-bold group-hover:underline">
                    View Recipe →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════
          HOW IT WORKS
      ══════════════════════════════ */}
      <section
        className="py-20 px-6"
        style={{
          background: 'linear-gradient(135deg, #1A1A1A 0%, #2D1A0E 100%)',
        }}
      >
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2
            className="text-4xl font-black text-white mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            How MealStack Works
          </h2>
          <p className="text-[#C4A88A] text-base">
            Three simple steps to your perfect dish
          </p>
        </div>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {STEPS.map((step, i) => (
            <div
              key={step.title}
              className="relative bg-white/5 border border-white/10 rounded-3xl p-8 text-center hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#E85D26] flex items-center justify-center text-white font-black text-base shadow-lg">
                {i + 1}
              </div>
              <div className="text-5xl mb-4 mt-2">{step.icon}</div>
              <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
              <p className="text-[#C4A88A] text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════
          CTA BANNER
      ══════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div
          className="rounded-3xl px-10 py-14 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #E85D26, #F4A800)' }}
        >
          {/* decorative blobs */}
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/10" />

          <h2
            className="text-4xl md:text-5xl font-black text-white mb-4 relative"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Got a secret recipe?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto relative">
            Share your culinary creations with the world. Add ingredients, steps,
            and photos — it only takes a minute.
          </p>
          <Link
            to="/create-recipes"
            className="inline-block bg-white text-[#E85D26] font-black text-base px-10 py-4 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 relative"
          >
            Start Creating →
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════
          FOOTER
      ══════════════════════════════ */}
      <footer className="border-t border-[#EDE0D4] py-8 px-6 text-center">
        <p className="text-[#9A7B6E] text-sm">
          Made with ❤️ · MealStack © {new Date().getFullYear()}
        </p>
      </footer>
    </main>
  )
}

export default Home

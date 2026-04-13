import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const FEATURED = [
  { id: 1, title: 'Butter Chicken Masala', time: '45 min', category: 'Indian',   img: 'https://i.pinimg.com/1200x/f3/2f/f6/f32ff620b26ca36f7a8546a1d4fe9cdc.jpg', color: '#FFF0E0', accent: '#E85D26' },
  { id: 2, title: 'Creamy Mushroom Pasta', time: '30 min', category: 'Italian',  img: 'https://i.pinimg.com/1200x/80/98/10/809810b02c3682cd3f4937835f664660.jpg', color: '#F0F7E6', accent: '#5A8A3C' },
  { id: 3, title: 'Classic Burger',        time: '25 min', category: 'American', img: 'https://i.pinimg.com/1200x/71/2b/bb/712bbbb3cf161176dba36f23551b7061.jpg', color: '#FEF3E2', accent: '#C97B22' },
  { id: 4, title: 'Mango Tango Smoothie',  time: '10 min', category: 'Drinks',   img: 'https://i.pinimg.com/736x/10/2e/72/102e724d8f94c7825ccdab3ea4efebea.jpg', color: '#FFF8E1', accent: '#F4A800' },
]

const CATEGORIES = [
  { label: 'Breakfast', img: 'https://i.pinimg.com/1200x/8b/c8/37/8bc8378a740f93b9dab9b28d14cd3acf.jpg',  gradient: 'from-amber-400 to-orange-500',   icon: 'fa-solid fa-sun',          desc: 'Start your day right' },
  { label: 'Lunch',     img: 'https://i.pinimg.com/736x/49/3c/61/493c6172277e7b27fe0566f02348702a.jpg',   gradient: 'from-green-400 to-emerald-600',  icon: 'fa-solid fa-leaf',         desc: 'Midday fuel' },
  { label: 'Dinner',    img: 'https://images.unsplash.com/photo-1599680262375-4691454cb693?q=80&w=704',  gradient: 'from-red-400 to-rose-600',       icon: 'fa-solid fa-moon',         desc: 'Evening comfort' },
  { label: 'Desserts',  img: 'https://images.unsplash.com/photo-1520080906273-ac3114063b21?q=80&w=735',  gradient: 'from-pink-400 to-purple-500',    icon: 'fa-solid fa-ice-cream',    desc: 'Sweet endings' },
  { label: 'Drinks',    img: 'https://images.unsplash.com/photo-1640108290666-8352194d4d04?q=80&w=687',  gradient: 'from-blue-400 to-cyan-500',      icon: 'fa-solid fa-glass-water',  desc: 'Sip & savour' },
  { label: 'Snacks',    img: 'https://i.pinimg.com/736x/0d/6c/8e/0d6c8ea688113ac9ce4a4e3a06f591af.jpg',  gradient: 'from-yellow-400 to-amber-500',   icon: 'fa-solid fa-cookie-bite',  desc: 'Between bites' },
]

const STEPS = [
  { title: 'Browse Recipes',   desc: 'Explore hundreds of chef-curated dishes from every cuisine.', icon: 'fa-solid fa-magnifying-glass', color: '#E85D26', bg: '#FFF0E0', num: '01' },
  { title: 'Create Your Own',  desc: 'Add your secret family recipes to build your personal cookbook.', icon: 'fa-solid fa-pen-nib',         color: '#5A8A3C', bg: '#E8F5E9', num: '02' },
  { title: 'Save Favourites',  desc: 'Bookmark dishes you love and revisit them anytime.',             icon: 'fa-solid fa-heart',           color: '#C2185B', bg: '#FCE4EC', num: '03' },
]

const EDITORIAL = [
  { tag: ' Most Loved',  heading: 'Bold flavours,\nsimple steps.', body: 'Our hand-picked recipes walk you through every step — from mise en place to the final garnish. No culinary school required.', cta: 'Browse Recipes', ctaTo: '/recipes',        img: 'https://i.pinimg.com/1200x/f3/2f/f6/f32ff620b26ca36f7a8546a1d4fe9cdc.jpg', bg: '#FFF8F3', imgLeft: false, badge1: { icon: <i className="ri-star-fill text-yellow-600"></i>, text: '4.9 Rating' },      badge2: { icon: '⏱', text: '45 min' } },
  { tag: '✏️ Your Kitchen', heading: 'Your recipe,\nyour rules.',    body: "Got a dish that runs in the family? Write it down, add photos, pick a category — and share it with cooks everywhere. It's your personal cookbook, online.", cta: 'Start Creating', ctaTo: '/create-recipes', img: 'https://i.pinimg.com/1200x/80/98/10/809810b02c3682cd3f4937835f664660.jpg', bg: '#F3FBF5', imgLeft: true,  badge1: { icon: <i className="ri-book-open-line"></i>, text: 'Your Recipe' }, badge2: { icon: <i className="ri-p2p-line"></i>, text: 'Community Loved' } },
  { tag: '❤️ Favourites',   heading: 'Save the ones\nyou love.',     body: 'Found a recipe you want to come back to? One tap saves it to your personal favourites — so your go-to dishes are always just a click away.',            cta: 'View Favourites', ctaTo: '/Fav',            img: 'https://i.pinimg.com/736x/10/2e/72/102e724d8f94c7825ccdab3ea4efebea.jpg',   bg: '#FFF3F0', imgLeft: false, badge1: { icon: <i className="fa-solid fa-floppy-disk"></i>, text: 'Saved' },          badge2: { icon: <i className="ri-align-top"></i>, text: 'Top Pick' } },
]

/* ── Animate on scroll hook ── */
function useReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, visible]
}

/* ── Individual animated section wrapper ── */
function Reveal({ children, delay = 0, className = '' }) {
  const [ref, visible] = useReveal()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(48px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

function Home() {
  const heroRef = useRef(null)
  const [heroVisible, setHeroVisible] = useState(false)

  /* hero entry animation */
  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  /* parallax */
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
    <main className="min-h-screen overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif", background: '#FFFBF5' }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <style>{`
        @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-33.33%) } }
        @keyframes floatA  { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-10px)} }
        @keyframes floatB  { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-14px)} }
        @keyframes floatC  { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-8px)}  }
        @keyframes floatD  { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-12px)} }
        .chip-a { animation: floatA 2.8s ease-in-out infinite }
        .chip-b { animation: floatB 3.2s ease-in-out infinite }
        .chip-c { animation: floatC 2.5s ease-in-out infinite }
        .chip-d { animation: floatD 3.6s ease-in-out infinite }
        .cat-card:hover .cat-img { transform: scale(1.08) }
        .cat-img { transition: transform 0.5s ease }
      `}</style>

      {/* ══ HERO ══ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: 'radial-gradient(ellipse 80% 70% at 70% 40%, #FFD9B8 0%, #FFFBF5 60%)' }} />
        <div className="absolute top-24 right-8 w-72 h-72 rounded-full bg-[#E85D26]/10 -z-10" />
        <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-[#F4A800]/15 -z-10" />

        <div className="max-w-7xl mx-auto px-6 pt-28 pb-16 grid md:grid-cols-2 gap-12 items-center w-full">

          {/* Left copy — slides up on load */}
          <div className="space-y-7" style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(60px)', transition: 'opacity 0.9s ease, transform 0.9s ease' }}>
            <span className="inline-block bg-[#E85D26]/10 text-[#E85D26] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
              🍴 Your Personal Recipe Book
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Cook with{' '}
              <span className="relative inline-block text-[#E85D26]">
                passion
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 8 Q50 2 100 8 Q150 14 198 8" stroke="#E85D26" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.5" />
                </svg>
              </span>
              ,<br />share with love.
            </h1>
            <p className="text-[#6B4C3B] text-lg leading-relaxed max-w-md">
              Discover thousands of recipes, create your own culinary masterpieces, and save your all-time favourites — all in one place.
            </p>
            <div className="flex flex-wrap gap-4 pt-2" style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(30px)', transition: 'opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s' }}>
              <Link to="/recipes" className="bg-[#E85D26] text-white font-bold text-base px-8 py-4 rounded-full shadow-xl hover:bg-[#c94e1f] hover:scale-105 transition-all duration-300">Explore Recipes →</Link>
              <Link to="/create-recipes" className="bg-white text-[#1A1A1A] font-bold text-base px-8 py-4 rounded-full shadow-md border border-[#E8D5C4] hover:border-[#E85D26] hover:text-[#E85D26] hover:scale-105 transition-all duration-300">+ Create Recipe</Link>
            </div>
            <div className="flex gap-8 pt-4" style={{ opacity: heroVisible ? 1 : 0, transition: 'opacity 0.9s ease 0.4s' }}>
              {[['500+', 'Recipes'], ['50+', 'Cuisines'], ['100%', 'Free']].map(([num, label]) => (
                <div key={label}>
                  <p className="text-3xl font-black text-[#E85D26]" style={{ fontFamily: "'Playfair Display', serif" }}>{num}</p>
                  <p className="text-sm text-[#9A7B6E] font-medium">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right illustration — slides up with delay */}
          <div ref={heroRef} className="relative flex justify-center items-center" style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(80px)', transition: 'opacity 0.9s ease 0.15s, transform 0.9s ease 0.15s' }}>
            <div className="relative w-80 h-80 md:w-[420px] md:h-[420px]">
              <div className="absolute inset-0 rounded-full bg-white shadow-2xl" />
              <div className="absolute inset-0 bg-cover bg-center rounded-[50%]" style={{ backgroundImage: "url('https://i.pinimg.com/736x/bb/2a/ea/bb2aea69aa74efce92f297d68d2cf7a2.jpg')" }} />
              {[
                { cls: 'chip-a', icon: 'fa-solid fa-pepper-hot text-red-500',  label: 'Spicy',  top: '5%',  left: '-8%',  color: '#FFE0D6' },
                { cls: 'chip-b', icon: 'fa-solid fa-wind text-green-600',       label: 'Fresh',  top: '60%', left: '-12%', color: '#E8F5E9' },
                { cls: 'chip-c', icon: 'fa-regular fa-clock text-gray-700',     label: '30 min', top: '5%',  right: '-8%', color: '#FFF8E1' },
                { cls: 'chip-d', icon: 'fa-solid fa-star text-yellow-500',      label: '4.9',    top: '65%', right: '-10%',color: '#FFF3E0' },
              ].map((chip) => (
                <div key={chip.label} className={`${chip.cls} absolute flex items-center gap-1.5 px-3 py-2 rounded-full shadow-lg text-sm font-semibold text-[#1A1A1A]`}
                  style={{ background: chip.color, top: chip.top, left: chip.left, right: chip.right }}>
                  <i className={chip.icon}></i>
                  <span>{chip.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ MARQUEE ══ */}
      <div className="overflow-hidden bg-[#E85D26] py-4">
        <div className="flex gap-12 whitespace-nowrap text-white font-bold text-sm uppercase tracking-widest" style={{ animation: 'marquee 18s linear infinite', width: 'max-content' }}>
          {[...Array(3)].map((_, gi) => (
            <span key={gi} className="flex gap-12">
              {[' Butter Chicken', ' Carbonara', ' Pizza', ' Burgers', ' Desserts', ' Salads', ' Noodles', ' Pancakes', ' Smoothies', ' Snacks'].map((t) => (
                <span key={t} className="flex items-center gap-3"> <span className="text-white/40">·</span>{t} <span className="text-white/40">·</span></span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ══ EDITORIAL ══ */}
      {EDITORIAL.map((section, i) => (
        <section key={i} style={{ background: section.bg }}>
          <div className={`max-w-7xl mx-auto px-6 py-20 flex flex-col ${section.imgLeft ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 md:gap-20 items-center`}>
            <Reveal className="flex-1 space-y-6" delay={0}>
              <span className="inline-block bg-[#E85D26]/10 text-[#E85D26] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">{section.tag}</span>
              <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] leading-tight" style={{ fontFamily: "'Playfair Display', serif", whiteSpace: 'pre-line' }}>{section.heading}</h2>
              <p className="text-[#6B4C3B] text-lg leading-relaxed max-w-md">{section.body}</p>
              <Link to={section.ctaTo} className="inline-flex items-center gap-2 bg-[#1A1A1A] text-white font-bold text-base px-8 py-4 rounded-full shadow-xl hover:bg-[#E85D26] hover:scale-105 transition-all duration-300">{section.cta} →</Link>
              <div className="flex gap-3 pt-2 flex-wrap">
                <span className="flex items-center gap-2 bg-white border border-[#EDE0D4] text-[#3D2B1F] text-sm font-semibold px-4 py-2 rounded-full shadow-sm">{section.badge1.icon} {section.badge1.text}</span>
                <span className="flex items-center gap-2 bg-white border border-[#EDE0D4] text-[#3D2B1F] text-sm font-semibold px-4 py-2 rounded-full shadow-sm">{section.badge2.icon} {section.badge2.text}</span>
              </div>
            </Reveal>
            <Reveal className="flex-1 relative" delay={120}>
              <div className="absolute -inset-4 rounded-[3rem] -z-10 opacity-60" style={{ background: i % 2 === 0 ? '#FFD9B8' : i === 1 ? '#C8F0D8' : '#FFD0C8' }} />
              <img src={section.img} alt={section.heading} className="w-full h-80 md:h-[480px] object-cover rounded-[2.5rem] shadow-2xl" style={{ border: '6px solid white' }} />
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E85D26] flex items-center justify-center text-white text-lg font-black">{i + 1}</div>
                <div>
                  <p className="text-xs text-[#9A7B6E] font-medium">Step {i + 1}</p>
                  <p className="text-sm font-black text-[#1A1A1A]">{STEPS[i].title}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      {/* ══ CATEGORIES — unique food-magazine style ══ */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <Reveal>
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold text-[#E85D26] uppercase tracking-widest">Explore</span>
              <h2 className="text-4xl font-black text-[#1A1A1A] mt-1" style={{ fontFamily: "'Playfair Display', serif" }}>Browse by Category</h2>
            </div>
            <Link to="/recipes" className="text-sm font-bold text-[#9A7B6E] hover:text-[#E85D26] transition-colors">See all →</Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {CATEGORIES.map((cat, i) => (
            <Reveal key={cat.label} delay={i * 70}>
              <Link
                to={`/recipes?category=${cat.label.toLowerCase()}`}
                className="cat-card group relative rounded-3xl overflow-hidden cursor-pointer block"
                style={{ height: i === 0 || i === 3 ? '320px' : '240px' }}
              >
                {/* bg image */}
                <div className="cat-img absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${cat.img})` }} />
                {/* gradient overlay — unique per card using gradient prop */}
                <div className={`absolute inset-0 bg-gradient-to-t ${cat.gradient} opacity-70 group-hover:opacity-80 transition-opacity duration-300`} />
                {/* content */}
                <div className="absolute inset-0 flex flex-col justify-between p-5">
                  {/* top icon pill */}
                  <span className="self-start bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-2 w-fit">
                    <i className={cat.icon}></i>
                    {cat.desc}
                  </span>
                  {/* bottom label */}
                  <div>
                    <h3 className="text-white font-black text-2xl leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>{cat.label}</h3>
                    <div className="flex items-center gap-1 mt-2 text-white/80 text-xs font-semibold group-hover:gap-2 transition-all duration-300">
                      <span>Explore</span>
                      <i className="fa-solid fa-arrow-right text-xs"></i>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ FEATURED RECIPES ══ */}
      <section className="max-w-7xl mx-auto px-6 py-8 pb-20">
        <Reveal>
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-3xl font-black text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>Featured Recipes</h2>
            <Link to="/recipes" className="text-[#E85D26] text-sm font-bold hover:underline underline-offset-4">View all →</Link>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED.map((r, i) => (
            <Reveal key={r.id} delay={i * 80}>
              <Link to={`/recipes/details/${r.id}`} className="group rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 block" style={{ background: r.color }}>
                <div className="flex items-center justify-center h-44 bg-cover bg-center" style={{ backgroundImage: `url(${r.img})` }} />
                <div className="bg-white px-4 py-4 space-y-2">
                  <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ background: r.color, color: r.accent }}>{r.category}</span>
                  <h3 className="font-bold text-[#1A1A1A] text-base leading-snug">{r.title}</h3>
                  <div className="flex items-center justify-between text-xs text-[#9A7B6E] font-medium">
                    <span>⏱ {r.time}</span>
                    <span className="text-[#E85D26] font-bold group-hover:underline">View Recipe →</span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ FULL WIDTH BANNER ══ */}
      <Reveal className="relative h-[420px] md:h-[540px] overflow-hidden mx-6 rounded-3xl mb-20">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://i.pinimg.com/1200x/71/2b/bb/712bbbb3cf161176dba36f23551b7061.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-center px-12 md:px-20 max-w-2xl">
          <span className="inline-block bg-[#E85D26] text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-5 w-fit">🔥 Trending Now</span>
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>The burger that<br />broke the internet.</h2>
          <p className="text-white/80 text-lg mb-8">Juicy, stacked, and absolutely impossible to put down. See the recipe everyone's talking about.</p>
          <Link to="/recipes/details/5" className="inline-flex items-center gap-2 bg-[#E85D26] text-white font-bold text-base px-8 py-4 rounded-full shadow-xl hover:bg-white hover:text-[#E85D26] hover:scale-105 transition-all duration-300 w-fit">See the Recipe →</Link>
        </div>
      </Reveal>

      {/* ══ HOW IT WORKS — unique horizontal timeline style ══ */}
      <section className="py-24 px-6" style={{ background: '#1A1A1A' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-16">
            <span className="text-xs font-bold text-[#E85D26] uppercase tracking-widest">Simple as cooking</span>
            <h2 className="text-4xl font-black text-white mt-2" style={{ fontFamily: "'Playfair Display', serif" }}>How MealStack Works</h2>
          </Reveal>

          <div className="relative">
            {/* connector line */}
            <div className="hidden md:block absolute top-16 left-[16%] right-[16%] h-px bg-white/10" />

            <div className="grid md:grid-cols-3 gap-10">
              {STEPS.map((step, i) => (
                <Reveal key={step.title} delay={i * 120}>
                  <div className="flex flex-col items-center text-center group   "
                  >
                    {/* icon box */}
                    <div className="relative mb-6">
                      <div
                        className="w-32 h-32 rounded-3xl flex items-center justify-center mb-0 group-hover:scale-105 transition-transform duration-300 shadow-xl"
                        style={{ background: step.bg }}
                      >
                        <i className={`${step.icon} text-4xl`} style={{ color: step.color }}></i>
                      </div>
                      {/* step number badge */}
                      <span
                        className="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black shadow-lg"
                        style={{ background: step.color }}
                      >
                        {step.num}
                      </span>
                    </div>
                    <h3 className="text-white font-black text-xl mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{step.title}</h3>
                    <p className="text-[#9A8F83] text-sm leading-relaxed max-w-xs">{step.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA BANNER ══ */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <Reveal>
          <div className="rounded-3xl px-10 py-14 text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #E85D26, #F4A800)' }}>
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/10" />
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 relative" style={{ fontFamily: "'Playfair Display', serif" }}>Got a secret recipe?</h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto relative">Share your culinary creations with the world. Add ingredients, steps, and photos — it only takes a minute.</p>
            <Link to="/create-recipes" className="inline-block bg-white text-[#E85D26] font-black text-base px-10 py-4 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 relative">Start Creating →</Link>
          </div>
        </Reveal>
      </section>

      {/* ══════════════════════════════
          FOOTER — full food-themed
      ══════════════════════════════ */}
      <footer style={{ background: '#111008', fontFamily: "'DM Sans', sans-serif" }}>

        {/* Top section */}
        <div className="max-w-7xl mx-auto px-8 md:px-16 pt-16 pb-10 grid md:grid-cols-4 gap-12 border-b border-white/10">

          {/* Brand col */}
          <div className="md:col-span-1 space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 bg-[#E85D26] rounded-full flex items-center justify-center shadow-lg">
                <i className="fa-solid fa-utensils text-white text-sm"></i>
              </div>
              <span className="text-2xl font-black text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                Meal<span className="text-[#E85D26]">Stack</span>
              </span>
            </div>
            <p className="text-[#9A8F83] text-sm leading-relaxed">
              Your personal cookbook, online. Browse, create, and save recipes made with love from kitchens around the world.
            </p>
            {/* Social icons */}
            <div className="flex gap-3 flex-wrap">
              {[
                { icon: 'fa-brands fa-github',    href: 'https://github.com/Hari7206',                                                       tip: 'GitHub'    },
                { icon: 'fa-brands fa-linkedin',  href: 'https://www.linkedin.com/in/hari-thapa-67827835b/',                                 tip: 'LinkedIn'  },
                { icon: 'fa-brands fa-instagram', href: 'https://www.instagram.com/heaariii?igsh=MWE0amI4bzlsamoyYw==',                     tip: 'Instagram' },
                { icon: 'fa-brands fa-facebook',  href: 'https://www.facebook.com/profile.php?id=100015532638891',                           tip: 'Facebook'  },
              ].map((s) => (
                <a
                  key={s.tip}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.tip}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#9A8F83] hover:bg-[#E85D26] hover:text-white transition-all duration-300 hover:scale-110"
                >
                  <i className={`${s.icon} text-sm`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Explore col */}
          <div className="space-y-4">
            <h4 className="text-white font-black text-sm uppercase tracking-widest">Explore</h4>
            <ul className="space-y-2.5">
              {[['Home', '/'], ['All Recipes', '/recipes'], ['Create Recipe', '/create-recipes'], ['Favourites', '/Fav'], ['About Us', '/about']].map(([label, to]) => (
                <li key={label}>
                  <Link to={to} className="text-[#9A8F83] text-sm hover:text-[#E85D26] transition-colors duration-200 flex items-center gap-2">
                    <i className="fa-solid fa-chevron-right text-[10px] text-[#E85D26]/50"></i>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories col */}
          <div className="space-y-4">
            <h4 className="text-white font-black text-sm uppercase tracking-widest">Categories</h4>
            <ul className="space-y-2.5">
              {['Breakfast', 'Lunch', 'Dinner', 'Desserts', 'Drinks', 'Snacks'].map((cat) => (
                <li key={cat}>
                  <Link to={`/recipes?category=${cat.toLowerCase()}`} className="text-[#9A8F83] text-sm hover:text-[#E85D26] transition-colors duration-200 flex items-center gap-2">
                    <i className="fa-solid fa-chevron-right text-[10px] text-[#E85D26]/50"></i>
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact col */}
          <div className="space-y-4">
            <h4 className="text-white font-black text-sm uppercase tracking-widest">Get in Touch</h4>
            <ul className="space-y-4">
              <li>
                <a href="mailto:harithapa4654@gmail.com" className="flex items-start gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#E85D26] transition-colors duration-200 mt-0.5">
                    <i className="fa-solid fa-envelope text-[#9A8F83] group-hover:text-white text-xs transition-colors"></i>
                  </div>
                  <div>
                    <p className="text-white text-xs font-bold">Email</p>
                    <p className="text-[#9A8F83] text-xs mt-0.5 break-all">harithapa4654@gmail.com</p>
                  </div>
                </a>
              </li>
              <li>
                <a href="https://github.com/Hari7206" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#E85D26] transition-colors duration-200 mt-0.5">
                    <i className="fa-brands fa-github text-[#9A8F83] group-hover:text-white text-xs transition-colors"></i>
                  </div>
                  <div>
                    <p className="text-white text-xs font-bold">GitHub</p>
                    <p className="text-[#9A8F83] text-xs mt-0.5">github.com/Hari7206</p>
                  </div>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/hari-thapa-67827835b/" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#E85D26] transition-colors duration-200 mt-0.5">
                    <i className="fa-brands fa-linkedin text-[#9A8F83] group-hover:text-white text-xs transition-colors"></i>
                  </div>
                  <div>
                    <p className="text-white text-xs font-bold">LinkedIn</p>
                    <p className="text-[#9A8F83] text-xs mt-0.5">Hari Thapa</p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Middle food quote strip */}
        <div className="max-w-7xl mx-auto px-8 md:px-16 py-8 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-white/10">
          <p className="text-[#9A8F83] text-sm italic">
            "Cooking is at once child's play and adult joy. And cooking done with care is an act of love."
            <span className="text-[#E85D26] font-semibold not-italic ml-2">— Craig Claiborne</span>
          </p>
        
        </div>

        {/* Bottom bar */}
        <div className="max-w-7xl mx-auto px-8 md:px-16 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[#9A8F83] text-xs">
            © {new Date().getFullYear()} MealStack · Built with ❤️ by{' '}
            <a href="https://github.com/Hari7206" target="_blank" rel="noopener noreferrer" className="text-[#E85D26] hover:underline font-semibold">Hari Thapa</a>
          </p>
          <div className="flex items-center gap-4 text-[#9A8F83] text-xs">
            <span className="flex items-center gap-1.5">
              <i className="fa-solid fa-utensils text-[#E85D26]"></i>
              500+ Recipes
            </span>
            <span className="w-px h-3 bg-white/20" />
            <span className="flex items-center gap-1.5">
              <i className="fa-solid fa-globe text-[#E85D26]"></i>
              50+ Cuisines
            </span>
            <span className="w-px h-3 bg-white/20" />
            <span className="flex items-center gap-1.5">
              <i className="fa-solid fa-lock-open text-[#E85D26]"></i>
              Always Free
            </span>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default Home
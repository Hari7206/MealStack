import React from 'react'
import { Link } from 'react-router-dom'

const TEAM = [
  { initials: '', name: 'Hari Thapa', role: 'Founder & Head Chef',  bg: 'https://i.pinimg.com/736x/36/33/08/363308e210df50557193251f12b3b1ae.jpg', color: '#E85D26' },
  { initials: '', name: 'Mital Mehta',  role: 'Recipe Curator',        bg: 'https://i.pinimg.com/736x/9f/9b/13/9f9b13db6e1a7add576ad0ea85dbecc3.jpg', color: '#5A8A3C' },
  { initials: '', name: 'Lina Sherstha',   role: 'Food Photographer',     bg: 'https://i.pinimg.com/1200x/af/0a/98/af0a98fc8b0538948d75b77fe0d2ce29.jpg', color: '#7C3AED' },
]

const VALUES = [
  { num: '01', title: 'Fresh Ingredients', desc: "Every recipe on Dishcraft champions whole, fresh, seasonal ingredients over processed alternatives." },
  { num: '02', title: 'Global Flavours',   desc: "From butter chicken to crème brûlée — we celebrate the incredible diversity of world cuisines." },
  { num: '03', title: 'Community First',   desc: "Dishcraft is built by home cooks, for home cooks. Your recipes are as valuable as any chef's." },
  { num: '04', title: 'Made with Love',    desc: "We believe cooking is an act of love. Every feature we build is designed to make that easier." },
]

function About() {
  return (
    <main
      className="min-h-screen"
      style={{ fontFamily: "'DM Sans', sans-serif", background: '#F9F7F4' }}
    >
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* ── HERO — full bleed editorial ── */}
      <section className="pt-32 pb-0 px-8 md:px-16 max-w-7xl mx-auto">
        <span className="text-xs font-bold text-[#9A8F83] uppercase tracking-widest"> Our Story</span>

        <div className="mt-4 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#E8E2D9]">
          <h1
            className="text-6xl md:text-8xl font-black text-[#1A1A1A] leading-[0.95]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Cooking<br />
            <span className="italic text-[#E85D26]">is care.</span>
          </h1>
          <div className="max-w-sm space-y-4">
            <p className="text-[#6B6560] text-base leading-relaxed">
              Dishcraft was born from a simple idea — that every great recipe deserves to be shared, discovered, and passed down. We built a home for food lovers everywhere.
            </p>
            <Link
              to="/recipes"
              className="inline-flex items-center gap-2 bg-[#1A1A1A] text-white font-bold text-sm px-6 py-3 rounded-full hover:bg-[#E85D26] transition-all duration-300"
            >
              Explore Recipes →
            </Link>
          </div>
        </div>
      </section>

      {/* ── IMAGE PLACEHOLDER — full bleed ── */}
      <section className="px-8 md:px-16 max-w-7xl mx-auto py-12">
        <div
          className="w-full h-72 md:h-[460px] rounded-3xl flex items-center justify-center relative overflow-hidden bg-cover bg-center"
          style={{
    backgroundImage:
      "url('https://i.pinimg.com/1200x/89/74/5f/89745f074f6dcf3e17a72be383eb7d8e.jpg')",
  }}
        >
    
          {/* corner label like "Your Journey" in reference */}
          <span className="absolute top-5 right-5 bg-white text-[#1A1A1A] text-xs font-black px-4 py-2 rounded-full shadow-md">
            Since 2024
          </span>
        </div>
      </section>

      {/* ── STATS — horizontal bar like reference ── */}
      <section className="px-8 md:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 border border-[#E8E2D9] rounded-2xl overflow-hidden bg-white">
          {[
            { num: '500+', label: 'Recipes' },
            { num: '50+',  label: 'Cuisines' },
            { num: '10K+', label: 'Home Cooks' },
            { num: '100%', label: 'Free Forever' },
          ].map((s, i) => (
            <div
              key={s.label}
              className={`p-8 text-center ${i < 3 ? 'border-r border-[#E8E2D9]' : ''}`}
            >
              <p
                className="text-4xl font-black text-[#1A1A1A]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {s.num}
              </p>
              <p className="text-sm text-[#9A8F83] font-medium mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── VALUES — numbered list editorial style ── */}
      <section className="px-8 md:px-16 max-w-7xl mx-auto py-20">
        <div className="flex flex-col md:flex-row gap-16">
          {/* sticky left label */}
          <div className="md:w-64 flex-shrink-0">
            <span className="text-xs font-bold text-[#9A8F83] uppercase tracking-widest">What we believe</span>
            <h2
              className="text-3xl font-black text-[#1A1A1A] mt-3 leading-snug"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Our core<br />values
            </h2>
          </div>

          {/* values list */}
          <div className="flex-1 divide-y divide-[#E8E2D9]">
            {VALUES.map((v) => (
              <div key={v.num} className="py-8 flex gap-8 items-start group">
                <span className="text-sm font-black text-[#BDB5A8] w-8 flex-shrink-0 pt-1">{v.num}</span>
                <div className="flex-1">
                  <h3
                    className="text-xl font-black text-[#1A1A1A] mb-2 group-hover:text-[#E85D26] transition-colors duration-200"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {v.title}
                  </h3>
                  <p className="text-[#6B6560] text-sm leading-relaxed">{v.desc}</p>
                </div>
                <span className="text-[#E8E2D9] text-2xl group-hover:text-[#E85D26] transition-colors duration-200 flex-shrink-0 pt-1">→</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM — editorial cards ── */}
      <section className="px-8 md:px-16 max-w-7xl mx-auto pb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#E8E2D9]">
          <div>
            <span className="text-xs font-bold text-[#9A8F83] uppercase tracking-widest">The People</span>
            <h2
              className="text-3xl font-black text-[#1A1A1A] mt-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Meet the team
            </h2>
          </div>
          <p className="text-[#9A8F83] text-sm max-w-xs mt-3 md:mt-0 leading-relaxed">
            The people behind every recipe, feature, and flavour.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="group rounded-2xl border border-[#E8E2D9] bg-white overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Photo placeholder */}
              <div
                className="h-52 flex items-center justify-center relative bg-cover bg-center"
                style={{  backgroundImage: `url(${member.bg})`}}
              >
                <span
                  className="text-5xl font-black"
                  style={{ color: member.color }}
                >
                  {member.initials}
                </span>
                <span className="absolute bottom-3 right-3 text-xs font-bold px-3 py-1 rounded-full bg-white/80" style={{ color: member.color }}>
                  {member.role.split('&')[0].trim()}
                </span>
              </div>
              {/* Info */}
              <div className="p-5 flex items-center justify-between">
                <div>
                  <h3 className="font-black text-[#1A1A1A] text-base">{member.name}</h3>
                  <p className="text-xs text-[#9A8F83] mt-0.5">{member.role}</p>
                </div>
                <span className="text-[#E8E2D9] group-hover:text-[#E85D26] transition-colors text-xl">→</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── BOTTOM CTA — like reference footer CTA ── */}
      <section
        className="px-8 md:px-16 py-24"
        style={{ background: '#1A1A1A' }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-xs font-bold text-[#9A8F83] uppercase tracking-widest">Start Now</span>
            <h2
              className="text-4xl md:text-5xl font-black text-white mt-2 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Ready to start<br />
              <span className="italic text-[#E85D26]">cooking?</span>
            </h2>
            <p className="text-[#9A8F83] mt-3 text-sm leading-relaxed max-w-sm">
              Join thousands of home cooks on Dishcraft today. Browse, create, and save recipes you love.
            </p>
          </div>
          <div className="flex gap-4 flex-wrap">
            <Link
              to="/recipes"
              className="bg-white text-[#1A1A1A] font-black px-8 py-4 rounded-full hover:bg-[#E85D26] hover:text-white hover:scale-105 transition-all duration-300 shadow-xl text-sm"
            >
              Browse Recipes
            </Link>
            <Link
              to="/create-recipes"
              className="bg-[#E85D26] text-white font-black px-8 py-4 rounded-full hover:scale-105 transition-all duration-300 shadow-xl text-sm"
            >
              + Create Recipe
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default About
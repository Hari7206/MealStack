import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function PageNotFound() {
  const navigate = useNavigate()
  const [count, setCount] = useState(8)

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          navigate('/')
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [navigate])

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-4 text-center relative overflow-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif", background: '#FFFBF5' }}
    >
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* Background blobs */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#E85D26]/8 -z-10" />
      <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-[#F4A800]/10 -z-10" />

      {/* Floating food emojis */}
      {['🍕', '🍜', '🍰', '🥗', '🍔', '🧁'].map((emoji, i) => (
        <div
          key={emoji}
          className="absolute text-4xl opacity-20 animate-bounce select-none"
          style={{
            top:             `${10 + i * 14}%`,
            left:            i % 2 === 0 ? `${5 + i * 3}%` : undefined,
            right:           i % 2 !== 0 ? `${5 + i * 3}%` : undefined,
            animationDelay:  `${i * 0.4}s`,
            animationDuration:`${2 + i * 0.3}s`,
          }}
        >
          {emoji}
        </div>
      ))}

      {/* 404 number */}
      <div
        className="text-[10rem] md:text-[14rem] font-black leading-none select-none mb-4"
        style={{
          fontFamily: "'Playfair Display', serif",
          WebkitTextStroke: '3px #E85D26',
          color: 'transparent',
        }}
      >
        404
      </div>

      {/* Content */}
      <div className="max-w-md">
        <h1
          className="text-3xl md:text-4xl font-black text-[#1A1A1A] mb-3"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Oops! This dish doesn't exist.
        </h1>
        <p className="text-[#9A7B6E] text-base leading-relaxed mb-8">
          Looks like this page got burned in the kitchen. Don't worry —
          there are plenty of delicious recipes waiting for you.
        </p>

        {/* Countdown pill */}
        <div className="inline-flex items-center gap-2 bg-[#FFF0E0] text-[#E85D26] text-sm font-bold px-4 py-2 rounded-full mb-8">
          <span>⏱</span>
          <span>Taking you home in {count}s…</span>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/"
            className="bg-[#E85D26] text-white font-black px-8 py-3.5 rounded-full shadow-xl hover:bg-[#c94e1f] hover:scale-105 transition-all duration-300"
          >
            🏠 Go Home
          </Link>
          <Link
            to="/recipes"
            className="bg-white text-[#1A1A1A] font-black px-8 py-3.5 rounded-full shadow-md border border-[#EDE0D4] hover:border-[#E85D26] hover:text-[#E85D26] hover:scale-105 transition-all duration-300"
          >
            Browse Recipes →
          </Link>
        </div>
      </div>
    </main>
  )
}

export default PageNotFound
import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { to: '/', label: 'Home' },
    { to: '/recipes', label: 'Recipes' },
    { to: '/create-recipes', label: 'Create Recipe' },
    { to: '/Fav', label: 'Favourites' },
    { to: '/about', label: 'About' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#FFFBF5]/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 bg-[#E85D26] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
            <span className="text-lg">🍳</span>
          </div>
          <span
            className="text-[1.6rem] font-black tracking-tight leading-none"
            style={{ fontFamily: "'Playfair Display', serif", color: '#1A1A1A' }}
          >
            Meal<span className="text-[#E85D26]">Stack</span>
          </span>
        </NavLink>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? 'bg-[#E85D26] text-white shadow-md'
                      : 'text-[#3D2B1F] hover:bg-[#F5E6D8] hover:text-[#E85D26]'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* CTA Button Desktop */}
        <NavLink
          to="/create-recipes"
          className="hidden md:flex items-center gap-2 bg-[#1A1A1A] text-white text-sm font-bold px-5 py-2.5 rounded-full hover:bg-[#E85D26] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
        >
          + New Recipe
        </NavLink>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-[#1A1A1A] transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[#1A1A1A] transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[#1A1A1A] transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-[#FFFBF5] mx-4 mt-2 rounded-2xl shadow-2xl px-4 py-4 flex flex-col gap-1 border border-[#F0D9C8]">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive ? 'bg-[#E85D26] text-white' : 'text-[#3D2B1F] hover:bg-[#F5E6D8]'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <NavLink
            to="/create-recipes"
            onClick={() => setMenuOpen(false)}
            className="mt-2 text-center bg-[#1A1A1A] text-white text-sm font-bold px-5 py-3 rounded-xl hover:bg-[#E85D26] transition-all duration-300"
          >
            + New Recipe
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Nav
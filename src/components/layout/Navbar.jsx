import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { id: 'story',      label: 'Story' },
  { id: 'chapters',   label: 'Chapters' },
  { id: 'baymax',     label: 'Baymax' },
  { id: 'dimension',  label: 'Dimension' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive]     = useState('story')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setActive(id)
    setMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass border-b border-white/[0.06] shadow-[0_8px_40px_rgba(0,0,0,0.6)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <button
          onClick={() => scrollTo('story')}
          className="flex items-center gap-3 group"
          aria-label="Back to top"
        >
          {/* Baymax icon */}
          <div className="w-8 h-8 rounded-full border border-white/20 bg-white/5 flex items-center justify-center group-hover:border-portal-teal/50 transition-colors duration-300">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" className="group-hover:scale-110 transition-transform duration-300">
              <ellipse cx="12" cy="9" rx="5" ry="4.5" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5"/>
              <ellipse cx="9.5" cy="9" rx="1.5" ry="1.5" fill="#111827"/>
              <ellipse cx="14.5" cy="9" rx="1.5" ry="1.5" fill="#111827"/>
              <line x1="9.5" y1="9" x2="14.5" y2="9" stroke="rgba(255,255,255,0.9)" strokeWidth="1.2"/>
              <ellipse cx="12" cy="17" rx="7" ry="6.5" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5"/>
            </svg>
          </div>
          <div className="hidden sm:block">
            <span className="font-display font-bold text-sm text-white tracking-wide">
              Beyond the Portal
            </span>
            <span className="block font-mono text-[9px] text-portal-teal/70 tracking-[0.2em] uppercase">
              Hiro &amp; Baymax
            </span>
          </div>
        </button>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`relative px-4 py-2 font-mono text-xs tracking-wider uppercase transition-colors duration-200 ${
                active === link.id
                  ? 'text-portal-teal'
                  : 'text-white/50 hover:text-white/90'
              }`}
            >
              {link.label}
              {active === link.id && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-portal-teal"
                />
              )}
            </button>
          ))}
        </div>

        {/* Right side HUD badge */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded border border-portal-red/30 bg-portal-red/8">
            <span className="w-1.5 h-1.5 rounded-full bg-portal-red animate-pulse" />
            <span className="font-mono text-[9px] text-portal-red tracking-widest uppercase">
              Portal Active
            </span>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5 rounded border border-white/10 bg-white/5"
            aria-label="Menu"
          >
            <span className={`w-4 h-px bg-white transition-all ${menuOpen ? 'rotate-45 translate-y-1' : ''}`} />
            <span className={`w-4 h-px bg-white transition-all ${menuOpen ? '-rotate-45 -translate-y-1' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden glass border-t border-white/[0.06] overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {NAV_LINKS.map(link => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-left px-3 py-2.5 rounded font-mono text-xs tracking-wider uppercase text-white/70 hover:text-white hover:bg-white/5 transition-all"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

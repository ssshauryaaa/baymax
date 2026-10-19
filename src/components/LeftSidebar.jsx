import { useState, useEffect } from 'react'
import BigHero6Banner from './BigHero6Banner'

function pad(n) { return String(Math.max(0, n)).padStart(2, '0') }

function useCountdown() {
  const [t, setT] = useState({ days: 16, hours: 7, min: 25, sec: 14 })
  useEffect(() => {
    const id = setInterval(() => {
      setT(prev => {
        let { days, hours, min, sec } = prev
        sec--
        if (sec < 0) {
          sec = 59
          min--
          if (min < 0) {
            min = 59
            hours--
            if (hours < 0) {
              hours = 23
              days = Math.max(0, days - 1)
            }
          }
        }
        return { days, hours, min, sec }
      })
    }, 1000)
    return () => clearInterval(id)
  }, [])
  return t
}

function SectionTitle({ children, id }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <h3 id={id} className="whitespace-nowrap font-cond text-[9px] font-bold uppercase tracking-[0.26em] text-white/80">
        {children}
      </h3>
      <div className="h-px flex-1 bg-white/20" aria-hidden="true" />
    </div>
  )
}

const ring = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60'

export default function LeftSidebar({ slide = 0, setSlide = () => {}, onTrailer = () => {}, onAudioChange, currentPage = 'story', setCurrentPage = () => {} }) {
  const { days, hours, min, sec } = useCountdown()
  const [audioOn, setAudioOn]     = useState(true)
  const [legalOpen, setLegalOpen] = useState(false)
  const TOTAL_DOTS = 6

  const flipAudio = () => {
    const next = !audioOn
    setAudioOn(next)
    onAudioChange?.(next)
  }

  return (
    <aside
      id="left-sidebar"
      aria-label="Site navigation"
      className="no-scrollbar flex flex-col flex-shrink-0 z-20 overflow-y-auto overflow-x-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden select-none"
      style={{ width: 200, background: 'transparent' }}
    >
      {/* Floating glass card */}
      <div
        className="flex flex-col flex-1 mx-2 my-2 overflow-hidden border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.55)] backdrop-blur-md"
        style={{ background: 'rgba(18,28,40,0.72)', borderRadius: 3 }}
      >
        {/* Red badge at top */}
        <BigHero6Banner />

        {/* Body */}
        <div className="flex flex-col flex-1 justify-between px-3.5 py-3 gap-3">

          {/* MISSION HUBS */}
          <div>
            <SectionTitle id="sb-mission">Mission Protocols</SectionTitle>
            <div className="flex flex-col gap-1">
              {[
                {
                  id: 'story',
                  label: 'Story Chronicle',
                  icon: (
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    </svg>
                  ),
                },
                {
                  id: 'diagnostics',
                  label: 'Baymax Care Hub',
                  icon: (
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  ),
                },
                {
                  id: 'codex',
                  label: 'Dimension Codex',
                  icon: (
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="12 2 2 7 12 12 22 7 12 2" />
                      <polyline points="2 17 12 22 22 17" />
                      <polyline points="2 12 12 17 22 12" />
                    </svg>
                  ),
                },
                {
                  id: 'radar',
                  label: 'Escape Radar',
                  icon: (
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="2" x2="12" y2="22" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                    </svg>
                  ),
                },
                {
                  id: 'comms',
                  label: 'Comms Relay',
                  icon: (
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4.93 19.07A10 10 0 0 1 12 2a10 10 0 0 1 7.07 17.07" />
                      <path d="M7.76 16.24A6 6 0 0 1 12 6a6 6 0 0 1 4.24 10.24" />
                      <circle cx="12" cy="16" r="2" fill="currentColor" />
                    </svg>
                  ),
                },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`flex items-center gap-2 px-2 py-1 rounded text-left transition-all text-[9.5px] font-cond font-bold uppercase tracking-wider ${
                    currentPage === item.id
                      ? 'bg-red-hero text-white shadow-sm'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  <span className="truncate">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* GET TICKETS */}
          <div>
            <SectionTitle id="sb-tickets">Get Tickets</SectionTitle>

            {/* ZIP input */}
            <div className="flex items-center h-7 border border-white/30 bg-black/20 overflow-hidden focus-within:border-white/60 transition-colors duration-150 mb-2" style={{ borderRadius: 2 }}>
              <input
                id="zip-input"
                type="text"
                placeholder="ENTER YOUR ZIP CODE"
                maxLength={10}
                aria-label="Enter zip code"
                className="flex-1 min-w-0 bg-transparent text-white placeholder-white/40 text-[8.5px] font-cond tracking-widest uppercase px-2 outline-none"
              />
              <button
                id="zip-submit"
                aria-label="Find tickets"
                className={`flex-shrink-0 w-7 h-7 flex items-center justify-center text-white/70 hover:text-white bg-white/5 hover:bg-white/15 border-l border-white/20 transition-all ${ring}`}
              >
                <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor">
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                </svg>
              </button>
            </div>

            {/* Countdown */}
            <div id="countdown" className="grid grid-cols-4 gap-[2px]">
              {[
                { label: 'DAYS',  val: pad(days)  },
                { label: 'HOURS', val: pad(hours) },
                { label: 'MIN',   val: pad(min)   },
                { label: 'SEC',   val: pad(sec)   },
              ].map(({ label, val }) => (
                <div key={label} className="flex flex-col items-center bg-black/25 border border-white/15 py-1" style={{ borderRadius: 2 }}>
                  <span className="text-white/50 text-[6px] font-cond tracking-wider uppercase font-semibold leading-none mb-0.5">
                    {label}
                  </span>
                  <span id={`cd-${label.toLowerCase()}`} className="text-white font-oswald font-bold text-[13px] leading-none tabular-nums">
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* WATCH THE TRAILER */}
          <button
            id="trailer-btn"
            type="button"
            onClick={onTrailer}
            aria-label="Watch the trailer"
            className={`group flex items-center gap-2 border border-white/40 hover:border-white bg-black/30 hover:bg-black/55 p-[2px] transition-all duration-200 ${ring}`}
          >
            <div className="relative w-12 h-10 flex-shrink-0 border border-white/35 bg-slate-900 overflow-hidden flex items-center justify-center">
              <img
                src="/hiro-baymax-armor.png"
                alt="Trailer preview"
                className="w-full h-full object-cover object-left scale-125"
              />
              <div className="absolute inset-0 bg-black/25" />
              <div className="absolute w-5 h-5 rounded-full border border-white/90 flex items-center justify-center bg-black/50 group-hover:scale-110 transition-transform duration-200">
                <svg viewBox="0 0 24 24" width="9" height="9" fill="white" className="ml-0.5" aria-hidden="true">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
            <span className="font-cond font-bold text-[9.5px] tracking-[0.18em] uppercase text-white leading-tight text-left pr-1">
              Watch the Trailer
            </span>
          </button>

          {/* Dot indicators */}
          <div className="flex flex-col items-center gap-1 self-center">
            <span className="text-[7px] font-cond font-bold uppercase tracking-[0.2em] text-white/40">
              Story Chapters
            </span>
            <div className="flex items-center gap-1.5" role="group" aria-label="Slide indicator">
              {Array.from({ length: TOTAL_DOTS }, (_, i) => (
                <button
                  key={i}
                  id={`dot-${i}`}
                  type="button"
                  onClick={() => {
                    setCurrentPage?.('story')
                    setSlide(i)
                  }}
                  aria-label={`Slide ${i + 1}`}
                  aria-current={currentPage === 'story' && slide === i ? 'step' : undefined}
                  className={`transition-all duration-200 rounded-full ${
                    currentPage === 'story' && slide === i ? 'w-4 h-2 bg-white shadow-sm' : 'w-2 h-2 border border-white/45 bg-transparent hover:border-white/80'
                  } ${ring}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Footer: AUDIO · LEGAL */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-white/10 bg-black/20">
          <button
            id="audio-btn"
            type="button"
            onClick={flipAudio}
            aria-pressed={audioOn}
            className={`font-cond text-[9px] font-bold uppercase tracking-[0.2em] text-white/65 hover:text-white transition-colors ${ring}`}
          >
            Audio:&nbsp;<span className={audioOn ? 'text-white' : 'text-white/35'}>{audioOn ? 'On' : 'Off'}</span>
          </button>
          <button
            id="legal-btn"
            type="button"
            onClick={() => setLegalOpen(o => !o)}
            aria-expanded={legalOpen}
            className={`flex items-center gap-0.5 font-cond text-[9px] font-bold uppercase tracking-[0.2em] text-white/65 hover:text-white transition-colors ${ring}`}
          >
            Legal
            <svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor" aria-hidden="true"
              className={`transition-transform duration-150 ${legalOpen ? 'rotate-180' : ''}`}>
              <path d="M7 10l5 5 5-5z"/>
            </svg>
          </button>
        </div>

        {legalOpen && (
          <div className="px-4 pb-3 pt-1.5 text-[8px] leading-relaxed text-white/50 font-cond tracking-wide border-t border-white/10 bg-black/20">
            Fan-made project. Not affiliated with or endorsed by Disney. All character rights belong to their respective owners.
          </div>
        )}
      </div>
    </aside>
  )
}

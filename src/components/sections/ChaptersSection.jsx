import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CHAPTERS } from '../../data/chapters'
import { Badge, Tag, SectionLabel } from '../ui/Elements'

/* ─── Chapter illustration (SVG scenes) ───────────────────── */
function ChapterIllustration({ chapter }) {
  const { num, accent } = chapter

  const scenes = {
    '01': (
      <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden="true">
        <defs>
          <radialGradient id={`g${num}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor={accent} stopOpacity="0.4"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="80" fill={`url(#g${num})`}/>
        <circle cx="100" cy="100" r="60" fill="none" stroke={accent} strokeWidth="1.5" opacity="0.7"/>
        <circle cx="100" cy="100" r="40" fill="none" stroke="white"  strokeWidth="0.8" opacity="0.2"/>
        <circle cx="100" cy="100" r="22" fill={accent} opacity="0.15"/>
        {/* Hiro leaping */}
        <g transform="translate(75,60)">
          <circle cx="12" cy="8" r="7" fill="rgba(255,255,255,0.9)"/>
          <path d="M7 15 Q12 26 17 15" fill="rgba(255,255,255,0.8)"/>
          <line x1="7"  y1="18" x2="-2" y2="25" stroke="rgba(255,255,255,0.8)" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="17" y1="18" x2="26" y2="22" stroke="rgba(255,255,255,0.8)" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="10" y1="26" x2="7"  y2="40" stroke="rgba(255,255,255,0.8)" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="14" y1="26" x2="20" y2="38" stroke="rgba(255,255,255,0.8)" strokeWidth="2.5" strokeLinecap="round"/>
        </g>
        {/* Chip spark */}
        <circle cx="106" cy="98" r="4" fill={accent} opacity="0.9"/>
        <circle cx="106" cy="98" r="8" fill="none" stroke={accent} strokeWidth="1" opacity="0.4"/>
      </svg>
    ),
    '02': (
      <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden="true">
        <defs>
          <radialGradient id={`g${num}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor={accent} stopOpacity="0.25"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
        </defs>
        <ellipse cx="100" cy="100" rx="90" ry="80" fill={`url(#g${num})`}/>
        {/* Baymax empty floating shell */}
        <g transform="translate(60,30)">
          <ellipse cx="40" cy="18" rx="18" ry="16" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
          <ellipse cx="33" cy="18" rx="4"  ry="3.5" fill="rgba(30,30,50,0.8)"/>
          <ellipse cx="47" cy="18" rx="4"  ry="3.5" fill="rgba(30,30,50,0.8)"/>
          <ellipse cx="40" cy="60" rx="28" ry="32" fill="rgba(255,255,255,0.1)"  stroke="rgba(255,255,255,0.35)" strokeWidth="1.5"/>
          <circle cx="40" cy="52" r="8" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="3 2"/>
          <ellipse cx="7"  cy="48" rx="9" ry="22" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" transform="rotate(-18,7,48)"/>
          <ellipse cx="73" cy="45" rx="9" ry="22" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" transform="rotate(12,73,45)"/>
        </g>
        {/* Floating debris */}
        {[[15,40,5],[165,60,4],[20,145,6],[170,130,3],[55,170,5]].map(([x,y,r],i)=>(
          <circle key={i} cx={x} cy={y} r={r} fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
        ))}
        {/* Chip in hand */}
        <rect x="12" y="148" width="20" height="14" rx="2" fill={`${accent}aa`} stroke={accent} strokeWidth="1"/>
      </svg>
    ),
    '03': (
      <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden="true">
        <defs>
          <radialGradient id={`g${num}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor={accent} stopOpacity="0.3"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
        </defs>
        <ellipse cx="100" cy="100" rx="90" ry="80" fill={`url(#g${num})`}/>
        {/* Baymax online — glowing */}
        <g transform="translate(60,20)">
          <ellipse cx="40" cy="18" rx="20" ry="18" fill="rgba(255,255,255,0.18)" stroke={accent} strokeWidth="2"/>
          <ellipse cx="33" cy="18" rx="4"  ry="3.5" fill="#1a1a2e"/>
          <ellipse cx="47" cy="18" rx="4"  ry="3.5" fill="#1a1a2e"/>
          <path d="M35 25 Q40 30 45 25" fill="none" stroke={accent} strokeWidth="1.8" strokeLinecap="round"/>
          <ellipse cx="40" cy="62" rx="30" ry="34" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/>
          <circle cx="40" cy="52" r="10" fill={`${accent}50`} stroke={accent} strokeWidth="2"/>
          <circle cx="40" cy="52" r="5"  fill={accent} opacity="0.9"/>
          <ellipse cx="5"  cy="50" rx="9" ry="22" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" transform="rotate(-25,5,50)"/>
          <ellipse cx="75" cy="50" rx="9" ry="22" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" transform="rotate(25,75,50)"/>
        </g>
        {/* Glow rings */}
        <circle cx="100" cy="90" r="55" fill="none" stroke={accent} strokeWidth="0.5" opacity="0.3"/>
        <circle cx="100" cy="90" r="70" fill="none" stroke={accent} strokeWidth="0.3" opacity="0.15"/>
      </svg>
    ),
    '04': (
      <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden="true">
        <defs>
          <radialGradient id={`g${num}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor={accent} stopOpacity="0.2"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
        </defs>
        <ellipse cx="100" cy="100" rx="95" ry="90" fill={`url(#g${num})`}/>
        {/* Inverted canyon shapes */}
        <path d="M0 0 Q50 30 70 0 L70 55 Q50 40 0 65 Z" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
        <path d="M130 0 Q160 35 200 15 L200 65 Q160 45 130 60 Z" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
        {/* Energy pillars */}
        {[45, 90, 145].map((x,i) => (
          <g key={i}>
            <rect x={x} y={40} width={6} height={130} fill={`${accent}15`} stroke={`${accent}50`} strokeWidth="1"/>
            <ellipse cx={x+3} cy={40} rx={9} ry={4} fill={`${accent}35`}/>
          </g>
        ))}
        {/* Path + characters */}
        <rect x="60" y="120" width="100" height="7" rx="2" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.25)" strokeWidth="1"/>
        <g transform="translate(75,88)">
          <ellipse cx="14" cy="10" rx="11" ry="9" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
          <ellipse cx="9"  cy="10" rx="2.5" ry="2" fill="#1a1a2e"/>
          <ellipse cx="19" cy="10" rx="2.5" ry="2" fill="#1a1a2e"/>
          <ellipse cx="14" cy="30" rx="18" ry="22" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
        </g>
        <g transform="translate(115,96)">
          <circle cx="9" cy="7" r="6" fill="rgba(255,255,255,0.8)"/>
          <path d="M5 13 Q9 20 13 13" fill="rgba(255,255,255,0.7)"/>
        </g>
      </svg>
    ),
    '05': (
      <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden="true">
        <defs>
          <radialGradient id={`g${num}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor={accent} stopOpacity="0.22"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
          <linearGradient id="bridgeGrad05" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor={accent} stopOpacity="0.7"/>
            <stop offset="50%"  stopColor="#2DD4BF" stopOpacity="0.4"/>
            <stop offset="100%" stopColor={accent} stopOpacity="0.7"/>
          </linearGradient>
        </defs>
        <ellipse cx="100" cy="100" rx="90" ry="85" fill={`url(#g${num})`}/>
        {/* Bridge */}
        <rect x="15" y="118" width="170" height="8" rx="3" fill="url(#bridgeGrad05)" stroke={`${accent}80`} strokeWidth="1"/>
        {[35,68,100,133,165].map((x,i)=>(
          <line key={i} x1={x} y1={126} x2={x} y2={160} stroke={`${accent}40`} strokeWidth="1.5"/>
        ))}
        {/* Glitch gaps */}
        <rect x="78"  y="114" width="30" height="16" rx="2" fill="rgba(0,0,0,0.5)" stroke={`${accent}30`} strokeWidth="1" strokeDasharray="4 2"/>
        {/* Baymax shielding */}
        <g transform="translate(42,68)">
          <ellipse cx="16" cy="12" rx="13" ry="11" fill="rgba(255,255,255,0.22)" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/>
          <ellipse cx="11" cy="12" rx="3"  ry="2.5" fill="#1a1a2e"/>
          <ellipse cx="21" cy="12" rx="3"  ry="2.5" fill="#1a1a2e"/>
          <ellipse cx="16" cy="35" rx="20" ry="24" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
          <ellipse cx="-8" cy="28" rx="7"  ry="18"  fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" transform="rotate(-35,-8,28)"/>
        </g>
        {/* Hiro building */}
        <g transform="translate(126,82)">
          <circle cx="9" cy="7" r="7" fill="rgba(255,255,255,0.8)"/>
          <path d="M5 14 Q9 20 13 14" fill="rgba(255,255,255,0.7)"/>
          <line x1="5" y1="17" x2="-3" y2="28" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="-3" cy="28" r="3" fill={`${accent}99`}/>
        </g>
      </svg>
    ),
    '06': (
      <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden="true">
        <defs>
          <radialGradient id={`g${num}a`} cx="75%" cy="50%" r="45%">
            <stop offset="0%"   stopColor={accent} stopOpacity="0.35"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
          <radialGradient id={`g${num}b`} cx="75%" cy="50%" r="40%">
            <stop offset="0%"   stopColor="white" stopOpacity="0.2"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
        </defs>
        <ellipse cx="150" cy="100" rx="70" ry="85" fill={`url(#g${num}a)`}/>
        {/* Closing gate */}
        <ellipse cx="155" cy="100" rx="45" ry="75" fill={`url(#g${num}b)`} stroke={accent} strokeWidth="2" opacity="0.8"/>
        <ellipse cx="155" cy="100" rx="28" ry="55" fill="rgba(255,255,255,0.1)" stroke="white" strokeWidth="0.8" opacity="0.5"/>
        {/* Hiro going through — reaching back */}
        <g transform="translate(122,65)">
          <circle cx="10" cy="7"  r="7"  fill="rgba(255,255,255,0.9)"/>
          <path d="M6 14 Q10 22 14 14" fill="rgba(255,255,255,0.8)"/>
          <line x1="6"  y1="17" x2="-8" y2="16" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round"/>
          <line x1="14" y1="17" x2="24" y2="21" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round"/>
        </g>
        {/* Baymax being pulled */}
        <g transform="translate(60,70)">
          <ellipse cx="16" cy="12" rx="14" ry="12" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5"/>
          <ellipse cx="11" cy="12" rx="3"  ry="2.5" fill="#1a1a2e"/>
          <ellipse cx="21" cy="12" rx="3"  ry="2.5" fill="#1a1a2e"/>
          <path d="M11 19 Q16 23 21 19" fill="none" stroke={accent} strokeWidth="1.5" strokeLinecap="round"/>
          <ellipse cx="16" cy="36" rx="22" ry="25" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5"/>
          <ellipse cx="44" cy="25" rx="7"  ry="16"  fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" transform="rotate(25,44,25)"/>
          {/* Battery low */}
          <rect x="10" y="48" width="12" height="6" rx="1" fill="none" stroke="rgba(229,56,59,0.7)" strokeWidth="1"/>
          <rect x="11" y="49" width="3"  height="4" rx="0.5" fill="rgba(229,56,59,0.7)"/>
        </g>
        {/* Connection line */}
        <line x1="106" y1="94" x2="122" y2="92" stroke={`${accent}80`} strokeWidth="2" strokeLinecap="round" strokeDasharray="3 2"/>
        {/* Star flecks — home dimension */}
        {[[30,30],[60,15],[170,20],[185,70],[180,160]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="1.5" fill="white" opacity={0.3 + Math.random()*0.4}/>
        ))}
      </svg>
    ),
  }

  return (
    <div className="w-full h-full flex items-center justify-center" style={{ height: 220 }}>
      {scenes[num] || scenes['01']}
    </div>
  )
}

/* ─── Single chapter card ──────────────────────────────────── */
function ChapterCard({ chapter, isActive, onClick, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className={`relative cursor-pointer rounded overflow-hidden border transition-all duration-400 hover-glow ${
        isActive
          ? 'border-white/20 shadow-lg'
          : 'border-white/[0.07] hover:border-white/15'
      }`}
      style={{
        background: isActive
          ? `linear-gradient(135deg, ${chapter.accentDim}, rgba(6,13,31,0.9))`
          : 'rgba(6,13,31,0.7)',
        boxShadow: isActive ? `0 0 40px ${chapter.accent}20` : undefined,
      }}
      whileHover={{ y: -2 }}
    >
      {/* Active left border accent */}
      {isActive && (
        <div
          className="absolute left-0 top-0 bottom-0 w-0.5"
          style={{ background: chapter.accent }}
        />
      )}

      {/* Chapter number watermark */}
      <span
        className="absolute top-2 right-3 font-display font-black select-none pointer-events-none"
        style={{
          fontSize: '4.5rem',
          color: isActive ? `${chapter.accent}18` : 'rgba(255,255,255,0.04)',
          lineHeight: 1,
        }}
      >
        {chapter.num}
      </span>

      <div className="p-5 relative z-10">
        {/* Zone + badge */}
        <div className="flex items-center justify-between mb-3">
          <span
            className="font-mono text-[8px] tracking-[0.25em] uppercase px-2 py-0.5 rounded border"
            style={{
              color: chapter.accent,
              borderColor: `${chapter.accent}40`,
              background: `${chapter.accent}10`,
            }}
          >
            {chapter.zone}
          </span>
          <Badge variant={chapter.status}>{chapter.status}</Badge>
        </div>

        {/* Title */}
        <h3
          className="font-display font-bold text-xl leading-tight mb-1.5"
          style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.8)' }}
        >
          {chapter.title}
        </h3>
        <p className="font-mono text-[10px] mb-3" style={{ color: chapter.accent + '99' }}>
          {chapter.subtitle}
        </p>

        {/* Body text */}
        <p className="text-white/55 text-sm leading-relaxed mb-4 line-clamp-3">
          {chapter.body}
        </p>

        {/* Mission objective */}
        <div
          className="p-3 rounded border"
          style={{ borderColor: `${chapter.accent}35`, background: `${chapter.accent}08` }}
        >
          <span className="font-mono text-[8px] text-white/35 tracking-[0.2em] uppercase block mb-1">
            Mission Objective
          </span>
          <span
            className="font-display font-semibold text-xs tracking-wide"
            style={{ color: chapter.accent }}
          >
            {chapter.mission}
          </span>
          <span className="block font-mono text-[9px] text-white/40 mt-0.5">
            {chapter.missionSub}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {chapter.tags.map(t => (
            <Tag key={t} color={chapter.accent}>{t}</Tag>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Chapter detail panel (expanded view) ─────────────────── */
function ChapterDetail({ chapter }) {
  return (
    <motion.div
      key={chapter.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.35 }}
      className="relative rounded overflow-hidden border border-white/10"
      style={{ background: 'rgba(6,13,31,0.85)' }}
    >
      {/* Accent top border */}
      <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, transparent, ${chapter.accent}, transparent)` }} />

      {/* Illustration area */}
      <div
        className="relative flex items-center justify-center overflow-hidden"
        style={{
          background: `radial-gradient(ellipse 70% 70% at 50% 50%, ${chapter.accent}12, transparent)`,
          minHeight: 240,
        }}
      >
        <ChapterIllustration chapter={chapter} />
        <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="font-mono text-[9px] text-white/35 tracking-[0.25em] uppercase mb-1">
              Chapter {chapter.num}
            </p>
            <h2 className="font-display font-extrabold text-3xl text-white leading-tight">
              {chapter.title}
            </h2>
            <p className="font-mono text-xs mt-1" style={{ color: chapter.accent + 'bb' }}>
              {chapter.subtitle}
            </p>
          </div>
          <span
            className="w-12 h-12 rounded flex items-center justify-center border font-display text-2xl flex-shrink-0"
            style={{
              color: chapter.accent,
              borderColor: `${chapter.accent}30`,
              background: `${chapter.accent}10`,
            }}
          >
            {chapter.symbol}
          </span>
        </div>

        <p className="text-white/70 leading-relaxed mb-6">{chapter.body}</p>

        {/* Mission card */}
        <div
          className="p-4 rounded border mb-5 hud-corners"
          style={{ borderColor: `${chapter.accent}45`, background: `${chapter.accent}08` }}
        >
          <span className="font-mono text-[9px] text-white/40 tracking-[0.2em] uppercase block mb-1.5">
            ▸ Active Mission
          </span>
          <p className="font-display font-bold text-sm tracking-wide mb-1" style={{ color: chapter.accent }}>
            {chapter.mission}
          </p>
          <p className="font-mono text-[10px] text-white/45">{chapter.missionSub}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {chapter.tags.map(t => (
            <Tag key={t} color={chapter.accent}>{t}</Tag>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Chapters section ─────────────────────────────────────── */
export default function ChaptersSection() {
  const [activeIdx, setActiveIdx] = useState(0)
  const active = CHAPTERS[activeIdx]

  return (
    <section id="chapters" className="relative py-24 px-6">
      {/* Background subtle gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(45,212,191,0.04), transparent)' }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <SectionLabel>Story Arc</SectionLabel>
          <h2 className="font-display font-extrabold text-5xl text-white mb-3">
            6 Chapters.
            <span className="text-gradient-teal"> One Mission.</span>
          </h2>
          <p className="text-white/45 max-w-xl">
            Navigate the unknown dimension. Survive. Escape. Together.
          </p>
        </motion.div>

        {/* Progress bar */}
        <div className="mb-8 h-px bg-white/[0.07] relative overflow-hidden rounded">
          <motion.div
            className="absolute inset-y-0 left-0 rounded"
            style={{ background: active.accent }}
            animate={{ width: `${((activeIdx + 1) / CHAPTERS.length) * 100}%` }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          />
        </div>

        {/* Chapter indicators */}
        <div className="flex gap-2 mb-10">
          {CHAPTERS.map((ch, i) => (
            <button
              key={ch.id}
              onClick={() => setActiveIdx(i)}
              className="flex-1 flex flex-col items-center gap-1.5 py-2 rounded border transition-all duration-200"
              style={{
                borderColor: i === activeIdx ? `${ch.accent}60` : 'rgba(255,255,255,0.07)',
                background:  i === activeIdx ? `${ch.accent}12` : 'transparent',
              }}
            >
              <span className="font-mono text-[8px] tracking-widest" style={{ color: i === activeIdx ? ch.accent : 'rgba(255,255,255,0.25)' }}>
                {ch.num}
              </span>
              <span className="w-1 h-1 rounded-full" style={{ background: i === activeIdx ? ch.accent : 'rgba(255,255,255,0.15)' }} />
            </button>
          ))}
        </div>

        {/* Two-panel layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px] gap-6 items-start">

          {/* Left: chapter cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CHAPTERS.map((ch, i) => (
              <ChapterCard
                key={ch.id}
                chapter={ch}
                isActive={i === activeIdx}
                onClick={() => setActiveIdx(i)}
                index={i}
              />
            ))}
          </div>

          {/* Right: detail panel — sticky */}
          <div className="lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              <ChapterDetail key={active.id} chapter={active} />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

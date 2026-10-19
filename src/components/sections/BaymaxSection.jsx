import { useState } from 'react'
import { motion } from 'framer-motion'
import { SectionLabel, StatCard } from '../ui/Elements'

/* ─── Baymax SVG wireframe ─────────────────────────────────── */
function BaymaxWireframe({ batteryPct = 34, painLevel, online = true }) {
  const batteryColor =
    batteryPct < 15 ? '#E5383B'
    : batteryPct < 40 ? '#FBBF24'
    : '#2DD4BF'

  return (
    <svg viewBox="0 0 240 290" className="w-full max-w-[240px]" aria-label="Baymax diagnostic wireframe">
      <defs>
        <radialGradient id="bxGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor={online ? '#2DD4BF' : '#9B8FD4'} stopOpacity="0.25"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="blur"/>
          <feComposite in="SourceGraphic" in2="blur" operator="over"/>
        </filter>
      </defs>

      {/* Background glow */}
      <ellipse cx="120" cy="145" rx="100" ry="120" fill="url(#bxGlow)"/>

      {/* Body */}
      <ellipse cx="120" cy="185" rx="68" ry="76"
        fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.7)" strokeWidth="2"/>

      {/* Head */}
      <ellipse cx="120" cy="72" rx="36" ry="30"
        fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.85)" strokeWidth="2"/>

      {/* Eyes */}
      <ellipse cx="107" cy="72" rx="5.5" ry="5" fill="#111827"/>
      <ellipse cx="133" cy="72" rx="5.5" ry="5" fill="#111827"/>
      <line x1="107" y1="72" x2="133" y2="72" stroke="rgba(255,255,255,0.9)" strokeWidth="2"/>

      {/* Neck join */}
      <rect x="112" y="100" width="16" height="10" rx="2"
        fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>

      {/* Arms */}
      <ellipse cx="40"  cy="170" rx="17" ry="50"
        fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" transform="rotate(-15,40,170)"/>
      <ellipse cx="200" cy="170" rx="17" ry="50"
        fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" transform="rotate(15,200,170)"/>

      {/* Healthcare Chip Port */}
      <circle cx="120" cy="162" r="16" fill="rgba(229,56,59,0.15)" stroke="#E5383B" strokeWidth="2"
        style={{ filter: 'url(#glow)' }} className="animate-pulse"/>
      <circle cx="120" cy="162" r="8"  fill="#2DD4BF"/>
      <text x="120" y="165.5" textAnchor="middle" fill="#111827" fontSize="7" fontWeight="bold">CHIP</text>

      {/* Legs */}
      <ellipse cx="97"  cy="258" rx="19" ry="26"
        fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
      <ellipse cx="143" cy="258" rx="19" ry="26"
        fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>

      {/* Battery indicator */}
      <g transform="translate(80, 128)">
        <rect x="0" y="0" width="80" height="10" rx="3" fill="rgba(0,0,0,0.4)" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
        <rect x="1" y="1" width={`${batteryPct * 0.78}`} height="8" rx="2" fill={batteryColor} opacity="0.85"/>
        <text x="40" y="8.5" textAnchor="middle" fill="white" fontSize="5.5" fontWeight="bold">
          {batteryPct}% BATT
        </text>
      </g>

      {/* Online / offline indicator */}
      <circle cx="120" cy="30" r="4" fill={online ? '#2DD4BF' : '#6b7280'}
        className={online ? 'animate-pulse' : ''}/>
      <text x="120" y="18" textAnchor="middle" fill={online ? '#2DD4BF' : '#6b7280'} fontSize="7" letterSpacing="2">
        {online ? 'ONLINE' : 'OFFLINE'}
      </text>
    </svg>
  )
}

/* ─── Pain scale ───────────────────────────────────────────── */
function PainScale({ value, onChange }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] text-white/50 tracking-wider">
          "On a scale of 1–10, how would you rate your pain?"
        </span>
        <span className="font-display font-bold text-lg" style={{
          color: value <= 3 ? '#2DD4BF' : value <= 7 ? '#FBBF24' : '#E5383B'
        }}>
          {value}
        </span>
      </div>
      <div className="grid grid-cols-11 gap-1">
        {Array.from({ length: 11 }, (_, i) => (
          <button
            key={i}
            onClick={() => onChange(i)}
            className="h-9 rounded border font-display font-bold text-xs transition-all duration-150"
            style={{
              background:   value === i ? (i <= 3 ? '#2DD4BF' : i <= 7 ? '#FBBF24' : '#E5383B') : 'rgba(255,255,255,0.04)',
              borderColor:  value === i ? 'transparent'
                : i === 0 ? 'rgba(255,255,255,0.12)'
                : i <= 3 ? 'rgba(45,212,191,0.2)'
                : i <= 7 ? 'rgba(251,191,36,0.2)'
                : 'rgba(229,56,59,0.2)',
              color: value === i ? '#030610' : i <= 3 ? '#2DD4BF' : i <= 7 ? '#FBBF24' : '#E5383B',
              transform: value === i ? 'scale(1.1)' : 'scale(1)',
            }}
          >
            {i}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ─── Armor progress bar ───────────────────────────────────── */
function ArmorBar({ label, hp, status, color }) {
  return (
    <div className="p-3 rounded border border-white/[0.07] bg-white/[0.02]">
      <div className="flex items-center justify-between mb-1.5">
        <span className="font-display font-medium text-xs text-white/80">{label}</span>
        <span className="font-mono text-[10px]" style={{ color: color }}>{hp}%</span>
      </div>
      <div className="h-1 bg-white/10 rounded-full overflow-hidden mb-1.5">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${hp}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
      <span className="font-mono text-[8px] text-white/35">{status}</span>
    </div>
  )
}

const TABS = [
  { id: 'vitals', label: 'Hiro Vitals' },
  { id: 'chip',   label: 'Healthcare Chip' },
  { id: 'armor',  label: 'Armor Matrix' },
]

export default function BaymaxSection() {
  const [activeTab,  setActiveTab]  = useState('vitals')
  const [painLevel,  setPainLevel]  = useState(3)
  const [healed,     setHealed]     = useState(false)
  const [baymaxSays, setBaymaxSays] = useState('"I have detected elevated cortisol levels in Hiro. Initiating comfort protocol."')

  const handlePain = (lvl) => {
    setPainLevel(lvl)
    setHealed(false)
    if (lvl === 0) setBaymaxSays('"I am glad you are feeling well. I cannot deactivate until you say you are satisfied with your care."')
    else if (lvl <= 3) setBaymaxSays('"Minor strain detected. Applying gentle warm compression and administering emotional reassurance."')
    else if (lvl <= 7) setBaymaxSays('"Moderate distress. Hiro, your heart rate is 128 bpm. Please inhale deeply for four seconds."')
    else setBaymaxSays('"CRITICAL: Extreme pain detected. Deploying thermal shield and antibacterial salve immediately."')
  }

  const applyHug = () => {
    setHealed(true)
    setPainLevel(l => Math.max(0, l - 3))
    setBaymaxSays('"Dispensing heat pad and gentle hug. Pain receptors showing immediate relief."')
  }

  const ARMOR = [
    { label: 'Inflatable Vinyl Hull',       hp: 88, status: 'Sealed — micro-punctures patched by Hiro', color: '#2DD4BF' },
    { label: 'Chest Reinforcement Plate',   hp: 95, status: 'Secured over Chip Port',                   color: '#34d399' },
    { label: 'Left Thruster Gauntlet',      hp: 42, status: 'Operational for stability leaps',           color: '#FBBF24' },
    { label: 'Right Gauntlet (Rocket Fist)',hp: 0,  status: 'Expended during Callaghan rescue',          color: '#E5383B' },
    { label: 'Back Flight Wings',           hp: 30, status: 'Debris damage — gliding only',              color: '#FBBF24' },
  ]

  return (
    <section id="baymax" className="relative py-24 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 30% 50%, rgba(45,212,191,0.05), transparent)' }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <SectionLabel>Healthcare Companion</SectionLabel>
          <div className="flex items-baseline gap-4 flex-wrap">
            <h2 className="font-display font-extrabold text-5xl text-white">
              Baymax
              <span className="text-gradient-teal"> Diagnostics</span>
            </h2>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-teal-500/20">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span className="font-mono text-[9px] text-teal-400 tracking-widest uppercase">Healthcare Companion Online</span>
            </div>
          </div>
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 items-start">

          {/* Left: Baymax wireframe + voice output */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            <div className="rounded border border-white/[0.07] glass-light p-6 flex flex-col items-center gap-4">
              <div className="w-full flex items-center justify-between mb-2">
                <span className="font-mono text-[9px] text-teal-300 tracking-wider">Model: HA-2.0</span>
                <span className="px-2 py-0.5 rounded font-mono text-[9px] border border-amber-500/30 bg-amber-500/10 text-amber-300 tracking-wider">
                  34% Battery
                </span>
              </div>
              <div className="animate-float">
                <BaymaxWireframe batteryPct={34} painLevel={painLevel} />
              </div>
            </div>

            {/* Baymax voice output */}
            <div className="p-4 rounded border border-teal-500/20 bg-teal-950/30">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                <span className="font-mono text-[8px] text-teal-300 tracking-widest uppercase">Baymax Voice Output</span>
              </div>
              <p className="font-mono text-xs text-white/80 italic leading-relaxed">{baymaxSays}</p>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-2">
              <StatCard label="Model"    value="HA-2.0"   sub="Healthcare Companion"   accent="#2DD4BF" />
              <StatCard label="Patient"  value="Hiro H."  sub="Status: In Rift Transit" accent="#FBBF24" />
            </div>
          </motion.div>

          {/* Right: tabbed detail panels */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Tabs */}
            <div className="flex gap-1 p-1 rounded border border-white/[0.07] glass-light mb-4 w-fit">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="px-4 py-2 rounded font-mono text-[10px] tracking-wider uppercase transition-all duration-200"
                  style={{
                    background:   activeTab === tab.id ? 'rgba(45,212,191,0.15)' : 'transparent',
                    color:        activeTab === tab.id ? '#2DD4BF' : 'rgba(255,255,255,0.4)',
                    borderBottom: activeTab === tab.id ? '1px solid rgba(45,212,191,0.6)' : '1px solid transparent',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Vitals tab */}
            {activeTab === 'vitals' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                {/* Biosensor grid */}
                <div className="p-5 rounded border border-white/[0.07] glass-light">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-semibold text-sm text-white/80">
                      Patient: Hiro Hamada — Vitals Inside the Void
                    </h3>
                    <span className="font-mono text-[9px] text-emerald-400 tracking-wider">Stable</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <StatCard label="Heart Rate" value="114" sub="BPM — Elevated" accent="#FBBF24" />
                    <StatCard label="SpO₂" value="96%" sub="Breathable atmo" accent="#2DD4BF" />
                    <StatCard label="Body Temp" value="36.4°" sub="Slight chill in rift" accent="#2DD4BF" />
                    <StatCard label="Adrenaline" value="HIGH" sub="Hyper-focus active" accent="#E5383B" />
                  </div>
                </div>

                {/* Pain scale */}
                <div className="p-5 rounded border border-white/[0.07] glass-light">
                  <PainScale value={painLevel} onChange={handlePain} />
                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/[0.07]">
                    <span className="font-mono text-[10px] text-white/50">
                      {healed ? '✓ Treatment administered — pain reduced' : 'Apply comfort protocol?'}
                    </span>
                    <motion.button
                      onClick={applyHug}
                      disabled={painLevel === 0}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="px-5 py-2.5 rounded font-display font-semibold text-xs text-void-950 bg-portal-teal hover:bg-portal-teal/80 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      Administer Hug &amp; Warmth
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Chip tab */}
            {activeTab === 'chip' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-5 rounded border border-white/[0.07] glass-light space-y-5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display font-semibold text-white mb-0.5">Tadashi Hamada's Healthcare Chip</h3>
                    <p className="font-mono text-[9px] text-teal-300 tracking-wider">UUID: TH-BAYMAX-HEALTHCARE-01 · Restored in Sector 0</p>
                  </div>
                  <span className="px-2.5 py-1 rounded border border-teal-500/30 bg-teal-500/10 text-teal-300 font-mono text-[9px] tracking-wider">
                    100% Intact
                  </span>
                </div>

                <p className="text-white/60 text-sm leading-relaxed">
                  When Hiro jumped back through the closing gate, he held this chip tightly in his fist.
                  Containing over 10,000 medical procedures, Tadashi's voice recordings, and the core
                  empathetic personality matrix — this chip is the true soul of Baymax.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <StatCard label="Registered Caregiver" value="Tadashi H." sub="SFIT — Deceased"         accent="#9B8FD4" />
                  <StatCard label="Current Patient"       value="Hiro H."   sub="In Transit: Portal Rift" accent="#FBBF24" />
                  <StatCard label="Combat Overrides"      value="DISABLED"   sub="Protective shielding only" accent="#E5383B" />
                  <StatCard label="Rocket Fist Status"    value="Scrapped"   sub="Hiro seeking salvage"    accent="#2DD4BF" />
                </div>
              </motion.div>
            )}

            {/* Armor tab */}
            {activeTab === 'armor' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-5 rounded border border-white/[0.07] glass-light space-y-3"
              >
                <h3 className="font-display font-semibold text-white mb-4">
                  Carbon-Fiber Armor Status &amp; Thruster Systems
                </h3>
                {ARMOR.map((item, i) => (
                  <ArmorBar key={i} {...item} />
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

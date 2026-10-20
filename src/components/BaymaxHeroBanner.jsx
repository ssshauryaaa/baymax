import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

/* ── FLOATING PARTICLE COMPONENT ──────────────────────────── */
function FloatingParticle({ delay, x, y, size = 3 }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
        background: 'radial-gradient(circle, rgba(214,32,39,0.7) 0%, rgba(214,32,39,0) 70%)',
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.8, 0.3, 0.8, 0],
        scale: [0.5, 1.2, 0.8, 1.3, 0.5],
        y: [0, -15, -8, -20, 0],
      }}
      transition={{
        duration: 4 + Math.random() * 3,
        repeat: Infinity,
        delay: delay,
        ease: 'easeInOut',
      }}
    />
  )
}

/* ── SCANNING LINE ────────────────────────────────────────── */
function ScanLine() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-px pointer-events-none"
      style={{
        background: 'linear-gradient(90deg, transparent 0%, rgba(214,32,39,0.4) 20%, rgba(214,32,39,0.8) 50%, rgba(214,32,39,0.4) 80%, transparent 100%)',
      }}
      initial={{ top: '0%', opacity: 0 }}
      animate={{ top: ['0%', '100%', '0%'], opacity: [0, 0.6, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
    />
  )
}

/* ── TELEMETRY STAT BLOCK ─────────────────────────────────── */
function TelemetryStat({ label, value, unit, delay = 0, color = '#d62027' }) {
  return (
    <motion.div
      className="flex flex-col items-center gap-0.5"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 + delay, duration: 0.5, ease: 'easeOut' }}
    >
      <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-white/50">{label}</span>
      <div className="flex items-baseline gap-0.5">
        <motion.span
          className="font-oswald font-black text-lg tabular-nums"
          style={{ color }}
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{ duration: 2 + delay, repeat: Infinity }}
        >
          {value}
        </motion.span>
        <span className="text-[9px] font-mono text-white/40">{unit}</span>
      </div>
    </motion.div>
  )
}

/* ── NEURAL LINK BAR ──────────────────────────────────────── */
function NeuralLinkBar({ label, percentage, delay = 0 }) {
  return (
    <motion.div
      className="flex items-center gap-2 w-full"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6 + delay, duration: 0.4 }}
    >
      <span className="text-[8px] font-mono uppercase tracking-wider text-white/50 w-16 text-right flex-shrink-0">{label}</span>
      <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, #d62027, #ff4444)` }}
          initial={{ width: '0%' }}
          animate={{ width: `${percentage}%` }}
          transition={{ delay: 0.8 + delay, duration: 1.2, ease: 'easeOut' }}
        />
      </div>
      <span className="text-[9px] font-mono text-[#d62027] w-8 text-right tabular-nums">{percentage}%</span>
    </motion.div>
  )
}

/* ── MAIN BANNER COMPONENT ────────────────────────────────── */
export default function BaymaxHeroBanner({
  isOpen = true,
  onClose = () => {},
  onSelectStory = () => {},
  onSelectCare = () => {},
}) {
  const [clicked, setClicked] = useState(false)
  const [hovered, setHovered] = useState(null)

  // Particles data
  const particles = [
    { x: 5, y: 15, size: 4, delay: 0 },
    { x: 12, y: 65, size: 3, delay: 0.5 },
    { x: 22, y: 30, size: 5, delay: 1.2 },
    { x: 35, y: 80, size: 3, delay: 0.8 },
    { x: 48, y: 12, size: 4, delay: 1.5 },
    { x: 55, y: 55, size: 3, delay: 0.3 },
    { x: 68, y: 25, size: 5, delay: 2.0 },
    { x: 75, y: 70, size: 4, delay: 1.0 },
    { x: 82, y: 40, size: 3, delay: 0.7 },
    { x: 90, y: 85, size: 4, delay: 1.8 },
    { x: 95, y: 20, size: 3, delay: 2.2 },
    { x: 42, y: 45, size: 5, delay: 0.4 },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Dimmer */}
          <motion.div
            key="baymax-banner-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Floating Hero Banner Panel */}
          <div className="fixed inset-x-0 top-16 sm:top-[64px] z-50 flex justify-center px-3 sm:px-6 pointer-events-none">
            <motion.div
              key="baymax-banner-card"
              id="baymax-waving-hero"
              className="relative w-full max-w-6xl select-none rounded-2xl overflow-hidden pointer-events-auto shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85),0_0_35px_rgba(214,32,39,0.35)] border border-[#d62027]/40 max-h-[calc(100vh-5.5rem)] overflow-y-auto"
              style={{
                background: 'linear-gradient(180deg, rgba(16, 26, 42, 0.97) 0%, rgba(28, 42, 60, 0.96) 50%, rgba(16, 26, 42, 0.98) 100%)',
                backdropFilter: 'blur(28px) saturate(160%)',
                WebkitBackdropFilter: 'blur(28px) saturate(160%)',
              }}
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            >
          {/* ── SCAN LINE ── */}
          <ScanLine />

          {/* ── FLOATING PARTICLES ── */}
          {particles.map((p, i) => (
            <FloatingParticle key={i} x={p.x} y={p.y} size={p.size} delay={p.delay} />
          ))}

          {/* ── CORNER DECORATIONS ── */}
          {/* Top-left corner bracket */}
          <motion.div
            className="absolute top-3 left-4 w-6 h-6 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 0.5 }}
          >
            <div className="absolute top-0 left-0 w-full h-px bg-[#d62027]" />
            <div className="absolute top-0 left-0 w-px h-full bg-[#d62027]" />
          </motion.div>
          {/* Top-right corner bracket */}
          <motion.div
            className="absolute top-3 right-4 w-6 h-6 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 0.6 }}
          >
            <div className="absolute top-0 right-0 w-full h-px bg-[#d62027]" />
            <div className="absolute top-0 right-0 w-px h-full bg-[#d62027]" />
          </motion.div>
          {/* Bottom-left corner bracket */}
          <motion.div
            className="absolute bottom-3 left-4 w-6 h-6 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 0.7 }}
          >
            <div className="absolute bottom-0 left-0 w-full h-px bg-[#d62027]" />
            <div className="absolute bottom-0 left-0 w-px h-full bg-[#d62027]" />
          </motion.div>
          {/* Bottom-right corner bracket */}
          <motion.div
            className="absolute bottom-3 right-4 w-6 h-6 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 0.8 }}
          >
            <div className="absolute bottom-0 right-0 w-full h-px bg-[#d62027]" />
            <div className="absolute bottom-0 right-0 w-px h-full bg-[#d62027]" />
          </motion.div>

          {/* ── GRID OVERLAY TEXTURE ── */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '32px 32px',
            }}
          />

          {/* ── HORIZONTAL ACCENT LINES ── */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: 'linear-gradient(90deg, transparent, #d62027, transparent)' }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
          />
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(214,32,39,0.5), transparent)' }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
          />

          {/* ── MAIN CONTENT ── */}
          <div className="relative max-w-7xl mx-auto px-6 py-6 sm:py-8 lg:py-10">

            {/* ── TOP STATUS BAR ── */}
            <motion.div
              className="flex items-center justify-between mb-5 sm:mb-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-[#d62027]/40 bg-[#d62027]/10">
                  <motion.span
                    className="w-2 h-2 rounded-full bg-[#d62027]"
                    animate={{ opacity: [1, 0.3, 1], boxShadow: ['0 0 6px #d62027', '0 0 2px #d62027', '0 0 6px #d62027'] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-[#d62027] font-bold">LIVE</span>
                </div>
                <span className="text-[9px] font-mono uppercase tracking-[0.12em] text-white/40">HEALTHCARE COMPANION v2.0 — INITIALIZED</span>
              </div>
              <div className="hidden sm:flex items-center gap-4">
                <span className="text-[8px] font-mono text-white/30 tracking-wider">SYS.UPTIME 04:27:38</span>
                <span className="text-[8px] font-mono text-white/30 tracking-wider">MEM 87.2%</span>
                <span className="text-[8px] font-mono text-[#d62027]/60 tracking-wider">● REC</span>
              </div>
            </motion.div>

            {/* ── HERO CONTENT GRID ── */}
            <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">

              {/* ── LEFT: BAYMAX VISUAL + RING ── */}
              <motion.div
                className="relative flex-shrink-0 cursor-pointer group"
                initial={{ opacity: 0, scale: 0.85, x: -30 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 22 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setClicked(c => !c)}
              >
                {/* Outer Glow Ring */}
                <motion.div
                  className="absolute -inset-3 sm:-inset-4 rounded-2xl pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at center, rgba(214,32,39,0.15) 0%, transparent 70%)',
                  }}
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                    scale: [1, 1.04, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Rotating Orbit Ring */}
                <motion.div
                  className="absolute -inset-5 sm:-inset-6 pointer-events-none"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  <div className="w-full h-full rounded-2xl border border-dashed border-[#d62027]/20" />
                  {/* Orbiting dot */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#d62027] shadow-[0_0_8px_#d62027]" />
                </motion.div>

                {/* Image Container */}
                <div
                  className="relative w-36 sm:w-44 md:w-52 lg:w-56 h-32 sm:h-36 md:h-44 lg:h-48 overflow-hidden rounded-xl"
                  style={{
                    border: '2px solid rgba(214, 32, 39, 0.35)',
                    boxShadow: '0 0 30px rgba(214, 32, 39, 0.15), inset 0 0 40px rgba(0,0,0,0.3)',
                  }}
                >
                  <img
                    src="/baymax-hero-banner.png"
                    alt="Baymax Waving"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Gradient Overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(20,30,48,0.8) 100%)' }}
                  />

                  {/* Click flash effect */}
                  <AnimatePresence>
                    {clicked && (
                      <motion.div
                        className="absolute inset-0 bg-[#d62027]/20 pointer-events-none"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        onAnimationComplete={() => setClicked(false)}
                      />
                    )}
                  </AnimatePresence>
                </div>

                {/* Status Badge Below Image */}
                <motion.div
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full border border-[#d62027]/50 bg-[#d62027]/20 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <span className="text-[8px] font-mono font-bold uppercase tracking-[0.2em] text-[#d62027]">ONLINE</span>
                </motion.div>
              </motion.div>

              {/* ── CENTER: TEXT & CALLOUT ── */}
              <motion.div
                className="flex-1 min-w-0 text-center lg:text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
              >
                {/* Active Badge */}
                <motion.div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm mb-3"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-white/60">Healthcare Companion Active</span>
                </motion.div>

                {/* Main Title */}
                <h1 className="font-oswald font-extrabold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight leading-[0.95] text-white mb-2">
                  <span className="block">HELLO.</span>
                  <span className="block mt-1">
                    I AM{' '}
                    <motion.span
                      className="relative inline-block"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="text-[#d62027] drop-shadow-[0_0_20px_rgba(214,32,39,0.4)]">BAYMAX</span>
                      <motion.span
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#d62027] origin-left"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
                      />
                    </motion.span>
                    <span className="text-[#d62027]">.</span>
                  </span>
                </h1>

                {/* Subtitle */}
                <motion.p
                  className="text-white/60 text-xs sm:text-sm font-sans font-medium tracking-wide max-w-lg mt-3 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45, duration: 0.5 }}
                  style={{ textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}
                >
                  "Your personal healthcare companion. I was activated when Tadashi's neural chip
                  detected emotional distress in Hiro Hamada. I will not deactivate until you say
                  you are <span className="text-[#d62027] font-semibold">satisfied with your care</span>."
                </motion.p>

                {/* ── CTA BUTTONS ── */}
                <motion.div
                  className="flex items-center gap-3 mt-5 flex-wrap justify-center lg:justify-start"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  {/* Primary CTA */}
                  <motion.button
                    onClick={onSelectStory}
                    className="group relative px-6 py-2.5 rounded-lg font-oswald font-bold text-sm uppercase tracking-wider text-white overflow-hidden cursor-pointer"
                    style={{
                      background: 'linear-gradient(135deg, #d62027, #e8373e)',
                      boxShadow: '0 0 20px rgba(214,32,39,0.3), inset 0 1px 1px rgba(255,255,255,0.15)',
                    }}
                    whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(214,32,39,0.5)' }}
                    whileTap={{ scale: 0.96 }}
                    onHoverStart={() => setHovered('story')}
                    onHoverEnd={() => setHovered(null)}
                  >
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)',
                      }}
                      animate={{ x: hovered === 'story' ? ['-100%', '200%'] : '-100%' }}
                      transition={{ duration: 0.6 }}
                    />
                    <span className="relative z-10 flex items-center gap-2">
                      Launch Chronicle
                      <motion.svg
                        viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5"
                        animate={{ x: hovered === 'story' ? 3 : 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </motion.svg>
                    </span>
                  </motion.button>

                  {/* Secondary CTA */}
                  <motion.button
                    onClick={onSelectCare}
                    className="px-5 py-2.5 rounded-lg font-cond font-bold text-xs uppercase tracking-wider text-white/90 cursor-pointer transition-colors duration-200"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      backdropFilter: 'blur(8px)',
                    }}
                    whileHover={{
                      scale: 1.04,
                      borderColor: 'rgba(214, 32, 39, 0.5)',
                      background: 'rgba(214, 32, 39, 0.1)',
                    }}
                    whileTap={{ scale: 0.96 }}
                  >
                    Diagnostics Hub
                  </motion.button>

                  {/* Close / Dismiss */}
                  <motion.button
                    onClick={onClose}
                    aria-label="Dismiss banner"
                    title="Minimize"
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white/50 hover:text-white cursor-pointer transition-colors"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.12)',
                    }}
                    whileHover={{
                      scale: 1.1,
                      borderColor: 'rgba(214,32,39,0.5)',
                      background: 'rgba(214,32,39,0.15)',
                    }}
                    whileTap={{ scale: 0.9, rotate: 90 }}
                  >
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </motion.button>
                </motion.div>
              </motion.div>

              {/* ── RIGHT: TELEMETRY PANEL ── */}
              <motion.div
                className="hidden md:flex flex-col gap-4 flex-shrink-0 w-52 lg:w-60"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 25 }}
              >
                {/* Telemetry Stats Row */}
                <div
                  className="rounded-xl p-4"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <div className="flex items-center gap-1.5 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d62027]" />
                    <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-white/40">VITAL TELEMETRY</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <TelemetryStat label="Heart Rate" value="72" unit="BPM" delay={0} />
                    <TelemetryStat label="Serotonin" value="94" unit="%" delay={0.15} />
                    <TelemetryStat label="Cortisol" value="12" unit="ng/mL" delay={0.3} />
                    <TelemetryStat label="Pain Scale" value="01" unit="/10" delay={0.45} />
                  </div>
                </div>

                {/* Neural Link Bars */}
                <div
                  className="rounded-xl p-4"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <div className="flex items-center gap-1.5 mb-3">
                    <motion.span
                      className="w-1.5 h-1.5 rounded-sm bg-emerald-400"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-white/40">NEURAL LINK</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <NeuralLinkBar label="Motor" percentage={98} delay={0} />
                    <NeuralLinkBar label="Cognitive" percentage={92} delay={0.1} />
                    <NeuralLinkBar label="Emotional" percentage={76} delay={0.2} />
                    <NeuralLinkBar label="Sensory" percentage={88} delay={0.3} />
                  </div>
                </div>
              </motion.div>

            </div>

            {/* ── BOTTOM: MICRO-STATUS TICKER ── */}
            <motion.div
              className="flex items-center justify-between mt-6 pt-4 border-t border-white/5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.4 }}
            >
              <div className="flex items-center gap-6 overflow-hidden">
                {[
                  { icon: '⟡', text: 'TADASHI CHIP v2.0 SYNCED' },
                  { icon: '◈', text: 'CARBON-FIBER EXOSKELETON' },
                  { icon: '⬡', text: 'HYPERSPECTRAL SCANNING' },
                  { icon: '◉', text: '10,000+ MEDICAL PROCEDURES' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-1.5 flex-shrink-0"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                  >
                    <span className="text-[#d62027] text-[10px]">{item.icon}</span>
                    <span className="text-[8px] font-mono uppercase tracking-[0.12em] text-white/35 whitespace-nowrap">{item.text}</span>
                  </motion.div>
                ))}
              </div>
              <motion.div
                className="flex items-center gap-1.5 flex-shrink-0"
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-[8px] font-mono uppercase tracking-wider text-white/30">ENCRYPTION</span>
                <span className="text-[8px] font-mono text-[#d62027]">AES-256</span>
                <svg viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-[#d62027]/60">
                  <rect x="3" y="5" width="6" height="5" rx="1" />
                  <path d="M4 5V3.5a2 2 0 0 1 4 0V5" />
                </svg>
              </motion.div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </>
  )}
</AnimatePresence>
  )
}

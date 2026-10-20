import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ════════════════════════════════════════════════════════════════
   HIRO & BAYMAX — Beyond the Portal · 6-Chapter Story Stage
   Each chapter features a UNIQUE character scene, telemetry HUD,
   mission dossier, and audio log.
   ════════════════════════════════════════════════════════════════ */

const CHAPTERS = [
  {
    num: '01',
    title: 'The Jump',
    zone: 'Portal Edge',
    accent: '#E5383B',
    badgeText: 'HIRO HAMADA // QUANTUM LEAP INITIATED',
    charImage: '/characters/hiro.png',
    charAlt: 'Hiro Hamada leaping into portal',
    keyMetric: { label: 'Tadashi Chip', val: '100% Locked', sub: 'Portal Seal: 42s' },
    body: `After the battle with Callaghan, Baymax sacrifices himself to launch Hiro to safety. But Hiro sees Baymax's healthcare chip still blinking in the closing portal — and he knows Baymax is still inside. Against every warning, Hiro turns back and leaps through the shrinking gate.`,
    mission: 'ENTER THE PORTAL — FIND BAYMAX',
    missionSub: 'Time window: Gate closing at 12% per min',
    tags: ['Hiro', 'Tadashi Chip', 'Leap of Faith'],
    quote: 'Tadashi left this chip to help people. I am not leaving you behind, Baymax!',
    scene: (
      <svg viewBox="0 0 360 260" className="w-full h-full" aria-hidden="true">
        <defs>
          <radialGradient id="p1g" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E5383B" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#E5383B" stopOpacity="0.1" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <ellipse cx="180" cy="130" rx="120" ry="120" fill="url(#p1g)" />
        <circle cx="180" cy="130" r="90" fill="none" stroke="#E5383B" strokeWidth="2.5" opacity="0.6" />
        <circle cx="180" cy="130" r="70" fill="none" stroke="#E5383B" strokeWidth="1.5" opacity="0.9" strokeDasharray="4 2" />
        <circle cx="180" cy="130" r="48" fill="none" stroke="#fff" strokeWidth="1" opacity="0.4" />
        <circle cx="186" cy="118" r="6" fill="#10B981" opacity="0.95" />
        <circle cx="186" cy="118" r="12" fill="none" stroke="#10B981" strokeWidth="1.5" opacity="0.6" className="animate-ping" />
        <text x="180" y="248" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="monospace" letterSpacing="3">
          PORTAL GATEWAY // INGRESS
        </text>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'The Empty Shell',
    zone: 'Drift Field',
    accent: '#38BDF8',
    badgeText: 'BAYMAX VINYL HULL // ZERO-G DRIFT',
    charImage: '/characters/baymax.png',
    charAlt: 'Baymax dormant vinyl hull in zero gravity',
    keyMetric: { label: 'Chassis Power', val: '0% Dormant', sub: 'Vinyl Pressure: 1.2 ATM' },
    body: `Inside the portal dimension, gravity has no fixed direction. Debris from countless worlds drifts silently around him. Hiro finds Baymax's white vinyl armor floating motionless — empty and unpowered. The healthcare chip is clutched tightly in Hiro's fist. He has to reach the chest port.`,
    mission: 'LOCATE THE ARMOUR — PREPARE THE CHIP',
    missionSub: 'Zero life signs · Ocular offline',
    tags: ['Empty Armour', 'Healthcare Chip', 'Zero-G'],
    quote: 'Zero life signs detected. His empty armor is drifting. I have to reach the chest port before we drift apart.',
    scene: (
      <svg viewBox="0 0 360 260" className="w-full h-full" aria-hidden="true">
        <defs>
          <radialGradient id="p2g" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.25" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <ellipse cx="180" cy="130" rx="130" ry="110" fill="url(#p2g)" />
        <circle cx="180" cy="120" r="55" fill="none" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" />
        <circle cx="180" cy="120" r="8" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="2 2" className="animate-spin" />
        {[[40, 60, 6], [300, 100, 5], [60, 190, 8], [310, 170, 6], [100, 220, 5]].map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        ))}
        <text x="180" y="248" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="monospace" letterSpacing="3">
          DRIFT FIELD // SECTOR 1
        </text>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Restoration',
    zone: 'Quiet Ruins',
    accent: '#10B981',
    badgeText: 'TADASHI CHIP INSERTED // ONLINE',
    charImage: '/baymax-hero-banner.png',
    charAlt: 'Baymax waking up and greeting Hiro',
    keyMetric: { label: 'Empathy Core', val: '100% Active', sub: 'Directives Restored' },
    body: `Hiro finds a moment of stillness among the ruins of the dimension — fractured platforms suspended in the void. He steadies himself, pulls out Tadashi's healthcare chip, and slots it firmly into the port in Baymax's chest. A pause. Soft chime. Then — systems online.`,
    mission: 'CHIP INSERTION COMPLETE — REBOOT SUCCESSFUL',
    missionSub: 'Empathy matrix synchronized',
    tags: ['Restoration', 'Tadashi Hamada', 'Awakening'],
    quote: 'Hello. I am Baymax. Your personal healthcare companion. Hiro... you came back for me.',
    scene: (
      <svg viewBox="0 0 360 260" className="w-full h-full" aria-hidden="true">
        <defs>
          <radialGradient id="p3g" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <ellipse cx="180" cy="130" rx="120" ry="100" fill="url(#p3g)" />
        <circle cx="180" cy="120" r="30" fill="none" stroke="#10B981" strokeWidth="2" opacity="0.8" />
        <circle cx="180" cy="120" r="60" fill="none" stroke="#10B981" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" className="animate-pulse" />
        <text x="180" y="248" textAnchor="middle" fill="#10B981" fontSize="9" fontFamily="monospace" letterSpacing="3">
          RESTORATION SITE // SFIT PROTOCOL
        </text>
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Inverted Canyon',
    zone: 'The Rift',
    accent: '#FBBF24',
    badgeText: 'GRAVITATIONAL INVERSION // EM BARRIER',
    charImage: '/hiro-baymax-armor.png',
    charAlt: 'Hiro tethered to Baymax in inverted gravity',
    keyMetric: { label: 'Graviton Shear', val: '-2.4 G', sub: 'Tether Load: 340kg' },
    body: `Gravity in Sector 3 flips upside down. Shattered megaliths and Krei Tech test debris float in reverse toward phantom mass centers. Hiro tethers his suit clamp securely to Baymax's backplate as Baymax uses his heavy magnetic boots to anchor onto metallic strata.`,
    mission: 'NAVIGATE INVERTED STRATA — HOLD FORMATION',
    missionSub: 'High graviton turbulence',
    tags: ['Inverted Gravity', 'Tether Link', 'Megaliths'],
    quote: 'Warning: Gravitational physics in this canyon are inverted. Hiro, please hold tightly onto my back chassis.',
    scene: (
      <svg viewBox="0 0 360 260" className="w-full h-full" aria-hidden="true">
        <defs>
          <linearGradient id="p4g" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.3" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="360" height="260" fill="url(#p4g)" />
        {[60, 120, 180, 240, 300].map((x, i) => (
          <line key={i} x1={x} y1="200" x2={x} y2="60" stroke="#FBBF24" strokeWidth="1" strokeDasharray="6 4" opacity="0.35" />
        ))}
        <text x="180" y="248" textAnchor="middle" fill="#FBBF24" fontSize="9" fontFamily="monospace" letterSpacing="3">
          INVERTED CANYON // SECTOR 3
        </text>
      </svg>
    ),
  },
  {
    num: '05',
    title: 'The Glitch Bridge',
    zone: 'Glitch Spire',
    accent: '#F87171',
    badgeText: 'MAGNETIC WINCH ARMED // TEAM COMMS',
    charImage: '/characters/hiro.png',
    secondaryCharImage: '/characters/gogo.png',
    charAlt: 'Hiro assembling magnetic winch with team comms',
    keyMetric: { label: 'Winch Tensile', val: '1,200 kg', sub: 'Team Comms: 432.18 GHz' },
    body: `Spacetime fractures threaten to shear the pathway ahead. From scavenged Krei Tech pod struts, Hiro fabricates a magnetic grapple winch to replace Baymax's sacrificed rocket fist. Suddenly, a faint radio transmission breaks through: Go Go and Wasabi holding the portal rings open outside!`,
    mission: 'DEPLOY MAGNETIC WINCH — LOCK SFIT FREQUENCY',
    missionSub: 'Team holding the gate open',
    tags: ['Magnetic Winch', 'Team Transmission', 'Engineering'],
    quote: 'Glitch storm frequency locked. Go Go, Wasabi, we read you! Hiro calculates the trajectory, I provide the shield.',
    scene: (
      <svg viewBox="0 0 360 260" className="w-full h-full" aria-hidden="true">
        <defs>
          <linearGradient id="p5g" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#F87171" stopOpacity="0.4" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <rect x="0" y="100" width="360" height="40" fill="url(#p5g)" />
        <line x1="20" y1="120" x2="340" y2="120" stroke="#F87171" strokeWidth="2.5" strokeDasharray="6 3" />
        <text x="180" y="248" textAnchor="middle" fill="#F87171" fontSize="9" fontFamily="monospace" letterSpacing="3">
          GLITCH BRIDGE // SECTOR 4
        </text>
      </svg>
    ),
  },
  {
    num: '06',
    title: 'The Escape Jump',
    zone: 'Exit Portal',
    accent: '#D62027',
    badgeText: 'DUAL-THRUSTER IGNITION // TERMINAL LEAP',
    charImage: '/hiro-baymax-armor.png',
    charAlt: 'Hiro and Baymax at maximum thruster burn',
    keyMetric: { label: 'Delta-V Velocity', val: '82 m/s', sub: 'Burn Window: 4.8s' },
    body: `The exit portal event horizon is collapsing down to 4.2 meters. Hiro mounts Baymax's armored back and locks their trajectory. Hydrazine thrusters ignite at 100% capacity in a thunderous synchronized burn. Together, as partners and brothers, they burst through the singularity back home.`,
    mission: 'MAXIMUM THRUST JUMP — EMERGE TOGETHER',
    missionSub: 'Event horizon closing · Jump now',
    tags: ['Final Escape', 'Max Thrust', 'Brothers'],
    quote: 'Event horizon closing at maximum rate. Prepare for emergency thruster ignition. Hiro, we exit together!',
    scene: (
      <svg viewBox="0 0 360 260" className="w-full h-full" aria-hidden="true">
        <defs>
          <radialGradient id="p6g" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D62027" stopOpacity="0.6" />
            <stop offset="60%" stopColor="#D62027" stopOpacity="0.15" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <ellipse cx="180" cy="130" rx="130" ry="110" fill="url(#p6g)" />
        <circle cx="180" cy="130" r="80" fill="none" stroke="#D62027" strokeWidth="3" opacity="0.8" />
        <circle cx="180" cy="130" r="40" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="4 2" className="animate-spin" />
        <text x="180" y="248" textAnchor="middle" fill="#D62027" fontSize="9" fontFamily="monospace" letterSpacing="3">
          EXIT SINGULARITY // SFIT LAB GATE
        </text>
      </svg>
    ),
  },
]

export default function CenterHero({ slide, goNext, goPrev, totalChapters }) {
  const idx = Math.min(Math.max(slide, 0), CHAPTERS.length - 1)
  const chapter = CHAPTERS[idx]

  // Play voice log using Web Speech API + Web Audio chime
  const speakQuote = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      if (AudioContext) {
        const ctx = new AudioContext()
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.connect(gain); gain.connect(ctx.destination)
        osc.frequency.setValueAtTime(580, ctx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15)
        gain.gain.setValueAtTime(0.08, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25)
        osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.25)
      }
    } catch { /* noop */ }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const text = chapter.quote || chapter.body
      const utter = new SpeechSynthesisUtterance(text)
      utter.rate = 0.96
      utter.pitch = 1.02
      window.speechSynthesis.speak(utter)
    }
  }

  return (
    <div id="center-hero" className="flex-1 flex flex-col relative overflow-hidden select-none text-white">

      {/* ── SOFT AMBIENT AURA ────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full blur-[130px] opacity-25 transition-all duration-700"
          style={{ background: chapter.accent }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-[520px] h-[520px] rounded-full blur-[130px] opacity-20"
          style={{ background: '#ffffff' }}
        />
      </div>

      {/* ── FLOATING PREV / NEXT NAV ARROWS ──────────────────── */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-3 sm:px-5 z-30 pointer-events-none">
        <button
          id="nav-prev"
          onClick={goPrev}
          disabled={idx === 0}
          aria-label="Previous chapter"
          className="pointer-events-auto w-11 h-11 rounded-full border border-white/30 bg-white/15 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 hover:border-white/60 transition-all duration-200 shadow-lg disabled:opacity-20 disabled:cursor-not-allowed group cursor-pointer"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="group-hover:-translate-x-0.5 transition-transform">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>
        <button
          id="nav-next"
          onClick={goNext}
          disabled={idx === totalChapters - 1}
          aria-label="Next chapter"
          className="pointer-events-auto w-11 h-11 rounded-full border border-white/30 bg-white/15 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 hover:border-white/60 transition-all duration-200 shadow-lg disabled:opacity-20 disabled:cursor-not-allowed group cursor-pointer"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="group-hover:translate-x-0.5 transition-transform">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </button>
      </div>

      {/* ── TOP CONTROLS (VOICE LOG) ─────────────────────────── */}
      <div className="absolute top-3 left-4 z-20 flex items-center gap-2">
        <button
          onClick={speakQuote}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#d62027] hover:bg-[#ef4444] border border-red-400/50 text-white font-mono text-[10px] uppercase font-bold tracking-wider transition-all cursor-pointer shadow-[0_2px_12px_rgba(214,32,39,0.4)]"
          title="Play Voice Audio Memo"
        >
          <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
          </svg>
          <span>Voice Log</span>
        </button>
      </div>

      {/* ── MAIN STAGE ───────────────────────────────────────── */}
      <div className="flex-1 flex flex-col lg:flex-row items-stretch gap-0 overflow-hidden relative z-10">

        {/* ════ LEFT / CENTER VISUAL STAGE (CHARACTER & SCENE) ════ */}
        <div className="relative flex-1 flex items-center justify-center overflow-hidden min-h-[300px] sm:min-h-[360px] p-4 sm:p-6">

          {/* Watermark Big Chapter Number */}
          <span
            className="absolute font-oswald font-black select-none pointer-events-none text-white/[0.06]"
            style={{
              fontSize: 'clamp(120px, 24vw, 260px)',
              lineHeight: 1,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              letterSpacing: '-0.05em',
            }}
            aria-hidden="true"
          >
            {chapter.num}
          </span>

          {/* Atmospheric Chapter Concentric Aura */}
          <div
            className="absolute w-80 h-80 sm:w-96 sm:h-96 rounded-full border border-white/10 pointer-events-none animate-spin-slow opacity-40"
            style={{ animationDuration: '45s' }}
          />

          {/* Chapter Character Stage */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`char-${chapter.num}`}
              initial={{ opacity: 0, scale: 0.94, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -10 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="relative z-10 w-full max-w-[480px] flex flex-col items-center justify-center"
            >
              {/* Character Main Visual Container */}
              <div
                className="relative max-h-[48vh] sm:max-h-[54vh] flex items-center justify-center group cursor-pointer"
                onClick={speakQuote}
              >
                {/* Subtle Glow Behind Character */}
                <div
                  className="absolute inset-0 rounded-full blur-3xl opacity-35 pointer-events-none"
                  style={{ background: chapter.accent }}
                />

                {/* Character Image */}
                <motion.img
                  src={chapter.charImage}
                  alt={chapter.charAlt}
                  animate={
                    idx === 1
                      ? { y: [-8, 8, -8], rotate: [-2, 2, -2] }
                      : { y: [0, -4, 0] }
                  }
                  transition={{
                    duration: idx === 1 ? 5 : 3.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="max-h-[44vh] sm:max-h-[50vh] w-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.35)] group-hover:scale-[1.02] transition-transform duration-300"
                />

                {/* Secondary Team Character Hologram if present (e.g. Chapter 5 Comms) */}
                {chapter.secondaryCharImage && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl border-2 border-red-400 bg-black/60 backdrop-blur-md p-1 shadow-lg flex flex-col items-center justify-center overflow-hidden"
                  >
                    <img src={chapter.secondaryCharImage} alt="Team Comms" className="w-full h-full object-contain" />
                    <div className="absolute bottom-0 inset-x-0 bg-red-600/90 text-center py-0.5">
                      <span className="font-mono text-[7.5px] font-bold text-white uppercase">COMMS: GO GO</span>
                    </div>
                  </motion.div>
                )}

                {/* Interactive Dynamic Overlays by Chapter */}
                {/* Ch 1: Blinking Chip in hand */}
                {idx === 0 && (
                  <div className="absolute top-[32%] right-[24%] pointer-events-none flex items-center justify-center">
                    <span className="w-5 h-5 rounded-full bg-emerald-400 animate-ping absolute opacity-75" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400 relative shadow-[0_0_12px_#10B981]" />
                  </div>
                )}

                {/* Ch 2: Empty Chest Port Ring */}
                {idx === 1 && (
                  <div className="absolute top-[42%] left-[48%] pointer-events-none flex items-center justify-center -translate-x-1/2">
                    <span className="w-8 h-8 rounded-full border-2 border-dashed border-sky-400 animate-spin absolute" />
                    <span className="w-4 h-4 rounded-full border border-sky-300 opacity-60" />
                  </div>
                )}

                {/* Ch 3: Glowing Chest Healthcare Beacon */}
                {idx === 2 && (
                  <div className="absolute top-[48%] left-[48%] pointer-events-none flex items-center justify-center -translate-x-1/2">
                    <span className="w-12 h-12 rounded-full bg-emerald-400/30 animate-ping absolute" />
                    <span className="w-5 h-5 rounded-full bg-emerald-400 relative shadow-[0_0_18px_#10B981]" />
                  </div>
                )}

                {/* Ch 6: Dual Thruster Fire Exhaust */}
                {idx === 5 && (
                  <div className="absolute bottom-6 inset-x-0 flex justify-center gap-10 pointer-events-none">
                    <div className="w-3 h-12 bg-gradient-to-t from-transparent via-amber-400 to-red-500 rounded-full blur-[2px] animate-pulse" />
                    <div className="w-3 h-12 bg-gradient-to-t from-transparent via-amber-400 to-red-500 rounded-full blur-[2px] animate-pulse" />
                  </div>
                )}
              </div>

              {/* Bottom Telemetry Pill Overlay */}
              <div className="mt-3 flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-white/20 bg-white/12 backdrop-blur-md shadow-md text-white text-xs font-mono">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: chapter.accent }} />
                <span className="font-bold">{chapter.badgeText}</span>
                <span className="text-white/40">•</span>
                <span className="text-[#fca5a5]">{chapter.keyMetric.label}: {chapter.keyMetric.val}</span>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>

        {/* ════ RIGHT SIDE: FROSTED STORY DOSSIER & MISSION CARD ════ */}
        <div
          className="flex flex-col justify-between px-6 py-6 lg:w-[380px] xl:w-[420px] flex-shrink-0 border-t lg:border-t-0 border-white/20 shadow-2xl relative z-20"
          style={{
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.08) 100%)',
            backdropFilter: 'blur(24px) saturate(160%)',
            borderLeft: '1px solid rgba(255, 255, 255, 0.22)',
          }}
        >
          {/* Top Meta Section */}
          <div className="flex flex-col gap-4">
            
            {/* Zone Tag & Chapter Index */}
            <div className="flex items-center justify-between">
              <span
                className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] px-3 py-1 border rounded-lg shadow-sm"
                style={{
                  color: chapter.accent,
                  borderColor: `${chapter.accent}60`,
                  background: `${chapter.accent}18`,
                }}
              >
                {chapter.zone}
              </span>
              <span className="font-oswald text-xs text-white/70 tracking-wider tabular-nums font-bold">
                CHAPTER {chapter.num} / 0{totalChapters}
              </span>
            </div>

            {/* Chapter Header Title */}
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.26em] text-[#f87171] mb-1">
                Beyond The Portal · Saga Phase
              </p>
              <h2 className="font-oswald font-black uppercase leading-[0.96] tracking-tight text-white text-3xl sm:text-4xl">
                {chapter.title}
              </h2>
            </div>

            {/* Narrative Story Body */}
            <p className="font-sans text-xs sm:text-sm leading-relaxed text-white/90 font-normal">
              {chapter.body}
            </p>

            {/* Voice Quote Bubble */}
            <div
              className="p-3.5 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md space-y-1 shadow-sm cursor-pointer hover:bg-white/15 transition-all"
              onClick={speakQuote}
              title="Click to replay audio log"
            >
              <div className="flex items-center justify-between text-[9px] font-mono text-[#fca5a5]">
                <span className="font-bold uppercase tracking-wider">Audio Transcription</span>
                <span>▶ CLICK TO LISTEN</span>
              </div>
              <p className="text-xs text-white/90 italic font-sans leading-snug border-l-2 border-[#d62027] pl-2.5">
                "{chapter.quote}"
              </p>
            </div>

            {/* Tag Pills */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {chapter.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[9px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-lg border border-white/20 text-white/80 bg-white/10 shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

          </div>

          {/* Mission Objective Card */}
          <div
            className="mt-5 border rounded-2xl p-4 flex flex-col gap-1.5 shadow-lg backdrop-blur-md"
            style={{
              borderColor: `${chapter.accent}60`,
              background: `${chapter.accent}15`,
            }}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-white/70">
                Mission Directive
              </span>
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: chapter.accent }} />
            </div>
            <p className="font-oswald font-black text-base uppercase tracking-wide text-white leading-tight">
              {chapter.mission}
            </p>
            <p className="font-mono text-[10px] text-white/80">
              {chapter.missionSub}
            </p>
          </div>

        </div>

      </div>

      {/* ── CHAPTER PROGRESS STRIP & QUICK CHAPTER SWITCHER ─── */}
      <div className="border-t border-white/15 bg-white/10 backdrop-blur-md px-4 py-2 flex items-center justify-between gap-3 text-xs font-mono z-20">
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar">
          {CHAPTERS.map((c, i) => {
            const isCurrent = i === idx
            return (
              <button
                key={c.num}
                onClick={() => {
                  const diff = i - idx
                  if (diff > 0) {
                    for (let step = 0; step < diff; step++) goNext()
                  } else if (diff < 0) {
                    for (let step = 0; step < Math.abs(diff); step++) goPrev()
                  }
                }}
                className={`px-2.5 py-1 rounded-lg text-[9.5px] uppercase font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isCurrent
                    ? 'bg-[#d62027] text-white shadow-[0_2px_12px_rgba(214,32,39,0.4)]'
                    : 'bg-white/10 text-white/60 hover:text-white hover:bg-white/20'
                }`}
              >
                <span>Ch {c.num}</span>
                <span className="hidden md:inline ml-1 opacity-75">• {c.title}</span>
              </button>
            )
          })}
        </div>

        <span className="text-[10px] text-white/50 uppercase tracking-widest hidden sm:inline flex-shrink-0">
          Chapter {idx + 1} of {totalChapters}
        </span>
      </div>

    </div>
  )
}

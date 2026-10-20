import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ── AUDIO SYNTHESIZER FOR CLINICAL SFX ─────────────────────── */
function playCareChime(type = 'chime', freq = 520) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!AudioContext) return
    const ctx = new AudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    const now = ctx.currentTime

    if (type === 'chime') {
      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, now)
      osc.frequency.exponentialRampToValueAtTime(freq * 1.3, now + 0.18)
      gain.gain.setValueAtTime(0.08, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.38)
      osc.start(now)
      osc.stop(now + 0.38)
    } else if (type === 'heal') {
      const osc2 = ctx.createOscillator()
      const gain2 = ctx.createGain()
      osc2.connect(gain2)
      gain2.connect(ctx.destination)
      osc.type = 'sine'
      osc.frequency.setValueAtTime(440, now)
      osc.frequency.linearRampToValueAtTime(659.25, now + 0.3)
      gain.gain.setValueAtTime(0.07, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5)
      osc2.type = 'sine'
      osc2.frequency.setValueAtTime(554.37, now)
      osc2.frequency.linearRampToValueAtTime(880, now + 0.3)
      gain2.gain.setValueAtTime(0.05, now)
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.5)
      osc.start(now)
      osc.stop(now + 0.5)
      osc2.start(now)
      osc2.stop(now + 0.5)
    } else if (type === 'scan') {
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(320, now)
      osc.frequency.linearRampToValueAtTime(780, now + 0.25)
      osc.frequency.linearRampToValueAtTime(440, now + 0.45)
      gain.gain.setValueAtTime(0.06, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.48)
      osc.start(now)
      osc.stop(now + 0.48)
    } else if (type === 'candy') {
      osc.type = 'sine'
      osc.frequency.setValueAtTime(600, now)
      osc.frequency.exponentialRampToValueAtTime(900, now + 0.12)
      gain.gain.setValueAtTime(0.08, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22)
      osc.start(now)
      osc.stop(now + 0.22)
    }
  } catch {
    /* Ignore web audio failure on restricted autoplay */
  }
}

/* ── PAIN SCALE MATRIX DATA ──────────────────────────────────── */
const PAIN_LEVELS = [
  { level: 0, label: 'No Pain', mood: 'Peaceful', color: '#10B981', dialogue: '"I am glad you are feeling well. Remember to hydrate and breathe steadily inside the dimensional rift."' },
  { level: 1, label: 'Minimal', mood: 'Mild', color: '#34D399', dialogue: '"Very mild discomfort detected. A warm shoulder compression will alleviate localized muscle tension."' },
  { level: 2, label: 'Minor', mood: 'Calm', color: '#2DD4BF', dialogue: '"Minor tension in neck and wrists. Hiro, remember you tend to hold your breath while typing code."' },
  { level: 3, label: 'Moderate', mood: 'Noticeable', color: '#38BDF8', dialogue: '"Elevated heart rate noted. Applying gentle warmth and administering clinical reassurance."' },
  { level: 4, label: 'Discomfort', mood: 'Uneasy', color: '#FBBF24', dialogue: '"Noticeable strain from low-gravity maneuvering. Deploying inflatable vinyl cushion support."' },
  { level: 5, label: 'Distressing', mood: 'Aching', color: '#F97316', dialogue: '"Adrenaline spikes detected. Hiro, your heart rate is 126 bpm. Inhale for four seconds, exhale for four seconds."' },
  { level: 6, label: 'Intense', mood: 'Strained', color: '#FB923C', dialogue: '"Musculoskeletal fatigue in wrists and knees from impact landings. Heat wraps recommended."' },
  { level: 7, label: 'Severe', mood: 'Sharp', color: '#F87171', dialogue: '"Severe impact bruising on right forearm. Applying antiseptic mist and stabilizing brace."' },
  { level: 8, label: 'Horrible', mood: 'Distressed', color: '#EF4444', dialogue: '"WARNING: High pain markers detected. Deploying emergency analgesic mist and thermal cocoon protocol."' },
  { level: 9, label: 'Excruciating', mood: 'Agonizing', color: '#DC2626', dialogue: '"CRITICAL: Extreme pain. Keep looking at my ocular sensors. Stabilizing your vital signs now."' },
  { level: 10, label: 'Unbearable', mood: 'Emergency', color: '#B91C1C', dialogue: '"MAXIMUM TRAUMA EMERGENCY. Full armor lock engaged. I will shield you with my entire chassis."' },
]

/* ── INITIAL ARMOR & HULL HEALTH ─────────────────────────────── */
const INITIAL_ARMOR = [
  { id: 'hull', part: 'Inflatable Vinyl Hull', status: 'Sealed · Carbon tape patched by Hiro', hp: 88, color: '#38BDF8' },
  { id: 'chest', part: 'Chest Plate & Tadashi Housing', status: 'Secured · Non-violence lock active', hp: 96, color: '#10B981' },
  { id: 'gauntlet-l', part: 'Left Gauntlet (EM Barrier)', status: 'Operational · EM dispersal active', hp: 62, color: '#FBBF24' },
  { id: 'gauntlet-r', part: 'Right Gauntlet (Grapple Dart)', status: 'Magnetic winch fitted from Krei strut', hp: 38, color: '#F87171' },
  { id: 'wings', part: 'Back Flight Stabilizer Wings', status: 'Debris stress · Drift-lock mode', hp: 52, color: '#FBBF24' },
  { id: 'heaters', part: 'Ceramic Core Heating Coils', status: 'Active · Hiro thermal 37.8°C maintained', hp: 94, color: '#EF4444' },
]

/* ── INTERACTIVE ANATOMY HOTSPOTS ────────────────────────────── */
const HOTSPOTS = {
  head: {
    id: 'head',
    name: 'Ocular Sensors & Audio Synthesis',
    badge: '100% Calibrated',
    color: '#38BDF8',
    status: 'Optimal Facial & Biometric Tracking',
    desc: 'Dual stereoscopic cameras track pupil dilation, facial micro-expressions, and galvanic skin response.',
    top: '18%',
    left: '50%',
  },
  chest: {
    id: 'chest',
    name: 'Tadashi Hamada Healthcare Core',
    badge: 'Prime Directive',
    color: '#10B981',
    status: 'Healthcare Matrix Locked · 10,000 Procedures',
    desc: 'The original green medical chip created by Tadashi. Contains complete medical databases and ethical core.',
    top: '38%',
    left: '50%',
  },
  hull: {
    id: 'hull',
    name: 'Reinforced Inflatable Vinyl Hull',
    badge: '1.2 ATM Pressure',
    color: '#F87171',
    status: 'Carbon Patch Intact · Thermal Insulated',
    desc: 'Multi-layer hyper-elastic vinyl shell inflated with inert gas. Capable of absorbing 1,000 lbs of blunt impact.',
    top: '52%',
    left: '50%',
  },
  arml: {
    id: 'arml',
    name: 'Left Gauntlet EM Phase Damper',
    badge: 'Active Barrier',
    color: '#FBBF24',
    status: 'EM Shielding Hiro from Quantum Drift',
    desc: 'Projects localized electromagnetic field to shield Hiro from gravitational shearing inside the portal.',
    top: '50%',
    left: '26%',
  },
  armr: {
    id: 'armr',
    name: 'Right Arm Grapple Dart Winch',
    badge: '1,200 kg Tensile',
    color: '#EF4444',
    status: 'Krei Pod Strut Replacement',
    desc: 'After sacrificing his original rocket fist for Abigail, Hiro built this magnetic grapple winch from debris.',
    top: '50%',
    left: '74%',
  },
  thrusters: {
    id: 'thrusters',
    name: 'Hydrazine Thruster Core',
    badge: '88% Fuel Reserve',
    color: '#E5383B',
    status: '4.8 kN Emergency Horizon Burn Ready',
    desc: 'Calibrated for a synchronized maximum-thrust burn to punch through the portal event horizon back to San Fransokyo.',
    top: '78%',
    left: '50%',
  },
}

/* ── LIVE HIGH-RESOLUTION ECG OSCILLOSCOPE (FROSTED GLASS) ──── */
function EcgWaveform({ heartRate = 74, painLevel = 2, color = '#F87171', isScanning = false }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let scanX = 0

    const render = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      const w = rect.width
      const h = rect.height
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr
        canvas.height = h * dpr
      }
      ctx.save()
      ctx.scale(dpr, dpr)

      // Translucent slate trail matching the app background
      ctx.fillStyle = 'rgba(30, 48, 68, 0.28)'
      ctx.fillRect(0, 0, w, h)

      // Medical grid lines in subtle frosted white
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)'
      ctx.lineWidth = 1
      for (let y = 14; y < h; y += 14) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }
      for (let x = 14; x < w; x += 14) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
        ctx.stroke()
      }

      // ECG wave math based on heartRate & painLevel
      const speed = (heartRate / 60) * 2.2 + (isScanning ? 2.0 : 0)
      const prevX = scanX
      scanX = (scanX + speed) % w
      const cy = h * 0.52
      const cp = (scanX % 110) / 110
      let yVal = cy

      if (cp > 0.32 && cp < 0.38) yVal = cy - 4 - painLevel * 0.4
      else if (cp >= 0.38 && cp < 0.42) yVal = cy + 4
      else if (cp >= 0.42 && cp < 0.50) yVal = cy - (h * 0.42 + painLevel * 2)
      else if (cp >= 0.50 && cp < 0.55) yVal = cy + 9 + painLevel
      else if (cp >= 0.62 && cp < 0.74) yVal = cy - 6 - painLevel * 0.6
      else yVal = cy + Math.sin(scanX * 0.08) * 1.2

      // Draw ECG glowing trace (Light red / heroic accent)
      ctx.strokeStyle = color || '#F87171'
      ctx.lineWidth = 2.4
      ctx.shadowColor = color || '#F87171'
      ctx.shadowBlur = 10
      ctx.beginPath()
      ctx.moveTo(prevX > scanX ? 0 : prevX, cy)
      ctx.lineTo(scanX, yVal)
      ctx.stroke()

      // Trace leading pulse point
      ctx.shadowBlur = 0
      ctx.fillStyle = '#ffffff'
      ctx.shadowColor = color || '#F87171'
      ctx.shadowBlur = 12
      ctx.beginPath()
      ctx.arc(scanX, yVal, 3.0, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowBlur = 0
      ctx.restore()

      animId = requestAnimationFrame(render)
    }

    animId = requestAnimationFrame(render)
    return () => cancelAnimationFrame(animId)
  }, [heartRate, painLevel, color, isScanning])

  return (
    <div
      className="relative w-full h-full rounded-xl overflow-hidden border border-white/20 shadow-inner"
      style={{
        background: 'linear-gradient(180deg, rgba(30, 48, 68, 0.75) 0%, rgba(20, 36, 54, 0.85) 100%)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute top-2.5 left-3 flex items-center gap-2 text-[10.5px] font-mono bg-white/15 backdrop-blur-md px-3 py-1 rounded-md border border-white/25 text-white">
        <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
        <span className="text-white/80 font-medium">LEAD II ECG</span>
        <span className="text-white/40">•</span>
        <span className="font-bold text-red-300">{heartRate} BPM</span>
      </div>
      <div className="absolute bottom-2.5 right-3 text-[9.5px] font-mono text-white/60">
        25 mm/s • SFIT Lead II Telemetry
      </div>
    </div>
  )
}

/* ── MAIN BAYMAX CARE HUB COMPONENT (LIGHT / FROSTED RED THEME) ─ */
export default function BaymaxDiagnostics() {
  const [painLevel, setPainLevel] = useState(2)
  const [isScanningVitals, setIsScanningVitals] = useState(false)
  const [selectedHotspotKey, setSelectedHotspotKey] = useState('chest')
  const [activeTab, setActiveTab] = useState('vitals')
  const [armorState, setArmorState] = useState(INITIAL_ARMOR)
  const [lollipopCount, setLollipopCount] = useState(4)
  const [healingApplied, setHealingApplied] = useState(false)
  const [satisfactionModalOpen, setSatisfactionModalOpen] = useState(false)
  const [satisfactionMsg, setSatisfactionMsg] = useState('')

  const pain = useMemo(() => PAIN_LEVELS[painLevel] || PAIN_LEVELS[0], [painLevel])
  const activeHotspot = useMemo(() => HOTSPOTS[selectedHotspotKey] || HOTSPOTS.chest, [selectedHotspotKey])

  // Computed physiological indicators
  const heartRate = useMemo(() => Math.round(68 + painLevel * 6.2 + (isScanningVitals ? 6 : 0)), [painLevel, isScanningVitals])
  const spO2 = useMemo(() => Math.max(94, 99 - Math.floor(painLevel * 0.45)), [painLevel])
  const bodyTemp = useMemo(() => (36.8 + painLevel * 0.12).toFixed(1), [painLevel])
  const cortisol = useMemo(() => Math.min(48, Math.round(11 + painLevel * 3.4)), [painLevel])

  // Select pain level
  const handlePainSelect = (lvl) => {
    setPainLevel(lvl)
    setHealingApplied(false)
    playCareChime('chime', 440 + lvl * 32)
  }

  // Run full biometric scan
  const runFullScan = () => {
    if (isScanningVitals) return
    setIsScanningVitals(true)
    playCareChime('scan')
    setTimeout(() => {
      setIsScanningVitals(false)
      playCareChime('heal')
    }, 2400)
  }

  // Apply warm compress & comfort hug
  const applyTreatment = () => {
    playCareChime('heal')
    setHealingApplied(true)
    setPainLevel((p) => Math.max(0, p - 2))
  }

  // Dispense lollipop
  const dispenseLollipop = () => {
    if (lollipopCount <= 0) return
    playCareChime('candy')
    setLollipopCount((c) => c - 1)
    setPainLevel((p) => Math.max(0, p - 1))
  }

  // Patch armor zone
  const patchArmor = (id) => {
    playCareChime('chime', 680)
    setArmorState((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, hp: 100, status: 'Restored to 100% · Reinforced with carbon weave' }
          : item
      )
    )
  }

  // I am satisfied with my care
  const handleSatisfied = () => {
    if (painLevel > 2) {
      setSatisfactionMsg(
        'Hiro, your vitals still indicate pain markers. As your healthcare companion, I recommend addressing the discomfort before deactivation.'
      )
    } else {
      setSatisfactionMsg(
        'I am glad you are safe and satisfied with your care. I cannot deactivate until we step through the portal together, Hiro.'
      )
      playCareChime('heal')
    }
    setSatisfactionModalOpen(true)
  }

  const TABS = [
    { id: 'vitals', label: 'Biometrics & ECG', icon: '♥' },
    { id: 'chip', label: 'Tadashi Chip Matrix', icon: '◈' },
    { id: 'armor', label: 'Armor & Chassis', icon: '⬡' },
    { id: 'dispensary', label: 'Field Dispensary', icon: '✦' },
  ]

  return (
    <div className="flex-1 flex flex-col h-full w-full overflow-hidden relative select-none text-white">
      
      {/* ── SOFT LIGHT BACKGROUND AURA (STEEL-BLUE & ROSE ACCENTS) ─ */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full blur-[130px] opacity-25 transition-all duration-700"
          style={{ background: '#f87171' }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-[520px] h-[520px] rounded-full blur-[130px] opacity-20"
          style={{ background: '#ffffff' }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />
      </div>

      {/* ── TOP HEADER / FROSTED CLINICAL COMMAND BAR ────────── */}
      <header
        className="flex items-center justify-between px-5 sm:px-6 py-3 border-b border-white/20 z-20 flex-shrink-0"
        style={{
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.08) 100%)',
          backdropFilter: 'blur(20px) saturate(160%)',
          boxShadow: '0 4px 20px rgba(15, 23, 42, 0.1)',
        }}
      >
        <div className="flex items-center gap-3.5">
          {/* Big Hero 6 Red Pulse Indicator */}
          <div className="relative flex items-center justify-center">
            <span
              className="w-3.5 h-3.5 rounded-full absolute animate-ping opacity-60 bg-[#d62027]"
            />
            <span
              className="w-3.5 h-3.5 rounded-full relative block bg-[#d62027] shadow-[0_0_12px_#d62027]"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
                Healthcare Companion Terminal // Model 2.0
              </span>
              <span className="text-[10px] font-mono text-[#f87171] font-semibold">• Tadashi Directives Online</span>
            </div>
            <h1 className="font-oswald text-xl sm:text-2xl font-black uppercase tracking-tight text-white leading-none mt-0.5">
              Baymax Care Hub
              <span className="text-white/30 font-normal mx-2">/</span>
              <span className="text-white">{pain.mood}</span>
            </h1>
          </div>
        </div>

        {/* Live Patient Indicators & Action Buttons */}
        <div className="flex items-center gap-2.5">
          <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md text-xs font-mono shadow-sm">
            <span className="text-white/60">Patient:</span>
            <span className="font-bold text-white">Hiro Hamada</span>
            <span className="text-white/30">•</span>
            <span className="text-[#fca5a5] font-semibold">Bio-ID: SF-2014</span>
          </div>

          <button
            onClick={runFullScan}
            disabled={isScanningVitals}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-md ${
              isScanningVitals
                ? 'bg-white/25 text-white border border-white/40'
                : 'bg-[#d62027] hover:bg-[#ef4444] text-white border border-red-400/50 shadow-[0_4px_16px_rgba(214,32,39,0.4)]'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isScanningVitals ? 'bg-white animate-ping' : 'bg-white'}`} />
            {isScanningVitals ? 'Running Scan...' : 'Full Scan'}
          </button>

          <button
            onClick={handleSatisfied}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono uppercase font-bold tracking-wider border border-white/25 bg-white/12 hover:bg-white/22 text-white transition-all cursor-pointer shadow-sm"
          >
            <span className="text-emerald-300">✓</span>
            <span>I Am Satisfied</span>
          </button>
        </div>
      </header>

      {/* ── MAIN WORKSPACE (LIGHT FROSTED GLASS & RED ACCENTS) ─ */}
      <div className="flex-1 overflow-y-auto z-10 p-4 sm:p-6 lg:p-7 [scrollbar-width:thin]">
        <div className="w-full max-w-[1760px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* ════ LEFT COLUMN: HOLOGRAPHIC BAYMAX SCANNER CHAMBER ════ */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            <div
              className="rounded-2xl border border-white/25 overflow-hidden relative flex flex-col shadow-[0_12px_40px_rgba(15,23,42,0.18)]"
              style={{
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.08) 100%)',
                backdropFilter: 'blur(24px) saturate(160%)',
              }}
            >
              {/* Scan Chamber Header */}
              <div className="px-5 py-3.5 border-b border-white/15 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f87171] animate-pulse" />
                  <h2 className="font-oswald text-base sm:text-lg font-bold uppercase tracking-wide text-white">
                    Holographic Biometric Scanner
                  </h2>
                </div>
                <span
                  className="px-2.5 py-1 rounded-lg text-[10.5px] font-mono uppercase font-bold border border-red-400/40 bg-red-500/15 text-[#fca5a5]"
                >
                  6 Nodes Active
                </span>
              </div>

              {/* Hologram Stage Area */}
              <div
                className="relative w-full flex items-center justify-center p-6 overflow-hidden"
                style={{
                  minHeight: '380px',
                  background: 'radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.04) 65%, transparent 100%)',
                }}
              >
                {/* Laser scan line if scanning */}
                {isScanningVitals && (
                  <motion.div
                    className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#ef4444] to-transparent z-20 pointer-events-none shadow-[0_0_18px_#ef4444]"
                    initial={{ top: '0%' }}
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}

                {/* Concentric Holo Rings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
                  <div
                    className="w-72 h-72 rounded-full border border-red-300/30 animate-spin"
                    style={{ animationDuration: '30s' }}
                  />
                  <div className="absolute w-56 h-56 rounded-full border border-dashed border-white/30" />
                  <div className="absolute w-40 h-40 rounded-full border border-red-300/35" />
                </div>

                {/* Baymax High-Fidelity Silhouette / Hologram */}
                <div className="relative z-10 flex items-center justify-center">
                  <img
                    src="/characters/baymax.png"
                    alt="Baymax Hologram"
                    className="max-h-[320px] sm:max-h-[350px] object-contain drop-shadow-[0_10px_35px_rgba(255,255,255,0.45)] transition-all duration-300"
                  />

                  {/* Hotspot Target Nodes */}
                  {Object.values(HOTSPOTS).map((hs) => {
                    const isSelected = selectedHotspotKey === hs.id
                    return (
                      <button
                        key={hs.id}
                        onClick={() => {
                          setSelectedHotspotKey(hs.id)
                          playCareChime('chime', 620)
                        }}
                        className="absolute cursor-pointer group focus:outline-none"
                        style={{
                          top: hs.top,
                          left: hs.left,
                          transform: 'translate(-50%, -50%)',
                        }}
                        title={hs.name}
                      >
                        <div
                          className={`relative flex items-center justify-center transition-all duration-200 ${
                            isSelected ? 'scale-130' : 'group-hover:scale-115'
                          }`}
                        >
                          <span
                            className="absolute w-8 h-8 rounded-full border animate-ping opacity-50"
                            style={{ borderColor: hs.color }}
                          />
                          <span
                            className="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shadow-md"
                            style={{
                              borderColor: hs.color,
                              background: isSelected ? hs.color : 'rgba(255, 255, 255, 0.85)',
                              boxShadow: isSelected ? `0 0 16px ${hs.color}` : '0 2px 8px rgba(0,0,0,0.2)',
                            }}
                          >
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{ background: isSelected ? '#ffffff' : hs.color }}
                            />
                          </span>
                        </div>
                      </button>
                    )
                  })}
                </div>

                <div className="absolute bottom-3 left-4 text-[10px] font-mono text-white/60">
                  SFIT HUD • GRID REF: BX-884
                </div>
              </div>

              {/* Active Hotspot Detail Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeHotspot.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-5 border-t border-white/15 space-y-2 bg-white/10 backdrop-blur-md"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-oswald text-base font-bold uppercase tracking-wide text-white">
                      {activeHotspot.name}
                    </h3>
                    <span
                      className="px-2.5 py-0.5 rounded-md text-[10px] font-mono uppercase font-bold border border-white/25 bg-white/15 text-white"
                    >
                      {activeHotspot.badge}
                    </span>
                  </div>
                  <p className="text-xs text-white/85 leading-relaxed font-sans">{activeHotspot.desc}</p>
                  <div className="pt-2 flex items-center justify-between text-xs font-mono">
                    <span className="text-white/70">{activeHotspot.status}</span>
                    <button
                      onClick={() => playCareChime('heal')}
                      className="px-3.5 py-1 rounded-lg text-[10px] uppercase font-bold border border-white/25 bg-white/20 hover:bg-white/30 text-white transition-all cursor-pointer shadow-sm"
                    >
                      Diagnostics OK
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Footer Quick Telemetry */}
              <div
                className="px-5 py-3 border-t border-white/15 flex items-center justify-between text-xs font-mono bg-white/8 text-white/80"
              >
                <span className="text-white">Hull Pressure: 1.2 ATM</span>
                <span className="text-white/30">•</span>
                <span className="text-[#fca5a5] font-semibold">Battery: 88%</span>
                <span className="text-white/30">•</span>
                <span className="text-white">Thermal: 37.8°C</span>
              </div>
            </div>

            {/* Live Telemetry Ticker Card (Frosted Pill) */}
            <div className="rounded-xl px-4 py-3 border border-white/20 bg-white/12 backdrop-blur-md flex items-center gap-3 text-xs font-mono text-white/90 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f87171] animate-pulse flex-shrink-0" />
              <span className="truncate">
                [LIVE] Heart Rate: {heartRate} BPM • SpO2: {spO2}% • Core: {bodyTemp}°C • Tadashi Chip: 100% Efficiency
              </span>
            </div>

          </div>

          {/* ════ RIGHT COLUMN: PAIN ASSESSMENT & MODULAR CLINICAL HUD ════ */}
          <div className="lg:col-span-7 flex flex-col gap-6">

            {/* ── SECTION 1: THE ICONIC PAIN SCALE CONSOLE ────────── */}
            <section
              className="rounded-2xl border border-white/25 overflow-hidden shadow-[0_12px_40px_rgba(15,23,42,0.18)]"
              style={{
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.08) 100%)',
                backdropFilter: 'blur(24px) saturate(160%)',
              }}
            >
              {/* Header Title */}
              <div className="px-6 py-4 border-b border-white/15 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-[10.5px] font-mono uppercase tracking-[0.22em] text-[#fca5a5] font-bold block mb-1">
                    Tadashi Clinical Inquiry Protocol
                  </span>
                  <h2 className="font-oswald text-xl sm:text-2xl font-black uppercase text-white tracking-tight leading-tight">
                    On a scale of 0 to 10, how would you rate your pain?
                  </h2>
                </div>
                <div
                  className="px-3.5 py-1.5 rounded-xl border border-white/30 bg-white/20 font-oswald text-sm font-bold flex items-center gap-2 text-white shadow-sm"
                >
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: pain.color }} />
                  <span>Level {painLevel} — {pain.label}</span>
                </div>
              </div>

              {/* 11-Step Interactive Pain Bar */}
              <div className="p-6 space-y-5">
                <div className="grid grid-cols-11 gap-1.5 sm:gap-2">
                  {PAIN_LEVELS.map((p) => {
                    const isSelected = p.level === painLevel
                    return (
                      <button
                        key={p.level}
                        onClick={() => handlePainSelect(p.level)}
                        className={`py-3 px-1 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? 'scale-108 z-10 bg-white/30 border-white shadow-[0_0_18px_rgba(255,255,255,0.4)]'
                            : 'border-white/20 bg-white/10 hover:bg-white/20 hover:border-white/35 hover:scale-103'
                        }`}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{
                            background: p.color,
                            boxShadow: isSelected ? `0 0 10px ${p.color}` : 'none',
                          }}
                        />
                        <span className="font-oswald text-base sm:text-lg font-black text-white leading-none">
                          {p.level}
                        </span>
                        <span className="font-mono text-[8px] uppercase tracking-tight text-white/70 truncate max-w-full text-center">
                          {p.label}
                        </span>
                      </button>
                    )
                  })}
                </div>

                {/* Baymax Speech Box */}
                <div
                  className="p-4 sm:p-5 rounded-2xl border border-white/20 flex items-start gap-4 shadow-sm"
                  style={{ background: 'rgba(255, 255, 255, 0.12)', backdropFilter: 'blur(16px)' }}
                >
                  <div className="w-12 h-12 rounded-2xl overflow-hidden border border-white/30 flex-shrink-0 bg-white/20 p-1 shadow-inner">
                    <img src="/characters/baymax.png" alt="Baymax Avatar" className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-oswald text-sm font-bold uppercase tracking-wider text-white">Baymax</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md border border-white/25 bg-white/15 text-white/80">
                        Status: {pain.mood}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-white leading-relaxed font-sans italic border-l-2 border-[#ef4444] pl-3">
                      {pain.dialogue}
                    </p>
                  </div>
                </div>

                {/* Care Remedy Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/15">
                  <div className="text-xs font-mono text-white/80">
                    {healingApplied ? (
                      <span className="text-emerald-300 font-semibold">✓ Heat compress administered — heart rate stabilizing</span>
                    ) : (
                      <span>Select treatment remedies to alleviate patient distress:</span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      onClick={applyTreatment}
                      disabled={painLevel === 0}
                      className="px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-[#d62027] hover:bg-[#ef4444] text-white transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_4px_16px_rgba(214,32,39,0.35)]"
                    >
                      Administer Hug & Warmth
                    </button>

                    <button
                      onClick={dispenseLollipop}
                      disabled={lollipopCount === 0}
                      className="px-4 py-2 rounded-xl text-xs font-mono uppercase font-bold tracking-wider border border-white/25 bg-white/15 hover:bg-white/25 text-white transition-all cursor-pointer disabled:opacity-40 shadow-sm"
                    >
                      🍭 Dispense Lollipop ({lollipopCount} left)
                    </button>
                  </div>
                </div>

              </div>
            </section>

            {/* ── SECTION 2: MODULAR CLINICAL TABS & TELEMETRY ───── */}
            <section
              className="rounded-2xl border border-white/25 overflow-hidden shadow-[0_12px_40px_rgba(15,23,42,0.18)] flex flex-col"
              style={{
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.08) 100%)',
                backdropFilter: 'blur(24px) saturate(160%)',
              }}
            >
              {/* Tab Navigation Pill Bar */}
              <div className="px-5 py-3.5 border-b border-white/15 flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 p-1 rounded-xl border border-white/20 bg-black/15 backdrop-blur-md">
                  {TABS.map((tab) => {
                    const isActive = activeTab === tab.id
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveTab(tab.id)
                          playCareChime('chime', 640)
                        }}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                          isActive
                            ? 'bg-[#d62027] text-white font-bold shadow-[0_2px_12px_rgba(214,32,39,0.4)]'
                            : 'text-white/70 hover:text-white'
                        }`}
                      >
                        <span>{tab.icon}</span>
                        <span>{tab.label}</span>
                      </button>
                    )
                  })}
                </div>
                <span className="text-xs font-mono text-white/50 hidden sm:inline">SFIT LAB 2.0</span>
              </div>

              {/* Tab Contents Area */}
              <div className="p-6">
                <AnimatePresence mode="wait">

                  {/* TAB 1: BIOMETRICS & LIVE ECG */}
                  {activeTab === 'vitals' && (
                    <motion.div
                      key="vitals"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      {/* Live ECG Oscilloscope Screen */}
                      <div className="h-44 sm:h-52 w-full">
                        <EcgWaveform
                          heartRate={heartRate}
                          painLevel={painLevel}
                          color={pain.color}
                          isScanning={isScanningVitals}
                        />
                      </div>

                      {/* 4 Large Clean Vital Cards */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="p-4 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md space-y-1 shadow-sm">
                          <span className="font-mono text-[10px] uppercase tracking-widest text-white/60 block">Heart Rate</span>
                          <span className="font-oswald text-2xl sm:text-3xl font-black block text-white">
                            {heartRate} <span className="text-xs font-mono text-white/60 font-normal">BPM</span>
                          </span>
                          <span className="font-mono text-[10px] text-white/60 block">
                            {painLevel > 5 ? 'Combat Strain' : 'Rhythm Normal'}
                          </span>
                        </div>

                        <div className="p-4 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md space-y-1 shadow-sm">
                          <span className="font-mono text-[10px] uppercase tracking-widest text-white/60 block">Blood Oxygen</span>
                          <span className="font-oswald text-2xl sm:text-3xl font-black text-emerald-300 block">
                            {spO2}%
                          </span>
                          <span className="font-mono text-[10px] text-white/60 block">O2 Scrubber OK</span>
                        </div>

                        <div className="p-4 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md space-y-1 shadow-sm">
                          <span className="font-mono text-[10px] uppercase tracking-widest text-white/60 block">Core Temp</span>
                          <span className="font-oswald text-2xl sm:text-3xl font-black text-amber-300 block">
                            {bodyTemp}°C
                          </span>
                          <span className="font-mono text-[10px] text-white/60 block">Insulated Shell</span>
                        </div>

                        <div className="p-4 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md space-y-1 shadow-sm">
                          <span className="font-mono text-[10px] uppercase tracking-widest text-white/60 block">Cortisol / Stress</span>
                          <span className="font-oswald text-2xl sm:text-3xl font-black block text-[#fca5a5]">
                            {cortisol} <span className="text-xs font-mono text-white/60 font-normal">ng/mL</span>
                          </span>
                          <span className="font-mono text-[10px] text-white/60 block">Adrenaline Level</span>
                        </div>
                      </div>

                      {/* Clinical Field Notes */}
                      <div className="p-4 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#fca5a5] block mb-1">
                          Baymax Clinical Observation
                        </span>
                        <p className="text-sm text-white/90 font-sans italic leading-relaxed">
                          Hiro demonstrates elevated vigilance and stress due to dimensional portal traversal. Regular hydration and localized heat therapy are strongly recommended.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 2: TADASHI CHIP MATRIX */}
                  {activeTab === 'chip' && (
                    <motion.div
                      key="chip"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="space-y-5"
                    >
                      <div className="p-5 rounded-2xl border border-emerald-400/40 bg-emerald-500/15 backdrop-blur-md space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-oswald text-lg font-bold uppercase text-white">
                            Tadashi Hamada Healthcare Programming Core
                          </h4>
                          <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase font-bold border border-emerald-400/50 text-white bg-emerald-500/30">
                            10,000 Procedures
                          </span>
                        </div>
                        <p className="text-sm text-white/90 font-sans leading-relaxed">
                          When Hiro plunged into the dimensional rift to rescue Abigail, he carried this chip in his hand. Embedded with Tadashi's voice logs and empathetic care algorithms, it ensures Baymax remains dedicated to healing and protection.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md space-y-1.5 shadow-sm">
                          <span className="font-mono text-[10px] uppercase tracking-widest text-white/60 block">Primary Architect</span>
                          <span className="font-oswald text-xl font-bold text-white block">Tadashi Hamada</span>
                          <span className="text-xs text-white/70 block">San Fransokyo Institute of Technology</span>
                        </div>

                        <div className="p-4 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md space-y-1.5 shadow-sm">
                          <span className="font-mono text-[10px] uppercase tracking-widest text-white/60 block">Prime Directive</span>
                          <span className="font-oswald text-xl font-bold text-emerald-300 block">Heal and Protect</span>
                          <span className="text-xs text-white/70 block">Zero Harm Protocol Enforced</span>
                        </div>

                        <div className="p-4 rounded-xl border border-red-400/40 bg-red-500/15 backdrop-blur-md space-y-1.5 shadow-sm">
                          <span className="font-mono text-[10px] uppercase tracking-widest text-red-200 block">Combat Chip</span>
                          <span className="font-oswald text-xl font-bold text-red-200 block">UNINSTALLED</span>
                          <span className="text-xs text-white/80 block">Violence Matrix Permanently Blocked</span>
                        </div>

                        <div className="p-4 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md space-y-1.5 shadow-sm">
                          <span className="font-mono text-[10px] uppercase tracking-widest text-white/60 block">Empathy Matrix</span>
                          <span className="font-oswald text-xl font-bold text-white block">Active & Synchronized</span>
                          <span className="text-xs text-white/70 block">Patient Bond: 99.8%</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 3: ARMOR & CHASSIS INTEGRITY */}
                  {activeTab === 'armor' && (
                    <motion.div
                      key="armor"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="space-y-3"
                    >
                      <div className="flex items-center justify-between text-xs font-mono text-white/70 uppercase tracking-widest pb-1">
                        <span>Chassis Component Health</span>
                        <span>Click Patch to Repair</span>
                      </div>

                      {armorState.map((item) => (
                        <div
                          key={item.id}
                          className="p-4 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md flex items-center gap-4 hover:border-white/35 transition-all shadow-sm"
                        >
                          <div className="flex-1 min-w-0 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-oswald text-base font-bold text-white">{item.part}</span>
                              <span className="font-oswald text-lg font-black" style={{ color: item.color }}>
                                {item.hp}%
                              </span>
                            </div>
                            <div className="w-full h-2.5 rounded-full overflow-hidden bg-white/20">
                              <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{
                                  width: `${item.hp}%`,
                                  background: item.color,
                                  boxShadow: `0 0 10px ${item.color}`,
                                }}
                              />
                            </div>
                            <span className="text-xs font-mono text-white/70 block">{item.status}</span>
                          </div>

                          <button
                            onClick={() => patchArmor(item.id)}
                            disabled={item.hp >= 100}
                            className="px-4 py-2 rounded-xl text-xs font-mono uppercase font-bold border border-red-400/40 bg-[#d62027]/80 hover:bg-[#d62027] text-white transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0 shadow-sm"
                          >
                            {item.hp >= 100 ? 'OK' : 'Patch'}
                          </button>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {/* TAB 4: FIELD DISPENSARY */}
                  {activeTab === 'dispensary' && (
                    <motion.div
                      key="dispensary"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <div className="p-4 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md space-y-1">
                        <h4 className="font-oswald text-base font-bold uppercase text-[#fca5a5]">
                          Emergency Comfort Inventory
                        </h4>
                        <p className="text-xs text-white/80 font-sans leading-relaxed">
                          Internal vinyl compartment contains medical and emotional support equipment calibrated for dimensional survival.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md space-y-1.5 shadow-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">♨</span>
                            <span className="font-mono text-xs uppercase font-bold text-white">
                              Ceramic Thermal Wrap
                            </span>
                          </div>
                          <p className="text-xs text-white/75 leading-relaxed font-sans">
                            Maintains patient core temperature against the freezing cold of dimensional vacuum.
                          </p>
                        </div>

                        <div className="p-4 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md space-y-1.5 shadow-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">🍭</span>
                            <span className="font-mono text-xs uppercase font-bold text-emerald-300">
                              Sweet Lollipop Reserve
                            </span>
                          </div>
                          <p className="text-xs text-white/75 leading-relaxed font-sans">
                            Reduces cortisol spikes and rewards patient resilience. {lollipopCount} units available.
                          </p>
                        </div>

                        <div className="p-4 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md space-y-1.5 shadow-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">⊕</span>
                            <span className="font-mono text-xs uppercase font-bold text-amber-300">
                              Vinyl Puncture Patches
                            </span>
                          </div>
                          <p className="text-xs text-white/75 leading-relaxed font-sans">
                            Ultra-tensile carbon adhesive to seal micro-fissures caused by sharp microbot edges.
                          </p>
                        </div>

                        <div className="p-4 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md space-y-1.5 shadow-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">♪</span>
                            <span className="font-mono text-xs uppercase font-bold text-[#fca5a5]">
                              Tadashi Voice Archive
                            </span>
                          </div>
                          <p className="text-xs text-white/75 leading-relaxed font-sans">
                            Audio recordings to remind Hiro why they build, innovate, and persevere.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </section>

          </div>

        </div>
      </div>

      {/* ── SATISFACTION MODAL POPUP ─────────────────────────── */}
      <AnimatePresence>
        {satisfactionModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md"
            onClick={() => setSatisfactionModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-md w-full rounded-2xl border border-white/30 p-6 space-y-5 shadow-2xl"
              style={{
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.12) 100%)',
                backdropFilter: 'blur(30px) saturate(180%)',
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-2xl">
                  {painLevel <= 2 ? '❤️' : '⚠️'}
                </div>
                <div>
                  <h3 className="font-oswald text-lg font-bold uppercase text-white">
                    {painLevel <= 2 ? 'Patient Care Completed' : 'Care In Progress'}
                  </h3>
                  <span className="text-xs font-mono text-[#fca5a5]">Baymax Clinical Companion</span>
                </div>
              </div>

              <p className="text-sm text-white leading-relaxed font-sans italic border-l-2 border-[#ef4444] pl-3">
                "{satisfactionMsg}"
              </p>

              <div className="flex justify-end">
                <button
                  onClick={() => setSatisfactionModalOpen(false)}
                  className="px-5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-[#d62027] hover:bg-[#ef4444] text-white transition-all cursor-pointer shadow-md"
                >
                  Understood
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}

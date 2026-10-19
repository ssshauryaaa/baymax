import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CHAR_CONFIG = {
  baymax: {
    img: '/characters/baymax.png',
    bgSize: 'auto 280%',
    bgPosition: '50% 6%',
    fullImg: '/characters/baymax.png',
  },
  hiro: {
    img: '/characters/hiro.png',
    bgSize: 'auto 250%',
    bgPosition: '49% 4%',
    fullImg: '/characters/hiro.png',
  },
  gogo: {
    img: '/characters/gogo.png',
    bgSize: 'auto 270%',
    bgPosition: '36% 4%',
    fullImg: '/characters/gogo.png',
  },
  'honey-lemon': {
    img: '/characters/honey-lemon.png',
    bgSize: 'auto 290%',
    bgPosition: '82% 4%',
    fullImg: '/characters/honey-lemon.png',
  },
  wasabi: {
    img: '/characters/wasabi.png',
    bgSize: 'auto 300%',
    bgPosition: '78% 12%',
    fullImg: '/characters/wasabi.png',
  },
  fred: {
    img: '/characters/fred.png',
    bgSize: 'auto 320%',
    bgPosition: '39% 20%',
    fullImg: '/characters/fred.png',
  },
}

const CHANNELS = [
  {
    id: 'baymax',
    name: 'Baymax',
    subtitle: 'Healthcare Companion',
    callsign: 'HEALTHCARE-01',
    role: 'Personal Healthcare Companion',
    color: '#2DD4BF',
    freq: '38.7 GHz',
    band: 'TEAL',
    location: 'Inside Void — Sector 03',
    status: 'NOMINAL',
    statusOk: true,
    battery: 34,
    signal: 87,
    encrypted: true,
    latency: '14ms',
    message:
      'Hiro Hamada is my patient. His physiological indicators show elevated adrenaline, but clear cognitive focus. He refused to leave my shell behind. I have updated my diagnostic protocol: companionship is essential to holistic wellness. We will exit together.',
    audioQuote:
      'I cannot deactivate until you are satisfied with your care. And you are not safe yet, Hiro.',
    stats: [
      { label: 'Heart Rate', value: '72', unit: 'BPM' },
      { label: 'Armor Matrix', value: '88', unit: '%' },
      { label: 'Battery Core', value: '34', unit: '%' },
      { label: 'Pain Index', value: '01', unit: '/10' },
    ],
    neuralLinks: [
      { label: 'Armor Shield', value: 92 },
      { label: 'Thruster Fuel', value: 24 },
      { label: 'Heal Protocol', value: 98 },
      { label: 'Carrier Sync', value: 87 },
    ],
    logs: [
      { time: 'T+00:12', text: 'Healthcare chip reinstalled. Systems online.' },
      { time: 'T+00:34', text: 'Patient Hiro Hamada: adrenaline elevated, cognition clear.' },
      { time: 'T+01:18', text: 'Traversing inverted canyon. Gravity assist activated.' },
      { time: 'T+02:45', text: 'Glitch bridge crossing initiated. Shield arm deployed.' },
      { time: 'T+03:22', text: 'Exit portal located. Thruster fuel: 1 burst remaining.' },
    ],
    vitals: { armor: 72, signal: 87, power: 34 },
  },
  {
    id: 'hiro',
    name: 'Hiro Hamada',
    subtitle: 'Robotics Prodigy',
    callsign: 'PRODIGY-LEAD',
    role: 'Team Leader & Prodigy Inventor',
    color: '#E5383B',
    freq: '21.1 GHz',
    band: 'RED',
    location: 'Inside Void — Sector 03',
    status: 'ACTIVE',
    statusOk: true,
    battery: null,
    signal: 73,
    encrypted: true,
    latency: '18ms',
    message:
      'Everyone, do not shut that portal down. I found Baymax. The physics in here are completely inverted, but we are building a path across the glitch fields. Keep the emitter coils hot. We are coming home.',
    audioQuote: 'I was not going to lose him twice. We solve this together.',
    stats: [
      { label: 'Adrenaline', value: '142', unit: 'BPM' },
      { label: 'Suit Charge', value: '84', unit: '%' },
      { label: 'Microbots', value: '1.2M', unit: 'QTY' },
      { label: 'Gravity Dip', value: '-0.8', unit: 'G' },
    ],
    neuralLinks: [
      { label: 'Helmet HUD', value: 96 },
      { label: 'Glove Comm', value: 88 },
      { label: 'Mag-Tether', value: 94 },
      { label: 'Portal Lock', value: 73 },
    ],
    logs: [
      { time: 'T+00:02', text: 'Portal entry confirmed. No gravity baseline detected.' },
      { time: 'T+00:08', text: 'Baymax armour located. Chip insertion successful.' },
      { time: 'T+01:02', text: 'Microbot cluster reprogrammed. Bridge scaffold forming.' },
      { time: 'T+02:10', text: 'Glitch storm frequency calculated: 14.8s cycle.' },
      { time: 'T+03:40', text: 'Exit vector locked. Synchronizing with Baymax thruster.' },
    ],
    vitals: { armor: 45, signal: 73, power: 88 },
  },
  {
    id: 'gogo',
    name: 'Go Go Tomago',
    subtitle: 'Maglev Specialist',
    callsign: 'MAGLEV-03',
    role: 'Magnetic Induction Specialist',
    color: '#FBBF24',
    freq: '14.4 GHz',
    band: 'AMBER',
    location: 'San Fransokyo Lab — Emitter',
    status: 'CRITICAL',
    statusOk: false,
    battery: null,
    signal: 94,
    encrypted: false,
    latency: '8ms',
    message:
      'Hiro! Stop talking and keep moving! Honey Lemon and I are redlining the lab capacitors. The magnetic field is destabilizing at 3% per minute. You have less time than you think!',
    audioQuote: 'Stop whining, Hiro. We are holding the door open for you!',
    stats: [
      { label: 'Induction', value: '98', unit: 'T' },
      { label: 'Disc RPM', value: '8.4K', unit: 'RPM' },
      { label: 'Heat Flux', value: '88', unit: '°C' },
      { label: 'Field Drift', value: '3.1', unit: '%/m' },
    ],
    neuralLinks: [
      { label: 'Coil Balance', value: 68 },
      { label: 'Maglev Disc', value: 99 },
      { label: 'Lab Capacitor', value: 64 },
      { label: 'Link Stream', value: 94 },
    ],
    logs: [
      { time: 'T+00:00', text: 'Portal emitter capacitors at 100%. Holding steady.' },
      { time: 'T+00:45', text: 'Field degradation detected. 3% per minute.' },
      { time: 'T+01:30', text: 'Rerouting magnetic induction to secondary coils.' },
      { time: 'T+02:20', text: 'WARNING: Emitter rings overheating. Cooling vents engaged.' },
      { time: 'T+03:15', text: 'Holding at 68% capacity. Move faster, Hiro!' },
    ],
    vitals: { armor: 90, signal: 94, power: 68 },
  },
  {
    id: 'honey-lemon',
    name: 'Honey Lemon',
    subtitle: 'Chemical Engineer',
    callsign: 'CHEM-04',
    role: 'Polymer & Chemical Synthesis',
    color: '#F472B6',
    freq: '55.2 GHz',
    band: 'PINK',
    location: 'San Fransokyo Lab — Base',
    status: 'NOMINAL',
    statusOk: true,
    battery: null,
    signal: 61,
    encrypted: true,
    latency: '11ms',
    message:
      'Hiro, we can hear you! I just synthesized a pressurized hyper-cooled chemical compound to stop the portal generator from overheating. Your telemetry signals just synced up with Baymax! Keep going!',
    audioQuote: 'It worked! Hiro, your signals are synchronized! Do not give up!',
    stats: [
      { label: 'Chem Pressure', value: '320', unit: 'PSI' },
      { label: 'Coolant Temp', value: '-84', unit: '°C' },
      { label: 'Purse Synth', value: '100', unit: '%' },
      { label: 'Seal Buffer', value: '91', unit: '%' },
    ],
    neuralLinks: [
      { label: 'Chem Synthesis', value: 95 },
      { label: 'Coolant Inject', value: 89 },
      { label: 'Telemetry Sync', value: 78 },
      { label: 'Pulse Frequency', value: 61 },
    ],
    logs: [
      { time: 'T+00:10', text: 'Chem-pack synthesis begun. Formula: Void-Sealant-v3.' },
      { time: 'T+01:05', text: 'Compound pressurized. Applied to emitter base seals.' },
      { time: 'T+01:55', text: 'Telemetry sync achieved! Both signals detected.' },
      { time: 'T+02:40', text: 'Backup coolant injected into ring array Alpha-7.' },
      { time: 'T+03:30', text: 'Standing by. Ready for emergency seal on command.' },
    ],
    vitals: { armor: 80, signal: 61, power: 92 },
  },
  {
    id: 'wasabi',
    name: 'Wasabi',
    subtitle: 'Plasma Physicist',
    callsign: 'PLASMA-05',
    role: 'Laser & Precision Plasma Physics',
    color: '#34D399',
    freq: '9.6 GHz',
    band: 'GREEN',
    location: 'San Fransokyo Lab — Console',
    status: 'NOMINAL',
    statusOk: true,
    battery: null,
    signal: 79,
    encrypted: true,
    latency: '9ms',
    message:
      'There is literally NO PROTOCOL for jumping BACK into a dimensional singularity, Hiro. But hearing Baymax voice just now? I am not crying. Plasma beam is locked onto your coordinates! Get out of there!',
    audioQuote:
      'I have a very detailed spreadsheet, and 100% of it says you two are getting out!',
    stats: [
      { label: 'Blade Temp', value: '4200', unit: 'K' },
      { label: 'Beam Focus', value: '99.8', unit: '%' },
      { label: 'Array Align', value: '0.02', unit: 'mm' },
      { label: 'Safety Checks', value: '47', unit: '/47' },
    ],
    neuralLinks: [
      { label: 'Plasma Matrix', value: 98 },
      { label: 'Vent Cutting', value: 92 },
      { label: 'Laser Target', value: 88 },
      { label: 'Relay Lock', value: 79 },
    ],
    logs: [
      { time: 'T+00:05', text: 'Emergency checklist initiated. 47 items. No match.' },
      { time: 'T+00:55', text: 'Plasma array calibration complete. Beam locked.' },
      { time: 'T+01:40', text: 'Thermal vents laser-cut. Ventilation restored.' },
      { time: 'T+02:35', text: 'Baymax transponder confirmed! Verifying coordinates.' },
      { time: 'T+03:10', text: 'Plasma guidance beam active. Exit vector illuminated.' },
    ],
    vitals: { armor: 85, signal: 79, power: 95 },
  },
  {
    id: 'fred',
    name: 'Fred',
    subtitle: 'Kaiju Enthusiast',
    callsign: 'FREDZILLA-06',
    role: 'Auxiliary Power & Mascot Specialist',
    color: '#FB923C',
    freq: '2.4 GHz',
    band: 'ORANGE',
    location: 'San Fransokyo Lab — Generator',
    status: 'ACTIVE',
    statusOk: true,
    battery: null,
    signal: 52,
    encrypted: false,
    latency: '22ms',
    message:
      'DUDE!! Leaping back into the portal rift with the healthcare chip?! That is the single most legendary superhero maneuver ever! I am hand-cranking the backup diesel generator wearing the Fredzilla suit!',
    audioQuote:
      'Fredzilla power is at maximum! Bust through that cosmic wall!',
    stats: [
      { label: 'Diesel RPM', value: '3.6K', unit: 'RPM' },
      { label: 'Suit Output', value: '100', unit: '%' },
      { label: 'Flamethrower', value: 'READY', unit: '' },
      { label: 'Hype Level', value: 'MAX', unit: 'pts' },
    ],
    neuralLinks: [
      { label: 'Aux Generator', value: 82 },
      { label: 'Suit Thruster', value: 88 },
      { label: 'Power Surge', value: 94 },
      { label: 'Voice Audio', value: 52 },
    ],
    logs: [
      { time: 'T+00:00', text: 'Fredzilla suit systems armed. Generator standing by.' },
      { time: 'T+00:30', text: 'Backup diesel cranked. Aux power at 80% output.' },
      { time: 'T+01:15', text: 'Power surge absorbed by suit capacitors. Holding.' },
      { time: 'T+02:00', text: 'This is so cool. Focus. Generator at max.' },
      { time: 'T+03:00', text: 'Reading you loud and clear. Come home, Hiro!' },
    ],
    vitals: { armor: 95, signal: 52, power: 80 },
  },
]

/* ── STAT BLOCK (MATCHES BAYMAX HERO BANNER) ──────────────── */
function TelemetryStat({ label, value, unit, color = '#2DD4BF', delay = 0 }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 hover:scale-[1.04] hover:bg-white/[0.08] cursor-default group"
      style={{
        background: 'rgba(255, 255, 255, 0.04)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
      }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 + delay, duration: 0.3 }}
    >
      <span className="text-[8.5px] font-mono uppercase tracking-[0.16em] text-white/50 group-hover:text-white/80 text-center truncate w-full transition-colors">
        {label}
      </span>
      <div className="flex items-baseline gap-1 mt-0.5">
        <span
          className="font-oswald font-black text-lg sm:text-xl tabular-nums transition-transform duration-200 group-hover:scale-105"
          style={{ color, textShadow: `0 0 12px ${color}30` }}
        >
          {value}
        </span>
        {unit && <span className="text-[9px] font-mono text-white/40">{unit}</span>}
      </div>
    </motion.div>
  )
}

/* ── NEURAL LINK PROGRESS BAR ─────────────────────────────── */
function NeuralLinkBar({ label, percentage, color = '#2DD4BF', delay = 0 }) {
  return (
    <motion.div
      className="flex items-center gap-2.5 w-full p-1 rounded-md transition-colors hover:bg-white/[0.04] group cursor-default"
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 + delay, duration: 0.35 }}
    >
      <span className="text-[8.5px] font-mono uppercase tracking-wider text-white/50 group-hover:text-white/80 w-20 text-right flex-shrink-0 truncate transition-colors">
        {label}
      </span>
      <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden relative">
        <motion.div
          className="h-full rounded-full relative"
          style={{
            background: `linear-gradient(90deg, ${color}99, ${color})`,
            boxShadow: `0 0 8px ${color}60`,
          }}
          initial={{ width: '0%' }}
          animate={{ width: `${percentage}%` }}
          transition={{ delay: 0.25 + delay, duration: 0.8, ease: 'easeOut' }}
        />
      </div>
      <span className="text-[9px] font-mono w-8 text-right tabular-nums font-semibold" style={{ color }}>
        {percentage}%
      </span>
    </motion.div>
  )
}

/* ── CIRCLE GAUGE (TELEMETRY) ─────────────────────────────── */
function CircleGauge({ value, color, label, size = 74 }) {
  const r = (size - 8) / 2
  const circ = 2 * Math.PI * r
  const offset = circ - (value / 100) * circ
  return (
    <div className="flex flex-col items-center gap-1.5 group cursor-default">
      <div className="relative transition-transform duration-300 group-hover:scale-110" style={{ width: size, height: size }}>
        <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3.5" />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="3.5"
            strokeDasharray={circ}
            strokeDashoffset={circ}
            strokeLinecap="round"
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            style={{ filter: `drop-shadow(0 0 4px ${color}80)` }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-oswald font-black text-lg tabular-nums text-white group-hover:text-white transition-colors">
            {value}
          </span>
        </div>
      </div>
      <span className="font-mono text-[9px] uppercase tracking-widest text-white/50 group-hover:text-white/80 transition-colors">
        {label}
      </span>
    </div>
  )
}

/* ── INTERACTIVE QUANTUM PARTICLES BACKGROUND ──────────────── */
function QuantumParticles({ color = '#2DD4BF', mousePos }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationId

    let width = 0
    let height = 0

    const resize = () => {
      if (!canvas || !canvas.parentElement) return
      width = canvas.width = canvas.parentElement.clientWidth
      height = canvas.height = canvas.parentElement.clientHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particleCount = 38
    const particles = []
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * (width || 800),
        y: Math.random() * (height || 600),
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.6 + 0.8,
        alpha: Math.random() * 0.35 + 0.15,
      })
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // Update & Draw Particles
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        // Gentle reaction to cursor position
        if (mousePos && mousePos.x && mousePos.y) {
          const dx = mousePos.x - p.x
          const dy = mousePos.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 130 && dist > 0) {
            const force = (130 - dist) / 130
            p.x -= (dx / dist) * force * 1.1
            p.y -= (dy / dist) * force * 1.1
          }
        }

        ctx.fillStyle = color
        ctx.globalAlpha = p.alpha
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw Proximity Connections
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const p1 = particles[i]
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 85) {
            ctx.strokeStyle = color
            ctx.globalAlpha = (1 - dist / 85) * 0.14
            ctx.lineWidth = 0.8
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      }

      ctx.globalAlpha = 1
      animationId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [color, mousePos])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 w-full h-full"
    />
  )
}

/* ── QUANTUM WAVE VISUALIZER (HIGH-TECH OSCILLOSCOPE & FFT) ── */
function QuantumWaveVisualizer({
  color = '#2DD4BF',
  freq = '38.7 GHz',
  callsign = 'HEALTHCARE-01',
  isPlaying = false,
  signalBoost = false,
  onToggleBoost,
}) {
  const canvasRef = useRef(null)
  const [mode, setMode] = useState('waveform') // 'waveform' | 'spectrum' | 'dual'
  const [filterMode, setFilterMode] = useState('flat') // 'flat' | 'bass' | 'boost'
  const peaksRef = useRef(new Array(48).fill(0))
  const peakHoldRef = useRef(new Array(48).fill(0))

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationId
    let t = 0
    let scanX = 0

    const render = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      const width = rect.width
      const height = rect.height

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr
        canvas.height = height * dpr
      }

      ctx.save()
      ctx.scale(dpr, dpr)
      ctx.clearRect(0, 0, width, height)

      // Background gradient with CRT phosphor feel
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height)
      bgGrad.addColorStop(0, 'rgba(10, 18, 30, 0.78)')
      bgGrad.addColorStop(1, 'rgba(6, 12, 22, 0.90)')
      ctx.fillStyle = bgGrad
      ctx.fillRect(0, 0, width, height)

      // Oscilloscope Coordinate Grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)'
      ctx.lineWidth = 1
      ctx.setLineDash([])

      // Horizontal decibel reference lines
      const dbLines = [0.15, 0.32, 0.5, 0.68, 0.85]
      dbLines.forEach(pct => {
        const y = height * pct
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      })

      // Vertical frequency grid lines
      const vLines = [0.12, 0.28, 0.44, 0.6, 0.76, 0.92]
      vLines.forEach(pct => {
        const x = width * pct
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      })

      // Center Reference Line (0 dB carrier center)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)'
      ctx.setLineDash([4, 4])
      ctx.beginPath()
      ctx.moveTo(0, height * 0.5)
      ctx.lineTo(width, height * 0.5)
      ctx.stroke()
      ctx.setLineDash([])

      // Scanline & Time progression
      const speed = isPlaying ? 0.08 : 0.028
      t += speed
      scanX = (scanX + (isPlaying ? 3.2 : 1.6)) % width

      // Amplitude multipliers based on boost and audio status
      const boostScale = signalBoost ? 1.38 : 1.0

      // ── WAVEFORM MODE OR DUAL TOP ──
      if (mode === 'waveform' || mode === 'dual') {
        const waveH = mode === 'dual' ? height * 0.52 : height
        const cy = mode === 'dual' ? waveH * 0.5 : height * 0.5
        const amp = (waveH * 0.32) * (isPlaying ? 1.4 : 0.88) * boostScale

        // Wave gradient area fill
        const waveGrad = ctx.createLinearGradient(0, cy - amp, 0, cy + amp)
        waveGrad.addColorStop(0, color + (signalBoost ? '55' : '40'))
        waveGrad.addColorStop(0.5, color + (signalBoost ? '25' : '18'))
        waveGrad.addColorStop(1, 'rgba(0, 0, 0, 0)')

        const points = []
        const step = 2
        for (let x = 0; x <= width; x += step) {
          const nx = x / width
          const envelope = Math.sin(nx * Math.PI) // window tapering
          const fFreq1 = filterMode === 'bass' ? 0.015 : filterMode === 'boost' ? 0.035 : 0.022
          const w1 = Math.sin(x * fFreq1 + t) * amp * 0.62
          const w2 = Math.sin(x * 0.048 - t * 1.3) * amp * 0.28
          const w3 = Math.cos(x * 0.01 + t * 0.4) * amp * 0.14
          const voiceBoost = isPlaying
            ? Math.sin(x * 0.085 + t * 3.2) * (amp * 0.38) * Math.sin(t * 1.8)
            : 0
          const y = cy + (w1 + w2 + w3 + voiceBoost) * envelope
          points.push({ x, y })
        }

        // Fill area under curve
        ctx.beginPath()
        ctx.moveTo(0, cy)
        points.forEach(pt => ctx.lineTo(pt.x, pt.y))
        ctx.lineTo(width, cy)
        ctx.closePath()
        ctx.fillStyle = waveGrad
        ctx.fill()

        // Stroke Main Carrier Wave
        ctx.beginPath()
        points.forEach((pt, i) => {
          if (i === 0) ctx.moveTo(pt.x, pt.y)
          else ctx.lineTo(pt.x, pt.y)
        })
        ctx.shadowColor = color
        ctx.shadowBlur = (isPlaying || signalBoost) ? 18 : 8
        ctx.strokeStyle = color
        ctx.lineWidth = (isPlaying || signalBoost) ? 2.8 : 2.0
        ctx.stroke()
        ctx.shadowBlur = 0

        // Secondary Harmonic Phase Wave
        ctx.beginPath()
        ctx.setLineDash([3, 5])
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)'
        ctx.lineWidth = 1.2
        for (let x = 0; x <= width; x += 3) {
          const nx = x / width
          const env = Math.sin(nx * Math.PI)
          const y2 = cy + Math.sin(x * 0.036 - t * 1.6) * (amp * 0.52) * env
          if (x === 0) ctx.moveTo(x, y2)
          else ctx.lineTo(x, y2)
        }
        ctx.stroke()
        ctx.setLineDash([])

        // Glowing node points along the wave
        const nodeIdxs = [
          Math.floor(points.length * 0.25),
          Math.floor(points.length * 0.5),
          Math.floor(points.length * 0.75),
        ]
        nodeIdxs.forEach(idx => {
          const pt = points[idx]
          if (pt) {
            ctx.fillStyle = '#ffffff'
            ctx.shadowColor = color
            ctx.shadowBlur = 10
            ctx.beginPath()
            ctx.arc(pt.x, pt.y, 2.8, 0, Math.PI * 2)
            ctx.fill()
            ctx.strokeStyle = color
            ctx.lineWidth = 1.5
            ctx.beginPath()
            ctx.arc(pt.x, pt.y, 5.5 + Math.sin(t * 3) * 2, 0, Math.PI * 2)
            ctx.stroke()
            ctx.shadowBlur = 0
          }
        })
      }

      // ── SPECTRUM FFT MODE OR DUAL BOTTOM ──
      if (mode === 'spectrum' || mode === 'dual') {
        const barY0 = height
        const barHMax = (mode === 'dual' ? height * 0.42 : height * 0.78) * boostScale
        const barCount = 48
        const barWidth = (width - barCount * 2.5) / barCount

        for (let i = 0; i < barCount; i++) {
          const ni = i / barCount
          const curve = Math.sin(ni * Math.PI)
          const pulse = Math.sin(t * 2 + i * 0.3) * 0.2 + 0.8
          const voice = isPlaying ? Math.sin(t * 4 + i * 0.8) * 0.45 + 0.55 : 0.3
          const target = Math.max(8, (curve * 0.65 + voice * 0.35) * pulse * barHMax)

          peaksRef.current[i] = (peaksRef.current[i] || 0) * 0.78 + target * 0.22
          const h = peaksRef.current[i]

          if (h > (peakHoldRef.current[i] || 0)) {
            peakHoldRef.current[i] = h
          } else {
            peakHoldRef.current[i] = Math.max(0, (peakHoldRef.current[i] || 0) - (isPlaying ? 1.4 : 0.7))
          }

          const x = i * (barWidth + 2.5) + 2
          const y = barY0 - h

          const barGrad = ctx.createLinearGradient(0, y, 0, barY0)
          barGrad.addColorStop(0, color)
          barGrad.addColorStop(0.55, color + 'aa')
          barGrad.addColorStop(1, color + '22')
          ctx.fillStyle = barGrad
          ctx.fillRect(x, y, barWidth, h)

          // Peak cap indicator
          const capY = barY0 - (peakHoldRef.current[i] || 0)
          ctx.fillStyle = '#ffffff'
          ctx.fillRect(x, Math.max(0, capY - 2), barWidth, 1.5)
        }
      }

      // Phosphor Radar Scanline Beam
      const scanGrad = ctx.createLinearGradient(scanX - 30, 0, scanX, 0)
      scanGrad.addColorStop(0, 'rgba(0,0,0,0)')
      scanGrad.addColorStop(0.85, color + '15')
      scanGrad.addColorStop(1, color + '55')
      ctx.fillStyle = scanGrad
      ctx.fillRect(Math.max(0, scanX - 30), 0, 30, height)

      ctx.strokeStyle = color + 'aa'
      ctx.lineWidth = 1.2
      ctx.beginPath()
      ctx.moveTo(scanX, 0)
      ctx.lineTo(scanX, height)
      ctx.stroke()

      ctx.restore()
      animationId = requestAnimationFrame(render)
    }

    render()
    return () => cancelAnimationFrame(animationId)
  }, [mode, color, isPlaying, signalBoost, filterMode])

  return (
    <div
      className="rounded-xl p-4 sm:p-5 relative overflow-hidden transition-all duration-300"
      style={{
        background: 'rgba(255, 255, 255, 0.07)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '0 8px 32px 0 rgba(10, 20, 35, 0.22), inset 0 1px 1px 0 rgba(255, 255, 255, 0.12)',
      }}
    >
      {/* ── CARD HEADER / HUD CONTROLS ── */}
      <div className="flex flex-wrap items-center justify-between pb-3.5 mb-3 border-b border-white/10 gap-3">
        <div className="flex items-center gap-2.5">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{
              background: color,
              boxShadow: `0 0 10px ${color}`,
            }}
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-oswald font-bold text-sm uppercase tracking-wider text-white">
                Quantum Wave Spectrum Visualizer
              </h3>
              <span
                className="px-2 py-0.5 rounded text-[8px] font-mono uppercase tracking-widest"
                style={{
                  background: `${color}20`,
                  color,
                  border: `1px solid ${color}40`,
                }}
              >
                {isPlaying ? 'AUDIO ACTIVE' : signalBoost ? 'BOOSTED (+6dB)' : 'CARRIER SYNC'}
              </span>
            </div>
            <p className="font-mono text-[9px] text-white/40 uppercase tracking-widest mt-0.5">
              CARRIER FREQ: {freq} · AES-256 QUANTUM LOCK
            </p>
          </div>
        </div>

        {/* Interactive Filters & Mode Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Signal Boost Quick Button */}
          <button
            onClick={onToggleBoost}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[9px] font-mono uppercase tracking-wider cursor-pointer transition-all duration-150"
            style={{
              background: signalBoost ? `${color}35` : 'rgba(255, 255, 255, 0.06)',
              border: `1px solid ${signalBoost ? color : 'rgba(255, 255, 255, 0.15)'}`,
              color: signalBoost ? '#ffffff' : 'rgba(255, 255, 255, 0.65)',
              boxShadow: signalBoost ? `0 0 14px ${color}50` : 'none',
            }}
            title="Toggle Pre-Amp +6dB Signal Boost"
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${signalBoost ? 'animate-ping' : ''}`}
              style={{ background: signalBoost ? color : 'rgba(255, 255, 255, 0.4)' }}
            />
            <span>{signalBoost ? '+6dB BOOST ON' : 'PRE-AMP +6dB'}</span>
          </button>

          {/* Filter Preset Buttons */}
          <div className="flex items-center gap-0.5 bg-black/40 p-1 rounded-lg border border-white/10">
            {[
              { id: 'flat', label: 'FLAT' },
              { id: 'bass', label: 'BASS+' },
              { id: 'boost', label: 'HI-Q' },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFilterMode(f.id)}
                className="px-2 py-0.5 rounded text-[8.5px] font-mono uppercase tracking-wider transition-all duration-150 cursor-pointer"
                style={{
                  background: filterMode === f.id ? 'rgba(255, 255, 255, 0.18)' : 'transparent',
                  color: filterMode === f.id ? '#ffffff' : 'rgba(255, 255, 255, 0.45)',
                  fontWeight: filterMode === f.id ? '700' : '400',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/10">
            {[
              { id: 'waveform', label: 'Oscilloscope' },
              { id: 'spectrum', label: 'Spectrum FFT' },
              { id: 'dual', label: 'Dual Flux' },
            ].map(m => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className="px-2.5 py-1 rounded text-[9.5px] font-mono uppercase tracking-wider transition-all duration-150 cursor-pointer"
                style={{
                  background: mode === m.id ? color : 'transparent',
                  color: mode === m.id ? '#0a101d' : 'rgba(255, 255, 255, 0.6)',
                  fontWeight: mode === m.id ? '700' : '500',
                }}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── HIGH-TECH CANVAS VIEWPORT ── */}
      <div
        className="relative rounded-lg overflow-hidden border border-white/10"
        style={{
          boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.65)',
        }}
      >
        {/* Corner tech reticle decorations */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 pointer-events-none z-10" style={{ borderColor: color }} />
        <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 pointer-events-none z-10" style={{ borderColor: color }} />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 pointer-events-none z-10" style={{ borderColor: color }} />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 pointer-events-none z-10" style={{ borderColor: color }} />

        {/* dB scale labels on left */}
        <div className="absolute top-2 left-2.5 flex flex-col justify-between h-[82%] pointer-events-none z-10 font-mono text-[8px] text-white/30 select-none">
          <span style={{ color: signalBoost ? color : 'inherit' }}>+6dB</span>
          <span>0dB</span>
          <span>-6dB</span>
          <span>-18dB</span>
          <span>-36dB</span>
        </div>

        {/* Canvas Display */}
        <canvas
          ref={canvasRef}
          className="w-full h-40 sm:h-48 block"
        />
      </div>

      {/* ── FREQUENCY AXIS & TELEMETRY FOOTER ── */}
      <div className="flex flex-wrap items-center justify-between mt-2.5 font-mono text-[9px] text-white/40 gap-2">
        <div className="flex items-center gap-3 sm:gap-4">
          <span>10 Hz</span>
          <span>100 Hz</span>
          <span>1 kHz</span>
          <span>10 kHz</span>
          <span style={{ color }}>{freq} (CARRIER)</span>
          <span>100 GHz</span>
        </div>
        <div className="flex items-center gap-3 text-white/50">
          <span>PEAK: <strong className="text-white">{signalBoost ? '+1.8 dBFS' : '-1.2 dBFS'}</strong></span>
          <span>PHASE: <strong className="text-white">{signalBoost ? '+0.48π' : '+0.32π'}</strong></span>
          <span>FLUX: <strong style={{ color }}>{signalBoost ? '99.9%' : '99.4%'}</strong></span>
        </div>
      </div>
    </div>
  )
}


/* ── MAIN COMPONENT ───────────────────────────────────────── */
const CIPHERS = ['AES-256 QUANTUM', 'CHACHA20-POLY1305', 'NEURAL-RSA-4096', 'TACHYON DIRECT']

export default function CommsPage() {
  const [activeId, setActiveId] = useState('baymax')
  const [activeTab, setActiveTab] = useState('transmission')
  const [isPlaying, setIsPlaying] = useState(false)
  const [signalBoost, setSignalBoost] = useState(false)
  const [cipherIdx, setCipherIdx] = useState(0)
  const [copied, setCopied] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 300, y: 200 })

  const active = CHANNELS.find(c => c.id === activeId) || CHANNELS[0]
  const activeCfg = CHAR_CONFIG[active.id] || CHAR_CONFIG.baymax

  useEffect(() => {
    setActiveTab('transmission')
    setIsPlaying(false)
  }, [activeId])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const speak = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const u = new SpeechSynthesisUtterance(active.audioQuote)
      u.rate = 0.94
      u.pitch = active.id === 'baymax' ? 0.65 : active.id === 'fred' ? 1.15 : 1.0
      setIsPlaying(true)
      u.onend = () => setIsPlaying(false)
      u.onerror = () => setIsPlaying(false)
      window.speechSynthesis.speak(u)
    }
  }

  const copyTransmission = () => {
    const textToCopy = `[${active.callsign}] "${active.audioQuote}" (Carrier: ${active.freq}, Cipher: ${CIPHERS[cipherIdx]})`
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    })
  }

  const TABS = [
    { id: 'transmission', label: 'Transmission Log' },
    { id: 'telemetry', label: 'Neural Telemetry' },
    { id: 'timeline', label: 'Chronicle Trace' },
  ]

  return (
    <div
      onMouseMove={handleMouseMove}
      className="flex-1 flex flex-col h-full overflow-hidden select-none text-white relative"
      style={{
        background: 'linear-gradient(180deg, rgba(24, 38, 56, 0.72) 0%, rgba(36, 52, 74, 0.65) 50%, rgba(20, 34, 52, 0.76) 100%)',
        backdropFilter: 'blur(20px) saturate(140%)',
        WebkitBackdropFilter: 'blur(20px) saturate(140%)',
      }}
    >
      <style>{`
        @keyframes wv { from { transform: scaleY(0.25); } to { transform: scaleY(1); } }
        @keyframes radarSweep {
          0% { transform: translateY(-100%); opacity: 0; }
          15% { opacity: 0.3; }
          85% { opacity: 0.3; }
          100% { transform: translateY(850%); opacity: 0; }
        }
        .radar-scan-line {
          animation: radarSweep 11s linear infinite;
        }
      `}</style>

      {/* ── TOP ACCENT SCAN/GRADIENT LINE (MATCHES BAYMAX HERO BANNER) ── */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] z-20 pointer-events-none"
        style={{ background: `linear-gradient(90deg, transparent, ${active.color}, transparent)` }}
        key={active.id}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />

      {/* ── BACKGROUND LAYER 1: TACTICAL DOT MATRIX GRID ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-25"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* ── BACKGROUND LAYER 2: INTERACTIVE QUANTUM PARTICLES CANVAS ── */}
      <QuantumParticles color={active.color} mousePos={mousePos} />

      {/* ── BACKGROUND LAYER 3: SWEEPING SURVEILLANCE RADAR WAVE ── */}
      <div
        className="absolute left-0 right-0 h-32 pointer-events-none z-0 radar-scan-line"
        style={{
          background: `linear-gradient(180deg, transparent 0%, ${active.color}10 60%, ${active.color}35 98%, ${active.color}80 100%)`,
        }}
      />

      {/* ── BACKGROUND LAYER 4: INTERACTIVE MOUSE-FOLLOWING SPOTLIGHT AURA ── */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(circle 520px at ${mousePos.x}px ${mousePos.y}px, ${active.color}15, transparent 80%)`,
        }}
      />

      {/* ── BACKGROUND LAYER 5: AMBIENT STATIC RADIAL GLOW ── */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700 z-0"
        style={{
          background: `radial-gradient(ellipse 65% 55% at 65% 35%, ${active.color}12 0%, transparent 75%)`,
        }}
      />

      {/* ── TACTICAL WATERMARK COORDINATES ── */}
      <div className="absolute top-14 right-6 pointer-events-none z-0 hidden lg:flex flex-col items-end font-mono text-[8px] text-white/20 select-none tracking-widest uppercase">
        <span>GRID: SF-SECTOR-04 // LAT 37.7749° N</span>
        <span>RADAR: CONTINUOUS SWEEP // FLUX 99.8%</span>
      </div>

      {/* ── TOP HEADER BAR (CLEAN, FROSTED, INTERACTIVE CONTROLS) ── */}
      <div
        className="flex-shrink-0 px-5 sm:px-7 py-3 flex items-center justify-between relative z-10"
        style={{
          background: 'rgba(255, 255, 255, 0.06)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        }}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/40 bg-red-500/15 shadow-[0_0_12px_rgba(239,68,68,0.2)]">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping absolute" />
            <span className="w-2 h-2 rounded-full bg-red-500 relative shadow-[0_0_8px_#ef4444]" />
            <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-red-400 font-bold ml-1">
              LIVE RELAY
            </span>
          </div>
          <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-white/50 hidden sm:inline">
            SAN FRANSOKYO COMMS HUB — CARRIER FREQ
          </span>
        </div>

        {/* Interactive Controls in Header */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Pre-Amp Boost Header Toggle */}
          <button
            onClick={() => setSignalBoost(prev => !prev)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-mono uppercase tracking-widest cursor-pointer transition-all duration-150"
            style={{
              background: signalBoost ? `${active.color}30` : 'rgba(255, 255, 255, 0.06)',
              border: `1px solid ${signalBoost ? active.color : 'rgba(255, 255, 255, 0.15)'}`,
              color: signalBoost ? '#ffffff' : 'rgba(255, 255, 255, 0.65)',
              boxShadow: signalBoost ? `0 0 12px ${active.color}50` : 'none',
            }}
            title="Toggle Pre-Amp +6dB Signal Boost"
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${signalBoost ? 'animate-ping' : ''}`}
              style={{ background: signalBoost ? active.color : 'rgba(255, 255, 255, 0.4)' }}
            />
            <span>{signalBoost ? '+6dB BOOST' : 'GAIN +6dB'}</span>
          </button>

          {/* Cipher Cycler Selector */}
          <button
            onClick={() => setCipherIdx(prev => (prev + 1) % CIPHERS.length)}
            className="px-3 py-1 rounded-full text-[9px] font-mono uppercase tracking-widest flex items-center gap-1.5 cursor-pointer transition-all duration-150 hover:bg-white/10"
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              color: 'rgba(255, 255, 255, 0.8)',
            }}
            title="Click to cycle quantum encryption cipher"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="hidden md:inline">CIPHER:</span>
            <span>{CIPHERS[cipherIdx]}</span>
            <span className="text-[8px] text-white/40">▾</span>
          </button>

          {/* Active Transponders Badge */}
          <div
            className="px-3 py-1 rounded-full text-[9px] font-mono uppercase tracking-widest flex items-center gap-1.5"
            style={{
              background: `${active.color}18`,
              color: active.color,
              border: `1px solid ${active.color}35`,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: active.color }} />
            <span>6 Transponders</span>
          </div>
        </div>
      </div>

      {/* ── SCROLLABLE WORKSPACE ── */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-4 sm:p-6 lg:p-7 space-y-5 relative z-10">

        {/* ── HERO SHOWCASE ROW (ABOUT BAYMAX LAYOUT) ── */}
        <div
          className="rounded-2xl p-5 sm:p-6 lg:p-7 relative overflow-hidden transition-all duration-300"
          style={{
            background: 'rgba(255, 255, 255, 0.07)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.16)',
            boxShadow: '0 8px 32px 0 rgba(10, 20, 35, 0.22), inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)',
          }}
        >
          {/* Subtle character accent glow in corner */}
          <div
            className="absolute -top-16 -right-16 w-64 h-64 rounded-full pointer-events-none blur-3xl opacity-25"
            style={{ background: active.color }}
          />

          <motion.div
            key={active.id}
            initial={{ opacity: 0.35, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8"
          >

            {/* ── LEFT: CHARACTER PORTRAIT WITH INTERACTIVE HOVER EFFECTS ── */}
            <motion.div
              key={active.id + '-avatar'}
              onClick={speak}
              title={`Click to play ${active.name}'s voice log`}
              className="relative flex-shrink-0 cursor-pointer group select-none"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.035, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            >
              {/* Outer Glow Halo (Expands and intensifies on hover) */}
              <div
                className="absolute -inset-3 sm:-inset-4 rounded-2xl pointer-events-none transition-all duration-300 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle, ${active.color}45 0%, transparent 70%)`,
                }}
              />

              {/* Portrait Box Frame */}
              <div
                className="relative w-36 sm:w-44 lg:w-48 h-36 sm:h-44 lg:h-48 rounded-xl overflow-hidden transition-all duration-300 shadow-xl"
                style={{
                  border: `2px solid ${active.color}90`,
                  background: 'rgba(18, 30, 48, 0.88)',
                  boxShadow: `0 0 25px ${active.color}25, inset 0 0 30px rgba(0,0,0,0.45)`,
                }}
              >
                {/* Corner Tech Reticles */}
                <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t-2 border-l-2 pointer-events-none z-10 transition-colors duration-200" style={{ borderColor: active.color }} />
                <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t-2 border-r-2 pointer-events-none z-10 transition-colors duration-200" style={{ borderColor: active.color }} />
                <div className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b-2 border-l-2 pointer-events-none z-10 transition-colors duration-200" style={{ borderColor: active.color }} />
                <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b-2 border-r-2 pointer-events-none z-10 transition-colors duration-200" style={{ borderColor: active.color }} />

                {/* Character Image with Smooth Zoom and Brightness on Hover */}
                <div
                  className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-110 group-hover:brightness-110"
                  style={{
                    backgroundImage: `url(${activeCfg.img})`,
                    backgroundSize: activeCfg.bgSize,
                    backgroundPosition: activeCfg.bgPosition,
                    backgroundRepeat: 'no-repeat',
                  }}
                />

                {/* Holographic Light Sheen on Hover */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                  style={{
                    background: `linear-gradient(120deg, transparent 30%, ${active.color}30 50%, transparent 70%)`,
                  }}
                />

                {/* Bottom gradient mask on portrait */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(18,30,48,0.9) 100%)' }}
                />
              </div>

              {/* Badge Below Portrait (Lifts and glows on hover) */}
              <div
                className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full border text-[8.5px] font-mono font-bold uppercase tracking-[0.2em] whitespace-nowrap shadow-md backdrop-blur-md transition-all duration-300 group-hover:scale-105"
                style={{
                  background: `${active.color}25`,
                  borderColor: `${active.color}80`,
                  color: active.color,
                  boxShadow: `0 0 12px ${active.color}40`,
                }}
              >
                {active.status} · {active.freq}
              </div>
            </motion.div>

            {/* ── CENTER: ACTIVE HERO DETAILS & QUOTE ── */}
            <motion.div
              key={active.id + '-info'}
              className="flex-1 min-w-0 text-center lg:text-left"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm mb-2.5">
                <span
                  className="w-1.5 h-1.5 rounded-full animate-ping absolute"
                  style={{ background: active.color }}
                />
                <span className="w-1.5 h-1.5 rounded-full relative" style={{ background: active.color }} />
                <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-white/80 font-semibold">
                  {active.role} &nbsp;·&nbsp; {active.location}
                </span>
              </div>

              {/* Character Title */}
              <h1 className="font-oswald font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight leading-none text-white mb-2">
                {active.name}{' '}
                <span className="text-xl sm:text-2xl font-mono font-normal tracking-wider opacity-60">
                  [{active.callsign}]
                </span>
              </h1>

              {/* Transmission Quote */}
              <p
                className="text-white/85 text-xs sm:text-sm font-sans font-medium tracking-wide max-w-2xl leading-relaxed italic mt-3 mb-4"
                style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}
              >
                "{active.message}"
              </p>

              {/* Audio Play Trigger & Quick Info */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mt-4">
                <motion.button
                  onClick={speak}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-5 py-2.5 rounded-xl font-oswald font-bold text-xs uppercase tracking-wider text-slate-900 flex items-center gap-2.5 shadow-lg cursor-pointer transition-all"
                  style={{
                    background: active.color,
                    boxShadow: `0 0 20px ${active.color}45`,
                  }}
                >
                  {isPlaying ? (
                    <span className="w-3.5 h-3.5 rounded-full bg-slate-900 animate-pulse" />
                  ) : (
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                  <span>{isPlaying ? 'Playing Audio Log...' : 'Play Voice Log'}</span>
                </motion.button>

                {/* Frequency & Latency Indicators */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 font-mono text-[9.5px] text-white/60">
                  <span>LATENCY: <strong className="text-white">{active.latency}</strong></span>
                  <span className="text-white/20">|</span>
                  <span>BAND: <strong style={{ color: active.color }}>{active.band}</strong></span>
                  <span className="text-white/20">|</span>
                  <span>CARRIER: <strong className="text-white">{active.freq}</strong></span>
                </div>
              </div>
            </motion.div>

            {/* ── RIGHT: TELEMETRY STATS PANEL (ABOUT BAYMAX STATS) ── */}
            <motion.div
              key={active.id + '-telemetry'}
              className="w-full lg:w-64 flex-shrink-0 space-y-3"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
            >
              {/* Telemetry Stats Grid */}
              <div
                className="rounded-xl p-3.5"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                }}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: active.color }} />
                    <span className="text-[8.5px] font-mono uppercase tracking-[0.2em] text-white/50">
                      TELEMETRY METRICS
                    </span>
                  </div>
                  <span className="text-[8px] font-mono text-white/30 uppercase">LIVE FEED</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {active.stats.map((st, i) => (
                    <TelemetryStat
                      key={i}
                      label={st.label}
                      value={st.value}
                      unit={st.unit}
                      color={active.color}
                      delay={i * 0.05}
                    />
                  ))}
                </div>
              </div>

              {/* Neural Link Bars */}
              <div
                className="rounded-xl p-3.5 space-y-2"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                }}
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-sm bg-emerald-400" />
                  <span className="text-[8.5px] font-mono uppercase tracking-[0.2em] text-white/50">
                    SUBSYSTEM INTEGRITY
                  </span>
                </div>
                {active.neuralLinks.map((nl, i) => (
                  <NeuralLinkBar
                    key={i}
                    label={nl.label}
                    percentage={nl.value}
                    color={active.color}
                    delay={i * 0.06}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ── TABS NAVIGATION ROW ── */}
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-2">
            {TABS.map(tab => {
              const sel = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="px-4 py-1.5 rounded-lg font-cond font-bold text-xs uppercase tracking-wider cursor-pointer transition-all duration-200 relative"
                  style={{
                    color: sel ? '#ffffff' : 'rgba(255,255,255,0.5)',
                    background: sel ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                    border: `1px solid ${sel ? 'rgba(255, 255, 255, 0.2)' : 'transparent'}`,
                  }}
                >
                  {tab.label}
                  {sel && (
                    <motion.div
                      layoutId="comms-tab-pill"
                      className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full"
                      style={{ background: active.color }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          <div className="hidden sm:flex items-center gap-3 font-mono text-[9px] text-white/40">
            <span>UPTIME: 04:27:38</span>
            <span>MEM: 91.4%</span>
          </div>
        </div>

        {/* ── TAB CONTENT PANELS ── */}
        <AnimatePresence mode="wait">

          {/* 1. TRANSMISSION TAB */}
          {activeTab === 'transmission' && (
            <motion.div
              key="tab-transmission"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {/* Quantum Wave Spectrum Visualizer */}
              <QuantumWaveVisualizer
                color={active.color}
                freq={active.freq}
                callsign={active.callsign}
                isPlaying={isPlaying}
                signalBoost={signalBoost}
                onToggleBoost={() => setSignalBoost(prev => !prev)}
              />

              {/* Decrypted Voice Log Detail Card */}
              <div
                className="rounded-xl p-5"
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-white/60">
                      AUDIO LOG TRANSCRIPTION & PROTOCOL
                    </span>
                  </div>

                  {/* Interactive Copy Transcript Button */}
                  <button
                    onClick={copyTransmission}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-[9px] font-mono uppercase tracking-wider cursor-pointer transition-all duration-150"
                    style={{
                      background: copied ? 'rgba(52, 211, 153, 0.2)' : 'rgba(255, 255, 255, 0.06)',
                      border: `1px solid ${copied ? '#34D399' : 'rgba(255, 255, 255, 0.15)'}`,
                      color: copied ? '#34D399' : 'rgba(255, 255, 255, 0.75)',
                      boxShadow: copied ? '0 0 10px rgba(52, 211, 153, 0.3)' : 'none',
                    }}
                    title="Copy transmission log to clipboard"
                  >
                    {copied ? (
                      <>
                        <span>✓</span>
                        <span>COPIED TO BUFFER</span>
                      </>
                    ) : (
                      <>
                        <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                        <span>COPY TRANSCRIPT</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-4 rounded-lg bg-black/20 border border-white/5 font-mono text-xs sm:text-[13px] text-white/80 leading-relaxed">
                  <p className="text-white/40 text-[10px] mb-1 uppercase tracking-wider flex items-center justify-between">
                    <span>VOICE TRANSCRIPT [{active.callsign}]:</span>
                    <span className="text-[9px] text-white/30">CIPHER: {CIPHERS[cipherIdx]}</span>
                  </p>
                  "{active.audioQuote}"
                </div>
              </div>
            </motion.div>
          )}

          {/* 2. TELEMETRY TAB */}
          {activeTab === 'telemetry' && (
            <motion.div
              key="tab-telemetry"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {/* Circular Gauges */}
              <div
                className="rounded-xl p-5"
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                }}
              >
                <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-white/50 mb-5">
                  CORE GAUGES & SHIELD MATRIX
                </p>
                <div className="flex flex-wrap items-center justify-around gap-6">
                  <CircleGauge
                    value={active.vitals.armor}
                    color={active.vitals.armor > 60 ? active.color : '#FBBF24'}
                    label="Armor"
                    size={76}
                  />
                  <CircleGauge
                    value={active.vitals.signal}
                    color={active.color}
                    label="Signal Sync"
                    size={76}
                  />
                  <CircleGauge
                    value={active.vitals.power}
                    color={active.vitals.power > 40 ? '#34D399' : '#E5383B'}
                    label="Core Power"
                    size={76}
                  />
                  {active.battery !== null && (
                    <CircleGauge
                      value={active.battery}
                      color={active.battery > 40 ? '#34D399' : '#FBBF24'}
                      label="Battery Cell"
                      size={76}
                    />
                  )}
                </div>
              </div>

              {/* Data Specs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div
                  className="rounded-xl p-4 transition-all duration-200 hover:bg-white/[0.08]"
                  style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
                >
                  <p className="font-mono text-[9px] uppercase tracking-wider text-white/40 mb-1">CALLSIGN / PROTOCOL</p>
                  <p className="font-mono text-sm font-bold text-white">{active.callsign}</p>
                  <p className="font-mono text-[9.5px] text-white/50 mt-1">Band: {active.band}</p>
                </div>
                <div
                  onClick={() => setCipherIdx(prev => (prev + 1) % CIPHERS.length)}
                  className="rounded-xl p-4 cursor-pointer transition-all duration-200 hover:bg-white/[0.08] group"
                  style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
                  title="Click to cycle cipher"
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-mono text-[9px] uppercase tracking-wider text-white/40">ENCRYPTION CIPHER</p>
                    <span className="text-[8px] font-mono text-emerald-400 opacity-60 group-hover:opacity-100">CLICK TO CYCLE ▾</span>
                  </div>
                  <p className="font-mono text-sm font-bold text-emerald-400">
                    {CIPHERS[cipherIdx]}
                  </p>
                  <p className="font-mono text-[9.5px] text-white/50 mt-1">Status: High Security Verified</p>
                </div>
                <div
                  className="rounded-xl p-4 transition-all duration-200 hover:bg-white/[0.08]"
                  style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
                >
                  <p className="font-mono text-[9px] uppercase tracking-wider text-white/40 mb-1">LOCATION SECTOR</p>
                  <p className="font-mono text-sm font-bold text-white truncate">{active.location}</p>
                  <p className="font-mono text-[9.5px] text-white/50 mt-1">Grid Coordinates Locked</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* 3. TIMELINE TAB */}
          {activeTab === 'timeline' && (
            <motion.div
              key="tab-timeline"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="rounded-xl p-5 space-y-4"
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-white/50">
                  MISSION EVENT LOG & TIMESTAMP TRACE
                </span>
                <span className="font-mono text-[9px] text-white/30">{active.logs.length} ENTRIES</span>
              </div>

              <div className="space-y-3">
                {active.logs.map((log, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-lg"
                    style={{ background: 'rgba(255, 255, 255, 0.03)' }}
                  >
                    <span
                      className="px-2 py-0.5 rounded text-[9px] font-mono font-bold tracking-wider flex-shrink-0"
                      style={{
                        background: `${active.color}20`,
                        color: active.color,
                        border: `1px solid ${active.color}40`,
                      }}
                    >
                      {log.time}
                    </span>
                    <p className="font-mono text-xs text-white/75 leading-relaxed">{log.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* ── TEAM TRANSPONDERS DOCK (BOTTOM SELECTOR) ── */}
        <div
          className="rounded-xl p-4 sm:p-5"
          style={{
            background: 'rgba(255, 255, 255, 0.07)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.14)',
          }}
        >
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d62027]" />
              <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-white/60">
                TEAM TRANSPONDER CHANNELS (SELECT ACTIVE SQUAD MEMBER)
              </span>
            </div>
            <span className="font-mono text-[9px] text-white/40">ALL UNITS LINKED</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 relative">
            {CHANNELS.map(ch => {
              const sel = activeId === ch.id
              const cfg = CHAR_CONFIG[ch.id] || CHAR_CONFIG.baymax
              return (
                <button
                  key={ch.id}
                  onClick={() => setActiveId(ch.id)}
                  className={`relative rounded-xl p-3 flex flex-col items-center gap-2 cursor-pointer transition-all duration-150 select-none ${sel ? 'text-white' : 'text-white/70 hover:text-white hover:bg-white/[0.06]'
                    }`}
                  style={{
                    background: sel ? 'transparent' : 'rgba(255, 255, 255, 0.03)',
                    border: `1px solid ${sel ? 'transparent' : 'rgba(255, 255, 255, 0.08)'}`,
                  }}
                >
                  {/* Sliding Active Card Glow (Hardware-accelerated Spring) */}
                  {sel && (
                    <motion.div
                      layoutId="active-transponder-glow"
                      className="absolute inset-0 rounded-xl pointer-events-none z-0"
                      style={{
                        background: `linear-gradient(180deg, ${ch.color}22 0%, ${ch.color}08 100%)`,
                        border: `1.5px solid ${ch.color}`,
                        boxShadow: `0 0 22px ${ch.color}40, inset 0 0 14px ${ch.color}15`,
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 480,
                        damping: 32,
                        mass: 0.7,
                      }}
                    />
                  )}

                  {/* Sliding Active Top Neon Rail */}
                  {sel && (
                    <motion.div
                      layoutId="active-transponder-rail"
                      className="absolute top-0 left-2.5 right-2.5 h-[2.5px] rounded-full z-20 pointer-events-none"
                      style={{
                        background: ch.color,
                        boxShadow: `0 0 10px ${ch.color}, 0 0 4px #ffffff`,
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 480,
                        damping: 32,
                        mass: 0.7,
                      }}
                    />
                  )}

                  {/* Avatar Mini Icon */}
                  <div
                    className="w-12 h-12 rounded-lg overflow-hidden relative flex-shrink-0 transition-transform duration-200 z-10"
                    style={{
                      background: 'rgba(18, 30, 48, 0.9)',
                      border: `1.5px solid ${sel ? ch.color : 'rgba(255, 255, 255, 0.15)'}`,
                      boxShadow: sel ? `0 0 14px ${ch.color}45` : 'none',
                      transform: sel ? 'scale(1.05)' : 'scale(1)',
                    }}
                  >
                    <div
                      className="w-full h-full"
                      style={{
                        backgroundImage: `url(${cfg.img})`,
                        backgroundSize: cfg.bgSize,
                        backgroundPosition: cfg.bgPosition,
                        backgroundRepeat: 'no-repeat',
                      }}
                    />
                  </div>

                  {/* Character Name & Signal Pill */}
                  <div className="text-center w-full z-10">
                    <p
                      className="font-mono text-[11px] font-bold truncate leading-tight transition-colors duration-150"
                      style={{
                        color: sel ? '#ffffff' : 'rgba(255, 255, 255, 0.75)',
                        textShadow: sel ? `0 0 10px ${ch.color}55` : 'none',
                      }}
                    >
                      {ch.name}
                    </p>
                    <div className="flex items-center justify-center gap-1.5 mt-1">
                      {sel ? (
                        <div className="flex items-center gap-[2px] h-2.5">
                          <span className="w-0.5 h-full rounded-full animate-pulse" style={{ background: ch.color }} />
                          <span className="w-0.5 h-2/3 rounded-full animate-pulse" style={{ background: ch.color, animationDelay: '150ms' }} />
                          <span className="w-0.5 h-full rounded-full animate-pulse" style={{ background: ch.color, animationDelay: '300ms' }} />
                          <span className="w-0.5 h-1/2 rounded-full animate-pulse" style={{ background: ch.color, animationDelay: '450ms' }} />
                        </div>
                      ) : (
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: ch.statusOk ? '#34D399' : '#FBBF24' }}
                        />
                      )}
                      <span
                        className="font-mono text-[8.5px] uppercase tracking-wider font-semibold transition-colors duration-150"
                        style={{ color: sel ? ch.color : 'rgba(255, 255, 255, 0.4)' }}
                      >
                        {ch.freq}
                      </span>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}

import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ── SOUND SYNTHESIZER (WEB AUDIO API) ─────────────────────── */
function playSciFiChime(type = 'chime', freq = 520) {
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
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.15)
      gain.gain.setValueAtTime(0.08, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45)
      osc.start(now)
      osc.stop(now + 0.45)
    } else if (type === 'scan') {
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(320, now)
      osc.frequency.linearRampToValueAtTime(880, now + 0.25)
      gain.gain.setValueAtTime(0.06, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3)
      osc.start(now)
      osc.stop(now + 0.3)
    } else if (type === 'pulse') {
      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(140, now)
      osc.frequency.exponentialRampToValueAtTime(70, now + 0.2)
      gain.gain.setValueAtTime(0.09, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35)
      osc.start(now)
      osc.stop(now + 0.35)
    }
  } catch {
    // AudioContext blocked or not supported
  }
}

/* ── CODEX ANOMALY DATABASE (STORYLINE-DRIVEN) ─────────────── */
const CODEX_DATA = [
  {
    id: 'inverted-gravity',
    code: 'ANOMALY-01',
    name: 'Inverted Gravity Cascades',
    category: 'spatial',
    categoryLabel: 'Spatial Distortion',
    zone: 'Sector 02 · Inverted Canyon',
    danger: 'HIGH',
    dangerColor: '#FBBF24',
    dangerBorder: 'border-amber-400/40 bg-amber-400/10 text-amber-300',
    frequency: '142.4 MHz',
    stability: 42,
    gravitonShear: 84,
    temporalEntropy: 38,
    baymaxSynergy: 94,
    escapeFeasibility: 76,
    coordinates: { x: '-128.4', y: '+64.2', z: '810.5' },
    summary:
      'Spacetime does not follow standard planetary curvature. Megaliths and shattered debris float upside down, accelerating toward localized phantom mass centers.',
    hiroNotes:
      'We have to test each floating rock with a thrown bolt before stepping onto it. Baymax’s weight makes him susceptible to sudden trajectory shifts, but his soft body acts like a giant airbag when we miss a ledge. I tethered my suit clamp directly to his back armor plate.',
    baymaxCare:
      'Patient Hiro Hamada displays elevated cortisol and a heart rate of 132 BPM. Inverted orientation causes sudden blood redistribution to the cranial cavity. Deployed thermal boots and maintain contact with my vinyl hull to prevent orthostatic shock.',
    tactics: [
      { text: 'Baymax anchors using heavy magnetic boots on metallic strata', tested: true },
      { text: 'Hiro relies on kevlar tether cables anchored to Baymax chest armature', tested: true },
      { text: 'Never jump across open fissures during localized flare-up pulses', tested: false },
      { text: 'Deploy microbot cluster rungs to bridge gaps between opposing gravity planes', tested: true },
    ],
    kreiTechArchive:
      'Scavenged Test Pod 04 Flight Recorder: Early Krei automated drones experienced complete compass inversion at 400m altitude within the rift. Inertial dampeners fried within 12 seconds.',
    stats: [
      { label: 'Graviton Flux', value: '-2.4', unit: 'G' },
      { label: 'Air Density', value: '0.41', unit: 'atm' },
      { label: 'Shear Vector', value: '18.4', unit: 'rad/s' },
      { label: 'Tether Load', value: '340', unit: 'kg' },
    ],
  },
  {
    id: 'glitch-storms',
    code: 'ANOMALY-02',
    name: 'Spacetime Glitch Storms',
    category: 'glitch',
    categoryLabel: 'Quantum Glitch',
    zone: 'Sector 04 · Glitch Bridge',
    danger: 'CRITICAL',
    dangerColor: '#EF4444',
    dangerBorder: 'border-red-400/40 bg-red-400/10 text-red-300',
    frequency: '318.9 GHz',
    stability: 18,
    gravitonShear: 96,
    temporalEntropy: 88,
    baymaxSynergy: 91,
    escapeFeasibility: 62,
    coordinates: { x: '+42.1', y: '-91.7', z: '1044.2' },
    summary:
      'Quantum shearing creates periodic visual tears in the environment. Solid rock turns intangible for seconds at a time, revealing shimmering ultraviolet dimensional static.',
    hiroNotes:
      'The glitches occur in a periodic rhythm: every 14.8 seconds, a shearing wave ripples across the bridge. If you step onto a platform during the cycle, you fall through into the void. Baymax counts down milliseconds on his HUD so we sprint across in the 4-second null window.',
    baymaxCare:
      'Exposure to high-frequency quantum shearing causes ocular disorientation and vertigo. I am generating an electromagnetic dampening shield with my left forearm to create a 2.5-meter safe radius around Hiro.',
    tactics: [
      { text: 'Calculate wave intervals (14.8s baseline) before traversing', tested: true },
      { text: 'Baymax deploys armor electromagnetic damper to deflect phase shearing', tested: true },
      { text: 'Sprint exclusively during the 4.2-second harmonic null phase', tested: false },
      { text: 'Anchor back-up grappling dart into hardened non-phasing granite pillars', tested: false },
    ],
    kreiTechArchive:
      'Test Probe Gamma-7: Disintegrated after 3 minutes of exposure to localized dimensional tear. Organic matter subjected to field exhibits rapid molecular phase separation.',
    stats: [
      { label: 'Cycle Period', value: '14.8', unit: 's' },
      { label: 'Null Window', value: '4.2', unit: 's' },
      { label: 'Phase Jitter', value: '98.2', unit: '%' },
      { label: 'Shield Drain', value: '-12', unit: 'W/s' },
    ],
  },
  {
    id: 'dormant-microbots',
    code: 'ANOMALY-03',
    name: 'Callaghan Microbot Residue',
    category: 'tech',
    categoryLabel: 'Tech Scavenge',
    zone: 'Sector 03 · Drift Field',
    danger: 'MODERATE',
    dangerColor: '#2DD4BF',
    dangerBorder: 'border-teal-400/40 bg-teal-400/10 text-teal-300',
    frequency: '88.5 MHz',
    stability: 78,
    gravitonShear: 32,
    temporalEntropy: 24,
    baymaxSynergy: 98,
    escapeFeasibility: 89,
    coordinates: { x: '-04.3', y: '+18.9', z: '620.1' },
    summary:
      'Millions of inactive microbots from the Callaghan confrontation were sucked into the portal vortex. They drift in loose swarms without a master transmitter headband signal.',
    hiroNotes:
      'I can rewire several clusters! Using the transmitter antenna from my helmet, we can command small swarms of microbots to form emergency climbing rungs, bridges, and magnetic anchor clamps. Callaghan used them to destroy; Baymax and I will use them to escape.',
    baymaxCare:
      'Dormant microbot edges are sharp and pose a puncture hazard to my external vinyl balloon. Hiro has applied carbon-fiber patches to my exposed seams. Puncture risk reduced by 84%.',
    tactics: [
      { text: 'Reprogram swarm frequencies using Hiro’s gauntlet transmitter antenna', tested: true },
      { text: 'Form dynamic climbing scaffolds and landing nets across chasms', tested: true },
      { text: 'Maintain safe distance from high-energy rifts that cause rogue inductive surges', tested: true },
      { text: 'Cluster microbots around Baymax thrusters to act as an exhaust nozzle extension', tested: false },
    ],
    kreiTechArchive:
      'Krei Materials Division: Microbot alloy exhibits super-conducting properties inside the rift vacuum. Retains 99.4% magnetic cohesion without external heat buildup.',
    stats: [
      { label: 'Swarm Mass', value: '1.2M', unit: 'Units' },
      { label: 'Gauntlet Sync', value: '98', unit: '%' },
      { label: 'Conductance', value: '450', unit: 'S/m' },
      { label: 'Scaffold Span', value: '28', unit: 'm' },
    ],
  },
  {
    id: 'prototype-graveyard',
    code: 'ANOMALY-04',
    name: 'Silent Sparrow Prototype Graveyard',
    category: 'tech',
    categoryLabel: 'Tech Scavenge',
    zone: 'Sector 01 · Derelict Drift',
    danger: 'MODERATE',
    dangerColor: '#06B6D4',
    dangerBorder: 'border-cyan-400/40 bg-cyan-400/10 text-cyan-300',
    frequency: '54.2 GHz',
    stability: 64,
    gravitonShear: 45,
    temporalEntropy: 31,
    baymaxSynergy: 95,
    escapeFeasibility: 82,
    coordinates: { x: '-88.1', y: '+02.4', z: '490.8' },
    summary:
      'The debris field of Krei Tech’s earlier, classified portal experiments from the past decade. Derelict capsules, titanium struts, and fusion cells float trapped in suspended inertia.',
    hiroNotes:
      'This is where Abigail’s earlier test pods ended up. We found Test Pod Alpha-03 with an undamaged lithium-hydride capacitor. Baymax’s power cells were down to 14%—hooking him up to this pod just bought us 48 more hours of life support and thruster propellant.',
    baymaxCare:
      'Recharging from external Krei Tech capacitor complete. System diagnostics indicate power level restored to 88%. My primary objective remains unchanged: ensure Hiro Hamada returns to Aunt Cass safely.',
    tactics: [
      { text: 'Cannibalize pod life-support oxygen scrubbers for Hiro’s helmet', tested: true },
      { text: 'Extract intact thruster hydrazine fuel to top off Baymax rocket cells', tested: true },
      { text: 'Use pod hull titanium plating as heat shielding against chrono-flare-ups', tested: true },
      { text: 'Salvage emergency locator beacon to triangulate San Fransokyo frequency', tested: false },
    ],
    kreiTechArchive:
      'Classified Project Silent Sparrow Dossier: Test Pilot Abigail Callaghan entered dimensional transit at 14:02. Capsule lost telemetry after gate emitter destabilized.',
    stats: [
      { label: 'Pods Detected', value: '07', unit: 'Hulls' },
      { label: 'Power Harvest', value: '88', unit: '%' },
      { label: 'O2 Scavenged', value: '42', unit: 'hrs' },
      { label: 'Thruster Fuel', value: '+35', unit: 'L' },
    ],
  },
  {
    id: 'chrono-dilation',
    code: 'ANOMALY-05',
    name: 'Chrono-Dilation Vortex Basin',
    category: 'chrono',
    categoryLabel: 'Chrono Rift',
    zone: 'Sector 05 · Temporal Basin',
    danger: 'HIGH',
    dangerColor: '#C084FC',
    dangerBorder: 'border-purple-400/40 bg-purple-400/10 text-purple-300',
    frequency: '612.0 THz',
    stability: 33,
    gravitonShear: 78,
    temporalEntropy: 92,
    baymaxSynergy: 89,
    escapeFeasibility: 68,
    coordinates: { x: '+112.5', y: '-44.8', z: '1280.0' },
    summary:
      'A dense swirling basin where time flows non-linearly. Minutes spent near the event core translate to hours or days in the external world of San Fransokyo.',
    hiroNotes:
      'Time doesn’t tick at the same rate here. A minute inside this basin could be an hour for Go Go, Wasabi, Honey Lemon, and Fred out in the lab. We can’t afford to get trapped in this slipstream, or the portal outside will collapse before we ever reach it.',
    baymaxCare:
      'Patient’s biological perception of elapsed time is compromised. I have calibrated my internal atomic clock to maintain a synchronized countdown against San Fransokyo time-dilation markers.',
    tactics: [
      { text: 'Plot trajectory strictly around the outer perimeter of the basin', tested: true },
      { text: 'Use rocket fist short-burns to avoid gravitational slipstream pull', tested: true },
      { text: 'Monitor atomic clock differential against San Fransokyo carrier beacon', tested: false },
      { text: 'Deploy counter-phase EMP burst if caught in retrograde temporal eddies', tested: false },
    ],
    kreiTechArchive:
      'Krei Theoretical Physics Memo: Quantum foam entanglements inside the singularity create extreme local Minkowski metric distortion. Do not linger near the vortex core.',
    stats: [
      { label: 'Dilation Ratio', value: '1:14.2', unit: 'Earth' },
      { label: 'Chronon Drift', value: '+2.8', unit: 'ms/s' },
      { label: 'Event Radius', value: '640', unit: 'm' },
      { label: 'Escape Velocity', value: '82', unit: 'm/s' },
    ],
  },
  {
    id: 'exit-singularity',
    code: 'ANOMALY-06',
    name: 'The Closing Gate Singularity',
    category: 'singularity',
    categoryLabel: 'Portal Exit',
    zone: 'Sector 06 · The Horizon',
    danger: 'TIME SENSITIVE',
    dangerColor: '#A855F7',
    dangerBorder: 'border-fuchsia-400/40 bg-fuchsia-400/10 text-fuchsia-300',
    frequency: '432.18 GHz',
    stability: 12,
    gravitonShear: 98,
    temporalEntropy: 95,
    baymaxSynergy: 99,
    escapeFeasibility: 74,
    coordinates: { x: '+00.0', y: '+00.0', z: '1580.0' },
    summary:
      'The original portal frame built by Krei Tech is destabilizing. The event horizon shrinks exponentially with every passing minute. When it reaches zero, the doorway seals permanently.',
    hiroNotes:
      'The exit portal is shrinking. We can see faint flashes of the San Fransokyo skyline through the event horizon—I can even see the neon reflection of the emitter rings! Baymax has enough propellant for one maximum-output burn. We are locking my magnetic suit clamp directly to his back armor. We go together, or not at all.',
    baymaxCare:
      'Terminal thrust required: 100% capacity. Rocket fist deployment synchronized with Hiro’s manual navigation override. Mutual survival probability: 94.6%. I will not let Hiro fall.',
    tactics: [
      { text: 'Synchronize rocket fist ignition with external emitter pulse crest', tested: true },
      { text: 'Dual magnetic grapple lock between Hiro’s gauntlet and Baymax torso', tested: true },
      { text: 'Overclock Baymax secondary thruster coils for 4.5G emergency acceleration', tested: false },
      { text: 'Punch straight through the event horizon without course correction', tested: false },
    ],
    kreiTechArchive:
      'Emergency Emitter Protocol: San Fransokyo magnetic rings cannot hold structural aperture below 3.5m radius without catastrophic feedback. Gate collapse imminent.',
    stats: [
      { label: 'Aperture Radius', value: '4.2', unit: 'm' },
      { label: 'Decay Rate', value: '-0.38', unit: 'm/hr' },
      { label: 'Burn Duration', value: '3.8', unit: 's' },
      { label: 'Thrust Force', value: '4.8', unit: 'kN' },
    ],
  },
]

/* ── CIRCULAR TELEMETRY GAUGE ──────────────────────────────── */
function CircleGauge({ value, color = '#2DD4BF', label, size = 68, unit = '' }) {
  const r = (size - 8) / 2
  const circ = 2 * Math.PI * r
  const offset = circ - (Math.min(100, Math.max(0, value)) / 100) * circ

  return (
    <div className="flex flex-col items-center gap-1 group cursor-default">
      <div className="relative transition-transform duration-300 group-hover:scale-105" style={{ width: size, height: size }}>
        <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeDasharray={circ}
            strokeDashoffset={circ}
            strokeLinecap="round"
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ filter: `drop-shadow(0 0 5px ${color}80)` }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-oswald font-black text-sm tabular-nums text-white">
            {value}
            {unit && <span className="text-[9px] font-normal text-white/60 ml-0.5">{unit}</span>}
          </span>
        </div>
      </div>
      <span className="font-mono text-[8.5px] uppercase tracking-widest text-white/50 group-hover:text-white/80 transition-colors text-center">
        {label}
      </span>
    </div>
  )
}

/* ── DYNAMIC GRAVITATIONAL & PARTICLE BACKGROUND CANVAS ────── */
function AnomalyFieldParticles({ color = '#A855F7' }) {
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

    const count = 44
    const particles = []
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * (width || 800),
        y: Math.random() * (height || 600),
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.8 + 0.6,
        alpha: Math.random() * 0.35 + 0.1,
      })
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // Soft gravitational vignette
      const grad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.4,
        50,
        width * 0.5,
        height * 0.4,
        Math.max(width, height) * 0.7
      )
      grad.addColorStop(0, `${color}08`)
      grad.addColorStop(1, 'transparent')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, width, height)

      // Render floating quantum motes
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        ctx.fillStyle = color
        ctx.globalAlpha = p.alpha
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.globalAlpha = 1.0

      animationId = requestAnimationFrame(render)
    }

    render()
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [color])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 w-full h-full"
    />
  )
}

/* ── SPACETIME CURVATURE & ANOMALY SPECTROGRAM ─────────────── */
function AnomalySpectrogram({
  color = '#A855F7',
  code = 'ANOMALY-01',
  isScanning = false,
  boostMode = false,
  onToggleBoost,
}) {
  const canvasRef = useRef(null)
  const [visMode, setVisMode] = useState('curvature') // 'curvature' | 'spectrum' | 'dual'

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

      // CRT Phosphor Background
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height)
      bgGrad.addColorStop(0, 'rgba(8, 14, 24, 0.88)')
      bgGrad.addColorStop(1, 'rgba(5, 10, 18, 0.95)')
      ctx.fillStyle = bgGrad
      ctx.fillRect(0, 0, width, height)

      // Coordinate Grid Lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)'
      ctx.lineWidth = 1
      for (let yPct of [0.2, 0.4, 0.6, 0.8]) {
        ctx.beginPath()
        ctx.moveTo(0, height * yPct)
        ctx.lineTo(width, height * yPct)
        ctx.stroke()
      }
      for (let xPct of [0.15, 0.35, 0.55, 0.75, 0.95]) {
        ctx.beginPath()
        ctx.moveTo(width * xPct, 0)
        ctx.lineTo(width * xPct, height)
        ctx.stroke()
      }

      // Neutral Event Axis
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)'
      ctx.setLineDash([4, 4])
      ctx.beginPath()
      ctx.moveTo(0, height * 0.5)
      ctx.lineTo(width, height * 0.5)
      ctx.stroke()
      ctx.setLineDash([])

      const speed = isScanning ? 0.09 : 0.03
      t += speed
      scanX = (scanX + (isScanning ? 3.5 : 1.8)) % width
      const scale = boostMode ? 1.4 : 1.0

      // Mode: Gravitational Curvature Wave
      if (visMode === 'curvature' || visMode === 'dual') {
        const waveH = visMode === 'dual' ? height * 0.5 : height
        const cy = visMode === 'dual' ? waveH * 0.5 : height * 0.5
        const amp = waveH * 0.32 * scale * (isScanning ? 1.4 : 0.9)

        ctx.beginPath()
        ctx.moveTo(0, cy)
        const pts = []
        for (let x = 0; x <= width; x += 2) {
          const nx = x / width
          const envelope = Math.sin(nx * Math.PI)
          const w1 = Math.sin(x * 0.024 + t) * amp * 0.65
          const w2 = Math.sin(x * 0.052 - t * 1.4) * amp * 0.28
          const w3 = Math.cos(x * 0.012 + t * 0.5) * amp * 0.2
          const y = cy + (w1 + w2 + w3) * envelope
          pts.push({ x, y })
          ctx.lineTo(x, y)
        }

        ctx.strokeStyle = color
        ctx.lineWidth = 2
        ctx.shadowColor = color
        ctx.shadowBlur = 8
        ctx.stroke()
        ctx.shadowBlur = 0

        // Highlight Resonance Nodes
        const nodes = [Math.floor(pts.length * 0.25), Math.floor(pts.length * 0.5), Math.floor(pts.length * 0.75)]
        nodes.forEach(idx => {
          const pt = pts[idx]
          if (pt) {
            ctx.fillStyle = '#ffffff'
            ctx.beginPath()
            ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2)
            ctx.fill()
            ctx.strokeStyle = color
            ctx.beginPath()
            ctx.arc(pt.x, pt.y, 5 + Math.sin(t * 3) * 2, 0, Math.PI * 2)
            ctx.stroke()
          }
        })
      }

      // Mode: Spectrum FFT Bars
      if (visMode === 'spectrum' || visMode === 'dual') {
        const barY0 = height
        const barHMax = (visMode === 'dual' ? height * 0.44 : height * 0.75) * scale
        const barCount = 42
        const barWidth = (width - barCount * 2) / barCount

        for (let i = 0; i < barCount; i++) {
          const ni = i / barCount
          const curve = Math.sin(ni * Math.PI)
          const pulse = Math.sin(t * 2.5 + i * 0.35) * 0.25 + 0.75
          const scanMod = isScanning ? Math.sin(t * 5 + i * 0.9) * 0.35 + 0.65 : 0.4
          const h = Math.max(6, (curve * 0.6 + scanMod * 0.4) * pulse * barHMax)

          const x = i * (barWidth + 2) + 2
          const y = barY0 - h

          const grad = ctx.createLinearGradient(0, y, 0, barY0)
          grad.addColorStop(0, color)
          grad.addColorStop(0.6, color + 'aa')
          grad.addColorStop(1, color + '22')
          ctx.fillStyle = grad
          ctx.fillRect(x, y, barWidth, h)

          // Peak cap line
          ctx.fillStyle = '#ffffff'
          ctx.fillRect(x, Math.max(0, y - 2), barWidth, 1.5)
        }
      }

      // Phosphor Scan Beam
      const scanGrad = ctx.createLinearGradient(scanX - 25, 0, scanX, 0)
      scanGrad.addColorStop(0, 'rgba(0,0,0,0)')
      scanGrad.addColorStop(0.8, color + '15')
      scanGrad.addColorStop(1, color + '55')
      ctx.fillStyle = scanGrad
      ctx.fillRect(Math.max(0, scanX - 25), 0, 25, height)

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
  }, [color, isScanning, boostMode, visMode])

  return (
    <div
      className="rounded-2xl p-4 sm:p-5 relative overflow-hidden transition-all duration-300 shadow-[0_12px_40px_rgba(15,23,42,0.18)]"
      style={{
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.08) 100%)',
        backdropFilter: 'blur(24px) saturate(160%)',
        border: '1px solid rgba(255, 255, 255, 0.25)',
      }}
    >
      {/* Visualizer Header */}
      <div className="flex flex-wrap items-center justify-between pb-3 mb-3 border-b border-white/10 gap-2">
        <div className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{
              background: color,
              boxShadow: `0 0 10px ${color}`,
            }}
          />
          <span className="font-oswald text-xs uppercase tracking-wider text-white">
            Spacetime Distortion Waveform
          </span>
          <span className="text-[10px] font-mono text-white/40">[{code}]</span>
        </div>

        {/* View Mode Controls */}
        <div className="flex items-center gap-1 bg-black/15 p-1 rounded-xl border border-white/15 backdrop-blur-md">
          {[
            { id: 'curvature', label: 'Curvature' },
            { id: 'spectrum', label: 'FFT Bars' },
            { id: 'dual', label: 'Dual HUD' },
          ].map(m => (
            <button
              key={m.id}
              onClick={() => {
                setVisMode(m.id)
                playSciFiChime('chime', 640)
              }}
              className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                visMode === m.id
                  ? 'bg-[#d62027] text-white font-bold shadow-[0_2px_12px_rgba(214,32,39,0.4)]'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {m.label}
            </button>
          ))}
          <button
            onClick={() => {
              onToggleBoost?.()
              playSciFiChime('pulse', 300)
            }}
            className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
              boostMode
                ? 'bg-[#d62027] text-white border border-red-400/50 shadow-sm'
                : 'text-white/60 hover:text-white'
            }`}
          >
            {boostMode ? 'Boost: +4dB' : 'Boost Off'}
          </button>
        </div>
      </div>

      {/* Canvas Viewport */}
      <div className="relative h-40 sm:h-48 w-full rounded-xl overflow-hidden border border-white/20 shadow-inner" style={{ background: 'linear-gradient(180deg, rgba(30, 48, 68, 0.75) 0%, rgba(20, 36, 54, 0.85) 100%)', backdropFilter: 'blur(12px)' }}>
        <canvas ref={canvasRef} className="w-full h-full block" />
        <div className="absolute bottom-2.5 left-3 flex items-center gap-2 text-[9.5px] font-mono text-white/90 bg-white/15 backdrop-blur-md px-3 py-1 rounded-md border border-white/25">
          <span>SAMPLING: 96.0 kS/s</span>
          <span>•</span>
          <span style={{ color }}>{isScanning ? 'LIVE SCANNER RUNNING' : 'TELEMETRY NOMINAL'}</span>
        </div>
      </div>
    </div>
  )
}

/* ── MAIN COMPONENT: DIMENSION CODEX ───────────────────────── */
export default function DimensionCodex() {
  const [selectedId, setSelectedId] = useState('inverted-gravity')
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [threatFilter, setThreatFilter] = useState('all')
  const [activeTab, setActiveTab] = useState('hiro-log')
  const [boostMode, setBoostMode] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [testedTactics, setTestedTactics] = useState({})
  const [copied, setCopied] = useState(false)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [signalPinged, setSignalPinged] = useState(false)

  // Current Selected Anomaly
  const active = useMemo(
    () => CODEX_DATA.find(e => e.id === selectedId) || CODEX_DATA[0],
    [selectedId]
  )

  // Filtered List
  const filteredList = useMemo(() => {
    return CODEX_DATA.filter(entry => {
      const matchSearch =
        entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.zone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.summary.toLowerCase().includes(searchQuery.toLowerCase())

      const matchCategory =
        categoryFilter === 'all' || entry.category === categoryFilter

      const matchThreat =
        threatFilter === 'all' || entry.danger === threatFilter

      return matchSearch && matchCategory && matchThreat
    })
  }, [searchQuery, categoryFilter, threatFilter])

  // Toggle Tactic Checkbox
  const toggleTactic = index => {
    playSciFiChime('chime', 720)
    setTestedTactics(prev => ({
      ...prev,
      [`${active.id}-${index}`]: !prev[`${active.id}-${index}`],
    }))
  }

  // Calculate Readiness for Active Anomaly
  const testedCount = active.tactics.reduce((acc, _, idx) => {
    const isChecked =
      testedTactics[`${active.id}-${idx}`] !== undefined
        ? testedTactics[`${active.id}-${idx}`]
        : active.tactics[idx].tested
    return isChecked ? acc + 1 : acc
  }, 0)
  const readinessPercent = Math.round((testedCount / active.tactics.length) * 100)

  // Trigger Scanner Sequence
  const triggerScan = () => {
    if (isScanning) return
    setIsScanning(true)
    playSciFiChime('scan', 400)
    setTimeout(() => {
      setIsScanning(false)
      playSciFiChime('chime', 880)
    }, 2800)
  }

  // Trigger Audio Log Playback Simulation
  const togglePlayAudio = () => {
    if (isPlayingAudio) {
      setIsPlayingAudio(false)
    } else {
      setIsPlayingAudio(true)
      playSciFiChime('chime', 550)
      setTimeout(() => {
        setIsPlayingAudio(false)
      }, 5500)
    }
  }

  // Copy Transcription
  const copyTranscription = () => {
    const textToCopy = `[${active.code}] ${active.name}\nZONE: ${active.zone}\nHIRO HAMADA LOG: "${active.hiroNotes}"\nBAYMAX PROTOCOL: "${active.baymaxCare}"`
    navigator.clipboard.writeText(textToCopy)
    playSciFiChime('chime', 780)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Transmit Signal to San Fransokyo
  const transmitSignal = () => {
    setSignalPinged(true)
    playSciFiChime('pulse', 440)
    setTimeout(() => setSignalPinged(false), 3000)
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden relative select-none text-white">
      {/* Background Particle Graviton Field */}
      <AnomalyFieldParticles color={active.dangerColor} />

      {/* ── TOP CODEX HEADER STRIP ───────────────────────────── */}
      <div
        className="flex flex-wrap items-center justify-between px-5 sm:px-6 py-3 border-b border-white/20 z-20 flex-shrink-0 gap-3"
        style={{
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.08) 100%)',
          backdropFilter: 'blur(20px) saturate(160%)',
          boxShadow: '0 4px 20px rgba(15, 23, 42, 0.1)',
        }}
      >
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full animate-ping absolute bg-[#d62027]" />
            <span className="w-2.5 h-2.5 rounded-full relative bg-[#d62027] shadow-[0_0_12px_#d62027]" />
          </div>
          <div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#f87171] block">
              BH6 Quantum Field Research // Void Archive
            </span>
            <h2 className="font-oswald text-lg sm:text-xl font-bold uppercase tracking-tight text-white flex items-center gap-2">
              <span>Dimension Codex & Survival Dossier</span>
              <span className="text-[10px] font-mono font-normal px-2 py-0.5 rounded bg-white/10 text-white/70">
                v4.8 RECON
              </span>
            </h2>
          </div>
        </div>

        {/* Quick Header Telemetry Status Indicators */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs font-mono">
          <div
            className="px-2.5 py-1 rounded-full text-[9px] font-mono uppercase tracking-wider flex items-center gap-1.5"
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
            }}
          >
            <span className="text-white/40">CHIP:</span>
            <span className="text-emerald-400 font-bold">TADASHI 2.0 ONLINE</span>
          </div>

          <button
            onClick={triggerScan}
            disabled={isScanning}
            className={`px-4 py-1.5 rounded-full text-[9.5px] font-mono font-bold uppercase tracking-widest flex items-center gap-1.5 cursor-pointer transition-all shadow-md ${
              isScanning
                ? 'bg-white/25 text-white border border-white/40'
                : 'bg-[#d62027] hover:bg-[#ef4444] text-white border border-red-400/50 shadow-[0_4px_16px_rgba(214,32,39,0.4)]'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isScanning ? 'bg-purple-300 animate-ping' : 'bg-white/60'}`} />
            <span>{isScanning ? 'SCANNING VOID...' : 'RUN GRAVITON SCAN'}</span>
          </button>

          <div
            className="hidden lg:flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-mono uppercase tracking-wider"
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              color: '#ffffff',
            }}
          >
            <span>HIRO + BAYMAX SYNERGY:</span>
            <span className="font-bold">98.4%</span>
          </div>
        </div>
      </div>

      {/* ── SCROLLABLE WORKSPACE ─────────────────────────────── */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-3 sm:p-5 lg:p-6 space-y-4 relative z-10">

        {/* ── HERO SHOWCASE ROW ────────────────────────────────── */}
        <div
          className="rounded-2xl p-5 sm:p-6 relative overflow-hidden transition-all duration-300 shadow-[0_12px_40px_rgba(15,23,42,0.18)]"
          style={{
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.08) 100%)',
            backdropFilter: 'blur(24px) saturate(160%)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
          }}
        >
          {/* Subtle Anomaly Ambient Glow */}
          <div
            className="absolute -top-16 -right-16 w-72 h-72 rounded-full pointer-events-none blur-3xl opacity-25"
            style={{ background: active.dangerColor }}
          />

          <motion.div
            key={active.id}
            initial={{ opacity: 0.3, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col lg:flex-row items-center gap-6"
          >
            {/* Holographic Anomaly Seal / Avatar */}
            <div className="relative flex-shrink-0 cursor-pointer group select-none">
              <div
                className="absolute -inset-3 rounded-2xl pointer-events-none transition-all duration-300 group-hover:scale-105 opacity-60"
                style={{
                  background: `radial-gradient(circle, ${active.dangerColor}40 0%, transparent 70%)`,
                }}
              />
              <div
                className="relative w-32 sm:w-40 lg:w-44 h-32 sm:h-40 lg:h-44 rounded-xl overflow-hidden flex flex-col items-center justify-center p-3 text-center border shadow-xl"
                style={{
                  borderColor: 'rgba(255, 255, 255, 0.35)',
                  background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.10) 100%)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: `0 8px 32px rgba(15, 23, 42, 0.15), 0 0 20px ${active.dangerColor}25`,
                }}
              >
                <div
                  className="w-12 h-12 rounded-full border border-dashed flex items-center justify-center mb-2 animate-spin-slow"
                  style={{ borderColor: active.dangerColor }}
                >
                  <span className="font-oswald text-xs font-bold" style={{ color: active.dangerColor }}>
                    {active.code.split('-')[1]}
                  </span>
                </div>
                <span className="font-oswald text-sm font-bold uppercase tracking-wider text-white">
                  {active.code}
                </span>
                <span className="font-mono text-[9px] text-white/50 tracking-widest mt-0.5">
                  {active.frequency}
                </span>
                <span
                  className="mt-2 px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase tracking-wider border"
                  style={{
                    borderColor: active.dangerColor,
                    color: active.dangerColor,
                    background: `${active.dangerColor}15`,
                  }}
                >
                  {active.danger}
                </span>
              </div>
            </div>

            {/* Middle: Phenomenon Overview & Summary */}
            <div className="flex-1 min-w-0 text-center lg:text-left space-y-2">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded bg-white/10 text-white/70">
                  {active.categoryLabel}
                </span>
                <span className="text-white/30">•</span>
                <span className="font-mono text-[10.5px] text-[#f87171] font-semibold">
                  {active.zone}
                </span>
              </div>

              <h1 className="font-oswald text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white">
                {active.name}
              </h1>

              <p className="font-cond text-sm sm:text-base text-white/80 leading-relaxed max-w-2xl">
                {active.summary}
              </p>

              {/* Quick Coordinates & Status Ticker */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1 text-[10px] font-mono text-white/50">
                <span>COORDS: [{active.coordinates.x}, {active.coordinates.y}, {active.coordinates.z}]</span>
                <span>•</span>
                <span>STABILITY INDEX: {active.stability}%</span>
                <span>•</span>
                <span className="text-emerald-400">READINESS: {readinessPercent}%</span>
              </div>
            </div>

            {/* Right: Key Telemetry Circular Gauges */}
            <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0 pt-2 lg:pt-0">
              <CircleGauge
                value={active.gravitonShear}
                color="#EF4444"
                label="Graviton Shear"
                size={66}
              />
              <CircleGauge
                value={active.temporalEntropy}
                color="#C084FC"
                label="Chrono Drift"
                size={66}
              />
              <CircleGauge
                value={active.baymaxSynergy}
                color="#2DD4BF"
                label="Baymax Shield"
                size={66}
              />
              <CircleGauge
                value={active.escapeFeasibility}
                color={active.dangerColor}
                label="Escape Prob."
                size={66}
              />
            </div>
          </motion.div>
        </div>

        {/* ── FILTER & SEARCH BAR ──────────────────────────────── */}
        <div
          className="rounded-xl p-3 sm:p-3.5 flex flex-wrap items-center justify-between gap-3 border border-white/20 shadow-sm"
          style={{
            background: 'rgba(255, 255, 255, 0.14)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Search Box (High-Contrast Dark Terminal Style) */}
          <div className="relative flex-1 min-w-[220px] max-w-sm flex items-center">
            <div className="absolute left-3.5 pointer-events-none text-white/40 flex items-center">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search anomalies, sectors, coordinates..."
              className="w-full bg-black/75 border border-white/20 rounded-xl pl-9 pr-8 py-2 text-xs font-mono text-white placeholder-white/40 focus:outline-none focus:border-[#d62027] focus:ring-1 focus:ring-[#d62027]/50 transition-all shadow-[inset_0_2px_6px_rgba(0,0,0,0.65)] backdrop-blur-md"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-xs text-white/50 hover:text-white transition-colors cursor-pointer"
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl border border-white/20 bg-black/15 backdrop-blur-md">
            {[
              { id: 'all', label: 'All Phenomena' },
              { id: 'spatial', label: 'Spatial' },
              { id: 'glitch', label: 'Glitch' },
              { id: 'tech', label: 'Tech Debris' },
              { id: 'chrono', label: 'Chrono' },
              { id: 'singularity', label: 'Singularity' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  setCategoryFilter(cat.id)
                  playSciFiChime('chime', 600)
                }}
                className={`px-2.5 py-1 rounded-lg text-[9.5px] font-mono uppercase tracking-wider cursor-pointer transition-all ${
                  categoryFilter === cat.id
                    ? 'bg-[#d62027] text-white font-bold border border-red-400/50 shadow-[0_2px_12px_rgba(214,32,39,0.4)]'
                    : 'bg-white/10 text-white/70 hover:text-white border border-white/15'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Threat Filter Dropdown / Pills */}
          <div className="flex items-center gap-1 text-[9px] font-mono text-white/50">
            <span>THREAT:</span>
            {['all', 'CRITICAL', 'HIGH', 'MODERATE', 'TIME SENSITIVE'].map(lvl => (
              <button
                key={lvl}
                onClick={() => {
                  setThreatFilter(lvl)
                  playSciFiChime('chime', 500)
                }}
                className={`px-2 py-0.5 rounded text-[8.5px] font-mono uppercase cursor-pointer transition-all ${
                  threatFilter === lvl
                    ? 'bg-[#d62027] text-white font-bold border border-red-400/50 shadow-sm'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* ── DUAL COLUMN GRID: SELECTOR (LEFT) + DOSSIER (RIGHT) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

          {/* LEFT: PHENOMENA LIST (4 COLS) */}
          <div className="lg:col-span-4 flex flex-col gap-2.5">
            <div className="flex items-center justify-between px-1">
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-white/50">
                LOGGED ANOMALIES ({filteredList.length})
              </span>
              <span className="text-[9px] font-mono text-white/40">
                CLICK TO LOAD DOSSIER
              </span>
            </div>

            <div className="space-y-2 max-h-[560px] overflow-y-auto no-scrollbar pr-0.5">
              {filteredList.map(item => {
                const isSelected = item.id === active.id
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedId(item.id)
                      playSciFiChime('chime', 680)
                    }}
                    className={`w-full p-3.5 rounded-xl text-left border transition-all duration-200 cursor-pointer flex flex-col gap-1.5 relative overflow-hidden backdrop-blur-md ${
                      isSelected
                        ? 'border-white/35 shadow-[0_8px_24px_rgba(15,23,42,0.18)] scale-101'
                        : 'bg-white/10 border-white/20 hover:border-white/30 hover:bg-white/15'
                    }`}
                    style={{
                      background: isSelected
                        ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0.14) 100%)'
                        : undefined,
                    }}
                  >
                    {/* Selected Left Indicator Strip */}
                    {isSelected && (
                      <div
                        className="absolute left-0 top-0 bottom-0 w-1.5"
                        style={{ background: '#d62027' }}
                      />
                    )}

                    <div className="flex items-center justify-between">
                      <span className="font-oswald text-xs tracking-wider" style={{ color: item.dangerColor }}>
                        {item.code}
                      </span>
                      <span
                        className="text-[8px] font-mono font-bold uppercase px-1.5 py-0.5 rounded border"
                        style={{
                          borderColor: `${item.dangerColor}60`,
                          color: item.dangerColor,
                          background: `${item.dangerColor}15`,
                        }}
                      >
                        {item.danger}
                      </span>
                    </div>

                    <h4 className="font-oswald font-bold text-sm text-white tracking-wide leading-snug">
                      {item.name}
                    </h4>

                    <div className="flex items-center justify-between text-[9px] font-mono text-white/40">
                      <span>{item.zone}</span>
                      <span className="text-white/60 font-bold">{item.stability}% STABLE</span>
                    </div>
                  </button>
                )
              })}

              {filteredList.length === 0 && (
                <div className="p-6 rounded-xl border border-white/10 bg-black/30 text-center space-y-1">
                  <span className="font-mono text-xs text-white/50 block">No anomalies match criteria</span>
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setCategoryFilter('all')
                      setThreatFilter('all')
                    }}
                    className="text-xs font-mono text-purple-300 underline cursor-pointer"
                  >
                    Reset filters
                  </button>
                </div>
              )}
            </div>

            {/* Scavenged Krei Tech Radio Relic Widget */}
            <div
              className="p-4 rounded-xl border border-white/20 bg-white/12 backdrop-blur-md space-y-2 mt-1 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase font-bold tracking-widest text-[#f87171]">
                  Trans-Dimensional Carrier Ping
                </span>
                <span className="text-[8.5px] font-mono text-white/40">432.18 GHz</span>
              </div>
              <p className="font-cond text-xs text-white/70 italic">
                "San Fransokyo lab capacitors holding at 68%. Team emitter coils still active on other side."
              </p>
              <button
                onClick={transmitSignal}
                className={`w-full py-2 rounded-xl text-[9.5px] font-mono uppercase font-bold tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm ${
                  signalPinged
                    ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-400'
                    : 'bg-white/15 text-white hover:bg-white/25 border border-white/25'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${signalPinged ? 'bg-teal-400 animate-ping' : 'bg-white/40'}`} />
                <span>{signalPinged ? 'PING RECEIVED IN SAN FRANSOKYO!' : 'TEST TRANSMISSION PING'}</span>
              </button>
            </div>
          </div>

          {/* RIGHT: DETAILED ANALYSIS & SPECTROGRAM (8 COLS) */}
          <div className="lg:col-span-8 flex flex-col gap-4">

            {/* Interactive Spacetime Visualizer */}
            <AnomalySpectrogram
              color={active.dangerColor}
              code={active.code}
              isScanning={isScanning}
              boostMode={boostMode}
              onToggleBoost={() => setBoostMode(v => !v)}
            />

            {/* Dossier Tabs Container */}
            <div
              className="rounded-2xl p-5 sm:p-6 flex-1 flex flex-col justify-between border border-white/25 shadow-[0_12px_40px_rgba(15,23,42,0.18)]"
              style={{
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.08) 100%)',
                backdropFilter: 'blur(24px) saturate(160%)',
              }}
            >
              {/* Tab Navigation Header */}
              <div className="flex flex-wrap items-center justify-between pb-3 border-b border-white/10 gap-2">
                <div className="flex flex-wrap items-center gap-1.5">
                  {[
                    { id: 'hiro-log', label: 'Hiro’s Field Log' },
                    { id: 'baymax-care', label: 'Baymax Care Protocol' },
                    { id: 'tactics', label: 'Survival Drills' },
                    { id: 'krei-specs', label: 'Krei Tech Salvage' },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id)
                        playSciFiChime('chime', 700)
                      }}
                      className={`px-3 py-1.5 rounded-lg text-[9.5px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                        activeTab === tab.id
                          ? 'bg-[#d62027] text-white font-bold shadow-[0_2px_12px_rgba(214,32,39,0.4)]'
                          : 'text-white/70 hover:text-white bg-transparent'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Copy / Play Actions */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={togglePlayAudio}
                    className={`px-3 py-1.5 rounded-lg text-[9.5px] font-mono uppercase font-bold tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-sm ${
                      isPlayingAudio
                        ? 'bg-[#d62027] text-white border border-red-400'
                        : 'bg-white/15 text-white hover:bg-white/25 border border-white/25'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isPlayingAudio ? 'bg-red-400 animate-ping' : 'bg-white/40'}`} />
                    <span>{isPlayingAudio ? 'PLAYING AUDIO...' : 'PLAY AUDIO MEMO'}</span>
                  </button>

                  <button
                    onClick={copyTranscription}
                    className="px-3 py-1.5 rounded-lg text-[9.5px] font-mono uppercase font-bold tracking-wider bg-white/15 text-white hover:bg-white/25 border border-white/25 transition-all cursor-pointer shadow-sm"
                  >
                    {copied ? '✓ COPIED' : 'COPY LOG'}
                  </button>
                </div>
              </div>

              {/* Tab Content Display Area */}
              <div className="py-4 flex-1">
                <AnimatePresence mode="wait">
                  {/* TAB 1: HIRO'S GAUNTLET LOG */}
                  {activeTab === 'hiro-log' && (
                    <motion.div
                      key="tab-hiro-log"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="space-y-3.5"
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono text-white/50">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                          <span className="font-bold text-red-400 uppercase tracking-wider">
                            Hiro Hamada — Gauntlet Audio Capture #087
                          </span>
                        </div>
                        <span>TIMESTAMP: T+03:42:19 VOID ELAPSED</span>
                      </div>

                      <div className="p-4 rounded-xl bg-white/12 border border-white/20 backdrop-blur-md space-y-2 shadow-sm">
                        <p className="font-cond text-sm sm:text-base text-white leading-relaxed italic border-l-2 border-[#d62027] pl-3">
                          "{active.hiroNotes}"
                        </p>
                        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[9px] font-mono text-white/40">
                          <span>AUDIO RECORDED VIA SUIT HELMET MIC</span>
                          <span>ENCRYPTION: TADASHI-DIRECT-V2</span>
                        </div>
                      </div>

                      {/* Stat Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                        {active.stats.map((s, i) => (
                          <div key={i} className="p-2.5 rounded-lg bg-white/10 border border-white/20 shadow-sm">
                            <span className="text-[8.5px] font-mono uppercase text-white/40 block">
                              {s.label}
                            </span>
                            <span className="font-oswald text-base font-bold text-white">
                              {s.value} <span className="text-[10px] text-teal-300 font-normal">{s.unit}</span>
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 2: BAYMAX CARE PROTOCOL */}
                  {activeTab === 'baymax-care' && (
                    <motion.div
                      key="tab-baymax-care"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="space-y-3.5"
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono text-teal-300">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-teal-400" />
                          <span className="font-bold uppercase tracking-wider">
                            Baymax Healthcare Companion Diagnostic
                          </span>
                        </div>
                        <span className="text-white/40">PATIENT ID: HIRO HAMADA</span>
                      </div>

                      <div className="p-4 rounded-xl bg-white/12 border border-white/20 backdrop-blur-md space-y-2 shadow-sm">
                        <p className="font-cond text-sm sm:text-base text-white leading-relaxed italic border-l-2 border-[#f87171] pl-3">
                          "{active.baymaxCare}"
                        </p>
                        <div className="pt-2 border-t border-teal-500/20 flex items-center justify-between text-[9px] font-mono text-teal-300/60">
                          <span>HEALTHCARE CHIP #01 STATUS: NOMINAL</span>
                          <span>CARE DIRECTIVE: COMPLETE SATISFACTION</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                        <div className="p-3 rounded-lg bg-white/10 border border-white/20 space-y-1 shadow-sm">
                          <span className="text-[8.5px] font-mono uppercase text-white/40 block">Hiro Vital Signs</span>
                          <span className="font-oswald text-sm font-bold text-white">Adrenaline 128 BPM</span>
                          <span className="text-[9px] font-mono text-teal-400 block">Cognitive Focus Clear</span>
                        </div>
                        <div className="p-3 rounded-lg bg-white/10 border border-white/20 space-y-1 shadow-sm">
                          <span className="text-[8.5px] font-mono uppercase text-white/40 block">Thermal Insulation</span>
                          <span className="font-oswald text-sm font-bold text-white">Core Temp: 36.8°C</span>
                          <span className="text-[9px] font-mono text-emerald-400 block">Vinyl Wrap Active</span>
                        </div>
                        <div className="p-3 rounded-lg bg-white/10 border border-white/20 space-y-1 shadow-sm">
                          <span className="text-[8.5px] font-mono uppercase text-white/40 block">Companion Directive</span>
                          <span className="font-oswald text-sm font-bold text-white">Override Engaged</span>
                          <span className="text-[9px] font-mono text-purple-300 block">Zero Abandonment</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 3: SURVIVAL DRILLS & TACTICAL CHECKLIST */}
                  {activeTab === 'tactics' && (
                    <motion.div
                      key="tab-tactics"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="space-y-3"
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono text-white/50">
                        <span className="font-bold uppercase tracking-wider text-purple-300">
                          Hiro & Baymax Field Protocol Drills
                        </span>
                        <span>CHECK TO VALIDATE PROTOCOL READINESS</span>
                      </div>

                      <div className="space-y-2">
                        {active.tactics.map((tac, idx) => {
                          const isDone =
                            testedTactics[`${active.id}-${idx}`] !== undefined
                              ? testedTactics[`${active.id}-${idx}`]
                              : tac.tested

                          return (
                            <div
                              key={idx}
                              onClick={() => toggleTactic(idx)}
                              className={`p-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer shadow-sm ${
                                isDone
                                  ? 'bg-red-500/15 border-red-400/40 text-white'
                                  : 'bg-white/10 border-white/20 text-white/80 hover:border-white/35 hover:bg-white/15'
                              }`}
                            >
                              <div
                                className={`w-5 h-5 rounded flex items-center justify-center text-xs mt-0.5 border ${
                                  isDone
                                    ? 'bg-[#d62027] border-red-400 text-white'
                                    : 'border-white/30 text-transparent'
                                }`}
                              >
                                ✓
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-cond text-xs sm:text-sm font-medium leading-snug">
                                  {tac.text}
                                </p>
                                <span className="font-mono text-[8.5px] text-white/40 mt-0.5 block">
                                  {isDone ? 'SIMULATION / FIELD TEST VERIFIED' : 'PENDING DRILL VALIDATION'}
                                </span>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 4: KREI TECH RESIDUE SPECS */}
                  {activeTab === 'krei-specs' && (
                    <motion.div
                      key="tab-krei-specs"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="space-y-3.5"
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono text-cyan-300">
                        <span className="font-bold uppercase tracking-wider">
                          Scavenged Krei Tech Flight Logs & Material Data
                        </span>
                        <span className="text-white/40">PROJECT SILENT SPARROW</span>
                      </div>

                      <div className="p-4 rounded-xl bg-white/12 border border-white/20 backdrop-blur-md space-y-2 shadow-sm">
                        <p className="font-mono text-xs sm:text-[13px] text-cyan-100/90 leading-relaxed">
                          {active.kreiTechArchive}
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-white/10 border border-white/20 flex flex-wrap items-center justify-between gap-2 text-xs font-mono shadow-sm">
                        <span className="text-white/60">RESONANCE TUNER:</span>
                        <span className="text-cyan-300 font-bold">{active.frequency}</span>
                        <span className="text-white/30">|</span>
                        <span className="text-white/60">COORDINATE ORIGIN:</span>
                        <span className="text-white">KREI PORTAL TEST RIG ALPHA</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom Insight Footer Card */}
              <div
                className="mt-2 p-3 rounded-xl border flex flex-wrap items-center justify-between gap-3"
                style={{
                  background: 'rgba(214, 32, 39, 0.12)',
                  borderColor: 'rgba(214, 32, 39, 0.3)',
                }}
              >
                <div>
                  <span className="font-mono text-[8.5px] uppercase tracking-widest text-purple-300 block">
                    Dimensional Escape Vector Strategy
                  </span>
                  <span className="font-oswald text-xs sm:text-sm font-bold text-white">
                    Hiro's Engineering + Baymax's Prime Healthcare Directive = Mutual Survival
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-[#d62027] text-white text-[9px] font-mono font-bold uppercase shadow-sm">
                    COLLABORATIVE PROTOCOL ENGAGED
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* ── LIVE VOID INCIDENT TELEMETRY TICKER STRIP ────────── */}
        <div
          className="rounded-xl px-4 py-2.5 border border-white/20 bg-white/12 backdrop-blur-md flex items-center justify-between text-[10px] font-mono text-white/80 shadow-sm"
        >
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
            <span className="text-white/40 uppercase">LIVE RECON STREAM:</span>
            <span className="text-white/80 truncate">
              [T+03:52:14] Sector 02 gravitational waves stabilizing • Baymax battery holding at 88% via Krei capacitor cell • Exit horizon radius: 4.2m
            </span>
          </div>
          <span className="hidden sm:inline text-white/30 flex-shrink-0 pl-2">
            TELEMETRY FEED 100% OK
          </span>
        </div>

      </div>
    </div>
  )
}

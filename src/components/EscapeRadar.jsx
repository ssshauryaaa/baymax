import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ── WEB AUDIO SYNTHESIZER FOR RADAR SFX ─────────────────────── */
function playRadarSound(type = 'ping', freq = 680) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!AudioContext) return
    const ctx = new AudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    const now = ctx.currentTime

    if (type === 'ping') {
      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, now)
      osc.frequency.exponentialRampToValueAtTime(freq * 0.5, now + 0.35)
      gain.gain.setValueAtTime(0.08, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35)
      osc.start(now)
      osc.stop(now + 0.35)
    } else if (type === 'lock') {
      const osc2 = ctx.createOscillator()
      const gain2 = ctx.createGain()
      osc2.connect(gain2)
      gain2.connect(ctx.destination)
      osc.type = 'sine'
      osc.frequency.setValueAtTime(520, now)
      osc.frequency.linearRampToValueAtTime(1040, now + 0.28)
      gain.gain.setValueAtTime(0.09, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45)
      osc2.type = 'triangle'
      osc2.frequency.setValueAtTime(659.25, now)
      osc2.frequency.linearRampToValueAtTime(1318.5, now + 0.28)
      gain2.gain.setValueAtTime(0.06, now)
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.45)
      osc.start(now)
      osc.stop(now + 0.45)
      osc2.start(now)
      osc2.stop(now + 0.45)
    } else if (type === 'click') {
      osc.type = 'sine'
      osc.frequency.setValueAtTime(800, now)
      gain.gain.setValueAtTime(0.05, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08)
      osc.start(now)
      osc.stop(now + 0.08)
    }
  } catch {
    /* Ignore audio restrictions */
  }
}

/* ── WAYPOINT SECTORS DATA ───────────────────────────────────── */
const SECTORS = [
  {
    id: 1,
    code: 'S-00',
    name: 'Sector 0: Gate Ingress Point',
    zone: 'The Threshold',
    status: 'CLEARED',
    statusColor: '#10B981',
    color: '#34D399',
    x: 70,
    y: 195,
    distance: '0 m',
    elevation: '+0m (Zero-G)',
    hazard: 'Initial breach point. Hiro leaped back through the closing threshold before Callaghan’s portal collapsed.',
    hiroNotes: 'The gate was shrinking at 12% per minute. I grabbed Tadashi’s healthcare chip and jumped.',
    baymaxTelemetry: 'Vital telemetry established. Cardiac sync: 100%. Hiro’s suit oxygen sealed.',
  },
  {
    id: 2,
    code: 'S-01',
    name: 'Sector 1: Drift Debris Field',
    zone: 'Scavenger Orbit',
    status: 'CLEARED',
    statusColor: '#10B981',
    color: '#38BDF8',
    x: 130,
    y: 145,
    distance: '320 m',
    elevation: '-340m void',
    hazard: 'Empty Baymax armor located drifting among severed Krei Tech portal structural struts.',
    hiroNotes: 'Found Baymax floating inert. Reinserted the healthcare chip into his chest housing.',
    baymaxTelemetry: 'Primary reboot complete. Non-violence lock engaged. Hiro Hamada recognized as patient.',
  },
  {
    id: 3,
    code: 'S-02',
    name: 'Sector 2: Quiet Platform Ruins',
    zone: 'Relic Bastion',
    status: 'CLEARED',
    statusColor: '#10B981',
    color: '#2DD4BF',
    x: 200,
    y: 175,
    distance: '680 m',
    elevation: '+120m platform',
    hazard: 'Floating basalt megaliths holding stable orbit. Assembled magnetic grapple winch from struts.',
    hiroNotes: 'Calibrated Baymax’s internal heating elements to survive the freezing dimensional vacuum.',
    baymaxTelemetry: 'Hiro core body temp stabilized at 37.0°C. Inflatable hull at 1.2 ATM.',
  },
  {
    id: 4,
    code: 'S-03',
    name: 'Sector 3: Inverted Canyon & Glitch Spire',
    zone: 'Current Coordinates',
    status: 'ACTIVE NOW',
    statusColor: '#EF4444',
    color: '#EF4444',
    x: 260,
    y: 95,
    distance: '940 m',
    elevation: 'Inverted -850m',
    hazard: 'Violent gravitational inversions and quantum phase shearing. Floating boulders accelerating in reverse.',
    hiroNotes: 'Tethered directly to Baymax’s back plate. We have to time our leaps between gravitational pulses.',
    baymaxTelemetry: 'WARNING: Graviton shear at 84%. Deploying localized EM barrier to shield Hiro.',
  },
  {
    id: 5,
    code: 'S-04',
    name: 'Sector 4: Krei Test Pod Alpha-03',
    zone: 'Waystation',
    status: 'NEXT WAYPOINT',
    statusColor: '#FBBF24',
    color: '#FBBF24',
    x: 325,
    y: 140,
    distance: '1,150 m',
    elevation: 'Unstable flux',
    hazard: 'Classified Test Pilot Abigail capsule remnant. Scavenged hydrazine thruster fuel for final leap.',
    hiroNotes: 'Pod hydrazine tanks have just enough fuel for one maximum-thrust synchronized burn.',
    baymaxTelemetry: 'Thrusters replenished to 88%. Burn window calculated for 4.8 seconds.',
  },
  {
    id: 6,
    code: 'S-05',
    name: 'Sector 5: Exit Portal Event Horizon',
    zone: 'San Fransokyo Gate',
    status: 'DESTINATION',
    statusColor: '#D62027',
    color: '#D62027',
    x: 380,
    y: 55,
    distance: '1,380 m',
    elevation: 'Singularity Threshold',
    hazard: 'Shrinking event horizon. Final dual-thruster jump point back to the SFIT university lab.',
    hiroNotes: 'The team on the other side is holding the emitter rings open. Once we cross, we are home.',
    baymaxTelemetry: 'Exit aperture: 4.2m diameter. Trajectory lock required before horizon collapse.',
  },
]

/* ── DYNAMIC HTML5 RADAR SCOPE CANVAS ───────────────────────── */
function RadarScopeCanvas({
  activeSector,
  onSelectSector,
  vectorCalculated,
  zoomLevel = 1,
}) {
  const canvasRef = useRef(null)
  const angleRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId

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

      // Translucent slate background trail
      ctx.fillStyle = 'rgba(20, 34, 50, 0.25)'
      ctx.fillRect(0, 0, w, h)

      const cx = w * 0.5
      const cy = h * 0.5
      const maxR = Math.min(w, h) * 0.44 * zoomLevel

      // Radar Concentric Range Rings
      const rings = [0.25, 0.5, 0.75, 1.0]
      rings.forEach((ratio, idx) => {
        const r = maxR * ratio
        ctx.beginPath()
        ctx.arc(cx, cy, r, 0, Math.PI * 2)
        ctx.strokeStyle = idx === rings.length - 1 ? 'rgba(255, 255, 255, 0.22)' : 'rgba(255, 255, 255, 0.08)'
        ctx.lineWidth = idx === rings.length - 1 ? 1.5 : 1
        if (idx % 2 === 1) {
          ctx.setLineDash([4, 4])
        } else {
          ctx.setLineDash([])
        }
        ctx.stroke()
        ctx.setLineDash([])

        // Distance label on top axis
        ctx.fillStyle = 'rgba(255, 255, 255, 0.35)'
        ctx.font = '8px monospace'
        ctx.textAlign = 'center'
        ctx.fillText(`${Math.round(ratio * 1500)}m`, cx, cy - r + 10)
      })

      // Crosshairs & Diagonal Azimuth Lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(cx - maxR, cy)
      ctx.lineTo(cx + maxR, cy)
      ctx.moveTo(cx, cy - maxR)
      ctx.lineTo(cx, cy + maxR)
      ctx.stroke()

      // Azimuth markings
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'
      ctx.font = '9px monospace'
      ctx.fillText('000°', cx, cy - maxR - 6)
      ctx.fillText('180°', cx, cy + maxR + 14)
      ctx.fillText('270°', cx - maxR - 16, cy + 3)
      ctx.fillText('090°', cx + maxR + 16, cy + 3)

      // Radar Sweep Arm (360 Degree Scanning Beam)
      angleRef.current = (angleRef.current + 0.024) % (Math.PI * 2)
      const currentAngle = angleRef.current

      // Sweep gradient arc
      const sweepGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR)
      sweepGrad.addColorStop(0, 'rgba(214, 32, 39, 0.25)')
      sweepGrad.addColorStop(1, 'rgba(214, 32, 39, 0.02)')

      ctx.save()
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.arc(cx, cy, maxR, currentAngle - 0.45, currentAngle)
      ctx.closePath()
      ctx.fillStyle = sweepGrad
      ctx.fill()

      // Primary Sweep Line
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.lineTo(cx + Math.cos(currentAngle) * maxR, cy + Math.sin(currentAngle) * maxR)
      ctx.strokeStyle = '#ef4444'
      ctx.lineWidth = 1.8
      ctx.shadowColor = '#ef4444'
      ctx.shadowBlur = 8
      ctx.stroke()
      ctx.restore()

      // Map Scale Factor to fit sectors in canvas
      const scaleX = (w - 80) / 400
      const scaleY = (h - 60) / 240

      // Render Trajectory Path Lines
      ctx.beginPath()
      SECTORS.forEach((sec, idx) => {
        const sx = 40 + sec.x * scaleX
        const sy = 30 + sec.y * scaleY
        if (idx === 0) ctx.moveTo(sx, sy)
        else ctx.lineTo(sx, sy)
      })
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)'
      ctx.lineWidth = 2
      ctx.setLineDash([5, 4])
      ctx.stroke()
      ctx.setLineDash([])

      // Render Cleared Path in Emerald
      ctx.beginPath()
      for (let i = 0; i < 4; i++) {
        const sec = SECTORS[i]
        const sx = 40 + sec.x * scaleX
        const sy = 30 + sec.y * scaleY
        if (i === 0) ctx.moveTo(sx, sy)
        else ctx.lineTo(sx, sy)
      }
      ctx.strokeStyle = '#10B981'
      ctx.lineWidth = 2.5
      ctx.stroke()

      // Projected Red Escape Vector if calculated
      if (vectorCalculated) {
        ctx.save()
        ctx.beginPath()
        for (let i = 3; i < SECTORS.length; i++) {
          const sec = SECTORS[i]
          const sx = 40 + sec.x * scaleX
          const sy = 30 + sec.y * scaleY
          if (i === 3) ctx.moveTo(sx, sy)
          else ctx.lineTo(sx, sy)
        }
        ctx.strokeStyle = '#d62027'
        ctx.lineWidth = 3.5
        ctx.shadowColor = '#ef4444'
        ctx.shadowBlur = 12
        ctx.stroke()
        ctx.restore()
      }

      // Render Sector Waypoint Nodes
      SECTORS.forEach((sec) => {
        const sx = 40 + sec.x * scaleX
        const sy = 30 + sec.y * scaleY
        const isSelected = activeSector.id === sec.id
        const isCurrent = sec.id === 4

        // Highlight ring for selected or current node
        if (isSelected || isCurrent) {
          ctx.beginPath()
          ctx.arc(sx, sy, isSelected ? 14 : 11, 0, Math.PI * 2)
          ctx.strokeStyle = isSelected ? '#ffffff' : '#ef4444'
          ctx.lineWidth = 1.5
          ctx.shadowColor = isSelected ? '#ffffff' : '#ef4444'
          ctx.shadowBlur = 8
          ctx.stroke()
          ctx.shadowBlur = 0
        }

        // Inner node dot
        ctx.beginPath()
        ctx.arc(sx, sy, isSelected ? 8 : 6, 0, Math.PI * 2)
        ctx.fillStyle = isCurrent ? '#d62027' : sec.color
        ctx.fill()
        ctx.strokeStyle = '#ffffff'
        ctx.lineWidth = 1.5
        ctx.stroke()

        // Node label
        ctx.fillStyle = isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.75)'
        ctx.font = isSelected ? 'bold 10px monospace' : '9px monospace'
        ctx.textAlign = 'center'
        ctx.fillText(sec.code, sx, sy - 14)
      })

      // Exit Singularity Marker (S-05)
      const exitSec = SECTORS[5]
      const ex = 40 + exitSec.x * scaleX
      const ey = 30 + exitSec.y * scaleY
      ctx.save()
      ctx.beginPath()
      ctx.arc(ex, ey, 18, 0, Math.PI * 2)
      ctx.strokeStyle = '#d62027'
      ctx.lineWidth = 2
      ctx.setLineDash([3, 3])
      ctx.stroke()
      ctx.restore()

      ctx.restore()
      animId = requestAnimationFrame(render)
    }

    animId = requestAnimationFrame(render)
    return () => cancelAnimationFrame(animId)
  }, [activeSector, vectorCalculated, zoomLevel])

  // Click on canvas to select sector
  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const clickY = e.clientY - rect.top

    const scaleX = (rect.width - 80) / 400
    const scaleY = (rect.height - 60) / 240

    SECTORS.forEach((sec) => {
      const sx = 40 + sec.x * scaleX
      const sy = 30 + sec.y * scaleY
      const dist = Math.hypot(clickX - sx, clickY - sy)
      if (dist < 22) {
        onSelectSector(sec)
        playRadarSound('click')
      }
    })
  }

  return (
    <div
      onClick={handleCanvasClick}
      className="relative w-full h-full min-h-[340px] sm:min-h-[400px] rounded-2xl overflow-hidden cursor-crosshair border border-white/20 shadow-inner"
      style={{
        background: 'linear-gradient(180deg, rgba(20, 36, 54, 0.85) 0%, rgba(12, 22, 36, 0.95) 100%)',
        backdropFilter: 'blur(16px)',
      }}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Top Left Compass Status Badge */}
      <div className="absolute top-3 left-3 flex items-center gap-2 text-[10px] font-mono bg-white/15 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/25 text-white">
        <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
        <span className="font-bold text-white">BEARING: 042° NNE</span>
        <span className="text-white/40">•</span>
        <span className="text-teal-300">DRIFT: 0.14 rad/s</span>
      </div>

      {/* Top Right Live Telemetry Coordinates */}
      <div className="absolute top-3 right-3 text-[10px] font-mono bg-white/12 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 text-white/80">
        GRID REF: [X: +248.6 | Y: -84.2 | Z: +810.0]
      </div>

      {/* Bottom Floating Hint */}
      <div className="absolute bottom-3 left-4 text-[9.5px] font-mono text-white/50 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
        <span>CLICK ANY WAYPOINT NODE (S0–S5) TO INSPECT VECTORS</span>
      </div>
    </div>
  )
}

/* ── MAIN ESCAPE RADAR COMPONENT ─────────────────────────────── */
export default function EscapeRadar() {
  const [activeSector, setActiveSector] = useState(SECTORS[3])
  const [vectorCalculated, setVectorCalculated] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1.0)
  const [radarFilter, setRadarFilter] = useState('nav') // 'nav' | 'graviton' | 'vector'
  const [soundEnabled, setSoundEnabled] = useState(true)

  const handleSelectSector = (sec) => {
    setActiveSector(sec)
    if (soundEnabled) playRadarSound('ping', 540 + sec.id * 50)
  }

  const handleCalculateVector = () => {
    setVectorCalculated(true)
    if (soundEnabled) playRadarSound('lock')
  }

  const toggleSound = () => {
    setSoundEnabled((v) => !v)
    if (!soundEnabled) playRadarSound('click')
  }

  return (
    <div className="flex-1 flex flex-col h-full w-full overflow-hidden relative select-none text-white">

      {/* ── AMBIENT BACKGROUND GLOW ──────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full blur-[130px] opacity-25"
          style={{ background: '#f87171' }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-[520px] h-[520px] rounded-full blur-[130px] opacity-20"
          style={{ background: '#38bdf8' }}
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

      {/* ── TOP HEADER / FROSTED COMMAND BAR ─────────────────── */}
      <header
        className="flex items-center justify-between px-5 sm:px-6 py-3 border-b border-white/20 z-20 flex-shrink-0"
        style={{
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.08) 100%)',
          backdropFilter: 'blur(20px) saturate(160%)',
          boxShadow: '0 4px 20px rgba(15, 23, 42, 0.1)',
        }}
      >
        <div className="flex items-center gap-3.5">
          <div className="relative flex items-center justify-center">
            <span className="w-3.5 h-3.5 rounded-full absolute animate-ping opacity-60 bg-[#d62027]" />
            <span className="w-3.5 h-3.5 rounded-full relative block bg-[#d62027] shadow-[0_0_12px_#d62027]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
                Dimensional Telemetry & Navigation // SFIT Recon
              </span>
              <span className="text-[10px] font-mono text-[#f87171] font-semibold">
                • Active Trajectory Radar
              </span>
            </div>
            <h1 className="font-oswald text-xl sm:text-2xl font-black uppercase tracking-tight text-white leading-none mt-0.5">
              Escape Route Radar
              <span className="text-white/30 font-normal mx-2">/</span>
              <span className="text-white">{activeSector.name}</span>
            </h1>
          </div>
        </div>

        {/* Right Header Status Badges */}
        <div className="flex items-center gap-2.5">
          {/* Portal Event Horizon Collapse Warning */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-red-400/40 bg-red-500/15 backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
            <div>
              <span className="font-mono text-[9px] uppercase tracking-wider text-red-200 block leading-tight">
                Event Horizon
              </span>
              <span className="font-oswald text-xs font-bold text-white tracking-wider leading-none">
                18.4% STABILITY
              </span>
            </div>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono uppercase font-bold tracking-wider border transition-all cursor-pointer shadow-sm ${
              soundEnabled
                ? 'bg-white/20 text-white border-white/30'
                : 'bg-white/8 text-white/50 border-white/15'
            }`}
            title="Toggle Radar Audio FX"
          >
            {soundEnabled ? '🔊 Audio On' : '🔇 Audio Off'}
          </button>
        </div>
      </header>

      {/* ── MAIN WORKSPACE CONTENT ───────────────────────────── */}
      <div className="flex-1 overflow-y-auto z-10 p-4 sm:p-6 lg:p-7 [scrollbar-width:thin]">
        <div className="w-full max-w-[1760px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* ════ LEFT COLUMN: HIGH-TECH RADAR SCOPE (7 COLS) ════ */}
          <div className="lg:col-span-7 flex flex-col gap-4">

            {/* Radar Scope Frame Card */}
            <div
              className="rounded-2xl p-5 border border-white/25 relative overflow-hidden shadow-[0_12px_40px_rgba(15,23,42,0.18)]"
              style={{
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.08) 100%)',
                backdropFilter: 'blur(24px) saturate(160%)',
              }}
            >
              {/* Radar Toolbar Header */}
              <div className="flex flex-wrap items-center justify-between pb-3.5 mb-3.5 border-b border-white/15 gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f87171] animate-pulse" />
                  <span className="font-oswald text-base font-bold uppercase tracking-wider text-white">
                    Rift Scanning Scope
                  </span>
                  <span className="text-[10px] font-mono text-white/50 px-2 py-0.5 rounded bg-white/10">
                    Range: 1,500m
                  </span>
                </div>

                {/* Filter & Zoom Controls */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 p-1 rounded-xl border border-white/20 bg-black/15 backdrop-blur-md">
                    {[
                      { id: 'nav', label: 'Navigation' },
                      { id: 'graviton', label: 'Graviton' },
                      { id: 'vector', label: 'Vector' },
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        onClick={() => {
                          setRadarFilter(mode.id)
                          if (soundEnabled) playRadarSound('click')
                        }}
                        className={`px-2.5 py-1 rounded-lg text-[9.5px] font-mono uppercase font-bold tracking-wider transition-all cursor-pointer ${
                          radarFilter === mode.id
                            ? 'bg-[#d62027] text-white shadow-[0_2px_12px_rgba(214,32,39,0.4)]'
                            : 'text-white/70 hover:text-white'
                        }`}
                      >
                        {mode.label}
                      </button>
                    ))}
                  </div>

                  {/* Zoom Buttons */}
                  <div className="flex items-center gap-1 p-1 rounded-xl border border-white/20 bg-black/15 backdrop-blur-md text-xs font-mono">
                    {[1.0, 1.3].map((z) => (
                      <button
                        key={z}
                        onClick={() => {
                          setZoomLevel(z)
                          if (soundEnabled) playRadarSound('click')
                        }}
                        className={`px-2 py-0.5 rounded text-[9.5px] font-mono font-bold transition-all cursor-pointer ${
                          zoomLevel === z
                            ? 'bg-white/25 text-white shadow-sm'
                            : 'text-white/60 hover:text-white'
                        }`}
                      >
                        {z}x
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Canvas Radar Scope Viewport */}
              <RadarScopeCanvas
                activeSector={activeSector}
                onSelectSector={handleSelectSector}
                vectorCalculated={vectorCalculated}
                zoomLevel={zoomLevel}
              />

              {/* Waypoint Selector Capsule Buttons */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-4 pt-3.5 border-t border-white/15">
                {SECTORS.map((sec) => {
                  const isSelected = activeSector.id === sec.id
                  return (
                    <button
                      key={sec.id}
                      onClick={() => handleSelectSector(sec)}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 backdrop-blur-md ${
                        isSelected
                          ? 'border-white/40 bg-white/25 shadow-[0_4px_16px_rgba(255,255,255,0.2)] scale-103'
                          : 'border-white/15 bg-white/10 hover:bg-white/18 text-white/70 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ background: sec.color }}
                        />
                        <span className="font-oswald text-xs font-bold text-white">{sec.code}</span>
                      </div>
                      <span className="text-[8.5px] font-mono text-white/60 truncate max-w-full">
                        {sec.distance}
                      </span>
                    </button>
                  )
                })}
              </div>

            </div>

            {/* Quick Live Recon Ticker */}
            <div className="rounded-xl px-4 py-3 border border-white/20 bg-white/12 backdrop-blur-md flex items-center gap-3 text-xs font-mono text-white/85 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f87171] animate-pulse flex-shrink-0" />
              <span className="truncate">
                [LIVE RADAR] Hiro & Baymax anchored in Sector 3 • Distance to Exit Singularity: 1,380m • Est. Time: 08:34 min
              </span>
            </div>

          </div>

          {/* ════ RIGHT COLUMN: WAYPOINT INTEL & FLIGHT VECTOR (5 COLS) ════ */}
          <div className="lg:col-span-5 flex flex-col gap-5">

            {/* Sector Intel Card */}
            <section
              className="rounded-2xl p-5 sm:p-6 border border-white/25 relative overflow-hidden shadow-[0_12px_40px_rgba(15,23,42,0.18)] space-y-4"
              style={{
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.08) 100%)',
                backdropFilter: 'blur(24px) saturate(160%)',
              }}
            >
              {/* Waypoint Badge Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/15">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#f87171] font-bold">
                  Waypoint Dossier // Telemetry
                </span>
                <span
                  className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase font-bold border"
                  style={{
                    color: activeSector.statusColor,
                    borderColor: `${activeSector.statusColor}60`,
                    background: `${activeSector.statusColor}18`,
                  }}
                >
                  {activeSector.status}
                </span>
              </div>

              {/* Title & Spatial Elevation */}
              <div>
                <h2 className="font-oswald text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
                  {activeSector.name}
                </h2>
                <span className="font-mono text-xs text-teal-300 font-medium block mt-0.5">
                  Spatial Elevation: {activeSector.elevation} • Range: {activeSector.distance}
                </span>
              </div>

              {/* Hazard Description Box */}
              <div className="p-4 rounded-xl bg-white/12 border border-white/20 backdrop-blur-md space-y-2 shadow-sm">
                <span className="font-mono text-[9.5px] uppercase font-bold tracking-wider text-[#fca5a5] block">
                  Gravitational Hazard Analysis
                </span>
                <p className="font-sans text-xs sm:text-sm text-white/90 leading-relaxed italic border-l-2 border-[#d62027] pl-3">
                  "{activeSector.hazard}"
                </p>
              </div>

              {/* Hiro & Baymax Dual Notes */}
              <div className="grid grid-cols-1 gap-2.5 pt-1">
                <div className="p-3 rounded-lg bg-white/10 border border-white/18 space-y-1 shadow-sm">
                  <span className="text-[9px] font-mono uppercase font-bold text-white/70 block">
                    Hiro's Navigation Log
                  </span>
                  <p className="text-xs text-white/85 font-cond leading-snug">
                    {activeSector.hiroNotes}
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-white/10 border border-white/18 space-y-1 shadow-sm">
                  <span className="text-[9px] font-mono uppercase font-bold text-teal-300 block">
                    Baymax Care Directives
                  </span>
                  <p className="text-xs text-white/85 font-cond leading-snug">
                    {activeSector.baymaxTelemetry}
                  </p>
                </div>
              </div>

              {/* Flight Telemetry Status Checklist */}
              <div className="space-y-2 pt-2 border-t border-white/15 text-xs font-mono">
                <div className="flex justify-between items-center text-white/80">
                  <span className="text-white/60">Tadashi Healthcare Protocol</span>
                  <span className="text-emerald-300 font-bold">Active & Shielding</span>
                </div>
                <div className="flex justify-between items-center text-white/80">
                  <span className="text-white/60">Microbot Bridge Assembly</span>
                  <span className="text-teal-300 font-bold">Ready for Sector 4</span>
                </div>
                <div className="flex justify-between items-center text-white/80">
                  <span className="text-white/60">San Fransokyo Carrier Ping</span>
                  <span className="text-[#fca5a5] font-bold">432.18 GHz (Locked)</span>
                </div>
              </div>
            </section>

            {/* Flight Vector Calculation Console */}
            <section
              className="rounded-2xl p-5 sm:p-6 border border-white/25 shadow-[0_12px_40px_rgba(15,23,42,0.18)] space-y-4"
              style={{
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.08) 100%)',
                backdropFilter: 'blur(24px) saturate(160%)',
              }}
            >
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#f87171] font-bold block mb-1">
                  Terminal Trajectory Computer
                </span>
                <h3 className="font-oswald text-lg font-bold uppercase text-white">
                  Synchronized Dual-Thruster Jump
                </h3>
              </div>

              {/* 3 Metric Mini Cards */}
              <div className="grid grid-cols-3 gap-2.5">
                <div className="p-3 rounded-xl bg-white/10 border border-white/20 text-center space-y-1 shadow-sm">
                  <span className="text-[9px] font-mono uppercase text-white/60 block">Delta-V</span>
                  <span className="font-oswald text-base sm:text-lg font-black text-white block">82 m/s</span>
                  <span className="text-[8px] font-mono text-emerald-300 block">Required</span>
                </div>

                <div className="p-3 rounded-xl bg-white/10 border border-white/20 text-center space-y-1 shadow-sm">
                  <span className="text-[9px] font-mono uppercase text-white/60 block">Max Burn</span>
                  <span className="font-oswald text-base sm:text-lg font-black text-amber-300 block">4.8 sec</span>
                  <span className="text-[8px] font-mono text-white/60 block">Hydrazine</span>
                </div>

                <div className="p-3 rounded-xl bg-white/10 border border-white/20 text-center space-y-1 shadow-sm">
                  <span className="text-[9px] font-mono uppercase text-white/60 block">Gate Sync</span>
                  <span className="font-oswald text-base sm:text-lg font-black text-[#fca5a5] block">98.4%</span>
                  <span className="text-[8px] font-mono text-emerald-300 block">Optimal</span>
                </div>
              </div>

              {/* Big Hero 6 Calculate Escape Vector Button */}
              <button
                onClick={handleCalculateVector}
                className={`w-full py-3 rounded-xl font-oswald text-xs sm:text-sm uppercase tracking-widest font-black transition-all cursor-pointer shadow-lg ${
                  vectorCalculated
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-[0_4px_20px_rgba(16,185,129,0.4)]'
                    : 'bg-[#d62027] hover:bg-[#ef4444] text-white shadow-[0_4px_20px_rgba(214,32,39,0.45)]'
                }`}
              >
                {vectorCalculated ? (
                  <span className="flex items-center justify-center gap-2">
                    <span>✓</span>
                    <span>ESCAPE VECTOR PLOTTED & LOCKED TO SFIT GATE</span>
                  </span>
                ) : (
                  'CALCULATE FINAL ESCAPE VECTOR'
                )}
              </button>

              <span className="block text-center font-mono text-[9px] text-white/60">
                {vectorCalculated
                  ? 'Trajectory synchronized with Baymax thrusters. Ready for terminal horizon leap.'
                  : 'Calculates dual-burst acceleration so Hiro and Baymax emerge into San Fransokyo together.'}
              </span>
            </section>

          </div>

        </div>
      </div>

    </div>
  )
}

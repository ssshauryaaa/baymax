import { useState } from 'react'
import { motion } from 'framer-motion'
import PortalScene from '../3d/PortalScene'
import { SectionLabel, Badge } from '../ui/Elements'

/* ─── Dimension zone data ──────────────────────────────────── */
const ZONES = [
  {
    id:      'drift',
    name:    'Drift Field',
    code:    'ZONE-00',
    accent:  '#9B8FD4',
    threat:  'LOW',
    status:  'SEARCHING',
    physics: 'Zero-gravity — debris field active',
    temp:    '−12°C',
    atmo:    'Breathable',
    notes:   'Sector 0 of the portal dimension. Baymax empty shell found here. Gravity has no fixed direction; objects drift in random vectors. Caution: micro-debris impact risk.',
    hazards: ['Micro-debris', 'Disorientation', 'Zero-G drift'],
  },
  {
    id:      'ruins',
    name:    'Quiet Ruins',
    code:    'ZONE-01',
    accent:  '#2DD4BF',
    threat:  'LOW',
    status:  'RESTORED',
    physics: 'Fractured-gravity — platforms stable',
    temp:    '−5°C',
    atmo:    'Breathable',
    notes:   'Suspended ruins of an unknown world absorbed by the portal. Gravity anchors to large debris fragments. Best location for chip installation — relative stillness achieved.',
    hazards: ['Edge collapses', 'Platform decay'],
  },
  {
    id:      'canyon',
    name:    'Inverted Canyon',
    code:    'ZONE-02',
    accent:  '#FBBF24',
    threat:  'HIGH',
    status:  'DANGER',
    physics: 'Anti-gravity — inverting every 40s',
    temp:    '+22°C anomaly',
    atmo:    'Thin — stress breathing',
    notes:   'The canyon hangs upside down. Gravity inverts on an irregular cycle. Energy pillars pulse with unknown discharge. Baymax sensor lock is impossible here.',
    hazards: ['Gravity inversion', 'Energy discharge', 'Sensor blackout', 'No exit marked'],
  },
  {
    id:      'bridge',
    name:    'Glitch Bridge',
    code:    'ZONE-03',
    accent:  '#B8A4FF',
    threat:  'ELEVATED',
    status:  'ACTIVE',
    physics: 'Partial-gravity — bridge segments only',
    temp:    '−8°C',
    atmo:    'Normal',
    notes:   'A partially-constructed data bridge between two sections of the dimension. Segments flicker out of existence unpredictably. Teamwork required to traverse.',
    hazards: ['Segment deletion', 'Glitch zones', 'Limited footing'],
  },
  {
    id:      'gate',
    name:    'Closing Gate',
    code:    'ZONE-04',
    accent:  '#2DD4BF',
    threat:  'CRITICAL',
    status:  'CRITICAL',
    physics: 'Exit portal — collapsing',
    temp:    '+60°C (gate heat)',
    atmo:    'Pressurised vortex',
    notes:   'The exit portal. Shrinking at an accelerating rate. Baymax battery at critical. One shot at escape. Hiro will reach back through for Baymax. Both must make it.',
    hazards: ['Gate closure', 'Thermal vortex', 'Battery depletion', 'Last chance'],
  },
]

const THREAT_STYLE = {
  LOW:      'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
  MODERATE: 'text-amber-400  border-amber-500/30  bg-amber-500/10',
  ELEVATED: 'text-orange-400 border-orange-500/30 bg-orange-500/10',
  HIGH:     'text-red-400    border-red-500/30    bg-red-500/10',
  CRITICAL: 'text-red-400    border-red-500/40    bg-red-500/15',
}

/* ─── Zone card ────────────────────────────────────────────── */
function ZoneCard({ zone, isActive, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ x: 3 }}
      className={`w-full text-left p-3.5 rounded border transition-all duration-200 ${
        isActive
          ? 'border-white/20'
          : 'border-white/[0.07] hover:border-white/15'
      }`}
      style={{
        background: isActive
          ? `linear-gradient(135deg, ${zone.accent}15, rgba(6,13,31,0.9))`
          : 'rgba(6,13,31,0.5)',
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[8px] tracking-[0.25em]" style={{ color: zone.accent }}>
          {zone.code}
        </span>
        <span className={`px-1.5 py-0.5 rounded border font-mono text-[7px] tracking-wider uppercase ${THREAT_STYLE[zone.threat]}`}>
          {zone.threat}
        </span>
      </div>
      <span className="font-display font-semibold text-sm text-white">{zone.name}</span>
      <p className="font-mono text-[9px] text-white/35 mt-0.5 truncate">{zone.physics}</p>
    </motion.button>
  )
}

export default function DimensionSection() {
  const [activeZone, setActiveZone] = useState(0)
  const zone = ZONES[activeZone]

  return (
    <section id="dimension" className="relative py-24 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 60% at 70% 50%, rgba(155,143,212,0.06), transparent)' }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <SectionLabel>Portal Dimension</SectionLabel>
          <h2 className="font-display font-extrabold text-5xl text-white mb-3">
            The Unknown
            <span className="text-gradient-teal"> Dimension</span>
          </h2>
          <p className="text-white/45 max-w-xl">
            A world inside the portal that follows no rules of physics. Every zone is unmapped. Every step is risk.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_300px] gap-6">

          {/* Zone list */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-2"
          >
            <p className="font-mono text-[9px] text-white/30 tracking-[0.25em] uppercase mb-2">Mapped Zones</p>
            {ZONES.map((z, i) => (
              <ZoneCard
                key={z.id}
                zone={z}
                isActive={i === activeZone}
                onClick={() => setActiveZone(i)}
              />
            ))}
          </motion.div>

          {/* Central 3D portal view */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded overflow-hidden border border-white/[0.07]"
            style={{
              background: `radial-gradient(ellipse 80% 80% at 50% 50%, ${zone.accent}08, #030610)`,
              minHeight: 420,
            }}
          >
            {/* 3D scene */}
            <div className="absolute inset-0">
              <PortalScene accent={zone.accent} className="w-full h-full opacity-90" />
            </div>

            {/* HUD overlay */}
            <div className="absolute inset-0 scanlines opacity-25 pointer-events-none" />

            {/* Zone info overlay */}
            <div className="absolute bottom-0 inset-x-0 p-5 glass border-t border-white/[0.06]">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: zone.accent }}>
                    {zone.code} — Active
                  </span>
                  <h3 className="font-display font-bold text-xl text-white mt-0.5">{zone.name}</h3>
                </div>
                <Badge variant={zone.status}>{zone.status}</Badge>
              </div>
              <p className="font-mono text-[10px] text-white/50 leading-relaxed">{zone.physics}</p>
            </div>

            {/* Corner HUD markers */}
            <div className="absolute top-4 left-4 font-mono text-[8px] text-white/20 tracking-widest">
              PORTAL:ACTIVE
            </div>
            <div className="absolute top-4 right-4 font-mono text-[8px] tracking-widest" style={{ color: zone.accent + '80' }}>
              THREAT:{zone.threat}
            </div>
          </motion.div>

          {/* Zone detail panel */}
          <motion.div
            key={zone.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
            className="space-y-4"
          >
            {/* Telemetry */}
            <div className="p-4 rounded border border-white/[0.07] glass-light">
              <p className="font-mono text-[8px] text-white/30 tracking-[0.25em] uppercase mb-3">Zone Telemetry</p>
              <div className="space-y-2.5">
                {[
                  { label: 'Atmosphere', val: zone.atmo   },
                  { label: 'Temperature',val: zone.temp   },
                  { label: 'Physics',    val: zone.physics },
                ].map(({ label, val }) => (
                  <div key={label} className="flex items-start justify-between gap-3">
                    <span className="font-mono text-[9px] text-white/35 shrink-0">{label}</span>
                    <span className="font-mono text-[10px] text-right" style={{ color: zone.accent + 'cc' }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="p-4 rounded border border-white/[0.07] glass-light">
              <p className="font-mono text-[8px] text-white/30 tracking-[0.25em] uppercase mb-2">Field Notes</p>
              <p className="font-mono text-[11px] text-white/60 leading-relaxed">{zone.notes}</p>
            </div>

            {/* Hazards */}
            <div className="p-4 rounded border border-white/[0.07] glass-light">
              <p className="font-mono text-[8px] text-white/30 tracking-[0.25em] uppercase mb-3">Active Hazards</p>
              <div className="space-y-1.5">
                {zone.hazards.map(h => (
                  <div key={h} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: zone.accent }} />
                    <span className="font-mono text-[10px] text-white/55">{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

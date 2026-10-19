import { useState } from 'react'

const SECTORS = [
  {
    id: 1,
    name: 'Sector 0: Gate Ingress',
    x: 40,
    y: 200,
    status: 'CLEARED',
    color: '#E5383B',
    hazard: 'Initial breach point. Hiro leaped through before seal.',
    elevation: '+0m (Zero-G)',
  },
  {
    id: 2,
    name: 'Sector 1: Drift Field',
    x: 100,
    y: 140,
    status: 'CLEARED',
    color: '#9B8FD4',
    hazard: 'Empty Baymax armor located floating in debris.',
    elevation: '-340m void',
  },
  {
    id: 3,
    name: 'Sector 2: Quiet Ruins',
    x: 180,
    y: 170,
    status: 'CLEARED',
    color: '#2DD4BF',
    hazard: 'Healthcare chip inserted. Baymax reboot successful.',
    elevation: '+120m platform',
  },
  {
    id: 4,
    name: 'Sector 3: Inverted Canyon',
    x: 230,
    y: 80,
    status: 'IN TRANSIT',
    color: '#FBBF24',
    hazard: 'Violent gravity inversions and energy spires.',
    elevation: 'Inverted -850m',
  },
  {
    id: 5,
    name: 'Sector 4: Glitch Bridge',
    x: 300,
    y: 130,
    status: 'PENDING',
    color: '#B8A4FF',
    hazard: 'Spacetime fractures. Tech bridge assembly required.',
    elevation: 'Unstable flux',
  },
  {
    id: 6,
    name: 'Sector 5: Exit Portal Gate',
    x: 360,
    y: 60,
    status: 'DESTINATION',
    color: '#2DD4BF',
    hazard: 'Shrinking event horizon. Final dual-thruster jump point.',
    elevation: 'Critical Singularity',
  },
]

export default function EscapeRadar() {
  const [activeSector, setActiveSector] = useState(SECTORS[3])
  const [vectorCalculated, setVectorCalculated] = useState(false)

  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto no-scrollbar select-none text-white">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between pb-4 mb-4 border-b border-white/10 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse" />
            <span className="font-cond text-[10px] font-bold uppercase tracking-[0.28em] text-teal-400">
              Dimensional Waypoint Radar
            </span>
          </div>
          <h2 className="font-oswald text-2xl lg:text-3xl font-bold uppercase tracking-tight text-white mt-0.5">
            Escape Route & Spatial Telemetry
          </h2>
        </div>

        {/* Portal countdown */}
        <div className="flex items-center gap-3 bg-red-hero/20 border border-red-hero/40 px-3 py-1.5 rounded">
          <div className="w-2 h-2 rounded-full bg-red-hero animate-ping" />
          <div>
            <span className="font-cond text-[8.5px] uppercase tracking-wider text-red-200 block leading-tight">
              Portal Event Horizon Collapse
            </span>
            <span className="font-oswald text-sm font-bold text-white tracking-widest leading-none">
              STABILITY: 18.4% (CLOSING FAST)
            </span>
          </div>
        </div>
      </div>

      {/* Main Radar View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 min-h-0">
        
        {/* Radar Map Canvas (7 cols) */}
        <div className="lg:col-span-7 flex flex-col p-4 rounded border border-white/10 bg-black/40 backdrop-blur-md relative overflow-hidden">
          <div className="flex items-center justify-between z-10 mb-2">
            <span className="font-cond text-[9px] font-bold uppercase tracking-widest text-white/50">
              Grid: Real-time Spacetime Rift Coordinates
            </span>
            <span className="font-cond text-[9px] font-bold uppercase tracking-widest text-teal-300">
              Hiro & Baymax Position: Sector 3
            </span>
          </div>

          {/* SVG Radar */}
          <div className="flex-1 min-h-[260px] flex items-center justify-center relative">
            <svg viewBox="0 0 400 240" className="w-full h-full" aria-label="Dimensional Map">
              <defs>
                <radialGradient id="radarGridGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.12"/>
                  <stop offset="100%" stopColor="transparent"/>
                </radialGradient>
              </defs>

              {/* Radar circular rings */}
              <circle cx="200" cy="120" r="100" fill="url(#radarGridGlow)" stroke="rgba(45,212,191,0.15)" strokeWidth="1"/>
              <circle cx="200" cy="120" r="65" fill="none" stroke="rgba(45,212,191,0.2)" strokeWidth="1" strokeDasharray="4 3"/>
              <circle cx="200" cy="120" r="30" fill="none" stroke="rgba(45,212,191,0.25)" strokeWidth="1"/>
              
              {/* Radar Crosshairs */}
              <line x1="20" y1="120" x2="380" y2="120" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
              <line x1="200" y1="20" x2="200" y2="220" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>

              {/* Waypoint Path Lines */}
              <polyline
                points="40,200 100,140 180,170 230,80 300,130 360,60"
                fill="none"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="2"
                strokeDasharray="4 2"
              />

              {/* Completed Path Accent */}
              <polyline
                points="40,200 100,140 180,170 230,80"
                fill="none"
                stroke="#2DD4BF"
                strokeWidth="2.5"
              />

              {/* Projected Vector Line if calculated */}
              {vectorCalculated && (
                <polyline
                  points="230,80 300,130 360,60"
                  fill="none"
                  stroke="#E5383B"
                  strokeWidth="3"
                  className="animate-pulse"
                />
              )}

              {/* Sector Waypoint Nodes */}
              {SECTORS.map(sec => {
                const isSelected = activeSector.id === sec.id
                return (
                  <g
                    key={sec.id}
                    onClick={() => setActiveSector(sec)}
                    className="cursor-pointer"
                  >
                    {/* Pulsing ring if selected or current position */}
                    {(isSelected || sec.id === 4) && (
                      <circle
                        cx={sec.x}
                        cy={sec.y}
                        r="14"
                        fill="none"
                        stroke={sec.color}
                        strokeWidth="1.5"
                        opacity="0.6"
                        className="animate-ping"
                      />
                    )}
                    {/* Node circle */}
                    <circle
                      cx={sec.x}
                      cy={sec.y}
                      r={isSelected ? "9" : "6"}
                      fill={sec.color}
                      stroke="#fff"
                      strokeWidth={isSelected ? "2" : "1"}
                    />
                    {/* Node label */}
                    <text
                      x={sec.x}
                      y={sec.y - 12}
                      textAnchor="middle"
                      fill="#fff"
                      fontSize="8"
                      fontFamily="sans-serif"
                      fontWeight="bold"
                    >
                      S{sec.id - 1}
                    </text>
                  </g>
                )
              })}

              {/* Exit Singularity Marker */}
              <circle cx="360" cy="60" r="18" fill="none" stroke="#E5383B" strokeWidth="1.5" strokeDasharray="3 2" className="animate-spin" />
              <text x="360" y="32" textAnchor="middle" fill="#E5383B" fontSize="7.5" fontWeight="bold">EXIT GATE</text>
            </svg>
          </div>

          <div className="flex items-center justify-between text-[9px] font-cond text-white/50 pt-2 border-t border-white/10 z-10">
            <span>CLICK ANY NODE TO INSPECT TRAJECTORY</span>
            <span className="text-teal-300">ESTIMATED TIME TO GATE: 11 MINUTES</span>
          </div>
        </div>

        {/* Selected Sector Intel & Escape Vector Controls (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between p-5 rounded border border-white/10 bg-black/30 backdrop-blur-md">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="font-oswald text-xs text-white/50 tracking-widest">
                WAYPOINT TELEMETRY
              </span>
              <span
                className="px-2 py-0.5 rounded text-[8.5px] font-cond font-bold uppercase tracking-wider"
                style={{
                  background: `${activeSector.color}25`,
                  color: activeSector.color,
                  border: `1px solid ${activeSector.color}50`,
                }}
              >
                {activeSector.status}
              </span>
            </div>

            <div>
              <h3 className="font-oswald text-xl font-bold uppercase text-white">
                {activeSector.name}
              </h3>
              <span className="font-cond text-xs text-teal-300">
                Spatial Elevation: {activeSector.elevation}
              </span>
            </div>

            <p className="font-cond text-xs text-white/80 leading-relaxed bg-black/40 p-3 rounded border border-white/10">
              {activeSector.hazard}
            </p>

            <div className="space-y-2 mt-1">
              <div className="flex justify-between text-[10px] font-cond border-b border-white/10 pb-1">
                <span className="text-white/50">Tadashi Healthcare Protocol</span>
                <span className="text-emerald-300 font-bold">Active Shielding</span>
              </div>
              <div className="flex justify-between text-[10px] font-cond border-b border-white/10 pb-1">
                <span className="text-white/50">Microbot Reprogramming</span>
                <span className="text-teal-300 font-bold">Bridge Clamps Ready</span>
              </div>
              <div className="flex justify-between text-[10px] font-cond border-b border-white/10 pb-1">
                <span className="text-white/50">San Fransokyo Beacon Lock</span>
                <span className="text-amber-300 font-bold">Faint (Holding)</span>
              </div>
            </div>
          </div>

          {/* Action button */}
          <div className="pt-4 border-t border-white/10">
            <button
              onClick={() => setVectorCalculated(true)}
              className={`w-full py-2.5 rounded font-oswald text-xs uppercase tracking-widest font-bold transition-all shadow ${
                vectorCalculated
                  ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                  : 'bg-red-hero text-white hover:bg-red-dark'
              }`}
            >
              {vectorCalculated ? (
                <span className="flex items-center justify-center gap-1.5">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>ESCAPE VECTOR PLOTTED & LOCKED</span>
                </span>
              ) : (
                'PLOT FINAL ESCAPE VECTOR'
              )}
            </button>
            <span className="block text-center font-cond text-[8.5px] text-white/40 mt-2">
              {vectorCalculated
                ? 'Trajectory synchronized with Baymax thrusters. Ready for terminal leap.'
                : 'Calculates dual-burst acceleration so Hiro and Baymax emerge together.'}
            </span>
          </div>

        </div>

      </div>
    </div>
  )
}

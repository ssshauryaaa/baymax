import { useState } from 'react'

export default function BaymaxDiagnostics() {
  const [painLevel, setPainLevel] = useState(3)
  const [activeTab, setActiveTab] = useState('vitals')
  const [healingApplied, setHealingApplied] = useState(false)
  const [audioFeedback, setAudioFeedback] = useState('"I have detected elevated cortisol levels in Hiro. Initiating comfort protocol."')

  const handlePainSelect = (lvl) => {
    setPainLevel(lvl)
    setHealingApplied(false)
    if (lvl === 0) {
      setAudioFeedback('"I am glad you are feeling well. I cannot deactivate until you say you are satisfied with your care."')
    } else if (lvl <= 3) {
      setAudioFeedback('"Minor strain detected. Applying gentle warm compression and administering emotional reassurance."')
    } else if (lvl <= 7) {
      setAudioFeedback('"Moderate distress. Hiro, your heart rate is 128 bpm. Please inhale deeply for four seconds."')
    } else {
      setAudioFeedback('"CRITICAL: Extreme pain or injury detected. Deploying thermal shield and antibacterial salve immediately."')
    }
  }

  const applyTreatment = () => {
    setHealingApplied(true)
    setPainLevel(lvl => Math.max(0, lvl - 3))
    setAudioFeedback('"Dispensing heat pad and gentle hug. Pain receptors showing immediate relief."')
  }

  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto no-scrollbar select-none text-white">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between pb-4 mb-4 border-b border-white/10 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-cond text-[10px] font-bold uppercase tracking-[0.28em] text-emerald-400">
              Healthcare Companion Online
            </span>
          </div>
          <h2 className="font-oswald text-2xl lg:text-3xl font-bold uppercase tracking-tight text-white mt-0.5">
            Baymax Medical & Armor Telemetry
          </h2>
        </div>

        {/* Quick diagnostic tabs */}
        <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded border border-white/10">
          {[
            { id: 'vitals', label: 'Hiro Vitals' },
            { id: 'chip', label: 'Chip Integrity' },
            { id: 'armor', label: 'Armor Matrix' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1 rounded text-[10px] font-cond font-bold uppercase tracking-widest transition-all ${
                activeTab === tab.id
                  ? 'bg-red-hero text-white shadow-sm'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 min-h-0">
        
        {/* Left Column: Baymax Hologram / Status Illustration (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between p-5 rounded border border-white/10 bg-black/30 backdrop-blur-md relative overflow-hidden">
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center justify-between z-10">
            <span className="font-cond text-[9px] font-bold uppercase tracking-widest text-teal-300">
              Model: Healthcare Assistant 2.0
            </span>
            <span className="px-2 py-0.5 rounded text-[8.5px] font-cond font-bold uppercase tracking-widest bg-teal-500/20 text-teal-300 border border-teal-500/30">
              Battery: 34% (Low)
            </span>
          </div>

          {/* Central Interactive Baymax Wireframe */}
          <div className="flex-1 flex items-center justify-center my-4 relative">
            <svg viewBox="0 0 240 280" className="w-52 h-60" aria-label="Baymax Wireframe">
              <defs>
                <radialGradient id="baymaxGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.25"/>
                  <stop offset="100%" stopColor="transparent"/>
                </radialGradient>
              </defs>
              <ellipse cx="120" cy="140" rx="90" ry="110" fill="url(#baymaxGlow)"/>

              {/* Baymax Body */}
              <ellipse cx="120" cy="170" rx="64" ry="72" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.7)" strokeWidth="2"/>
              
              {/* Head */}
              <ellipse cx="120" cy="65" rx="34" ry="28" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.85)" strokeWidth="2"/>
              <ellipse cx="106" cy="65" rx="5" ry="4.5" fill="#111827"/>
              <ellipse cx="134" cy="65" rx="5" ry="4.5" fill="#111827"/>
              <line x1="106" y1="65" x2="134" y2="65" stroke="rgba(255,255,255,0.9)" strokeWidth="1.8"/>

              {/* Arms */}
              <ellipse cx="44" cy="155" rx="16" ry="46" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" transform="rotate(-15,44,155)"/>
              <ellipse cx="196" cy="155" rx="16" ry="46" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" transform="rotate(15,196,155)"/>

              {/* Healthcare Chip Port (Flashing Red/Cyan) */}
              <circle cx="120" cy="150" r="14" fill="rgba(229,56,59,0.2)" stroke="#E5383B" strokeWidth="2" className="animate-pulse"/>
              <circle cx="120" cy="150" r="7" fill="#2DD4BF"/>
              <text x="120" y="153" textAnchor="middle" fill="#111827" fontSize="7" fontWeight="bold">CHIP</text>

              {/* Legs */}
              <ellipse cx="98" cy="246" rx="18" ry="24" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5"/>
              <ellipse cx="142" cy="246" rx="18" ry="24" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5"/>
            </svg>
          </div>

          {/* Baymax Dialogue Box */}
          <div className="p-3 bg-teal-950/40 border border-teal-500/30 rounded z-10">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
              <span className="font-cond text-[9px] font-bold uppercase tracking-widest text-teal-300">Baymax Voice Output</span>
            </div>
            <p className="font-cond text-xs text-white/90 italic leading-relaxed">
              {audioFeedback}
            </p>
          </div>
        </div>

        {/* Right Column: Detailed Panels based on activeTab (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          
          {activeTab === 'vitals' && (
            <div className="flex flex-col gap-4 flex-1">
              
              {/* Hiro's Biosensors */}
              <div className="p-4 rounded border border-white/10 bg-black/30 backdrop-blur-md">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-cond text-xs font-bold uppercase tracking-[0.2em] text-white/80">
                    Patient: Hiro Hamada — Vitals Inside Void
                  </h3>
                  <span className="font-cond text-[9px] font-bold uppercase text-emerald-400">Stable</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-black/30 p-2.5 rounded border border-white/10">
                    <span className="block text-[8px] font-cond font-semibold uppercase text-white/50 tracking-wider">Heart Rate</span>
                    <span className="text-xl font-oswald font-bold text-teal-300">114 <span className="text-xs font-normal text-white/40">BPM</span></span>
                    <span className="block text-[7.5px] font-cond text-amber-400 mt-0.5">Elevated (Combat/Stress)</span>
                  </div>

                  <div className="bg-black/30 p-2.5 rounded border border-white/10">
                    <span className="block text-[8px] font-cond font-semibold uppercase text-white/50 tracking-wider">Oxygen SpO2</span>
                    <span className="text-xl font-oswald font-bold text-white">96 <span className="text-xs font-normal text-white/40">%</span></span>
                    <span className="block text-[7.5px] font-cond text-emerald-400 mt-0.5">Atmosphere breathable</span>
                  </div>

                  <div className="bg-black/30 p-2.5 rounded border border-white/10">
                    <span className="block text-[8px] font-cond font-semibold uppercase text-white/50 tracking-wider">Body Temp</span>
                    <span className="text-xl font-oswald font-bold text-white">36.4 <span className="text-xs font-normal text-white/40">°C</span></span>
                    <span className="block text-[7.5px] font-cond text-teal-300 mt-0.5">Slight chill in rift</span>
                  </div>

                  <div className="bg-black/30 p-2.5 rounded border border-white/10">
                    <span className="block text-[8px] font-cond font-semibold uppercase text-white/50 tracking-wider">Adrenaline</span>
                    <span className="text-xl font-oswald font-bold text-red-hero">HIGH</span>
                    <span className="block text-[7.5px] font-cond text-red-hero mt-0.5">Hyper-focus active</span>
                  </div>
                </div>
              </div>

              {/* Interactive Pain Scale 1-10 */}
              <div className="p-4 rounded border border-white/10 bg-black/30 backdrop-blur-md flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-cond text-xs font-bold uppercase tracking-[0.2em] text-white/80">
                      "On a scale of 1 to 10, how would you rate your pain?"
                    </h3>
                    <span className="font-oswald text-base font-bold text-teal-300">
                      Level: {painLevel} / 10
                    </span>
                  </div>
                  <p className="font-cond text-[10px] text-white/50 tracking-wide mb-3">
                    Click a level below to report Hiro's condition to Baymax.
                  </p>

                  {/* Buttons 1-10 */}
                  <div className="grid grid-cols-10 gap-1.5 mb-4">
                    {Array.from({ length: 11 }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => handlePainSelect(i)}
                        className={`h-10 rounded font-oswald text-xs font-bold transition-all flex flex-col items-center justify-center border ${
                          painLevel === i
                            ? 'bg-teal-400 text-slate-900 border-teal-300 scale-105 shadow-md'
                            : i === 0
                            ? 'bg-white/5 text-white/60 border-white/15 hover:border-white/40'
                            : i <= 3
                            ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20 hover:border-emerald-500/50'
                            : i <= 7
                            ? 'bg-amber-500/10 text-amber-300 border-amber-500/20 hover:border-amber-500/50'
                            : 'bg-red-500/10 text-red-300 border-red-500/20 hover:border-red-500/50'
                        }`}
                      >
                        <span>{i}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <span className="font-cond text-[10.5px] text-white/70 flex items-center gap-1.5">
                    {healingApplied ? (
                      <>
                        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#2dd4bf" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>Treatment administered successfully</span>
                      </>
                    ) : (
                      'Need comfort protocol?'
                    )}
                  </span>
                  <button
                    onClick={applyTreatment}
                    disabled={painLevel === 0}
                    className="px-4 py-2 rounded bg-teal-500 hover:bg-teal-400 text-slate-950 font-cond text-xs font-bold uppercase tracking-widest transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow"
                  >
                    Administer Hug & Warmth
                  </button>
                </div>
              </div>

            </div>
          )}

          {activeTab === 'chip' && (
            <div className="p-5 rounded border border-white/10 bg-black/30 backdrop-blur-md flex-1 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-cond text-sm font-bold uppercase tracking-widest text-white">
                    Tadashi Hamada's Healthcare Chip
                  </h3>
                  <p className="font-cond text-xs text-teal-300 mt-0.5">
                    UUID: TH-BAYMAX-HEALTHCARE-01 · Restored in Sector 0
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded bg-teal-500/20 border border-teal-500/30 text-teal-300 text-[10px] font-cond font-bold tracking-widest uppercase">
                  100% Intact
                </span>
              </div>

              <p className="font-cond text-xs text-white/70 leading-relaxed">
                When Hiro jumped back through the closing gate, he held this chip tightly in his fist. Containing over 10,000 medical procedures, Tadashi's voice recordings, and the core empathetic personality matrix, this chip is the true soul of Baymax.
              </p>

              <div className="grid grid-cols-2 gap-3 mt-1">
                <div className="p-3 bg-black/40 border border-white/10 rounded">
                  <span className="font-cond text-[9px] font-bold uppercase tracking-wider text-white/50 block">Registered Caregiver</span>
                  <span className="font-oswald text-sm font-bold text-white block mt-0.5">Tadashi Hamada</span>
                  <span className="font-cond text-[8.5px] text-teal-300">San Fransokyo Tech Institute</span>
                </div>
                <div className="p-3 bg-black/40 border border-white/10 rounded">
                  <span className="font-cond text-[9px] font-bold uppercase tracking-wider text-white/50 block">Current Primary Patient</span>
                  <span className="font-oswald text-sm font-bold text-white block mt-0.5">Hiro Hamada</span>
                  <span className="font-cond text-[8.5px] text-amber-300">Status: In Transit (Portal Rift)</span>
                </div>
                <div className="p-3 bg-black/40 border border-white/10 rounded">
                  <span className="font-cond text-[9px] font-bold uppercase tracking-wider text-white/50 block">Combat Overrides</span>
                  <span className="font-oswald text-sm font-bold text-red-hero block mt-0.5">DISABLED</span>
                  <span className="font-cond text-[8.5px] text-white/40">Only protective shielding allowed</span>
                </div>
                <div className="p-3 bg-black/40 border border-white/10 rounded">
                  <span className="font-cond text-[9px] font-bold uppercase tracking-wider text-white/50 block">Rocket Fist Telemetry</span>
                  <span className="font-oswald text-sm font-bold text-teal-300 block mt-0.5">Detached / Scrapped</span>
                  <span className="font-cond text-[8.5px] text-white/40">Hiro looking for salvage parts</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'armor' && (
            <div className="p-5 rounded border border-white/10 bg-black/30 backdrop-blur-md flex-1 flex flex-col gap-4">
              <h3 className="font-cond text-sm font-bold uppercase tracking-widest text-white">
                Carbon-Fiber Armor Status & Thruster Systems
              </h3>
              
              <div className="space-y-3">
                {[
                  { part: 'Inflatable Vinyl Hull', status: 'Sealed (Small micro-punctures patched by Hiro)', hp: 88, color: 'bg-teal-400' },
                  { part: 'Chest Reinforcement Plate', status: 'Secured over Chip Port', hp: 95, color: 'bg-emerald-400' },
                  { part: 'Left Thruster Gauntlet', status: 'Operational for stability leaps', hp: 42, color: 'bg-amber-400' },
                  { part: 'Right Gauntlet (Rocket Fist)', status: 'Expended during Callaghan rescue', hp: 0, color: 'bg-red-hero' },
                  { part: 'Back Flight Wings', status: 'Debris damage — gliding only', hp: 30, color: 'bg-amber-400' },
                ].map((item, i) => (
                  <div key={i} className="p-2.5 bg-black/40 rounded border border-white/10">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-cond text-xs font-bold text-white tracking-wide">{item.part}</span>
                      <span className="font-oswald text-xs text-white/80">{item.hp}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.hp}%` }} />
                    </div>
                    <span className="font-cond text-[8.5px] text-white/50 mt-1 block">{item.status}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

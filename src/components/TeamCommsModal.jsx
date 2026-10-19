import { CharIcon } from './BottomBar'

const TRANSMISSIONS = {
  'baymax': {
    name: 'Baymax',
    role: 'Healthcare Companion',
    color: '#2DD4BF',
    location: 'Inside Void · Sector 03',
    status: 'Healthcare Chip Active · Battery 34%',
    message: 'Hiro Hamada is my patient. His physiological indicators show elevated adrenaline, but clear cognitive focus. He refused to leave my shell behind. I have updated my diagnostic protocol: companionship is essential to holistic wellness. We will exit together.',
    audioQuote: '"I cannot deactivate until you are satisfied with your care. And you are not safe yet, Hiro."',
  },
  'hiro': {
    name: 'Hiro Hamada',
    role: 'Robotics Prodigy & Leader',
    color: '#E5383B',
    location: 'Inside Void · Sector 03',
    status: 'Tethered to Baymax · Scavenging Microbots',
    message: 'Everyone, do not shut that portal down! I found Baymax. Tadashi\'s chip worked — he is back online. The physics in here are completely inverted, but we are building a path across the glitch fields. Keep the San Fransokyo emitter coils hot. We are coming home.',
    audioQuote: '"I wasn\'t going to lose him twice. We solve this together."',
  },
  'gogo': {
    name: 'Go Go Tomago',
    role: 'Magnetic Levitation Specialist',
    color: '#FBBF24',
    location: 'San Fransokyo Lab · Portal Emitter',
    status: 'Stabilizing Magnetic Induction Coils',
    message: 'Hiro! Stop talking and keep moving! Honey Lemon and I are redlining the lab\'s capacitors to keep the Krei Tech portal rings from grinding to a halt. The magnetic field is destabilizing at 3% per minute. Woman up and punch through that gate!',
    audioQuote: '"Stop whining, Hiro. We\'re holding the door open for you!"',
  },
  'honey-lemon': {
    name: 'Honey Lemon',
    role: 'Chemical Engineer',
    color: '#F472B6',
    location: 'San Fransokyo Lab · Emitter Base',
    status: 'Synthesizing Polymeric Void Sealant',
    message: 'Hiro, we can hear you! I just synthesized a pressurized hyper-cooled chemical compound to stop the portal generator from overheating! Wasabi is laser-cutting the thermal vents right now. Your telemetry signals just synced up with Baymax\'s heartbeat! Keep going!',
    audioQuote: '"It worked! Hiro, your signals are synchronized! Don\'t give up!"',
  },
  'wasabi': {
    name: 'Wasabi',
    role: 'Plasma Laser Physicist',
    color: '#34D399',
    location: 'San Fransokyo Lab · Control Console',
    status: 'Calibrating Plasma Exhaust Array',
    message: 'There is literally NO PROTOCOL for jumping BACK into a dimensional singularity, Hiro! I had my emergency checklist color-coded and everything! ... But hearing Baymax\'s voice just now? Okay, I\'m not crying, it\'s just chemical vapors. Plasma beam is locked onto your coordinates!',
    audioQuote: '"I have a very detailed spreadsheet, and 100% of it says you two are getting out of there!"',
  },
  'fred': {
    name: 'Fred',
    role: 'Kaiju Enthusiast & Power Generator Backup',
    color: '#FB923C',
    location: 'San Fransokyo Lab · Generator Deck',
    status: 'Running Auxiliary Power Batteries',
    message: 'DUDE!! Leaping back into the portal rift with the healthcare chip?! That is the single most legendary superhero maneuver in the history of comic books! I\'m hand-cranking the backup diesel generator while wearing the Fredzilla suit! Bring our giant marshmallow home!',
    audioQuote: '"Fredzilla power is at maximum! Bust through that cosmic wall, guys!"',
  },
}

export default function TeamCommsModal({ charId, onClose, onSelectChar }) {
  const char = TRANSMISSIONS[charId] || TRANSMISSIONS['hiro']

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md select-none animate-fadeIn">
      <div
        className="w-full max-w-xl rounded-lg border border-white/20 bg-slate-900/95 shadow-[0_12px_50px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden text-white"
        style={{ borderColor: `${char.color}50` }}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-black/40">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full animate-ping" style={{ background: char.color }} />
            <span className="font-cond text-[10px] font-bold uppercase tracking-[0.26em]" style={{ color: char.color }}>
              Dimensional Comms Frequency: Active Signal
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close transmission"
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Character switcher pills inside modal */}
        <div className="flex items-center gap-2 px-5 py-2.5 bg-black/30 border-b border-white/10 overflow-x-auto no-scrollbar">
          {Object.keys(TRANSMISSIONS).map(id => {
            const c = TRANSMISSIONS[id]
            const active = id === charId
            return (
              <button
                key={id}
                onClick={() => onSelectChar(id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-cond font-bold uppercase tracking-wider transition-all flex-shrink-0 ${
                  active
                    ? 'bg-white/20 text-white shadow-sm border border-white/30'
                    : 'text-white/40 hover:text-white/80 hover:bg-white/5'
                }`}
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <CharIcon id={id} />
                </div>
                <span>{c.name.split(' ')[0]}</span>
              </button>
            )
          })}
        </div>

        {/* Modal Body */}
        <div className="p-6 flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="font-cond text-xs text-white/50 tracking-wider uppercase">
                {char.role}
              </span>
              <h3 className="font-oswald text-2xl font-bold uppercase text-white mt-0.5" style={{ color: char.color }}>
                {char.name}
              </h3>
            </div>
            <div className="text-right">
              <span className="font-cond text-[9px] uppercase tracking-wider text-white/40 block">Location</span>
              <span className="font-cond text-xs font-semibold text-white/80">{char.location}</span>
            </div>
          </div>

          {/* Status pill */}
          <div className="p-2.5 rounded bg-black/40 border border-white/10 flex items-center justify-between text-xs font-cond">
            <span className="text-white/50">Current Status:</span>
            <span className="font-bold tracking-wide" style={{ color: char.color }}>{char.status}</span>
          </div>

          {/* Incoming message */}
          <div className="p-4 rounded border border-white/10 bg-black/30 flex flex-col gap-2">
            <span className="font-cond text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">
              Decrypted Transmission Stream
            </span>
            <p className="font-cond text-sm text-white/90 leading-relaxed">
              {char.message}
            </p>
          </div>

          {/* Character Quote Highlight */}
          <div className="p-3 rounded border border-dashed border-white/20 bg-white/5 flex items-center gap-3">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="text-white/40 flex-shrink-0">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
            </svg>
            <span className="font-cond text-xs text-white/80 italic">
              {char.audioQuote}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-white/10 bg-black/40 text-xs font-cond">
          <span className="text-white/40">SAN FRANSOKYO COMMS RELAY · 256-BIT ENCRYPTION</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded font-bold uppercase tracking-wider text-slate-900 bg-white hover:bg-white/90 transition-colors"
          >
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  )
}

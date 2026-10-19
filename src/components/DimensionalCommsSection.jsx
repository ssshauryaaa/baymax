import { useEffect, useRef, useState } from "react"
import { CharIcon } from "./BottomBar"

const TRANSMISSIONS = [
  {
    id: "baymax",
    name: "Baymax",
    role: "Healthcare Companion",
    color: "#2DD4BF",
    freq: "38.7 GHz",
    location: "Inside Void \u00b7 Sector 03",
    status: "Healthcare Chip Active \u00b7 Battery 34%",
    statusOk: true,
    message: "Hiro Hamada is my patient. His physiological indicators show elevated adrenaline, but clear cognitive focus. He refused to leave my shell behind. I have updated my diagnostic protocol: companionship is essential to holistic wellness. We will exit together.",
    audioQuote: "I cannot deactivate until you are satisfied with your care. And you are not safe yet, Hiro.",
    signalStrength: 87,
  },
  {
    id: "hiro",
    name: "Hiro Hamada",
    role: "Robotics Prodigy & Leader",
    color: "#E5383B",
    freq: "21.1 GHz",
    location: "Inside Void \u00b7 Sector 03",
    status: "Tethered to Baymax \u00b7 Scavenging Microbots",
    statusOk: true,
    message: "Everyone, do not shut that portal down! I found Baymax. Tadashi chip worked. He is back online. The physics in here are completely inverted, but we are building a path across the glitch fields. Keep the San Fransokyo emitter coils hot. We are coming home.",
    audioQuote: "I was not going to lose him twice. We solve this together.",
    signalStrength: 73,
  },
  {
    id: "gogo",
    name: "Go Go Tomago",
    role: "Magnetic Levitation Specialist",
    color: "#FBBF24",
    freq: "14.4 GHz",
    location: "San Fransokyo Lab \u00b7 Portal Emitter",
    status: "Stabilizing Magnetic Induction Coils",
    statusOk: false,
    message: "Hiro! Stop talking and keep moving! Honey Lemon and I are redlining the lab capacitors to keep the Krei Tech portal rings from grinding to a halt. The magnetic field is destabilizing at 3% per minute. Woman up and punch through that gate!",
    audioQuote: "Stop whining, Hiro. We are holding the door open for you!",
    signalStrength: 94,
  },
  {
    id: "honey-lemon",
    name: "Honey Lemon",
    role: "Chemical Engineer",
    color: "#F472B6",
    freq: "55.2 GHz",
    location: "San Fransokyo Lab \u00b7 Emitter Base",
    status: "Synthesizing Polymeric Void Sealant",
    statusOk: true,
    message: "Hiro, we can hear you! I just synthesized a pressurized hyper-cooled chemical compound to stop the portal generator from overheating! Wasabi is laser-cutting the thermal vents right now. Your telemetry signals just synced up with Baymax heartbeat! Keep going!",
    audioQuote: "It worked! Hiro, your signals are synchronized! Do not give up!",
    signalStrength: 61,
  },
  {
    id: "wasabi",
    name: "Wasabi",
    role: "Plasma Laser Physicist",
    color: "#34D399",
    freq: "9.6 GHz",
    location: "San Fransokyo Lab \u00b7 Control Console",
    status: "Calibrating Plasma Exhaust Array",
    statusOk: true,
    message: "There is literally NO PROTOCOL for jumping BACK into a dimensional singularity, Hiro! I had my emergency checklist color-coded and everything! But hearing Baymax voice just now? Okay, I am not crying, it is just chemical vapors. Plasma beam is locked onto your coordinates!",
    audioQuote: "I have a very detailed spreadsheet, and 100% of it says you two are getting out of there!",
    signalStrength: 79,
  },
  {
    id: "fred",
    name: "Fred",
    role: "Kaiju Enthusiast & Power Backup",
    color: "#FB923C",
    freq: "2.4 GHz",
    location: "San Fransokyo Lab \u00b7 Generator Deck",
    status: "Running Auxiliary Power Batteries",
    statusOk: true,
    message: "DUDE!! Leaping back into the portal rift with the healthcare chip?! That is the single most legendary superhero maneuver in the history of comic books! I am hand-cranking the backup diesel generator while wearing the Fredzilla suit! Bring our giant marshmallow home!",
    audioQuote: "Fredzilla power is at maximum! Bust through that cosmic wall, guys!",
    signalStrength: 52,
  },
]

function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

function SignalMeter({ value, color }) {
  const bars = 5
  const filled = Math.ceil((value / 100) * bars)
  return (
    <div className="flex items-end gap-[2px]">
      {Array.from({ length: bars }).map((_, i) => (
        <div
          key={i}
          className="rounded-sm transition-all duration-700"
          style={{
            width: 3,
            height: 4 + i * 2,
            background: i < filled ? color : "rgba(255,255,255,0.15)",
          }}
        />
      ))}
    </div>
  )
}

function CommsCard({ char, index, activeId, onSelect }) {
  const [ref, visible] = useScrollReveal(0.1)
  const isActive = activeId === char.id

  const handleSpeak = (e) => {
    e.stopPropagation()
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel()
      const utter = new SpeechSynthesisUtterance(char.audioQuote)
      utter.rate = 0.95
      utter.pitch = char.id === "baymax" ? 0.7 : 1.05
      window.speechSynthesis.speak(utter)
    }
  }

  return (
    <div
      ref={ref}
      className="transition-all duration-700 ease-out cursor-pointer group"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(28px) scale(0.97)",
        transitionDelay: `${index * 90}ms`,
      }}
      onClick={() => onSelect(isActive ? null : char.id)}
    >
      <div
        className="relative rounded border overflow-hidden transition-all duration-300"
        style={{
          borderColor: isActive ? char.color + "80" : "rgba(255,255,255,0.1)",
          background: isActive
            ? `linear-gradient(135deg, ${char.color}12 0%, rgba(14,24,38,0.95) 60%)`
            : "rgba(14,24,38,0.8)",
          boxShadow: isActive
            ? `0 0 28px ${char.color}20, 0 4px 20px rgba(0,0,0,0.5)`
            : "0 2px 12px rgba(0,0,0,0.3)",
        }}
      >
        {/* Scan line */}
        {isActive && (
          <div
            className="absolute inset-x-0 h-px pointer-events-none z-10"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${char.color}70 50%, transparent 100%)`,
              animation: "dcScanLine 2.5s linear infinite",
            }}
          />
        )}

        {/* Corner glow */}
        <div
          className="absolute top-0 right-0 w-20 h-20 pointer-events-none"
          style={{ background: `linear-gradient(225deg, ${char.color}18 0%, transparent 65%)` }}
        />

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            {/* Ping dot */}
            <div className="relative flex-shrink-0">
              <div
                className="w-2 h-2 rounded-full transition-colors duration-300"
                style={{ background: isActive ? char.color : "rgba(255,255,255,0.2)" }}
              />
              {isActive && (
                <div
                  className="absolute inset-0 rounded-full animate-ping"
                  style={{ background: char.color, opacity: 0.5 }}
                />
              )}
            </div>

            {/* Char icon circle */}
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center border flex-shrink-0 transition-all duration-300"
              style={{
                borderColor: isActive ? char.color + "70" : "rgba(255,255,255,0.15)",
                background: isActive ? char.color + "22" : "rgba(255,255,255,0.06)",
              }}
            >
              <div className="w-5 h-5"><CharIcon id={char.id} /></div>
            </div>

            {/* Name + role */}
            <div>
              <div
                className="font-oswald font-bold text-sm uppercase tracking-wide transition-colors duration-300 leading-tight"
                style={{ color: isActive ? char.color : "rgba(255,255,255,0.9)" }}
              >
                {char.name}
              </div>
              <div className="font-cond text-[9px] text-white/40 uppercase tracking-wider">{char.role}</div>
            </div>
          </div>

          {/* Right side: freq + signal */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end gap-1">
              <SignalMeter value={char.signalStrength} color={char.color} />
              <span
                className="font-cond text-[8px] font-bold uppercase tracking-wider tabular-nums"
                style={{ color: char.color + "cc" }}
              >
                {char.freq}
              </span>
            </div>
          </div>
        </div>

        {/* Status row */}
        <div className="flex items-center justify-between px-4 py-1.5 border-t border-b border-white/[0.05] bg-black/20">
          <span className="font-cond text-[9px] text-white/35 uppercase tracking-wider">{char.location}</span>
          <div className="flex items-center gap-1.5">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: char.statusOk ? "#34D399" : "#FBBF24" }}
            />
            <span className="font-cond text-[9px] text-white/40 uppercase tracking-wider">{char.status}</span>
          </div>
        </div>

        {/* Expandable body */}
        <div
          className="overflow-hidden transition-all duration-500 ease-in-out"
          style={{ maxHeight: isActive ? "320px" : "0px" }}
        >
          <div className="px-4 pt-4 pb-3 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${char.color}55, transparent)` }} />
              <span className="font-cond text-[8px] font-bold uppercase tracking-[0.25em] text-white/35">
                Decrypted Transmission
              </span>
              <div className="h-px flex-1" style={{ background: `linear-gradient(270deg, ${char.color}55, transparent)` }} />
            </div>

            <p className="font-cond text-sm text-white/85 leading-relaxed">{char.message}</p>

            {/* Quote + voice */}
            <div
              className="flex items-center justify-between gap-3 p-2.5 rounded border border-dashed"
              style={{ borderColor: char.color + "35", background: char.color + "08" }}
            >
              <span className="font-cond text-xs text-white/65 italic flex-1">&ldquo;{char.audioQuote}&rdquo;</span>
              <button
                onClick={handleSpeak}
                className="flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded font-cond font-bold text-[9px] uppercase tracking-wider border transition-all duration-200 hover:scale-105 active:scale-95"
                style={{ color: char.color, borderColor: char.color + "55", background: char.color + "15" }}
              >
                <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
                </svg>
                Voice
              </button>
            </div>
          </div>
        </div>

        {/* Collapsed preview */}
        {!isActive && (
          <div className="px-4 py-2.5 flex items-center justify-between">
            <p className="font-cond text-xs text-white/40 truncate flex-1 pr-3">
              {char.message.slice(0, 75)}&hellip;
            </p>
            <svg
              viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2"
              className="flex-shrink-0 text-white/25 group-hover:text-white/55 transition-colors"
            >
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>
        )}
      </div>
    </div>
  )
}

export default function DimensionalCommsSection() {
  const [activeId, setActiveId] = useState(null)
  const [headerRef, headerVisible] = useScrollReveal(0.05)

  return (
    <section id="dimensional-comms" className="flex-shrink-0 w-full px-4 pt-6 pb-8">
      <style>{`
        @keyframes dcScanLine {
          0%   { top: 0%; opacity: 0; }
          8%   { opacity: 1; }
          90%  { opacity: 0.7; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>

      {/* Section header */}
      <div
        ref={headerRef}
        className="mb-5 flex flex-col gap-3 transition-all duration-700"
        style={{
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? "translateY(0)" : "translateY(-16px)",
        }}
      >
        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="relative w-3 h-3">
              <div className="absolute inset-0 rounded-full border border-red-400/60 animate-ping opacity-60" />
              <div className="absolute inset-[3px] rounded-full bg-red-500/80" />
            </div>
            <span className="font-cond text-[9px] font-bold uppercase tracking-[0.35em] text-white/35">Live Feed</span>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        </div>

        {/* Title row */}
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-cond text-[9.5px] font-bold uppercase tracking-[0.28em] text-red-400 mb-1">
              San Fransokyo &middot; Comms Relay
            </p>
            <h2
              className="font-oswald font-black uppercase leading-none tracking-tight text-white"
              style={{ fontSize: "clamp(1.3rem, 2.8vw, 1.9rem)" }}
            >
              Dimensional Comms Frequency
            </h2>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded border border-white/12 bg-black/30 flex-shrink-0">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-cond text-[9px] font-bold uppercase tracking-wider text-white/55">
              6 Channels Active
            </span>
          </div>
        </div>

        <p className="font-cond text-xs text-white/40 leading-relaxed">
          256-bit encrypted transmissions from all team members. Select a channel to decrypt the full signal.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-2.5">
        {TRANSMISSIONS.map((char, i) => (
          <CommsCard
            key={char.id}
            char={char}
            index={i}
            activeId={activeId}
            onSelect={setActiveId}
          />
        ))}
      </div>

      {/* Footer bar */}
      <div className="mt-5 flex items-center justify-center gap-3">
        <div className="h-px flex-1 bg-white/8" />
        <span className="font-cond text-[8px] uppercase tracking-[0.3em] text-white/20">
          San Fransokyo Comms Relay &middot; 256-bit Encrypted &middot; All Channels Secure
        </span>
        <div className="h-px flex-1 bg-white/8" />
      </div>
    </section>
  )
}

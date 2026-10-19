import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] py-12 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 40% 60% at 50% 0%, rgba(45,212,191,0.04), transparent)' }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Branding */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-portal-teal animate-pulse" />
              <span className="font-display font-bold text-white tracking-wide">Beyond the Portal</span>
            </div>
            <span className="font-mono text-[9px] text-white/30 tracking-[0.2em] uppercase">
              Hiro &amp; Baymax — Fan Story Project
            </span>
          </div>

          {/* Center quote */}
          <div className="text-center">
            <p className="font-mono text-[11px] text-portal-teal/60 italic">
              "I cannot deactivate until you say you are satisfied with your care."
            </p>
            <p className="font-mono text-[9px] text-white/25 mt-1 tracking-wider">— Baymax, Healthcare Companion 2.0</p>
          </div>

          {/* Disclaimer */}
          <div className="text-right max-w-xs">
            <p className="font-mono text-[8px] text-white/25 leading-relaxed">
              Fan-made project. Not affiliated with or endorsed by Disney.
              All Big Hero 6 character rights belong to their respective owners.
            </p>
          </div>
        </div>

        {/* Bottom divider with portal glow */}
        <div className="mt-8 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(45,212,191,0.3), transparent)' }}
        />
        <div className="mt-4 flex items-center justify-center">
          <span className="font-mono text-[8px] text-white/15 tracking-[0.3em] uppercase">
            Portal Dimension — Sector Unknown — All Systems Nominal
          </span>
        </div>
      </div>
    </footer>
  )
}

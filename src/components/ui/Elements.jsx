import { motion } from 'framer-motion'

/* ─── Reusable status badge ─────────────────────────────────── */
const STATUS_STYLES = {
  CRITICAL: 'text-red-400  border-red-500/30  bg-red-500/10',
  DANGER:   'text-amber-400 border-amber-500/30 bg-amber-500/10',
  SEARCHING:'text-purple-400 border-purple-500/30 bg-purple-500/10',
  RESTORED: 'text-teal-400 border-teal-500/30 bg-teal-500/10',
  ACTIVE:   'text-violet-400 border-violet-500/30 bg-violet-500/10',
  COMPLETE: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
}

export function Badge({ children, variant = 'default', className = '' }) {
  const base = 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded font-mono text-[10px] tracking-widest uppercase border'
  const styles = STATUS_STYLES[variant] || 'text-white/60 border-white/15 bg-white/5'
  return (
    <span className={`${base} ${styles} ${className}`}>
      <span className="w-1 h-1 rounded-full bg-current opacity-70 animate-pulse" />
      {children}
    </span>
  )
}

/* ─── Pill tag ──────────────────────────────────────────────── */
export function Tag({ children, color }) {
  return (
    <span
      className="px-2 py-0.5 rounded-full font-mono text-[9px] tracking-wider uppercase border"
      style={{
        color: color || 'rgba(255,255,255,0.5)',
        borderColor: color ? `${color}40` : 'rgba(255,255,255,0.12)',
        background: color ? `${color}10` : 'rgba(255,255,255,0.04)',
      }}
    >
      {children}
    </span>
  )
}

/* ─── Ghost button ──────────────────────────────────────────── */
export function GhostButton({ children, onClick, accent, className = '' }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={`px-5 py-2.5 rounded font-display font-semibold text-sm tracking-wide border transition-all duration-200 ${className}`}
      style={{
        borderColor: accent ? `${accent}50` : 'rgba(255,255,255,0.2)',
        color: accent || '#fff',
        background: accent ? `${accent}10` : 'rgba(255,255,255,0.04)',
      }}
    >
      {children}
    </motion.button>
  )
}

/* ─── Section label ─────────────────────────────────────────── */
export function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="w-6 h-px bg-portal-teal" />
      <span className="font-mono text-[10px] text-portal-teal/70 tracking-[0.3em] uppercase">
        {children}
      </span>
    </div>
  )
}

/* ─── Divider ────────────────────────────────────────────────── */
export function Divider({ accent }) {
  return (
    <div
      className="h-px w-full opacity-20"
      style={{ background: `linear-gradient(90deg, transparent, ${accent || '#2DD4BF'}, transparent)` }}
    />
  )
}

/* ─── HUD stat card ─────────────────────────────────────────── */
export function StatCard({ label, value, sub, accent }) {
  return (
    <div
      className="p-3 rounded border glass-light hover-glow transition-all duration-300"
      style={{ borderColor: `${accent || '#2DD4BF'}25` }}
    >
      <span className="block font-mono text-[9px] text-white/40 tracking-widest uppercase mb-1">
        {label}
      </span>
      <span
        className="block font-display text-xl font-bold leading-none"
        style={{ color: accent || '#2DD4BF' }}
      >
        {value}
      </span>
      {sub && (
        <span className="block font-mono text-[9px] text-white/35 mt-1">{sub}</span>
      )}
    </div>
  )
}

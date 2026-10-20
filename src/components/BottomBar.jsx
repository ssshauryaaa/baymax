// Character icon SVGs (outline style matching reference)
export function CharIcon({ id }) {
  switch (id) {
    case 'baymax':
      return (
        <svg viewBox="0 0 40 40" width="28" height="28">
          <ellipse cx="20" cy="24" rx="10" ry="11" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <ellipse cx="20" cy="12" rx="7.5" ry="6.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="16" cy="12" r="1.5" fill="currentColor" />
          <circle cx="24" cy="12" r="1.5" fill="currentColor" />
          <line x1="16" y1="12" x2="24" y2="12" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      )
    case 'hiro':
      return (
        <svg viewBox="0 0 40 40" width="28" height="28">
          <circle cx="20" cy="15" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M 12 36 Q 12 26 20 26 Q 28 26 28 36" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M 13 11 Q 20 6 27 11" fill="none" stroke="currentColor" strokeWidth="1.7" />
        </svg>
      )
    case 'honey-lemon':
      return (
        <svg viewBox="0 0 40 40" width="28" height="28">
          <circle cx="20" cy="15" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M 12 36 Q 12 26 20 26 Q 28 26 28 36" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="29" cy="23" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      )
    case 'gogo':
      return (
        <svg viewBox="0 0 40 40" width="28" height="28">
          <circle cx="20" cy="15" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M 12 36 Q 12 26 20 26 Q 28 26 28 36" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="16.5" cy="14" r="1.4" fill="currentColor" />
          <circle cx="23.5" cy="14" r="1.4" fill="currentColor" />
        </svg>
      )
    case 'wasabi':
      return (
        <svg viewBox="0 0 40 40" width="28" height="28">
          <circle cx="20" cy="15" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M 12 36 Q 12 26 20 26 Q 28 26 28 36" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <line x1="14" y1="14" x2="26" y2="14" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      )
    case 'fred':
      return (
        <svg viewBox="0 0 40 40" width="28" height="28">
          <circle cx="20" cy="15" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M 12 36 Q 12 26 20 26 Q 28 26 28 36" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M 14 10.5 Q 20 5 26 10.5" fill="currentColor" opacity="0.6" />
        </svg>
      )
    default:
      return null
  }
}

export default function BottomBar({ audioOn, toggle }) {
  return (
    <footer className="flex items-center justify-between flex-shrink-0 h-10 px-5 border-t border-white/10 bg-black/25 backdrop-blur-sm z-20">

      {/* ── AUDIO TOGGLE (LEFT) ───────────────────────── */}
      <button
        id="audio-ctrl"
        onClick={toggle}
        aria-label="Toggle audio"
        className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors duration-200 group"
      >
        {audioOn ? (
          <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
          </svg>
        )}
        <span className="text-[9.5px] font-cond font-semibold tracking-[0.2em] uppercase">
          Audio: {audioOn ? 'On' : 'Off'}
        </span>
      </button>

      {/* ── LEGAL DROPDOWN (RIGHT) ─────────────────────── */}
      <a
        href="#"
        id="legal-link"
        className="text-white/50 hover:text-white text-[9.5px] font-cond font-semibold tracking-[0.2em] uppercase transition-colors duration-200 flex items-center gap-1"
      >
        Legal
        <svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor">
          <path d="M7 10l5 5 5-5z"/>
        </svg>
      </a>
    </footer>
  )
}

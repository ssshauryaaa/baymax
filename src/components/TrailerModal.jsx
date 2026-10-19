import { useEffect } from 'react'

export default function TrailerModal({ onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      id="trailerModal"
      role="dialog"
      aria-modal="true"
      aria-label="Watch Trailer"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="relative bg-[#1a2530] border border-white/15 rounded-lg shadow-2xl overflow-hidden"
        style={{ width: 640, maxWidth: '90vw' }}>

        {/* Close button */}
        <button
          id="modal-close"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 text-white/70 hover:text-white flex items-center justify-center transition-all duration-200"
        >
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Faux video area */}
        <div
          className="flex flex-col items-center justify-center gap-4 text-white"
          style={{ aspectRatio: '16/9', background: 'linear-gradient(135deg, #0d1b24 0%, #1a2e3f 100%)' }}
        >
          {/* Play button */}
          <button
            aria-label="Play trailer"
            className="w-20 h-20 rounded-full border-2 border-white/50 flex items-center justify-center hover:bg-white/10 hover:border-white transition-all duration-300 group"
          >
            <svg viewBox="0 0 24 24" width="36" height="36" fill="white" className="ml-1 group-hover:scale-110 transition-transform">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
          <div className="text-center">
            <p className="font-oswald font-semibold text-xl tracking-widest uppercase text-white">Big Hero 6</p>
            <p className="font-cond text-white/50 text-sm tracking-wider uppercase mt-0.5">Official Trailer</p>
          </div>
          <p className="text-white/25 text-xs font-cond tracking-wider">
            Add your trailer embed or video URL here
          </p>
        </div>
      </div>
    </div>
  )
}

export default function BigHero6Banner() {
  return (
    <div
      id="disney-bh6-banner"
      className="w-full bg-[#d62027] flex flex-col items-center px-4 pt-3.5 pb-3 select-none border-b border-black/20 shadow-lg flex-shrink-0"
      style={{
        background: 'linear-gradient(180deg, #df2229 0%, #d62027 60%, #c51c22 100%)',
      }}
    >
      {/* ── DISNEY WORDMARK (FROM PUBLIC FOLDER) ───────── */}
      <div className="w-20 mb-1 flex justify-center">
        <img
          src="/disney.png"
          onError={(e) => {
            if (!e.target.dataset.tried) {
              e.target.dataset.tried = 'true';
              e.target.src = '/disneyremovebg.png';
            }
          }}
          alt="Disney"
          className="w-full h-auto object-contain brightness-0 invert drop-shadow-sm"
        />
      </div>

      {/* ── BIG HERO 6 LOGO GRAPHIC ────────────────────── */}
      <div className="w-full max-w-[160px] flex flex-col items-center">
        <svg
          viewBox="0 0 140 185"
          className="w-full h-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
          fill="white"
        >
          {/* ── "BIG" ──────────────────────── */}
          {/* 'B' */}
          <path d="M 0 0 L 32 0 Q 42 0 42 7.5 L 42 12 Q 42 18 36 19 Q 44 20 44 28 L 44 34 Q 44 42 32 42 L 0 42 Z M 13 8.5 L 26 8.5 Q 30 8.5 30 12 Q 30 15 26 15 L 13 15 Z M 13 25 L 27 25 Q 31 25 31 29 Q 31 33.5 27 33.5 L 13 33.5 Z" />
          {/* 'I' */}
          <rect x="50" y="0" width="15" height="42" />
          {/* 'G' */}
          <path d="M 78 0 L 136 0 L 136 11 L 91 11 L 91 31 L 123 31 L 123 23 L 108 23 L 108 14 L 136 14 L 136 42 L 78 42 Q 74 42 74 38 L 74 4 Q 74 0 78 0 Z" />

          {/* ── "HERO" ─────────────────────── */}
          {/* 'H' */}
          <path d="M 0 48 L 12.5 48 L 12.5 63.5 L 21.5 63.5 L 21.5 48 L 34 48 L 34 90 L 21.5 90 L 21.5 74.5 L 12.5 74.5 L 12.5 90 L 0 90 Z" />
          {/* 'E' */}
          <path d="M 39 48 L 68 48 L 68 59 L 51 59 L 51 64 L 66 64 L 66 73.5 L 51 73.5 L 51 79 L 68 79 L 68 90 L 39 90 Z" />
          {/* 'R' */}
          <path d="M 73 48 L 96 48 Q 104 48 104 56 L 104 62 Q 104 68 97 70 L 104 90 L 91 90 L 85 71 L 85 71 L 85 90 L 73 90 Z M 85 58 L 92 58 Q 94 58 94 61 Q 94 63.5 92 63.5 L 85 63.5 Z" />
          {/* 'O' */}
          <path d="M 112 48 L 136 48 Q 140 48 140 52 L 140 86 Q 140 90 136 90 L 112 90 Q 108 90 108 86 L 108 52 Q 108 48 112 48 Z M 120 59 L 128 59 Q 129 59 129 61 L 129 77 Q 129 79 128 79 L 120 79 Q 119 79 119 77 L 119 61 Q 119 59 120 59 Z" />

          {/* ── "6" (THE ICONIC STENCIL 6) ── */}
          {/* Outer shape of the 6 with top hook and square-rounded bottom */}
          <path
            d="M 14 98
               L 128 98
               Q 138 98 138 104
               L 138 122
               L 36 122
               L 36 130
               L 130 130
               Q 140 130 140 138
               L 140 174
               Q 140 184 130 184
               L 12 184
               Q 0 184 0 172
               L 0 110
               Q 0 98 14 98 Z"
          />

          {/* Red horizontal slit / cutout through the lower loop of 6 */}
          <rect x="36" y="145" width="76" height="18" rx="2" fill="#d62027" />

          {/* Horizontal cross-beam inside the loop of the 6 */}
          <rect x="36" y="152" width="76" height="4" fill="#ffffff" />
        </svg>
      </div>

      {/* ── RELEASE INFO ─────────────────────────────────── */}
      <div className="flex flex-col items-center mt-3 tracking-widest text-center">
        <span
          className="text-white font-cond font-bold text-[10px] tracking-[0.24em] uppercase"
          style={{ textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}
        >
          In Theatres
        </span>
        <span
          className="text-white font-oswald font-black text-[16px] tracking-[0.14em] uppercase leading-none mt-0.5"
          style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}
        >
          October 24
        </span>
      </div>

      {/* ── 3D & REALD BADGE ──────────────────────────────── */}
      <div className="flex items-center justify-center gap-1 mt-2.5 text-white/90">
        <span className="font-cond font-bold text-[8.5px] tracking-wider uppercase">In</span>
        <span className="font-oswald font-black text-[11px] leading-none tracking-tight">3D</span>
        <span className="font-cond font-semibold text-[7.5px] text-white/70 tracking-wider uppercase ml-0.5 mr-0.5">and</span>
        <span className="flex items-center font-cond font-semibold text-[8px] tracking-wide uppercase">
          real
          <span className="inline-flex items-center justify-center border border-white/80 rounded-full w-3 h-3 text-[7px] font-bold mx-0.5 leading-none">
            D
          </span>
          3D
        </span>
      </div>
    </div>
  )
}

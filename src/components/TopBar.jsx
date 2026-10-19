import { motion } from 'framer-motion'

export default function TopBar({
  currentPage = 'story',
  setCurrentPage = () => {},
  onOpenComms = () => {},
  showBaymaxBanner = false,
  setShowBaymaxBanner = () => {},
}) {
  const TABS = [
    { id: 'story', label: 'Story', num: '01' },
    { id: 'diagnostics', label: 'Care Hub', num: '02' },
    { id: 'codex', label: 'Codex', num: '03' },
    { id: 'radar', label: 'Radar', num: '04' },
    { id: 'comms', label: 'Comms', num: '05' },
  ]

  return (
    <header
      role="banner"
      aria-label="Main Navigation"
      className="mx-2 sm:mx-3 mt-2 sm:mt-2.5 mb-1.5 h-12 rounded-xl flex items-center justify-between px-3 sm:px-5 z-40 select-none flex-shrink-0 transition-all duration-300"
      style={{
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.06) 100%)',
        backdropFilter: 'blur(20px) saturate(160%)',
        WebkitBackdropFilter: 'blur(20px) saturate(160%)',
        border: '1px solid rgba(255, 255, 255, 0.22)',
        boxShadow: '0 8px 32px 0 rgba(15, 23, 42, 0.18), inset 0 1px 1px 0 rgba(255, 255, 255, 0.35)',
      }}
    >
      {/* ── LEFT: BRAND / LIVE TICKER ─────────────────────────────── */}
      <div className="flex items-center gap-3 min-w-0 flex-1 max-w-[420px] xl:max-w-[480px] mr-3 overflow-hidden">
        
        {/* Big Hero 6 Red Micro-Badge */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="relative flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-[#d62027] animate-ping absolute" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#d62027] relative shadow-[0_0_8px_#d62027]" />
          </div>
          <span className="font-oswald font-black text-xs uppercase tracking-wider text-white px-2 py-0.5 rounded bg-[#d62027] shadow-sm">
            BH6
          </span>
        </div>

        {/* Live News Ticker with Clean Gradient Mask */}
        <div className="relative flex-1 overflow-hidden min-w-0 h-6 flex items-center [mask-image:linear-gradient(to_right,transparent,black_16px,black_calc(100%-16px),transparent)]">
          <div className="animate-ticker flex items-center gap-8 whitespace-nowrap text-white/80 hover:text-white text-[11px] font-cond uppercase tracking-[0.14em]">
            <span className="font-semibold">PORTAL ANOMALY DETECTED // HIRO & BAYMAX INGRESS INITIATED</span>
            <span className="text-[#d62027] font-bold">•</span>
            <span>SAN FRANSOKYO EMITTER RINGS STABILIZED AT 68% CAPACITY</span>
            <span className="text-[#d62027] font-bold">•</span>
            <span>ZERO-G DRIFT SECTOR: TADASHI 2.0 HEALTHCARE CHIP ONLINE</span>
            <span className="text-[#d62027] font-bold">•</span>
            <span>BIG HERO 6 IN THEATRES OCTOBER 24 — DISNEY INFINITY FIGURES AVAILABLE</span>
            <span className="text-[#d62027] font-bold">•</span>
            <span className="font-semibold">PORTAL ANOMALY DETECTED // HIRO & BAYMAX INGRESS INITIATED</span>
          </div>
        </div>
      </div>

      {/* ── CENTER: FLOATING MISSION NAVIGATION CAPSULE ────────── */}
      <nav aria-label="Mission Navigation" className="flex items-center justify-center flex-shrink-0">
        <div
          className="flex items-center gap-1 p-1 rounded-full border shadow-sm"
          style={{
            background: 'rgba(0, 0, 0, 0.16)',
            borderColor: 'rgba(255, 255, 255, 0.16)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {TABS.map(tab => {
            const isActive = currentPage === tab.id
            return (
              <motion.button
                key={tab.id}
                onClick={() => setCurrentPage(tab.id)}
                whileTap={{ scale: 0.95 }}
                className="relative px-3 sm:px-3.5 py-1 rounded-full text-[11px] font-cond font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors duration-200 outline-none select-none cursor-pointer"
              >
                {/* ── FLUID SLIDING PILL BACKGROUND (SPRING PHYSICS) ──── */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 rounded-full bg-[#d62027] shadow-[0_0_18px_rgba(214,32,39,0.7)]"
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 34,
                    }}
                  />
                )}

                <span
                  className={`relative z-10 text-[9.5px] font-mono transition-colors duration-200 ${
                    isActive ? 'text-white/95 font-bold' : 'text-[#f87171]'
                  }`}
                >
                  {tab.num}
                </span>

                <span
                  className={`relative z-10 transition-colors duration-200 ${
                    isActive ? 'text-white' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {tab.label}
                </span>

                {isActive && (
                  <motion.span
                    layoutId="activeNavDot"
                    className="relative z-10 w-1.5 h-1.5 rounded-full bg-white shadow-sm"
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 34,
                    }}
                  />
                )}
              </motion.button>
            )
          })}
        </div>
      </nav>

      {/* ── RIGHT: CLEAN ACTIONS & CONTROLS ───────────────────────── */}
      <div className="flex items-center gap-2.5 flex-shrink-0 justify-end flex-1 max-w-[360px]">
        
        {/* Baymax Hero Banner Toggle Pill */}
        <button
          onClick={() => setShowBaymaxBanner(!showBaymaxBanner)}
          className={`px-3 py-1.5 rounded-full border text-[10.5px] font-cond font-bold uppercase tracking-wider flex items-center gap-2 transition-all duration-200 ${
            showBaymaxBanner
              ? 'bg-[#d62027] text-white border-red-400 shadow-[0_0_14px_rgba(214,32,39,0.55)]'
              : 'bg-white/8 hover:bg-white/15 border-white/15 text-white/85 hover:text-white'
          }`}
          title="Toggle Top Baymax Waving Banner"
        >
          {/* Baymax Eyes Icon */}
          <svg viewBox="0 0 24 14" width="18" height="11" fill="none" stroke="currentColor" strokeWidth="1.6" className="flex-shrink-0">
            <ellipse cx="12" cy="7" rx="10" ry="5.5" />
            <circle cx="7" cy="7" r="1.4" fill="currentColor" />
            <circle cx="17" cy="7" r="1.4" fill="currentColor" />
            <line x1="7" y1="7" x2="17" y2="7" stroke="currentColor" strokeWidth="1.2" />
          </svg>
          <span className="hidden sm:inline">Baymax Hero</span>
          <span
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              showBaymaxBanner ? 'bg-white animate-pulse' : 'bg-[#d62027]'
            }`}
          />
        </button>

        {/* Minimalist Modern Social Links */}
        <div className="flex items-center gap-1.5 pl-2 border-l border-white/15">
          {/* Twitter / X */}
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="w-7 h-7 rounded-full bg-white/5 hover:bg-[#d62027] border border-white/10 hover:border-red-400 text-white/80 hover:text-white flex items-center justify-center transition-all duration-150"
            title="Follow on Twitter"
            aria-label="Twitter"
          >
            <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>

          {/* Facebook */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="w-7 h-7 rounded-full bg-white/5 hover:bg-[#d62027] border border-white/10 hover:border-red-400 text-white/80 hover:text-white flex items-center justify-center transition-all duration-150"
            title="Follow on Facebook"
            aria-label="Facebook"
          >
            <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>

          {/* YouTube */}
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noreferrer"
            className="w-7 h-7 rounded-full bg-white/5 hover:bg-[#d62027] border border-white/10 hover:border-red-400 text-white/80 hover:text-white flex items-center justify-center transition-all duration-150"
            title="Watch on YouTube"
            aria-label="YouTube"
          >
            <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
        </div>
      </div>
    </header>
  )
}

import { useState } from 'react'
import TopBar from './components/TopBar'
import BaymaxHeroBanner from './components/BaymaxHeroBanner'
import LeftSidebar from './components/LeftSidebar'
import CenterHero from './components/CenterHero'
import RightNav from './components/RightNav'
import BaymaxDiagnostics from './components/BaymaxDiagnostics'
import DimensionCodex from './components/DimensionCodex'
import EscapeRadar from './components/EscapeRadar'
import BottomBar from './components/BottomBar'
import TrailerModal from './components/TrailerModal'
import TeamCommsModal from './components/TeamCommsModal'
import CommsPage from './components/CommsPage'

const TOTAL_CHAPTERS = 6

const CHARS = [
  { id: 'baymax', label: 'Baymax' },
  { id: 'hiro', label: 'Hiro' },
  { id: 'honey-lemon', label: 'Honey Lemon' },
  { id: 'gogo', label: 'Go Go' },
  { id: 'wasabi', label: 'Wasabi' },
  { id: 'fred', label: 'Fred' },
]

export default function App() {
  const [currentPage, setCurrentPage] = useState('story')
  const [slide, setSlide] = useState(0)
  const [activeChar, setActiveChar] = useState(0)
  const [audioOn, setAudioOn] = useState(true)
  const [trailerOpen, setTrailerOpen] = useState(false)
  const [commsChar, setCommsChar] = useState(null)
  const [showBaymaxBanner, setShowBaymaxBanner] = useState(true)

  const goNext = () => setSlide(s => Math.min(s + 1, TOTAL_CHAPTERS - 1))
  const goPrev = () => setSlide(s => Math.max(s - 1, 0))

  return (
    <div
      className="flex flex-col w-screen h-screen overflow-hidden font-cond select-none text-white"
      style={{
        background: 'radial-gradient(ellipse at 52% 44%, #8ea5ba 0%, #6d849b 42%, #4d6377 100%)',
      }}
    >
      {/* ── TOP NAV BAR (TWITTER TICKER, TABS, SOCIAL) ─────── */}
      <TopBar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onOpenComms={(charId) => setCommsChar(charId || 'hiro')}
        showBaymaxBanner={showBaymaxBanner}
        setShowBaymaxBanner={setShowBaymaxBanner}
      />

      {/* ── COLLAPSIBLE BAYMAX WAVING HERO BANNER ──────────── */}
      <BaymaxHeroBanner
        isOpen={showBaymaxBanner}
        onClose={() => setShowBaymaxBanner(false)}
        onSelectStory={() => {
          setCurrentPage('story')
          setShowBaymaxBanner(false)
        }}
        onSelectCare={() => {
          setCurrentPage('diagnostics')
          setShowBaymaxBanner(false)
        }}
      />

      {/* ── MAIN WORKSPACE ──────────────────────────────────── */}
      <div className="flex flex-1 min-h-0 overflow-hidden relative">

        {/* Left Sidebar with Big Hero 6 Red Banner & Tickets */}
        <LeftSidebar
          slide={slide}
          setSlide={setSlide}
          onTrailer={() => setTrailerOpen(true)}
          onAudioChange={setAudioOn}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        {/* Central Viewport Area */}
        <div className="flex flex-1 min-w-0 overflow-hidden relative">

          {currentPage === 'story' && (
            <CenterHero
              slide={slide}
              goNext={goNext}
              goPrev={goPrev}
              totalChapters={TOTAL_CHAPTERS}
            />
          )}

          {currentPage === 'diagnostics' && <BaymaxDiagnostics />}

          {currentPage === 'codex' && <DimensionCodex />}

          {currentPage === 'radar' && <EscapeRadar />}

          {currentPage === 'comms' && <CommsPage />}

        </div>

        {/* Right Navigation Reticle / Compass */}
        <RightNav compassAngle={slide * 60} />
      </div>

      {/* ── BOTTOM DOCK WITH 6 CHARACTERS, AUDIO, LEGAL ──────── */}
      <BottomBar
        audioOn={audioOn}
        toggle={() => setAudioOn(v => !v)}
        chars={CHARS}
        activeChar={activeChar}
        setActiveChar={setActiveChar}
        onOpenCharComms={(charId) => setCommsChar(charId)}
      />

      {/* ── MODALS ───────────────────────────────────────────── */}
      {trailerOpen && <TrailerModal onClose={() => setTrailerOpen(false)} />}

      {commsChar && (
        <TeamCommsModal
          charId={commsChar}
          onClose={() => setCommsChar(null)}
          onSelectChar={(id) => setCommsChar(id)}
        />
      )}
    </div>
  )
}

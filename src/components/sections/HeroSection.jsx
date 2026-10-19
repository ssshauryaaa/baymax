import { motion } from 'framer-motion'
import PortalScene from '../3d/PortalScene'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const itemVariants = {
  hidden:   { opacity: 0, y: 30 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export default function HeroSection() {
  const scrollToChapters = () => {
    document.getElementById('chapters')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="story"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* Deep void background gradient */}
      <div className="absolute inset-0 bg-gradient-radial"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(45,212,191,0.06) 0%, rgba(6,13,31,0) 70%), #030610' }}
      />

      {/* 3D Portal — full background layer */}
      <div className="absolute inset-0 pointer-events-none">
        <PortalScene accent="#2DD4BF" className="w-full h-full opacity-70" />
      </div>

      {/* Scanline overlay */}
      <div className="absolute inset-0 scanlines pointer-events-none opacity-40" />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-4xl mx-auto pt-24"
      >
        {/* Status pill */}
        <motion.div variants={itemVariants} className="flex justify-center mb-8">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-portal-teal/20">
            <span className="w-2 h-2 rounded-full bg-portal-teal animate-pulse" />
            <span className="font-mono text-[10px] text-portal-teal/80 tracking-[0.25em] uppercase">
              Portal Dimension — Active
            </span>
          </div>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          variants={itemVariants}
          className="font-display font-extrabold leading-[0.9] mb-6"
          style={{ fontSize: 'clamp(3rem, 10vw, 7rem)' }}
        >
          <span className="block text-white">Hello.</span>
          <span className="block text-gradient-teal">I Am Baymax.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-white/55 font-light leading-relaxed max-w-xl mx-auto mb-4"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)' }}
        >
          After the fight with Callaghan, Hiro refuses to leave Baymax behind.
          He leaps back through the closing portal — and now they're both trapped inside
          an unknown dimension where nothing follows the rules of their world.
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="font-mono text-[11px] text-portal-teal/60 tracking-[0.2em] uppercase mb-12"
        >
          Together, they must survive. Together, they must escape.
        </motion.p>

        {/* CTA buttons */}
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-4 flex-wrap">
          <motion.button
            onClick={scrollToChapters}
            whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(45,212,191,0.3)' }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 rounded font-display font-bold text-sm tracking-wide text-void-950 bg-portal-teal hover:bg-portal-teal/90 transition-all duration-200"
          >
            Read the Story →
          </motion.button>
          <motion.button
            onClick={() => document.getElementById('baymax')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 rounded font-display font-semibold text-sm tracking-wide text-white/80 border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-200"
          >
            Baymax Status
          </motion.button>
        </motion.div>

        {/* HUD corner markers */}
        <motion.div
          variants={itemVariants}
          className="mt-20 flex items-center justify-center gap-8 text-white/20"
        >
          {[
            { label: 'ZONE',     val: 'Portal Drift'   },
            { label: 'CHAPTER',  val: '01 of 06'       },
            { label: 'STATUS',   val: 'Unknown Dim.'   },
            { label: 'BATTERY',  val: '34% Critical'   },
          ].map(({ label, val }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className="font-mono text-[8px] text-white/30 tracking-widest uppercase">{label}</span>
              <span className="font-mono text-[11px] text-portal-teal/60">{val}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[9px] text-white/30 tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"
        />
      </motion.div>
    </section>
  )
}

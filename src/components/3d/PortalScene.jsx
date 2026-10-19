import { useRef, useEffect } from 'react'

/* ─── Pure Canvas 2D portal animation — no R3F needed ─────── */
export default function PortalScene({ accent = '#2DD4BF', className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    // Parse accent color for RGBA use
    const hexToRgb = (hex) => {
      const r = parseInt(hex.slice(1, 3), 16)
      const g = parseInt(hex.slice(3, 5), 16)
      const b = parseInt(hex.slice(5, 7), 16)
      return { r, g, b }
    }
    const rgb = hexToRgb(accent)
    const accentRgb = `${rgb.r},${rgb.g},${rgb.b}`

    // Particles
    const PARTICLE_COUNT = 180
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x:    Math.random() * 2 - 1,
      y:    Math.random() * 2 - 1,
      z:    Math.random(),
      size: Math.random() * 1.5 + 0.5,
      speed: Math.random() * 0.001 + 0.0003,
      angle: Math.random() * Math.PI * 2,
      orbitR: Math.random() * 0.6 + 0.15,
      orbitSpeed: (Math.random() - 0.5) * 0.008,
    }))

    // Rings
    const RINGS = [
      { radius: 0.28, thickness: 1.5, speed: 0.003,  opacity: 0.7,  color: accentRgb   },
      { radius: 0.38, thickness: 1.0, speed: -0.002, opacity: 0.35, color: '255,255,255' },
      { radius: 0.50, thickness: 0.7, speed: 0.0015, opacity: 0.2,  color: accentRgb   },
      { radius: 0.65, thickness: 0.5, speed: -0.001, opacity: 0.12, color: '255,255,255' },
    ]

    let animId
    let t = 0

    const resize = () => {
      canvas.width  = canvas.offsetWidth  * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      const W = canvas.width
      const H = canvas.height
      const cx = W / 2
      const cy = H / 2
      const minDim = Math.min(W, H)

      ctx.clearRect(0, 0, W, H)

      // Radial glow
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, minDim * 0.4)
      grad.addColorStop(0,   `rgba(${accentRgb}, 0.12)`)
      grad.addColorStop(0.5, `rgba(${accentRgb}, 0.04)`)
      grad.addColorStop(1,   'transparent')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, W, H)

      // Spinning rings
      RINGS.forEach(ring => {
        ctx.save()
        ctx.translate(cx, cy)
        ctx.rotate(t * ring.speed * 60)
        ctx.beginPath()
        ctx.ellipse(0, 0, ring.radius * minDim, ring.radius * minDim * 0.38, 0, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${ring.color}, ${ring.opacity})`
        ctx.lineWidth = ring.thickness
        ctx.stroke()
        ctx.restore()
      })

      // Pulsing core
      const coreR = minDim * 0.05 * (1 + Math.sin(t * 0.04) * 0.15)
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR)
      coreGrad.addColorStop(0,   `rgba(${accentRgb}, 0.8)`)
      coreGrad.addColorStop(0.5, `rgba(${accentRgb}, 0.3)`)
      coreGrad.addColorStop(1,   'transparent')
      ctx.fillStyle = coreGrad
      ctx.beginPath()
      ctx.arc(cx, cy, coreR, 0, Math.PI * 2)
      ctx.fill()

      // Orbiting particles
      particles.forEach(p => {
        p.angle += p.orbitSpeed
        const x = cx + Math.cos(p.angle) * p.orbitR * minDim
        const y = cy + Math.sin(p.angle) * p.orbitR * minDim * 0.38
        const opacity = 0.3 + Math.sin(t * 0.05 + p.angle) * 0.3

        ctx.beginPath()
        ctx.arc(x, y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.orbitR > 0.4 ? '255,255,255' : accentRgb}, ${Math.max(0.05, opacity)})`
        ctx.fill()
      })

      // Dashed arcs (dimension grid lines)
      for (let i = 0; i < 3; i++) {
        const r = (0.18 + i * 0.13) * minDim
        ctx.save()
        ctx.translate(cx, cy)
        ctx.rotate(t * 0.0005 * (i % 2 === 0 ? 1 : -1))
        ctx.setLineDash([6, 14])
        ctx.beginPath()
        ctx.ellipse(0, 0, r, r * 0.4, 0, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${accentRgb}, ${0.07 - i * 0.015})`
        ctx.lineWidth = 0.8
        ctx.stroke()
        ctx.restore()
      }

      t++
      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [accent])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%', display: 'block' }}
      aria-hidden="true"
    />
  )
}

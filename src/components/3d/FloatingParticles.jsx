import { useRef, useEffect } from 'react'

export default function FloatingParticles({ accent = '#2DD4BF', className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const hexToRgb = (hex) => ({
      r: parseInt(hex.slice(1, 3), 16),
      g: parseInt(hex.slice(3, 5), 16),
      b: parseInt(hex.slice(5, 7), 16),
    })
    const { r, g, b } = hexToRgb(accent)

    const resize = () => {
      canvas.width  = canvas.offsetWidth  * Math.min(window.devicePixelRatio, 1.5)
      canvas.height = canvas.offsetHeight * Math.min(window.devicePixelRatio, 1.5)
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const dots = Array.from({ length: 100 }, () => ({
      x:  Math.random(),
      y:  Math.random(),
      vx: (Math.random() - 0.5) * 0.0003,
      vy: (Math.random() - 0.5) * 0.0003,
      size: Math.random() * 1.4 + 0.4,
      opacity: Math.random() * 0.4 + 0.1,
      color: Math.random() > 0.6,
    }))

    let animId
    const draw = () => {
      const W = canvas.width
      const H = canvas.height
      ctx.clearRect(0, 0, W, H)

      dots.forEach(d => {
        d.x += d.vx
        d.y += d.vy
        if (d.x < 0) d.x = 1
        if (d.x > 1) d.x = 0
        if (d.y < 0) d.y = 1
        if (d.y > 1) d.y = 0

        ctx.beginPath()
        ctx.arc(d.x * W, d.y * H, d.size, 0, Math.PI * 2)
        ctx.fillStyle = d.color
          ? `rgba(${r},${g},${b},${d.opacity})`
          : `rgba(255,255,255,${d.opacity * 0.5})`
        ctx.fill()
      })

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

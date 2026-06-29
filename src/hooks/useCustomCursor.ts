import { useEffect, useRef } from 'react'

export function useCustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  // Track actual mouse position
  const mouse = useRef({ x: 0, y: 0 })
  // Track delayed ring position
  const ringPos = useRef({ x: 0, y: 0 })
  // State refs to avoid dependency triggers
  const isHovering = useRef(false)
  const isVisible = useRef(false)

  useEffect(() => {
    // Only run on devices with a fine pointer (mouse/trackpad)
    if (window.matchMedia('(pointer: coarse)').matches) {
      return
    }

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let animationFrameId: number

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY

      // If just entering the window, snap ring immediately
      if (!isVisible.current) {
        ringPos.current.x = e.clientX
        ringPos.current.y = e.clientY
        isVisible.current = true
        dot.style.opacity = '1'
        ring.style.opacity = '1'
      }

      // Update dot instantly
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`
    }

    // Detect hovering over interactive elements using event delegation
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = 
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') || 
        target.closest('button') ||
        window.getComputedStyle(target).cursor === 'pointer'

      if (isInteractive && !isHovering.current) {
        isHovering.current = true
        // Apply hover styles via class mutation
        dot.classList.add('scale-150', 'bg-[#B8962E]')
        dot.classList.remove('bg-[#C4622D]')
        
        ring.classList.add('scale-[1.5]', 'border-[#B8962E]', 'bg-[#B8962E]/10')
        ring.classList.remove('border-[#C4622D]', 'scale-100', 'bg-transparent')
      } else if (!isInteractive && isHovering.current) {
        isHovering.current = false
        // Remove hover styles
        dot.classList.remove('scale-150', 'bg-[#B8962E]')
        dot.classList.add('bg-[#C4622D]')
        
        ring.classList.remove('scale-[1.5]', 'border-[#B8962E]', 'bg-[#B8962E]/10')
        ring.classList.add('border-[#C4622D]', 'scale-100', 'bg-transparent')
      }
    }

    const handleMouseLeave = () => {
      isVisible.current = false
      dot.style.opacity = '0'
      ring.style.opacity = '0'
    }

    const handleMouseEnter = () => {
      isVisible.current = true
      dot.style.opacity = '1'
      ring.style.opacity = '1'
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseover', handleMouseOver, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    // Render loop for the trailing ring
    const render = () => {
      // Lerp for 50ms smooth delay
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.15
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.15

      // Only update ring transform in RAF for maximum performance
      ring.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`
      
      animationFrameId = requestAnimationFrame(render)
    }
    
    animationFrameId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return { dotRef, ringRef }
}

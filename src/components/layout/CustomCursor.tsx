'use client'

import { useCustomCursor } from '@/hooks/useCustomCursor'

export function CustomCursor() {
  const { dotRef, ringRef } = useCustomCursor()

  return (
    <>
      <div 
        ref={dotRef}
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999] mix-blend-difference transition-colors duration-300 bg-[#C4622D] opacity-0 will-change-transform hidden sm:block"
        style={{ transform: "translate(-50%, -50%)" }}
      />
      
      <div 
        ref={ringRef}
        className="fixed top-0 left-0 w-9 h-9 rounded-full border pointer-events-none z-[9999] transition-colors duration-300 border-[#C4622D] bg-transparent opacity-0 will-change-transform hidden sm:block"
        style={{ transform: "translate(-50%, -50%)" }}
      />
    </>
  )
}

'use client'

import { useEffect, useRef } from 'react'

interface ScrollRevealProps {
  children: React.ReactNode
  animation?: 'fade-up' | 'fade-left' | 'fade-right' | 'fade-scale'
  delay?: number
  className?: string
}

export default function ScrollReveal({ 
  children, 
  animation = 'fade-up', 
  delay = 0,
  className = '' 
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add(`animate-${animation}`)
          if (delay > 0) {
            element.classList.add(`delay-${delay}`)
          }
          observer.unobserve(element)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [animation, delay])

  return (
    <div 
      ref={elementRef} 
      className={`scroll-reveal ${className}`}
    >
      {children}
    </div>
  )
}
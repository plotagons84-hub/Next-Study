import { useEffect, useRef, useState } from 'react'

// Reveals an element (fade + slide up) the moment it scrolls into view.
// Fires once per element, so scrolling back up and down doesn't re-trigger it.
export function useReveal(options = {}) {
  const { threshold = 0.15, rootMargin = '0px 0px -8% 0px' } = options
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Safety net: if the ref never attaches to a DOM node (e.g. a wrapped
    // component that doesn't forward refs) the element should still reveal
    // itself rather than staying invisible forever.
    const fallback = setTimeout(() => setVisible(true), 1500)

    const node = ref.current
    if (!node) return () => clearTimeout(fallback)

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return () => clearTimeout(fallback)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(node)
    return () => {
      observer.disconnect()
      clearTimeout(fallback)
    }
  }, [threshold, rootMargin])

  return [ref, visible]
}

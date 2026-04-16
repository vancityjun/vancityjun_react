import { useEffect, useRef } from 'react'
import './cursor.scss'

const Cursor = () => {
  const cursorRef = useRef(null)
  const cursor2Ref = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const cursor2 = cursor2Ref.current
    if (!cursor || !cursor2) return

    const onMouseMove = (e) => {
      cursor.style.left = `${e.clientX}px`
      cursor.style.top = `${e.clientY}px`
      cursor2.style.left = `${e.clientX}px`
      cursor2.style.top = `${e.clientY}px`
    }
    const onHover = () => cursor2.classList.add('hover')
    const onUnhover = () => cursor2.classList.remove('hover')

    document.body.addEventListener('mousemove', onMouseMove)

    // Event delegation — one pair of listeners handles all hover targets,
    // including elements added after mount.
    const matches = (el) =>
      el && el.matches &&
      el.matches('.hover-target, a, button, .swiper-pagination-bullet')

    const onMouseOver = (e) => {
      if (matches(e.target) || matches(e.target.closest('.hover-target, a, button, .swiper-pagination-bullet'))) {
        onHover()
      }
    }
    const onMouseOut = (e) => {
      if (matches(e.target) || matches(e.target.closest('.hover-target, a, button, .swiper-pagination-bullet'))) {
        onUnhover()
      }
    }

    document.body.addEventListener('mouseover', onMouseOver)
    document.body.addEventListener('mouseout', onMouseOut)

    return () => {
      document.body.removeEventListener('mousemove', onMouseMove)
      document.body.removeEventListener('mouseover', onMouseOver)
      document.body.removeEventListener('mouseout', onMouseOut)
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="cursor"></div>
      <div ref={cursor2Ref} className="cursor2"></div>
    </>
  )
}

export default Cursor

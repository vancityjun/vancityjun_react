import { useEffect, useState } from 'react'
import './loading.scss'

// Bug fix (Phase 6a): The old version attached a jQuery `load` event listener
// inside useEffect with no dependency array. The `load` event often fires
// before React mounts, so the callback never ran and the loader stayed up.
// Here we check document.readyState first and fall back to the event listener.
const Loading = () => {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let timeoutId

    const hide = () => {
      // Short delay so the fade-out feels intentional
      timeoutId = setTimeout(() => setHidden(true), 300)
    }

    if (document.readyState === 'complete') {
      hide()
      return () => clearTimeout(timeoutId)
    }

    const onLoad = () => hide()
    window.addEventListener('load', onLoad)

    // Safety net: never leave the loader up longer than 5s
    const safety = setTimeout(() => setHidden(true), 5000)

    return () => {
      window.removeEventListener('load', onLoad)
      clearTimeout(timeoutId)
      clearTimeout(safety)
    }
  }, [])

  return (
    <div className={`loading${hidden ? ' hidden' : ''}`} aria-hidden={hidden}>
      <span className="loader">
        <span className="loader-inner" />
      </span>
    </div>
  )
}

export default Loading

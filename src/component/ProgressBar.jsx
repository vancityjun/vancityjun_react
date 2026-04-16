import './ProgressBar.scss'

// Bug fix (Phase 6b): The old version used a GSAP TimelineMax recreated on
// every render, captured by a stale closure inside a useEffect. When the user
// interacted, autoplay would restart but the progress animation would not
// sync. Now the parent drives progress from Swiper's `autoplayTimeLeft` event
// (native to Swiper 9+), and we just render the height as a CSS style.
const ProgressBar = ({ progress = 0 }) => {
  const height = `${Math.min(1, Math.max(0, progress)) * 100}%`
  return (
    <div className="progressBar">
      <span className="progress" style={{ height }}></span>
    </div>
  )
}

export default ProgressBar

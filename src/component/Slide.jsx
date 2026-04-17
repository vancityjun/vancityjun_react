import { useRef, useEffect } from 'react'
import projectImages from '../helper/projectImages.js'
import ProjectContent from './ProjectContent.jsx'

const Slide = ({
  pc,
  mobile,
  customContent,
  id,
  url,
  title,
  shortDescription,
  date,
  category,
  background,
  onOpen,
  isOpen,
}) => {
  // Only the backgroundImage is dynamic — size/position live in SCSS (.project-header)
  const bgStyle = background ? { backgroundImage: `url(${projectImages[background]})` } : undefined

  const hasDetailContent = Boolean(pc?.length || mobile?.length || customContent)

  // Ref for the image/scroll container
  const imgRef = useRef(null)

  useEffect(() => {
    const el = imgRef.current
    if (!el) return

    if (!isOpen) {
      // Bug 2 fix: reset scroll position when project closes so hero is visible
      el.scrollTop = 0
      return
    }

    // Bug 1 fix: Swiper intercepts wheel events at the container level.
    // stopPropagation prevents Swiper from stealing the event; the browser
    // then handles native scroll on the overflow-y:auto container naturally.
    const onWheel = (e) => {
      e.stopPropagation()
    }

    el.addEventListener('wheel', onWheel)
    return () => el.removeEventListener('wheel', onWheel)
  }, [isOpen])

  return (
    <div
      className={`blog-slider__item swiper-slide project${id}`}
      data-hash={`slide${id}`}
    >
      <div className="blog-slider__img" ref={imgRef}>
        <section className="project-header" style={bgStyle}>
          <div className="info-background"></div>
          <div className={`project-info${isOpen ? ' active' : ''}`}>
            <h2 className="project-info_title">{title}</h2>
            <p className="project-info_detail">{shortDescription}</p>
          </div>
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`view-website${isOpen ? ' active' : ''}`}
            >
              View website
            </a>
          )}
          {hasDetailContent && isOpen && (
            <span className="scrollDown" aria-hidden="true">
              <span></span>
            </span>
          )}
        </section>

        <ProjectContent
          pc={pc || []}
          mobile={mobile || []}
          customContent={customContent}
          active={isOpen}
        />
      </div>
      <div className="content_wrapper works">
        <div className="blog-slider__content cf">
          <span className="blog-slider__code">{date}</span>
          <div className="blog-slider__title">{title}</div>
          <div className="blog-slider__text">{category}</div>
          {hasDetailContent && (
            <p className="blog-slider__button">
              <button type="button" onClick={onOpen}>
                See more
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Slide

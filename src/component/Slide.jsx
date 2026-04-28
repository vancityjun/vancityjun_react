import { useRef, useEffect } from 'react'
import projectImages from '../helper/projectImages.js'
import ProjectContent from './ProjectContent.jsx'
import { hasProjectDetails } from './projectContent/projectContentUtils.js'

const Slide = ({
  pc,
  mobile,
  customContent,
  id,
  url,
  title,
  shortDescription,
  type,
  techStack,
  details,
  date,
  category,
  background,
  onOpen,
  isOpen,
}) => {
  // Only the backgroundImage is dynamic — size/position live in SCSS (.project-header)
  const bgStyle = background ? { backgroundImage: `url(${projectImages[background]})` } : undefined

  const hasDetails = hasProjectDetails(details)
  const hasDetailContent = Boolean(pc?.length || mobile?.length || customContent || hasDetails)

  // Ref for the image/scroll container
  const imgRef = useRef(null)

  useEffect(() => {
    const el = imgRef.current
    if (!el) return

    if (!isOpen) {
      el.scrollTop = 0;
      return;
    }

    // SCROLL_SPEED: 1.0 = browser default, < 1.0 = slower, > 1.0 = faster
    const SCROLL_SPEED = 1.0

    const onWheel = (e) => {
      e.stopPropagation()
      if (SCROLL_SPEED !== 1.0) {
        e.preventDefault()
        el.scrollTop += e.deltaY * SCROLL_SPEED
      }
    }

    // passive:true when speed=1 (browser handles it), false when overriding
    el.addEventListener('wheel', onWheel, { passive: SCROLL_SPEED === 1.0 })
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
          type={type}
          category={category}
          techStack={techStack || []}
          details={details}
          active={isOpen}
        />
      </div>
      <div className="content_wrapper works">
        <div className="blog-slider__content cf">
          <span className="blog-slider__code">{date}</span>
          <div className="blog-slider__title">{title}</div>
          <div className="blog-slider__text">{type || category}</div>
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

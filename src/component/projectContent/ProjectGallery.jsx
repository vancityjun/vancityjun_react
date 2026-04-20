import { useState } from 'react'
import { resolveProjectImages } from './projectContentUtils.js'

const GalleryToggleButton = ({ active, children, onClick }) => (
  <button
    type="button"
    className={active ? 'active' : ''}
    onClick={onClick}
  >
    {children}
  </button>
)

const renderScreens = (images, altPrefix) =>
  resolveProjectImages(images).map((image, i) => (
    <img src={image.src} alt={`${altPrefix} ${i + 1}`} key={image.name} />
  ))

const ProjectGallery = ({ pc, mobile, embed, hasDetails }) => {
  const onlyMobile = mobile.length > 0 && pc.length === 0
  const [device, setDevice] = useState(onlyMobile ? 'mobile' : 'desktop')
  const showToggle = pc.length > 0 && mobile.length > 0

  if (!pc.length && !mobile.length && !embed) return null

  const pcScreens = renderScreens(pc, 'Screenshot')
  const mobileScreens = renderScreens(mobile, 'Mobile screenshot')

  return (
    <section className="project-gallery">
      {hasDetails && <p className="project-detail__label">Screens</p>}
      {showToggle && (
        <div className="project-gallery__toggle">
          <GalleryToggleButton
            active={device === 'desktop'}
            onClick={() => setDevice('desktop')}
          >
            PC
          </GalleryToggleButton>
          <GalleryToggleButton
            active={device === 'mobile'}
            onClick={() => setDevice('mobile')}
          >
            Mobile
          </GalleryToggleButton>
        </div>
      )}
      {!onlyMobile && (
        <div className={`project-gallery__screens desktop${device === 'desktop' ? ' visible' : ''}`}>
          {embed && (
            <div className="videoWrapper">
              <iframe
                src={embed.src}
                title={embed.title}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
          {pcScreens}
        </div>
      )}
      <div className={`project-gallery__screens mobile${device === 'mobile' || onlyMobile ? ' visible' : ''}`}>
        {mobileScreens}
      </div>
    </section>
  )
}

export default ProjectGallery

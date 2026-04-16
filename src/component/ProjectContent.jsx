import { useState } from 'react'
import projectImages from '../helper/projectImages.js'

// Known safe embeds referenced in data.json — rendered as JSX, not raw HTML.
const embeds = {
  recsee: {
    src: 'https://www.youtube.com/embed/pGe_YpY2bG8?rel=0',
    title: 'RecSee motion graphic',
  },
}

const ProjectContent = ({ pc, mobile, customContent, active }) => {
  const onlyMobile = mobile.length > 0 && pc.length === 0
  const [device, setDevice] = useState(onlyMobile ? 'mobile' : 'desktop')

  const showToggle = pc.length > 0 && mobile.length > 0
  const embed = customContent === 'recsee' ? embeds.recsee : null

  const pcScreens = pc.map((img, i) => (
    <img src={projectImages[img]} alt={`Screenshot ${i + 1}`} key={i} />
  ))
  const mobileScreens = mobile.map((img, i) => (
    <img src={projectImages[img]} alt={`Mobile screenshot ${i + 1}`} key={i} />
  ))

  return (
    <div className={`project-content cf${active ? ' active' : ''}`}>
      {showToggle && (
        <div className="device">
          <button
            type="button"
            className={device === 'desktop' ? 'active' : ''}
            onClick={() => setDevice('desktop')}
          >
            PC
          </button>
          <button
            type="button"
            className={device === 'mobile' ? 'active' : ''}
            onClick={() => setDevice('mobile')}
          >
            Mobile
          </button>
        </div>
      )}
      {/* desktop / embed view — CSS class hides/shows instead of inline style */}
      {!onlyMobile && (
        <div className={`conWrap desktop${device === 'desktop' ? ' visible' : ''}`}>
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
      {/* mobile view */}
      <div className={`conWrap mobile${device === 'mobile' || onlyMobile ? ' visible' : ''}`}>
        {mobileScreens}
      </div>
    </div>
  )
}

export default ProjectContent

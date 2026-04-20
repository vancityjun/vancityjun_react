import './projectContent.scss'
import ProjectDetail from './projectContent/ProjectDetail.jsx'
import ProjectGallery from './projectContent/ProjectGallery.jsx'
import { getProjectEmbed, hasProjectDetails } from './projectContent/projectContentUtils.js'

const ProjectContent = ({
  pc,
  mobile,
  customContent,
  type,
  techStack,
  details,
  active,
}) => {
  const embed = getProjectEmbed(customContent)
  const hasDetails = hasProjectDetails(details)

  return (
    <div className={`project-content cf${active ? ' active' : ''}`}>
      <ProjectDetail type={type} techStack={techStack} details={details} />
      <ProjectGallery
        pc={pc}
        mobile={mobile}
        embed={embed}
        hasDetails={hasDetails}
      />
    </div>
  )
}

export default ProjectContent

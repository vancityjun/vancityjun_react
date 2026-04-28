import ProjectDetailIntro from './ProjectDetailIntro.jsx'
import ProjectFeatureRow from './ProjectFeatureRow.jsx'
import ProjectNotes from './ProjectNotes.jsx'
import ProjectTextFeatures from './ProjectTextFeatures.jsx'
import { splitFeaturesByMedia } from './projectContentUtils.js'

const ProjectDetail = ({ type, category, techStack, details }) => {
  if (!details) return null

  const { mediaFeatures, textFeatures } = splitFeaturesByMedia(details.features)

  return (
    <div className="project-detail">
      <ProjectDetailIntro
        type={type}
        category={category}
        techStack={techStack}
        details={details}
      />

      {mediaFeatures.map((feature) => (
        <ProjectFeatureRow
          feature={feature}
          key={`${feature.title}-${feature.label || ''}`}
        />
      ))}

      <ProjectTextFeatures features={textFeatures} />
      <ProjectNotes challenge={details.challenge} process={details.process} />
    </div>
  )
}

export default ProjectDetail

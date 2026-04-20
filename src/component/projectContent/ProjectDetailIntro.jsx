const MetaItem = ({ label, value }) => {
  if (!value) return null

  return (
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

const SummaryBlock = ({ label, children }) => {
  if (!children) return null

  return (
    <div className="project-detail__summary">
      <p className="project-detail__label">{label}</p>
      <p>{children}</p>
    </div>
  )
}

const ProjectDetailIntro = ({ type, techStack, details }) => {
  const metaItems = [
    { label: 'Type', value: type },
    { label: 'Role', value: details.role?.title },
    { label: 'Tech Stack', value: techStack?.join(', ') },
  ].filter((item) => item.value)

  return (
    <section className="project-detail__intro">
      {metaItems.length > 0 && (
        <div className="project-detail__meta">
          {metaItems.map((item) => (
            <MetaItem label={item.label} value={item.value} key={item.label} />
          ))}
        </div>
      )}
      <SummaryBlock label="Project Summary">{details.summary}</SummaryBlock>
      <SummaryBlock label="My Role">{details.role?.description}</SummaryBlock>
    </section>
  )
}

export default ProjectDetailIntro

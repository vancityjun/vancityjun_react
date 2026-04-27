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

const RoleBlock = ({ role }) => {
  if (!role?.title && !role?.description) return null

  return (
    <div className="project-detail__summary">
      <p className="project-detail__label">My Role</p>
      {role.title && <h3>{role.title}</h3>}
      {role.description && <p>{role.description}</p>}
    </div>
  )
}

const ProjectDetailIntro = ({ type, category, techStack, details }) => {
  const metaItems = [
    { label: 'Category', value: category || type },
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
      <div className="project-detail__overview">
        <SummaryBlock label="Project Summary">{details.summary}</SummaryBlock>
        <RoleBlock role={details.role} />
      </div>
    </section>
  )
}

export default ProjectDetailIntro

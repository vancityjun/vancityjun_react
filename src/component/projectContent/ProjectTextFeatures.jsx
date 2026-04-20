const ProjectTextFeatures = ({ features }) => {
  if (!features.length) return null

  return (
    <section className="project-detail__text-features">
      <p className="project-detail__label">Main Functionalities</p>
      <div className="project-detail__feature-list">
        {features.map((feature) => (
          <article
            className="project-detail__feature-card"
            key={`${feature.title}-${feature.label || ''}`}
          >
            {feature.label && <span>{feature.label}</span>}
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ProjectTextFeatures

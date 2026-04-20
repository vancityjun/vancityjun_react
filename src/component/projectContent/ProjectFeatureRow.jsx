const ProjectFeatureRow = ({ feature }) => {
  const imageRight = feature.imagePosition === 'right'
  const images = feature.resolvedImages || []

  return (
    <section
      className={`project-detail__feature-row${imageRight ? ' image-right' : ''}`}
    >
      <div className={`project-detail__media${images.length > 1 ? ' is-grid' : ''}`}>
        {images.map((image, i) => (
          <img
            src={image.src}
            alt={`${feature.title || 'Project feature'} screenshot ${i + 1}`}
            key={image.name}
          />
        ))}
      </div>
      <div className="project-detail__copy">
        {feature.label && <p className="project-detail__label">{feature.label}</p>}
        <h3>{feature.title}</h3>
        <p>{feature.description}</p>
      </div>
    </section>
  )
}

export default ProjectFeatureRow

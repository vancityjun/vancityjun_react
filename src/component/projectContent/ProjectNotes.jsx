const ProjectNotes = ({ challenge, process }) => {
  if (!challenge && !process?.length) return null

  return (
    <section className="project-detail__notes">
      {challenge && (
        <div className="project-detail__note">
          <p className="project-detail__label">The Challenge</p>
          <p>{challenge}</p>
        </div>
      )}
      {process?.length > 0 && (
        <div className="project-detail__note">
          <p className="project-detail__label">Development Process</p>
          <ol>
            {process.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      )}
    </section>
  )
}

export default ProjectNotes

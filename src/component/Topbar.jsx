const Topbar = ({ menuOpen, slideOpen, onMenuToggle, onClose }) => {
  return (
    <div className="top_bar">
      <a href="/" className="logo">
        <h1>
          <span>V</span>ancity <span>J</span>un
        </h1>
      </a>
      {slideOpen && (
        <button
          type="button"
          className="closeBtn hover-target"
          aria-label="Close project"
          onClick={onClose}
        >
          <span className="arrow"></span>
        </button>
      )}
      <button
        type="button"
        className={`toggle-menu hover-target${menuOpen ? ' active' : ''}`}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        onClick={onMenuToggle}
      >
        <span></span>
      </button>
    </div>
  )
}

export default Topbar

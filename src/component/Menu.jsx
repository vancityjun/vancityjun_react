const Menu = ({
  items,
  open,
  previewBg,
  onNavigate,
  onHoverItem,
  onLeaveItem,
  onMouseMove,
  menuRef,
  scrollWrapRef,
}) => {
  return (
    <div
      className={`menu${open ? ' open' : ''}`}
      ref={menuRef}
      onMouseMove={onMouseMove}
    >
      <div className="menuWrapper">
        <ul className="scrollWrap" ref={scrollWrapRef}>
          {items.map((item, i) => (
            <li
              key={i}
              onMouseEnter={() => onHoverItem(i)}
              onMouseLeave={onLeaveItem}
            >
              <button
                type="button"
                className="link"
                onClick={() => onNavigate(i)}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="imageWrapper">
        <div
          className="preview"
          style={previewBg ? { backgroundImage: `url(${previewBg})` } : undefined}
        ></div>
      </div>
    </div>
  )
}

export default Menu

import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import Swiper from 'swiper'
import { Navigation, Pagination, Autoplay, Mousewheel, Keyboard, EffectFade } from 'swiper/modules'
import gsap from 'gsap'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './App.scss'

import Topbar from './component/Topbar.jsx'
import Menu from './component/Menu.jsx'
import Profile from './component/Profile.jsx'
import Slide from './component/Slide.jsx'
import Loading from './component/Loading.jsx'
import Cursor from './component/Cursor.jsx'
import ProgressBar from './component/ProgressBar.jsx'
import useIsMobile from './helper/useIsMobile.js'
import projectImages from './helper/projectImages.js'
import data from './data.json'

const AUTOPLAY_DELAY = 7000
// Set to false to disable automatic slide advancement and hide the progress bar
const AUTO_SLIDE = false

const App = () => {
  // openSlideId is the project index (0-based) that is open, or null when closed
  const [openSlideId, setOpenSlideId] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [previewBg, setPreviewBg] = useState(null)

  const swiperRef = useRef(null)
  const menuRef = useRef(null)
  const scrollWrapRef = useRef(null)

  const isMobile = useIsMobile()
  const slideOpen = openSlideId !== null

  const visibleProjects = useMemo(() => data.projects.filter(p => !p.hide), [])
  const menuItems = useMemo(
    () => [{ title: 'About', background: 'jun-developer.png' }, ...visibleProjects],
    [visibleProjects]
  )

  useEffect(() => {
    const swiper = new Swiper('.blog-slider', {
      modules: [
        Navigation,
        Pagination,
        Autoplay,
        Mousewheel,
        Keyboard,
        EffectFade,
      ],
      spaceBetween: 30,
      effect: 'fade',
      fadeEffect: { crossFade: true },
      rewind: true,
      preventClicks: false,
      preventClicksPropagation: false,
      shortSwipes: false,
      autoplay: AUTO_SLIDE
        ? { delay: AUTOPLAY_DELAY, disableOnInteraction: false }
        : false,
      watchSlidesProgress: true,
      mousewheel: {
        sensitivity: 1,
        thresholdDelta: 5, // lower = more sensitive (triggers slide change sooner)
        thresholdTime: 400, // cooldown between slides to prevent double-skip on trackpad
      },
      threshold: 3, // min touch drag distance in px (lower = more sensitive on mobile)
      keyboard: { enabled: true, onlyInViewport: false },
      pagination: {
        el: '.blog-slider__pagination',
        type: 'bullets',
        clickable: true,
      },
      navigation: {
        nextEl: '.blog-button-next',
        prevEl: '.blog-button-prev',
      },
      direction: 'vertical',
      on: {
        slideChange: (s) => {
          setActiveIndex(s.realIndex);
          // Close detail when navigating away
          setOpenSlideId(null);
        },
        autoplayTimeLeft: (_s, _timeLeft, progressRatio) => {
          setProgress(1 - progressRatio);
        },
      },
    });
    swiperRef.current = swiper
    return () => { swiper.destroy(true, true); swiperRef.current = null }
  }, [])

  // Keep menu preview image in sync with active slide
  useEffect(() => {
    const item = menuItems[activeIndex]
    if (item?.background) setPreviewBg(projectImages[item.background])
  }, [activeIndex, menuItems])

  // Lock/unlock Swiper when detail panel opens or closes
  useEffect(() => {
    const swiper = swiperRef.current
    if (!swiper) return
    if (slideOpen) {
      swiper.mousewheel.disable()
      swiper.keyboard.disable()
      if (AUTO_SLIDE) swiper.autoplay.stop();
    } else {
      swiper.mousewheel.enable()
      swiper.keyboard.enable()
      if (AUTO_SLIDE) swiper.autoplay.start();
    }
  }, [slideOpen])

  const handleOpenSlide = useCallback((id) => {
    setOpenSlideId(id)
  }, [])

  const handleCloseSlide = useCallback(() => {
    setOpenSlideId(null)
  }, [])

  const handleMenuToggle = useCallback(() => setMenuOpen(v => !v), [])

  const handleMenuNavigate = useCallback((index) => {
    swiperRef.current?.slideTo(index);
    setMenuOpen(false)
    setOpenSlideId(null)
  }, [])

  const handleMenuHover = useCallback((index) => {
    const item = menuItems[index]
    if (item?.background) setPreviewBg(projectImages[item.background])
  }, [menuItems])

  const handleMenuLeave = useCallback(() => {
    const item = menuItems[activeIndex]
    if (item?.background) setPreviewBg(projectImages[item.background])
  }, [activeIndex, menuItems])

  const handleMenuMouseMove = useCallback((e) => {
    if (isMobile) return
    const menu = menuRef.current
    const scrollWrap = scrollWrapRef.current
    if (!menu || !scrollWrap) return
    const wrapHeight = menu.clientHeight
    const listHeight = scrollWrap.clientHeight
    const dP = e.clientY / wrapHeight
    gsap.to(scrollWrap, { duration: 0.1, y: -(listHeight * dP - listHeight / 2), ease: 'none' })
  }, [isMobile])

  const slides = visibleProjects.map((project, i) => (
    <Slide
      key={i}
      id={i}
      title={project.title}
      category={project.category}
      background={project.background}
      date={project.date}
      shortDescription={project.shortDescription}
      url={project.url}
      pc={project.pc || []}
      mobile={project.mobile || []}
      customContent={project.customContent}
      onOpen={() => handleOpenSlide(i)}
      // Only the specific slide that was opened gets the active class
      isOpen={openSlideId === i}
    />
  ))

  return (
    <div className={`App${slideOpen ? ' slide-open' : ''}`}>
      <Loading />
      {AUTO_SLIDE && !slideOpen && <ProgressBar progress={progress} />}
      <div className="wrapper">
        <Topbar
          menuOpen={menuOpen}
          slideOpen={slideOpen}
          onMenuToggle={handleMenuToggle}
          onClose={handleCloseSlide}
        />
        <Menu
          items={menuItems}
          open={menuOpen}
          previewBg={previewBg}
          onNavigate={handleMenuNavigate}
          onHoverItem={handleMenuHover}
          onLeaveItem={handleMenuLeave}
          onMouseMove={handleMenuMouseMove}
          menuRef={menuRef}
          scrollWrapRef={scrollWrapRef}
          isMobile={isMobile}
        />
        <div className="blog-slider">
          <div
            className={`blog-slider__wrp swiper-wrapper${slideOpen ? ' swiper-no-swiping' : ''}`}
          >
            <Profile />
            {slides}
          </div>
          <div className="arrows">
            <div className="navigation blog-button-prev hover-target">prev</div>
            <span className="space"></span>
            <div className="navigation blog-button-next hover-target">next</div>
          </div>
          <div className="blog-slider__pagination"></div>
        </div>
      </div>
      {!isMobile && <Cursor />}
    </div>
  );
}

export default App

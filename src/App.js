import React, { useEffect, useState } from 'react'
import './App.scss'
import { TweenMax, Power1, Linear, TimelineMax } from 'gsap'
import $ from 'jquery'
import Swiper from 'swiper'
import ReactGA from 'react-ga'

// import Swiper from "swiper/dist/js/swiper.esm.bundle";
import 'swiper/dist/css/swiper.min.css'
// import { extname } from "path";
import Topbar from './component/Topbar.js'
import Menu from './component/Menu.js'
import Profile from './component/Profile.js'
import Slide from './component/Slide.js'
import Loading from './component/Loading.js'
import { projects } from './data.json'
import Cursor from './component/Cursor.js'
import IsMobile from './helper/IsMobile'
import ProgressBar from './component/ProgressBar'

export const initializeReactGA = () => {
  ReactGA.initialize('UA-89794136-1')
  ReactGA.pageview(window.location.pathname)
}

const App = () => {
  const [slideOpen, setSlideOpen] = useState(false)
  const duration = 7
  const tl = new TimelineMax()
  const Progress = () => {
    tl.fromTo('.progress', duration, { height: 0 }, { height: '100%' })
  }
  useEffect(() => {
    Progress()
  }, [])
  useEffect(() => {
    const MySwiper = new Swiper('.blog-slider', {
      spaceBetween: 30,
      effect: 'fade', //fade slide
      loop: true,
      preventClicks: false,
      preventClicksPropagation: false,
      shortSwipes: false,
      autoplay: {
        delay: 7000
      },
      watchSlidesProgress: true,
      mousewheel: {
        sensitivity: 3
      },
      keyboard: {
        enabled: true,
        onlyInViewport: false
      },
      pagination: {
        el: '.blog-slider__pagination',
        type: 'bullets',
        clickable: true
      },
      navigation: {
        nextEl: '.blog-button-next',
        prevEl: '.blog-button-prev'
      },
      direction: 'vertical'
    })

    MySwiper.on('slideChange', () => $('.progress').css('height', 0))
    // MySwiper.on('autoplayStop', () => MySwiper.autoplay.start())
    MySwiper.on('autoplay', () => Progress())

    $('.toggle-menu').click(function() {
      $(this).toggleClass('active')
      $('.menu').fadeToggle(600)
      menuTransform()
    })

    // $('.top_bar').midnight();
    const contentOpen = () => {
      $('.swiper-slide-active')
        .find('.content_wrapper')
        .css('right', '-45%')
      var htmlWidth = window.innerWidth
      if (htmlWidth <= 576) {
        $('.swiper-slide-active')
          .find('.content_wrapper')
          .css('right', '-100%')
      }
      $('.swiper-slide-active')
        .find('.blog-slider__img')
        .css('right', '0px')
      $('.swiper-slide')
        .find('.videoWrapper')
        .css('display', 'block')
      $('.closeBtn').fadeIn(600)
      $('.swiper-slide-active')
        .find('.project-info, .view-website')
        .addClass('active')
      if (htmlWidth > 576) {
        $('.swiper-slide-active')
          .find('.scrollDown')
          .fadeIn(600)
      }
      $('.swiper-slide-active')
        .find('.project-content')
        .addClass('active')
      $('.swiper-slide-active')
        .find('.info-background')
        .fadeIn('600')
      $('.blog-slider__pagination').fadeOut(400)
      $('.arrows').fadeOut(400)
      $('.swiper-wrapper').addClass('swiper-no-swiping')
      MySwiper.mousewheel.disable()
      MySwiper.keyboard.disable()
      $('.swiper-slide-active').addClass('scroll')
      $('.scroll').animate(
        {
          scrollTop: 0
        },
        0
      )
    }
    /* change to vainila javascript onClick function below */
    $('.blog-slider__button').on('click', function(e) {
      e.preventDefault()
      contentOpen()
      MySwiper.autoplay.stop()
    })

    $('.swiper-slide')
      .find('.info-background')
      .css('display', 'none')

    const contentClose = fod => {
      $('.scroll').animate(
        {
          scrollTop: 0
        },
        400
      )
      $('.blog-slider__img').css({
        transform: 'translate3d(0, 0, 0) scale(1)'
      })
      $('.swiper-slide').removeClass('scroll')
      $('.swiper-slide')
        .find('.content_wrapper')
        .css('right', '0px')
      $('.swiper-slide')
        .find('.videoWrapper')
        .css('display', 'none')
      $('.swiper-slide')
        .find('.blog-slider__img')
        .css('right', '300px')
      $('.closeBtn').fadeOut(600)
      $('.swiper-slide')
        .find('.project-info, .view-website')
        .removeClass('active')
      $('.swiper-slide')
        .find('.scrollDown')
        .fadeOut(fod)
      $('.swiper-slide')
        .find('.project-content')
        .removeClass('active')
      $('.swiper-slide')
        .find('.info-background')
        .fadeOut(fod)
      $('.blog-slider__pagination').fadeIn(fod)
      $('.arrows').fadeIn(fod)
      $('.swiper-wrapper').removeClass('swiper-no-swiping')
      MySwiper.mousewheel.enable()
      MySwiper.keyboard.enable()
    }
    /* same as open button change to onClick function */
    $('.closeBtn').on('click', function(e) {
      e.preventDefault()
      contentClose(400)
      MySwiper.autoplay.start()
      Progress()
    })

    $('.menu a').click(function(e) {
      e.preventDefault()
      $('.toggle-menu').removeClass('active')
      $('.menu').fadeOut(600)
      contentClose(400)
    })
    $('.scrollTop').on('click', function(e) {
      e.preventDefault()
      $('.scroll').animate(
        {
          scrollTop: 0
        },
        400
      )
    })
    // $(".scrollDown").on("click", function(e) {
    //   e.preventDefault();
    //   $(".scroll").animate(
    //     {
    //       scrollTop: $(".project-header").height()
    //     },
    //     500,
    //     "linear"
    //   );
    // });

    //menu onclick
    $('.link').on('click', function(e) {
      e.preventDefault()
      const i = $('.link').index($(this)) + 1
      MySwiper.slideTo(i)
    })
    const menuTransform = () => {
      const menu = $('.menu'),
        wrapHeight = menu.height(),
        scrollWrap = $('.scrollWrap'),
        listHeight = scrollWrap.height()
      IsMobile()
        ? $('.menuWrapper').css({ 'overflow-y': 'scroll', display: 'block' })
        : menu.on('mousemove', function(e) {
            const dP = e.pageY / wrapHeight
            TweenMax.to(scrollWrap, 0.1, {
              y: -(listHeight * dP - listHeight / 2),
              ease: Linear.easeNone
            })
          })
    }
    projects.unshift({ background: 'jun-developer.png' })
    const changeBackground = i => {
      TweenMax.to($('.preview'), 0, {
        css: {
          backgroundImage:
            'url(' + require('./img/' + projects[i].background) + ')'
        },
        // autoAlpha: 1,
        ease: Linear.easeOut
      })
    }
    const menuActive = () => {
      const i = $('.swiper-pagination-bullet').index(
        $('.swiper-pagination-bullet-active')
      )
      changeBackground(i)
      $('.menuWrapper ul li:eq(' + i + ')')
        .find('.link')
        .addClass('active')
      $('.menuWrapper ul li:eq(' + i + ')')
        .siblings()
        .find('.link')
        .removeClass('active')
    }

    $('.menuWrapper ul li').mouseenter(function() {
      const i = $('.menuWrapper ul li').index(this)
      changeBackground(i)
    })

    $('.menuWrapper ul li').mouseleave(function() {
      const i = $('.swiper-pagination-bullet').index(
        $('.swiper-pagination-bullet-active')
      )
      changeBackground(i)
    })

    MySwiper.on('slideChange', function() {
      menuActive()
    })

    $(document).ready(function() {
      menuActive()
    })
    initializeReactGA()
  }, [])
  const onClick = () => {
    setSlideOpen(true)
  }
  const slidehandler = i => {
    this.swiper.slideTo(i)
  }
  const slides = projects.map((projects, i) => {
    return (
      <Slide
        key={i}
        id={i}
        title={projects.title}
        category={projects.category}
        background={projects.background}
        date={projects.date}
        shortDescription={projects.shortDescription}
        url={projects.url}
        description={projects.description}
        pc={projects.pc}
        mobile={projects.mobile}
        customContent={projects.customContent}
      />
    )
  })
  return (
    <div className="App">
      <Loading />
      {slideOpen ? null : <ProgressBar />}
      <div className="wrapper">
        <Topbar />
        <Menu projects={projects} />
        <div className="blog-slider">
          <div className="blog-slider__wrp swiper-wrapper">
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
      {IsMobile() ? null : <Cursor />}
    </div>
  )
}

export default App

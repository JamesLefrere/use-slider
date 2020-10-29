'use strict'

var react = require('react')
var ReactDOM = require('react-dom')

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e }
}

var ReactDOM__default = /*#__PURE__*/ _interopDefaultLegacy(ReactDOM)

function move(options) {
  var slidesPerView = options.slidesPerView,
    slideWidth = options.slideWidth,
    container = options.container,
    loop = options.loop,
    _a = options.animate,
    animate = _a === void 0 ? true : _a,
    speed = options.speed,
    leftStart = options.leftStart,
    deltaX = options.deltaX,
    rightStart = options.rightStart,
    curIndex = options.curIndex
  if (!container) return
  var startTime
  var childrenNum = container.querySelectorAll('.slider-slide').length
  function moveAnimation(timestamp) {
    if (!startTime) startTime = timestamp
    var elapsed = animate ? Math.min((timestamp - startTime) / speed, 1) : 1
    var transfromLeft = leftStart + elapsed * deltaX
    while (transfromLeft <= -childrenNum * slideWidth && loop)
      transfromLeft += childrenNum * slideWidth
    while (transfromLeft > 0 && loop) transfromLeft -= childrenNum * slideWidth
    var transformStrLeft = 'translateX(' + transfromLeft + 'px)'
    var transformRight =
      (rightStart + elapsed * deltaX) % (childrenNum * slideWidth)
    while (transformRight < 0) transformRight += childrenNum * slideWidth
    var transformStrRight = 'translateX(' + transformRight + 'px)'
    for (var i = 0; i < childrenNum; i += 1) {
      var child = container.children[i]
      if (loop) {
        if (deltaX > 0) {
          if (i >= curIndex + slidesPerView - childrenNum) {
            child.style.transform = transformStrLeft
          } else {
            child.style.transform = transformStrRight
          }
        } else {
          if (i >= curIndex) {
            child.style.transform = transformStrLeft
          } else {
            child.style.transform = transformStrRight
          }
        }
      } else {
        child.style.transform = transformStrLeft
      }
    }
    if (elapsed < 1) {
      window.requestAnimationFrame(moveAnimation)
    }
  }
  window.requestAnimationFrame(moveAnimation)
}

function useAutoPlay(options) {
  var cb = options.cb,
    duration = options.duration,
    autoPlay = options.autoPlay
  var timer = react.useRef(0)
  react.useEffect(
    function () {
      if (autoPlay) {
        timer.current = window.setInterval(cb, duration)
      }
      return function () {
        clearInterval(timer.current)
      }
    },
    [duration, cb, autoPlay],
  )
}

function useEventBinding(container, type, callback) {
  react.useEffect(
    function () {
      if (!container) return
      container.addEventListener(type, callback)
      return function () {
        return container.removeEventListener(type, callback)
      }
    },
    [container, callback, type],
  )
  return callback
}

function getClientX(e) {
  return 'touches' in e ? e.changedTouches[0].clientX : e.clientX
}
function useEvent(options) {
  var container = options.container,
    curIndex = options.curIndex,
    speed = options.speed,
    setCurIndex = options.setCurIndex,
    loop = options.loop,
    slidesPerView = options.slidesPerView
  var slideWidth = container ? container.clientWidth / slidesPerView : 0
  var _a = react.useState(null),
    startClientX = _a[0],
    setStartClientX = _a[1]
  var dragStart = react.useCallback(function (e) {
    e.preventDefault()
    setStartClientX(getClientX(e))
  }, [])
  var dragMove = react.useCallback(
    function (e) {
      e.preventDefault()
      if (startClientX === null || !container) return
      var clientX = getClientX(e)
      var deltaX = clientX - startClientX
      var movedDelta = deltaX
      var updatedIndex = curIndex
      if (!loop && curIndex === 0 && deltaX > 0) {
        movedDelta = Math.pow(deltaX, 9 / 10)
      }
      var childrenNum = container.querySelectorAll('.slider-slide').length
      if (!loop && curIndex >= childrenNum - slidesPerView && deltaX < 0) {
        movedDelta = -Math.pow(-deltaX, 9 / 10)
      }
      if (deltaX > 0 && loop) {
        updatedIndex = curIndex - Math.floor(deltaX / slideWidth)
        while (updatedIndex <= 0) updatedIndex += childrenNum
      }
      if (deltaX < 0 && loop) {
        updatedIndex =
          (curIndex + Math.floor(-deltaX / slideWidth)) % childrenNum
      }
      move({
        slideWidth: slideWidth,
        slidesPerView: slidesPerView,
        container: container,
        loop: loop,
        speed: speed,
        leftStart: -curIndex * slideWidth,
        deltaX: movedDelta,
        curIndex: updatedIndex,
        rightStart: (childrenNum - curIndex) * slideWidth,
        animate: false,
      })
    },
    [container, loop, slideWidth, slidesPerView, speed, startClientX, curIndex],
  )
  var dragEnd = react.useCallback(
    function (e) {
      if (!container || startClientX === null) return
      var clientX = getClientX(e)
      var deltaX = clientX - startClientX
      if (deltaX === 0) {
        setStartClientX(null)
        return
      }
      var movedDelta = deltaX
      var updatedIndex = curIndex
      var finalDelta = deltaX > 0 ? slideWidth - deltaX : -slideWidth - deltaX
      var newIndex = curIndex
      var childrenNum = container.querySelectorAll('.slider-slide').length
      if (deltaX < 0) {
        newIndex = (curIndex + 1) % childrenNum
      } else if (deltaX > 0) {
        if (curIndex === 0) {
          newIndex = childrenNum - 1
        } else {
          newIndex = curIndex - 1
        }
      }
      if (!loop && curIndex === 0 && deltaX > 0) {
        movedDelta = Math.pow(deltaX, 9 / 10)
        finalDelta = -Math.pow(deltaX, 9 / 10)
        newIndex = curIndex
      }
      if (!loop && curIndex >= childrenNum - slidesPerView && deltaX < 0) {
        movedDelta = -Math.pow(-deltaX, 9 / 10)
        finalDelta = Math.pow(-deltaX, 9 / 10)
        newIndex = curIndex
      }
      if (deltaX > 0 && loop) {
        updatedIndex = curIndex - Math.floor(deltaX / slideWidth)
        while (updatedIndex <= 0) updatedIndex += childrenNum
        newIndex = updatedIndex - 1
        finalDelta = slideWidth - (deltaX % slideWidth)
      }
      if (deltaX < 0 && loop) {
        updatedIndex =
          (curIndex + Math.floor(-deltaX / slideWidth)) % childrenNum
        newIndex = (updatedIndex + 1) % childrenNum
        finalDelta = -slideWidth - (deltaX % slideWidth)
      }
      move({
        slideWidth: slideWidth,
        slidesPerView: slidesPerView,
        container: container,
        loop: loop,
        speed: speed,
        leftStart: -curIndex * slideWidth + movedDelta,
        deltaX: finalDelta,
        curIndex: updatedIndex,
        rightStart: (childrenNum - curIndex) * slideWidth + movedDelta,
        animate: true,
      })
      setCurIndex(newIndex)
      setStartClientX(null)
    },
    [
      container,
      curIndex,
      setCurIndex,
      slideWidth,
      slidesPerView,
      loop,
      speed,
      startClientX,
    ],
  )
  useEventBinding(container, 'mousedown', dragStart)
  useEventBinding(container, 'touchstart', dragStart)
  useEventBinding(container, 'mousemove', dragMove)
  useEventBinding(container, 'touchmove', dragMove)
  useEventBinding(container, 'mouseup', dragEnd)
  useEventBinding(container, 'mouseleave', dragEnd)
  useEventBinding(container, 'touchend', dragEnd)
}

function initPagination(container, pagination, curIndex, moveTo) {
  var oldPaginationNode = container.querySelector(
    '.slider-pagination-container',
  )
  if (oldPaginationNode) container.removeChild(oldPaginationNode)
  var paginationContainer = document.createElement('div')
  paginationContainer.classList.add('slider-pagination-container')
  var paginationList = []
  var _loop_1 = function (i) {
    if (pagination === true) {
      var paginationItem = document.createElement('span')
      paginationItem.classList.add('slider-pagination-dot')
      paginationItem.classList.add('slider-pagination-dot__default')
      if (curIndex === i) paginationItem.classList.add('active')
      paginationItem.addEventListener('click', function () {
        return moveTo(i)
      })
      paginationContainer.appendChild(paginationItem)
    } else {
      var renderedComponent =
        typeof pagination === 'function' ? pagination(i) : pagination
      paginationList.push(
        react.cloneElement(renderedComponent, {
          onClick: function () {
            return moveTo(i)
          },
          className:
            (renderedComponent.props.className
              ? renderedComponent.props.className
              : '') +
            ' slider-pagination-dot ' +
            (curIndex === i ? 'active' : ''),
        }),
      )
    }
  }
  for (
    var i = 0;
    i < container.querySelectorAll('.slider-slide').length;
    i += 1
  ) {
    _loop_1(i)
  }
  if (paginationList.length) {
    ReactDOM__default['default'].render(paginationList, paginationContainer)
  }
  container.appendChild(paginationContainer)
}
function usePagination(options) {
  var container = options.container,
    pagination = options.pagination,
    curIndex = options.curIndex,
    moveTo = options.moveTo
  react.useEffect(
    function () {
      if (!container || !pagination) return
      var observer = new MutationObserver(function (mutationList) {
        if (
          mutationList.every(function (mutationRecord) {
            return (
              Array.from(mutationRecord.addedNodes).every(function (node) {
                return !node.classList.contains('slider-pagination-container')
              }) &&
              Array.from(mutationRecord.removedNodes).every(function (node) {
                return !node.classList.contains('slider-pagination-container')
              })
            )
          })
        ) {
          initPagination(container, pagination, curIndex, moveTo)
        }
      })
      observer.observe(container, {
        childList: true,
        attributes: false,
        subtree: false,
      })
      initPagination(container, pagination, curIndex, moveTo)
      return function () {
        return observer.disconnect()
      }
    },
    [container, curIndex, pagination, moveTo],
  )
  react.useEffect(
    function () {
      if (!container || !pagination) return
      var paginationContainer = container.querySelector(
        '.slider-pagination-container',
      )
      if (!paginationContainer) return
      for (var i = 0; i < paginationContainer.children.length; i += 1) {
        var child = paginationContainer.children[i]
        if (i === curIndex) {
          child.classList.add('active')
        } else {
          child.classList.remove('active')
        }
      }
    },
    [container, curIndex, pagination],
  )
}

function initNavigation(
  container,
  navigation,
  prev,
  next,
  arrowLeft,
  arrowRight,
) {
  if (navigation || arrowLeft || arrowRight) {
    var oldNavigationNode = container.querySelector(
      '.slider-navigation-container',
    )
    if (oldNavigationNode) container.removeChild(oldNavigationNode)
    var navigationContainer = document.createElement('div')
    navigationContainer.classList.add('slider-navigation-container')
    var navigationList = []
    if (arrowLeft)
      navigationList.push(
        react.cloneElement(arrowLeft, {
          onClick: prev,
          className:
            (arrowLeft.props.className ? arrowLeft.props.className : '') +
            ' slider-navigation-left',
        }),
      )
    if (arrowRight)
      navigationList.push(
        react.cloneElement(arrowRight, {
          onClick: next,
          className:
            (arrowRight.props.className ? arrowRight.props.className : '') +
            ' slider-navigation-right',
        }),
      )
    if (navigationList.length) {
      ReactDOM__default['default'].render(navigationList, navigationContainer)
    } else {
      var navigationLeft = document.createElement('div')
      navigationLeft.classList.add('slider-navigation-left')
      navigationLeft.classList.add('slider-navigation-left__default')
      var navigationRight = document.createElement('div')
      navigationRight.classList.add('slider-navigation-right')
      navigationRight.classList.add('slider-navigation-right__default')
      navigationContainer.appendChild(navigationLeft)
      navigationContainer.appendChild(navigationRight)
      navigationLeft.addEventListener('click', prev)
      navigationRight.addEventListener('click', next)
    }
    container.appendChild(navigationContainer)
  }
}
function useNavigation(options) {
  var container = options.container,
    navigation = options.navigation,
    arrowLeft = options.arrowLeft,
    arrowRight = options.arrowRight,
    prev = options.prev,
    next = options.next
  react.useEffect(
    function () {
      if (!container) return
      var observer = new MutationObserver(function (mutationList) {
        if (
          mutationList.every(function (mutationRecord) {
            return (
              Array.from(mutationRecord.addedNodes).every(function (node) {
                return !node.classList.contains('slider-navigation-container')
              }) &&
              Array.from(mutationRecord.removedNodes).every(function (node) {
                return !node.classList.contains('slider-navigation-container')
              })
            )
          })
        ) {
          initNavigation(
            container,
            navigation,
            prev,
            next,
            arrowLeft,
            arrowRight,
          )
        }
      })
      observer.observe(container, {
        childList: true,
        attributes: false,
        subtree: false,
      })
      initNavigation(container, navigation, prev, next, arrowLeft, arrowRight)
    },
    [container, arrowLeft, arrowRight, prev, next, navigation],
  )
}

function init(container, slidesPerView) {
  container.classList.add('slider-container')
  for (var i = 0; i < container.children.length; i += 1) {
    var child = container.children[i]
    if (
      child.classList.contains('slider-pagination-container') ||
      child.classList.contains('slider-navigation-container')
    )
      continue
    child.classList.add('slider-slide')
    child.style.width = (1 / slidesPerView) * 100 + '%'
  }
}
function useInit(options) {
  var container = options.container,
    setCurIndex = options.setCurIndex,
    slidesPerView = options.slidesPerView
  react.useEffect(
    function () {
      if (!container) return
      setCurIndex(0)
      var observer = new MutationObserver(function () {
        init(container, slidesPerView)
      })
      observer.observe(container, {
        childList: true,
        attributes: false,
        subtree: false,
      })
      init(container, slidesPerView)
      return function () {
        return observer.disconnect()
      }
    },
    [setCurIndex, container, slidesPerView],
  )
}

var isClient = typeof window === 'object'

function useWindowSize() {
  var getSize = react.useCallback(function () {
    return {
      width: isClient ? window.innerWidth : 0,
      height: isClient ? window.innerHeight : 0,
    }
  }, [])
  var _a = react.useState(getSize),
    windowSize = _a[0],
    setWindowSize = _a[1]
  react.useEffect(
    function () {
      function handleResize() {
        setWindowSize(getSize())
      }
      window.addEventListener('resize', handleResize)
      return function () {
        return window.removeEventListener('resize', handleResize)
      }
    },
    [getSize],
  )
  return windowSize
}

function useSlider(options) {
  if (options === void 0) {
    options = {}
  }
  var _a = options.speed,
    speed = _a === void 0 ? 300 : _a,
    _b = options.initial,
    initial = _b === void 0 ? 0 : _b,
    _c = options.autoPlay,
    autoPlay = _c === void 0 ? false : _c,
    _d = options.duration,
    duration = _d === void 0 ? 3000 : _d,
    _e = options.loop,
    loop = _e === void 0 ? false : _e,
    _f = options.slidesPerView,
    slidesPerView = _f === void 0 ? 1 : _f,
    _g = options.pagination,
    pagination = _g === void 0 ? false : _g,
    _h = options.navigation,
    navigation = _h === void 0 ? false : _h,
    arrowLeft = options.arrowLeft,
    arrowRight = options.arrowRight
  var _j = react.useState(null),
    container = _j[0],
    setContainer = _j[1]
  var callbackRef = react.useCallback(function (instance) {
    setContainer(instance)
  }, [])
  var _k = react.useState(initial),
    curIndex = _k[0],
    setCurIndex = _k[1]
  var prev = react.useCallback(
    function () {
      setCurIndex(function (prev) {
        if (!container) return prev
        if (!loop && prev === 0) return prev
        var slideWidth = container.clientWidth / slidesPerView
        var childrenNum = container.querySelectorAll('.slider-slide').length
        var newIndex = prev === 0 ? childrenNum - 1 : prev - 1
        var updatedIndex = prev
        while (updatedIndex <= 0) updatedIndex += childrenNum
        move({
          slideWidth: slideWidth,
          slidesPerView: slidesPerView,
          container: container,
          loop: loop,
          speed: speed,
          leftStart: -prev * slideWidth,
          deltaX: slideWidth,
          curIndex: updatedIndex,
          rightStart: (childrenNum - prev) * slideWidth,
          animate: true,
        })
        return newIndex
      })
    },
    [container, loop, slidesPerView, speed],
  )
  var next = react.useCallback(
    function () {
      setCurIndex(function (prev) {
        if (!container) return prev
        var childrenNum = container.querySelectorAll('.slider-slide').length
        if (!loop && prev >= childrenNum - slidesPerView) return prev
        var slideWidth = container.clientWidth / slidesPerView
        move({
          slideWidth: slideWidth,
          slidesPerView: slidesPerView,
          container: container,
          loop: loop,
          speed: speed,
          leftStart: -prev * slideWidth,
          deltaX: -slideWidth,
          curIndex: prev,
          rightStart: (childrenNum - prev) * slideWidth,
          animate: true,
        })
        return (prev + 1) % childrenNum
      })
    },
    [container, loop, slidesPerView, speed],
  )
  var moveTo = react.useCallback(
    function (index) {
      setCurIndex(function (prev) {
        if (!container) return prev
        var childrenNum = container.querySelectorAll('.slider-slide').length
        var slideWidth = container.clientWidth / slidesPerView
        move({
          slideWidth: slideWidth,
          slidesPerView: slidesPerView,
          container: container,
          loop: loop,
          speed: speed,
          leftStart: -prev * slideWidth,
          deltaX: (prev - index) * slideWidth,
          curIndex: prev,
          rightStart: (childrenNum - prev) * slideWidth,
          animate: true,
        })
        return index
      })
    },
    [container, loop, slidesPerView, speed],
  )
  var windowSize = useWindowSize()
  react.useLayoutEffect(
    function () {
      moveTo(curIndex)
    },
    [windowSize.width],
  )
  useInit({
    container: container,
    setCurIndex: setCurIndex,
    slidesPerView: slidesPerView,
  })
  useEvent({
    container: container,
    curIndex: curIndex,
    speed: speed,
    setCurIndex: setCurIndex,
    loop: loop,
    slidesPerView: slidesPerView,
  })
  useAutoPlay({
    cb: next,
    duration: duration,
    autoPlay: autoPlay,
  })
  useNavigation({
    container: container,
    navigation: navigation,
    prev: prev,
    next: next,
    arrowLeft: arrowLeft,
    arrowRight: arrowRight,
  })
  usePagination({
    container: container,
    pagination: pagination,
    curIndex: curIndex,
    moveTo: moveTo,
  })
  return {
    ref: callbackRef,
    prev: prev,
    next: next,
    moveTo: moveTo,
    curIndex: curIndex,
  }
}

module.exports = useSlider

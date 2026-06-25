/* TappyType islands — 프리렌더된 정적 DOM에 인터랙션만 붙이는 바닐라 JS.
 *
 * React 클라이언트 하이드레이션을 대체한다(빌드 후 scripts/strip-react.mjs 가
 * 하이드레이션 <script type=module app.js> 를 제거 → 브라우저엔 React가 안 나간다).
 * React 컴포넌트는 "빌드타임 프리렌더 전용", 이 파일은 "런타임 전용".
 *
 * ⚠️ 인터랙티브 동작(자동재생·카운트업·지연마운트 등)을 바꿀 땐
 *    해당 React 컴포넌트와 이 파일을 함께 수정할 것. 정적 마크업/디자인만
 *    바꿀 땐 React 컴포넌트만 고치면 된다.
 */
;(function () {
  'use strict'

  var reduceMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // ── 스크롤 리빌: .reveal → .is-visible (useReveal 이식) ──
  // html.js-reveal .reveal 은 숨겨져 있으므로 반드시 is-visible 을 붙여야 보인다.
  function setupReveal() {
    var els = document.querySelectorAll('.reveal')
    if (!els.length) return

    var io = new IntersectionObserver(
      function (entries, obs) {
        for (var i = 0; i < entries.length; i++) {
          var e = entries[i]
          if (e.isIntersecting) {
            reveal(e.target)
            obs.unobserve(e.target)
          }
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -8% 0px' },
    )

    els.forEach(function (el) {
      var r = el.getBoundingClientRect()
      if (r.top < window.innerHeight && r.bottom > 0) reveal(el)
      else io.observe(el)
    })
  }

  function reveal(el) {
    if (el.classList.contains('is-visible')) return
    el.classList.add('is-visible')
    if (el.id === 'moment') startCountUp() // Moment 섹션 진입 시 카운트업(원본 onReveal)
  }

  // ── Moment 카운트업: #moment .counter .to 를 0 → 11,172 (useCountUp 이식) ──
  function startCountUp() {
    var to = document.querySelector('#moment .counter .to')
    if (!to || to.getAttribute('data-counted')) return
    to.setAttribute('data-counted', '1')

    var target = 11172
    if (reduceMotion) {
      to.textContent = target.toLocaleString()
      return
    }
    var dur = 1100
    var t0 = performance.now()
    function tick(now) {
      var p = Math.min(1, (now - t0) / dur)
      var eased = 1 - Math.pow(1 - p, 3)
      to.textContent = Math.round(target * eased).toLocaleString()
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }

  // ── Tester: 입력값을 3개의 .wf-line 으로 미러링 ──
  function setupTester() {
    var input = document.getElementById('tt-preview')
    if (!input) return
    var lines = document.querySelectorAll('.tester .wf-line')
    input.addEventListener('input', function () {
      var v = input.value || ' '
      for (var i = 0; i < lines.length; i++) lines[i].textContent = v
    })
  }

  // ── LearnWrite 캐러셀: 자동재생 + 도트 + 호버 정지 (LearnWrite 이식) ──
  function setupCarousel() {
    var carousel = document.querySelector('.learn-carousel')
    if (!carousel) return
    var imgs = carousel.querySelectorAll('.learn-stage img')
    var dots = carousel.querySelectorAll('.learn-dots button')
    if (imgs.length < 2) return

    var INTERVAL = 3200
    var n = imgs.length
    var active = 0
    var paused = false
    var timer = null

    function show(i) {
      active = ((i % n) + n) % n
      imgs.forEach(function (img, idx) {
        if (idx === active) {
          img.classList.add('is-active')
          img.removeAttribute('aria-hidden')
        } else {
          img.classList.remove('is-active')
          img.setAttribute('aria-hidden', 'true')
        }
      })
      dots.forEach(function (d, idx) {
        if (idx === active) {
          d.classList.add('is-active')
          d.setAttribute('aria-current', 'true')
        } else {
          d.classList.remove('is-active')
          d.removeAttribute('aria-current')
        }
      })
    }

    function start() {
      if (paused || reduceMotion || timer) return
      timer = window.setInterval(function () {
        show(active + 1)
      }, INTERVAL)
    }
    function stop() {
      if (timer) {
        clearInterval(timer)
        timer = null
      }
    }

    dots.forEach(function (d, idx) {
      d.addEventListener('click', function () {
        show(idx)
      })
    })
    carousel.addEventListener('mouseenter', function () {
      paused = true
      stop()
    })
    carousel.addEventListener('mouseleave', function () {
      paused = false
      start()
    })
    start()
  }

  // ── YouTube 데모: 스크롤 근처에서만 iframe + 2배속 API 마운트 (YouTubeDemo 이식) ──
  function setupYouTube() {
    var holder = document.getElementById('demo')
    if (!holder) return
    var vid = holder.getAttribute('data-yt')
    if (!vid || holder.querySelector('iframe')) return

    var io = new IntersectionObserver(
      function (entries, obs) {
        for (var i = 0; i < entries.length; i++) {
          if (entries[i].isIntersecting) {
            mountYouTube(holder, vid)
            obs.disconnect()
            return
          }
        }
      },
      { rootMargin: '300px' },
    )
    io.observe(holder)
  }

  function mountYouTube(holder, vid) {
    var iframe = document.createElement('iframe')
    iframe.id = 'ttDemo'
    iframe.src =
      'https://www.youtube-nocookie.com/embed/' +
      vid +
      '?autoplay=1&mute=1&playsinline=1&rel=0&loop=1&playlist=' +
      vid +
      '&enablejsapi=1&vq=hd1080'
    iframe.title = 'TappyType 데모 영상 — 손글씨가 폰트가 되는 과정'
    iframe.setAttribute(
      'allow',
      'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
    )
    iframe.setAttribute('allowfullscreen', '')
    iframe.loading = 'lazy'
    holder.appendChild(iframe)

    var API = 'https://www.youtube.com/iframe_api'
    function createPlayer() {
      if (!window.YT || !window.YT.Player) return
      new window.YT.Player('ttDemo', {
        events: {
          onReady: function (e) {
            try {
              e.target.setPlaybackRate(2)
              e.target.mute()
              e.target.playVideo()
            } catch (_) {
              /* noop */
            }
          },
        },
      })
    }
    if (window.YT && window.YT.Player) createPlayer()
    else {
      window.onYouTubeIframeAPIReady = createPlayer
      if (!document.querySelector('script[src="' + API + '"]')) {
        var s = document.createElement('script')
        s.src = API
        document.body.appendChild(s)
      }
    }
  }

  // ── Instagram: 스크롤 근처에서만 behold 위젯 + 스크립트 마운트 (Instagram 이식) ──
  function setupInstagram() {
    var embed = document.querySelector('.insta-embed')
    if (!embed) return
    var feed = embed.getAttribute('data-feed-id')
    if (!feed || embed.querySelector('behold-widget')) return

    var io = new IntersectionObserver(
      function (entries, obs) {
        for (var i = 0; i < entries.length; i++) {
          if (entries[i].isIntersecting) {
            var w = document.createElement('behold-widget')
            w.setAttribute('feed-id', feed)
            embed.appendChild(w)
            var SRC = 'https://w.behold.so/widget.js'
            if (!document.querySelector('script[src="' + SRC + '"]')) {
              var s = document.createElement('script')
              s.type = 'module'
              s.src = SRC
              document.body.appendChild(s)
            }
            obs.disconnect()
            return
          }
        }
      },
      { rootMargin: '400px' },
    )
    io.observe(embed)
  }

  // ── Nav 언어 토글: 직접 고른 언어를 ttlang 쿠키로 기억(자동 분기 끔, rememberLang 이식) ──
  function setupLangToggle() {
    var toggle = document.querySelector('.lang-toggle')
    if (!toggle) return
    toggle.addEventListener('click', function () {
      var href = toggle.getAttribute('href') || ''
      var lang = href.indexOf('/en') === 0 ? 'en' : 'ko'
      document.cookie = 'ttlang=' + lang + '; path=/; max-age=31536000; samesite=lax'
    })
  }

  function init() {
    var fns = [
      setupReveal,
      setupTester,
      setupCarousel,
      setupYouTube,
      setupInstagram,
      setupLangToggle,
    ]
    for (var i = 0; i < fns.length; i++) {
      try {
        fns[i]()
      } catch (_) {
        /* 한 위젯이 실패해도 나머지는 동작 */
      }
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init)
  else init()
})()

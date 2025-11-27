// Initialize Intro Slider
document.addEventListener('DOMContentLoaded', function() {
    // Check if Swiper is loaded
    if (typeof Swiper !== 'undefined') {
        var swiper = new Swiper('.introSliderOne', {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.hero-section .swiper-pagination',
                clickable: true,
                renderBullet: function (index, className) {
                    return '<span class="' + className + '">' + (index + 1) + '</span>';
                },
            },
            on: {
                slideChange: function() {
                    // Reset và trigger animation lại cho slide mới
                    var activeSlide = this.slides[this.activeIndex];
                    if (!activeSlide) return;
                    
                    var introBox = activeSlide.querySelector('.intro-box');
                    var introContent = activeSlide.querySelector('.intro-content');
                    var introImage = activeSlide.querySelector('.intro-image-wrapper');
                    
                    // Reset opacity và transform trước
                    if (introBox) {
                        introBox.style.opacity = '0';
                        introBox.style.transform = 'translateY(-30px)';
                        introBox.style.animation = 'none';
                        setTimeout(function() {
                            introBox.style.animation = 'slideInBox 1s ease forwards';
                        }, 50);
                    }
                    
                    if (introContent) {
                        introContent.style.opacity = '0';
                        introContent.style.transform = 'translateX(-80px)';
                        introContent.style.animation = 'none';
                        setTimeout(function() {
                            introContent.style.animation = 'slideInLeft 1.1s ease forwards 0.2s';
                        }, 50);
                    }
                    
                    if (introImage) {
                        introImage.style.opacity = '0';
                        introImage.style.transform = 'translateX(80px)';
                        introImage.style.animation = 'none';
                        setTimeout(function() {
                            introImage.style.animation = 'slideInRight 1.1s ease forwards 0.3s';
                        }, 50);
                    }
                }
            }
        });
    } else {
        console.error('Swiper library is not loaded');
    }
    
    // Navbar scroll effect
    var navbar = document.querySelector('.navbar-custom');
    var scrollThreshold = 100; // Khoảng cách scroll để kích hoạt
    var scrollTopBtn = document.querySelector('.scroll-top-btn');
    var scrollTopThreshold = 350;
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > scrollThreshold) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    function handleScrollTopVisibility() {
        if (!scrollTopBtn) return;
        if (window.scrollY > scrollTopThreshold) {
            scrollTopBtn.classList.add('is-visible');
        } else {
            scrollTopBtn.classList.remove('is-visible');
        }
    }

    window.addEventListener('scroll', handleScrollTopVisibility);
    handleScrollTopVisibility();

    function scrollToTopAnimated(duration) {
        var startY = window.scrollY || window.pageYOffset;
        var startTime = performance.now();

        function easeOutCubic(t) {
            return 1 - Math.pow(1 - t, 3);
        }

        function step(currentTime) {
            var elapsed = currentTime - startTime;
            var progress = Math.min(elapsed / duration, 1);
            var eased = easeOutCubic(progress);
            window.scrollTo(0, startY * (1 - eased));
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }

        requestAnimationFrame(step);
    }

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function() {
            scrollToTopAnimated(1000);
        });
    }

    // Mobile menu toggle
    var mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    var mobileMenuOpenBtn = document.querySelector('.navbar-toggler');
    var mobileMenuCloseBtn = document.querySelector('.mobile-menu-close');
    var mobileMenuLinks = document.querySelectorAll('.mobile-menu-list a');

    function openMobileMenu() {
        if (!mobileMenuOverlay) return;
        mobileMenuOverlay.classList.add('is-open');
        document.body.classList.add('mobile-menu-open');
        mobileMenuOverlay.setAttribute('aria-hidden', 'false');
    }

    function closeMobileMenu() {
        if (!mobileMenuOverlay) return;
        mobileMenuOverlay.classList.remove('is-open');
        document.body.classList.remove('mobile-menu-open');
        mobileMenuOverlay.setAttribute('aria-hidden', 'true');
    }

    if (mobileMenuOpenBtn && mobileMenuOverlay) {
        mobileMenuOpenBtn.addEventListener('click', function(event) {
            event.preventDefault();
            openMobileMenu();
        });
    }

    if (mobileMenuCloseBtn) {
        mobileMenuCloseBtn.addEventListener('click', function() {
            closeMobileMenu();
        });
    }

    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', function(event) {
            if (event.target === mobileMenuOverlay) {
                closeMobileMenu();
            }
        });
    }

    mobileMenuLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeMobileMenu();
        }
    });
    
    // Initialize Tilt.js for service cards
    if (typeof VanillaTilt !== 'undefined') {
        var serviceCards = document.querySelectorAll('.service-card[data-tilt]');
        serviceCards.forEach(function(card) {
            VanillaTilt.init(card, {
                max: 10,
                speed: 1000,
                glare: false,
                'max-glare': 0.5
            });
        });
    }
    
    // Initialize Projects Carousel
if (typeof Swiper !== 'undefined') {
    var projectSwiper = new Swiper('.projectSliderOne', {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 40,
        loop: false,
        initialSlide: 3, // bắt đầu từ slide 4
        speed: 1500,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
        },
        navigation: {
            nextEl: '.arrow-next',
            prevEl: '.arrow-prev',
        },
        slidesPerGroup: 1,      // Chỉ trượt 1 slide mỗi lần
        simulateTouch: true,    // Cho phép kéo bằng chuột
        touchRatio: 1,          // Tỷ lệ kéo mặc định
        breakpoints: {
            0: { slidesPerView: 1, spaceBetween: 16 },
            768: { slidesPerView: 'auto', spaceBetween: 30 }
        },
    });

      // --- Chặn NEXT/PREV trong lúc slide đang chuyển ---
    projectSwiper.on('slideChangeTransitionStart', function () {
        projectSwiper.allowSlideNext = false;
        projectSwiper.allowSlidePrev = false;
    });
    // --- Logic vòng lặp ---
    projectSwiper.on('slideChangeTransitionEnd', function () {
        projectSwiper.allowSlideNext = true;
        projectSwiper.allowSlidePrev = true;
        const i = projectSwiper.activeIndex;

        // Khi tới slide 6 (index 5) → nhảy tức thì về slide 3 (index 2)
        if (i === 5) {
            projectSwiper.setTransition(0);
            projectSwiper.slideTo(2, 0); // nhảy tức thì
            setTimeout(() => projectSwiper.setTransition(800), 20);
        }

        // Khi tới slide 2 (index 1) do bấm PREV → nhảy tức thì về slide 5 (index 4)
        if (i === 1) {
            projectSwiper.setTransition(0);
            projectSwiper.slideTo(4, 0);
            setTimeout(() => projectSwiper.setTransition(800), 20);
        }
        if (i === 2) {
            // Ở đây chỉ cần chắc chắn transition mượt và autoplay không bị dừng
            projectSwiper.setTransition(0);
            projectSwiper.autoplay.start();
        }
        if (i === 0 || i === 6) {
            projectSwiper.setTransition(0);
            projectSwiper.slideTo(3, 0);
            setTimeout(() => projectSwiper.setTransition(800), 20);
        }
    });

}




    
    // Client Logos Drag Functionality
    var logosWrapper = document.querySelector('.client-logos-wrapper');
    var logosTrack = document.querySelector('.client-logos-track');
    
    if (logosWrapper && logosTrack) {
        var isDragging = false;
        var startX = 0;
        var currentX = 0;
        var scrollLeft = 0;
        
        // Get current transform value from animation
        function getCurrentTransform() {
            var style = window.getComputedStyle(logosTrack);
            var matrix = style.transform || style.webkitTransform || style.mozTransform;
            if (matrix && matrix !== 'none') {
                var values = matrix.split('(')[1].split(')')[0].split(',');
                return parseFloat(values[4]) || 0;
            }
            return 0;
        }
        
        // Mouse events
        logosWrapper.addEventListener('mousedown', function(e) {
            isDragging = true;
            startX = e.pageX - logosWrapper.offsetLeft;
            scrollLeft = getCurrentTransform();
            logosTrack.classList.add('dragging');
            logosTrack.style.animationPlayState = 'paused';
            e.preventDefault();
        });
        
        logosWrapper.addEventListener('mouseleave', function() {
            if (isDragging) {
                isDragging = false;
                logosTrack.classList.remove('dragging');
                logosTrack.style.animationPlayState = 'running';
                logosTrack.style.transform = '';
            }
        });
        
        logosWrapper.addEventListener('mouseup', function() {
            if (isDragging) {
                isDragging = false;
                logosTrack.classList.remove('dragging');
                logosTrack.style.animationPlayState = 'running';
                logosTrack.style.transform = '';
            }
        });
        
        logosWrapper.addEventListener('mousemove', function(e) {
            if (!isDragging) return;
            e.preventDefault();
            currentX = e.pageX - logosWrapper.offsetLeft;
            var walk = (currentX - startX) * 1.5; // Tốc độ kéo
            var newTransform = scrollLeft + walk;
            logosTrack.style.transform = 'translateX(' + newTransform + 'px)';
        });
        
        // Touch events for mobile
        logosWrapper.addEventListener('touchstart', function(e) {
            isDragging = true;
            startX = e.touches[0].pageX - logosWrapper.offsetLeft;
            scrollLeft = getCurrentTransform();
            logosTrack.classList.add('dragging');
            logosTrack.style.animationPlayState = 'paused';
        });
        
        logosWrapper.addEventListener('touchend', function() {
            if (isDragging) {
                isDragging = false;
                logosTrack.classList.remove('dragging');
                logosTrack.style.animationPlayState = 'running';
                logosTrack.style.transform = '';
            }
        });
        
        logosWrapper.addEventListener('touchmove', function(e) {
            if (!isDragging) return;
            e.preventDefault();
            currentX = e.touches[0].pageX - logosWrapper.offsetLeft;
            var walk = (currentX - startX) * 1.5;
            var newTransform = scrollLeft + walk;
            logosTrack.style.transform = 'translateX(' + newTransform + 'px)';
        });
    }
    
    // Counter Animation
    var counterSection = document.querySelector('.counter-section');
    var counterNumbers = document.querySelectorAll('.counter-number');
    var hasCounted = false;
    
    if (counterSection && counterNumbers.length > 0) {
        function animateCounter(element) {
            var target = parseInt(element.getAttribute('data-target'));
            var duration = 2000; // 2 seconds
            var step = target / (duration / 16); // 60fps
            var current = 0;
            
            var timer = setInterval(function() {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current);
            }, 16);
        }
        
        function checkCounterVisibility() {
            if (hasCounted) return;
            
            var rect = counterSection.getBoundingClientRect();
            var isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                counterNumbers.forEach(function(counter) {
                    animateCounter(counter);
                });
                hasCounted = true;
            }
        }
        
        // Check on scroll
        window.addEventListener('scroll', checkCounterVisibility);
        
        // Check on load
        checkCounterVisibility();
    }

    // Counter animation for appointment section
    var appointmentCounter = document.querySelector('.appointment-counter');
    var appointmentCounterCounted = false;
    
    if (appointmentCounter) {
        function animateAppointmentCounter(element) {
            var target = parseInt(element.getAttribute('data-target'));
            var duration = 2000; // 2 seconds
            var step = target / (duration / 16); // 60fps
            var current = 0;
            
            var timer = setInterval(function() {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                // Format number with comma (2,000 format)
                element.textContent = Math.floor(current).toLocaleString('en-US');
            }, 16);
        }
        
        function checkAppointmentCounterVisibility() {
            if (appointmentCounterCounted) return;
            
            var rect = appointmentCounter.closest('.appointment-section').getBoundingClientRect();
            var isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                animateAppointmentCounter(appointmentCounter);
                appointmentCounterCounted = true;
            }
        }
        
        // Check on scroll
        window.addEventListener('scroll', checkAppointmentCounterVisibility);
        
        // Check on load
        checkAppointmentCounterVisibility();
    }

    // Scroll-triggered reveal animations
    var scrollRevealSelectors = [
        '.intro-box',
        '.intro-content',
        '.intro-image-wrapper',
        '.wcu-thumb .thumb1',
        '.wcu-thumb .thumb2',
        '.wcu-thumb .shape1',
        '.wcu-thumb .img-custom-anim-left',
        '.wcu-thumb .img-custom-anim-top',
        '.wcu-content .subtitle',
        '.wcu-content .section-title h2',
        '.services-section .section-title h2',
        '.explore-services-header .subtitle',
        '.explore-main-title',
        '.fancy-box.style1',
        '.services-thumb.img-custom-anim-left',
        '.team-section .section-title h2',
        '.team-card',
        '.recent-blogs-section .section-title-area .subtitle',
        '.recent-blogs-section .section-title-area .section-title h2',
        '.blog-card-items.style1',
        '.appointment-section .section-title .subtitle',
        '.appointment-section .section-title h2',
        '.appointment-section .desc p',
        '.appointment-form-wrapper',
        '.appointment-section .appointment-thumb.style1',
        '.appointment-thumb.style1 .thumb.img-custom-anim-left',
        '.cta-thumb.img-custom-anim-left',
        '.cta-thumb .icon',
        '.pricing-thumb.style1',
        '.pricing-box.style1 .section-title .subtitle',
        '.pricing-box.style1 .section-title h2'
    ];

    var scrollRevealObserved = new Set();
    var scrollRevealObserver = null;

    function revealScrollTarget(element) {
        if (!element.classList.contains('is-visible')) {
            element.classList.add('is-visible');
        }
    }

    function observeScrollTargets(elements) {
        if (!elements.length) {
            return;
        }

        if ('IntersectionObserver' in window) {
            if (!scrollRevealObserver) {
                scrollRevealObserver = new IntersectionObserver(function(entries) {
                    entries.forEach(function(entry) {
                        if (entry.isIntersecting) {
                            revealScrollTarget(entry.target);
                            scrollRevealObserver.unobserve(entry.target);
                        }
                    });
                }, {
                    threshold: 0.25,
                    rootMargin: '0px 0px -10% 0px'
                });
            }

            elements.forEach(function(element) {
                scrollRevealObserver.observe(element);
            });
        } else {
            elements.forEach(function(element, index) {
                setTimeout(function() {
                    revealScrollTarget(element);
                }, 200 + index * 100);
            });
        }
    }

    function initScrollRevealTargets() {
        var newElements = [];

        scrollRevealSelectors.forEach(function(selector) {
            document.querySelectorAll(selector).forEach(function(element) {
                if (!scrollRevealObserved.has(element)) {
                    element.classList.add('scroll-animate-target');
                    scrollRevealObserved.add(element);
                    newElements.push(element);
                }
            });
        });

        observeScrollTargets(newElements);
    }

    initScrollRevealTargets();
    window.addEventListener('load', initScrollRevealTargets);

    // Footer reveal animation
    var footerSection = document.querySelector('.footer-section');

    if (footerSection) {
        footerSection.classList.add('footer-animate-ready');

        function revealFooterSection() {
            footerSection.classList.add('footer-revealed');
        }

        if (typeof IntersectionObserver !== 'undefined') {
            var footerObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        revealFooterSection();
                        footerObserver.disconnect();
                    }
                });
            }, { threshold: 0.2 });

            footerObserver.observe(footerSection);
        } else {
            // Fallback for older browsers
            setTimeout(revealFooterSection, 300);
        }
    }
});

// Updated custom cursor: expanded circle follows the mouse and ring grows when expanded
// Thay thế toàn bộ nội dung cũ trong cuối home.js bằng đoạn này.

(function () {
  // Ngừng trên thiết bị cảm ứng
  const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
  if (isTouch) return;

  // Tạo / tái sử dụng phần tử cursor
  let dot = document.querySelector('.cursor-dot');
  let ring = document.querySelector('.cursor-ring');

  if (!dot) {
    dot = document.createElement('div');
    dot.className = 'cursor-dot';
    dot.style.transition = dot.style.transition || 'transform 220ms cubic-bezier(.2,.9,.2,1), width 220ms cubic-bezier(.2,.9,.2,1), height 220ms cubic-bezier(.2,.9,.2,1), background-color 180ms ease, opacity 160ms ease';
  }
  if (!ring) {
    ring = document.createElement('div');
    ring.className = 'cursor-ring';
    ring.style.transition = ring.style.transition || 'transform 180ms cubic-bezier(.2,.9,.2,1), width 180ms ease, height 180ms ease, opacity 160ms ease';
  }
  if (!document.body.contains(ring)) document.body.appendChild(ring);
  if (!document.body.contains(dot)) document.body.appendChild(dot);

  // Vị trí
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX, ringY = mouseY;
  let dotX = mouseX, dotY = mouseY;

  // smoothing
  const ringEase = 0.16;
  const dotEase = 0.28;

  // cấu hình mặc định
  const defaultDotSize = 5;          // kích thước dot mặc định (CSS có thể override)
  const defaultRingSize = 30;        // ring mặc định
  const expandedDotSizeDefault = 48; // kích thước cố định khi expand (mọi nút bằng nhau)
  const expandedRingSize = 72;       // khi expanded: ring lớn hơn một chút
  const defaultAlpha = 0.45;         // opacity khi expanded

  // trạng thái
  let isExpanded = false;

  // lưu style ban đầu để restore
  function saveOriginalStyles() {
    if (!dot || !ring) return;
    if (dot.dataset._orig_boxshadow === undefined) dot.dataset._orig_boxshadow = dot.style.boxShadow || '';
    if (dot.dataset._orig_border === undefined) dot.dataset._orig_border = dot.style.border || '';
    if (dot.dataset._orig_background === undefined) dot.dataset._orig_background = dot.style.backgroundColor || '';
    if (dot.dataset._orig_width === undefined) dot.dataset._orig_width = dot.style.width || '';
    if (dot.dataset._orig_height === undefined) dot.dataset._orig_height = dot.style.height || '';
    if (ring.dataset._orig_width === undefined) ring.dataset._orig_width = ring.style.width || '';
    if (ring.dataset._orig_height === undefined) ring.dataset._orig_height = ring.style.height || '';
    if (ring.dataset._orig_display === undefined) ring.dataset._orig_display = ring.style.display || '';
  }
  saveOriginalStyles();

  // mouse handlers
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    ring.style.opacity = '1';
    dot.style.opacity = '1';
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    ring.style.opacity = '0';
    dot.style.opacity = '0';
  });
  window.addEventListener('mouseenter', () => {
    ring.style.opacity = '1';
    dot.style.opacity = '1';
  });

  function lerp(a, b, n) { return (1 - n) * a + n * b; }

  // render loop: dot luôn theo chuột (dù expanded hay không),
  // ring luôn theo chuột; khi expanded ta chỉ thay đổi kích thước / màu / style
  function render() {
    // ring follow
    ringX = lerp(ringX, mouseX, ringEase);
    ringY = lerp(ringY, mouseY, ringEase);
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

    // dot follow
    dotX = lerp(dotX, mouseX, dotEase);
    dotY = lerp(dotY, mouseY, dotEase);
    dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  // click effect
  window.addEventListener('mousedown', () => document.documentElement.classList.add('cursor-click'));
  window.addEventListener('mouseup', () => document.documentElement.classList.remove('cursor-click'));

  // ---------------- color helpers ----------------
  function hexToRgba(hex, alpha = 1) {
    if (!hex) return null;
    hex = hex.replace('#', '').trim();
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    if (hex.length !== 6) return null;
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  function withAlpha(color, alpha) {
    if (!color) return null;
    color = color.trim();
    if (color[0] === '#') return hexToRgba(color, alpha) || color;
    const rgbMatch = color.match(/rgba?\s*\(([^)]+)\)/i);
    if (rgbMatch) {
      const parts = rgbMatch[1].split(',').map(p => p.trim());
      const r = parts[0] || 0;
      const g = parts[1] || 0;
      const b = parts[2] || 0;
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    return color;
  }

  // ---------------- Expand / Shrink logic (dot vẫn follow chuột) ----------------
  function expandDotToElement(el, options = {}) {
    if (!dot || !ring || !el) return;
    saveOriginalStyles();

    // KÍCH THƯỚC cố định cho mọi nút: ưu tiên data-cursor-size -> options.size -> expandedDotSizeDefault
    let targetSize = expandedDotSizeDefault;
    if (el.hasAttribute('data-cursor-size')) {
      const v = parseInt(el.getAttribute('data-cursor-size'), 10);
      if (!isNaN(v) && v > 0) targetSize = v;
    } else if (typeof options.size === 'number') {
      targetSize = options.size;
    }

    // màu: data-cursor-color OR CSS var --cursor-color OR fallback
    let color = el.getAttribute('data-cursor-color') || null;
    if (!color) {
      const cs = getComputedStyle(el);
      color = (cs.getPropertyValue('--cursor-color') || '').trim() || null;
    }
    if (!color) color = '#e6e2df';

    // alpha: data-cursor-alpha OR options.alpha OR defaultAlpha
    let alpha = defaultAlpha;
    if (el.hasAttribute('data-cursor-alpha')) {
      const a = parseFloat(el.getAttribute('data-cursor-alpha'));
      if (!isNaN(a)) alpha = a;
    } else if (typeof options.alpha === 'number') {
      alpha = options.alpha;
    }

    const softColor = withAlpha(color, alpha) || color;

    // set expanded state (để CSS có thể căn chỉnh nếu cần)
    isExpanded = true;
    document.documentElement.classList.add('cursor-expanded');

    // dot: kích thước cố định, màu mềm, remove inner ring/shadow
    dot.classList.add('fill', 'soft');
    dot.style.width = `${targetSize}px`;
    dot.style.height = `${targetSize}px`;
    dot.style.backgroundColor = softColor;
    dot.style.borderRadius = '50%';
    dot.style.boxShadow = 'none';
    dot.style.border = 'none';

    // ring: phóng to hơn 1 chút và vẫn follow chuột (không cố định tại nút)
    ring.style.display = '';
    ring.style.opacity = '0.6';
    ring.style.width = `${expandedRingSize}px`;
    ring.style.height = `${expandedRingSize}px`;
  }

  function shrinkDotToPointer(mouseXArg, mouseYArg) {
    if (!dot || !ring) return;

    // clear expanded state
    isExpanded = false;
    document.documentElement.classList.remove('cursor-expanded');
    dot.classList.remove('fill', 'soft');

    // restore ring size/visibility
    ring.style.width = ring.dataset._orig_width || '';
    ring.style.height = ring.dataset._orig_height || '';
    ring.style.display = ring.dataset._orig_display || '';
    ring.style.opacity = '1';

    // restore dot inline styles (fall back to CSS defaults)
    dot.style.width = dot.dataset._orig_width || '';
    dot.style.height = dot.dataset._orig_height || '';
    dot.style.backgroundColor = dot.dataset._orig_background || '';
    dot.style.borderRadius = '';
    dot.style.boxShadow = dot.dataset._orig_boxshadow || '';
    dot.style.border = dot.dataset._orig_border || '';

    // ensure follow continues smoothly from current mouse pos
    const mX = (typeof mouseXArg === 'number') ? mouseXArg : mouseX;
    const mY = (typeof mouseYArg === 'number') ? mouseYArg : mouseY;
    dotX = mX;
    dotY = mY;
    dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
  }

  // ---------------- Hover listeners ----------------
  const hoverSelectors = 'a, button, input, textarea, select, [data-cursor], .interactive';
  function addHoverListeners() {
    const els = document.querySelectorAll(hoverSelectors);
    els.forEach(el => {
      if (el.__hasCursorListeners) return;
      el.addEventListener('mouseenter', () => document.documentElement.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.documentElement.classList.remove('cursor-hover'));
      el.__hasCursorListeners = true;
    });
  }
  addHoverListeners();

  const expandSelector = 'button, a, .btn, [data-cursor-target], [data-cursor-color]';
  function addExpandHoverListeners() {
    const nodes = document.querySelectorAll(expandSelector);
    nodes.forEach(el => {
      if (el.__cursorExpandAttached) return;
      el.addEventListener('mouseenter', (ev) => {
        expandDotToElement(el, {
          size: el.hasAttribute('data-cursor-size') ? parseInt(el.getAttribute('data-cursor-size'), 10) : undefined,
          alpha: el.hasAttribute('data-cursor-alpha') ? parseFloat(el.getAttribute('data-cursor-alpha')) : undefined
        });
      });
      el.addEventListener('mouseleave', (ev) => {
        shrinkDotToPointer(ev && ev.clientX, ev && ev.clientY);
      });
      el.__cursorExpandAttached = true;
    });
  }
  addExpandHoverListeners();

  // ---------------- Expose API ----------------
  window.__customCursor = window.__customCursor || {};
  Object.assign(window.__customCursor, {
    setVisible(v) {
      ring.style.opacity = v ? '1' : '0';
      dot.style.opacity = v ? '1' : '0';
    },
    setRingSize(px) {
      ring.style.width = `${px}px`;
      ring.style.height = `${px}px`;
      // update saved original
      ring.dataset._orig_width = ring.style.width;
      ring.dataset._orig_height = ring.style.height;
    },
    setDotSize(px) {
      dot.style.width = `${px}px`;
      dot.style.height = `${px}px`;
      dot.dataset._orig_width = dot.style.width;
      dot.dataset._orig_height = dot.style.height;
    },
    refreshHoverTargets: addHoverListeners,
    refreshExpandTargets: addExpandHoverListeners,
    expandToElement: expandDotToElement,
    shrinkToPointer: shrinkDotToPointer
  });

})();
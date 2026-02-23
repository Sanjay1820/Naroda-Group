// Reviews Swiper Slider + Modal + Add Review
(function () {
    'use strict';

    // ── SWIPER INIT ──────────────────────────────
    var reviewsSwiper = new Swiper('.reviews-swiper', {
        loop: true,
        speed: 700,
        autoplay: {
            delay: 4500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        effect: 'slide',
        pagination: {
            el: '#reviewsPagination',
            clickable: true,
            dynamicBullets: false
        },
        navigation: {
            prevEl: '#reviewsPrev',
            nextEl: '#reviewsNext'
        },
        a11y: {
            prevSlideMessage: 'Previous review',
            nextSlideMessage: 'Next review'
        }
    });

    // ── MODAL ────────────────────────────────────
    var overlay = document.getElementById('reviewModalOverlay');
    var openBtn = document.getElementById('openReviewModal');
    var closeBtn = document.getElementById('closeReviewModal');

    function openModal() {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        reviewsSwiper.autoplay.stop();
    }

    function closeModal() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        reviewsSwiper.autoplay.start();
    }

    if (openBtn) openBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (overlay) {
        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) closeModal();
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeModal();
    });

    // ── STAR RATING IN FORM ──────────────────────
    var starsWrap = document.getElementById('rformStars');
    var ratingInput = document.getElementById('rformRating');

    if (starsWrap && ratingInput) {
        var stars = starsWrap.querySelectorAll('i');
        var currentRating = 5;

        function setRating(val) {
            currentRating = val;
            ratingInput.value = val;
            stars.forEach(function (s, i) {
                s.classList.toggle('dim', i >= val);
            });
        }

        // Default: all 5 lit
        setRating(5);

        stars.forEach(function (star) {
            star.addEventListener('click', function () {
                setRating(parseInt(star.getAttribute('data-val')));
            });

            star.addEventListener('mouseenter', function () {
                var hov = parseInt(star.getAttribute('data-val'));
                stars.forEach(function (s, i) {
                    s.classList.toggle('dim', i >= hov);
                });
            });

            star.addEventListener('mouseleave', function () {
                setRating(currentRating);
            });
        });
    }

    // ── FORM SUBMIT ──────────────────────────────
    var reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var nameEl = reviewForm.querySelector('input[type="text"]');
            var projectEl = reviewForm.querySelector('select');
            var textEl = reviewForm.querySelector('textarea');
            var rating = ratingInput ? parseInt(ratingInput.value) : 5;

            var name = nameEl ? nameEl.value.trim() : '';
            var project = projectEl ? projectEl.value : '';
            var text = textEl ? textEl.value.trim() : '';

            if (!name || !project || !text) return;

            // Build initials
            var parts = name.split(' ');
            var initials = parts.map(function (p) { return p[0]; }).join('').toUpperCase().slice(0, 2);

            // Build stars HTML
            var starsHtml = '';
            for (var i = 0; i < 5; i++) {
                starsHtml += '<i class="fas fa-star"></i>';
            }

            // Alternate dark/light based on current slide count
            var wrapper = document.getElementById('reviewsWrapper');
            var slideCount = wrapper ? wrapper.querySelectorAll('.swiper-slide:not(.swiper-slide-duplicate)').length : 0;
            var theme = (slideCount % 2 === 0) ? 'rslide--dark' : 'rslide--light';

            var slideHTML =
                '<div class="swiper-slide">' +
                '  <div class="rslide ' + theme + '">' +
                '    <div class="rslide-quote">"</div>' +
                '    <p class="rslide-text">' + text + '</p>' +
                '    <div class="rslide-footer">' +
                '      <div class="rslide-avatar">' + initials + '</div>' +
                '      <div class="rslide-meta">' +
                '        <p class="rslide-name">' + name + '</p>' +
                '        <p class="rslide-project">' + project + '</p>' +
                '      </div>' +
                '      <div class="rslide-stars">' + starsHtml + '</div>' +
                '    </div>' +
                '  </div>' +
                '</div>';

            // Add slide to swiper
            reviewsSwiper.appendSlide(slideHTML);

            // Reset form
            reviewForm.reset();
            if (ratingInput) setRating(5);

            // Close modal and go to new slide
            closeModal();
            setTimeout(function () {
                reviewsSwiper.slideTo(reviewsSwiper.slides.length - 2);
            }, 400);
        });
    }

})();

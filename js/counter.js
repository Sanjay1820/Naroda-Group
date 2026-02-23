(function () {
    'use strict';

    var statsEl = document.getElementById('reviewsStats');
    if (!statsEl) return;

    var animated = false;

    function easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }

    function animateCounter(el, target, decimals, suffix, duration) {
        el.classList.add('counting');
        var startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var elapsed = timestamp - startTime;
            var progress = Math.min(elapsed / duration, 1);
            var eased = easeOutQuart(progress);
            var current = eased * target;
            el.textContent = current.toFixed(decimals) + suffix;

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target.toFixed(decimals) + suffix;
                el.classList.remove('counting');
            }
        }

        requestAnimationFrame(step);
    }

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting && !animated) {
                animated = true;
                var counters = statsEl.querySelectorAll('.stat-num[data-target]');
                counters.forEach(function (el, i) {
                    var target = parseFloat(el.getAttribute('data-target'));
                    var suffix = el.getAttribute('data-suffix') || '';
                    var decimals = parseInt(el.getAttribute('data-decimal')) || 0;
                    // Start at 0
                    el.textContent = (0).toFixed(decimals) + suffix;
                    setTimeout(function () {
                        animateCounter(el, target, decimals, suffix, 2200);
                    }, i * 200);
                });
            }
        });
    }, { threshold: 0.3 });

    observer.observe(statsEl);
})();

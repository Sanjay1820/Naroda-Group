// Main JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission handling (Dummy for now)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you! Your enquiry has been sent. We will contact you shortly.');
            contactForm.reset();
        });
    }

    // Lazy Loading Images
    const lazyImages = document.querySelectorAll('img');
    if ('loading' in HTMLImageElement.prototype) {
        lazyImages.forEach(img => {
            img.loading = 'lazy';
        });
    }

    // Project Detail Page Tab handling if any
    // ... Any other common site functionality
});

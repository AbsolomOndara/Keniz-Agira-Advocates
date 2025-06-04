// Testimonial Slider
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.slider-dot');
    let currentIndex = 0;
    let intervalId;
    let isAutoRotating = true;

    function showTestimonial(index) {
        // Validate index
        if (index < 0) {
            index = testimonials.length - 1;
        } else if (index >= testimonials.length) {
            index = 0;
        }

        // Hide all testimonials with fade out effect
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
            testimonial.style.opacity = '0';
        });

        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });

        // Show selected testimonial with fade in effect
        setTimeout(() => {
            testimonials[index].classList.add('active');
            testimonials[index].style.opacity = '1';
            dots[index].classList.add('active');
            currentIndex = index;
        }, 300);
    }

    function nextTestimonial() {
        showTestimonial(currentIndex + 1);
    }

    function prevTestimonial() {
        showTestimonial(currentIndex - 1);
    }

    // Auto-rotate testimonials
    function startAutoRotation() {
        if (!isAutoRotating) return;
        intervalId = setInterval(nextTestimonial, 5000);
    }

    function stopAutoRotation() {
        clearInterval(intervalId);
    }

    // Initialize slider
    function init() {
        // Show first testimonial
        showTestimonial(0);

        // Add click event listeners to dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                stopAutoRotation();
                showTestimonial(index);
                setTimeout(startAutoRotation, 10000);
            });
        });

        // Start auto rotation
        startAutoRotation();

        // Pause auto rotation when user interacts with slider
        const slider = document.querySelector('.testimonial-slider');
        slider.addEventListener('mouseenter', () => {
            isAutoRotating = false;
            stopAutoRotation();
        });
        slider.addEventListener('mouseleave', () => {
            isAutoRotating = true;
            startAutoRotation();
        });

        // Touch events for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            isAutoRotating = false;
            stopAutoRotation();
        }, {passive: true});

        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            isAutoRotating = true;
            startAutoRotation();
        }, {passive: true});

        function handleSwipe() {
            const difference = touchStartX - touchEndX;
            if (difference > 50) { // Swipe left
                nextTestimonial();
            } else if (difference < -50) { // Swipe right
                prevTestimonial();
            }
        }
    }

    // Initialize the slider
    init();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.testimonial-slider')) {
        initTestimonialSlider();
    }
});
// Attempt to detect and block F12/right-click/inspect (easily bypassed)
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
});

document.onkeydown = function(e) {
  if (e.key === 'F12' || 
      (e.ctrlKey && e.shiftKey && e.key === 'I') || 
      (e.ctrlKey && e.shiftKey && e.key === 'J') || 
      (e.ctrlKey && e.key === 'U')) {
    e.preventDefault();
    alert('Developer tools are disabled for this page');
    return false;
  }
};

// More aggressive detection (still not foolproof)
setInterval(function() {
  if (window.outerWidth - window.innerWidth > 200 || 
      window.outerHeight - window.innerHeight > 200) {
    // Dev tools might be open
    window.location.reload();
  }
}, 1000);

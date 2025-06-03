// Counters
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    if (!counters.length) return;

    const duration = 2000; // Total duration in ms
    const frameDuration = 1000 / 60; // 60 fps
    const totalFrames = Math.round(duration / frameDuration);
    const easeOutQuad = t => t * (2 - t);

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const start = 0;
        let frame = 0;
        
        // Clear previous content
        counter.textContent = '0';

        const updateCounter = () => {
            frame++;
            const progress = easeOutQuad(frame / totalFrames);
            const current = Math.round(target * progress);
            
            if (parseInt(counter.textContent) !== current) {
                counter.textContent = current.toLocaleString();
            }
            
            if (frame < totalFrames) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };

        requestAnimationFrame(updateCounter);
    });
}

// Video Player
function initVideoPlayer() {
    const videoWrapper = document.querySelector('.philosophy-video');
    const philosophyVideo = document.querySelector('.philosophy-video video');
    const playButton = document.querySelector('.play-button');

    if (!videoWrapper || !philosophyVideo || !playButton) return;

    playButton.addEventListener('click', () => {
        philosophyVideo.play()
            .then(() => {
                playButton.style.display = 'none';
            })
            .catch(error => {
                console.error('Video play failed:', error);
            });
    });

    philosophyVideo.addEventListener('click', () => {
        if (philosophyVideo.paused) {
            philosophyVideo.play().then(() => {
                playButton.style.display = 'none';
            });
        } else {
            philosophyVideo.pause();
            playButton.style.display = 'flex';
        }
    });

    philosophyVideo.addEventListener('ended', () => {
        playButton.style.display = 'flex';
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.stats-section')) {
        initCounters();
    }
    
    if (document.querySelector('.philosophy-video')) {
        initVideoPlayer();
    }
});
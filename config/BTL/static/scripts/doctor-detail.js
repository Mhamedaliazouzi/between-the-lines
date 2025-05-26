// Doctor Detail Page JavaScript
document.addEventListener('DOMContentLoaded', () => {
    try {
        initializeVideoModal();
        initializeFAQVideos();
        initializeIntroVideo();
        initializeFloatingAnimation();
    } catch (error) {
        console.error('Error initializing doctor detail page:', error);
    }
});

// ============================
// Video Modal Functionality
// ============================
function initializeVideoModal() {
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const modalClose = document.querySelector('.modal-close');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    
    if (!modal || !modalVideo || !modalClose || !modalBackdrop) {
        console.warn('Video modal elements not found');
        return;
    }

    // Function to open modal with video
    window.openVideoModal = (videoSrc) => {
        modalVideo.src = videoSrc;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus management for accessibility
        modalClose.focus();
    };

    // Function to close modal
    const closeModal = () => {
        modal.classList.remove('active');
        modalVideo.pause();
        modalVideo.src = '';
        document.body.style.overflow = '';
    };

    // Event listeners for closing modal
    modalClose.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// ============================
// FAQ Videos Functionality
// ============================
function initializeFAQVideos() {
    const faqPlayBtns = document.querySelectorAll('.faq-play-btn');
    
    if (faqPlayBtns.length === 0) {
        console.info('No FAQ videos found');
        return;
    }

    faqPlayBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const videoSrc = btn.getAttribute('data-video');
            
            if (videoSrc && window.openVideoModal) {
                window.openVideoModal(videoSrc);
            } else {
                console.error('Video source not found or modal not initialized');
            }
        });

        // Add keyboard support
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                btn.click();
            }
        });
    });
}

// ============================
// Introduction Video Functionality
// ============================
function initializeIntroVideo() {
    const introVideo = document.querySelector('.intro-video');
    const playBtn = document.querySelector('.video-overlay .play-btn');
    const videoWrapper = document.querySelector('.video-wrapper');
    
    if (!introVideo) {
        console.info('No introduction video found');
        return;
    }

    // Custom play button functionality
    if (playBtn) {
        playBtn.addEventListener('click', () => {
            if (introVideo.paused) {
                introVideo.play();
                playBtn.style.display = 'none';
            }
        });

        // Show/hide play button based on video state
        introVideo.addEventListener('play', () => {
            playBtn.style.display = 'none';
        });

        introVideo.addEventListener('pause', () => {
            playBtn.style.display = 'flex';
        });

        introVideo.addEventListener('ended', () => {
            playBtn.style.display = 'flex';
        });
    }

    // Video loading states
    introVideo.addEventListener('loadstart', () => {
        if (videoWrapper) {
            videoWrapper.classList.add('loading');
        }
    });

    introVideo.addEventListener('canplay', () => {
        if (videoWrapper) {
            videoWrapper.classList.remove('loading');
        }
    });

    // Error handling
    introVideo.addEventListener('error', (e) => {
        console.error('Video loading error:', e);
        if (videoWrapper) {
            videoWrapper.classList.add('error');
        }
    });
}

// ============================
// Floating Animation Enhancement
// ============================
function initializeFloatingAnimation() {
    // Add CSS keyframes if not already defined
    if (!document.querySelector('style[data-floating-animation]')) {
        const style = document.createElement('style');
        style.setAttribute('data-floating-animation', 'true');
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                25% { transform: translateY(-20px) rotate(5deg); }
                50% { transform: translateY(-10px) rotate(-3deg); }
                75% { transform: translateY(-30px) rotate(2deg); }
            }

            @keyframes pulse {
                0%, 100% { opacity: 0.6; }
                50% { opacity: 0.8; }
            }

            .floating-shapes .shape {
                animation: float 20s ease-in-out infinite, pulse 10s ease-in-out infinite;
            }

            .video-wrapper.loading::after {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 40px;
                height: 40px;
                border: 3px solid rgba(255, 255, 255, 0.3);
                border-top: 3px solid white;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }

            @keyframes spin {
                0% { transform: translate(-50%, -50%) rotate(0deg); }
                100% { transform: translate(-50%, -50%) rotate(360deg); }
            }

            .video-wrapper.error::after {
                content: '⚠️ Video could not be loaded';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: white;
                background: rgba(0, 0, 0, 0.7);
                padding: 1rem;
                border-radius: 0.5rem;
                font-size: 0.875rem;
            }
        `;
        document.head.appendChild(style);
    }

    // Enhanced mouse interaction for hero section
    const heroSection = document.querySelector('.doctor-hero');
    if (heroSection) {
        let mouseX = 0;
        let mouseY = 0;
        let isHovering = false;

        const handleMouseMove = (e) => {
            if (!isHovering) return;
            
            const rect = heroSection.getBoundingClientRect();
            mouseX = (e.clientX - rect.left) / rect.width;
            mouseY = (e.clientY - rect.top) / rect.height;
            
            // Apply subtle parallax effect to floating shapes
            const shapes = document.querySelectorAll('.floating-shapes .shape');
            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.5;
                const x = (mouseX - 0.5) * speed * 20;
                const y = (mouseY - 0.5) * speed * 20;
                
                shape.style.transform = `translate(${x}px, ${y}px)`;
            });
        };

        heroSection.addEventListener('mouseenter', () => {
            isHovering = true;
        });

        heroSection.addEventListener('mouseleave', () => {
            isHovering = false;
            // Reset shapes position
            const shapes = document.querySelectorAll('.floating-shapes .shape');
            shapes.forEach(shape => {
                shape.style.transform = 'translate(0, 0)';
            });
        });

        heroSection.addEventListener('mousemove', handleMouseMove);
    }
}

// ============================
// Utility Functions
// ============================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Intersection Observer for scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe sections for scroll animations
    const sections = document.querySelectorAll('.intro-video-section, .faq-section, .about-section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initializeScrollAnimations, 100);
});

// ============================
// Error Handling and Cleanup
// ============================
window.addEventListener('beforeunload', () => {
    // Cleanup any ongoing video playback
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.pause();
        video.src = '';
    });
});

// Global error handler for video-related errors
window.addEventListener('error', (e) => {
    if (e.target && e.target.tagName === 'VIDEO') {
        console.error('Video error:', e.target.error);
    }
}, true);
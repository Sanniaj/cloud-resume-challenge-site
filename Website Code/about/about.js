// ABOUT PAGE SPECIFIC JAVASCRIPT

// Initialize about page animations and interactions
document.addEventListener('DOMContentLoaded', () => {
    // Only run if we're on the about page
    if (!document.querySelector('.aboutTXT')) {
        return;
    }

    initAboutPageAnimations();
    initParagraphInteractions();
});

// Enhanced scroll animations for about page paragraphs
function initAboutPageAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered animation delay
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    }, observerOptions);

    // Observe all paragraphs in aboutTXT
    const paragraphs = document.querySelectorAll('.aboutTXT p');
    paragraphs.forEach((paragraph, index) => {
        // Reset animations for scroll-triggered entrance
        paragraph.style.opacity = '0';
        paragraph.style.transform = 'translateY(30px)';
        paragraph.style.transition = 'all 0.8s ease';

        observer.observe(paragraph);
    });
}

// Add interactive hover effects for paragraphs
function initParagraphInteractions() {
    const paragraphs = document.querySelectorAll('.aboutTXT p');

    paragraphs.forEach(paragraph => {
        paragraph.addEventListener('mouseenter', () => {
            // Add focus effect to current paragraph
            paragraph.style.background = 'rgba(255, 83, 18, 0.05)';
            paragraph.style.borderLeft = '4px solid #ff5312';
            paragraph.style.paddingLeft = '1.5rem';
            paragraph.style.transform = 'translateX(8px)';
        });

        paragraph.addEventListener('mouseleave', () => {
            // Remove focus effect
            paragraph.style.background = '';
            paragraph.style.borderLeft = '';
            paragraph.style.paddingLeft = '';
            paragraph.style.transform = '';
        });
    });
}

// Optional: Add reading progress indicator
function initReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #ff5312, #ff8352);
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const aboutSection = document.querySelector('.aboutTXT');
        if (!aboutSection) return;

        const rect = aboutSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionHeight = aboutSection.offsetHeight;

        if (rect.top < windowHeight && rect.bottom > 0) {
            const scrollProgress = Math.max(0, Math.min(1,
                (windowHeight - rect.top) / (sectionHeight + windowHeight)
            ));
            progressBar.style.width = (scrollProgress * 100) + '%';
        }
    });
}

// Uncomment to enable reading progress indicator
// initReadingProgress();
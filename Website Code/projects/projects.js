// PROJECTS PAGE SPECIFIC JAVASCRIPT

// Initialize projects page functionality
document.addEventListener('DOMContentLoaded', () => {
    // Only run if we're on the projects page
    if (!document.querySelector('.pHeader')) {
        return;
    }

    initProjectsAnimations();
    initComingSoonEffect();
});

// Animate the coming soon header
function initProjectsAnimations() {
    const header = document.querySelector('.pHeader');
    if (header) {
        header.style.opacity = '0';
        header.style.transform = 'translateY(-30px)';
        header.style.transition = 'all 1s ease';

        setTimeout(() => {
            header.style.opacity = '1';
            header.style.transform = 'translateY(0)';
        }, 300);
    }
}

// Add a subtle pulsing effect to the "COMING SOON" text
function initComingSoonEffect() {
    const header = document.querySelector('.pHeader');
    if (header && header.textContent.includes('COMING SOON')) {
        // Add pulsing animation
        header.style.animation = 'pulse 2s ease-in-out infinite';

        // Add CSS for pulse animation if it doesn't exist
        if (!document.querySelector('#pulse-animation')) {
            const style = document.createElement('style');
            style.id = 'pulse-animation';
            style.textContent = `
                @keyframes pulse {
                    0%, 100% {
                        opacity: 1;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 0.8;
                        transform: scale(1.02);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Future function for when projects are added
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project');

    if (projectCards.length === 0) return;

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, observerOptions);

    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);

        // Add hover effect
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Add interactive background effect
function initInteractiveBackground() {
    const header = document.querySelector('.pHeader');
    if (!header) return;

    // Create floating particles
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createFloatingParticle();
        }, i * 1000);
    }
}

function createFloatingParticle() {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: #ff5312;
        border-radius: 50%;
        opacity: 0.3;
        pointer-events: none;
        z-index: -1;
    `;

    // Random starting position
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = window.innerHeight + 'px';

    document.body.appendChild(particle);

    // Animate upward
    const animation = particle.animate([
        { transform: 'translateY(0) rotate(0deg)', opacity: 0.3 },
        { transform: `translateY(-${window.innerHeight + 100}px) rotate(360deg)`, opacity: 0 }
    ], {
        duration: 8000 + Math.random() * 4000,
        easing: 'linear'
    });

    animation.onfinish = () => {
        document.body.removeChild(particle);
        // Create new particle
        setTimeout(createFloatingParticle, Math.random() * 3000);
    };
}

// Initialize interactive background
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.pHeader')) {
        initInteractiveBackground();
    }
});
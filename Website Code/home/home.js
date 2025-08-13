// HOME PAGE JAVASCRIPT

// typing animation for the home page
document.addEventListener("DOMContentLoaded", () => {
    const phrases = ["Hi, I'm Sannia Jean.", "Problem Solver."];
    const typedText = document.getElementById("typed-text");
    const cursor = document.querySelector(".cursor");

    // Check if elements exist (only run on home page)
    if (!typedText || !cursor) {
        return;
    }

    let i = 0;
    let j = 0;
    let isDeleting = false;
    let currentText = "";
    let currentPhrase = "";

    function type() {
        currentPhrase = phrases[i % phrases.length];

        if (isDeleting) {
            currentText = currentPhrase.substring(0, j--);
        } else {
            currentText = currentPhrase.substring(0, j++);
        }

        typedText.textContent = currentText;

        let typeSpeed = isDeleting ? 60 : 120;

        if (!isDeleting && j === currentPhrase.length) {
            // Phrase complete, pause before deleting
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && j === 0) {
            // Deletion complete, move to next phrase
            isDeleting = false;
            i++;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    // Start the typing animation
    setTimeout(type, 1000);

    // Initialize other homepage features
    initScrollAnimations();
    initParallaxEffect();
    initCounterAnimations();
    initInteractiveElements();
});

// scroll animations with intersection observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';

                // Trigger counter animations for stats
                if (entry.target.classList.contains('hero-stats')) {
                    animateCounters();
                }

                // Stagger animations for project cards
                if (entry.target.classList.contains('projects-preview')) {
                    const cards = entry.target.querySelectorAll('.project-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 200);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe sections for animations
    const sections = document.querySelectorAll('.content-section, .hero-stats, .projects-preview');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease';
        observer.observe(section);
    });
}

// Parallax effect for hero section
function initParallaxEffect() {
    const hero = document.querySelector('.hero-section');
    const heroImage = document.querySelector('.hero-image');

    if (!hero || !heroImage) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        if (scrolled < window.innerHeight) {
            heroImage.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Counter animations for hero stats
function animateCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(stat => {
        const text = stat.textContent;

        // Only animate if it's a number
        if (!isNaN(text)) {
            const target = parseInt(text);
            let current = 0;
            const increment = target / 60; // 60 frames for 1 second
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current);
            }, 16);
        }
    });
}

// Interactive elements and hover effects
function initInteractiveElements() {
    // button hover effects
    const buttons = document.querySelectorAll('.cta-button, .btn-outline');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Project card interactive effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Image hover effect
    const heroImage = document.querySelector('.image-wrapper');
    if (heroImage) {
        heroImage.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotate(2deg)';
        });

        heroImage.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg)';
        });
    }

    // Floating card animation on hover
    const floatingCard = document.querySelector('.floating-card');
    if (floatingCard) {
        floatingCard.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
            this.style.transform = 'translateY(-15px) rotate(-2deg) scale(1.05)';
        });

        floatingCard.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
            this.style.transform = '';
        });
    }
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.navbar a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Dynamic background particles
function createDynamicParticle() {
    const particle = document.createElement('div');
    particle.classList.add('dynamic-particle');
    particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: linear-gradient(45deg, #ff5312, #ff8352);
        border-radius: 50%;
        opacity: 0.3;
        pointer-events: none;
        z-index: -1;
        transition: all 0.5s ease;
    `;

    // Random starting position at bottom
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = window.innerHeight + 'px';

    document.body.appendChild(particle);

    // Animate upward
    const animation = particle.animate([
        {
            transform: 'translateY(0) translateX(0) rotate(0deg) scale(1)',
            opacity: 0.3
        },
        {
            transform: `translateY(-${window.innerHeight + 100}px) translateX(${(Math.random() - 0.5) * 200}px) rotate(360deg) scale(0)`,
            opacity: 0
        }
    ], {
        duration: 8000 + Math.random() * 4000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });

    animation.onfinish = () => {
        if (document.body.contains(particle)) {
            document.body.removeChild(particle);
        }
    };
}

// Create particles periodically
setInterval(() => {
    if (Math.random() < 0.3) { // 30% chance every interval
        createDynamicParticle();
    }
}, 2000);

// Performance optimization: pause animations when tab is not visible
document.addEventListener('visibilitychange', function() {
    const animations = document.querySelectorAll('.particle, .floating-card');
    animations.forEach(element => {
        if (document.hidden) {
            element.style.animationPlayState = 'paused';
        } else {
            element.style.animationPlayState = 'running';
        }
    });
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Copy email functionality with feedback
async function copyEmailWithFeedback() {
    try {
        await navigator.clipboard.writeText("hi@sanniajean.com");
        showNotification('Email copied to clipboard!', 'success');
    } catch (err) {
        console.error('Failed to copy email: ', err);
        showNotification('Failed to copy email', 'error');
    }
}

// notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}
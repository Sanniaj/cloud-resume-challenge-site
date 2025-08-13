// CONTACT PAGE SPECIFIC JAVASCRIPT

// Initialize contact page functionality
document.addEventListener('DOMContentLoaded', () => {
    // Only run if we're on the contact page
    if (!document.querySelector('.contactContent')) {
        return;
    }

    initContactAnimations();
    initCopyEmailFeedback();
});

// Animate contact containers on scroll
function initContactAnimations() {
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

    // Observe contact containers
    const contactContainers = document.querySelectorAll('.contactContainer');
    contactContainers.forEach((container, index) => {
        container.style.opacity = '0';
        container.style.transform = 'translateY(30px)';
        container.style.transition = 'all 0.6s ease';
        observer.observe(container);
    });
}

// Enhanced copy email functionality with visual feedback
function initCopyEmailFeedback() {
    const copyButtons = document.querySelectorAll('button[onclick*="copyText"]');

    copyButtons.forEach(button => {
        // Remove the inline onclick and add proper event listener
        button.removeAttribute('onclick');

        button.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText("hi@sanniajean.com");
                showCopySuccess(button);
            } catch (err) {
                console.error('Failed to copy email: ', err);
                fallbackCopyTextToClipboard("hi@sanniajean.com");
                showCopySuccess(button);
            }
        });
    });
}

// Show visual feedback when email is copied
function showCopySuccess(button) {
    const originalText = button.textContent;

    // Change button text temporarily
    button.textContent = 'Copied!';
    button.style.background = '#28a745';
    button.style.color = 'white';
    button.style.transform = 'scale(1.05)';

    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
        button.style.color = '';
        button.style.transform = '';
    }, 2000);

    // Create floating success message
    createFloatingMessage('Email copied to clipboard!', button);
}

// Create a floating success message
function createFloatingMessage(message, element) {
    const floatingMsg = document.createElement('div');
    floatingMsg.textContent = message;
    floatingMsg.style.cssText = `
        position: absolute;
        background: #28a745;
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 0.8rem;
        z-index: 1000;
        opacity: 0;
        transform: translateY(10px);
        transition: all 0.3s ease;
        pointer-events: none;
    `;

    // Position relative to the button
    const rect = element.getBoundingClientRect();
    floatingMsg.style.left = rect.left + 'px';
    floatingMsg.style.top = (rect.top - 40) + 'px';

    document.body.appendChild(floatingMsg);

    // Animate in
    setTimeout(() => {
        floatingMsg.style.opacity = '1';
        floatingMsg.style.transform = 'translateY(0)';
    }, 100);

    // Remove after animation
    setTimeout(() => {
        floatingMsg.style.opacity = '0';
        floatingMsg.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            document.body.removeChild(floatingMsg);
        }, 300);
    }, 2000);
}

// Add hover effects to contact containers
function initContactHoverEffects() {
    const containers = document.querySelectorAll('.contactContainer');

    containers.forEach(container => {
        container.addEventListener('mouseenter', () => {
            const svg = container.querySelector('svg');
            if (svg) {
                svg.style.transform = 'scale(1.1) rotate(5deg)';
                svg.style.transition = 'transform 0.3s ease';
            }
        });

        container.addEventListener('mouseleave', () => {
            const svg = container.querySelector('svg');
            if (svg) {
                svg.style.transform = '';
            }
        });
    });
}

// Initialize hover effects after DOM load
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.contactContent')) {
        initContactHoverEffects();
    }
});
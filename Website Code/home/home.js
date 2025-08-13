// HOME PAGE SPECIFIC JAVASCRIPT

// Typing animation for the home page
document.addEventListener("DOMContentLoaded", () => {
    const phrases = ["Hi, I'm Sannia Jean."];
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

        if (!isDeleting && j === currentPhrase.length) {
            // Typing complete, hide cursor after delay
            setTimeout(() => {
                cursor.style.display = "none";
            }, 1000);
        } else {
            setTimeout(type, isDeleting ? 60 : 120);
        }
    }

    // Start the typing animation
    type();
});

// Optional: Add scroll animations for content sections
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
            }
        });
    }, observerOptions);

    // Observe content sections
    const contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if we're on the home page
    if (document.getElementById('hheader')) {
        initScrollAnimations();
    }
});
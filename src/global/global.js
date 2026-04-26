// GLOBAL JAVASCRIPT FUNCTIONS

// Copy email function used across multiple pages
async function copyText(event) {
    try {
        await navigator.clipboard.writeText("hi@sanniajean.com");
        console.log('Email copied!');
        handleCopyFeedback(event);
    } catch (err) {
        console.error('Failed to copy email: ', err);

        // Fallback for older browsers
        fallbackCopyTextToClipboard("hi@sanniajean.com");
        handleCopyFeedback(event);
    }
}

// Route feedback to the right UI based on where the click came from
function handleCopyFeedback(event) {
    const trigger = event && (event.currentTarget || event.target);
    const footerLink = trigger && trigger.closest && trigger.closest('.footer-email-copy');
    if (footerLink) {
        showFooterCopyFeedback(footerLink);
        return;
    }
    showCopySuccess();
}

// Inline label swap on the footer email link
function showFooterCopyFeedback(link) {
    if (link.classList.contains('copied')) return;
    const label = link.querySelector('.footer-email-label');
    if (!label) return;
    const original = label.textContent;
    link.classList.add('copied');
    label.textContent = 'Copied!';
    setTimeout(() => {
        label.textContent = original;
        link.classList.remove('copied');
    }, 1500);
}

// Show copy success message
function showCopySuccess() {
    // Check if there's a copy success element
    const successElement = document.querySelector('.copy-success');
    if (successElement) {
        successElement.classList.add('show');
        setTimeout(() => {
            successElement.classList.remove('show');
        }, 2000);
    }
}

// Fallback copy function for older browsers
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        if (successful) {
            console.log('Email copied using fallback method!');
            showCopySuccess();
        }
    } catch (err) {
        console.error('Fallback: Could not copy text: ', err);
    }

    document.body.removeChild(textArea);
}

// Smooth scroll function for navigation
function smoothScrollTo(element) {
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Initialize common functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add any global initialization here
    console.log('Page loaded successfully');
});
// GLOBAL JAVASCRIPT FUNCTIONS

// Copy email function used across multiple pages
async function copyText() {
    try {
        await navigator.clipboard.writeText("hi@sanniajean.com");
        console.log('Email copied!');

        // Optional: Show a temporary success message
        showCopySuccess();
    } catch (err) {
        console.error('Failed to copy email: ', err);

        // Fallback for older browsers
        fallbackCopyTextToClipboard("hi@sanniajean.com");
    }
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
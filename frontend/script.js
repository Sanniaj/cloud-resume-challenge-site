document.addEventListener("DOMContentLoaded", () => {
    const phrases = ["Hi, I'm Sannia Jean."];
    const typedText = document.getElementById("typed-text");
    const cursor = document.querySelector(".cursor"); // get cursor element
    let i = 0,
        j = 0;
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
            // typing complete, remove cursor after delay
            setTimeout(() => {
                cursor.style.display = "none";
            }, 0); // 1 second after typing ends
        } else {
            setTimeout(type, isDeleting ? 60 : 120);
        }
    }

    type();
});


async function copyText() {
    await navigator.clipboard.writeText("hi@sanniajean.com");
    
    console.log('Email copied!');
}






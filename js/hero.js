/* ==========================================================
   HERO.JS
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const words = [
        "Social Media Graphics",
        "Video Editing",
        "Event & Logo Design"
    ];

    startTyping(words);

});

/* ==========================================================
   TYPING EFFECT
========================================================== */

function startTyping(words) {

    const element = document.querySelector(".typing");

    if (!element) return;

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function type() {

        const word = words[wordIndex];

        if (!deleting) {

            element.textContent = word.substring(0, charIndex++);

            if (charIndex > word.length) {

                deleting = true;

                setTimeout(type, 1500);

                return;

            }

        } else {

            element.textContent = word.substring(0, charIndex--);

            if (charIndex < 0) {

                deleting = false;
                wordIndex = (wordIndex + 1) % words.length;

            }

        }

        setTimeout(type, deleting ? 45 : 90);

    }

    type();

}
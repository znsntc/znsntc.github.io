/* ==========================================================
   ASHANTI FLEUR PORTFOLIO
   APP.JS
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initLoader();
    initTheme();
    initMobileMenu();
    initScrollProgress();
    initBackToTop();
    initActiveNavigation();
    initSmoothScroll();
    initReveal()

});

/* ==========================================================
   LOADER
========================================================== */

function initLoader() {

    const loader = document.getElementById("loader");

    if (!loader) return;

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.style.opacity = "0";

            loader.style.visibility = "hidden";

        }, 800);

    });

}

/* ==========================================================
   DARK MODE
========================================================== */

function initTheme() {

    const toggle = document.getElementById("theme-toggle");

    if (!toggle) return;

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark");
    }

    toggle.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        const mode = document.body.classList.contains("dark")
            ? "dark"
            : "light";

        localStorage.setItem("theme", mode);

    });

}

/* ==========================================================
   MOBILE MENU
========================================================== */

function initMobileMenu() {

    const menuBtn = document.querySelector(".menu-btn");

    const navLinks = document.querySelector(".nav-links");

    if (!menuBtn || !navLinks) return;

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("show");

    });

}

/* ==========================================================
   SCROLL PROGRESS
========================================================== */

function initScrollProgress() {

    const progress = document.getElementById("progress-bar");

    if (!progress) return;

    window.addEventListener("scroll", () => {

        const scrollTop = window.scrollY;

        const height =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percent = (scrollTop / height) * 100;

        progress.style.width = percent + "%";

    });

}

/* ==========================================================
   BACK TO TOP
========================================================== */

function initBackToTop() {

    const btn = document.getElementById("backToTop");

    if (!btn) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            btn.classList.add("show");

        } else {

            btn.classList.remove("show");

        }

    });

    btn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

/* ==========================================================
   ACTIVE NAVIGATION
========================================================== */

function initActiveNavigation() {

    const sections = document.querySelectorAll("section");

    const links = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 120;

            const height = section.offsetHeight;

            if (scrollY >= top && scrollY < top + height) {

                current = section.getAttribute("id");

            }

        });

        links.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") === "#" + current
            ) {

                link.classList.add("active");

            }

        });

    });

}

/* ==========================================================
   SMOOTH SCROLL
========================================================== */
function initSmoothScroll() {

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            // Height of your fixed navbar
            const headerOffset = 90;

            // Calculate the correct scroll position
            const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;

            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });

        });

    });

}
/* ==========================================================
   REVEAL ON SCROLL
========================================================== */

function initReveal() {

    const reveals = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

            }

        });

    }, {
        threshold: 0.15
    });

    reveals.forEach(section => {

        observer.observe(section);

    });

}
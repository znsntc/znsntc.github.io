/* ==========================================================
   ASHANTI FLEUR PORTFOLIO
   UI.JS
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initReveal();
    initCounters();

});

/* ==========================================================
   SCROLL REVEAL
========================================================== */

function initReveal() {

    const reveals = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if(entry.isIntersecting){

                entry.target.classList.add("active");

            }

        });

    },{
        threshold:.15
    });

    reveals.forEach(item => observer.observe(item));

}

/* ==========================================================
   COUNTER
========================================================== */

function initCounters(){

    const counters = document.querySelectorAll("[data-target]");

    counters.forEach(counter => {

        const target = +counter.dataset.target;

        let current = 0;

        const speed = 30;

        const update=()=>{

            if(current<target){

                current+=Math.ceil(target/100);

                counter.innerText=current;

                setTimeout(update,speed);

            }else{

                counter.innerText=target;

            }

        };

        update();

    });

}



/* ==========================================================
   ASHANTI FLEUR PORTFOLIO
   PORTFOLIO.JS
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    loadPortfolio();

});

let portfolioData = [];

const subCategories = {

    social: [
        "All",
        "Social Media Posts",
        "Announcements",
        "Social Media Campaigns"
    ],

    video: [
        "All",
        "Promotional Videos",
        "Commercials"
    ],

    event: [
    "All",
    "Tarpaulins",
    "Event Posters",
    "Logo Design"
]

};

/* ==========================================================
   LOAD JSON
========================================================== */

async function loadPortfolio() {

    try {

        const response = await fetch("data/portfolio.json");

        const data = await response.json();

        console.log(data);

        portfolioData = data.projects;

        console.log(portfolioData);

        renderPortfolio(portfolioData);

        initMainFilters();

    }

    catch (error) {

        console.error("Portfolio JSON not found.", error);

    }

}

/* ==========================================================
   RENDER PROJECTS
========================================================== */

function renderPortfolio(projects) {

    const grid = document.getElementById("portfolioGrid");

    if (!grid) return;

    grid.innerHTML = "";

    projects.forEach(project => {

        const card = document.createElement("div");

        card.className = "portfolio-card";

        card.dataset.id = project.id;

       card.innerHTML = `

    <img src="${project.thumbnail}" alt="${project.title}">

    <div class="portfolio-overlay">

        <span>${project.subcategory}</span>

        <h3>${project.title}</h3>

        <a href="javascript:void(0)" class="view-project">
    View Project →
</a>

    </div>

`;
        card.addEventListener("click", () => {

            openModal(project.id);

        });

        grid.appendChild(card);

    });

}
/* ==========================================================
   MAIN FILTERS
========================================================== */

function initMainFilters() {

    const buttons = document.querySelectorAll(".filter-btn");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            buttons.forEach(btn => btn.classList.remove("active"));

            button.classList.add("active");

            const category = button.dataset.category;

            if (category === "all") {

                renderPortfolio(portfolioData);

                document.getElementById("subFilters").innerHTML = "";

                return;

            }

            const filtered = portfolioData.filter(project =>
                project.category === category
            );

            renderPortfolio(filtered);

            renderSubFilters(category);

        });

    });

}

/* ==========================================================
   SUB FILTERS
========================================================== */

function renderSubFilters(category) {

    const container = document.getElementById("subFilters");

    container.innerHTML = "";

    subCategories[category].forEach(item => {

        const btn = document.createElement("button");

        btn.className = "sub-filter-btn";

        btn.textContent = item;

        if (item === "All") {

            btn.classList.add("active");

        }

        btn.onclick = () => {

            document.querySelectorAll(".sub-filter-btn")
                .forEach(b => b.classList.remove("active"));

            btn.classList.add("active");

            if (item === "All") {

                renderPortfolio(
                    portfolioData.filter(p => p.category === category)
                );

                return;

            }

            renderPortfolio(

                portfolioData.filter(project =>

                    project.category === category &&

                    project.subcategory === item

                )

            );

        };

        container.appendChild(btn);

    });

}
/* ==========================================================
   PORTFOLIO MODAL V2
========================================================== */

let currentProject = null;
let currentImageIndex = 0;

/* -----------------------------
   OPEN MODAL
------------------------------ */

function openModal(id){
    
    const oldVideo = document.getElementById("mainVideo");

if(oldVideo){

    oldVideo.pause();

}

    currentProject = portfolioData.find(project => project.id === id);

    if(!currentProject) return;

    currentImageIndex = 0;

    if(currentProject.type === "video"){

        renderVideoModal();

    }else{

        renderImageModal();

    }

}

/* -----------------------------
   IMAGE MODAL
------------------------------ */

function renderImageModal(){

    const modal = document.getElementById("portfolioModal");
    const body = document.getElementById("modalBody");

    body.innerHTML = `

    <div class="modal-left">

        <div class="modal-main-media">

            <button class="gallery-arrow prev">

                &#10094;

            </button>

            <img
                id="mainModalImage"
                src="${currentProject.gallery[currentImageIndex]}"
                alt="${currentProject.title}">

            <button class="gallery-arrow next">

                &#10095;

            </button>

            <div class="image-counter">

                ${currentImageIndex + 1} / ${currentProject.gallery.length}

            </div>

        </div>

        <div class="modal-thumbnails">

            ${currentProject.gallery.map((image,index)=>`

                <img

                    src="${image}"

                    class="${index===currentImageIndex?'active':''}"

                    data-index="${index}"

                >

            `).join("")}

        </div>

    </div>

    <div class="modal-right">

        <span class="modal-category">

            ${currentProject.subcategory}

        </span>

        <h2>

            ${currentProject.title}

        </h2>

        <p>

            ${currentProject.description}

        </p>

        <div class="project-info">

            <div>

                <h4>Client</h4>

                <p>${currentProject.client || "-"}</p>

            </div>

            <div>

                <h4>Year</h4>

                <p>${currentProject.year || "-"}</p>

            </div>

            <div>

                <h4>Tools</h4>

                <p>${currentProject.tools.join(", ")}</p>

            </div>

        </div>

    </div>

    `;

    modal.classList.add("active");

    document.body.style.overflow="hidden";

    initGallery();

}

/* -----------------------------
   VIDEO MODAL
------------------------------ */

function renderVideoModal(){

    const modal = document.getElementById("portfolioModal");
    const body = document.getElementById("modalBody");

    body.innerHTML = `

    <div class="modal-left video-layout">

    <video
         id="mainVideo"
         controls
         autoplay
         muted
         playsinline
         preload="metadata"
         src="${currentProject.video}">
    </video>

</div>

    <div class="modal-right">

        <span class="modal-category">

            ${currentProject.subcategory}

        </span>

        <h2>

            ${currentProject.title}

        </h2>

        <p>

            ${currentProject.description}

        </p>

        <div class="project-info">

            <div>

                <h4>Client</h4>

                <p>${currentProject.client || "-"}</p>

            </div>

            <div>

                <h4>Year</h4>

                <p>${currentProject.year || "-"}</p>

            </div>

            <div>

                <h4>Tools</h4>

                <p>${currentProject.tools.join(", ")}</p>

            </div>

        </div>

    </div>

    `;

    modal.classList.add("active");

    document.body.style.overflow = "hidden";

}


/* ==========================================================
   GALLERY FUNCTIONS
========================================================== */

function initGallery(){

    const thumbnails = document.querySelectorAll(".modal-thumbnails img");

    thumbnails.forEach(thumb=>{

        thumb.addEventListener("click",()=>{

            currentImageIndex = Number(thumb.dataset.index);

            updateGallery();

        });

    });

    const prev = document.querySelector(".gallery-arrow.prev");
    const next = document.querySelector(".gallery-arrow.next");

    prev.addEventListener("click",previousImage);

    next.addEventListener("click",nextImage);

    document.addEventListener("keydown",keyboardNavigation);

}


/* -----------------------------
   NEXT
------------------------------ */

function nextImage(){

    currentImageIndex++;

    if(currentImageIndex>=currentProject.gallery.length){

        currentImageIndex=0;

    }

    updateGallery();

}

/* -----------------------------
   PREVIOUS
------------------------------ */

function previousImage(){

    currentImageIndex--;

    if(currentImageIndex<0){

        currentImageIndex=currentProject.gallery.length-1;

    }

    updateGallery();

}

/* -----------------------------
   KEYBOARD
------------------------------ */

function keyboardNavigation(e){

    const modal=document.getElementById("portfolioModal");

    if(!modal.classList.contains("active")) return;

    switch(e.key){

        case "ArrowRight":

            nextImage();

            break;

        case "ArrowLeft":

            previousImage();

            break;

        case "Escape":

            closePortfolioModal();

            break;

    }

}

/* -----------------------------
   IMAGE PRELOAD
------------------------------ */

function preloadGallery(){

    if(!currentProject) return;

    currentProject.gallery.forEach(src=>{

        const img=new Image();

        img.src=src;

    });

}
/* ==========================================================
   CLOSE MODAL
========================================================== */

function closePortfolioModal(){

    const modal = document.getElementById("portfolioModal");

    const video = document.getElementById("mainVideo");

    if(video){

        video.pause();

        video.currentTime = 0;

    }

    modal.classList.remove("active");

    document.body.style.overflow = "";

}

/* ==========================================================
   CLICK OUTSIDE TO CLOSE
========================================================== */

window.addEventListener("click",(e)=>{

    const modal=document.getElementById("portfolioModal");

    if(e.target===modal){

        closePortfolioModal();

    }

});

/* ==========================================================
   CLOSE BUTTON
========================================================== */

document.addEventListener("DOMContentLoaded",()=>{

    const close=document.querySelector(".close-modal");

    if(close){

        close.addEventListener("click",closePortfolioModal);

    }

});

/* ==========================================================
   KEEP ACTIVE THUMBNAIL VISIBLE
========================================================== */

function scrollThumbnailIntoView(){

    const active=document.querySelector(".modal-thumbnails img.active");

    if(active){

        active.scrollIntoView({

            behavior:"smooth",

            inline:"center",

            block:"nearest"

        });

    }

}

/* ==========================================================
   UPDATE GALLERY (REPLACE THE OLD ONE)
========================================================== */

function updateGallery(){

    const image=document.getElementById("mainModalImage");

    image.style.opacity="0";

    setTimeout(()=>{

        image.src=currentProject.gallery[currentImageIndex];

        image.onload=()=>{

            image.style.opacity="1";

        };

    },180);

    document.querySelector(".image-counter").textContent=

        `${currentImageIndex+1} / ${currentProject.gallery.length}`;

    document.querySelectorAll(".modal-thumbnails img")

    .forEach((thumb,index)=>{

        thumb.classList.toggle("active",index===currentImageIndex);

    });

    scrollThumbnailIntoView();

}
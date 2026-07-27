const themeBtns = document.querySelectorAll(".themeToggle, #themeToggle");
const icon = document.querySelector("#themeToggle i");
const tabs = document.querySelectorAll(".tab-btn");
const projects = document.querySelectorAll(".project");

const track = document.querySelector(".track");
const items = document.querySelectorAll(".item");

const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const dotsContainer = document.querySelector(".dots");
const scrollTopBtn = document.getElementById("scrollTopBtn");


themeBtns.forEach(btn => {

    btn.addEventListener("click", function () {

        document.body.classList.toggle("light");

        const icon = btn.querySelector("i");

        if (document.body.classList.contains("light")) {
            icon.classList.replace("fa-moon", "fa-sun");
        } else {
            icon.classList.replace("fa-sun", "fa-moon");
        }

    });

});


for (let i = 0; i < tabs.length; i++) {

    tabs[i].onclick = function () {

        for (let j = 0; j < tabs.length; j++) {
            tabs[j].classList.remove("active");
        }

        this.classList.add("active");

        for (let k = 0; k < projects.length; k++) {

            if (this.id == "all" || projects[k].classList.contains(this.id)) {

                projects[k].style.display = "block";

            } else {

                projects[k].style.display = "none";

            }

        }

    };

}


let currentIndex = 0;



let itemsPerPage = 3;
let totalPages = Math.ceil(items.length / itemsPerPage);


function updateSliderInfo() {
    itemsPerPage = 3;
    totalPages = 4;
}


let dots = [];
updateSliderInfo();
createDots();

function createDots() {

    dotsContainer.innerHTML = "";

    for (let i = 0; i < totalPages; i++) {

        const dot = document.createElement("span");

        dot.classList.add("dot");

        if (i == 0) {
            dot.classList.add("active");
        }

        dot.dataset.index = i;

        dotsContainer.appendChild(dot);
    }

    dots = document.querySelectorAll(".dot");


    for (let i = 0; i < dots.length; i++) {
        dots[i].onclick = function () {

            for (let j = 0; j < dots.length; j++) {
                dots[j].classList.remove("active");
            }

            this.classList.add("active");

            currentIndex = Number(this.dataset.index);

            const moveValue = currentIndex * 100;

            track.style.transform = `translateX(${moveValue}%)`;

        };

    }

}


function moveSlider() {

    const moveValue = currentIndex * 100;

    track.style.transform = `translateX(${moveValue}%)`;


}


window.addEventListener("resize", function () {


    currentIndex = 0;

    createDots();

    moveSlider();

});


prevBtn.onclick = function () {

    currentIndex++;

    if (currentIndex >= totalPages) {
        currentIndex = 0;
    }

    moveSlider();

};


nextBtn.onclick = function () {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = totalPages - 1;
    }

    moveSlider();

};

window.addEventListener("scroll", function () {

    if (window.scrollY > 300) {
        scrollTopBtn.classList.add("show");
    } else {
        scrollTopBtn.classList.remove("show");
    }

});

scrollTopBtn.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

const cards = document.querySelectorAll(".font-card");

for (let i = 0; i < cards.length; i++) {

    cards[i].onclick = function () {

        for (let j = 0; j < cards.length; j++) {
            cards[j].classList.remove("active");
        }

        this.classList.add("active");

        document.body.style.fontFamily = this.dataset.font;

    };

}


const colors = document.querySelectorAll(".theme-color");

for (let i = 0; i < colors.length; i++) {

    colors[i].onclick = function () {

        document.documentElement.style.setProperty(
            "--primary-color",
            this.dataset.color
        );

    };

}



const defaultColor = "#8b5cf6";
const defaultFont = "'Tajawal', sans-serif";

document.getElementById("resetTheme").onclick = function () {

    document.documentElement.style.setProperty(
        "--primary-color",
        defaultColor
    );

    document.body.style.fontFamily = defaultFont;

    const cards = document.querySelectorAll(".font-card");

    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.remove("active");
    }

    cards[0].classList.add("active");

};


/*============= ScrollToTop =============*/
const scrollToTop = document.querySelector(".scroll-to-top");
window.addEventListener("scroll", function () {
    if (window.pageYOffset > 500) {
        scrollToTop.style.display = "flex";
    } else {
        scrollToTop.style.display = "none";
    }
});
scrollToTop.addEventListener("click", function () {
    window.scrollTo(0, 0);
});
/*==========================================*/
/*======== Show/Hide Settings Bar ==========*/
const gearBtn = document.querySelector(".gear");
gearBtn.addEventListener("click", function () {
    toggleClass(".settings", "open-settings-bar");
    toggleClass(".logo", "fixed-logo");
    // document.querySelector(".settings").classList.toggle("open-settings-bar"); 
    // We Can replace function by this line
});
function toggleClass(selector, name) {
    const selectorEl = document.querySelector(selector);
    const classString = selectorEl.className;
    const index = classString.indexOf(name);
    let newCLass;
    if (index === -1) {
        newCLass = classString.concat(" " + name);
    } else {
        newCLass = classString.substring(0, index - 1);
    }
    selectorEl.className = newCLass;
}
//--- Hide Settings Bar When Press on Escape Key 
window.addEventListener("keydown", function (e) {
    const settingsBox = document.querySelector(".settings");
    const logo = document.querySelector(".logo");
    const index = settingsBox.className.indexOf("open-settings-bar");
    if (index !== -1 && e.which === 27) {
        settingsBox.classList.remove("open-settings-bar");
        logo.classList.remove("fixed-logo");
    }
});
/*===========================================*/
/*=========== Change Site Colors ============*/
const colors = document.querySelectorAll(".color-btn");
const mainColor = localStorage.getItem("main-color");
if (mainColor) {
    document.documentElement.style.setProperty("--main-color", mainColor);
}
Array.prototype.forEach.call(colors, (el) => {
    if (mainColor && el.dataset.color === mainColor) {
        Array.prototype.forEach.call(colors, (el) =>
            el.classList.remove("active")
            );
        el.classList.add("active");
    }
    el.onclick = function (e) {
        document.documentElement.style.setProperty(
            "--main-color",
            e.target.dataset.color
        );
        Array.prototype.forEach.call(colors, (el) =>
            el.classList.remove("active")
            );
        e.target.classList.add("active");
        localStorage.setItem("main-color", e.target.dataset.color);
    };
});
/*===========================================*/
/*======= Change Background Image ===========*/
let backgroundTimer;
function randomBackground() {
    const backgrounds = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
    const banner = document.querySelector(".banner");
    stopRandomBackground();
    backgroundTimer = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * backgrounds.length);
        banner.style.backgroundImage = `url(images/banner/${backgrounds[randomIndex]})`;
    }, 4000);
}
function stopRandomBackground() {
    clearInterval(backgroundTimer);
}
randomBackground();
const thumbnails = document.querySelectorAll(".settings .images img");
Array.prototype.forEach.call(thumbnails, (el) => {
    el.onclick = function () {
        const banner = document.querySelector(".banner");
        banner.style.backgroundImage = `url(images/banner/${el.dataset.image})`;
        localStorage.setItem("background-image", el.dataset.image);
    };
});
const bgImage = localStorage.getItem("background-image");
if (bgImage) {
    const banner = document.querySelector(".banner");
    banner.style.backgroundImage = `url(images/banner/${bgImage})`;
}
if (window.innerHeight < 605) {
    const favoriteImage = document.querySelector(".settings .favorite-bg");
    favoriteImage.remove();
}
/*============ Favorite Background ============*/
const BG_buttons = document.querySelectorAll(
    ".settings .random-background .button"
);
setActive(
    BG_buttons,
    "RBG",
    "startRBG",
    "stopRBG",
    "randomBackground",
    "stopRandomBackground"
);
/************** SetActive Background Function ************/
function setActive(
    selector,
    localStorageName,
    localStorageStart,
    localStorageStop,
    startFunction,
    stopFunction
) {
    Array.prototype.forEach.call(selector, (el) => {
        el.onclick = function (e) {
            Array.prototype.forEach.call(selector, (el) =>
                el.classList.remove("active")
            );
            if (e.target.dataset.val === localStorageStart) {
                window[startFunction]();
                localStorage.setItem(localStorageName, localStorageStart);
            }
            if (e.target.dataset.val === localStorageStop) {
                window[stopFunction]();
                localStorage.setItem(localStorageName, localStorageStop);
            }

            e.target.classList.add("active");
        };
    });
}
const RBG = localStorage.getItem("RBG");
if (RBG === "startRBG" || RBG === null) {
    randomBackground();
    Array.prototype.forEach.call(BG_buttons, (el) => {
        el.classList.remove("active");
        if (el.dataset.val === "startRBG") {
            el.classList.add("active");
        }
    });
} else if (RBG === "stopRBG") {
    stopRandomBackground();
    Array.prototype.forEach.call(BG_buttons, (el) => {
        el.classList.remove("active");
        if (el.dataset.val === "stopRBG") {
            el.classList.add("active");
        }
    });
}

/*=============================================*/
/*================== Bullets ==================*/
const bullets = document.querySelectorAll(".bullet");
Array.prototype.forEach.call(bullets, (el) => {
    el.addEventListener("click", function () {
        document.querySelector(el.dataset.section).scrollIntoView({
            behavior: "smooth",
        });
    });
});
const bullets_buttons = document.querySelectorAll(
    ".settings .bullets-settings .button"
);
setActive(
    bullets_buttons,
    "bullets",
    "show",
    "hide",
    "showBullets",
    "hideBullets"
);
const bulletsVar = localStorage.getItem("bullets");
if (bulletsVar === "show" || bulletsVar === null) {
    showBullets();
    Array.prototype.forEach.call(bullets_buttons, (el) => {
        el.classList.remove("active");
        if (el.dataset.val === "show") {
            el.classList.add("active");
        }
    });
} else if (bulletsVar === "hide") {
    hideBullets();
    Array.prototype.forEach.call(bullets_buttons, (el) => {
        el.classList.remove("active");
        if (el.dataset.val === "hide") {
            el.classList.add("active");
        }
    });
}
function showBullets() {
    const bulletsSection = document.querySelector(".bullets");
    bulletsSection.style.display = "block";
}
function hideBullets() {
    const bulletsSection = document.querySelector(".bullets");
    bulletsSection.style.display = "none";
}
/*========= Reset Settings Default ==========*/
const resetBtn = document.querySelector(".settings .reset-btn");
resetBtn.addEventListener("click", function () {
    activeElements = document.querySelectorAll(".settings .active");
    Array.prototype.forEach.call(activeElements, (el) => {
        el.classList.remove("active");
        const colorList = document.querySelector(".settings .colors-list");
        colorList.children[0].click();
        const buttons = document.querySelectorAll(".settings .btn-container");
        Array.prototype.forEach.call(buttons, (el) => {
            el.children[0].click();
        });
    });
});
/*===========================================*/
/*================ Skills ===================*/
const skillsSection = document.querySelector(".skills");
const skills = document.querySelectorAll(".skills .progress-val");
window.onscroll = function () {
    if (
        window.pageYOffset >
        skillsSection.offsetTop - skillsSection.clientHeight
    ) {
        Array.prototype.forEach.call(skills, (el) => {
            el.style.width = el.dataset.val;
            el.parentNode.children[1].textContent = el.dataset.val;
        });
    } else {
        Array.prototype.forEach.call(skills, (el) => {
            el.style.width = 0;
            el.parentNode.children[1].textContent = "";
        });
    }
};
/*=================================================*/
/*================== Gallery ======================*/
const gallery = document.querySelectorAll(".gallery .img");
Array.prototype.forEach.call(gallery, (el) => {
    el.addEventListener("click", function () {
        //Popup-container Div
        const popupModal = document.createElement("div");
        popupModal.className = "popup-modal";
        document.body.appendChild(popupModal);
        //Image-container
        const popupImage = document.createElement("div");
        popupImage.className = "popup-image";
        popupModal.appendChild(popupImage);
        //Image Title
        const popupTitle = document.createElement("h3");
        popupTitle.className = "popup-title";
        const titleText = document.createTextNode(el.children[0].alt);
        popupTitle.appendChild(titleText);
        popupImage.appendChild(popupTitle);
        //Image
        const image = document.createElement("img");
        image.src = el.children[0].src;
        popupImage.appendChild(image);
        //Close Image
        const closeBtn = document.createElement("span");
        closeBtn.className = "close-btn";
        const closeBtnText = document.createTextNode("×");
        closeBtn.appendChild(closeBtnText);
        popupImage.appendChild(closeBtn);
        closeBtn.addEventListener("click", function () {
            popupModal.remove();
        });
    });
});
window.addEventListener("keydown", function (e) {
    if (e.which === 27) {
        const modal = document.querySelector(".popup-modal");
        if (modal) modal.remove();
    }
});
/*===========================================*/
/*=========== Timeline Animation ============*/
const timeline = document.querySelector(".timeline .content");
let left = 0;
let mouseX = null;
let mouseDrag = false;
timeline.addEventListener("mousedown", function (e) {
    mouseX = e.pageX;
    mouseDrag = true;
    timeline.style.cursor = "grab";
});
timeline.addEventListener("mouseup", function (e) {
    mouseX = null;
    mouseDrag = false;
    timeline.style.cursor = "grab";
});
timeline.addEventListener("mouseover", function (e) {
    if (e.pageX > mouseX && mouseDrag && timeline.offsetLeft <= 0) {
        if (e.pageX > mouseX) left += 100;
    }
    if (
        e.pageX <= mouseX &&
        mouseDrag &&
        timeline.offsetLeft + timeline.clientWidth >= window.innerWidth / 2
    ) {
        if (e.pageX <= mouseX) left -= 100;
    }
    timeline.style.left = left + "px";
    if (mouseDrag) timeline.style.cursor = "grabbing";
    mouseDrag = false;
});

const rightBtn = document.querySelector(".timeline .right-btn");
const leftBtn = document.querySelector(".timeline .left-btn");
rightBtn.style.display = "none";
rightBtn.addEventListener("click", function () {
    animateTimeline("forward");
});
leftBtn.addEventListener("click", function () {
    rightBtn.style.display = "block";
    animateTimeline("backward");
});
function animateTimeline(move) {
    if (timeline.offsetLeft <= 0 && move === "forward") {
        left += 100;
    }
    if (
        timeline.offsetLeft + timeline.clientWidth >= window.innerWidth / 2 &&
        move === "backward"
    ) {
        left -= 100;
    }
    timeline.style.left = left + "px";
}
/*===========================================*/
/*=== Adjust Testimonials Height in Large screen ==*/
const windowWidth = window.innerWidth;
if (windowWidth > 768) {
    setMaxHeight();
}
// window.addEventListener("resize", function () {
//     location.reload();
// });
function setMaxHeight() {
    let maxHeight = 0;
    const quotes = document.querySelectorAll(".quotes");
    Array.prototype.forEach.call(quotes, (el) => {
        if (el.clientHeight > maxHeight) {
            maxHeight = el.clientHeight;
        }
    });
    Array.prototype.forEach.call(quotes, (el) => {
        el.style.height = maxHeight + "px";
    });
}
/*===========================================*/
/*======== Contact Form Placeholder =========*/
const fields = document.querySelectorAll(
    ".contact input[placeholder], textarea[placeholder]"
);
Array.prototype.forEach.call(fields, (el) => {
    let placeholder = null;

    el.addEventListener("focus", function () {
        placeholder = el.placeholder;
    });
    el.addEventListener("keyup", function () {
        if (el.value !== "") {
            el.parentNode.children[0].textContent = placeholder;
        } else {
            el.parentNode.children[0].textContent = "";
        }
    });
});
/*===========================================*/

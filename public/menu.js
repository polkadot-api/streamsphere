const menuBtn = document.querySelector(".menu-btn");
const menuNav = document.querySelector(".menu");
let touchStartY = 0;
let touchMoveY = 0;
let savedTouchMoveY = 0;
let touchEndY = 0;
let touchStartX = 0;
let touchMoveX = 0;
let touchEndX = 0;
let isSwipeY = false;
const swipeThreshold = 50;
let isDesktop;

resize();

menuBtn.addEventListener("click", toggleMenu);
window.addEventListener("resize", resize);

function resize() {
    isDesktop = window.innerWidth >= 900 ? true : false;
    isDesktop && document.body.classList.remove("no-scroll");
    !isDesktop && !menuNav.classList.contains("hidden") && document.body.classList.add("no-scroll");
}

const isTouchDevice = () => {
    return window.matchMedia("(pointer: coarse)").matches;
}

menuNav.querySelectorAll("a").forEach(el => {
    el.addEventListener("click", function () {
        if (!menuNav.classList.contains("hidden")) {
            toggleMenu();
        }
    })
});

function toggleMenu() {
    if(isDesktop) return;
    menuBtn.classList.toggle("isCross");
    menuNav.classList.toggle("hidden");
    document.body.classList.toggle("no-scroll");
    if (isTouchDevice()) {
        if (menuNav.classList.contains("hidden")) {
            menuNav.removeEventListener("touchstart", menuSwipeStartX);
            menuNav.removeEventListener("touchmove", menuSwipeMoveX);
            menuNav.removeEventListener("touchend", menuSwipeEndX);
        } else {
            menuNav.addEventListener("touchstart", menuSwipeStartX, { passive: true });
            menuNav.addEventListener("touchmove", menuSwipeMoveX);
            menuNav.addEventListener("touchend", menuSwipeEndX);
        }
    }
}

function menuSwipeStartX(e) {
    touchStartX = e.changedTouches[0].clientX;
}

function menuSwipeMoveX(e) {
    touchMoveX = e.changedTouches[0].clientX;
    if ((touchMoveX - touchStartX) < -swipeThreshold) {
        menuNav.classList.add("isSwipingX");
        let v = (touchMoveX - touchStartX + swipeThreshold) / window.innerWidth;
        menuNav.style.transform = "translateX(" + v * 101 + "%)";
        menuNav.querySelectorAll("li").forEach(el => {
            el.style.opacity = 1 + v * 4;
        })
    }
}

function menuSwipeEndX(e) {
    menuNav.classList.remove("isSwipingX");
    touchEndX = e.changedTouches[0].clientX;
    if ((touchEndX - touchStartX) < -swipeThreshold) {
        menuNav.removeAttribute("style");
        menuNav.querySelectorAll("li").forEach(el => {
            el.removeAttribute("style");
        })
        toggleMenu(e);
    } else {
        menuNav.style.transform = "translateX(0%)";
        menuNav.removeAttribute("style");
        menuNav.querySelectorAll("li").forEach(el => {
            el.removeAttribute("style");
        })
    }
}
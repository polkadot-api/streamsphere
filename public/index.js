const scrollAnimateEls = document.querySelectorAll(".scroll-animate");
const scrollTranslateEls = document.querySelectorAll(".scroll-translate");

init();

function init() {
    const images=["./assets/background_3.jpg","./assets/background_2.png"]
    window.addEventListener("scroll", triggerScrollAnimation, { passive: true });
    preload(images, () => {
        setTimeout(() => {
            document.querySelector("body").classList.add("loaded");
        }, 300);
    });
}
function preload(images, callback) {
    for (var i = 0; i < images.length; i++) {
        var img=new Image();
        img.src=images[i];
        img.onload = callback;
    }
}


function triggerScrollAnimation(){
    scrollAnimateEls.forEach(el => {
        if(el.classList.contains("animate")) return;
        const rect = el.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight &&
                    rect.bottom >= 0;
        
        if(isInView) el.classList.add("animate")
    });
}



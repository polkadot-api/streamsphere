init();

function init() {
    const images=["./assets/background_3.jpg","./assets/background_2.png"]
    preload(images);
}
function preload(images) {
    for (var i = 0; i < images.length; i++) {
        var img=new Image();
        img.src=images[i];
    }
}



import { Content } from './content.js';

init();


function init() {
    const images=["./assets/background_3.jpg"]
    preload(images);
}
function preload(images) {
    for (var i = 0; i < images.length; i++) {
        var img=new Image();
        img.src=images[i];
    }
    new Content(document.querySelector(".content"));
}
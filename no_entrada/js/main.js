var IMG_SIZE = 200;
var current = 0;
var audioFiles = ["audio/1.wav", "audio/2.wav", "audio/3.wav", "audio/4.wav"];

function moveImage() {
    var maxLeft = window.innerWidth - IMG_SIZE;
    var maxTop = window.innerHeight - IMG_SIZE;
    $('#theRunAwayButton').css({
        left: Math.random() * maxLeft + 'px',
        top:  Math.random() * maxTop  + 'px'
    });
}

function playSound() {
    new Audio(audioFiles[current]).play();
    current = (current + 1) % audioFiles.length;
}

$(document).ready(function() {
    moveImage();
    $('#theRunAwayButton').on('mouseenter', function() {
        moveImage();
        playSound();
    });
});

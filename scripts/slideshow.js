var current = 0;
var images = document.querySelector("#slider").querySelectorAll("img");
var descriptions = document.querySelector("#slider").querySelectorAll(".container p");
var dots = document.querySelector("#slider").querySelectorAll(".container .dots .dot");
var headers = document.querySelector("#slider").querySelectorAll(".container h2");
var playing = false;
var timer = -1;

window.onload = function() {
    for (var i = 0; i < dots.length; i++) {
        dots[i].addEventListener("click", function() {
            toSlide(this.id.match(/\d/));
        });
    }
}

function nextSlide() {
    changeSlide((c) => {
        return (c+1) % images.length;
    });
}

function prevSlide() {
    changeSlide((c) => {
        return c == 0 ? images.length - 1 : c - 1;
    });
}

function toSlide(n) {
    changeSlide((c) => {
        return n;
    });
}

function changeSlide(changeCurrent) {
    images[current].classList.add("hidden");
    descriptions[current].classList.add("hidden");
    dots[current].classList.remove("active");
    headers[current].classList.add("hidden");

    current = changeCurrent(current);

    images[current].classList.remove("hidden");
    descriptions[current].classList.remove("hidden");
    dots[current].classList.add("active");
    headers[current].classList.remove("hidden");
}

function play(o) {
    if(!playing) {
        o.classList.remove("glyphicon-play");
        o.classList.add("glyphicon-pause");
        playing = true;
        timer = setInterval(nextSlide,3000);
    } else {
        clearInterval(timer);
        o.classList.remove("glyphicon-pause");
        o.classList.add("glyphicon-play");
        playing = false;
    }
}
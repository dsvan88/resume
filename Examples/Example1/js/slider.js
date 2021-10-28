class simpleSlider {
    slideIndex = 0;
    slides;
    constructor([ parrentDiv, classNames, buttonLeft="arrow-left", buttonRight="arrow-right" ]) {
        this.slides = document.getElementsByClassName(classNames);

        parrentDiv.querySelector(`.${buttonLeft}`).onclick = (event) => {
            event.preventDefault();
            this.previousSlide()
        }
        parrentDiv.querySelector(`.${buttonRight}`).onclick = (event) => {
            event.preventDefault();
            this.nextSlide();
        }
        this.showSlides(0)
    }
    nextSlide() {
        this.showSlides(this.slideIndex += 1);
    }

    previousSlide() {
       this.showSlides(this.slideIndex -= 1);  
    }
    showSlides(n) {
        for (let slide of this.slides) {
            slide.style.display = "none";
        }

        if (n > this.slides.length) {
            this.slideIndex = 1;
        }
        if (n < 1) {
            this.slideIndex = this.slides.length;
        }

        this.slides[this.slideIndex-1].style.display = "block";
    }
}

let sliderDiv = document.body.querySelector('.slider-left');
let slider = new simpleSlider([sliderDiv, 'slider-left__main-image'])
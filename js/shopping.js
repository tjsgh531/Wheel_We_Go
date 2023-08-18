
class Shopping {
    constructor() {
        this.slider = document.querySelector('.slider');
        this.totalSlides = this.slider.childElementCount;
        this.slideIndex = 0;
        this.direction = 1; // 움직이는 방향 (1: 정방향, -1: 역방향)
        this.showSlide(this.slideIndex);
        setInterval(this.nextSlide.bind(this), 3000); // 3초마다 다음 슬라이드로 전환
    }

    showSlide(index) {
        this.slider.style.transform = `translateX(-${index * 100}%)`;
    }

    nextSlide() {
        this.slideIndex = (this.slideIndex + this.direction) % this.totalSlides;
        if (this.slideIndex === -1) {
            this.slideIndex = this.totalSlides - 1;
        }
        this.showSlide(this.slideIndex);
    }
}

const shopping = new Shopping();

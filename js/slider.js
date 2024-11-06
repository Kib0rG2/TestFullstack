document.addEventListener("DOMContentLoaded", function() {
    let startX = 0;
    let endX = 0;
    let currentIndex = 0;
    const slides = document.querySelectorAll('.slider .katalog-wrapper4, .slider .katalog-wrapper5');
    const totalSlides = slides.length;
    const slider = document.querySelector('.slider');


    function changeSlide(index) {
        const offset = -index * (slides[0].clientWidth + 20); // 20 - отступ между слайдами
        slider.style.transform = `translateX(${offset}px)`;


        slides.forEach(slide => slide.classList.remove('active'));


        slides[index].classList.add('active');
    }


    function toggleSlider() {
        if (window.innerWidth > 540) {
            slider.removeEventListener('touchstart', handleTouchStart);
            slider.removeEventListener('touchend', handleTouchEnd);
            slider.removeEventListener('touchmove', handleTouchMove);
        } else {

            slider.addEventListener('touchstart', handleTouchStart);
            slider.addEventListener('touchend', handleTouchEnd);
            slider.addEventListener('touchmove', handleTouchMove);
        }
    }


    function handleTouchStart(e) {
        startX = e.touches[0].clientX;
    }


    function handleTouchEnd(e) {
        endX = e.changedTouches[0].clientX;


        if (startX > endX + 50) {
            if (currentIndex < totalSlides - 1) {
                currentIndex++;
            }
        }

        else if (startX < endX - 50) {
            if (currentIndex > 0) {
                currentIndex--;
            }
        }


        changeSlide(currentIndex);
    }


    function handleTouchMove(e) {
        e.preventDefault();
    }


    changeSlide(currentIndex);


    toggleSlider();


    window.addEventListener('resize', toggleSlider);
});

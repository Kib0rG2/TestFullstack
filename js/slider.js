document.addEventListener("DOMContentLoaded", function() {
    let startX = 0;
    let currentIndex = 0;
    const slides = document.querySelectorAll('.slider .slide');
    const totalSlides = slides.length;
    const sliderTrack = document.querySelector('.slider-track');

    // Функция для смены слайда
    function changeSlide(index) {
        currentIndex = (index + totalSlides) % totalSlides; // Индексы с циклическим переходом
        const offset = -currentIndex * 100; // Каждый слайд занимает 100% ширины
        sliderTrack.style.transform = `translateX(${offset}%)`;

        // Убираем класс "active" у всех слайдов
        slides.forEach(slide => slide.classList.remove('active'));

        // Добавляем класс "active" текущему слайду
        slides[currentIndex].classList.add('active');
    }

    // Обработчик начала свайпа
    function handleTouchStart(e) {
        startX = e.touches[0].clientX; // Запоминаем начальную точку касания
    }

    // Обработчик завершения свайпа
    function handleTouchEnd(e) {
        const endX = e.changedTouches[0].clientX; // Запоминаем конечную точку касания

        // Если свайп был вправо
        if (startX > endX + 50) {
            currentIndex++;
        }
        // Если свайп был влево
        else if (startX < endX - 50) {
            currentIndex--;
        }

        // Обновляем слайд
        changeSlide(currentIndex);
    }

    // Добавляем обработчики для свайпов
    sliderTrack.addEventListener('touchstart', handleTouchStart);
    sliderTrack.addEventListener('touchend', handleTouchEnd);

    // Инициализация первого слайда
    changeSlide(currentIndex);
});

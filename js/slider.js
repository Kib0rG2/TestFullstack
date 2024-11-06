document.addEventListener("DOMContentLoaded", function() {
    let startX = 0;
    let endX = 0;
    let currentIndex = 0;
    const slides = document.querySelectorAll('.slider .katalog-wrapper4, .slider .katalog-wrapper5');
    const totalSlides = slides.length;
    const slider = document.querySelector('.slider');

    // Функция для смены слайда
    function changeSlide(index) {
        const offset = -index * (slides[0].clientWidth + 20); // 20 - отступ между слайдами
        slider.style.transform = `translateX(${offset}px)`;

        // Убираем класс "active" у всех слайдов
        slides.forEach(slide => slide.classList.remove('active'));

        // Добавляем класс "active" текущему слайду
        slides[index].classList.add('active');
    }

    // Функция для активации или деактивации слайдера в зависимости от ширины экрана
    function toggleSlider() {
        if (window.innerWidth > 540) {
            // Отключаем функционал свайпа
            slider.removeEventListener('touchstart', handleTouchStart);
            slider.removeEventListener('touchend', handleTouchEnd);
            slider.removeEventListener('touchmove', handleTouchMove); // Убираем обработчик для touchmove
        } else {
            // Включаем функционал свайпа
            slider.addEventListener('touchstart', handleTouchStart);
            slider.addEventListener('touchend', handleTouchEnd);
            slider.addEventListener('touchmove', handleTouchMove); // Добавляем обработчик для touchmove
        }
    }

    // Обработчик начала свайпа
    function handleTouchStart(e) {
        startX = e.touches[0].clientX; // Запоминаем начальную точку касания
    }

    // Обработчик завершения свайпа
    function handleTouchEnd(e) {
        endX = e.changedTouches[0].clientX; // Запоминаем конечную точку касания

        // Если свайп был вправо
        if (startX > endX + 50) {
            if (currentIndex < totalSlides - 1) {
                currentIndex++;
            }
        }
        // Если свайп был влево
        else if (startX < endX - 50) {
            if (currentIndex > 0) {
                currentIndex--;
            }
        }

        // Обновляем слайд
        changeSlide(currentIndex);
    }

    // Обработчик для блокировки прокрутки при свайпе
    function handleTouchMove(e) {
        e.preventDefault(); // Блокирует прокрутку страницы
    }

    // Инициализация первого слайда
    changeSlide(currentIndex);

    // Инициализация слайдера в зависимости от ширины экрана
    toggleSlider();

    // Слушаем событие изменения размера экрана
    window.addEventListener('resize', toggleSlider);
});

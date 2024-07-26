// schedule
let topBlock = document.querySelector('.schedule__top');
let fullText = document.getElementById('full-text');
let isMobileView = false;
let newBlock;
function updateText(){
    if (window.innerWidth <= 768 && !isMobileView){
        isMobileView = true;
        const firstPart = 'Чтобы поддержать Международный васюкинский турнир';
        const secondPart = 'посетите лекцию на тему:<span class="schedule__text-accent"> «Плодотворная дебютная идея» </span>';
    
        fullText.textContent = firstPart; // меняем контент в блоке
        newBlock = document.createElement('p');
        newBlock.classList.add('schedule__top-text');
        topBlock.append(newBlock);
        newBlock.innerHTML = secondPart;
    } else if (window.innerWidth > 768 && isMobileView){
        isMobileView = false;
        fullText.innerHTML = 'Чтобы поддержать Международный васюкинский турнир посетите лекцию на тему: <span class="schedule__text-accent">«Плодотворная дебютная идея»</span>';
        newBlock.remove();
    }
}
window.addEventListener('resize', updateText);

// slider stages
const items = document.querySelectorAll('.stages__item');
const prevbtn = document.querySelector('.stages__prev-btn');
const nextbtn = document.querySelector('.stages__next-btn');
const dotsContainer = document.querySelector('.stages__dots');
const itemsCount = items.length;

let currentIndex = 0;

items.forEach((item,index)=>{ // нумеруем карточки на странице
    let stageCounter = item.querySelector('.stages__item-counter');
    stageCounter.textContent = index + 1;
});
// Функция для обновления видимости слайдов
function updateSlider() {
    items.forEach(item => {
        item.style.display = 'none'; // Скрыть все элементы
    });

    // Отображение элементов в зависимости от текущего индекса
    if (currentIndex === 0) { // item-1 и item-2
        items[0].style.display = 'flex';
        items[1].style.display = 'flex';
    } else if (currentIndex === 1) { // item-3
        items[2].style.display = 'flex';
    } else if (currentIndex === 2) { // item-4 и item-5
        items[3].style.display = 'flex';
        items[4].style.display = 'flex';
    } else if (currentIndex === 3) { // item-6
        items[5].style.display = 'flex';
    } else if (currentIndex === 4) { // item-7
        items[6].style.display = 'flex';
    }

    updateDots();
    updateNavigationButtons();
}

// Функция для обновления точек навигации
function updateDots() {
    dotsContainer.innerHTML = ''; // Очищаем существующие точки
    const totalDots = 5; // Всего 5 точек

    for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === currentIndex) {
            dot.classList.add('dot--active'); // Отмечаем активную точку
        }
        dotsContainer.appendChild(dot);
    }
}

// Обновление состояния кнопок навигации
function updateNavigationButtons() {
    prevbtn.disabled = currentIndex === 0; 
    // Убираем класс btn--disabled если не на первом элементе
    if (currentIndex === 0) { // Если на первом элементе
        prevbtn.classList.add('btn--disabled'); // Добавлено
    } else { 
        prevbtn.classList.remove('btn--disabled'); // Добавлено
    }

    // Отключаем кнопку, если это последний элемент
    nextbtn.disabled = currentIndex === 4; 
    // Добавление класса btn--disabled к кнопке "Next" при достижении конца (item-7).
    if (currentIndex === 4) { // item-7
        nextbtn.classList.add('btn--disabled'); // Добавлено
    } else { 
        nextbtn.classList.remove('btn--disabled'); // Добавлено
    }
}

// Обработчики событий для кнопок
prevbtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
    }
});

nextbtn.addEventListener('click', () => {
    if (currentIndex < 4) { // Только до 4
        currentIndex++;
        updateSlider();
    }
});

function checkScreenWidth() {
if (window.innerWidth > 570) {
    document.querySelector('.stages__items').style.display = 'grid';
    items.forEach(item => {
        item.style.display = 'flex'; // Показываем все элементы в grid режиме
    }); 
} else {
    document.querySelector('.stages__items').style.display = 'flex';
    updateSlider();        
}
}
checkScreenWidth();
window.addEventListener('resize', checkScreenWidth);

// Slider memebers
let prevButton = document.querySelector('.members__slider-prev');
let nextButton = document.querySelector('.members__slider-next');

let countAllSlides = document.querySelector('.members__slider-all');
let slidesOnDisplay = document.querySelector('.members__slider-ondisplay');

const slides = Array.from(document.querySelectorAll('.members__slide'));
const sliderTrack = document.querySelector('.members__slider-track');

let sliderCounter = 0;

let sliderWidth = slides[0].offsetWidth + 20;

countAllSlides.textContent = slides.length;

nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);

function nextSlide() {
    // Увеличиваем счетчик
    sliderCounter++;
    
    // Если индекс превышает количество слайдов, сбрасываем его
    if (sliderCounter >= slides.length) {
        sliderCounter = 0;
        }    
        // Обновляем слайдер
    sliderRoll();
    
}

function prevSlide() {
    sliderCounter--;

    // Если индекс меньше 0, переходим к последнему слайду
    if (sliderCounter < 0) {
        sliderCounter = slides.length - 1;
    }
    // Обновляем слайдер
    sliderRoll();
}

function sliderRoll() {
    // Сдвигаем track в соответствии с текущим индексом
    sliderTrack.style.transform = `translateX(-${sliderCounter * sliderWidth}px)`;
    currentSlides();
}

// Перелистывание слайдов автоматически через 4 секунды,
setInterval(() => {
    nextSlide();
}, 4000);

function currentSlides(){
    slidesOnDisplay.textContent = sliderCounter + 1;
}
const restartButton = document.getElementById("restart");
const signalDisplay = document.getElementById("signalDisplay");
const signal = document.getElementById("signal");
const balloon = document.getElementById("balloonImg");

const betContainer = document.getElementById("bet-container");
const submit = document.getElementById("submit");
const betSelect = document.getElementById("bet-select");


function generateNumber(min, max) {
    // Генерирует сообщение
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function playAnim(element, animatedClass) { 
    // Добавляет класс анимации
    element.classList.add(animatedClass);
    
    element.addEventListener('animationend', () => {
        element.classList.remove(animatedClass);
    }, {once: true});
}

function animateNumber(element, start, end, duration) {
    let startTime = null;

    function step(currentTime) {
        if (!startTime) {
            startTime = currentTime;
        }
        const progress = Math.min((currentTime - startTime) / duration, 1); // Прогресс от 0 до 1
        const currentNumber = start + (end - start) * progress;
        element.textContent = currentNumber.toFixed(2); // Форматируем до 2 знаков после запятой

        if (progress < 1) {
            requestAnimationFrame(step); // Продолжаем анимацию
        }
    }

    requestAnimationFrame(step); // Запускаем анимацию
}


submit.onclick = function() {
    betContainer.classList.add("hidden");

    balloon.classList.add("balloon-big");
    restartButton.classList.remove("hidden");

    const selectedBet = parseInt(betSelect.value, 10);

    let minRandom, maxRandom;

    // Логика зависимости диапазона от ставки
    if (selectedBet === 7) {
        minRandom = 10;
        maxRandom = 25;
    } else if (selectedBet === 10) {
        minRandom = 15;
        maxRandom = 50;
    } else if (selectedBet === 20) {
        minRandom = 27;
        maxRandom = 80;
    } else if (selectedBet <= 30) {
        minRandom = 40;
        maxRandom = 120;
    } else if (selectedBet <= 50) {
        minRandom = 60;
        maxRandom = 200;
    } else {
        minRandom = 100 + (selectedBet - 50) * 2; // Базовый минимум + прирост
        maxRandom = 250 + (selectedBet - 50) * 4; // Базовый максимум + прирост
    }
    minRandom *= 100;
    maxRandom *= 100;
    
    // Генерируем новое число и запускаем анимацию
    const randomFloat = generateNumber(minRandom, maxRandom) / 100; // Делим на 100 для получения дробного числа

    // Добавляем класс для появления текста с задержкой
    setTimeout(() => {
        signalDisplay.classList.remove("hidden");
    }, 200);
    animateNumber(signal, 0, randomFloat, 1000); // Анимация от 0 до сгенерированного числа за 1 секунду

}
// Кнопка рестарт
restartButton.onclick = function() {
   // Скрываем signalDisplay сразу
   signalDisplay.classList.add("hidden");

   // Задержка для других действий
   setTimeout(() => {
       playAnim(restartButton.querySelector("img"), "spin-on-click");
       betContainer.classList.remove("hidden");
       balloon.classList.remove("balloon-big");
       restartButton.classList.add("hidden");
   }, 50); // Задержка 500 ms перед другими действиями
};

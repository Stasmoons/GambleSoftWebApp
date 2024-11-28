const getSignalButton = document.getElementById("getSignal");
const restartButton = document.getElementById("restart");

const cells = document.getElementsByClassName("cell");
const cellsArray = Array.from(cells);


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

function clearCells() {
    // Отключает все ячейки
    cellsArray.forEach(cellElement => {
        cellElement.classList.remove("cell-active"); 
        cellElement.classList.add("cell-disabled");
    }); 
}

function getStarsCount() {
    const select = document.getElementById("minesCountSelect");
    let trapsCount = select.options[select.selectedIndex].value;

    const trapsToStarsMap = {
        "1": [5, 10],
        "2": [4, 7],
        "3": [3, 5]
    }

    const bounds = trapsToStarsMap[trapsCount];
    const starsCount = generateNumber(bounds[0], bounds[1]);
    return starsCount;
}

// Кнопка получения сигнала
getSignalButton.onclick = function() {
    getSignalButton.disabled = true;

    playAnim(getSignalButton, "small-on-click");  // Анимация прокрутки
    clearCells();  // Очищаем ячейки

    // Выбираем ячейки для активации
    const signalIndexes = [];
    const starsCount = getStarsCount();
        
    while (signalIndexes.length < starsCount) {
        const cellIndex = generateNumber(0, cellsArray.length-1);

        if (signalIndexes.indexOf(cellIndex) === -1) {
            signalIndexes.push(cellIndex);
        }
    }

    // Активируем выбранные ячейки
    signalIndexes.forEach(index => {
        const cellElement = cellsArray[index];
        
        playAnim(cellElement, "roll-cell");
        cellElement.classList.remove("cell-disabled"); 
        cellElement.classList.add("cell-active");
    }); 

    
    setTimeout(() => {
        getSignalButton.disabled = false;
    }, 500); // Ожидание полного завершения всех анимаций
}

// Кнопка рестарт
restartButton.onclick = function() {
    playAnim(restartButton, "spin-on-click");
    clearCells();  // Очищаем ячейки
}


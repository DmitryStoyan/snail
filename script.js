const canvas = document.querySelector("canvas"); // Выбираем элемент canvas из DOM
const context = canvas.getContext("2d"); // Получаем 2D контекст рисования на canvas
const scoreText = document.querySelector(".score");
const startGameButton = document.querySelector(".start-game-button");

let coordX = 0; // Начальная позиция по оси X для улитки
let coordY = 0; // Начальная позиция по оси Y для улитки
let xSpeed = 10; // Скорость перемещения по оси X
let ySpeed = 0; // Скорость перемещения по оси Y
let snailSize = 30; // Размер улитки
let redSquareX = Math.floor(Math.random() * canvas.width); // Начальная позиция по оси X для красного квадрата
let redSquareY = Math.floor(Math.random() * canvas.height); // Начальная позиция по оси Y для красного квадрата
let redSquareSize = 30; // Размер красного квадрата
let greenSquareSize = 30; // Размер зеленого квадрата
// let greenSquareX = Math.floor(Math.random() * canvas.width); // Начальная позиция по оси X для зеленого квадрата
// let greenSquareY = Math.floor(Math.random() * canvas.height); // Начальная позиция по оси Y для зеленого квадрата
let tailSize = 10; // Размер "хвоста" улитки
let score = 0; // Счетчик очков
let gameInterval; // Переменная для хранения идентификатора интервала игры
let greenSquareX;
let greenSquareY;

// Скорость улитки
function speedSnail(x, y) {
  xSpeed = x;
  ySpeed = y;
}

// Функция для перемещения улитки в зависимости от нажатых клавиш
function moveSnail(key) {
  if (key.code === "ArrowRight") {
    // xSpeed = 10; // Устанавливаем положительную скорость по оси X (вправо)
    // ySpeed = 0; // Обнуляем скорость по оси Y
    speedSnail(10, 0);
  } else if (key.code === "ArrowLeft") {
    // xSpeed = -10; // Устанавливаем отрицательную скорость по оси X (влево)
    // ySpeed = 0; // Обнуляем скорость по оси Y
    speedSnail(-10, 0);
  } else if (key.code === "ArrowUp") {
    // ySpeed = -10; // Устанавливаем отрицательную скорость по оси Y (вверх)
    // xSpeed = 0; // Обнуляем скорость по оси X
    speedSnail(0, -10);
  } else if (key.code === "ArrowDown") {
    // ySpeed = 10; // Устанавливаем положительную скорость по оси Y (вниз)
    // xSpeed = 0; // Обнуляем скорость по оси X
    speedSnail(0, 10);
  }
}

// Функция для перемещения улитки и обновления кадра на canvas
function move() {
  context.clearRect(0, 0, canvas.width, canvas.height); // Очищаем canvas перед каждым обновлением

  coordX = coordX + xSpeed; // Обновляем позицию улитки по оси X
  coordY = coordY + ySpeed; // Обновляем позицию улитки по оси Y

  context.fillStyle = "green";
  context.fillRect(coordX, coordY, snailSize, snailSize); // Рисуем улитку на новой позиции

  context.fillStyle = "red"; // Устанавливаем красный цвет для красного квадрата
  context.fillRect(redSquareX, redSquareY, redSquareSize, redSquareSize); // Рисуем красный квадрат на canvas
  context.fillStyle = "black"; // Устанавливаем зеленый цвет для зеленого квадрата
  context.fillRect(
    greenSquareX,
    greenSquareY,
    greenSquareSize,
    greenSquareSize
  ); // Рисуем зеленый квадрат на canvas

  // Проверяем столкновение улитки с красным квадратом
  if (
    coordX < redSquareX + redSquareSize &&
    coordX + snailSize > redSquareX &&
    coordY < redSquareY + redSquareSize &&
    coordY + snailSize > redSquareY
  ) {
    redSquareX = Math.floor(Math.random() * canvas.width); // Генерируем новую позицию красного квадрата по оси X
    redSquareY = Math.floor(Math.random() * canvas.height); // Генерируем новую позицию красного квадрата по оси Y
    snailSize += tailSize; // Увеличиваем размер улитки (добавляем "хвост")
    setScore(1);
  }

  // Проверяем столкновение улитки с зеленым квадратом
  if (
    coordX < greenSquareX + greenSquareSize &&
    coordX + snailSize > greenSquareX &&
    coordY < greenSquareY + greenSquareSize &&
    coordY + snailSize > greenSquareY
  ) {
    endGame();
  }

  // Проверка выхода за границы
  if (coordX >= 1000) {
    coordX = 0;
  } else if (coordX <= 0) {
    coordX = 1000;
  }
  if (coordY >= 1000) {
    coordY = 0;
  } else if (coordY <= 0) {
    coordY = 1000;
  }
}

// Добавление очков
function setScore(point) {
  score = score + point;
  scoreText.textContent = "Собрано ягод : " + score;
}

// Случайная геренация бомб на карте
function generateBomb() {
  greenSquareX = Math.floor(Math.random() * canvas.width);
  greenSquareY = Math.floor(Math.random() * canvas.height);
}

setInterval(generateBomb, 5000);
// Функция для начала игры, запускает функцию move каждые 30 миллисекунд
function startGame() {
  score = 0;
  scoreText.textContent = "Собрано ягод : " + score;
  gameInterval = setInterval(move, 30); // Присваиваем идентификатор интервала переменной gameInterval
}

function endGame() {
  clearInterval(gameInterval); // Останавливаем выполнение функции move
  alert("Игра окончена. Ваш счет: " + score); // Показываем сообщение с результатом игры
}

// Сброс игры в начальное положение
function resetGame() {
  coordX = 0; // Начальная позиция по оси X для улитки
  coordY = 0; // Начальная позиция по оси Y для улитки
  xSpeed = 10; // Скорость перемещения по оси X
  ySpeed = 0; // Скорость перемещения по оси Y
  snailSize = 30; // Размер улитки
  redSquareX = Math.floor(Math.random() * canvas.width); // Начальная позиция по оси X для красного квадрата
  redSquareY = Math.floor(Math.random() * canvas.height); // Начальная позиция по оси Y для красного квадрата
  redSquareSize = 30; // Размер красного квадрата
  greenSquareSize = 30; // Размер зеленого квадрата
  tailSize = 10; // Размер "хвоста" улитки
  score = 0; // Счетчик очков
}

startGameButton.addEventListener("click", function () {
  resetGame();
  startGame();
});

// Добавляем слушатель событий для обработки нажатий клавиш и вызываем функцию moveSnail
window.addEventListener("keydown", moveSnail);
// startGame(); // Запускаем игру при загрузке страницы

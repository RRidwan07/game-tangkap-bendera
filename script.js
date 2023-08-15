document.addEventListener('DOMContentLoaded', () => {
  const flag = document.getElementById('flag');
  const gameContainer = document.querySelector('.game-container');
  const startButton = document.getElementById('start-button');
  const scorePopup = document.getElementById('score-popup');
  const popupTitle = scorePopup.querySelector('h2');
  const popupMessage = scorePopup.querySelector('p');
  const restartButton = scorePopup.querySelector('#restart');
  const scoreElement = document.getElementById('score');
  const timerElement = document.querySelector('.timer');

  let score = 0;
  let timeLeft = 30;
  let timerInterval;
  let flagTimeout;
  let gameStarted = false;

  // Menyembunyikan elemen-elemen yang tidak perlu saat awal
  gameContainer.style.display = 'none';
  flag.style.display = 'none';
  scorePopup.style.display = 'none';

  function updateTimer() {
    timerElement.textContent = `Waktu Tersisa: ${timeLeft} detik`;
  }

  function countdown() {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimer();
    } else {
      clearInterval(timerInterval);
      clearInterval(flagTimeout);
      flag.removeEventListener('click', increaseScore);
      showGameOverPopup();
    }
  }

  function increaseScore() {
    score++;
    scoreElement.textContent = score;
    resetFlagPosition();

    if (score >= 15) {
      clearInterval(timerInterval);
      clearInterval(flagTimeout);
      showWinPopup();
    }
  }

  function resetFlagPosition() {
    const newLeft = Math.random() * (gameContainer.offsetWidth - flag.offsetWidth);
    const newTop = Math.random() * (gameContainer.offsetHeight - flag.offsetHeight);

    flag.style.left = `${newLeft}px`;
    flag.style.top = `${newTop}px`;
  }

  function moveFlagRandomly() {
    resetFlagPosition();
    flagTimeout = setTimeout(moveFlagRandomly, Math.random() * 1000 + 1000);
  }

  function showGameOverPopup() {
    popupTitle.textContent = 'Game Over';
    popupMessage.textContent = `Skor Anda: ${score}`;
    scorePopup.style.display = 'block';
  }

  function showWinPopup() {
    popupTitle.textContent = 'Selamat!';
    popupMessage.textContent = `Anda Menang dengan Skor: ${score}`;
    scorePopup.style.display = 'block';
  }

  function restartGame() {
    score = 0;
    timeLeft = 30;
    scoreElement.textContent = score;
    updateTimer();
    moveFlagRandomly();
    flag.addEventListener('click', increaseScore);
    timerInterval = setInterval(countdown, 1000);
  }

  function startGame() {
    gameStarted = true;
    startButton.disabled = true;
    startButton.style.display = 'none';
    gameContainer.style.display = 'block';
    flag.style.display = 'block';
    timerInterval = setInterval(countdown, 1000);
    moveFlagRandomly();
    updateTimer();
    flag.addEventListener('click', increaseScore);
  }

  startButton.addEventListener('click', startGame);

  // Menangani penutupan popup
  scorePopup.addEventListener('click', () => {
    scorePopup.style.display = 'none';
    if (gameStarted) {
      restartGame();
    }
  });
});

const DURATION_SECONDS = 25 * 60;

const keyElement = document.getElementById('pomodoro-key');
const timerText = document.getElementById('timer-text');
const tomatoImage = document.getElementById('tomato-image');

let remainingSeconds = DURATION_SECONDS;
let countdownInterval = null;
let startTimestamp = null;

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${secs}`;
};

const render = () => {
  const isRunning = countdownInterval !== null;

  keyElement.classList.toggle('running', isRunning);
  keyElement.classList.toggle('idle', !isRunning);
  keyElement.disabled = isRunning;
  keyElement.setAttribute(
    'aria-label',
    isRunning ? 'Pomodoro timer running' : 'Start Pomodoro timer'
  );

  timerText.hidden = !isRunning;
  tomatoImage.hidden = isRunning;

  timerText.textContent = formatTime(remainingSeconds);
};

const stopCountdown = () => {
  clearInterval(countdownInterval);
  countdownInterval = null;
  startTimestamp = null;
  remainingSeconds = DURATION_SECONDS;
  render();
};

const startCountdown = () => {
  if (countdownInterval !== null) {
    return;
  }

  remainingSeconds = DURATION_SECONDS;
  startTimestamp = Date.now();
  render();

  countdownInterval = setInterval(() => {
    const elapsedSeconds = Math.floor((Date.now() - startTimestamp) / 1000);
    remainingSeconds = Math.max(0, DURATION_SECONDS - elapsedSeconds);

    if (remainingSeconds <= 0) {
      const completedInterval = countdownInterval;
      clearInterval(completedInterval);
      remainingSeconds = 0;
      render();
      setTimeout(() => {
        if (countdownInterval === completedInterval) {
          stopCountdown();
        }
      }, 1000);
      return;
    }

    render();
  }, 1000);
};

keyElement.addEventListener('click', startCountdown);
render();

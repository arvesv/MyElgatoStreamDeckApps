const DURATION_SECONDS = 25 * 60;

const keyElement = document.getElementById('pomodoro-key');
const timerText = document.getElementById('timer-text');
const tomatoImage = document.getElementById('tomato-image');

let remainingSeconds = DURATION_SECONDS;
let countdownInterval = null;
let endTimestamp = null;

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
  endTimestamp = null;
  remainingSeconds = DURATION_SECONDS;
  render();
};

const startCountdown = () => {
  if (countdownInterval !== null) {
    return;
  }

  remainingSeconds = DURATION_SECONDS;
  endTimestamp = Date.now() + DURATION_SECONDS * 1000;
  render();

  countdownInterval = setInterval(() => {
    remainingSeconds = Math.max(0, Math.ceil((endTimestamp - Date.now()) / 1000));

    if (remainingSeconds <= 0) {
      stopCountdown();
      return;
    }

    render();
  }, 1000);
};

keyElement.addEventListener('click', startCountdown);
render();

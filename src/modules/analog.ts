import moment, { Moment, Duration } from 'moment';

function startAnalogTimer() {
  const deg: number = -6;
  const minuteHand: HTMLElement | null = document.querySelector('.min-pointer');
  const secondHand: HTMLElement | null = document.querySelector('.sec-pointer');
  const timerSelect: HTMLSelectElement | null = document.getElementById('timerSelect') as HTMLSelectElement;
  const startTimerBtn: HTMLButtonElement | null = document.getElementById('startTimerBtn') as HTMLButtonElement;
  const stopTimerBtn: HTMLButtonElement | null = document.getElementById('stopTimerBtn') as HTMLButtonElement;

  let timerInterval: number | null = null;
  let endTime: Moment | null = null;

  function updateClock() {
    if (!endTime || !minuteHand || !secondHand) {
      console.error('End time or clock hands not set.');
      return;
    }

    const currentTime: Moment = moment();
    const remainingTime: Duration = moment.duration(endTime.diff(currentTime));

    const mm: number = (remainingTime.minutes() * deg) + (remainingTime.seconds() / 60 * deg);
    const ss: number = remainingTime.seconds() * deg;

    console.log(`Current Time: ${currentTime.format('HH:mm:ss')}`);
    console.log(`Remaining Time: ${remainingTime.minutes()} minutes ${remainingTime.seconds()} seconds`);
    console.log(`Transform Values: ${mm}deg (minutes), ${ss}deg (seconds)`);

    minuteHand.style.transform = `rotateZ(${mm}deg)`;
    secondHand.style.transform = `rotateZ(${ss}deg)`;

    console.log(`Remaining Time: ${remainingTime.minutes()} minutes ${remainingTime.seconds()} seconds`);

    if (remainingTime.asMilliseconds() <= 0) {
      clearInterval(timerInterval as number);
      stopTimerBtn!.style.display = 'none';
      startTimerBtn!.style.display = 'inline-block';
    }
  }

  function setTimer() {
    const selectedMinutes: number = parseInt(timerSelect?.value || '0', 10);

    if (isNaN(selectedMinutes)) {
      console.error('Invalid timer interval. Please select a valid interval.');
      return;
    }

    endTime = moment().add(selectedMinutes, 'minutes');

    clearInterval(timerInterval as number);
    updateClock();
    timerInterval = setInterval(updateClock, 1000);

    stopTimerBtn!.style.display = 'inline-block';
    startTimerBtn!.style.display = 'none';
  }

  function stopTimer() {
    clearInterval(timerInterval as number);
    stopTimerBtn!.style.display = 'none';
    startTimerBtn!.style.display = 'inline-block';
  }

  if (startTimerBtn && stopTimerBtn) {
    startTimerBtn.addEventListener('click', setTimer);
    stopTimerBtn.addEventListener('click', stopTimer);
  } else {
    console.error('Start or stop button not found.');
  }
}

export default { startAnalogTimer };

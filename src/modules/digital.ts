import moment from 'moment';

let startTime: moment.Moment | null = null;
// event listener drop down button click overlay
//event listener abort button 'click'

function updateTimer() {
  if (startTime) {
    const currentTime = moment();
    const duration = moment.duration(currentTime.diff(startTime));
    const formattedTime = moment.utc(duration.asMilliseconds()).format('mm:ss');
    document.getElementById('timer')!.innerText = formattedTime;
  }
}

function startTimer() {
  startTime = moment();
  updateTimer();
  setInterval(updateTimer, 1000);
}

function stopTimer() {
  clearInterval(0);
  startTime = null;
  updateTimer();
}




export default {updateTimer, startTimer, stopTimer}
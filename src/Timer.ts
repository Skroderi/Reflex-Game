class Timer {
  timer;
  time: number;
  start;
  defaultTime: number;
  constructor(timeValue: number) {
    this.timer = document.querySelector(".time");
    this.defaultTime = timeValue;
    this.time = timeValue;
  }
  startTimer() {
    this.start = setInterval(() => {
      if (!this.time) return;
      this.time--;
      this.timer.textContent = `Czas: ${this.time} sek`;
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.start);
  }

  restartTimer(time: number) {
    this.time = time;
  }
}
export default Timer;

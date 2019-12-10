class Statistics {
  lifes: number;
  score: number;
  constructor(lifes: number, score: number) {
    this.lifes = lifes;
    this.score = score;
  }

  updateStatistic(targetSquare: HTMLElement): boolean {
    const isActive = targetSquare.classList.contains("active");
    const isSquare = targetSquare.classList.contains("square");

    if (isActive && isSquare) {
      this.score++;
      return true;
    } else if (!isActive && isSquare) {
      this.lifes--;
      return false;
    }
  }

  resetStatistics(lifes: number, score: number = 0) {
    this.lifes = lifes;
    this.score = score;
  }
}
export default Statistics;

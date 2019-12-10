import Result from "./Result";
import UI from "./UI";
import Timer from "./Timer";
import Draw from "./Draw";
import Statistics from "./Statistics";
import Alert from "./Alert";

class Game {
  startButton;
  squares;
  timer;
  ui;
  time;
  spanScore: HTMLElement;
  spanLifes: HTMLElement;
  statistics;
  lifes;
  score;
  draw;
  squaresNumber;
  boardSquares: HTMLElement;
  isActive;
  resetButton;
  clickSquare;
  targetSquare;
  startDrawSquare;
  spanTimer: HTMLElement;

  constructor(time: number, lifes: number, squaresNumber: number) {
    this.timer = new Timer(time);
    this.statistics = new Statistics(lifes, (this.score = 0));
    this.ui = new UI();

    this.startButton = document.querySelector(".board__button--start");
    this.resetButton = document.querySelector(".board__button--reset");
    this.spanTimer = document.querySelector(".time");
    this.spanLifes = document.querySelector(".stats__panel--life");
    this.spanScore = document.querySelector(".stats__panel--score");
    this.boardSquares = document.querySelector(".board__squares");

    this.startButton.addEventListener("click", () => this.startGame());
    this.resetButton.addEventListener("click", () =>
      this.restartGame(time, lifes, (this.score = 0))
    );

    this.render(this.timer.time, this.statistics.lifes, this.statistics.score);
    this.ui.initSquares(squaresNumber);
  }

  render(time: number, lifes: number, score: number) {
    this.spanTimer.textContent = `Czas: ${time} sek`;
    this.spanLifes.textContent = `Życie: ${lifes}`;
    this.spanScore.textContent = `Punkty: ${score}`;
  }

  restartGame(time: number, lifes: number, score: number) {
    const squareActive = document.querySelector(".active");
    this.stopGame();
    this.ui.removeSquaresColor();

    if (squareActive) {
      squareActive.classList.remove("active");
    }

    this.startButton.disabled = false;
    this.statistics.resetStatistics(lifes, score);
    this.timer.restartTimer(time);
    this.render(time, lifes, score);
    Alert.clearAlert();
  }

  stopGame() {
    this.timer.stopTimer();
    clearInterval(this.startDrawSquare);
    this.boardSquares.removeEventListener("click", this.clickSquare);
  }

  continueGame() {
    this.timer.startTimer();
    setInterval(this.startDrawSquare, 1200);
    this.boardSquares.addEventListener("click", this.clickSquare);
  }
  endGame() {
    this.stopGame();
    this.ui.removeSquaresColor();
    Alert.showAlert(
      `End of the game. Your score: ${this.statistics.score}`,
      "alert alert--positive"
    );
  }
  isMissedSquare(drawnSquare) {
    const isActive = drawnSquare.classList.contains("active");
    if (isActive) {
      this.statistics.lifes--;
      drawnSquare.classList.remove("active");
      this.stopGame();
      setTimeout(() => {
        alert("You missed square.");
        this.startGame();
      }, 50);
    }
    this.render(this.timer.time, this.statistics.lifes, this.statistics.score);
  }

  startGame() {
    this.timer.startTimer();
    this.draw = new Draw();
    this.startButton.disabled = true;
    this.ui.colorSquares();

    const drawSquare = () => {
      const canPlay = Result.canPlay(this.statistics.lifes, this.timer.time);
      if (canPlay) {
        this.startDrawSquare = setInterval(() => {
          let drawnSquare = this.draw.drawSquare();
          this.ui.colorActiveSquare(drawnSquare);
          setTimeout(() => {
            this.isMissedSquare(drawnSquare);
          }, 1000);
        }, 2000);
      } else {
        this.endGame();
      }
    };

    drawSquare();

    this.clickSquare = e => {
      this.targetSquare = e.target;
      const canPlay = Result.canPlay(this.statistics.lifes, this.timer.time);

      if (canPlay) {
        const isGoodSquare = this.statistics.updateStatistic(this.targetSquare);
        this.ui.removeActiveSquareColor(this.targetSquare);
        this.stopGame();
        this.startGame();
        if (!isGoodSquare) {
          const squareActive = document.querySelector(".active");
          if (squareActive) {
            this.ui.removeActiveSquareColor(squareActive);
          }

          this.stopGame();
          alert("You clicked wrong square and lost life!");
          this.startGame();
        }
      } else {
        this.endGame();
      }

      this.render(
        this.timer.time,
        this.statistics.lifes,
        this.statistics.score
      );
    };

    this.boardSquares.addEventListener("click", this.clickSquare);
  }
}

export default Game;

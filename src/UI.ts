class UI {
  boardSquares;

  constructor() {
    this.boardSquares = document.querySelector(".board__squares");
  }

  initSquares(squaresNumber: number) {
    for (let i = 0; i < squaresNumber; i++) {
      const square = document.createElement("div");
      square.className = "square";
      this.boardSquares.appendChild(square);
    }
  }

  colorSquares() {
    const squares = document.querySelectorAll(".square");
    squares.forEach(square => {
      square.classList.add("square__in-game");
    });
  }

  colorActiveSquare(drawnSquare: HTMLElement) {
    drawnSquare.classList.add("active");
  }

  removeActiveSquareColor(square: HTMLElement) {
    square.classList.remove("active");
  }

  removeSquaresColor() {
    const squares = document.querySelectorAll(".square");

    squares.forEach(square => {
      square.classList.remove("square__in-game");
    });
  }
}

export default UI;

class Draw {
  squares;
  drawnSquare: HTMLElement;

  constructor() {
    this.squares = document.querySelectorAll(".square");
    this.drawnSquare;
  }
  drawSquare() {
    const randomSquare = Math.floor(Math.random() * this.squares.length);
    for (var i = 0; i < this.squares.length; ++i) {
      if (i === randomSquare) {
        this.drawnSquare = this.squares[i];
      }
    }
    return this.drawnSquare;
  }
}
export default Draw;

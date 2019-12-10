import "./static/sass/style.scss";
import Game from "./Game";

interface GameOptions {
  time: number; //in seconds
  lifes: number;
  squaresNumber: number;
}

const gameOptions: GameOptions = {
  time: 120,
  lifes: 3,
  squaresNumber: 25
};
const { time, lifes, squaresNumber } = gameOptions;

const start = new Game(time, lifes, squaresNumber);

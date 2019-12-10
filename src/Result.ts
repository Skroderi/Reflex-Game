class Result {
  constructor() {}
  static canPlay(lifes: number, time: number): boolean {
    if (lifes > 0 && time > 0) {
      return true;
    } else return false;
  }
}
export default Result;

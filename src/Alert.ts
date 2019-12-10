class Alert {
  constructor() {}
  static showAlert(message: string, type: string) {
    this.clearAlert();
    const alert = document.createElement("div");
    const board = document.querySelector(".board");
    const boardSquares = document.querySelector(".board__squares");
    alert.className = type;
    alert.textContent = message;
    board.insertBefore(alert, boardSquares);
  }

  static clearAlert() {
    const currentAlert = document.querySelector(".alert");
    if (currentAlert) {
      currentAlert.remove();
    }
  }
}

export default Alert;

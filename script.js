const cells = document.querySelectorAll(".cell");

const turnText = document.getElementById("turn");

const restartBtn = document.getElementById("restartBtn");

const modal = document.getElementById("modal");

const modalMessage = document.getElementById("modalMessage");

const newGameBtn = document.getElementById("newGameBtn");


let board = ["", "", "", "", "", "", "", "", ""];

let currentPlayer = "X";

let gameActive = true;


/*
   All possible winning combinations
*/

const winningCombinations = [

  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6]

];


/*
   Player clicks a cell
*/

function handleCellClick(event) {

  const cell = event.target;

  const index = Number(cell.dataset.index);


  // Don't allow moves after game is finished

  if (!gameActive) {
    return;
  }


  // Don't allow overwriting a cell

  if (board[index] !== "") {
    return;
  }


  // Store move

  board[index] = currentPlayer;


  // Display X or O

  cell.textContent = currentPlayer;


  cell.classList.add(
    currentPlayer.toLowerCase()
  );


  checkGame();

}


/*
   Check for winner or draw
*/

function checkGame() {

  let winningCombination = null;


  for (const combination of winningCombinations) {

    const a = combination[0];
    const b = combination[1];
    const c = combination[2];


    if (
      board[a] !== "" &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {

      winningCombination = combination;

      break;
    }

  }


  /*
     Winner found
  */

  if (winningCombination) {

    gameActive = false;


    // Highlight winning cells

    winningCombination.forEach(index => {

      cells[index].classList.add("winner");

    });


    // Show winner

    showWinner();

    return;
  }


  /*
     Draw
  */

  if (!board.includes("")) {

    gameActive = false;

    showDraw();

    return;
  }


  /*
     Switch player
  */

  currentPlayer =
    currentPlayer === "X" ? "O" : "X";


  turnText.textContent =
    `PLAYER ${currentPlayer}'S TURN`;

}


/*
   Display winning popup
*/

function showWinner() {

  modalMessage.textContent =
    `Player ${currentPlayer} wins!`;

  modal.classList.add("show");

}


/*
   Display draw popup
*/

function showDraw() {

  modalMessage.textContent =
    "It's a draw!";

  modal.classList.add("show");

}


/*
   Start a new game
*/

function newGame() {

  board = ["", "", "", "", "", "", "", "", ""];

  currentPlayer = "X";

  gameActive = true;


  // Clear board

  cells.forEach(cell => {

    cell.textContent = "";

    cell.classList.remove(
      "x",
      "o",
      "winner"
    );

  });


  // Reset turn

  turnText.textContent =
    "PLAYER X'S TURN";


  // Close modal

  modal.classList.remove("show");

}


/*
   Restart button
*/

restartBtn.addEventListener(
  "click",
  newGame
);


/*
   New Game button inside modal
*/

newGameBtn.addEventListener(
  "click",
  newGame
);


/*
   Cell click events
*/

cells.forEach(cell => {

  cell.addEventListener(
    "click",
    handleCellClick
  );

});

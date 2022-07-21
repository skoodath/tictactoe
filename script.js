let menubar = document.querySelector(".menubar");
let gameContainer = document.querySelector(".game--container");
let gameCell = document.querySelectorAll(".game--cell");
let strike = document.querySelector(".strike");
let gameResultContainer = document.getElementById("game-result");
let gameResultMessage = document.querySelector(".game--result_msg");
let gameRestart = document.querySelector(".game--restart");
let selectPlayer = document.querySelectorAll("input[name='player']");
let nextPlayer = document.getElementById("current-player");
nextPlayer.innerHTML = "Next Player: ";

let playedArray = Array(gameCell.length);
playedArray.fill("")
let playerX = "X";
let playerO = "O";
let playerTurn = playerX;
let gameStatus = false;
let winningCombinations = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]
/* Select a player to start the game */

const choosePlayer = (event) => {
  let selectedPlayer = event.target.value;
  if(event.target.checked) {
    nextPlayer.innerHTML = `Next player: ${selectedPlayer}`;
    playerTurn = selectPlayer;
  }
}

selectPlayer.forEach(player => {
  player.addEventListener("click", choosePlayer);
})

const startGame = () => {
  gameStatus = true;
  playerTurn = playerX;
  gameResultContainer.classList.remove("visible");
  gameResultContainer.classList.add("hidden");
  menubar.style.visibility = "visible";
  nextPlayer.innerHTML = "Next Player: ";
  playedArray.fill("");
  let { length } = gameCell;
  for (let i = 0; i < length; i++){
    gameCell[i].textContent = "";
  }
}

gameRestart.addEventListener("click", startGame);

/* Game over function displays results*/

const gameOver = (winner) => {
  let textContent = "It's a draw";
  if(winner !== '') {
    textContent = `The winner is "${winner}"`;
  }
  playedArray.fill("");
  gameResultMessage.innerHTML = textContent;
  gameResultContainer.classList.remove("hidden");
  gameResultContainer.classList.add("visible");
  nextPlayer.innerHTML = "Game Over!";
  gameStatus = false;
}

/* this function makes a decision on the game */

const decisionMaker = () => {
  for (let winningCombination of winningCombinations){

    const cellValue1 = playedArray[winningCombination[0]]
    const cellValue2 = playedArray[winningCombination[1]]
    const cellValue3 = playedArray[winningCombination[2]]
    if(cellValue1 !== "" && cellValue1 === cellValue2 && cellValue1 === cellValue3){
      gameOver(cellValue1);
      return;
    }
  }
  const AllTilesFilled = playedArray.every(cell => cell !== "");
  if(AllTilesFilled) {
    gameOver("")
  }

}

/* User interactions to play the game */

const playGame = (event) => {
  const cell = event.target;
  const cellValue = cell.dataset.value;
  menubar.style.visibility = "hidden";
  if(gameResultContainer.classList.contains("visible")){
    return;
  }
  if(cell.textContent !== ""){
    return;
  }
  if(playerTurn === playerX) {
    cell.textContent = playerX;
    playedArray[cellValue] = playerX;
    playerTurn = playerO;
    nextPlayer.innerHTML = `Next player: ${playerTurn}`;
  } else {
    cell.textContent = playerO;
    playedArray[cellValue] = playerO;
    playerTurn = playerX;
    nextPlayer.innerHTML = `Next player: ${playerTurn}`;
  }
  
  decisionMaker();
}

gameContainer.addEventListener('click', playGame);
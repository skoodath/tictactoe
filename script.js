let gameContainer = document.querySelector(".game--container");
let start = document.querySelector("[data-button='start']");
let playedArray = [];
let playerX = "X";
let playerO = "O";
let playerXState = [];
let playerOState = [];
let currentPlayer = "";
let gameStatus = false;
let winningCombination = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

const startGame = () => {
  gameStatus = true;
  currentPlayer = playerX;
  console.log("Game Reset!")
  let gameCell = document.querySelectorAll(".game--cell");
  let { length } = gameCell;
  for (let i = 0; i < length; i++){
    gameCell[i].textContent = "";
  }
}

const playGame = (event) => {

  currentPlayer = currentPlayer === playerX ? playerO: playerX;
  
  if(event.target.textContent === "" && currentPlayer === playerX) {
    event.target.textContent = currentPlayer;
    playerXState.push(event.target.dataset.value)
  } else if(event.target.textContent === "" && currentPlayer === playerO){
    event.target.textContent = currentPlayer;
    playerOState.push(event.target.dataset.value);
  }
    console.log(playerXState);
    console.log(playerOState);
}
    
    gameContainer.addEventListener('click', playGame)
    start.addEventListener("click", startGame);
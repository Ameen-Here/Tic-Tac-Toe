const Player = (sign) => {
  this.sign = sign;
  const getSign = () => {
    return sign;
  };

  return { getSign };
};

const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const getField = (index) => {
    return board[index];
  };

  const setField = (index, sign) => {
    board[index] = sign;
  };

  const reset = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  };

  return { setField, getField, reset };
})();

const displayController = (() => {
  const msgElement = document.getElementById("instructions");
  const board = document.querySelector(".game-board");
  const resetBtn = document.getElementById("reset");

  // Dynamically Adding 9 boxes to the gameboard
  for (let i = 0; i < 9; i++) {
    const html = `     
      <div id="${i}" class="game-pieces"></div>
        `;
    board.insertAdjacentHTML("beforeend", html);
  }

  // Listening to button calls

  const gamePieces = document.querySelectorAll(".game-pieces");
  gamePieces.forEach((piece) => {
    piece.addEventListener("click", (e) => {
      // Checking if the game is over or the button is already populated
      if (gameController.getIsOver() || e.target.textContent !== "") return;
      gameController.playGame(parseInt(e.target.id));
      updateGameBoard();
    });
  });

  resetBtn.addEventListener("click", () => {
    gameBoard.reset();
    gameController.reset();
    updateGameBoard();
    setMsgElement("Player X's turn!");
  });

  const updateGameBoard = () => {
    for (let i = 0; i < gamePieces.length; i++) {
      gamePieces[i].textContent = gameBoard.getField(i);
    }
  };

  const setMsgElement = (msg) => {
    msgElement.textContent = msg;
  };

  const setResult = (result) => {
    if (result === "draw") {
      setMsgElement("It's a draw!");
    } else {
      setMsgElement(`Player ${result} has won`);
    }
  };

  return { setResult, setMsgElement };
})();

const gameController = (() => {
  const playerX = Player("X");
  const playerO = Player("O");
  let round = 1;
  let isOver = false;

  const playGame = (index) => {
    gameBoard.setField(index, getCurrentPlayerSign());
    if (isWin(index)) {
      displayController.setResult(getCurrentPlayerSign());
      isOver = true;
      return;
    }
    if (round === 9) {
      displayController.setResult("draw");
      isOver = true;
      return;
    }
    round++;
    displayController.setMsgElement(`Player ${getCurrentPlayerSign()}'s turn!`);
  };

  const getCurrentPlayerSign = () => {
    return round % 2 === 0 ? playerO.getSign() : playerX.getSign();
  };

  const isWin = (index) => {
    const winPossibility = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    // Returns true if any of this possible outcome happened
    return winPossibility
      .filter((everyComb) => everyComb.includes(index))
      .some((possibleComb) =>
        possibleComb.every(
          (ind) => gameBoard.getField(ind) === getCurrentPlayerSign()
        )
      );
  };

  const getIsOver = () => {
    return isOver;
  };

  const reset = () => {
    isOver = false;
    round = 1;
  };
  return { playGame, getIsOver, reset };
})();

// Dynamic footer
(() => {
  const footerYear = document.getElementById("year");
  const dt = new Date();
  const curYear = dt.getFullYear();
  footerYear.textContent = curYear;
})();

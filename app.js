const gameBoard = document.querySelector(".game-board");

for (let i = 0; i < 9; i++) {
  const html = `     
  <div id="game-piece-${i + 1}" class="game-pieces">
  </div>
    `;
  gameBoard.insertAdjacentHTML("beforeend", html);
}

const gamePieces = document.querySelectorAll(".game-pieces");

console.log(gamePieces);

gamePieces.forEach((piece) => {
  piece.addEventListener("click", (e) => {
    console.log(e.target.id);
  });
});

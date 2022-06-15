
import React, { useState, useEffect } from "react";
import Square from "./Square";
import EndGame from "./EndGame";

const INITIAL = "";
const X_PLAYER = "X";
const O_PLAYER = "O";

const winCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function TicTacToe() {
  const [grid, setGrid] = useState(Array(9).fill(INITIAL));
  const [player, setPlayer] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [draw, setDraw] = useState(false);
  const [winCount, setwinCount] = useState({ X: 0, O: 0, Empate: 0});

  function isGameOver() {
    if (!gameFinished) {
      //* X win check
      for (let i = 0; i < 8; i++){
        if (grid[winCombination[i][0]] === X_PLAYER &&
          grid[winCombination[i][1]] === X_PLAYER &&
          grid[winCombination[i][2]] === X_PLAYER) 
          {
            setGameFinished(true);
            setwinCount({ ...winCount, X: winCount.X + 1 });
            return;
          }
      }

      //* O win check
      for (let i = 0; i < 8; i++){
        if (grid[winCombination[i][0]] === O_PLAYER &&
          grid[winCombination[i][1]] === O_PLAYER &&
          grid[winCombination[i][2]] === O_PLAYER)
          {
            setGameFinished(true);
            setwinCount({ ...winCount, O: winCount.O + 1 });
            return;
          }
      }

      //* Draw game check
      if (!grid.includes(INITIAL)){
        setDraw(true);
        setGameFinished(true);
        setwinCount({ ...winCount, Empate: winCount.Empate + 1});
      }
    }
  }

  function restartGame() {
    setGrid(Array(9).fill(INITIAL));
    setGameFinished(false);
    setDraw(false);
  }

  function clearHistory() {
    setwinCount({ X: 0, O: 0, Empate: 0 });
    restartGame();
  }

  isGameOver();

  function handleClick(id) {
    setGrid(
      grid.map((item, index) => {
        if (index === id) {
          if (player) {
            return X_PLAYER;
          }else{
            return O_PLAYER;
          }
        } else {
          return item;
        }
      })
    );
    setPlayer(!player);
  }

  return (
    <div>
      <div className="win-history">
        <h2>Contador de Vitórias</h2>
        <p>X : {winCount.X}</p>
        <p>O : {winCount.O}</p>
        <p>Empate : {winCount.Empate}</p>
      </div>
      {gameFinished && (
        <EndGame
          winCount={winCount}
          restartGame={restartGame}
          player={player}
          draw={draw}
          clearHistory={clearHistory}
        />
      )}
      <Square clickedArray={grid} handleClick={handleClick} />
    </div>
  );
}

export default TicTacToe;
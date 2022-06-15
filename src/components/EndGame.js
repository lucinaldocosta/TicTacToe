import React from "react";

function EndGame({ clearHistory, winCount, restartGame, player, draw }) {
  return (
    <div className="end-game-screen">
      {!draw && <span className="win-text">{player ? "O GANHOU" : "X GANHOU"}</span>}
      {draw && <span className="win-text">EMPATE</span>}

      <div className="win-history">
        <h2>Contador de Vitórias</h2>
        <p>X : {winCount.X}</p>
        <p>O : {winCount.O}</p>
        <p>Empate : {winCount.Empate}</p>
      </div>

      <button className="btn" onClick={restartGame}>REINICIAR</button>
      <button className="btn" onClick={clearHistory}>LIMPAR HISTORIAL</button>
    </div>
  );
}

export default EndGame;
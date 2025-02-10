import { useState } from "react";
import Gameboard from "./components/Gameboard";
import Player from "./components/Player";
import Log from "./components/Log";

function deriveActivePlayer(turns) {
  let currentPlayer = "X";

  if(turns.length > 0 && turns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function App() {

  const [turns, setTurns] = useState([]);

  const activePlayer = deriveActivePlayer(turns);

  function handleSelectSquare(rowIndex, columnIndex) {
    setTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, column: columnIndex }, player: currentPlayer },
        ...prevTurns
      ];

      return updatedTurns;
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activePlayer === "X"} />
          <Player name="Player 2" symbol="O" isActive={activePlayer === "O"} />
        </ol>
        <Gameboard
          onSelectSquare={handleSelectSquare}
          turns={turns} />
      </div>
      <Log turns={turns} />
    </main>
  )
}

export default App

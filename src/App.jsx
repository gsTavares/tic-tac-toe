import { useState } from "react";
import Gameboard from "./components/Gameboard";
import Player from "./components/Player";

function App() {

  const [turns, setTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState("X");

  function handleSelectSquare(rowIndex, columnIndex) {
    setActivePlayer((currentActivePlayer) => {
      return currentActivePlayer === "X" ? "O" : "X";
    });
    setTurns((prevTurns) => {
      let currentPlayer = "X";

      if (prevTurns.length > 0 && prevTurns[0].player === "X") {
        currentPlayer = "O";
      }

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
    </main>
  )
}

export default App

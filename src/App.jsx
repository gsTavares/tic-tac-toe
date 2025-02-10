import { useState } from "react"
import Gameboard from "./components/Gameboard"
import Player from "./components/Player"

function App() {

  const [activePlayer, setActivePlayer] = useState("X");

  function handleSelectSquare() {
    setActivePlayer((currentActivePlayer) => {
      return currentActivePlayer === "X" ? "O" : "X";
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activePlayer === "X"} />
          <Player name="Player 2" symbol="O" isActive={activePlayer === "O"} />
        </ol>
        <Gameboard onSelectSquare={handleSelectSquare} player={activePlayer} />
      </div>
    </main>
  )
}

export default App

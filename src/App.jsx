import { useState } from "react";
import Gameboard from "./components/Gameboard";
import Log from "./components/Log";
import Player from "./components/Player";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const initialGameboard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

function deriveActivePlayer(turns) {
  let currentPlayer = "X";

  if (turns.length > 0 && turns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function App() {

  const [turns, setTurns] = useState([]);

  const activePlayer = deriveActivePlayer(turns);

  let gameboard = initialGameboard;

  for (const turn of turns) {
    const { square, player } = turn;
    const { row, column } = square;

    gameboard[row][column] = player;
  }

  let winner = undefined;

  for (const combination of WINNING_COMBINATIONS) {
    const first = gameboard[combination[0].row][combination[0].column];
    const second = gameboard[combination[1].row][combination[1].column];;
    const third = gameboard[combination[2].row][combination[2].column];;

    if(first && first === second && first === third) {
      winner = first;
    }
  }

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
        {winner && <p>You won, {winner}</p>}
        <Gameboard
          onSelectSquare={handleSelectSquare}
          board={gameboard} />
      </div>
      <Log turns={turns} />
    </main>
  )
}

export default App

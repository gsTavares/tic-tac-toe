import { useState } from "react";
import Gameboard from "./components/Gameboard";
import GameOver from "./components/GameOver";
import Log from "./components/Log";
import Player from "./components/Player";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2"
}

const INITIAL_GAMEBOARD = [
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

function deriveGameboard(turns) {
  let gameboard = [...INITIAL_GAMEBOARD.map(columns => [...columns])];

  for (const turn of turns) {
    const { square, player } = turn;
    const { row, column } = square;

    gameboard[row][column] = player;
  }

  return gameboard;
}

function deriveWinner(gameboard, players) {
  let winner = undefined;

  for (const combination of WINNING_COMBINATIONS) {
    const first = gameboard[combination[0].row][combination[0].column];
    const second = gameboard[combination[1].row][combination[1].column];;
    const third = gameboard[combination[2].row][combination[2].column];;

    if(first && first === second && first === third) {
      winner = players[first];
    }
  }

  return winner;
}

function App() {

  const [turns, setTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS)

  const activePlayer = deriveActivePlayer(turns);
  const gameboard = deriveGameboard(turns); 
  const winner = deriveWinner(gameboard, players);

  const hasDraw = turns.length === 9 && !winner;

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

  function handleRematch() {
    setTurns([]);
  }

  function handlePlayername(symbol, newName) {
    setPlayers((prevNames) => ({
      ...prevNames,
      [symbol]: newName
    }))
  } 

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name={PLAYERS.X} symbol="X" isActive={activePlayer === "X"} onChangeName={handlePlayername} />
          <Player name={PLAYERS.O} symbol="O" isActive={activePlayer === "O"} onChangeName={handlePlayername} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRematch} />}
        <Gameboard
          onSelectSquare={handleSelectSquare}
          board={gameboard} />
      </div>
      <Log turns={turns} />
    </main>
  )
}

export default App

import { useState } from "react"

const initialGameboard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
]

export default function Gameboard({ onSelectSquare, player }) {

    const [gameboard, setGameboard] = useState(initialGameboard);

    function handleGameboard({ rowIndex, columnIndex }) {
        setGameboard((currentGameboard) => {
            const newGameBoard = [...currentGameboard.map(columns => [...columns])];
            newGameBoard[rowIndex][columnIndex] = player;
            return newGameBoard;
        });
        onSelectSquare();
    }

    return(
        <ol id="game-board">
            {gameboard.map((row, rowIndex) => 
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, columnIndex) => 
                            <li key={columnIndex}>
                                <button onClick={() => handleGameboard({ rowIndex, columnIndex })}>{playerSymbol}</button>
                            </li>
                        )}
                    </ol>
                </li>
            )}
        </ol>
    )
}
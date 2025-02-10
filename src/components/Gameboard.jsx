const initialGameboard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
]

export default function Gameboard({ onSelectSquare, turns }) {

    let gameboard = initialGameboard;

    for(const turn of turns) {
        const { square, player } = turn;
        const { row, column } = square;

        gameboard[row][column] = player;
    }

    return(
        <ol id="game-board">
            {gameboard.map((row, rowIndex) => 
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, columnIndex) => 
                            <li key={columnIndex}>
                                <button onClick={() => onSelectSquare(rowIndex, columnIndex)}>{playerSymbol}</button>
                            </li>
                        )}
                    </ol>
                </li>
            )}
        </ol>
    )
}
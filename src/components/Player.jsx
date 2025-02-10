import { useState } from "react"

export default function Player({ name, symbol, isActive }) {

    const [isEditing, setIsEditing] = useState(false);
    const [playername, setPlayername] = useState(name);

    function handleEditPlayer() {
        /**
         * If you need to update a state based on the previous one, you should do like this:
         * 
         * The explanation for this sintax is that React, by default, schedules state changes. 
         * This means them will not happen instantly, and this behavior can cause some bugs
         * in the UI. To prevent this, we change the state using a function, and this way is 
         * guaranteed that we can use new state value in the next lines.
         * 
         */
        setIsEditing((editting) => !editting);
    }

    function handlePlayernameChange(event) {
        const value = event.target.value;
        setPlayername(value);
    }

    let playerContent = <span className="player-name">{playername}</span>;

    if (isEditing) {
        playerContent = <input
            type="text" onChange={handlePlayernameChange}
            required
            value={playername}
            name="playername"
        />
    }

    return (
        <li className={isActive ? "active" : undefined}>
            <span className="player">
                {playerContent}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditPlayer}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    )
}
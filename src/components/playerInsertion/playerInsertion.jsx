import "./playerInsertion.css"
export function PlayerInsertion(props) {
    const { playerGuess } = props;

    return (
        <div className="insert-container">
            <div>{playerGuess[0] ? playerGuess[0] : ''} </div>
            <div>{playerGuess[1] ? playerGuess[1] : ''}</div>
            <div>{playerGuess[2] ? playerGuess[2] : ''} </div>
            <div>{playerGuess[3] ? playerGuess[3] : ''} </div>
            <div>{playerGuess[4] ? playerGuess[4] : ''} </div>
        </div>
    )
}
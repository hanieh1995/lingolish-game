import "./guess.css"
export function Guess(props) {

    if (props.guess.current === "player") {

    }


    return (
        <div className="guess-container">
            {props.guess.current === "player" ? <i className="fa fa-caret-right"></i> : ""}
            <div className={`${props.correctPlayerGuess[0] === props.guess.guess[0] && props.guess.guess[0] && props.guess.current === "player" ? "correct" : ""} ${props.includePlayerGuess[0] && props.guess.guess.includes(props.includePlayerGuess[0]) && !props.correctPlayerGuess.includes(props.includePlayerGuess[0]) && props.guess.guess[0] && props.guess.current === "player" ? "include" : ""}`} >{props.guess.guess[0]}</div>
            <div className={`${props.correctPlayerGuess[1] === props.guess.guess[1] && props.guess.guess[1] && props.guess.current === "player" ? "correct" : ""} ${props.includePlayerGuess[1] && props.guess.guess.includes(props.includePlayerGuess[1]) && !props.correctPlayerGuess.includes(props.includePlayerGuess[1]) && props.guess.guess[1] && props.guess.current === "player" ? "include" : ""}`} >{props.guess.guess[1]}</div>
            <div className={`${props.correctPlayerGuess[2] === props.guess.guess[2] && props.guess.guess[2] && props.guess.current === "player" ? "correct" : ""} ${props.includePlayerGuess[2] && props.guess.guess.includes(props.includePlayerGuess[2]) && !props.correctPlayerGuess.includes(props.includePlayerGuess[2]) && props.guess.guess[2] && props.guess.current === "player" ? "include" : ""}`} >{props.guess.guess[2]}</div>
            <div className={`${props.correctPlayerGuess[3] === props.guess.guess[3] && props.guess.guess[3] && props.guess.current === "player" ? "correct" : ""} ${props.includePlayerGuess[3] && props.guess.guess.includes(props.includePlayerGuess[3]) && !props.correctPlayerGuess.includes(props.includePlayerGuess[3]) && props.guess.guess[3] && props.guess.current === "player" ? "include" : ""}`} >{props.guess.guess[3]}</div>
            <div className={`${props.correctPlayerGuess[4] === props.guess.guess[4] && props.guess.guess[4] && props.guess.current === "player" ? "correct" : ""} ${props.includePlayerGuess[4] && props.guess.guess.includes(props.includePlayerGuess[4]) && !props.correctPlayerGuess.includes(props.includePlayerGuess[4]) && props.guess.guess[4] && props.guess.current === "player" ? "include" : ""}`} >{props.guess.guess[4]}</div>
            {props.guess.current === "bot" ? <i className="fa fa-caret-left"></i> : ""}
        </div>
    )
}
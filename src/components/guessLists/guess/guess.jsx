import "./guess.css"
export function Guess(props) {

    return (
        <div className="guess-container">
            <div>{props.guess[0]}</div>
            <div>{props.guess[1]}</div>
            <div>{props.guess[2]}</div>
            <div>{props.guess[3]}</div>
            <div>{props.guess[4]}</div>
        </div>
    )
}
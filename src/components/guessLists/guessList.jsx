import "./guessList.css";
import { Guess } from "./guess/guess";
export function GuessList(props) {

    return (
        <div className="container">
            {props.list.map((guess, i) =>
                <Guess key={i} guess={guess}
                    correctPlayerGuess={props.correctPlayerGuess}
                    includePlayerGuess={props.includePlayerGuess}
                />
            )}
        </div>
    )
}
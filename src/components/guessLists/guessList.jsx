import "./guessList.css";
import { Guess } from "./guess/guess";
export function GuessList(props) {

    // const listArray = props.list.map(e => Array.from(e))
    return (
        <div className="container">
      
            {props.list.map((guess, i) =>
                <Guess key={i} guess={guess} />
            )}

        </div>
    )
}
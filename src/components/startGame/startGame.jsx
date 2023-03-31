import "./startGame.css";
export function StartGame(props) {
    const { modeHandle } = props;
    return (
        <div className="main">
            <div>Select Mode</div>
            <div className="modes">
                <div className="easy" onClick={modeHandle}>Noob</div>
                <div className="normal" onClick={modeHandle}>Clever</div>
                <div className="hard" onClick={modeHandle}>Professor</div>
            </div>
        </div>
    )
}
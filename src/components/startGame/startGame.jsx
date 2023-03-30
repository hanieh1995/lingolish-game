import "./startGame.css";
export function StartGame(props) {
    const { modeHandle } = props;
    return (
        <div className="main">
            <div>Select Mode</div>
            <div className="modes">
                <div className="easy" onClick={modeHandle}>Easy</div>
                <div className="normal" onClick={modeHandle}>Normal</div>
                <div className="hard" onClick={modeHandle}>Hard</div>
            </div>
        </div>
    )
}
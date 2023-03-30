import "./virtualKeyboard.css"
export function VirtualKeyboard(props) {
    const { clickHandler, deleteHandler } = props;
    return(
        <div className="virtual-keyboard">
            <div className="row">
                <input type="button" value="Q" onClick={clickHandler} />
                <input type="button" value="W" onClick={clickHandler} />
                <input type="button" value="E" onClick={clickHandler} />
                <input type="button" value="R" onClick={clickHandler} />
                <input type="button" value="T" onClick={clickHandler} />
                <input type="button" value="Y" onClick={clickHandler} />
                <input type="button" value="U" onClick={clickHandler} />
                <input type="button" value="I" onClick={clickHandler} />
                <input type="button" value="O" onClick={clickHandler} />
                <input type="button" value="P" onClick={clickHandler} />
            </div>
            <div className="row">
                <input type="button" value="A" onClick={clickHandler} />
                <input type="button" value="S" onClick={clickHandler} />
                <input type="button" value="D" onClick={clickHandler} />
                <input type="button" value="F" onClick={clickHandler} />
                <input type="button" value="G" onClick={clickHandler} />
                <input type="button" value="H" onClick={clickHandler} />
                <input type="button" value="J" onClick={clickHandler} />
                <input type="button" value="K" onClick={clickHandler} />
                <input type="button" value="L" onClick={clickHandler} />
            </div>
            <div className="row">
                <input type="button" value="Z" onClick={clickHandler} />
                <input type="button" value="X" onClick={clickHandler} />
                <input type="button" value="C" onClick={clickHandler} />
                <input type="button" value="V" onClick={clickHandler} />
                <input type="button" value="B" onClick={clickHandler} />
                <input type="button" value="N" onClick={clickHandler} />
                <input type="button" value="M" onClick={clickHandler} />
                <input type="button" value="DELETE" onClick={deleteHandler} />
            </div>
        </div>
    )
}
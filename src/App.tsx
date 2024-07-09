import words from "./assets/data/wordList";
import "./App.css";
import InputRow from "./InputRow";
import { useState, useEffect } from "react";
import { FaUndoAlt } from "react-icons/fa";
import KeyBoard from "./KeyBoard";

function App() {
  const [chosenWord, setChosenWord] = useState("");
  const [tryCount, setTryCount] = useState(0);
  const [limit, setLimit] = useState(5);
  const [gameStatus, setGameStatus] = useState({ 'gameOver': false, 'wordGuessed': false });
  const [rows, setRows] = useState<JSX.Element[] | null>(null);
  const defaultKeyColors = {
    a: 3, b: 3, c: 3, d: 3, e: 3, f: 3, g: 3, h: 3, i: 3, j: 3,
    k: 3, l: 3, m: 3, n: 3, o: 3, p: 3, q: 3, r: 3, s: 3, t: 3,
    u: 3, v: 3, w: 3, x: 3, y: 3, z: 3
  }
  const [keyColors, setKeyColors] = useState<Record<string, number>>(defaultKeyColors);

  const startGame = () => {
    const newChosenWord = words[Math.floor(Math.random() * words.length)];
    setChosenWord(newChosenWord);
    setTryCount(0);
    setLimit(5);
    setGameStatus({ 'gameOver': false, 'wordGuessed': false });
    let newRows = getRows(5, newChosenWord);
    setRows(newRows)
    setKeyColors(defaultKeyColors)
    console.log(limit, keyColors)
  };

  const getRows = (limit: number, chosenWord: string): JSX.Element[] => {
    return [...Array(limit)].map((_, rowIndex) => (
      <InputRow
        chosenWord={chosenWord}
        limit={limit}
        rowIndex={rowIndex}
        tryCount={tryCount}
        setTryCount={setTryCount}
        gameStatus={gameStatus}
        setGameStatus={setGameStatus}
        key={chosenWord + '-' + rowIndex}
        keyColors={keyColors}
        setKeyColors={setKeyColors}
      />
    ));
  };

  useEffect(() => {
    startGame();
  }, []);

  return (
    <>
      <div className="container">
        <div style={{ "display": "flex" }}>
          <div>
            {rows}
          </div>
          <div className="reset-icon-div">
            <FaUndoAlt size={20} className="reset-icon" title="Reset" onClick={() => startGame()} />
          </div>
        </div>
        <KeyBoard keyColors={keyColors} />
        {gameStatus.gameOver && (
          <div className="message-box">
            <div>
              {gameStatus.wordGuessed
                ? "Well Done !"
                : "The Answer is : " + chosenWord.toUpperCase()}
            </div>
            <div>
              <button onClick={() => startGame()}> Try Again ? </button>
            </div>
          </div>
        )}
      </div>

    </>
  );
}

export default App;

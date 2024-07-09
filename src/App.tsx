import words from "./assets/data/wordList";
import "./App.css";
import InputRow from "./InputRow";
import { useState, useEffect } from "react";
import { FaUndoAlt } from "react-icons/fa";

function App() {
  const [chosenWord, setChosenWord] = useState("");
  const [tryCount, setTryCount] = useState(0);
  const [limit, setLimit] = useState(5);
  const [gameStatus, setGameStatus] = useState({ 'gameOver': false, 'wordGuessed': false });
  const [rows, setRows] = useState<JSX.Element[] | null>(null);

  const startGame = () => {
    const newChosenWord = words[Math.floor(Math.random() * words.length)];
    setChosenWord(newChosenWord);
    setTryCount(0);
    setLimit(5);
    setGameStatus({ 'gameOver': false, 'wordGuessed': false });
    let newRows = getRows(5, newChosenWord);
    setRows(newRows)
    console.log(limit)
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
      />
    ));
  };

  useEffect(() => {
    startGame();
  }, []);

  return (
    <>
      <div style={{ "display": "flex" }}>
        <div>
          {rows}
        </div>
        <div className="reset-icon-div">
          <FaUndoAlt  size={20} className="reset-icon" title="Reset" onClick={startGame} />
        </div>
      </div>
      {gameStatus.gameOver && (
        <div className="message-box">
          <div>
            {gameStatus.wordGuessed
              ? "Well Done !"
              : "The Answer is : " + chosenWord.toUpperCase()}
          </div>
          <div>
            <button onClick={startGame}> Try Again ? </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;

import words from "./assets/data/wordList";
import "./App.css";
import InputRow from "./InputRow";
import { useState, useEffect } from "react";
import { RxReset, RxQuestionMark } from "react-icons/rx";
import KeyBoard from "./KeyBoard";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

const defaultKeyColors = {
  a: 3, b: 3, c: 3, d: 3, e: 3, f: 3, g: 3, h: 3, i: 3, j: 3,
  k: 3, l: 3, m: 3, n: 3, o: 3, p: 3, q: 3, r: 3, s: 3, t: 3,
  u: 3, v: 3, w: 3, x: 3, y: 3, z: 3
};


function App() {
  const limit = 5;
  const [chosenWord, setChosenWord] = useState("");
  const [tryCount, setTryCount] = useState(0);
  const [gameStatus, setGameStatus] = useState({ 'gameOver': false, 'wordGuessed': false });
  const [keyColors, setKeyColors] = useState<Record<string, number>>({ ...defaultKeyColors });
  const [rows, setRows] = useState<JSX.Element[] | null>(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { width, height } = useWindowSize()


  const startGame = () => {
    const newChosenWord = words[Math.floor(Math.random() * words.length)];
    setChosenWord(newChosenWord);
    setTryCount(0);
    setGameStatus({ 'gameOver': false, 'wordGuessed': false });
    setKeyColors({
      a: 3, b: 3, c: 3, d: 3, e: 3, f: 3, g: 3, h: 3, i: 3, j: 3,
      k: 3, l: 3, m: 3, n: 3, o: 3, p: 3, q: 3, r: 3, s: 3, t: 3,
      u: 3, v: 3, w: 3, x: 3, y: 3, z: 3
    });
    setRows(getRows(limit, newChosenWord));
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
    console.log(defaultKeyColors, keyColors, limit)
  }, []);

  return (
    <>
      <div className="container">
        <div className="title">
          WORDLE
        </div>
        <div className="rows-container">
          <div>
            {rows}
          </div>
          <div className="reset-icon-div">
            <RxQuestionMark size={20} className="reset-icon" title="Hint" style={{ backgroundColor: "indianred" }} onClick={handleShow} />
            <RxReset size={20} className="reset-icon" title="Reset" onClick={startGame} />
            {/* <RxReset size={20} className="reset-icon" title="Reset" onClick={()=> location.reload()}/> */}
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
              {/* <Button onClick={startGame} className="try-again-btn"> Try Again ? </Button> */}
              <Button onClick={()=> location.reload()} className="try-again-btn"> Try Again ? </Button>
            </div>
          </div>
        )}
        {gameStatus.wordGuessed && <Confetti
          width={width}
          height={height} />
        }
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>How To Play</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Guess the Wordle in 5 tries.</h5>
          <ul>
            <li>Each guess must be a valid 5-letter word.</li>
            <li>The color of the tiles will change to show how close your guess was to the word.</li>
            <li><div className="char-box" style={{ backgroundColor: "darkseagreen" }}>A</div>A is in the word and in the correct spot.</li>
            <li><div className="char-box" style={{ backgroundColor: "sandybrown" }}>B</div>B is in the word but in the wrong spot.</li>
            <li><div className="char-box" style={{ backgroundColor: "silver" }}>C</div>C is not in the word in any spot.</li>
          </ul>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;

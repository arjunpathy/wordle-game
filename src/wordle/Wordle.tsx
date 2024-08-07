import { useEffect, useState } from "react";
import words from "../assets/data/wordList";
import RowComponent from "./RowComponent";
import "./Wordle.css";
import { Button } from 'react-bootstrap';
import { RxReset, RxQuestionMark } from "react-icons/rx";
import 'bootstrap/dist/css/bootstrap.min.css';

import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import KeyBoard from "../KeyBoard";
import InstructionsModal from "../InstructionsModal";
import ToastComponent from "./ToastComponent";

const defaultKeyColors = {
  a: 3, b: 3, c: 3, d: 3, e: 3, f: 3, g: 3, h: 3, i: 3, j: 3,
  k: 3, l: 3, m: 3, n: 3, o: 3, p: 3, q: 3, r: 3, s: 3, t: 3,
  u: 3, v: 3, w: 3, x: 3, y: 3, z: 3
};



const Wordle = () => {
  const guessLimit = 6;

  const [chosenWord, setChosenWord] = useState("");
  const [tryCount, setTryCount] = useState(0);
  const [guessedAnswer, setGuessedAnswer] = useState("");
  const [guessColorArray, setGuessColorArray] = useState<number[][]>([]);

  const [values, setValues] = useState<string[][]>(
    Array.from(Array(guessLimit), () => Array(5).fill(""))
  );
  const { width, height } = useWindowSize()

  const [show, setShow] = useState(false);
  const [toastShow, setToastShow] = useState(false);


  const [gameStatus, setGameStatus] = useState({ 'gameOver': false, 'wordGuessed': false });
  const [keyColors, setKeyColors] = useState<Record<string, number>>({ ...defaultKeyColors });



  const startGame = () => {
    const newChosenWord = words[Math.floor(Math.random() * words.length)];
    console.log("Answer : ", newChosenWord);
    setChosenWord(newChosenWord);

    setTryCount(0);
    setGuessedAnswer("");
    setGuessColorArray([]);
    setGameStatus({ 'gameOver': false, 'wordGuessed': false });
    setValues(Array.from(Array(guessLimit), () => Array(5).fill("")));
    setKeyColors({ ...defaultKeyColors })
  };


  useEffect(() => {
    startGame();
  }, []);

  useEffect(() => {
    let ele = document.getElementById(`${tryCount}:0`) as HTMLInputElement | null;
    ele?.focus();
  }, [tryCount]);

  useEffect(() => {
    if (toastShow) {
      const timer = setTimeout(() => {
        setToastShow(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [toastShow])

  useEffect(() => {
    if (chosenWord) {
      let status = { 'gameOver': (tryCount === guessLimit || chosenWord === guessedAnswer), 'wordGuessed': chosenWord === guessedAnswer }
      setGameStatus(status)
    }
  }, [tryCount, guessedAnswer, chosenWord]);


  const validateAnswer = (word: string) => {
    if (word.length === 5) {
      console.log(chosenWord, word, tryCount);
      if (words.includes(word)) {
        setGuessedAnswer(word);
        let entryArr: number[] = [];
        const keys = { ...keyColors };

        [...word].forEach((char, index) => {

          // char present at right index
          if (char === chosenWord[index]) {
            entryArr.push(1);
            keys[char] = 1;

          }
          // char present at different index
          else if (chosenWord.includes(char)) {
            entryArr.push(2);
            keys[char] = keys[char] === 1 ? 1 : 2;

          }
          // char not present
          else {
            entryArr.push(0);
            keys[char] = 0;

          }
        });
        setGuessColorArray((prev) => [...prev, entryArr]);
        setKeyColors(keys)

        setTryCount((prev) => {
          return prev + 1;
        });
      } else {
        console.log("Not a word", word);
        setToastShow(true)
      }
    }
  };

  return (
    <>
      <div className="container">

        <div className="title">
          WORDLE
        </div>
        <div className="rows-container">
          <div>
            {
              Array.from(Array(guessLimit).keys()).map((_row, index) => (
                <RowComponent
                  key={index}
                  index={index}
                  tryCount={tryCount}
                  validateAnswer={validateAnswer}
                  isDisabled={index !== tryCount || gameStatus.gameOver}
                  guessColorArray={guessColorArray}
                  gameOver={gameStatus.gameOver}
                  values={values}
                  setValues={setValues}
                />
              ))
            }
          </div>
          <div className="reset-icon-div">
            <RxQuestionMark size={20} className="reset-icon" title="Hint" style={{ backgroundColor: "indianred" }} onClick={() => setShow(true)} />
            <RxReset size={20} className="reset-icon" title="Reset" onClick={startGame} />
          </div>
        </div>
        <ToastComponent toastShow={toastShow} setToastShow={setToastShow} />

        < KeyBoard keyColors={keyColors} />
        < InstructionsModal show={show} setShow={setShow} />
        {gameStatus.gameOver && (
          <div className="message-box">
            <div>
              {gameStatus.wordGuessed
                ? "Well Done !"
                : "The Answer is : " + chosenWord.toUpperCase()}
            </div>
            <div>
              <Button onClick={startGame} className="try-again-btn"> Try Again ? </Button>
            </div>
          </div>
        )}
        {gameStatus.wordGuessed && <Confetti
          width={width}
          height={height} />
        }
      </div>
    </>
  );
};

export default Wordle;
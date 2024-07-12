import { useState, useEffect } from "react";
import InputBox from "./InputBox";
import words from "./assets/data/wordList";

interface GameStatus {
  gameOver: boolean;
  wordGuessed: boolean;
}


interface InputRowProps {
  limit: number;
  chosenWord: string;
  rowIndex: number;
  tryCount: number;
  setTryCount: (tryCount: number | ((prevTryCount: number) => number)) => void;
  gameStatus: GameStatus;
  setGameStatus: (status: GameStatus) => void;
  keyColors: Record<string, number>;
  setKeyColors: (color: Record<string, number>) => void;
}


const InputRow = ({
  chosenWord,
  limit,
  rowIndex,
  tryCount,
  setTryCount,
  gameStatus,
  setGameStatus,
  keyColors,
  setKeyColors
}: InputRowProps) => {

  const [availableCharacter, setAvailableChar] = useState<number[]>([]);
  const [isDisabled, setDisabled] = useState(false);

  useEffect(() => {
    console.log("tryCount in parent:", tryCount);
    focusFirstInput(tryCount);
  }, [tryCount]);

  const focusFirstInput = (count: number) => {
    const elem = document.getElementById("" + count);
    console.log(count, elem)
    if (elem) {
      const firstInput = elem.querySelector("input");
      if (firstInput instanceof HTMLInputElement) {
        firstInput.focus();
      }
    }

    // console.log("dis ", tryCount != rowIndex || gameStatus.gameOver)
    // console.log("val ", tryCount, rowIndex, gameStatus.gameOver)
    setDisabled(tryCount != rowIndex || gameStatus.gameOver)
  };

  const validateAnswer = (answer: string) => {
    answer = answer.toLocaleLowerCase();
    console.log(chosenWord, answer, tryCount);

    if (words.includes(answer)) {
      let entryArr: number[] = [];
      const keys = { ...keyColors };

      [...answer].forEach((char, index) => {
        //  char present at right index
        if (char === chosenWord[index]) {
          entryArr.push(1);
          keys[char] = 1;
        }
        //  char present at different index
        else if (chosenWord.includes(char)) {
          entryArr.push(2);
          keys[char] = keys[char] === 1 ? 1 : 2;
        }
        //  char not present
        else {
          entryArr.push(0);
          keys[char] = 0;
        }
      });

      console.log(keys);
      setAvailableChar(entryArr);
      setKeyColors(keys)

      setTryCount(prevTryCount => {
        console.log("Previous try count:", prevTryCount);
        return prevTryCount + 1;
      });

      let gameStatus = { "gameOver": chosenWord === answer || tryCount === limit, "wordGuessed": chosenWord === answer }
      setGameStatus(gameStatus);

      // focusFirstInput(tryCount);

    } else {
      alert("Not a valid word!");
    }
  };

  return (
    <div className="letter-input-container" id={"" + rowIndex}>
      <InputBox
        key={rowIndex}
        enteredCharacters={availableCharacter}
        validateAnswer={validateAnswer}
        isDisabled={isDisabled}
      />
    </div>
  );
};

export default InputRow;

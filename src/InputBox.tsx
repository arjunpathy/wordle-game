import { useState } from "react";

interface LetterInputBoxProps {
  enteredCharacters: number[];
  validateAnswer: (answer: string) => void;
  isDisabled: boolean;

}

const InputBox = ({
  enteredCharacters,
  validateAnswer,
  isDisabled,

}: LetterInputBoxProps) => {
  const [values, setValues] = useState(Array(5).fill(""));
  const boxColor = ["silver", "darkseagreen", "sandybrown"];
  console.log(isDisabled)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newValues = [...values];
    newValues[index] = e.target.value;
    setValues(newValues);
    // console.log(newValues);

    if (e.target.value && e.target.nextSibling) {
      (e.target.nextSibling as HTMLInputElement).focus();
    }

    if (newValues.length === 5 && !newValues.includes("")) {
      validateAnswer(newValues.join(""));
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !values[index]) {
      const previousSibling = (e.target as HTMLInputElement)
        .previousSibling as HTMLInputElement;
      if (previousSibling) {
        previousSibling.focus();
      }
    }
  };

  return (
    <>
      {values.map((value, index) => {
        return (
          <input
            maxLength={1}
            className="letter-input"
            value={value}
            key={index}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            style={{
              backgroundColor: enteredCharacters.length
                ? boxColor[enteredCharacters[index]]
                : "",
            }}
          // disabled={isDisabled}
          />
        );
      })}
    </>
  );
};

export default InputBox;

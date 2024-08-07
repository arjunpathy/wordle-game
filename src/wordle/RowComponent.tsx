
import React from "react";
import { useEffect, useState, useRef } from "react";

interface RowComponentProps {
    index: number;
    validateAnswer: (word: string) => void;
    isDisabled: boolean;
    guessColorArray: number[][];
    tryCount: number
    gameOver: boolean
    values: string[][]
    setValues: (values: string[][]) => void
}

type InputRefArray = React.RefObject<HTMLInputElement>[];

const RowComponent = ({
    index,
    validateAnswer,
    isDisabled,
    guessColorArray,
    tryCount,
    gameOver,
    values,
    setValues
}: RowComponentProps) => {
    const boxColor = ["silver", "darkseagreen", "sandybrown"];
    const [element, setElement] = useState<HTMLInputElement | null>(null)

    const inputRefs = useRef<InputRefArray>(Array(5).fill(null).map(() => React.createRef<HTMLInputElement>()));

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number, boxIndex: number) => {
        if (e.key === "Backspace" && !values[index][boxIndex]) {
            const previousSibling = (e.target as HTMLInputElement).previousSibling as HTMLInputElement;
            if (previousSibling) {
                previousSibling.focus();
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, boxIndex: number) => {
        const newValues = values.map((row, i) =>
            i === index ? row.map((val, j) => (j === boxIndex ? e.target.value : val)) : row
        );

        setValues(newValues);

        if (e.target.value && e.target.nextSibling) {
            (e.target.nextSibling as HTMLInputElement).focus();
        }

        const allFilled = newValues[index].every(val => val !== "");
        if (allFilled) {
            validateAnswer(newValues[index].join(""));
        }
    };

    useEffect(() => {
        let ele = document.getElementById(`${tryCount + 1}:0`) as HTMLInputElement | null;
        setElement(ele)
        element?.focus();
    }, [tryCount])

    return (
        <div className={"letter-input-container " + (!gameOver && index === tryCount ? 'row-focus' : '')} id={"" + index}>
            {values[index].map((value, boxIndex) => (
                <input
                    key={`${index}:${boxIndex}`}
                    id={`${index}:${boxIndex}`}
                    value={value}
                    ref={(boxIndex == 0) ? inputRefs.current[index] : null}
                    onChange={(e) => handleChange(e, index, boxIndex)}
                    onKeyDown={(e) => handleKeyDown(e, index, boxIndex)}
                    disabled={isDisabled}
                    maxLength={1}
                    className="letter-input"
                    style={{
                        backgroundColor: guessColorArray[index]?.length
                            ? boxColor[guessColorArray[index][boxIndex]]
                            : "",
                    }}
                />
            ))}
        </div>
    );
};

export default RowComponent;

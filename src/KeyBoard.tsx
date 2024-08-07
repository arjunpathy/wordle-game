import "./wordle/Wordle.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const boxColor = ["#616161", "darkseagreen", "sandybrown", "silver"];
interface KeyBoardProps {
  keyColors: Record<string, number>;
}


const KeyBoard = ({ keyColors }: KeyBoardProps) => {

  return (
    <div className="keyboard-container">
      {
        Object.keys(keyColors).map(letter => {
          return <span
            key={letter + keyColors[letter]}
            className="keys"
            style={{ backgroundColor: boxColor[keyColors[letter]] }}>
            {letter.toUpperCase()}
          </span>
        })
      }
    </div>
  )
}

export default KeyBoard
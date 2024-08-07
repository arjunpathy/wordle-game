import { Modal, Button } from 'react-bootstrap';
import "./wordle/Wordle.css";

interface InstructionsModalProps {
    show: boolean;
    setShow: (show: boolean) => void
}

const InstructionsModal = ({ show, setShow }: InstructionsModalProps) => {
    const handleClose = () => setShow(false);

    return (
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
    )
}

export default InstructionsModal

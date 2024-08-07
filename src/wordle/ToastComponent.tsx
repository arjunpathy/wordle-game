import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';

interface ToastProps {
    toastShow: boolean;
    setToastShow: (toastShow: boolean) => void
}
const ToastComponent = ({ toastShow, setToastShow }: ToastProps) => {
    let handleclick = () => {
        setToastShow(false)
        console.log(toastShow)
    }
    return (
        <div className="position-fixed top-0 end-0 p-3" style={{ "zIndex": 11 }}>
            <div id="liveToast" className={toastShow ? "toast show" : "toast hide"} role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header">
                    <strong className="me-auto">Wordle</strong>
                    <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" onClick={handleclick}></button>
                </div>
                <div className="toast-body">
                    Not a real word! Try again.
                </div>
            </div>
        </div >
    )
}

export default ToastComponent
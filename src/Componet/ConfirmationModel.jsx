import { useContext } from 'react';
import './ConfirmationModel.css';
import { ModeContext } from '../Cotext/ModeContext';

const ConfirmationModel =({
    title,
    desc,
    onConfirm,
    onclose,
    confirmBtnText,

}) => {
      const ctx = useContext(ModeContext);
    return(
        <div className={`model-backdrop ${ctx.mode}`}>
            <div className="model">
                <h2>{title}</h2>
                <p>{desc}</p>

                <div className="model-action">
                    <button className="btn4 btn-cancel"
                    onClick={onclose}>cancel</button>
                    <button  className="btn4 btn-delete" onClick={onConfirm}>
                        {confirmBtnText}
                    </button>
                </div>
            </div>
        </div>
    );
};
export default ConfirmationModel;
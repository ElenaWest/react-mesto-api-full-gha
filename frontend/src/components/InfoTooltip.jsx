import Popup from "./Popup"
import UnionOk from "../images/UnionOK.png"
import UnionFail from "../images/UnionFail.png"

function InfoTooltip({ name, isSucsefull, isOpen, onClose }) {
    return(
        <Popup name={name} isOpen={isOpen} onClose={onClose}>
            <div className="popup__contener popup__contener_type_result">
                <img className="popup__union" alt="Union" src={isSucsefull ? UnionOk : UnionFail} />
                <p className="popup__text">{isSucsefull ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}</p>
            </div>
        </Popup>
    )
}

export default InfoTooltip;
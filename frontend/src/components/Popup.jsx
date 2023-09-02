function Popup({ name, children, isOpen, onClose }) {
    return(
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} onMouseDown={onClose} >
            <div className={`${name === 'image' ? 'popup__image' : 'popup__contener'} ${name === 'result' ? 'popup__contener_type_result' : ''}`}
            onClick={(e) => e.stopPropagation()}>
                <button className="popup__close" type="button" aria-label="Закрыть" onClick={onClose} />
                {children}
            </div>
        </div>
    )
}

export default Popup;
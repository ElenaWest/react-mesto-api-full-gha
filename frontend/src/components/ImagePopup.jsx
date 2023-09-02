function ImagePopup({ card, isOpen, onClose }) {
    return(
        <div className={`popup popup_type_image ${isOpen ? 'popup_opened' : ''}`} onClick={onClose}>
            <div className="popup__contener popup__contener_type_image" onClick={(e => e.stopPropagation())}>
                <button className="popup__close" type="button" aria-label="Закрыть" onClick={onClose} />
                <figure className="popup__figure">
                    <img className="popup__image" src={card.link ? card.link : '#'} alt={card.name ? `${card.name}` : '#'} />
                    <figcaption className="popup__figcaption">{card.name}</figcaption>
                </figure>
            </div>
        </div>
    );
}

export default ImagePopup;
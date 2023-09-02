function LikeButton({ card, myid, onCardLike }) {
    console.log(onCardLike)
    const isLike = card.likes.some(element => myid === element)
    
    return(
        <>
        <button className={`element__heart ${isLike ? 'element__heart_active' : ''}`} type="button" aria-label="Нравиться" onClick={() => onCardLike(card)} />
        <p className="element__number">{card.likes.length}</p>
        </>
    )
}

export default LikeButton;
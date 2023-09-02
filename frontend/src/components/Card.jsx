import { useContext } from "react";
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import LikeButton from "./LikeButton.jsx";

function Card({ card, onCardClick, onDelete, onCardLike }) {
    const currentUser =  useContext(CurrentUserContext) 
    return(
        <li className="element">
            <img className="element__photo" src={card.link ? card.link : '#'} alt={card.name ? `${card.name}` : '#'} onClick={() => onCardClick({link: card.link, name: card.name})} />
            {currentUser._id === card.owner && <button className="element__trash" type="button" aria-label="Удалить" onClick={() => onDelete(card._id)} />}
            <div className="element__name-group">
                <h2 className="element__title">{card.name}</h2>
                <LikeButton onCardLike={onCardLike} myid={currentUser._id} card={card} />
            </div>
        </li>
    );
}

export default Card;
import { useContext } from 'react';
import Card from './Card.jsx'
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import Spinner from './Spinner/Spinner.jsx';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onDelete, cards, isLoading, onCardLike }) {
    const currentUser = useContext(CurrentUserContext)

    return (
        <main className="main">
          <section className="profile page__sizing">
            <button className="profile__avatar-overlay" type="button" onClick={onEditAvatar}>
              <img className="profile__avatar" src={currentUser.avatar ? currentUser.avatar : '#'} alt="Аватар" />
            </button>
            <div className="profile__info">
              <h1 className="profile__name">{currentUser.name ? currentUser.name : ''}</h1>
              <p className="profile__status">{currentUser.about ? currentUser.about : ''}</p>
              <button className="profile__edit-button" type="button" aria-label="Редактировать" onClick={onEditProfile} />
            </div>
            <button className="profile__add-button" type="button" aria-label="Добавить" onClick={onAddPlace} />
          </section>
          <section className="elements">
            <ul className="elements__list page__sizing">
              {isLoading ? <Spinner /> : cards.map(data => {
                return(
                  <Card key={data._id} card={data} onCardClick={onCardClick} onDelete={onDelete} onCardLike={onCardLike} />
                )
              })}
              {/*<Spinner /> Для настройки спиннера*/}
            </ul>
          </section>
        </main>
    );
}

export default Main;
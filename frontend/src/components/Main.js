import {useContext} from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

import button from '../images/add_btn.svg';


export default function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile-info">
          <div
            onClick={onEditAvatar}
            className="avatar profile-info__avatar"
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          ></div>

          <div className="profile-info__content">
            <div className="profile-info__content-wrap">
              <h1 className="profile-info__name">{currentUser.name}</h1>

              <button
                onClick={onEditProfile}
                type="button"
                className="profile-info__edit"
              ></button>
            </div>

            <p className="profile-info__about">{currentUser.about}</p>
          </div>
        </div>

        <div onClick={onAddPlace} className="profile__add">
          <img src={button} alt="добавить" />
        </div>
      </section>

      <div className="cards">
        {
          cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))
        }
      </div>
    </main>
  )
}

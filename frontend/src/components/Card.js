import {useContext, useState} from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

import iTrash from '../images/trash.svg';

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const cardDeleteButtonClassName = (
    `card__img-trash ${isOwn ? 'card__img-trash-visible' : ''}`
  );

  const [islike, setIsLike] = useState(
    card.likes.some(like => like === currentUser._id)
  );

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    setIsLike(!islike);
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }

  return (
    <div className="card">
      <img
        src={iTrash}
        alt="корзина"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      />

      <div 
        className="card__img-overlay"
        onClick={handleCardClick}
      >
        <img
          className="card__img"
          src={card.link}
          alt={card.name}
        />
      </div>

      <div className="card__content-wrap">
        <h3 className="card__title">{card.name}</h3>
        <div className="card__like-wrapper">
          <button
            type="button"
            className={`card__like ${islike && "card__like_active"}`}
            onClick={handleLikeClick}
          ></button>
          <span className="card__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </div>
  )
}

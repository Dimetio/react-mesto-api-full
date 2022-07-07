export default function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup-fullscreen ${card.link && "popup_opened"}`}>
      <div className="popup-fullscreen__container">
        <img
          src={`${card.link}`}
          alt={card.name}
          className="popup-fullscreen__img"
        />

        <p className="popup-fullscreen__title">{card.name}</p>

        <button
          type="button"
          className="popup__btn-close"
          onClick={onClose}
        ></button>
      </div>
    </div>
  )
}

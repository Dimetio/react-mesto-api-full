import successImage from "../images/infotooltip-success.svg";
import errorImage from "../images/infotooltip-error.svg";

export default function InfoTooltip({onClose, isOpen, isOk}) {
  const successMessage = "Вы успешно зарегистрировались!";
  const errorMessage = "Что-то пошло не так! Попробуйте еще раз.";

  return (
    <div className={`popup popup-info ${isOpen && "popup_opened"}`}>
      <div className="popup__container popup-info__container">
        <img className="popup-info__image" src={isOk ? successImage: errorImage}/>
        <h2 className="popup-info__title">
          {isOk ? successMessage : errorMessage}
        </h2> 
        <button
          type="button"
          className="popup__btn-close"
          onClick={onClose}
        />
      </div>
    </div>
  )
}

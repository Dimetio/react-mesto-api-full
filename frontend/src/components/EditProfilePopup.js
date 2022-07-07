import {useState, useEffect, useContext} from 'react'
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';
import useFormAndValidation from '../hook/useFormAndValidation';

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [buttonText, setButtonText] = useState('Сохранить');

  const { values, handleChange, errors, isValid, setValues, resetForm } = useFormAndValidation();

  useEffect(() => {
    resetForm();
    setValues({name: currentUser.name, description: currentUser.about});
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    setButtonText('Сохранение...');
    onUpdateUser({
      name: values.name,
      about: values.description,
    })
      .then(() => onClose())
      .catch(err => console.log(err))
      .finally(() => setButtonText('Сохранить'));
  }

  return (
    <PopupWithForm
      name="popup-edit"
      title="Ретактировать профиль"
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitButtonEnabled={isValid}
    >
      <label className="popup__label">
        <input
          name="name"
          type="text"
          id="name-input"
          className={`popup__input popup__input_name ${errors.name && "popup__input_error"}`}
          placeholder="Имя"
          required
          minLength="2"
          maxLength="40"
          value={values.name || ""}
          onChange={handleChange}
        />
        <span className={`popup__input-error name-input-error ${errors.name && "popup__input-error_active"}`}>{errors.name}</span>
      </label>

      <label className="popup__label">
        <input
          name="description"
          type="text"
          id="about-input"
          className={`popup__input popup__input_about ${errors.description && "popup__input_error"}`}
          placeholder="О себе"
          required
          minLength="2"
          maxLength="200"
          value={values.description || ""}
          onChange={handleChange}
        />
        <span className={`popup__input-error about-input-error ${errors.description && "popup__input-error_active"}`}>{errors.description}</span>
      </label>
    </PopupWithForm>
  )
}

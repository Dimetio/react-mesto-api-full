import {useState, useEffect} from 'react';
import PopupWithForm from './PopupWithForm';
import useFormAndValidation from '../hook/useFormAndValidation';

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const [buttonText, setButtonText] = useState('Сохранить');

  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    setButtonText('Сохранение...');
    onUpdateAvatar({ avatar: values.link })
      .then(() => onClose())
      .catch(err => console.log(err))
      .finally(() => setButtonText('Сохранить'));
  }

  useEffect(() => {
    resetForm();
  }, [isOpen]);

  return (
    <PopupWithForm
      name="popup-avatar"
      title="Обновить аватар"
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitButtonEnabled={isValid}
    >
      <label className="popup__label">
        <input
          name="link"
          type="url"
          id="avatar-input"
          className={`popup__input popup__input_avatar ${errors.link && "popup__input_error"}`}
          placeholder="Ссылка на картинку"
          required
          value={values.link || ""}
          onChange={handleChange}
        />

        <span className={`popup__input-error avatar-input-error ${errors.link && "popup__input-error_active"}`}>{errors.link}</span>
      </label>
    </PopupWithForm>
  )
}

import {useState, useEffect} from 'react';
import PopupWithForm from './PopupWithForm';
import useFormAndValidation from '../hook/useFormAndValidation';

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [buttonText, setButtonText] = useState('Создать');

  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    setButtonText('Создание...');
    onAddPlace({ title : values.title, link: values.link })
      .then(() => onClose())
      .catch(err => console.log(err))
      .finally(() => setButtonText('Создать'));
  }

  useEffect(() => {
    resetForm();
  }, [isOpen]);

  return (
    <PopupWithForm
      name="popup-add"
      title="Новое место"
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitButtonEnabled={isValid}
    >
      <label className="popup__label">
        <input
          name="title"
          type="text"
          id="title-input"
          className={`popup__input popup__input_title ${errors.title && "popup__input_error"}`}
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
          value={values.title || ""}
          onChange={handleChange}
        />

        <span className={`popup__input-error title-input-error ${errors.title && "popup__input-error_active"}`}>{errors.title}</span>
      </label>

      <label className="popup__label">
        <input
          name="link"
          type="url"
          id="link-input"
          className={`popup__input popup__input_link ${errors.link && "popup__input_error"}`}
          placeholder="Ссылка на картинку"
          required
          value={values.link || ""}
          onChange={handleChange}
        />

        <span className={`popup__input-error link-input-error ${errors.link && "popup__input-error_active"}`}>{errors.link}</span>
      </label>
    </PopupWithForm>
  )
}

import PopupWithForm from './PopupWithForm';

export default function DeletionConfirmationPopup({isOpen, onClose, onSubmit}) {

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <PopupWithForm
      name="popup-delete"
      title="Вы уверены?"
      buttonText="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitButtonEnabled={true}
    ></PopupWithForm>
  )
}

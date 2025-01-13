import "./ModalWithForm.css";

function ModalWithForm({
  buttonText,
  isSubmitVisible,
  title,
  onCloseClick,
  onSubmit,
  isOpened,
  children,
}) {
  return (
    <div className={`modal ${isOpened}`}>
      <div className="modal__content modal__content_form">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onCloseClick} type="button" className="modal__close" />
        <form className="modal__form" name="name" onSubmit={onSubmit}>
          {children}
          <button
            type="submit"
            className="modal__submit"
            disabled={!isSubmitVisible}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;

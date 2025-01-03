import "./ModalWithForm.css";
import { useFormAndValidation } from "../../utils/validation.jsx";

function ModalWithForm({
  children,
  buttonText,
  activeModal,
  isSubmitVisible,
  title,
  handleCloseClick,
  setIsValid,
  text1,
  text2,
  url,
}) {
  const handleSubmit = (evt) => {
    evt.preventDefault();

    const validation = useFormAndValidation(text1, text2, url);

    if (!validation.isValid) {
      setIsValid(false);
      isSubmitVisible(false);
      alert(validation.message);
    } else {
      setIsValid(true);
      alert("Form Submitted Successfully!");
    }
  };
  return (
    <div
      className={`modal ${activeModal === "add-garment" && "modal__opened"}`}
    >
      <div className="modal__content modal__content_form">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close"
        ></button>
        <form className="modal__form" name="name" onSubmit={handleSubmit}>
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

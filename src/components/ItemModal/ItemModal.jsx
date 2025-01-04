import "./ItemModal.css";

function ItemModal({ activeModal, handleCloseClick, selectedCard, isOpened }) {
  return (
    <div className={`modal ${isOpened}`}>
      <div className="modal__content modal__content_type-image">
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close modal__close-preview"
        ></button>
        <img
          src={selectedCard.link}
          alt={selectedCard.name}
          className="modal__image"
        />
        <div className="modal__footer">
          <p className="modal__caption">{selectedCard.name}</p>
          <p className="modal__weather">Weather: {selectedCard.weather}</p>
        </div>
      </div>
    </div>
  );
}
export default ItemModal;

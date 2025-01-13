import "./ItemModal.css";

function ItemModal({
  onCloseClick,
  selectedCard,
  isOpened,
  onDeleteClick,
  onSelectCard,
}) {
  const triggerDelete = () => {
    isOpened = false;
    onSelectCard(selectedCard);
    onDeleteClick();
  };

  return (
    <div className={`modal ${isOpened}`}>
      <div className="modal__content modal__content_type-image">
        <button
          onClick={onCloseClick}
          type="button"
          className="modal__close-preview"
        ></button>
        <img
          src={selectedCard.link}
          alt={selectedCard.name}
          className="modal__image"
        />
        <div className="modal__footer">
          <p className="modal__caption">{selectedCard.name}</p>
          <p className="modal__weather">Weather: {selectedCard.weather}</p>
          <button className="modal__delete-item-button" onClick={triggerDelete}>
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
}
export default ItemModal;

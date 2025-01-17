import "./ItemModal.css";
import AvatarImage from "../../assets/Avatar.svg";

function ItemModal({
  onCloseClick,
  selectedCard,
  isOpened,
  onDeleteClick,
  onSelectCard,
}) {
  const triggerDelete = () => {
    onSelectCard(selectedCard);
    onDeleteClick();
  };

  const imageUrl =
    selectedCard?.link && typeof selectedCard?.link === "string"
      ? selectedCard.link
      : AvatarImage;

  return (
    <div className={`modal ${isOpened}`}>
      <div className="modal__content modal__content_type-image">
        <button
          onClick={onCloseClick}
          type="button"
          className="modal__close-preview"
        ></button>
        <img
          src={imageUrl}
          alt={selectedCard?.name || "Default"}
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

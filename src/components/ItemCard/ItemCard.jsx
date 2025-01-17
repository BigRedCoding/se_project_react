import "./ItemCard.css";
import AvatarImage from "../../assets/Avatar.svg";

function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  const imageUrl =
    item.link && typeof item.link === "string" ? item.link : AvatarImage;

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        src={imageUrl || ""}
        alt={item.name || "default"}
        className="card__image"
      />
    </li>
  );
}

export default ItemCard;

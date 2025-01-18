import "./ClothesSection.css";

import ItemCard from "../ItemCard/ItemCard.jsx";

export default function ClothesSection({
  onCardClick,
  clothingItems,
  onAddClick,
}) {
  const sortedItems = clothingItems.sort((a, b) => b._id - a._id);

  return (
    <div className="clothes">
      <div className="clothes__header">
        <p className="clothes__text">Your items</p>
        <button className="clothes__button" onClick={onAddClick}>
          <p className="clothes__button-text">+Add New</p>
        </button>
      </div>
      <ul className="cards__list clothes__list">
        {sortedItems.map((item) => {
          return (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          );
        })}
      </ul>
    </div>
  );
}

import "./Profile.css";
import SideBar from "../Sidebar/Sidebar.jsx";
import ClothesSection from "../ClothesSection/ClothesSection.jsx";

export default function Profile({
  onCardClick,
  clothingItems,
  onAddClick,
  onLogout,
  onEditProfileClick,
  onCardLike,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar onLogout={onLogout} onEditProfileClick={onEditProfileClick} />
      </section>
      <section className="profile__clothes-items">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          onAddClick={onAddClick}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

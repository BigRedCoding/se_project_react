import "./Profile.css";
import SideBar from "../Sidebar/Sidebar.jsx";
import ClothesSection from "../ClothesSection/ClothesSection.jsx";
import HeaderBar from "../HeaderBar/HeaderBar.jsx";

export default function Profile({ onCardClick, clothingItems, onAddClick }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__header-bar">
        <HeaderBar />
      </section>
      <section className="profile__clothes-items">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          onAddClick={onAddClick}
        />
      </section>
    </div>
  );
}

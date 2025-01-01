import "./App.css";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Animal from "./Animals.jsx";
// import "./Footer.jsx";

function App() {
  return (
    <div className="page">
      <Header />
      <Main />
      <Animal selectedAnimal="dog" />
    </div>
  );
}

export default App;

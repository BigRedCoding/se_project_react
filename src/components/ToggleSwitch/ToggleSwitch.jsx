import "./ToggleSwitch.css";

export default function ToggleSwitch({ handleTempUnit }) {
  return (
    <label className="toggle">
      <input
        type="checkbox"
        className="toggle__checkbox"
        onClick={handleTempUnit}
      />
      <span className="toggle__circle"></span>
      <span className="toggle__text toggle__text-f">F</span>
      <span className="toggle__text toggle__text-c">C</span>
    </label>
  );
}

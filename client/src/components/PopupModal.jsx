import { useState } from "react";
import "./popup.css";

export default function PopupModal({ isOpen, onClose, onSubmit, message }) {
  const [milkQuantity, setMilkQuantity] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = () => {
    const value = parseFloat(milkQuantity);

    if (isNaN(value) || value <= 0) {
      setValidationError("Please enter a valid number greater than 0.");
      return;
    }

    setValidationError(""); // Clear any existing error
    onSubmit(value);
    setMilkQuantity("");
  };

  if (!isOpen) return null;

  return (
    <div className="popup-backdrop">
      <div className="popup-modal">
        <h3>Enter Milk Quantity (litres)</h3>
        <input
          type="number"
          value={milkQuantity}
          onChange={(e) => setMilkQuantity(e.target.value)}
          placeholder="Enter Milk Quantity"
        />

        {/* Validation error below the input */}
        {validationError && (
          <div className="validation-error">{validationError}</div>
        )}

        {/* Optional backend message */}
        {message && <div className="popup-message">{message}</div>}

        <div className="popup-buttons">
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

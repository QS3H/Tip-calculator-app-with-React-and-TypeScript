import React, { useState, useEffect } from "react";

/**
 * Props for the TipSelector component
 */
interface TipSelectorProps {
  /** Current tip percentage value (as decimal, e.g., 0.15 for 15%) */
  value: number;
  /** Optional error message to display */
  error?: string;
  /** Callback function called when the tip percentage changes */
  onChange: (value: number) => void;
  /** Optional callback function called when the custom input loses focus */
  onBlur?: () => void;
}

/**
 * Available preset tip percentage options
 * These are displayed as buttons for quick selection
 */
const TIP_OPTIONS = [5, 10, 15, 25, 50] as const;

/**
 * TipSelector Component
 *
 * A component that allows users to select a tip percentage either by:
 * - Clicking preset buttons (5%, 10%, 15%, 25%, 50%)
 * - Entering a custom percentage value
 *
 * Features:
 * - Preset buttons for common tip percentages
 * - Custom input field for any percentage (0-100%)
 * - Visual feedback for selected preset (active state)
 * - Synchronizes custom input with parent value
 * - Real-time validation with error display
 * - Converts between percentage (display) and decimal (internal) formats
 *
 * @param props - TipSelectorProps containing value, error, and callbacks
 * @returns JSX element representing the tip percentage selector
 */
export default function TipSelector({ value, error, onChange, onBlur }: TipSelectorProps) {
  // Local state for custom tip input value (stored as string for better UX)
  const [customValue, setCustomValue] = useState("");

  /**
   * Syncs custom input with parent value
   * This ensures the custom input displays correctly when:
   * - A custom value is set from parent (not a preset)
   * - The value is reset to 0
   */
  useEffect(() => {
    const isPresetValue = TIP_OPTIONS.some((opt) => value === opt / 100);
    if (!isPresetValue && value > 0) {
      // It's a custom value, update the input display
      setCustomValue((value * 100).toString());
    } else if (value === 0) {
      // Reset custom input when value is cleared
      setCustomValue("");
    }
  }, [value]);

  /**
   * Handles preset button clicks
   * Converts percentage to decimal and clears custom input
   */
  const handleButtonClick = (percentage: number) => {
    onChange(percentage / 100); // Convert to decimal (e.g., 15 -> 0.15)
    setCustomValue(""); // Clear custom input when preset is selected
  };

  /**
   * Handles custom input changes
   * Validates input and converts percentage to decimal format
   */
  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setCustomValue(inputValue);

    // Handle empty input
    if (inputValue === "") {
      onChange(0);
      return;
    }

    // Parse and validate the percentage value
    const numericValue = parseFloat(inputValue);
    // Only update if valid number within 0-100% range
    if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 100) {
      onChange(numericValue / 100); // Convert to decimal (e.g., 15 -> 0.15)
    }
  };

  /**
   * Handles custom input focus
   * Clears preset selection when user focuses on custom input
   * This provides better UX - user can immediately start typing
   */
  const handleCustomFocus = () => {
    // Check if a preset is currently selected
    const isPresetValue = TIP_OPTIONS.some((opt) => value === opt / 100);
    if (isPresetValue) {
      // Clear preset selection to allow custom input
      onChange(0);
      setCustomValue("");
    }
  };

  /**
   * Determines if a preset button should be marked as active
   * Compares the current value (decimal) with the button percentage
   */
  const isActive = (percentage: number) => {
    return value === percentage / 100;
  };

  // Determine if there's an error to display
  const hasError = Boolean(error);

  return (
    <div className="tip-selector">
      {/* Label and Error Message Container */}
      <div className="input-label-wrapper">
        <label className="input-label">Select Tip %</label>
        {/* Display error message if validation fails */}
        {hasError && (
          <span className="input-error" role="alert" aria-live="polite">
            {error}
          </span>
        )}
      </div>

      {/* Tip Buttons Grid */}
      <div className={`tip-buttons ${hasError ? "tip-buttons--error" : ""}`}>
        {/* Render preset tip percentage buttons */}
        {TIP_OPTIONS.map((percentage) => (
          <button
            key={percentage}
            type="button"
            className={`tip-button ${isActive(percentage) ? "active" : ""}`}
            onClick={() => handleButtonClick(percentage)}
          >
            {percentage}%
          </button>
        ))}

        {/* Custom Tip Input Field */}
        <input
          type="number"
          placeholder="Custom"
          value={customValue}
          onChange={handleCustomChange}
          onFocus={handleCustomFocus}
          onBlur={onBlur}
          min="0"
          max="100"
          className={`custom-tip-input tip-button ${hasError ? "custom-tip-input--error" : ""}`}
          aria-invalid={hasError}
          aria-describedby={hasError ? "tip-error" : undefined}
        />
      </div>

      {/* Screen Reader Only Error Message (for accessibility) */}
      {hasError && (
        <span id="tip-error" className="sr-only">
          {error}
        </span>
      )}
    </div>
  );
}

/**
 * Props for the BillInput component
 */
interface BillInputProps {
  /** Current bill amount value */
  value: number;
  /** Optional error message to display */
  error?: string;
  /** Callback function called when the input value changes */
  onChange: (value: number) => void;
  /** Optional callback function called when the input loses focus */
  onBlur?: () => void;
}

/**
 * BillInput Component
 *
 * A controlled input component for entering the bill amount.
 * Features include:
 * - Dollar sign icon for visual clarity
 * - Real-time validation with error display
 * - Accessible error messaging
 * - Supports decimal values (e.g., 142.55)
 *
 * @param props - BillInputProps containing value, error, and callbacks
 * @returns JSX element representing the bill amount input field
 */
export default function BillInput({ value, error, onChange, onBlur }: BillInputProps) {
  /**
   * Handles input change events
   * Parses the input value as a float and converts empty/invalid values to 0
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value) || 0;
    onChange(newValue);
  };

  // Determine if there's an error to display
  const hasError = Boolean(error);

  return (
    <div className="input-group">
      {/* Label and Error Message Container */}
      <div className="input-label-wrapper">
        <label htmlFor="bill" className="input-label">
          Bill
        </label>
        {/* Display error message if validation fails */}
        {hasError && (
          <span className="input-error" role="alert" aria-live="polite">
            {error}
          </span>
        )}
      </div>

      {/* Input Wrapper with Icon and Error Indicator */}
      <div className={`input-wrapper ${hasError ? "input-wrapper--error" : ""}`}>
        {/* Dollar Sign Icon */}
        <img
          src={`${import.meta.env.BASE_URL}images/icon-dollar.svg`}
          alt=""
          className="input-icon"
          aria-hidden="true"
        />

        {/* Bill Amount Input Field */}
        <input
          id="bill"
          type="number"
          min="0"
          step="0.01"
          value={value || ""}
          onChange={handleChange}
          onBlur={onBlur}
          placeholder="0"
          className={`input-field ${hasError ? "input-field--error" : ""}`}
          aria-invalid={hasError}
          aria-describedby={hasError ? "bill-error" : undefined}
        />

        {/* Error Icon (shown when validation fails) */}
        {hasError && (
          <svg
            className="input-error-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="10" cy="10" r="10" fill="#E17052" />
            <path
              d="M10 6V10M10 14H10.01"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        )}
      </div>

      {/* Screen Reader Only Error Message (for accessibility) */}
      {hasError && (
        <span id="bill-error" className="sr-only">
          {error}
        </span>
      )}
    </div>
  );
}

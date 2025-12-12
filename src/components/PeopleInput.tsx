/**
 * Props for the PeopleInput component
 */
interface PeopleInputProps {
  /** Current number of people value */
  value: number;
  /** Optional error message to display */
  error?: string;
  /** Callback function called when the input value changes */
  onChange: (value: number) => void;
  /** Optional callback function called when the input loses focus */
  onBlur?: () => void;
}

/**
 * PeopleInput Component
 *
 * A controlled input component for entering the number of people to split the bill.
 * Features include:
 * - Person icon for visual clarity
 * - Allows entering 0 (validation will catch it)
 * - Real-time validation with error display
 * - Accessible error messaging
 * - Only accepts whole numbers (integers)
 *
 * @param props - PeopleInputProps containing value, error, and callbacks
 * @returns JSX element representing the number of people input field
 */
export default function PeopleInput({ value, error, onChange, onBlur }: PeopleInputProps) {
  /**
   * Handles input change events
   * Special handling to allow 0 to be entered (unlike typical || 0 fallback)
   * This enables proper validation feedback when user enters invalid values
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Allow empty string for clearing the field (sets to 0 for validation)
    if (inputValue === "") {
      onChange(0);
      return;
    }

    // Parse the value as integer - allow 0 to be entered
    const parsedValue = parseInt(inputValue, 10);

    // Only update if it's a valid number (including 0)
    // This allows 0 to be entered so validation can catch it
    if (!isNaN(parsedValue)) {
      onChange(parsedValue);
    }
  };

  // Determine if there's an error to display
  const hasError = Boolean(error);

  return (
    <div className="input-group">
      {/* Label and Error Message Container */}
      <div className="input-label-wrapper">
        <label htmlFor="people" className="input-label">
          Number of People
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
        {/* Person Icon */}
        <img
          src="/images/icon-person.svg"
          alt=""
          className="input-icon"
          aria-hidden="true"
        />

        {/* Number of People Input Field */}
        <input
          id="people"
          type="number"
          min="0"
          // Special handling: show 0 if value is 0, otherwise show value or empty
          value={value === 0 ? 0 : value || ""}
          onChange={handleChange}
          onBlur={onBlur}
          placeholder="1"
          className={`input-field ${hasError ? "input-field--error" : ""}`}
          aria-invalid={hasError}
          aria-describedby={hasError ? "people-error" : undefined}
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
        <span id="people-error" className="sr-only">
          {error}
        </span>
      )}
    </div>
  );
}

import { CalculationResults } from "../types/calculator";
import { formatCurrency } from "../utils/calculator.util";

/**
 * Props for the ResultsDisplay component
 */
interface ResultsDisplayProps {
  /** Calculated results, or null if no valid calculation exists */
  results: CalculationResults | null;
  /** Callback function to reset all inputs */
  onReset: () => void;
  /** Whether the reset button should be enabled */
  canReset?: boolean;
}

/**
 * ResultsDisplay Component
 *
 * Displays the calculated tip and total amounts per person.
 * Features:
 * - Shows tip amount per person
 * - Shows total amount per person (bill + tip)
 * - Displays $0.00 when no valid calculation exists
 * - Reset button to clear all inputs
 * - Reset button is disabled when there's nothing to reset
 *
 * The component handles two states:
 * 1. No results: Shows $0.00 for both amounts
 * 2. Has results: Shows calculated amounts formatted as currency
 *
 * @param props - ResultsDisplayProps containing results, reset callback, and reset state
 * @returns JSX element representing the results display section
 */
export default function ResultsDisplay({
  results,
  onReset,
  canReset = false,
}: ResultsDisplayProps) {
  // Render empty state when no results are available
  // Render empty state when no results are available
  if (!results) {
    return (
      <div className="results-display">
        {/* Tip Amount Per Person */}
        <div className="result-item">
          <span className="result-label">
            Tip Amount <span>/ person</span>
          </span>
          <span className="result-amount">$0.00</span>
        </div>

        {/* Total Per Person */}
        <div className="result-item">
          <span className="result-label">
            Total <span>/ person</span>
          </span>
          <span className="result-amount">$0.00</span>
        </div>

        {/* Reset Button */}
        <button
          type="button"
          className="reset-button"
          onClick={onReset}
          disabled={!canReset}
        >
          RESET
        </button>
      </div>
    );
  }

  // Render results when calculation is available
  return (
    <div className="results-display">
      {/* Tip Amount Per Person */}
      <div className="result-item">
        <span className="result-label">
          Tip Amount <span>/ person</span>
        </span>
        <span className="result-amount">
          {formatCurrency(results.tipAmountPerPerson)}
        </span>
      </div>

      {/* Total Per Person (Bill + Tip) */}
      <div className="result-item">
        <span className="result-label">
          Total <span>/ person</span>
        </span>
        <span className="result-amount">
          {formatCurrency(results.totalPerPerson)}
        </span>
      </div>

      {/* Reset Button */}
      <button
        type="button"
        className="reset-button"
        onClick={onReset}
        disabled={!canReset}
      >
        RESET
      </button>
    </div>
  );
}

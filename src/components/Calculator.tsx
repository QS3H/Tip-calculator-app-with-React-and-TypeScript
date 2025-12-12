import {
  UserInputs,
  CalculationResults,
  FieldErrors,
} from "../types/calculator";
import BillInput from "./BillInput";
import TipSelector from "./TipSelector";
import PeopleInput from "./PeopleInput";
import ResultsDisplay from "./ResultsDisplay";
import "../App.css";

/**
 * Props for the Calculator component
 */
interface CalculatorProps {
  /** Current user input values */
  inputs: UserInputs;
  /** Calculated results, or null if calculation cannot be performed */
  results: CalculationResults | null;
  /** Field-specific validation errors */
  errors: FieldErrors;
  /** Set of fields that have been touched/interacted with by the user */
  touchedFields: Set<keyof UserInputs>;
  /** Callback function to update input values */
  onInputChange: (updates: Partial<UserInputs>) => void;
  /** Callback function called when a field loses focus (for validation) */
  onFieldBlur: (field: keyof UserInputs) => void;
  /** Callback function to reset all inputs to default values */
  onReset: () => void;
}

/**
 * Calculator Component
 *
 * Main container component that orchestrates all input components and results display.
 * This component handles the layout and data flow between child components.
 *
 * Features:
 * - Displays three input sections: Bill, Tip Percentage, and Number of People
 * - Shows calculated results in a separate display area
 * - Manages error state visibility (only shows errors for touched fields)
 * - Handles reset functionality
 *
 * @param props - CalculatorProps containing all necessary data and callbacks
 * @returns JSX element representing the complete calculator interface
 */
export default function Calculator({
  inputs,
  results,
  errors,
  touchedFields,
  onInputChange,
  onFieldBlur,
  onReset,
}: CalculatorProps) {
  return (
    <div className="calculator">
      {/* Input Section: Contains all user input fields */}
      <div className="calculator-inputs">
        {/* Bill Amount Input */}
        <BillInput
          value={inputs.billAmount}
          // Only show error if field has been touched (prevents showing errors on initial load)
          error={
            touchedFields.has("billAmount") ? errors.billAmount : undefined
          }
          onChange={(billAmount: number) => onInputChange({ billAmount })}
          onBlur={() => onFieldBlur("billAmount")}
        />

        {/* Tip Percentage Selector */}
        <TipSelector
          value={inputs.tipPercentage}
          // Only show error if field has been touched
          error={
            touchedFields.has("tipPercentage")
              ? errors.tipPercentage
              : undefined
          }
          onChange={(tipPercentage: number) => onInputChange({ tipPercentage })}
          onBlur={() => onFieldBlur("tipPercentage")}
        />

        {/* Number of People Input */}
        <PeopleInput
          value={inputs.numberOfPeople}
          // Only show error if field has been touched
          error={
            touchedFields.has("numberOfPeople")
              ? errors.numberOfPeople
              : undefined
          }
          onChange={(numberOfPeople: number) =>
            onInputChange({ numberOfPeople })
          }
          onBlur={() => onFieldBlur("numberOfPeople")}
        />
      </div>

      {/* Results Display Section */}
      <ResultsDisplay
        results={results}
        onReset={onReset}
        // Enable reset button only if there are meaningful values to reset
        canReset={
          inputs.billAmount > 0 ||
          inputs.tipPercentage > 0 ||
          inputs.numberOfPeople > 1
        }
      />
    </div>
  );
}

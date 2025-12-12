import {
  CalculationResults,
  UserInputs,
  FieldErrors,
} from "../types/calculator";

/**
 * Validates user inputs for the tip calculator
 *
 * Performs comprehensive validation to ensure all inputs are valid before
 * performing calculations. This prevents runtime errors and provides
 * user-friendly, field-specific error messages.
 *
 * @param inputs - The user input data to validate
 * @returns Object with field-specific error messages (empty object if all inputs are valid)
 */
export function validateInputs(inputs: UserInputs): FieldErrors {
  const errors: FieldErrors = {};

  // Bill amount validation
  if (inputs.billAmount < 0) {
    errors.billAmount = "Can't be negative";
  }

  // Tip percentage validation
  if (inputs.tipPercentage < 0) {
    errors.tipPercentage = "Can't be negative";
  } else if (inputs.tipPercentage > 1) {
    errors.tipPercentage = "Can't exceed 100%";
  }

  // Number of people validation
  if (inputs.numberOfPeople < 1) {
    errors.numberOfPeople = "Can't be zero";
  } else if (!Number.isInteger(inputs.numberOfPeople)) {
    errors.numberOfPeople = "Must be a whole number";
  }

  return errors;
}

/**
 * Calculates tip amounts and totals based on user inputs
 *
 * Performs the core business logic for tip calculation. This is a pure function
 * with no side effects - given the same inputs, it always returns the same results.
 *
 * @param inputs - Validated user input data
 * @returns Complete calculation results including totals and per-person amounts
 */
export function calculateTip(inputs: UserInputs): CalculationResults {
  const tipAmountTotal = inputs.billAmount * inputs.tipPercentage;
  const totalAmount = inputs.billAmount + tipAmountTotal;

  return {
    tipAmountTotal,
    totalAmount,
    tipAmountPerPerson: tipAmountTotal / inputs.numberOfPeople,
    totalPerPerson: totalAmount / inputs.numberOfPeople,
  };
}

/**
 * Formats a number as US currency with truncation (not rounding)
 *
 * Truncates the amount to 2 decimal places (drops extra decimals) instead of
 * rounding to nearest cent. This matches the Frontend Mentor design preview.
 * Uses the browser's built-in Intl.NumberFormat API for consistent formatting.
 *
 * @param amount - The numeric amount to format
 * @returns Formatted currency string (e.g., "$123.45")
 */
export function formatCurrency(amount: number): string {
  // Truncate to 2 decimal places (multiply by 100, floor, divide by 100)
  const truncated = Math.floor(amount * 100) / 100;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(truncated);
}

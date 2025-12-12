// User input data
export interface UserInputs {
  billAmount: number;
  tipPercentage: number;
  numberOfPeople: number;
}

// Calculation results
export interface CalculationResults {
  tipAmountTotal: number;
  totalAmount: number;
  tipAmountPerPerson: number;
  totalPerPerson: number;
}

// Field-specific error messages
export interface FieldErrors {
  billAmount?: string;
  tipPercentage?: string;
  numberOfPeople?: string;
}

// Complete app state
export interface TipCalculatorState {
  inputs: UserInputs;
  results: CalculationResults | null;
  errors: FieldErrors;
}

// Form field types for better UX
export type TipPercentageOption = 5 | 10 | 15 | 25 | 50 | "custom";

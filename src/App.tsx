import { useState, useEffect } from "react";
import { UserInputs, TipCalculatorState } from "./types/calculator";
import { validateInputs, calculateTip } from "./utils/calculator.util";
import {
  loadInputsFromLocalStorage,
  saveInputsToLocalStorage,
  clearInputsFromLocalStorage,
} from "./utils/localStorage.util";
import { ThemeProvider } from "./contexts/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";
import "./App.css";
import Calculator from "./components/Calculator";

// Default initial inputs
const DEFAULT_INPUTS: UserInputs = {
  billAmount: 0,
  tipPercentage: 0,
  numberOfPeople: 1,
};

function App() {
  // Load saved inputs from localStorage on initial mount
  const [state, setState] = useState<TipCalculatorState>(() => {
    const savedInputs = loadInputsFromLocalStorage();
    return {
      inputs: savedInputs || DEFAULT_INPUTS,
      results: null,
      errors: {},
    };
  });

  // Track if user has interacted with fields to avoid showing errors on initial load
  const [touchedFields, setTouchedFields] = useState<Set<keyof UserInputs>>(new Set());

  // Save inputs to localStorage whenever they change
  useEffect(() => {
    // Only save if inputs have meaningful values (not all defaults)
    const hasMeaningfulData =
      state.inputs.billAmount > 0 ||
      state.inputs.tipPercentage > 0 ||
      state.inputs.numberOfPeople > 1;

    if (hasMeaningfulData) {
      saveInputsToLocalStorage(state.inputs);
    }
  }, [state.inputs]);

  // Recalculate whenever inputs change
  useEffect(() => {
    const errors = validateInputs(state.inputs);
    const hasErrors = Object.keys(errors).length > 0;

    // Only calculate if there are no errors and we have valid inputs
    if (!hasErrors && state.inputs.billAmount > 0 && state.inputs.numberOfPeople >= 1) {
      const results = calculateTip(state.inputs);
      setState((prev) => ({ ...prev, results, errors: {} }));
    } else {
      setState((prev) => ({ ...prev, results: null, errors }));
    }
  }, [state.inputs]);

  const markFieldTouched = (field: keyof UserInputs) => {
    setTouchedFields((prev) => new Set(prev).add(field));
  };

  const updateInputs = (updates: Partial<UserInputs>) => {
    setState((prev) => ({ ...prev, inputs: { ...prev.inputs, ...updates } }));
  };

  const handleReset = () => {
    setState({
      inputs: DEFAULT_INPUTS,
      results: null,
      errors: {},
    });
    setTouchedFields(new Set());
    // Clear saved inputs from localStorage when resetting
    clearInputsFromLocalStorage();
  };

  return (
    <ThemeProvider>
      <div className="app">
        <div className="app-header">
          <img
            src="/images/logo.svg"
            alt="SPLITTER"
            className="app-logo"
          />
          <ThemeToggle />
        </div>
        <Calculator
          inputs={state.inputs}
          results={state.results}
          errors={state.errors}
          touchedFields={touchedFields}
          onInputChange={updateInputs}
          onFieldBlur={markFieldTouched}
          onReset={handleReset}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;

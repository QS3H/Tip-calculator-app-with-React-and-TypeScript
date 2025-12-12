import { UserInputs } from "../types/calculator";

const STORAGE_KEY = "tip-calculator-inputs";

/**
 * Checks if localStorage is available in the current environment
 *
 * @returns true if localStorage is available, false otherwise
 */
function isLocalStorageAvailable(): boolean {
  try {
    const test = "__localStorage_test__";
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

/**
 * Saves user inputs to local storage
 *
 * Persists the calculator inputs so they can be restored on next visit.
 * Silently fails if localStorage is not available.
 *
 * @param inputs - The user input data to save
 */
export function saveInputsToLocalStorage(inputs: UserInputs): void {
  if (!isLocalStorageAvailable()) {
    return;
  }

  try {
    const dataToSave = JSON.stringify(inputs);
    localStorage.setItem(STORAGE_KEY, dataToSave);
  } catch (error) {
    // Silently fail - localStorage might be full or unavailable
    console.warn("Failed to save inputs to localStorage:", error);
  }
}

/**
 * Loads user inputs from local storage
 *
 * Retrieves previously saved calculator inputs. Returns default values
 * if no saved data exists or if there's an error reading from storage.
 *
 * @returns The saved user inputs or default values if none exist
 */
export function loadInputsFromLocalStorage(): UserInputs | null {
  if (!isLocalStorageAvailable()) {
    return null;
  }

  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    
    if (!savedData) {
      return null;
    }

    const parsed = JSON.parse(savedData) as UserInputs;

    // Validate the parsed data structure
    if (
      typeof parsed.billAmount === "number" &&
      typeof parsed.tipPercentage === "number" &&
      typeof parsed.numberOfPeople === "number" &&
      parsed.billAmount >= 0 &&
      parsed.tipPercentage >= 0 &&
      parsed.tipPercentage <= 1 &&
      parsed.numberOfPeople >= 1
    ) {
      return parsed;
    }

    // Invalid data structure - clear it
    localStorage.removeItem(STORAGE_KEY);
    return null;
  } catch (error) {
    // Corrupted data - clear it
    console.warn("Failed to load inputs from localStorage:", error);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore cleanup errors
    }
    return null;
  }
}

/**
 * Clears saved inputs from local storage
 *
 * Removes the stored calculator inputs from localStorage.
 */
export function clearInputsFromLocalStorage(): void {
  if (!isLocalStorageAvailable()) {
    return;
  }

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn("Failed to clear inputs from localStorage:", error);
  }
}


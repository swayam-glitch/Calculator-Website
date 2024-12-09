let isNewCalculation = false;  // Flag to track if new calculation result is displayed

// Append value to the display
function appendToDisplay(value) {
  let display = document.getElementById("display");

  // If the display shows a result or error, clear the display before appending new value
  if (isNewCalculation || display.value === "Error") {
    display.value = "";  // Clear the display
    isNewCalculation = false;  // Reset the flag
  }

  display.value += value;  // Append the new value to the display
}

// Clear the display
function clearDisplay() {
  document.getElementById("display").value = "";  // Clear the display
  isNewCalculation = false;  // Reset the flag
}

// Delete the last character
function deleteDigit() {
  let displayValue = document.getElementById("display").value;
  document.getElementById("display").value = displayValue.slice(0, -1);  // Remove the last character
}

// Perform the calculation
function calculate() {
  let expression = document.getElementById("display").value;
  let result;

  try {
    // Evaluate the expression
    result = new Function("return " + expression)();

    // Check for invalid results like division by zero
    if (!isFinite(result)) throw new Error("Math error");

    document.getElementById("display").value = result;  // Display the result
    isNewCalculation = true;  // Set flag to true after a calculation is displayed
  } catch (error) {
    document.getElementById("display").value = "Error";  // Display error if something goes wrong
    isNewCalculation = false;  // Reset flag on error
  }
}

// Listen for keyboard events
document.addEventListener("keydown", function(event) {
  const key = event.key;

  // Handle number keys
  if (key >= "0" && key <= "9") {
    appendToDisplay(key);
  }
  
  // Handle operator keys
  if (key === "+" || key === "-" || key === "*" || key === "/") {
    appendToDisplay(key);
  }

  // Handle enter/return key for calculation
  if (key === "Enter") {
    calculate();
  }

  // Handle backspace key for deleting last digit
  if (key === "Backspace") {
    deleteDigit();
  }

  // Handle escape key for clearing the display
  if (key === "Escape") {
    clearDisplay();
  }
});

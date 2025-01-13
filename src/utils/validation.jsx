export function useFormAndValidation(name, urlText, isOptionSelected) {
  if (name.length < 2 || urlText.length < 2) {
    return {
      isValid: false,
      message: "Text entries must be at least 2 characters long.",
    };
  } else if (isOptionSelected === false) {
    return {
      isValid: false,
      message: "Please select weather type.",
    };
  }
  try {
    new URL(urlText);
  } catch (e) {
    return { isValid: false, message: "Please enter a valid URL." };
  }

  return { isValid: true, message: "" };
}

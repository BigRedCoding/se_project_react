export function useFormAndValidation(text1, text2, url) {
  if (text1.length < 2 || text2.length < 2) {
    return {
      isValid: false,
      message: "Text entries must be at least 2 characters long.",
    };
  }
  try {
    new URL(url);
  } catch (e) {
    return { isValid: false, message: "Please enter a valid URL." };
  }

  return { isValid: true, message: "" };
}

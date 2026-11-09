/** Strip spaces, dashes, brackets and a leading +91 so only the 10 digits remain. */
export function cleanPhone(value: string): string {
  return value.replace(/[\s\-+()]/g, "").replace(/^91(?=\d{10}$)/, "");
}

/** Indian mobile numbers are 10 digits starting with 6 to 9. */
export function isValidPhone(value: string): boolean {
  return /^[6-9]\d{9}$/.test(cleanPhone(value));
}

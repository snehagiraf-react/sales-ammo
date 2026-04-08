/**
 * Utility function to merge classnames
 * Handles falsy values and combines multiple class strings
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ').trim()
}

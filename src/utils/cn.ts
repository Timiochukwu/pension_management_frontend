/**
 * CLASS NAME UTILITY
 *
 * Merges Tailwind classes without conflicts
 * Uses clsx for conditional classes
 */

import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

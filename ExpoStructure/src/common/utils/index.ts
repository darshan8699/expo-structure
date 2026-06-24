// Utils — pure helper/utility functions used throughout the app

/** Format a date string to a readable format e.g. "24 Jun 2026" */
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

/** Capitalize the first letter of a string */
export const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

/** Truncate a string to a max length with ellipsis */
export const truncate = (str: string, maxLength: number): string =>
  str.length > maxLength ? `${str.slice(0, maxLength)}…` : str;

/** Delay execution for a given number of milliseconds */
export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

/** Check if a value is non-null and non-undefined */
export const isDefined = <T>(value: T | null | undefined): value is T =>
  value !== null && value !== undefined;

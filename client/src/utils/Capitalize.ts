// client/src/utils/capitalize.ts

export const capitalizeWord = (word: string): string => {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

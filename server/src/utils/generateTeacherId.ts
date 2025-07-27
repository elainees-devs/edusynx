// server/src/utils/generateTeacherId.ts

export function generateTeacherId(): string {
 
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const year = new Date().getFullYear().toString().slice(-2);
  return `TCH${year}${randomSuffix}`; // e.g., TCH251234
}

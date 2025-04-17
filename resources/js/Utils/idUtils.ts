let idCounter = 0;

export function generateUniqueId(): string {
  idCounter += 1;
  return `${Date.now()}_${idCounter}`;
}

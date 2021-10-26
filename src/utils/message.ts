export function isValidMessage(message: string | null): boolean {
  if (!message || typeof message !== "string") return false;
  if (message.length < 1) return false;
  if (message.length > 2000) return false;
  return true;
}

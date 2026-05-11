export const WHATSAPP_NUMBER = "918580946251";
export const WHATSAPP_DISPLAY = "+91 85809-46251";

export function whatsappUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

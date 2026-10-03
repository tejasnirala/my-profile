import { SHARE_CARD_SIZE, shareCard, shareCardAlt } from "@/lib/share-card";

// This page's link-preview card (see lib/share-card.tsx).
export const alt = shareCardAlt("about");
export const size = SHARE_CARD_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return shareCard("about");
}

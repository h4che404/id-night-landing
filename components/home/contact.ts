import { type CtaProfile, homepageWhatsappMessages } from "@/components/home/homepage-content";

export type WhatsAppContactConfig = {
  e164: "+5492634616717";
  waMeDigits: "5492634616717";
  source: "sdd/homepage-brand-repositioning/contact-config";
};

export type ContactState = { enabled: true; href: string; profile: CtaProfile };

export const HOMEPAGE_WHATSAPP_CONFIG: WhatsAppContactConfig = {
  e164: "+5492634616717",
  waMeDigits: "5492634616717",
  source: "sdd/homepage-brand-repositioning/contact-config",
};

export function buildHomepageWhatsAppHref(message: string) {
  return `https://wa.me/${HOMEPAGE_WHATSAPP_CONFIG.waMeDigits}?text=${encodeURIComponent(message)}`;
}

export function buildHomepageContact(profile: CtaProfile): ContactState {
  return {
    enabled: true,
    profile,
    href: buildHomepageWhatsAppHref(homepageWhatsappMessages[profile]),
  };
}

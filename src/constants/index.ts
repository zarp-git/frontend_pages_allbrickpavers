export * from "./footer";
export * from "./navigation";
export * from "./services";
export * from "./locations";

// Site configuration
export const SITE_CONFIG = {
	name: "AllBrick Pavers",
	description:
		"AllBrick Pavers - Your paving solution.",
	url: process.env.NEXT_PUBLIC_SITE_URL || "https://allbrickpavers.com",
	logo: "/logo.svg",
} as const;

// Social media links
export const SOCIAL_LINKS = {
	instagram: "https://www.instagram.com/allbrickpavers/",
	facebook:
		"https://www.facebook.com/p/AllBrick-Pavers-61552914309792/",
	googleMaps: "https://maps.app.goo.gl/tMAmQCsBEhpKeMMw9",
} as const;

// Contact information used across the site
export const CONTACT = {
	email: "contato@ponteamericas.com",
	phoneDisplay: "(407) 818-7876",
	phoneHref: "tel:+14078187876",
	phoneRaw: "+14078187876",
	hours: "Mon-Sat: 9:00 AM - 6:00 PM",
} as const;

// Consent & privacy
export const CONSENT_STORAGE_KEY = "pdmi_consent_choice_v2" as const;

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
	email: "allbrickpaving@gmail.com",
	phoneDisplay: "+1 941-284-6466",
	phoneHref: "tel:+19412846466",
	phoneRaw: "+19412846466",
	hours: "Mon-Sat: 9:00 AM - 5:00 PM",
} as const;

// Consent & privacy
export const CONSENT_STORAGE_KEY = "abp_consent_choice_v1" as const;

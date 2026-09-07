export const PHONE_NUMBER = "+966 59 122 3323";
export const PHONE_HREF = "tel:+966591223323";
export const WHATSAPP_HREF = "https://wa.me/966591223323?text=Hello%2C%20I%27d%20like%20to%20enquire%20about%20your%20services.";

export const EMAIL = "letstalk@admonde.com";
export const EMAIL_HREF = "mailto:letstalk@admonde.com";
export const CAREERS_EMAIL = "careers@admonde.com";
export const CAREERS_EMAIL_HREF = "mailto:careers@admonde.com";

export type OfficeLocation = {
  city: string;
  country: string;
  line1: string;
  line2: string;
  mapQuery: string;
};

export const LOCATIONS: OfficeLocation[] = [
  {
    city: "Riyadh",
    country: "Kingdom of Saudi Arabia",
    line1: "Building No. 6744, Alkhashir Street",
    line2: "4270 - Al Sulay District, Postal Code: 14274",
    mapQuery: "Riyadh,Saudi+Arabia",
  },
  {
    city: "Jeddah",
    country: "Kingdom of Saudi Arabia",
    line1: "Al Thuraya, Briman District",
    line2: "Postal Code: 23647",
    mapQuery: "Al+Thuraya,Briman,Jeddah,Saudi+Arabia",
  },
];

// Backward-compatible single-address exports — the Riyadh HQ (first location).
export const ADDRESS_LINE1 = LOCATIONS[0].line1;
export const ADDRESS_LINE2 = LOCATIONS[0].line2;
export const ADDRESS_CITY = LOCATIONS[0].city;
export const ADDRESS_COUNTRY = LOCATIONS[0].country;
export const ADDRESS = `${ADDRESS_LINE1}, ${ADDRESS_LINE2}, ${ADDRESS_CITY}, ${ADDRESS_COUNTRY}`;

export const BUSINESS_HOURS = "Sat – Thu: 9:00 AM – 7:00 PM";

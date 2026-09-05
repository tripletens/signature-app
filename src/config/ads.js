/**
 * Advertising & Sponsorship Configuration
 */
export const ADSENSE_CONFIG = {
  // Google AdSense Publisher ID (e.g. 'ca-pub-1234567890123456')
  client: 'ca-pub-XXXXXXXXXXXXXXXX',

  // Mode: 'google' | 'custom' | 'call_for_ads'
  mode: 'custom', 

  slots: {
    topBanner: '1234567890',
    bottomBanner: '0987654321',
  },
};

/**
 * Custom Sponsorship & Affiliate Ad Units
 * You can put your own affiliate link, partner product, or direct advertiser here.
 */
export const CUSTOM_SPONSOR_CONFIG = {
  enabled: true,
  sponsor: {
    name: 'DocuSign Alternative Pro',
    tagline: 'Send & Sign Legally Binding Contracts with 1-Click Workflow',
    ctaText: 'Start Free Trial',
    ctaUrl: '#', // Replace with your affiliate or partner link
    badge: 'Featured Partner',
  },
  
  // Call for Advertisers / Contact Info
  advertiseWithUs: {
    contactEmail: 'info@lythubtechnologies.com',
    monthlyImpressions: '50,000+',
    targetAudience: 'Freelancers, Legal, Real Estate & Remote Teams',
  },
};

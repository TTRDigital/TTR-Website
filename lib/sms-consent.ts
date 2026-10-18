/**
 * SMS consent wording for the lead forms (Twilio A2P 10DLC). The form shows
 * this exact text and every lead records which version the person saw, so
 * change the text only together with a new version.
 */
export const SMS_CONSENT_VERSION = "2026-10-18";

export const SMS_CONSENT = {
  service:
    "I agree to receive SMS messages from TTR Digital Marketing about my inquiry, consultation scheduling, appointment reminders, and service updates. Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for help.",
  marketing:
    "I agree to receive recurring automated promotional and marketing text messages from TTR Digital Marketing at the number provided. Consent is not a condition of purchase. Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for help.",
} as const;

export type SmsConsentType = keyof typeof SMS_CONSENT;

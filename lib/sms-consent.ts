/**
 * SMS consent wording for the lead forms (Twilio A2P 10DLC). This must match,
 * word for word, the opt-in described in the Twilio registration. Every lead
 * records which version the person saw, so change the text only together with
 * a new version. The form adds links to the Privacy Policy and Terms after it.
 */
export const SMS_CONSENT_VERSION = "2026-11-08";

/** Shown before the "See our Privacy Policy and Terms." sentence. */
export const SMS_CONSENT_TEXT =
  "I agree to receive text messages from TTR Digital Marketing about my inquiry and our services. Message frequency varies. Message and data rates may apply. Reply STOP to cancel, HELP for help. Consent is not a condition of purchase.";

/** The full wording as shown, saved with each consent. */
export const SMS_CONSENT_FULL_TEXT = `${SMS_CONSENT_TEXT} See our Privacy Policy and Terms.`;

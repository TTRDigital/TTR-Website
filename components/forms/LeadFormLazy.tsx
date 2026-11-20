"use client";

import dynamic from "next/dynamic";

/*
 * The lead form in its own script chunk, for the CTA band at the bottom of
 * pages. It is still rendered on the server, so the HTML is the same; only
 * its JavaScript (form logic and reCAPTCHA loader) leaves the first-load
 * bundle and hydrates separately. The contact page, where the form is above
 * the fold, imports LeadForm directly.
 */
export const LeadFormLazy = dynamic(() => import("./LeadForm").then((m) => m.LeadForm));

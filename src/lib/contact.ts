export interface ContactPayload {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  message: string;
}

export interface SubmitResult {
  method: 'endpoint' | 'email';
  email?: string;
}

const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;
const EMAIL = (import.meta.env.VITE_CONTACT_EMAIL as string | undefined) || 'hello@3variant.com';

/**
 * Delivers the contact form through the configured channel:
 *  1. POST JSON to VITE_CONTACT_ENDPOINT (Formspree, Zapier, custom API, etc.).
 *  2. Fallback: open the visitor's mail client addressed to the contact email.
 */
export async function submitContact(data: ContactPayload): Promise<SubmitResult> {
  if (ENDPOINT) {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error('The server could not accept your message. Please try again, or email us directly.');
    }

    return { method: 'endpoint' };
  }

  const subject = encodeURIComponent(`New project inquiry from ${data.name}`);
  const body = encodeURIComponent(
    [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Company: ${data.company || '—'}`,
      `Project Type: ${data.projectType || '—'}`,
      `Estimated Budget: ${data.budget || '—'}`,
      '',
      data.message,
    ].join('\n')
  );

  window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  return { method: 'email', email: EMAIL };
}
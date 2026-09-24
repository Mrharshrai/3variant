import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { submitContact } from '../lib/contact';
import './Contact.css';

const projectTypes = [
  'Web Application',
  'Mobile App',
  'AI / Automation',
  'Cloud Infrastructure',
  'CRM / CMS',
  'Full Product Build',
  'Consulting',
  'Other',
];

interface FormData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const ref = useScrollReveal();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [sentVia, setSentVia] = useState<'endpoint' | 'email' | null>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!formData.message.trim() || formData.message.length < 20) {
      newErrors.message = 'Please describe your project (at least 20 characters)';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setSubmitError('');
    try {
      const result = await submitContact(formData);
      setSentVia(result.method);
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section contact-section" ref={ref as React.RefObject<HTMLElement>}>
      <div className="orb orb-blue contact-orb-1" aria-hidden="true" />
      <div className="orb orb-cyan contact-orb-2" aria-hidden="true" />

      <div className="container">
        <div className="contact-layout">
          {/* Left Info */}
          <div className="contact-info reveal">
            <span className="section-label">Let's Build Together</span>
            <h2 className="section-title">
              Start Your<br />
              <span className="title-accent">Next Project</span>
            </h2>
            <p className="section-sub">
              Tell us about your idea. We'll get back to you within 24 hours with a thoughtful response and a clear next step.
            </p>

            <div className="contact-details">
              <div className="contact-detail-item">
                <div className="contact-detail-icon">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M3 4.5C3 3.67 3.67 3 4.5 3h9C14.33 3 15 3.67 15 4.5v9c0 .83-.67 1.5-1.5 1.5h-9C3.67 15 3 14.33 3 13.5v-9zM3 6.5h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M7 10l2 2 2-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <span className="detail-label">Email</span>
                  <a href="mailto:hello@3variant.com" className="detail-value">hello@3variant.com</a>
                </div>
              </div>
              <div className="contact-detail-item">
                <div className="contact-detail-icon">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M9 2C5.69 2 3 4.69 3 8c0 4.5 6 9 6 9s6-4.5 6-9c0-3.31-2.69-6-6-6z" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>
                <div>
                  <span className="detail-label">Location</span>
                  <span className="detail-value">Remote-first · Global</span>
                </div>
              </div>
              <div className="contact-detail-item">
                <div className="contact-detail-icon">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M9 5v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <span className="detail-label">Response Time</span>
                  <span className="detail-value">Within 24 hours</span>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="contact-socials">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub" id="contact-github">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 0C4.48 0 0 4.48 0 10c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.7C4.73 17.9 4.14 16 4.14 16c-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0110 4.84c.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0020 10C20 4.48 15.52 0 10 0z" />
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn" id="contact-linkedin">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M4.5 7H2v11h2.5V7zM3.25 5.75a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM18 12.5c0-2.76-1.34-4-3.5-4-1.06 0-2 .5-2.5 1V7H9.5v11H12v-5.5c0-1.1.9-2 2-2s2 .9 2 2V18H18v-5.5z" />
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter/X" id="contact-twitter">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M15.18 1.5h2.68L11.6 8.77 19 18.5h-5.57l-4.5-5.88L3.73 18.5H1.05l6.64-7.59L1 1.5h5.7l4.07 5.38L15.18 1.5zm-.94 15.3h1.49L5.83 3.01H4.24l9.99 13.79z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Form */}
          <div className="contact-form-wrap reveal reveal-delay-2">
            {submitted ? (
              <div className="form-success glass-card">
                <div className="success-icon" aria-hidden="true">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="23" stroke="url(#sg)" strokeWidth="2" />
                    <path d="M14 24l7 7L34 17" stroke="url(#sg2)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <defs>
                      <linearGradient id="sg" x1="1" y1="1" x2="47" y2="47" gradientUnits="userSpaceOnUse">
                         <stop stopColor="#b8652e" /><stop offset="1" stopColor="#0d7377" />
                      </linearGradient>
                      <linearGradient id="sg2" x1="14" y1="17" x2="34" y2="31" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#b8652e" /><stop offset="1" stopColor="#0d7377" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <h3 className="success-title">Message Sent!</h3>
                <p className="success-text">
                  {sentVia === 'email'
                    ? 'Your email app should have opened with your message ready to send. If it didn\'t, reach out to us directly at hello@3variant.com.'
                    : 'Thanks for reaching out. We\'ll review your project and get back to you within 24 hours.'}
                </p>
              </div>
            ) : (
              <form
                className="contact-form glass-card"
                onSubmit={handleSubmit}
                noValidate
                aria-label="Contact form"
              >
                <div className="form-row">
                  <div className={`form-group ${errors.name ? 'error' : ''}`}>
                    <label htmlFor="contact-name" className="form-label">Name *</label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="form-input"
                      autoComplete="name"
                    />
                    {errors.name && <span className="form-error" role="alert">{errors.name}</span>}
                  </div>
                  <div className={`form-group ${errors.email ? 'error' : ''}`}>
                    <label htmlFor="contact-email" className="form-label">Email *</label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      className="form-input"
                      autoComplete="email"
                    />
                    {errors.email && <span className="form-error" role="alert">{errors.email}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contact-company" className="form-label">Company</label>
                    <input
                      id="contact-company"
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your company name"
                      className="form-input"
                      autoComplete="organization"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-project-type" className="form-label">Project Type</label>
                    <select
                      id="contact-project-type"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="form-input form-select"
                    >
                      <option value="">Select a category</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-budget" className="form-label">Estimated Budget</label>
                  <select
                    id="contact-budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="form-input form-select"
                  >
                    <option value="">Select range (optional)</option>
                    <option value="< $10K">Under $10K</option>
                    <option value="$10K–$25K">$10K – $25K</option>
                    <option value="$25K–$75K">$25K – $75K</option>
                    <option value="$75K+">$75K+</option>
                    <option value="TBD">Let's discuss</option>
                  </select>
                </div>

                <div className={`form-group ${errors.message ? 'error' : ''}`}>
                  <label htmlFor="contact-message" className="form-label">Tell us about your project *</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your idea, goals, and any relevant context..."
                    className="form-input form-textarea"
                    rows={5}
                  />
                  {errors.message && <span className="form-error" role="alert">{errors.message}</span>}
                </div>

                {submitError && (
                  <div className="form-submit-error" role="alert" aria-live="polite">
                    {submitError}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary form-submit"
                  disabled={loading}
                  id="contact-submit"
                >
                  {loading ? (
                    <>
                      <span className="submit-spinner" aria-hidden="true" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M2 8h12M10 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

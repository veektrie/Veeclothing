'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa6';
import { FaFacebookF } from 'react-icons/fa';

type ServiceType = 'corporate' | 'individual';
type FormData = {
  name: string;
  email: string;
  phone: string;
  organisation?: string;
  scale?: string;
  occasion?: string;
  message: string;
};

const corporateScales = [
  'Select size…',
  'Personal Wardrobe',
  'Small Team (5–20)',
  'Medium Team (20–100)',
  'Large Team (100+)',
  'Business Gifts',
  'Style Advice',
];

const Field = ({
  id, label, error, children,
}: {
  id: string; label: string; error?: boolean; children: React.ReactNode;
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    <label
      htmlFor={id}
      className="font-metro contact-field-label"
      style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase' }}
    >
      {label}{error && <span style={{ color: 'rgba(26, 82, 118, 0.9)', marginLeft: 8 }}>Required</span>}
    </label>
    {children}
  </div>
);

const Contact = () => {
  const [serviceType, setServiceType] = useState<ServiceType>('corporate');
  const [submitted, setSubmitted]     = useState(false);
  const [sending, setSending]         = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setSending(true);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: 'c29917fd-1140-4608-84ba-316b31b4404e',
          subject: `New ${serviceType.charAt(0).toUpperCase() + serviceType.slice(1)} Consultation Request`,
          from_name: data.name,
          ...data,
          serviceType,
        }),
      });
      const result = await res.json();
      if (result.success) { setSubmitted(true); reset(); }
      else { console.error('Submission failed', result); setSubmitted(true); }
    } catch (err) {
      console.error('Form submission error:', err);
      setSubmitted(true);
    } finally {
      setSending(false);
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = '#1A5276';
    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(26,82,118,0.08)';
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = '';
    e.currentTarget.style.boxShadow = 'none';
  };

  return (
    <section id="consultation" className="contact-section">
      {/* Ambient navy glow */}
      <div style={{
        position: 'absolute', bottom: '-300px', right: '-200px',
        width: 700, height: 700,
        background: 'radial-gradient(circle, rgba(26, 82, 118, 0.04) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 clamp(1.5rem, 5vw, 4rem)' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="contact-heading">
            Get in{' '}
            <em style={{ color: '#1A5276', fontStyle: 'normal' }}>Touch.</em>
          </h2>
          <p className="font-metro contact-subtext">
            We'll get back to you within 24 hours. A real person will answer your message.
          </p>
        </div>

        {/* ── SERVICE TYPE TOGGLE & FORM CONTAINER ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="contact-card"
        >
          {/* Toggle Area */}
          <div style={{ marginBottom: '2.5rem' }}>
            <p className="font-metro" style={{
              fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase',
              color: 'rgba(26, 82, 118, 0.7)', marginBottom: 12, fontWeight: 700
            }}>
              Select Service
            </p>
            <div className="inline-flex flex-wrap border border-black/5 p-1 bg-black/[0.02] rounded-xl gap-1">
              {(['corporate', 'individual'] as ServiceType[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setServiceType(t)}
                  className={`px-6 py-2.5 text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 rounded-lg whitespace-nowrap ${
                    serviceType === t ? 'bg-[#1A5276]/10 text-[#1A5276] border border-[#1A5276]/20' : 'text-black/40 hover:text-black/60 dark:text-white/30 dark:hover:text-white/60'
                  }`}
                >
                  {t === 'corporate' ? 'Corporate' : 'Individual'}
                </button>
              ))}
            </div>
          </div>

          {submitted ? (
            <div style={{ padding: '2rem 0', textAlign: 'center', animation: 'fadeIn 0.6s ease' }}>
              <div style={{ marginBottom: 30 }}>
                <div style={{
                  width: 64, height: 64, borderRadius: '50%', background: 'rgba(26, 82, 118, 0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto'
                }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1A5276" strokeWidth="1.5">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <h3 className="font-kento contact-success-heading">
                Message <em style={{ color: '#1A5276' }}>Sent.</em>
              </h3>
              <p className="font-metro contact-subtext" style={{ maxWidth: 420, margin: '0 auto 32px' }}>
                Thanks for contacting us. We'll get back to you within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="contact-return-btn"
              >
                Return to Form
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

              {/* Name row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'clamp(20px, 4vw, 32px)' }}>
                <Field id="name" label="Full Name" error={!!errors.name}>
                  <input id="name" {...register('name', { required: true })}
                    placeholder="Full Name"
                    className="contact-input"
                    onFocus={handleFocus} onBlur={handleBlur}
                  />
                </Field>
                <Field id="phone" label="Phone Number" error={!!errors.phone}>
                  <input id="phone" {...register('phone', { required: true })}
                    placeholder="+234..."
                    className="contact-input"
                    onFocus={handleFocus} onBlur={handleBlur}
                  />
                </Field>
              </div>

              <Field id="email" label="Email Address" error={!!errors.email}>
                <input id="email" type="email" {...register('email', { required: true })}
                  placeholder="name@email.com"
                  className="contact-input"
                  onFocus={handleFocus} onBlur={handleBlur}
                />
              </Field>

              {/* Conditional fields */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'clamp(20px, 4vw, 32px)' }}>
                {serviceType === 'corporate' ? (
                  <>
                    <Field id="organisation" label="Organisation">
                      <input id="organisation" {...register('organisation')}
                        placeholder="Company Name"
                        className="contact-input"
                        onFocus={handleFocus} onBlur={handleBlur}
                      />
                    </Field>
                    <Field id="scale" label="Scale" error={!!errors.scale}>
                      <select id="scale" {...register('scale', { required: true })}
                        className="contact-input"
                        onFocus={handleFocus} onBlur={handleBlur}
                        style={{ appearance: 'none', cursor: 'pointer' }}
                      >
                        {corporateScales.map((s) => (
                          <option key={s} value={s === corporateScales[0] ? '' : s}
                            disabled={s === corporateScales[0]}
                            className="contact-option">
                            {s}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </>
                ) : (
                  <Field id="occasion" label="Occasion">
                    <input id="occasion" {...register('occasion')}
                      placeholder="e.g. Bespoke Agbada, Wedding Suit"
                      className="contact-input"
                      onFocus={handleFocus} onBlur={handleBlur}
                    />
                  </Field>
                )}
              </div>

              <Field id="message" label="Your Message" error={!!errors.message}>
                <textarea id="message" {...register('message', { required: true })}
                  rows={4}
                  placeholder="Tell us what you need..."
                  className="contact-input"
                  style={{ resize: 'none' }}
                  onFocus={handleFocus} onBlur={handleBlur}
                />
              </Field>

              <button
                type="submit"
                disabled={sending}
                className="contact-submit-btn"
                style={{ opacity: sending ? 0.7 : 1 }}
                onMouseEnter={e => { if (!sending) { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; }}}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
              >
                {sending ? 'Sending…' : 'Send Message'}
              </button>

            </form>
          )}
        </motion.div>

        {/* ── Contact & Socials strip ── */}
        <div className="contact-footer-strip">
          <div className="contact-info-items">
            {[
              { label: 'WhatsApp', value: '+234 810 303 1020', href: 'https://wa.me/2348103031020' },
              { label: 'Instagram', value: '@veeclothingcompany', href: 'https://instagram.com/veeclothingcompany' },
              { label: 'Location', value: 'Lagos, Nigeria', href: '#' },
            ].map((c) => (
              <div key={c.label}>
                <span className="font-metro contact-info-label">{c.label}</span>
                <Link href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined}
                  className="contact-info-value"
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#1A5276'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = ''; }}
                >
                  {c.value}
                </Link>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            {[
              { icon: <FaFacebookF />, href: 'https://facebook.com/veeclothingcompany' },
              { icon: <FaInstagram />, href: 'https://instagram.com/veeclothingcompany' },
              { icon: <FaWhatsapp />,  href: 'https://wa.me/c/2348103031020' },
            ].map((s, i) => (
              <Link key={i} href={s.href} target="_blank" rel="noopener noreferrer">
                <div className="social-icon-luxury">{s.icon}</div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;

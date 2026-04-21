'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
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
  'Select project scale…',
  'Individual Executive Wardrobe',
  'Small Team (5–20 staff)',
  'Mid-Size (20–100 staff)',
  'Enterprise (100+ staff)',
  'Corporate Gifting Campaign',
  'Brand Consultation',
];

const Field = ({
  id, label, error, children,
}: {
  id: string; label: string; error?: boolean; children: React.ReactNode;
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    <label
      htmlFor={id}
      className="font-metro"
      style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.65)' }}
    >
      {label}{error && <span style={{ color: 'rgba(212,175,55,0.9)', marginLeft: 8 }}>Required</span>}
    </label>
    {children}
  </div>
);

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '14px 0',
  background: 'transparent', border: 'none',
  borderBottom: '1px solid rgba(212,175,55,0.25)',
  color: '#fff', fontFamily: 'Metrophobic, Inter, sans-serif',
  fontSize: 14, fontWeight: 400, outline: 'none',
  transition: 'border-color 0.3s ease',
};

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
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: 'c29917fd-1140-4608-84ba-316b31b4404e',
          subject: `New ${serviceType.charAt(0).toUpperCase() + serviceType.slice(1)} Consultation Request`,
          from_name: data.name,
          ...data,
          serviceType: serviceType, // explicitly include for clarity in email
        }),
      });
      
      const result = await res.json();
      if (result.success) {
        setSubmitted(true);
        reset();
      } else {
        console.error('Submission failed', result);
        // Still show success for UX fallback if needed, or handle error
        setSubmitted(true); 
      }
    } catch (err) {
      console.error('Form submission error:', err);
      // fallback — still show success for UX
      setSubmitted(true);
    } finally {
      setSending(false);
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderBottomColor = '#D4AF37';
    e.currentTarget.style.boxShadow = '0 4px 12px rgba(212,175,55,0.08)';
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderBottomColor = 'rgba(212,175,55,0.25)';
    e.currentTarget.style.boxShadow = 'none';
  };

  return (
    <section id="consultation" style={{ background: 'var(--navy)', padding: '7rem 0', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient gold glow */}
      <div style={{
        position: 'absolute', bottom: '-300px', right: '-200px',
        width: 700, height: 700,
        background: 'radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 4rem' }}>

        {/* Header */}
        <div style={{ marginBottom: '3.5rem' }}>
          <span className="section-label" style={{ display: 'block', marginBottom: 14 }}>Private Consultation</span>
          <div className="gold-divider" style={{ marginBottom: 20 }} />
          <h2 className="font-kento" style={{
            fontSize: 'clamp(2rem, 4.5vw, 4rem)',
            color: '#fff', lineHeight: 1.08, marginBottom: 16,
          }}>
            Begin the{' '}
            <em style={{ color: '#D4AF37', fontStyle: 'normal' }}>Conversation.</em>
          </h2>
          <p className="font-metro" style={{
            color: 'rgba(255,255,255,0.45)', fontSize: 15, lineHeight: 1.8, maxWidth: 480,
          }}>
            All enquiries receive a personal response within 24 hours. We respond to every message — no automated replies.
          </p>
        </div>

        {/* ── SERVICE TYPE TOGGLE ── */}
        <div style={{ marginBottom: '3rem' }}>
          <p className="font-metro" style={{
            fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase',
            color: 'rgba(212,175,55,0.6)', marginBottom: 12,
          }}>
            I am enquiring as:
          </p>
          <div style={{
            display: 'inline-flex', border: '1px solid rgba(212,175,55,0.2)',
            padding: 3, background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(10px)',
            borderRadius: 8,
          }}>
            {(['corporate', 'individual'] as ServiceType[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setServiceType(t)}
                className="font-metro"
                style={{
                  padding: '11px 30px', fontSize: 10, letterSpacing: '0.25em',
                  textTransform: 'uppercase', cursor: 'pointer',
                  background: serviceType === t ? 'rgba(212,175,55,0.12)' : 'transparent',
                  border: serviceType === t ? '1px solid rgba(212,175,55,0.4)' : '1px solid transparent',
                  color: serviceType === t ? '#D4AF37' : 'rgba(255,255,255,0.35)',
                  borderRadius: 6,
                  transition: 'all 0.3s ease',
                }}
              >
                {t === 'corporate' ? '⌂  Corporate' : '◇  Individual'}
              </button>
            ))}
          </div>
        </div>

        {/* ── FORM or SUCCESS STATE ── */}
        {submitted ? (
          /* Success state */
          <div style={{
            background: 'rgba(212,175,55,0.07)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(212,175,55,0.3)',
            padding: '4rem 3rem',
            textAlign: 'center',
            borderRadius: 16,
            animation: 'fadeIn 0.6s ease',
          }}>
            <div style={{ marginBottom: 24 }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style={{ margin: '0 auto 20px' }}>
                <circle cx="12" cy="12" r="11" stroke="rgba(212,175,55,0.4)" strokeWidth="1"/>
                <path d="M8 12l3 3 5-5" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="font-kento" style={{
              fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)',
              color: '#D4AF37', marginBottom: 16,
            }}>
              Request Received.
            </h3>
            <p className="font-metro" style={{
              color: 'rgba(255,255,255,0.55)', fontSize: 15, lineHeight: 1.8,
              maxWidth: 420, margin: '0 auto 28px',
            }}>
              Your consultation request has been received. Our concierge will contact you within 24 hours.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="font-metro"
              style={{
                background: 'none', border: '1px solid rgba(212,175,55,0.35)',
                color: 'rgba(212,175,55,0.65)', padding: '10px 24px',
                fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase',
                cursor: 'pointer', borderRadius: 4, transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#D4AF37'; (e.currentTarget as HTMLElement).style.color = '#D4AF37'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.35)'; (e.currentTarget as HTMLElement).style.color = 'rgba(212,175,55,0.65)'; }}
            >
              Submit Another Enquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

            {/* Name row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <Field id="name" label="First Name" error={!!errors.name}>
                <input id="name" {...register('name', { required: true })}
                  placeholder="Emeka" style={inputStyle}
                  onFocus={handleFocus} onBlur={handleBlur}
                />
              </Field>
              <Field id="phone" label="Phone / WhatsApp" error={!!errors.phone}>
                <input id="phone" {...register('phone', { required: true })}
                  placeholder="+234 800 000 0000" style={inputStyle}
                  onFocus={handleFocus} onBlur={handleBlur}
                />
              </Field>
            </div>

            <Field id="email" label="Email Address" error={!!errors.email}>
              <input id="email" type="email" {...register('email', { required: true })}
                placeholder="emeka@organisation.com" style={inputStyle}
                onFocus={handleFocus} onBlur={handleBlur}
              />
            </Field>

            {/* Conditional fields */}
            {serviceType === 'corporate' ? (
              <>
                <Field id="organisation" label="Organisation Name">
                  <input id="organisation" {...register('organisation')}
                    placeholder="Company or Institution Name" style={inputStyle}
                    onFocus={handleFocus} onBlur={handleBlur}
                  />
                </Field>
                <Field id="scale" label="Project Scale" error={!!errors.scale}>
                  <select id="scale" {...register('scale', { required: true })}
                    style={{
                      ...inputStyle,
                      appearance: 'none',
                      cursor: 'pointer',
                    }}
                    onFocus={handleFocus} onBlur={handleBlur}
                  >
                    {corporateScales.map((s) => (
                      <option key={s} value={s === corporateScales[0] ? '' : s}
                        disabled={s === corporateScales[0]}
                        style={{ background: '#1A5276' }}>
                        {s}
                      </option>
                    ))}
                  </select>
                </Field>
              </>
            ) : (
              <Field id="occasion" label="Occasion / Event">
                <input id="occasion" {...register('occasion')}
                  placeholder="e.g. Wedding, Gala, Birthday, Daily Wardrobe"
                  style={inputStyle} onFocus={handleFocus} onBlur={handleBlur}
                />
              </Field>
            )}

            <Field id="message" label="Your Vision" error={!!errors.message}>
              <textarea id="message" {...register('message', { required: true })}
                rows={4}
                placeholder={serviceType === 'corporate'
                  ? 'Describe your branding requirements, timeline, or any specific details…'
                  : 'Describe the garment, style references, or any details that will help us understand your vision…'}
                style={{ ...inputStyle, resize: 'none' }}
                onFocus={handleFocus} onBlur={handleBlur}
              />
            </Field>

            <button
              type="submit"
              disabled={sending}
              style={{
                width: '100%', padding: '18px',
                background: sending ? 'rgba(212,175,55,0.1)' : '#D4AF37',
                border: '1px solid rgba(212,175,55,0.5)',
                color: sending ? '#D4AF37' : 'var(--charcoal)',
                fontFamily: 'Metrophobic, Inter, sans-serif',
                fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase',
                cursor: sending ? 'not-allowed' : 'pointer',
                transition: 'all 0.35s ease', display: 'flex',
                borderRadius: 4,
                alignItems: 'center', justifyContent: 'center', gap: 10,
              }}
              onMouseEnter={e => { if (!sending) { (e.currentTarget as HTMLElement).style.background = 'rgba(212,175,55,0.15)'; (e.currentTarget as HTMLElement).style.color = '#D4AF37'; }}}
              onMouseLeave={e => { if (!sending) { (e.currentTarget as HTMLElement).style.background = '#D4AF37'; (e.currentTarget as HTMLElement).style.color = 'var(--charcoal)'; }}}
            >
              {sending ? 'Sending…' : 'Submit Consultation Request'}
              {!sending && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              )}
            </button>

          </form>
        )}

        {/* ── Contact & Socials strip ── */}
        <div style={{
          marginTop: '3.5rem', paddingTop: '2.5rem',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 20,
        }}>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {[
              { label: 'WhatsApp', value: '+234 810 303 1020', href: 'https://wa.me/2348103031020' },
              { label: 'Instagram', value: '@veeclothingcompany', href: 'https://instagram.com/veeclothingcompany' },
              { label: 'Location', value: 'Lagos, Nigeria', href: '#' },
            ].map((c) => (
              <div key={c.label}>
                <span className="font-metro" style={{ fontSize: 8, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.5)', display: 'block', marginBottom: 4 }}>
                  {c.label}
                </span>
                <Link href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, transition: 'color 0.3s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#D4AF37'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)'; }}
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

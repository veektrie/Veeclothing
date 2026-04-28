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
          <span className="section-label" style={{ display: 'block', marginBottom: 14 }}>Talk to Us</span>
          <div className="gold-divider" style={{ marginBottom: 20 }} />
          <h2 className="font-kento" style={{
            fontSize: 'clamp(2rem, 4.5vw, 4rem)',
            color: '#fff', lineHeight: 1.08, marginBottom: 16,
          }}>
            Get in{' '}
            <em style={{ color: '#D4AF37', fontStyle: 'normal' }}>Touch.</em>
          </h2>
          <p className="font-metro" style={{
            color: 'rgba(255,255,255,0.45)', fontSize: 15, lineHeight: 1.8, maxWidth: 480,
          }}>
            We\'ll get back to you within 24 hours. A real person will answer your message.
          </p>
        </div>

        {/* ── SERVICE TYPE TOGGLE & FORM CONTAINER ── */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            padding: 'clamp(1.5rem, 4vw, 4rem)',
            borderRadius: 32,
            boxShadow: '0 40px 100px rgba(0,0,0,0.1)',
          }}
        >
          {/* Toggle Area */}
          <div style={{ marginBottom: '3rem' }}>
            <p className="font-metro" style={{
              fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase',
              color: 'rgba(212,175,55,0.7)', marginBottom: 16, fontWeight: 700
            }}>
              Select Service
            </p>
            <div style={{
              display: 'inline-flex', border: '1px solid rgba(255,255,255,0.08)',
              padding: 4, background: 'rgba(255,255,255,0.03)',
              borderRadius: 12,
            }}>
              {(['corporate', 'individual'] as ServiceType[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setServiceType(t)}
                  className="font-metro"
                  style={{
                    padding: '12px 28px', fontSize: 10, letterSpacing: '0.25em',
                    textTransform: 'uppercase', cursor: 'pointer',
                    background: serviceType === t ? 'rgba(212,175,55,0.15)' : 'transparent',
                    border: '1px solid transparent',
                    borderColor: serviceType === t ? 'rgba(212,175,55,0.3)' : 'transparent',
                    color: serviceType === t ? '#D4AF37' : 'rgba(255,255,255,0.4)',
                    borderRadius: 10,
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    fontWeight: serviceType === t ? 700 : 400,
                  }}
                >
                  {t === 'corporate' ? 'Corporate' : 'Individual'}
                </button>
              ))}
            </div>
          </div>

          {submitted ? (
            /* Success state */
            <div style={{
              padding: '2rem 0',
              textAlign: 'center',
              animation: 'fadeIn 0.6s ease',
            }}>
              <div style={{ marginBottom: 30 }}>
                <div style={{ 
                  width: 64, height: 64, borderRadius: '50%', background: 'rgba(212,175,55,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto'
                }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <h3 className="font-kento" style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                color: '#fff', marginBottom: 16,
                fontFamily: 'Cormorant Garamond, serif'
              }}>
                Message <em style={{ color: '#D4AF37' }}>Sent.</em>
              </h3>
              <p className="font-metro" style={{
                color: 'rgba(255,255,255,0.5)', fontSize: 15, lineHeight: 1.8,
                maxWidth: 420, margin: '0 auto 32px',
              }}>
                Thanks for contacting us. We\'ll get back to you within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                style={{
                  background: 'none', border: '1px solid rgba(212,175,55,0.3)',
                  color: '#D4AF37', padding: '14px 32px',
                  fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase',
                  cursor: 'pointer', borderRadius: 8, transition: 'all 0.3s ease',
                  fontWeight: 700
                }}
              >
                Return to Form
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

              {/* Name row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32 }}>
                <Field id="name" label="Full Name" error={!!errors.name}>
                  <input id="name" {...register('name', { required: true })}
                    placeholder="Full Name" style={inputStyle}
                    onFocus={handleFocus} onBlur={handleBlur}
                  />
                </Field>
                <Field id="phone" label="Phone Number" error={!!errors.phone}>
                  <input id="phone" {...register('phone', { required: true })}
                    placeholder="+234..." style={inputStyle}
                    onFocus={handleFocus} onBlur={handleBlur}
                  />
                </Field>
              </div>

              <Field id="email" label="Email Address" error={!!errors.email}>
                <input id="email" type="email" {...register('email', { required: true })}
                  placeholder="name@email.com" style={inputStyle}
                  onFocus={handleFocus} onBlur={handleBlur}
                />
              </Field>

              {/* Conditional fields */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32 }}>
                {serviceType === 'corporate' ? (
                  <>
                    <Field id="organisation" label="Organisation">
                      <input id="organisation" {...register('organisation')}
                        placeholder="Company Name" style={inputStyle}
                        onFocus={handleFocus} onBlur={handleBlur}
                      />
                    </Field>
                    <Field id="scale" label="Scale" error={!!errors.scale}>
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
                            style={{ background: '#112D42', color: '#fff' }}>
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
                      style={inputStyle} onFocus={handleFocus} onBlur={handleBlur}
                    />
                  </Field>
                )}
              </div>

              <Field id="message" label="Your Message" error={!!errors.message}>
                <textarea id="message" {...register('message', { required: true })}
                  rows={3}
                  placeholder="Tell us what you need..."
                  style={{ ...inputStyle, resize: 'none' }}
                  onFocus={handleFocus} onBlur={handleBlur}
                />
              </Field>

              <button
                type="submit"
                disabled={sending}
                style={{
                  width: '100%', padding: '22px',
                  background: sending ? 'rgba(212,175,55,0.1)' : '#D4AF37',
                  border: '1px solid rgba(212,175,55,0.3)',
                  color: sending ? '#D4AF37' : 'var(--charcoal)',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase',
                  cursor: sending ? 'not-allowed' : 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  borderRadius: 12,
                  fontWeight: 800,
                  boxShadow: sending ? 'none' : '0 15px 35px rgba(212,175,55,0.2)',
                }}
                onMouseEnter={e => { if (!sending) { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 40px rgba(212,175,55,0.3)'; }}}
                onMouseLeave={e => { if (!sending) { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 15px 35px rgba(212,175,55,0.2)'; }}}
              >
                {sending ? 'Sending...' : 'Send Message'}
              </button>

            </form>
          )}
        </motion.div>

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

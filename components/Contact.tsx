'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { FaInstagram, FaWhatsapp, FaXTwitter } from 'react-icons/fa6';
import { FaFacebookF } from 'react-icons/fa';
import Link from 'next/link';
import { motion } from 'framer-motion';

const projectScales = [
  'Individual Bespoke Commission',
  'Corporate Uniform (1–20 staff)',
  'Corporate Uniform (20–100 staff)',
  'Corporate Uniform (100+ staff)',
  'Executive Wardrobe Programme',
  'Corporate Gifting Campaign',
  'Other',
];

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const onSubmit = async (data: any) => {
    setFormSubmitted(true);
    try {
      const response = await fetch('https://formspree.io/f/xwkdbnav', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        toast.success('Your consultation request has been received. We will be in touch within 24 hours.', {
          duration: 5000,
          style: {
            background: '#1C1C1E',
            color: '#FAF8F5',
            border: '1px solid rgba(212,175,55,0.3)',
            fontSize: '13px',
            letterSpacing: '0.03em',
          },
        });
        reset();
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch (e) {
      toast.error('Submission failed. Please try WhatsApp instead.');
    } finally {
      setFormSubmitted(false);
    }
  };

  const socials = [
    { icon: <FaFacebookF />, href: 'https://facebook.com/veeclothingcompany' },
    { icon: <FaXTwitter />,   href: 'http://x.com/Veeclothingcomp' },
    { icon: <FaInstagram />,  href: 'https://instagram.com/veeclothingcompany' },
    { icon: <FaWhatsapp />,   href: 'https://wa.me/c/2348103031020' },
  ];

  return (
    <section className="consultation-section" id="consultation">
      <Toaster position="top-right" />
      <div className="consultation-inner">

        {/* LEFT — Context */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <span className="section-label">Private Consultation</span>
          <div className="gold-divider my-5" />

          <h2
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2.2rem, 4vw, 4rem)',
              color: '#fff',
              fontWeight: 400,
              lineHeight: 1.1,
              marginBottom: 24,
            }}
          >
            Begin the<br />
            <em style={{ color: '#D4AF37', fontStyle: 'italic' }}>Conversation.</em>
          </h2>

          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, lineHeight: 1.9, fontWeight: 300, maxWidth: 380, marginBottom: 40 }}>
            Whether you are outfitting an organisation of 200 or commissioning a single statement suit — your enquiry deserves a considered response. We respond to all requests within 24 hours.
          </p>

          {/* Contact details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
            {[
              { label: 'WhatsApp',  value: '+234 810 303 1020', href: 'https://wa.me/2348103031020' },
              { label: 'Instagram', value: '@veeclothingcompany', href: 'https://instagram.com/veeclothingcompany' },
              { label: 'Location',  value: 'Lagos, Nigeria', href: '#' },
            ].map((c) => (
              <div key={c.label}>
                <span style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.6)', display: 'block', marginBottom: 4 }}>
                  {c.label}
                </span>
                <Link href={c.href} target="_blank" className="footer-link" style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)' }}>
                  {c.value}
                </Link>
              </div>
            ))}
          </div>

          {/* Socials */}
          <div style={{ display: 'flex', gap: 10 }}>
            {socials.map((s, i) => (
              <Link key={i} href={s.href} target="_blank" rel="noopener noreferrer">
                <div className="social-icon-luxury">{s.icon}</div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* RIGHT — Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          viewport={{ once: true }}
        >
          <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div>
                <input
                  {...register('name', { required: true })}
                  className="consultation-form-field"
                  type="text"
                  placeholder="First Name"
                />
                {errors.name && <span style={{ color: 'rgba(212,175,55,0.8)', fontSize: 11 }}>Required</span>}
              </div>
              <div>
                <input
                  {...register('lastName', { required: true })}
                  className="consultation-form-field"
                  type="text"
                  placeholder="Last Name"
                />
                {errors.lastName && <span style={{ color: 'rgba(212,175,55,0.8)', fontSize: 11 }}>Required</span>}
              </div>
            </div>

            <div>
              <input
                {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
                className="consultation-form-field"
                type="email"
                placeholder="Email Address"
              />
              {errors.email && <span style={{ color: 'rgba(212,175,55,0.8)', fontSize: 11 }}>Valid email required</span>}
            </div>

            <div>
              <input
                {...register('organisation')}
                className="consultation-form-field"
                type="text"
                placeholder="Organisation / Company (optional)"
              />
            </div>

            <div>
              <select
                {...register('projectScale', { required: true })}
                className="consultation-form-field consultation-select"
                defaultValue=""
              >
                <option value="" disabled style={{ background: '#1A5276' }}>Project Scale</option>
                {projectScales.map((s) => (
                  <option key={s} value={s} style={{ background: '#1A5276' }}>{s}</option>
                ))}
              </select>
              {errors.projectScale && <span style={{ color: 'rgba(212,175,55,0.8)', fontSize: 11 }}>Please select a project scale</span>}
            </div>

            <div>
              <textarea
                {...register('message', { required: true })}
                className="consultation-form-field"
                rows={4}
                placeholder="Briefly describe your vision or requirements"
                style={{ resize: 'none' }}
              />
              {errors.message && <span style={{ color: 'rgba(212,175,55,0.8)', fontSize: 11 }}>Required</span>}
            </div>

            <button
              type="submit"
              disabled={formSubmitted}
              className={formSubmitted ? 'btn-ghost-navy' : 'btn-solid-gold'}
              style={{ width: '100%', justifyContent: 'center', opacity: formSubmitted ? 0.6 : 1 }}
            >
              {formSubmitted ? 'Sending...' : 'Submit Consultation Request'}
              {!formSubmitted && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              )}
            </button>

          </form>
        </motion.div>

      </div>
    </section>
  );
};

export default Contact;

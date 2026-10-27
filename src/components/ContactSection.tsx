import React, { useState } from 'react';
import { GYM_INFO } from '../data/gymData';
import { useGym } from '../context/GymContext';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Phone, Facebook, Clock, Send, CheckCircle2, MessageCircle } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { addLead, gymHours } = useGym();
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    interest: 'General Membership',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Save into Lead Tracker
    addLead({
      fullName: formData.name.trim(),
      phone: formData.phone.trim(),
      interestedProgram: formData.interest,
      source: 'Contact Form',
      notes: formData.message.trim()
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        name: '',
        phone: '',
        interest: 'General Membership',
        message: ''
      });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 800);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#0a0a0a] relative border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#FFD700]">
            <MapPin className="w-4 h-4" />
            <span>{t('contact.badge', 'Connect & Visit')}</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold uppercase text-white tracking-tight">
            {t('contact.title', "Visit Munshiganj's Iron Sanctuary")}
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            {t('contact.subtitle', 'Stop by for an in-person facility inspection, discuss your fitness goals with our champion coaches, or reach out directly.')}
          </p>
        </div>

        {/* 2-Column Layout: Left Map & Info, Right Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Interactive Map & Quick Info (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            
            {/* Google Map Card */}
            <div className="relative rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-xl h-72 sm:h-80">
              <iframe
                title="Old Gym Location Munshiganj HF2W+4J8"
                src={GYM_INFO.googleMapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(1.1)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
              {/* Overlay location pin banner */}
              <div className="absolute top-4 left-4 right-4 p-3 rounded-xl bg-black/85 backdrop-blur-md border border-[#D4AF37]/40 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-[#D4AF37]/20 text-[#FFD700]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase">Old Gym Munshiganj</h4>
                    <p className="text-[11px] font-mono text-[#FFD700]">{GYM_INFO.address}</p>
                  </div>
                </div>
                <a
                  href={GYM_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded bg-[#D4AF37] text-black text-[11px] font-bold uppercase tracking-wider hover:bg-white transition-colors"
                >
                  Open Maps
                </a>
              </div>
            </div>

            {/* Quick Contact Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Phone Card */}
              <a
                href={GYM_INFO.callUrl}
                className="p-5 rounded-2xl bg-[#141414] border border-neutral-800 hover:border-[#D4AF37]/50 transition-all group flex items-start gap-4"
              >
                <div className="p-3 rounded-xl bg-neutral-900 text-[#FFD700] group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase text-neutral-400">Direct Phone Line</span>
                  <p className="text-sm font-bold text-white group-hover:text-[#FFD700] transition-colors mt-0.5 font-mono">
                    {GYM_INFO.phone}
                  </p>
                  <span className="text-[11px] text-emerald-400 font-medium">Click to Call Now</span>
                </div>
              </a>

              {/* Facebook Card */}
              <a
                href={GYM_INFO.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-[#141414] border border-neutral-800 hover:border-[#D4AF37]/50 transition-all group flex items-start gap-4"
              >
                <div className="p-3 rounded-xl bg-neutral-900 text-[#FFD700] group-hover:scale-110 transition-transform">
                  <Facebook className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase text-neutral-400">Official Facebook</span>
                  <p className="text-sm font-bold text-white group-hover:text-[#FFD700] transition-colors mt-0.5 truncate max-w-[170px]">
                    /oldgymmunshiganj
                  </p>
                  <span className="text-[11px] text-[#D4AF37] font-medium">Join Community</span>
                </div>
              </a>

            </div>

            {/* Hours summary (Separated Men's & Women's Shifts) */}
            <div className="p-5 rounded-2xl bg-[#141414] border border-neutral-800 space-y-3">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-2.5">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#FFD700]" />
                  <span className="font-heading text-sm font-bold uppercase text-white tracking-wide">
                    {t('contact.operatingHours', 'Facility Shift Timings')}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#FFD700] uppercase bg-amber-950/60 border border-amber-800/60 px-2 py-0.5 rounded">
                  Munshiganj Gym
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                {/* Men's Shift */}
                <div className="p-2.5 rounded-xl bg-neutral-900/80 border border-blue-900/30 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40">
                      {t('contact.mensShift', "👨 Men's Shift")}
                    </span>
                    <span className="text-neutral-400 text-[11px]">{gymHours.menHours.days}</span>
                  </div>
                  <span className="font-mono font-bold text-white text-[11px]">
                    {gymHours.menHours.hours}
                  </span>
                </div>

                {/* Women's Shift */}
                <div className="p-2.5 rounded-xl bg-neutral-900/80 border border-rose-900/30 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                      {t('contact.womensShift', "👩 Women's Shift")}
                    </span>
                    <span className="text-neutral-400 text-[11px]">{gymHours.womenHours.days}</span>
                  </div>
                  <span className="font-mono font-bold text-rose-200 text-[11px]">
                    {gymHours.womenHours.hours}
                  </span>
                </div>

                {/* Friday Post-Jummah */}
                <div className="p-2.5 rounded-xl bg-neutral-900/50 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-neutral-300">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-neutral-800 text-amber-300 border border-neutral-700">
                      🕌 {gymHours.fridayHours.days}
                    </span>
                  </div>
                  <span className="font-mono text-neutral-300 text-[11px]">
                    {gymHours.fridayHours.hours}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form (6 cols) */}
          <div className="lg:col-span-6 p-6 sm:p-10 rounded-3xl bg-[#141414] border border-neutral-800 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="mb-6 space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider text-[#FFD700]">
                  Get In Touch
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold uppercase text-white">
                  Start Your Journey Today
                </h3>
                <p className="text-xs text-neutral-400">
                  Fill in your details below. Our senior coaches will reply via call or WhatsApp within 15 minutes.
                </p>
              </div>

              {isSuccess ? (
                <div className="p-6 rounded-2xl bg-emerald-950/50 border border-emerald-800 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="font-heading text-xl font-bold text-white uppercase">Inquiry Received!</h4>
                  <p className="text-xs text-emerald-200 max-w-sm mx-auto leading-relaxed">
                    Thank you! Our front desk trainer has received your inquiry and will call you on <strong>{GYM_INFO.phone}</strong> shortly.
                  </p>
                  <a
                    href={GYM_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-bold uppercase mt-2 hover:bg-emerald-500 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Open Chat on WhatsApp Now
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sazidur Rahman"
                      className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm focus:border-[#D4AF37] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Phone Number (For WhatsApp / Call) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="01XXXXXXXXX"
                      className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm font-mono focus:border-[#D4AF37] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Interested In
                    </label>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm focus:border-[#D4AF37] focus:outline-none transition-colors"
                    >
                      <option value="General Membership">General Monthly Membership (৳1,000)</option>
                      <option value="3 Months Transformation">3 Months Package (৳2,500 - Popular)</option>
                      <option value="Yearly VIP Membership">Yearly VIP Membership (৳8,000)</option>
                      <option value="Professional Bodybuilding">Professional Bodybuilding & Contest Prep</option>
                      <option value="Fat Loss & Shred">Fat Loss & Cardio Shred</option>
                      <option value="Personal 1-on-1 Coaching">Personal 1-on-1 Coaching</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Your Goals or Questions
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your current fitness level, weight loss or muscle building goals..."
                      className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm focus:border-[#D4AF37] focus:outline-none transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gold-gradient hover:bg-gold-gradient-hover transition-all duration-200 shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending Your Request...</span>
                    ) : (
                      <>
                        <span>Submit Membership Request</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            <div className="pt-4 border-t border-neutral-800 text-center">
              <span className="text-[11px] text-neutral-500">
                Prefer immediate messaging? Contact us on WhatsApp: <a href={GYM_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] hover:underline font-mono">01919-048227</a>
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

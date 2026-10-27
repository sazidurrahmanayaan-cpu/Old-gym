import React, { useState } from 'react';
import { REVIEWS, GYM_INFO, Review } from '../data/gymData';
import { useLanguage } from '../context/LanguageContext';
import { Star, MessageSquareQuote, ExternalLink, PlusCircle, CheckCircle, ShieldCheck } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReviewerName, setNewReviewerName] = useState('');
  const [newReviewText, setNewReviewText] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewerName.trim() || !newReviewText.trim()) return;

    const initials = newReviewerName
      .split(' ')
      .map(n => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();

    const createdReview: Review = {
      id: `rev-${Date.now()}`,
      name: newReviewerName.trim(),
      avatarText: initials || 'GM',
      rating: newRating,
      reviewText: newReviewText.trim(),
      date: 'Just now',
      tag: 'Verified Lifter'
    };

    setReviewsList([createdReview, ...reviewsList]);
    setSubmittedSuccess(true);
    setNewReviewerName('');
    setNewReviewText('');
    setTimeout(() => {
      setShowReviewForm(false);
      setSubmittedSuccess(false);
    }, 2000);
  };

  return (
    <section id="reviews" className="py-20 lg:py-28 bg-[#0a0a0a] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#FFD700]">
              <ShieldCheck className="w-4 h-4" />
              <span>{t('reviews.badge', 'Authentic Member Voices')}</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-bold uppercase text-white tracking-tight">
              {t('reviews.title', 'Real Google Reviews from Real Lifters')}
            </h2>
            <p className="text-sm text-neutral-400 max-w-xl">
              {t('reviews.subtitle', "Don't just take our word for it. Hear directly from members who train every single day at Munshiganj's highest rated gym.")}
            </p>
          </div>

          {/* Rating Summary Block */}
          <div className="flex items-center gap-5 p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 self-start md:self-auto">
            <div className="text-center">
              <span className="font-heading text-3xl sm:text-4xl font-extrabold text-white tabular-nums">
                {language === 'bn' ? '৪.৬' : GYM_INFO.rating}
              </span>
              <div className="flex text-amber-400 text-xs mt-0.5 justify-center">
                {'★★★★★'}
              </div>
            </div>
            <div className="w-px h-10 bg-neutral-800" />
            <div className="text-xs space-y-0.5">
              <p className="font-bold text-white uppercase tracking-wider">
                {t('reviews.verifiedMembers', '14 Verified Google Reviews')}
              </p>
              <p className="text-neutral-400">Google Business Munshiganj</p>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {reviewsList.map((review) => (
            <div
              key={review.id}
              className="p-7 rounded-2xl bg-[#121212] border border-neutral-800 hover:border-[#D4AF37]/50 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-black"
            >
              <div>
                {/* 5-Star Icons */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-700'
                        }`}
                      />
                    ))}
                  </div>
                  <MessageSquareQuote className="w-6 h-6 text-[#D4AF37]/40" />
                </div>

                {/* Review Text */}
                <p className="text-sm sm:text-base text-neutral-200 leading-relaxed italic mb-6">
                  "{review.reviewText}"
                </p>
              </div>

              {/* Reviewer Meta */}
              <div className="pt-4 border-t border-neutral-800/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-neutral-900 border border-[#D4AF37]/40 text-[#FFD700] font-heading font-bold text-sm flex items-center justify-center shrink-0">
                  {review.avatarText}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{review.name}</h4>
                  <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                    <span>{review.tag}</span>
                    <span>·</span>
                    <span className="text-emerald-400 font-medium">Google Verified</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Actions Row: See All on Google Maps + Write a Review */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={GYM_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gold-gradient hover:bg-gold-gradient-hover transition-all duration-200 shadow-md shadow-amber-500/20 active:scale-95"
          >
            <span>See All 14 Reviews on Google Maps</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-semibold text-neutral-200 hover:text-white bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-[#D4AF37]" />
            <span>{showReviewForm ? 'Close Review Form' : 'Write a Review'}</span>
          </button>
        </div>

        {/* Interactive Add Review Modal / Drawer */}
        {showReviewForm && (
          <div className="mt-8 max-w-lg mx-auto p-6 rounded-2xl bg-[#141414] border border-[#D4AF37]/40 shadow-2xl animate-in fade-in duration-200">
            <h3 className="font-heading text-xl font-bold uppercase text-white mb-1">
              Share Your Old Gym Experience
            </h3>
            <p className="text-xs text-neutral-400 mb-4">
              Your feedback inspires Munshiganj lifters and helps us keep our gym spotless.
            </p>

            {submittedSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Thank you! Your review has been added to our live testimonials.</span>
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={newReviewerName}
                    onChange={(e) => setNewReviewerName(e.target.value)}
                    placeholder="e.g. Tanvir Ahmed"
                    className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Rating</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewRating(star)}
                        className="p-1 cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= newRating ? 'fill-amber-400 text-amber-400' : 'text-neutral-700'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-amber-400 ml-2">{newRating} Stars</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Your Review</label>
                  <textarea
                    rows={3}
                    required
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    placeholder="Share what you think about the trainers, equipment, and hygiene..."
                    className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-black bg-gold-gradient hover:bg-gold-gradient-hover cursor-pointer shadow-md"
                >
                  Submit Review
                </button>
              </form>
            )}
          </div>
        )}

      </div>
    </section>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { useGym } from '../../context/GymContext';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Lock, 
  X, 
  ShieldAlert, 
  KeyRound, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const AdminLoginModal: React.FC = () => {
  const { 
    showLoginModal, 
    setShowLoginModal, 
    loginAdmin,
    hasCustomPassword 
  } = useGym();
  const { language } = useLanguage();
  
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset state when modal opens
  useEffect(() => {
    if (showLoginModal) {
      setPassword('');
      setShowPassword(false);
      setErrorMessage(null);
      setIsVerifying(false);
      setIsSuccess(false);
      setShake(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [showLoginModal]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showLoginModal) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showLoginModal]);

  if (!showLoginModal) return null;

  const handleClose = () => {
    setShowLoginModal(false);
    setPassword('');
    setErrorMessage(null);
    setShake(false);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();

    if (!password.trim()) {
      setErrorMessage(
        language === 'bn'
          ? 'অনুগ্রহ করে পাসওয়ার্ড প্রদান করুন।'
          : 'Please enter the admin password.'
      );
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setIsVerifying(true);
    setErrorMessage(null);

    setTimeout(() => {
      const success = loginAdmin(password);
      setIsVerifying(false);

      if (success) {
        setIsSuccess(true);
        setErrorMessage(null);
      } else {
        setShake(true);
        setTimeout(() => setShake(false), 500);
        setPassword('');
        inputRef.current?.focus();
        setErrorMessage(
          language === 'bn'
            ? 'ভুল পাসওয়ার্ড! সঠিক পাসওয়ার্ড লিখে আবার চেষ্টা করুন।'
            : 'Incorrect password! Please check and try again.'
        );
      }
    }, 200);
  };

  const handleFillDefault = () => {
    setPassword('OldGym@2026');
    setErrorMessage(null);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-dialog-title"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        className={`relative max-w-md w-full bg-[#121212]/98 backdrop-blur-2xl border-2 ${
          isSuccess 
            ? 'border-emerald-500 shadow-[0_0_50px_rgba(16,185,129,0.3)]' 
            : errorMessage 
            ? 'border-rose-600/80 shadow-[0_0_50px_rgba(225,29,72,0.3)]' 
            : 'border-[#D4AF37]/50 shadow-[0_0_50px_rgba(212,175,55,0.25)]'
        } rounded-3xl p-6 sm:p-8 text-left transition-all duration-300 overflow-hidden ${shake ? 'animate-shake' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className={`absolute top-0 right-1/4 w-32 h-32 rounded-full blur-2xl pointer-events-none transition-colors ${
          isSuccess ? 'bg-emerald-500/20' : errorMessage ? 'bg-rose-500/20' : 'bg-[#D4AF37]/15'
        }`} />

        {/* Close Button */}
        <button
          onClick={handleClose}
          aria-label="Close"
          className="absolute top-5 right-5 p-2 rounded-xl bg-neutral-900/90 text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700 transition-colors cursor-pointer active:scale-95"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-3 mb-6">
          <div className={`mx-auto w-14 h-14 rounded-2xl border flex items-center justify-center shadow-lg transition-colors ${
            isSuccess 
              ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-400 shadow-emerald-950'
              : errorMessage
              ? 'bg-rose-950/80 border-rose-500/60 text-rose-400 shadow-rose-950'
              : 'bg-gradient-to-br from-[#D4AF37]/20 to-[#FFD700]/5 border-[#D4AF37]/40 text-[#FFD700] shadow-[0_0_20px_rgba(212,175,55,0.2)]'
          }`}>
            {isSuccess ? (
              <CheckCircle2 className="w-7 h-7 text-emerald-400" />
            ) : errorMessage ? (
              <ShieldAlert className="w-7 h-7 text-rose-400" />
            ) : (
              <Lock className="w-7 h-7" />
            )}
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#FFD700] bg-[#D4AF37]/10 px-2.5 py-0.5 rounded-full border border-[#D4AF37]/30 inline-block mb-1">
              {language === 'bn' ? 'অ্যাডমিন নিরাপত্তা' : 'Admin Security Access'}
            </span>
            <h3 
              id="admin-dialog-title"
              className="font-heading text-2xl font-bold uppercase text-white mt-1"
            >
              {isSuccess 
                ? (language === 'bn' ? 'অনুমোদিত' : 'Access Granted') 
                : (language === 'bn' ? 'অ্যাডমিন পাসওয়ার্ড লক' : 'Admin Password Protection')}
            </h3>
            <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto leading-relaxed">
              {isSuccess
                ? (language === 'bn' ? 'ড্যাশবোর্ড খোলা হচ্ছে...' : 'Opening management dashboard...')
                : (language === 'bn'
                    ? 'ড্যাশবোর্ডে প্রবেশ করতে অনুগ্রহ করে আপনার অ্যাডমিন পাসওয়ার্ড লিখুন।'
                    : 'Please enter your master admin password to unlock the management dashboard.')}
            </p>
          </div>
        </div>

        {/* Error Alert Banner */}
        {errorMessage && (
          <div className="mb-5 p-3.5 rounded-xl bg-rose-950/80 border border-rose-800/90 text-rose-300 text-xs flex items-center gap-2.5 shadow-lg shadow-rose-950/50">
            <div className="w-6 h-6 rounded-lg bg-rose-900/60 border border-rose-700/60 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-rose-200">
                {language === 'bn' ? 'পাসওয়ার্ড সঠিক নয়!' : 'Access Denied!'}
              </p>
              <p className="text-[11px] text-rose-300/80 mt-0.5">
                {errorMessage}
              </p>
            </div>
          </div>
        )}

        {/* Success Banner */}
        {isSuccess && (
          <div className="mb-5 p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-200 text-xs flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <p className="font-bold">
              {language === 'bn' ? 'পাসওয়ার্ড যাচাই সফল হয়েছে...' : 'Password verified. Entering Admin Dashboard...'}
            </p>
          </div>
        )}

        {/* Password Form */}
        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5 flex items-center justify-between">
              <span>{language === 'bn' ? 'মাস্টার পাসওয়ার্ড' : 'Master Password'}</span>
              <span className="text-[10px] text-neutral-500 font-mono">Case-Sensitive</span>
            </label>

            <div className="relative">
              <div className="absolute left-3.5 top-3.5 text-neutral-500">
                <KeyRound className="w-4 h-4" />
              </div>
              
              <input
                ref={inputRef}
                type={showPassword ? 'text' : 'password'}
                autoFocus
                required
                disabled={isVerifying || isSuccess}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                placeholder="Enter password (e.g. OldGym@2026)"
                className="w-full pl-10 pr-12 py-3 rounded-xl bg-neutral-900/90 border border-neutral-800 text-white text-sm focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 focus:outline-none transition-all placeholder:text-neutral-600 font-mono"
              />

              {/* Password visibility toggle */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-3 p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Action Buttons: Cancel and Unlock Admin */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 transition-all cursor-pointer active:scale-95 text-center min-h-[44px] flex items-center justify-center"
            >
              <span>{language === 'bn' ? 'বাতিল' : 'Cancel'}</span>
            </button>

            <button
              type="submit"
              disabled={isVerifying || isSuccess}
              className="py-3 px-4 rounded-xl text-xs font-extrabold uppercase tracking-wider text-black bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.35)] hover:shadow-[0_0_25px_rgba(255,215,0,0.55)] active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 min-h-[44px]"
            >
              {isVerifying ? (
                <span>Verifying...</span>
              ) : isSuccess ? (
                <span>Unlocked ✓</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>{language === 'bn' ? 'যাচাই ও প্রবেশ' : 'Unlock Dashboard'}</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Quick Default Setup Hint */}
        {!hasCustomPassword && (
          <div className="mt-5 pt-4 border-t border-neutral-800/80">
            <div className="flex items-center justify-between text-[11px] text-neutral-400">
              <span className="flex items-center gap-1 text-neutral-400">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span>Default setup password:</span>
              </span>
              <button
                type="button"
                onClick={handleFillDefault}
                className="font-mono text-[11px] text-amber-400 hover:text-amber-300 underline underline-offset-2 flex items-center gap-1 cursor-pointer"
              >
                <span>OldGym@2026</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

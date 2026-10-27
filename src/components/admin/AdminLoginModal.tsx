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
  Clock
} from 'lucide-react';

export const AdminLoginModal: React.FC = () => {
  const { 
    showLoginModal, 
    setShowLoginModal, 
    loginAdmin,
    isAdmin,
    setCurrentView
  } = useGym();
  const { language } = useLanguage();
  
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [shake, setShake] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutSeconds, setLockoutSeconds] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Lockout countdown timer
  useEffect(() => {
    if (lockoutSeconds <= 0) return;

    const timer = setInterval(() => {
      setLockoutSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setErrorMessage(null);
          setFailedAttempts(0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [lockoutSeconds]);

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
        if (lockoutSeconds <= 0) {
          inputRef.current?.focus();
        }
      }, 100);
    }
  }, [showLoginModal, lockoutSeconds]);

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
    if (!isAdmin) {
      setCurrentView('public');
    }
  };

  const isLockedOut = lockoutSeconds > 0;

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLockedOut) {
      return;
    }

    if (!password.trim()) {
      setErrorMessage(
        language === 'bn'
          ? 'অনুগ্রহ করে পাসওয়ার্ড প্রদান করুন।'
          : 'Please enter the master password.'
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
        setFailedAttempts(0);
        // Smooth transition before closing modal
        setTimeout(() => {
          setShowLoginModal(false);
          setIsSuccess(false);
        }, 600);
      } else {
        const nextFailed = failedAttempts + 1;
        setFailedAttempts(nextFailed);
        setShake(true);
        setTimeout(() => setShake(false), 500);
        setPassword('');
        inputRef.current?.focus();

        if (nextFailed >= 5) {
          setLockoutSeconds(30);
          setErrorMessage(
            language === 'bn'
              ? 'অতিরিক্ত ভুল চেষ্টা! অনুগ্রহ করে ৩০ সেকেন্ড পর আবার চেষ্টা করুন।'
              : 'Too many attempts. Try again in 30 seconds.'
          );
        } else {
          const remaining = 5 - nextFailed;
          setErrorMessage(
            language === 'bn'
              ? `ভুল পাসওয়ার্ড! সঠিক পাসওয়ার্ড লিখুন (আর ${remaining} বার চেষ্টা করতে পারবেন)।`
              : `Incorrect password! Please check and try again (${remaining} attempt${remaining === 1 ? '' : 's'} remaining).`
          );
        }
      }
    }, 250);
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
            : isLockedOut || errorMessage 
            ? 'border-rose-600/80 shadow-[0_0_50px_rgba(225,29,72,0.3)]' 
            : 'border-[#D4AF37]/50 shadow-[0_0_50px_rgba(212,175,55,0.25)]'
        } rounded-3xl p-6 sm:p-8 text-left transition-all duration-300 overflow-hidden ${shake ? 'animate-shake' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className={`absolute top-0 right-1/4 w-32 h-32 rounded-full blur-2xl pointer-events-none transition-colors ${
          isSuccess ? 'bg-emerald-500/20' : isLockedOut || errorMessage ? 'bg-rose-500/20' : 'bg-[#D4AF37]/15'
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
              : isLockedOut
              ? 'bg-amber-950/80 border-amber-500/60 text-amber-400 shadow-amber-950'
              : errorMessage
              ? 'bg-rose-950/80 border-rose-500/60 text-rose-400 shadow-rose-950'
              : 'bg-gradient-to-br from-[#D4AF37]/20 to-[#FFD700]/5 border-[#D4AF37]/40 text-[#FFD700] shadow-[0_0_20px_rgba(212,175,55,0.2)]'
          }`}>
            {isSuccess ? (
              <CheckCircle2 className="w-7 h-7 text-emerald-400" />
            ) : isLockedOut ? (
              <Clock className="w-7 h-7 text-amber-400 animate-pulse" />
            ) : errorMessage ? (
              <ShieldAlert className="w-7 h-7 text-rose-400" />
            ) : (
              <Lock className="w-7 h-7" />
            )}
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#FFD700] bg-[#D4AF37]/10 px-2.5 py-0.5 rounded-full border border-[#D4AF37]/30 inline-block mb-1">
              {language === 'bn' ? 'নিরাপদ অ্যাডমিন অ্যাক্সেস' : 'Secure Admin Access'}
            </span>
            <h3 
              id="admin-dialog-title"
              className="font-heading text-2xl font-bold uppercase text-white mt-1"
            >
              {isSuccess 
                ? (language === 'bn' ? 'অনুমোদিত' : 'Access Granted') 
                : isLockedOut
                ? (language === 'bn' ? 'অস্থায়ী লকআউট' : 'Security Lockout')
                : (language === 'bn' ? 'অ্যাডমিন ভেরিফিকেশন' : 'Admin Verification')}
            </h3>
            <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto leading-relaxed">
              {isSuccess
                ? (language === 'bn' ? 'ড্যাশবোর্ড খোলা হচ্ছে...' : 'Opening management dashboard...')
                : isLockedOut
                ? (language === 'bn'
                    ? 'অতিরিক্ত ভুল চেষ্টার কারণে প্রবেশ সাময়িকভাবে স্থগিত রয়েছে।'
                    : 'Too many incorrect attempts. Please wait before retrying.')
                : (language === 'bn'
                    ? 'ড্যাশবোর্ডে প্রবেশ করতে আপনার মাস্টার অ্যাডমিন পাসওয়ার্ড দিন।'
                    : 'Please enter your master admin password to unlock management features.')}
            </p>
          </div>
        </div>

        {/* Lockout / Error Alert Banner */}
        {isLockedOut ? (
          <div className="mb-5 p-3.5 rounded-xl bg-amber-950/80 border border-amber-800 text-amber-300 text-xs flex items-center gap-2.5 shadow-lg shadow-amber-950/50">
            <div className="w-7 h-7 rounded-lg bg-amber-900/60 border border-amber-700/60 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 text-amber-400 animate-spin" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-amber-200">
                {language === 'bn' ? 'অতিরিক্ত ভুল চেষ্টা!' : 'Too Many Failed Attempts'}
              </p>
              <p className="text-[11px] text-amber-300/90 mt-0.5 font-mono">
                {language === 'bn' 
                  ? `আবার চেষ্টা করুন ${lockoutSeconds} সেকেন্ড পর`
                  : `Too many attempts. Try again in ${lockoutSeconds} seconds`}
              </p>
            </div>
          </div>
        ) : errorMessage ? (
          <div className="mb-5 p-3.5 rounded-xl bg-rose-950/80 border border-rose-800/90 text-rose-300 text-xs flex items-center gap-2.5 shadow-lg shadow-rose-950/50">
            <div className="w-6 h-6 rounded-lg bg-rose-900/60 border border-rose-700/60 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-rose-200">
                {language === 'bn' ? 'প্রবেশাধিকার প্রত্যাখ্যাত' : 'Access Denied'}
              </p>
              <p className="text-[11px] text-rose-300/80 mt-0.5">
                {errorMessage}
              </p>
            </div>
          </div>
        ) : null}

        {/* Success Banner */}
        {isSuccess && (
          <div className="mb-5 p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-200 text-xs flex items-center gap-2.5 animate-in fade-in">
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
                disabled={isVerifying || isSuccess || isLockedOut}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMessage && !isLockedOut) setErrorMessage(null);
                }}
                placeholder="Enter master password..."
                className="w-full pl-10 pr-12 py-3 rounded-xl bg-neutral-900/90 border border-neutral-800 text-white text-sm focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 focus:outline-none transition-all placeholder:text-neutral-600 font-mono disabled:opacity-50 disabled:cursor-not-allowed"
              />

              {/* Password visibility toggle */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLockedOut}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-3 p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer disabled:opacity-40"
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
              disabled={isVerifying || isSuccess || isLockedOut}
              className="py-3 px-4 rounded-xl text-xs font-extrabold uppercase tracking-wider text-black bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.35)] hover:shadow-[0_0_25px_rgba(255,215,0,0.55)] active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
            >
              {isVerifying ? (
                <span>Verifying...</span>
              ) : isSuccess ? (
                <span>Unlocked ✓</span>
              ) : isLockedOut ? (
                <span className="font-mono">Wait {lockoutSeconds}s</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>{language === 'bn' ? 'যাচাই ও প্রবেশ' : 'Unlock Dashboard'}</span>
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

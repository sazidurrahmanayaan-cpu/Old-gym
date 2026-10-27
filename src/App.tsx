import React, { useState } from 'react';
import { GymProvider, useGym } from './context/GymContext';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { EquipmentShowcase } from './components/EquipmentShowcase';
import { ClassesSection } from './components/ClassesSection';
import { TransformationSection } from './components/TransformationSection';
import { PlanPreview } from './components/PlanPreview';
import { BmiCalculator } from './components/BmiCalculator';
import { PricingSection } from './components/PricingSection';
import { TrainerSection } from './components/TrainerSection';
import { ReviewsSection } from './components/ReviewsSection';
import { GallerySection } from './components/GallerySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { TrialModal } from './components/TrialModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLoginModal } from './components/admin/AdminLoginModal';

function AppContent() {
  const { currentView, isAdmin, setShowLoginModal } = useGym();
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const [selectedPlanForTrial, setSelectedPlanForTrial] = useState<string | undefined>(undefined);

  // If someone enters admin view without authentication, trigger the password lock modal immediately
  React.useEffect(() => {
    if (currentView === 'admin' && !isAdmin) {
      setShowLoginModal(true);
    }
  }, [currentView, isAdmin, setShowLoginModal]);

  const handleOpenTrialModal = (plan?: string) => {
    setSelectedPlanForTrial(plan);
    setIsTrialModalOpen(true);
  };

  const handleCloseTrialModal = () => {
    setIsTrialModalOpen(false);
    setSelectedPlanForTrial(undefined);
  };

  // If Admin view is active and authenticated with password
  if (currentView === 'admin' && isAdmin) {
    return (
      <>
        <AdminDashboard />
        <AdminLoginModal />
      </>
    );
  }

  // Otherwise, render Public Website
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-100 flex flex-col font-sans selection:bg-[#D4AF37] selection:text-black">
      {/* Sticky Navbar */}
      <Navbar onOpenTrialModal={handleOpenTrialModal} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 1. Hero Section with Video Loop Background & Ambient Gold Glow */}
        <HeroSection
          onOpenTrialModal={() => handleOpenTrialModal()}
        />

        {/* 2. About Section with 3 Core Features */}
        <AboutSection
          onOpenTrialModal={() => handleOpenTrialModal('General Facility Tour')}
        />

        {/* 3. Gym Equipment Showcase Carousel & Lightbox Specs */}
        <EquipmentShowcase />

        {/* 4. Classes Section with 3D Tilt Cards */}
        <ClassesSection
          onSelectClassForTrial={(className) => handleOpenTrialModal(`Class: ${className}`)}
        />

        {/* 5. Before & After Body Transformation Slider */}
        <TransformationSection
          onStartTransformation={(plan) => handleOpenTrialModal(plan || '90-Day Transformation')}
        />

        {/* 6. Interactive Workout & Bengali Diet Plan Preview */}
        <PlanPreview
          onUnlockPlan={(plan) => handleOpenTrialModal(plan)}
        />

        {/* 7. BMI Calculator (Interactive) */}
        <BmiCalculator
          onSelectRecommendedPlan={(planSuggestion) => handleOpenTrialModal(`Prescribed: ${planSuggestion}`)}
        />

        {/* 8. Pricing Table with Glassmorphism */}
        <PricingSection
          onSelectPlan={(planName) => handleOpenTrialModal(`Plan: ${planName}`)}
        />

        {/* 9. Trainer Section with 3D Card Flip */}
        <TrainerSection
          onConsultTrainer={(trainerName) => handleOpenTrialModal(`Trainer Coaching with ${trainerName}`)}
        />

        {/* 10. Google Reviews Section */}
        <ReviewsSection />

        {/* 11. Gallery Grid */}
        <GallerySection />

        {/* 12. Contact Section with Map Embed */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Actions: WhatsApp Pill & Mobile Sticky Bar with 4 Actions */}
      <FloatingActions 
        onOpenTrialModal={() => handleOpenTrialModal('Mobile Quick Bar Free VIP Pass')}
      />

      {/* Interactive Free 1-Day Trial / Pass Modal */}
      <TrialModal
        isOpen={isTrialModalOpen}
        onClose={handleCloseTrialModal}
        defaultPlan={selectedPlanForTrial}
      />

      {/* Admin Passcode Authentication Modal */}
      <AdminLoginModal />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <GymProvider>
        <AppContent />
      </GymProvider>
    </LanguageProvider>
  );
}

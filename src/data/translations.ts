export type Language = 'en' | 'bn';

export interface Translations {
  nav: {
    home: string;
    about: string;
    classes: string;
    equipment: string;
    transformations: string;
    dietWorkout: string;
    bmi: string;
    pricing: string;
    trainers: string;
    reviews: string;
    gallery: string;
    contact: string;
    joinNow: string;
    callNow: string;
    adminPortal: string;
    langName: string;
    more: string;
  };
  hero: {
    badgeRating: string;
    badgeReviews: string;
    badgeLoved: string;
    title1: string;
    title2: string;
    subtitle: string;
    bengaliTag: string;
    tagline: string;
    startTrial: string;
    ratingStat: string;
    ratingStatLabel: string;
    equipStat: string;
    equipStatLabel: string;
    proStat: string;
    proStatLabel: string;
    card1Title: string;
    card1Badge: string;
    card1Desc: string;
    card2Title: string;
    card2Badge: string;
    card2Desc: string;
    card3Title: string;
    card3Badge: string;
    card3Desc: string;
  };
  about: {
    badge: string;
    title: string;
    subtitle: string;
    featuresBadge: string;
    featuresTitle: string;
    featuresSubtitle: string;
    f1Title: string;
    f1Desc: string;
    f1Badge: string;
    f1Stat: string;
    f2Title: string;
    f2Desc: string;
    f2Badge: string;
    f2Stat: string;
    f3Title: string;
    f3Desc: string;
    f3Badge: string;
    f3Stat: string;
    f4Title: string;
    f4Desc: string;
    f4Badge: string;
    f4Stat: string;
    f5Title: string;
    f5Desc: string;
    f5Badge: string;
    f5Stat: string;
    f6Title: string;
    f6Desc: string;
    f6Badge: string;
    f6Stat: string;
    claimBenefit: string;
    verifiedBadge: string;
    verifiedTitle: string;
    storyBadge: string;
    storyTitle: string;
    storyDesc: string;
    point1Title: string;
    point1Desc: string;
    point2Title: string;
    point2Desc: string;
    ctaExperience: string;
    ctaMaps: string;
  };
  equipment: {
    badge: string;
    title: string;
    subtitle: string;
    filterAll: string;
    filterFreeWeights: string;
    filterCablePin: string;
    filterRacks: string;
    filterCardio: string;
    specsTitle: string;
    claimTrial: string;
  };
  classes: {
    badge: string;
    title: string;
    subtitle: string;
    claimPass: string;
    viewDetails: string;
    level: string;
    schedule: string;
  };
  transformation: {
    badge: string;
    title: string;
    subtitle: string;
    dragHint: string;
    beforeLabel: string;
    afterLabel: string;
    metricsTimeframe: string;
    metricsFatLoss: string;
    metricsMuscleGain: string;
    startJourney: string;
    guarantee: string;
  };
  nutrition: {
    badge: string;
    title: string;
    subtitle: string;
    tabDiet: string;
    tabWorkout: string;
    biometricsTitle: string;
    reset: string;
    gender: string;
    male: string;
    female: string;
    age: string;
    years: string;
    weight: string;
    height: string;
    primaryGoal: string;
    goalFatLoss: string;
    goalMuscleGain: string;
    goalMaintenance: string;
    activityLevel: string;
    dailyMacroTitle: string;
    bmr: string;
    tdee: string;
    prescribedEnergy: string;
    kcalDay: string;
    dailyProtein: string;
    cleanCarbs: string;
    essentialFats: string;
    hydrationTarget: string;
    litersDay: string;
    sendWhatsapp: string;
    mealsTitle: string;
    localAssurance: string;
    claimDietCta: string;
  };
  bmi: {
    badge: string;
    title: string;
    subtitle: string;
    heightLabel: string;
    weightLabel: string;
    ageLabel: string;
    bmiScore: string;
    categoryUnderweight: string;
    categoryNormal: string;
    categoryOverweight: string;
    categoryObese: string;
    recommendationTitle: string;
    claimSuggestedPlan: string;
  };
  pricing: {
    badge: string;
    title: string;
    subtitle: string;
    popularBadge: string;
    includedBadge: string;
    bdt: string;
    monthly: string;
    quarterly: string;
    yearly: string;
    getStarted: string;
    refundAssurance: string;
  };
  trainers: {
    badge: string;
    title: string;
    subtitle: string;
    coachTitle: string;
    experienceLabel: string;
    achievementsLabel: string;
    specialtiesLabel: string;
    consultCoach: string;
    flipHint: string;
  };
  reviews: {
    badge: string;
    title: string;
    subtitle: string;
    overallScore: string;
    verifiedMembers: string;
    viewGoogleReviews: string;
    writeReview: string;
  };
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    gymAddress: string;
    callNow: string;
    operatingHours: string;
    mensShift: string;
    womensShift: string;
    fridaySpecial: string;
    formTitle: string;
    fullName: string;
    phone: string;
    interest: string;
    message: string;
    submit: string;
    submitting: string;
    successMessage: string;
  };
  footer: {
    tagline: string;
    quickLinks: string;
    timingHeader: string;
    contactHeader: string;
    rights: string;
    adminLogin: string;
  };
  admin: {
    portalTitle: string;
    dashboard: string;
    overview: string;
    members: string;
    content: string;
    leads: string;
    logout: string;
    viewSite: string;
    totalRevenue: string;
    activeMembers: string;
    pendingPayments: string;
    newLeads: string;
    scheduleEditor: string;
    mensSchedule: string;
    womensSchedule: string;
    fridaySchedule: string;
    saveSchedule: string;
    savedSuccess: string;
    addMember: string;
    searchPlaceholder: string;
    lockTitle: string;
    lockSubtitle: string;
    passcodeLabel: string;
    passcodePlaceholder: string;
    invalidError: string;
    verifyBtn: string;
    cancelBtn: string;
    defaultNote: string;
    showPassword: string;
    hidePassword: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      classes: 'Classes',
      equipment: 'Equipment',
      transformations: 'Transformations',
      dietWorkout: 'Diet & Workout',
      bmi: 'BMI Calculator',
      pricing: 'Pricing',
      trainers: 'Trainers',
      reviews: 'Reviews',
      gallery: 'Gallery',
      contact: 'Contact',
      joinNow: 'Join Now',
      callNow: 'Call Now',
      adminPortal: 'Admin Portal',
      langName: 'বাংলা',
      more: 'More'
    },
    hero: {
      badgeRating: '⭐ 4.6 (14 Reviews)',
      badgeReviews: 'Google Reviews',
      badgeLoved: "Munshiganj's Most Loved",
      title1: 'BUILD YOUR BODY,',
      title2: 'BUILD YOUR LEGACY',
      subtitle: "Old Gym is Munshiganj's most clean and professional fitness center, run by professional bodybuilders.",
      bengaliTag: 'ওল্ড জিম হেলথ & ফিটনেস সেন্টার',
      tagline: 'Best Gym in Munshiganj Area - Clean & Professional',
      startTrial: 'Start Your Free Trial',
      ratingStat: '4.6★',
      ratingStatLabel: 'Google Rating',
      equipStat: '50+',
      equipStatLabel: 'Iron Equipment',
      proStat: '100%',
      proStatLabel: 'Pro Bodybuilder Run',
      card1Title: 'New Equipment',
      card1Badge: 'Up to 40kg+',
      card1Desc: 'Heavy calibrated Olympic iron, power cages, cable crossover, and isolation machines.',
      card2Title: 'Clean Environment',
      card2Badge: '100% Hygienic',
      card2Desc: 'Spotless mirrors, sanitized mats, fresh ventilation, and pristine locker zones.',
      card3Title: 'Pro Trainers',
      card3Badge: 'Champion Mentors',
      card3Desc: 'Direct biomechanical coaching from certified bodybuilders with real competition wins.'
    },
    about: {
      badge: 'About Old Gym Health & Fitness',
      title: "Munshiganj's Premier Fitness Sanctuary",
      subtitle: 'Founded with an uncompromising vision for true athletic excellence, Old Gym has set the benchmark for hygiene, heavy strength training, and genuine bodybuilder mentorship in Munshiganj.',
      featuresBadge: 'Why Choose Old Gym',
      featuresTitle: 'Engineered For Real Transformations',
      featuresSubtitle: 'Experience the distinction of a world-class training facility dedicated to hygiene, heavy iron, and zero ego.',
      f1Title: 'Certified Pro Coaches',
      f1Desc: 'Direct biomechanical guidance and rep supervision from championship bodybuilders to eliminate injuries and fast-track gains.',
      f1Badge: 'Certified Coaches',
      f1Stat: '100% Rep Supervision',
      f2Title: '100% Hygienic Space',
      f2Desc: "Munshiganj's cleanest gym floor with continuous sanitization, sparkling mirrors, fresh filtered air, and spotless lockers.",
      f2Badge: '100% Hygienic',
      f2Stat: 'Daily Deep Sanitized',
      f3Title: 'Heavy Olympic Iron',
      f3Desc: 'Calibrated Olympic bars, heavy dumbbells up to 40kg+, multi-grip cable towers, and dedicated heavy deadlift platforms.',
      f3Badge: 'Up to 40kg+',
      f3Stat: '50+ Iron Stations',
      f4Title: 'Custom Bengali Diets',
      f4Desc: 'Targeted macro protocols built around accessible Bengali staples—fresh fish, eggs, chicken, and rice—for real, sustainable results.',
      f4Badge: 'Tailored Nutrition',
      f4Stat: 'Personalized Macros',
      f5Title: 'Zero-Wait Machine Access',
      f5Desc: 'Duplicate cable setups, multiple bench stations, and spacious aisles so you train without frustrating downtime or crowding.',
      f5Badge: 'Zero Queue',
      f5Stat: 'Optimal Spacing',
      f6Title: 'Inspiring Brotherhood',
      f6Desc: 'A welcoming, respectful atmosphere where first-timers and veteran powerlifters motivate each other every single set.',
      f6Badge: 'Zero Judgement',
      f6Stat: 'Safe Community',
      claimBenefit: 'Claim 1-Day VIP Pass',
      verifiedBadge: 'Verified Munshiganj Facility',
      verifiedTitle: 'Heavy Iron & Ergonomic Machines',
      storyBadge: 'The Old Gym Difference',
      storyTitle: 'Where Discipline Meets World-Class Training',
      storyDesc: 'Unlike crowded commercial spaces with broken gear, Old Gym is maintained daily by lifters who take pride in their craft. Whether you want to lose weight or compete, our supportive brotherhood ensures guaranteed progress.',
      point1Title: 'Zero Judgement, 100% Brotherhood',
      point1Desc: 'Friendly staff and respectful members create an inspiring and safe training culture.',
      point2Title: 'Direct Guidance on Every Rep',
      point2Desc: 'Avoid injuries. Our coaches actively ensure correct biomechanical form and posture.',
      ctaExperience: 'Experience It in Person',
      ctaMaps: 'Locate on Google Maps (HF2W+4J8) →'
    },
    equipment: {
      badge: 'Certified Heavy Iron & Machines',
      title: 'Precision Gym Equipment Showcase',
      subtitle: 'Engineered for optimal biomechanics, maximum muscle tension, and heavy safety margins.',
      filterAll: 'All Equipment',
      filterFreeWeights: 'Free Weights & Dumbbells',
      filterCablePin: 'Cables & Pin-Loaded',
      filterRacks: 'Heavy Cages & Racks',
      filterCardio: 'Conditioning & Cardio',
      specsTitle: 'Engineered Equipment Specs',
      claimTrial: 'Try This Machine On Free 1-Day Trial'
    },
    classes: {
      badge: 'Tailored Training Disciplines',
      title: 'Expert Guided Programs',
      subtitle: 'From pure muscle hypertrophy to rapid fat incineration and competition prep.',
      claimPass: 'Claim Free Class Pass',
      viewDetails: 'View Program Details',
      level: 'Level',
      schedule: 'Schedule'
    },
    transformation: {
      badge: 'Proven Member Results',
      title: 'Real Body Transformations',
      subtitle: 'Witness the discipline of Munshiganj members who forged their physiques at Old Gym.',
      dragHint: '↔ Drag the gold divider to compare Before & After',
      beforeLabel: 'Before',
      afterLabel: 'After (Old Gym)',
      metricsTimeframe: 'Timeframe',
      metricsFatLoss: 'Body Fat Shed',
      metricsMuscleGain: 'Lean Muscle Added',
      startJourney: 'Start Your Transformation Today',
      guarantee: 'Guaranteed 90-Day Coach Accountability'
    },
    nutrition: {
      badge: 'Interactive Nutrition & Training Engine',
      title: 'Personalized Nutrition & Meal Plan Generator',
      subtitle: 'Calculate your exact BMR and TDEE calorie target using the clinical Mifflin-St Jeor formula, and receive a customized high-protein Bengali meal blueprint.',
      tabDiet: 'Personalized Diet Generator',
      tabWorkout: '4-Day Workout Split',
      biometricsTitle: 'Biometric Parameters',
      reset: 'Reset',
      gender: 'Gender',
      male: '👨 Male (Lifter)',
      female: '👩 Female',
      age: 'Age',
      years: 'Years',
      weight: 'Weight (kg)',
      height: 'Height',
      primaryGoal: 'Primary Fitness Goal',
      goalFatLoss: 'Fat Loss (-400 kcal)',
      goalMuscleGain: 'Muscle Gain (+300 kcal)',
      goalMaintenance: 'Maintenance (Recomp)',
      activityLevel: 'Weekly Activity Level',
      dailyMacroTitle: 'Your Daily Macro Targets',
      bmr: 'BMR',
      tdee: 'TDEE',
      prescribedEnergy: 'Prescribed Daily Energy',
      kcalDay: 'kcal / day',
      dailyProtein: 'Daily Protein',
      cleanCarbs: 'Clean Carbs',
      essentialFats: 'Essential Fats',
      hydrationTarget: 'Daily Hydration Target:',
      litersDay: 'Liters Water / Day',
      sendWhatsapp: 'Get This Personalized Diet Plan Sent to WhatsApp →',
      mealsTitle: 'Your Tailored 4-Meal Bengali Day Blueprint',
      localAssurance: '100% affordable local foods available in any Munshiganj bazaar. Zero expensive supplements required.',
      claimDietCta: 'Claim Full Diet Chart & Free Trial'
    },
    bmi: {
      badge: 'Instant Body Composition Analysis',
      title: 'Clinical BMI & Physique Target Calculator',
      subtitle: 'Check where you stand on the medical Body Mass Index scale and receive recommended training programs.',
      heightLabel: 'Height',
      weightLabel: 'Weight',
      ageLabel: 'Age',
      bmiScore: 'Your BMI Score',
      categoryUnderweight: 'Underweight',
      categoryNormal: 'Normal / Athletic',
      categoryOverweight: 'Overweight',
      categoryObese: 'Obese / Heavy',
      recommendationTitle: 'Recommended Gym Program',
      claimSuggestedPlan: 'Enroll in This Suggested Program'
    },
    pricing: {
      badge: 'Transparent & Value-Packed',
      title: 'Membership Plans & Pricing',
      subtitle: 'Join Munshiganj’s most respected fitness center. No hidden registration fees.',
      popularBadge: 'MOST POPULAR · BEST VALUE',
      includedBadge: '100% Included',
      bdt: '৳',
      monthly: 'Monthly Plan',
      quarterly: '3 Months Value',
      yearly: 'Yearly VIP Pass',
      getStarted: 'Get Started Now',
      refundAssurance: 'Free 1-day pass included for all first-time visitors.'
    },
    trainers: {
      badge: 'Professional Bodybuilders & Mentors',
      title: 'Meet Our Certified Coaches',
      subtitle: 'Learn from champions who live the lifestyle and know how to safely build strength.',
      coachTitle: 'Coach',
      experienceLabel: 'Experience',
      achievementsLabel: 'Career Achievements',
      specialtiesLabel: 'Key Specialties',
      consultCoach: 'Book Coaching Consultation',
      flipHint: '🔄 Hover or Tap to flip profile card'
    },
    reviews: {
      badge: 'Unmatched Member Satisfaction',
      title: 'Rated 4.6 Stars on Google',
      subtitle: 'Read genuine reviews from athletes and fitness enthusiasts training in Munshiganj.',
      overallScore: '4.6 Stars',
      verifiedMembers: '14 Verified Google Reviews',
      viewGoogleReviews: 'View on Google Maps →',
      writeReview: 'Leave a Member Review'
    },
    contact: {
      badge: 'Visit & Connect',
      title: 'Get in Touch with Old Gym',
      subtitle: 'Drop in for a workout or message our head coach directly on WhatsApp.',
      gymAddress: 'HF2W+4J8, Munshiganj Sadar, Munshiganj 1500',
      callNow: '01919-048227',
      operatingHours: 'Operating Hours',
      mensShift: "👨 Men's Shift",
      womensShift: "👩 Women's Shift",
      fridaySpecial: '🕌 Friday Special Slot',
      formTitle: 'Send a Direct Inquiry',
      fullName: 'Full Name',
      phone: 'Phone Number',
      interest: 'Interested In',
      message: 'Your Message / Fitness Goals',
      submit: 'Send Inquiry via WhatsApp',
      submitting: 'Processing...',
      successMessage: 'Thank you! We will get back to you shortly.'
    },
    footer: {
      tagline: 'Best Gym in Munshiganj Area - Clean & Professional',
      quickLinks: 'Quick Links',
      timingHeader: 'Operating Shifts',
      contactHeader: 'Location & Contact',
      rights: 'All rights reserved.',
      adminLogin: 'Admin Portal Login'
    },
    admin: {
      portalTitle: 'Old Gym Management Portal',
      dashboard: 'Admin Dashboard',
      overview: 'Overview & Revenue',
      members: 'Member Management',
      content: 'Master Content Editor',
      leads: 'Leads & Inquiries',
      logout: 'Exit Admin',
      viewSite: 'View Live Site',
      totalRevenue: 'Monthly Revenue',
      activeMembers: 'Active Members',
      pendingPayments: 'Pending Payments',
      newLeads: 'New Leads',
      scheduleEditor: 'Gym Operating Hours Editor',
      mensSchedule: "Men's Shift Schedule",
      womensSchedule: "Women's Shift Schedule",
      fridaySchedule: "Friday Special Slot",
      saveSchedule: 'Save Schedule Changes',
      savedSuccess: 'Schedule updated successfully!',
      addMember: 'Add New Member',
      searchPlaceholder: 'Search members by name or phone...',
      lockTitle: 'Admin Security Verification',
      lockSubtitle: 'Enter master security password or PIN to unlock the management portal.',
      passcodeLabel: 'Admin Security PIN / Password',
      passcodePlaceholder: 'Enter admin password (e.g. admin123)',
      invalidError: 'Invalid Admin Passcode!',
      verifyBtn: 'Verify & Access',
      cancelBtn: 'Cancel',
      defaultNote: 'Default demo password:',
      showPassword: 'Show password',
      hidePassword: 'Hide password'
    }
  },
  bn: {
    nav: {
      home: 'হোম',
      about: 'আমাদের সম্পর্কে',
      classes: 'ক্লাসসমূহ',
      equipment: 'ইকুইপমেন্ট',
      transformations: 'ট্রান্সফরমেশন',
      dietWorkout: 'ডায়েট ও ওয়ার্কআউট',
      bmi: 'বিএমআই ক্যালকুলেটর',
      pricing: 'প্যাকেজ ও ফি',
      trainers: 'ট্রেনারবৃন্দ',
      reviews: 'রিভিউ',
      gallery: 'গ্যালারি',
      contact: 'যোগাযোগ',
      joinNow: 'ভর্তি হোন',
      callNow: 'কল করুন',
      adminPortal: 'অ্যাডমিন প্যানেল',
      langName: 'English',
      more: 'আরও'
    },
    hero: {
      badgeRating: '⭐ ৪.৬ (১৪টি গুগল রিভিউ)',
      badgeReviews: 'গুগল রিভিউ',
      badgeLoved: 'মুন্সীগঞ্জের সবচেয়ে জনপ্রিয় জিম',
      title1: 'গড়ুন আপনার শরীর,',
      title2: 'তৈরি করুন আপনার পরিচয়',
      subtitle: 'ওল্ড জিম মুন্সীগঞ্জ শহরের সবচেয়ে পরিষ্কার-পরিচ্ছন্ন, আধুনিক ও প্রফেশনাল ফিটনেস সেন্টার—যা পরিচালিত হয় পেশাদার বডিবিল্ডারদের দ্বারা।',
      bengaliTag: 'ওল্ড জিম হেলথ & ফিটনেস সেন্টার',
      tagline: 'মুন্সীগঞ্জ এলাকার সেরা জিম - পরিষ্কার ও প্রফেশনাল',
      startTrial: 'ফ্রি ট্রায়াল শুরু করুন',
      ratingStat: '৪.৬★',
      ratingStatLabel: 'গুগল রেটিং',
      equipStat: '৫০+',
      equipStatLabel: 'ভারী রড ও মেশিন',
      proStat: '১০০%',
      proStatLabel: 'প্রো বডিবিল্ডার পরিচালিত',
      card1Title: 'নতুন ইকুইপমেন্ট',
      card1Badge: '৪০ কেজি+ ডাম্বেল',
      card1Desc: 'ভারী অলিম্পিক রড, পাওয়ার কেজ, কেবল ক্রসওভার ও বিশ্বমানের এক্সারসাইজ মেশিন।',
      card2Title: 'পরিষ্কার পরিবেশ',
      card2Badge: '১০০% পরিচ্ছন্ন',
      card2Desc: 'চকচকে আয়না, জীবাণুমুক্ত ম্যাট, পর্যাপ্ত বাতাস ও দুর্গন্ধমুক্ত চমৎকার পরিবেশ।',
      card3Title: 'প্রো ট্রেনারবৃন্দ',
      card3Badge: 'চ্যাম্পিয়ন ট্রেনার',
      card3Desc: 'পেশাদার বডিবিল্ডারদের কাছ থেকে সঠিক অঙ্গভঙ্গি ও ইনজুরি-মুক্ত ওয়ার্কআউটের দিকনির্দেশনা।'
    },
    about: {
      badge: 'ওল্ড জিম হেলথ & ফিটনেস সম্পর্কে',
      title: 'মুন্সীগঞ্জের সেরা ফিটনেস সেন্টার',
      subtitle: 'শরীরচর্চায় সত্যিকারের উৎকর্ষতা অর্জনের লক্ষ্য নিয়ে প্রতিষ্ঠিত ওল্ড জিম (ওল্ড জিম হেলথ & ফিটনেস সেন্টার) মুন্সীগঞ্জে পরিচ্ছন্নতা, ভারী স্ট্রেংথ ট্রেনিং এবং আন্তরিক দিকনির্দেশনার এক নির্ভরযোগ্য প্রতিষ্ঠান।',
      featuresBadge: 'কেন বেছে নেবেন ওল্ড জিম',
      featuresTitle: 'বাস্তব শারীরিক পরিবর্তনের জন্য বিশেষভাবে প্রস্তুত',
      featuresSubtitle: '১০০% পরিষ্কার পরিবেশ, ভারী অলিম্পিক ইকুইপমেন্ট ও পেশাদার বডিবিল্ডারদের দিকনির্দেশনার সমন্বয়ে অনন্য অভিজ্ঞতা।',
      f1Title: 'অভিজ্ঞ প্রো ট্রেনার',
      f1Desc: 'জাতীয় পর্যায়ের বডিবিল্ডিং চ্যাম্পিয়নদের সরাসরি তত্ত্বাবধান ও প্রতিটি রেপে সঠিক পোস্টার নিশ্চিতকরণ।',
      f1Badge: 'সার্টিফায়েড কোচ',
      f1Stat: '১০০% নজরদারি',
      f2Title: '১০০% পরিচ্ছন্ন পরিবেশ',
      f2Desc: 'মুন্সীগঞ্জের সবচেয়ে পরিষ্কার জিম—উন্নত এসি ও এয়ারফ্লো, জীবাণুমুক্ত ম্যাট, চকচকে আয়না ও পরিষ্কার লকার।',
      f2Badge: '১০০% পরিচ্ছন্ন',
      f2Stat: 'প্রতিদিন ডিপ স্যানিটাইজড',
      f3Title: 'ভারী অলিম্পিক রড ও ডাম্বেল',
      f3Desc: 'ক্যালিবারেটেড অলিম্পিক বারবেল, ৪০ কেজি+ পর্যন্ত ভারী ডাম্বেল, কেবল ক্রসওভার ও ডেডলিফট প্ল্যাটফর্ম।',
      f3Badge: '৪০ কেজি+ ডাম্বেল',
      f3Stat: '৫০+ হেভি স্টেশন',
      f4Title: 'ব্যক্তিগত বাংলা ডায়েট চার্ট',
      f4Desc: 'আমাদের নিজস্ব মাছ, মুরগি, ডিম ও ভাতের সহজলভ্য উপাদান দিয়ে তৈরি বৈজ্ঞানিক ম্যাক্রো ও ক্যালোরি প্ল্যান।',
      f4Badge: 'বাংলা ডায়েট চার্ট',
      f4Stat: 'কাস্টম ম্যাক্রো',
      f5Title: 'পর্যাপ্ত মেশিন ও স্পেস',
      f5Desc: 'ডুপ্লিকেট কেবল মেশিন, একাধিক বেঞ্চ এবং প্রশস্ত স্পেস—কোনো দীর্ঘ লাইন বা জটলা ছাড়াই নির্বিঘ্নে ওয়ার্কআউট।',
      f5Badge: 'জিরো জটলা',
      f5Stat: 'খোলামেলা স্পেস',
      f6Title: 'সম্মান ও আন্তরিক ভ্রাতৃত্ব',
      f6Desc: 'নতুন ও অভিজ্ঞ সবার জন্য সমান সম্মান ও উৎসাহব্যঞ্জক পরিবেশ, যেখানে সবাই একে অপরকে এগিয়ে নিতে সাহায্য করে।',
      f6Badge: 'জিরো জাজমেন্ট',
      f6Stat: 'সুরক্ষিত পরিবার',
      claimBenefit: '১ দিনের ফ্রি ভিআইপি পাস নিন',
      verifiedBadge: 'ভেরিফায়েড মুন্সীগঞ্জ ফ্যাসিলিটি',
      verifiedTitle: 'উন্নত মানের ভারী সরঞ্জাম ও আধুনিক মেশিন',
      storyBadge: 'ওল্ড জিমের বিশেষত্ব',
      storyTitle: 'যেখানে শৃঙ্খলা এবং বিশ্বমানের ট্রেনিং একসাথে',
      storyDesc: 'সাধারণ ভিড়ভাট্টাপূর্ণ বা ভাঙাচোরা জিমের চেয়ে আলাদা, ওল্ড জিম প্রতিদিন সযত্নে পরিচর্যা করা হয়। আপনি ওজন কমাতে চান কিংবা বডিবিল্ডিং করতে চান—আমাদের আন্তরিক ভ্রাতৃত্ববোধ ও সঠিক গাইডলাইনে আপনার শারীরিক পরিবর্তন নিশ্চিত।',
      point1Title: 'জিরো জাজমেন্ট, ১০০% ভ্রাতৃত্ববোধ',
      point1Desc: 'বন্ধুত্বপূর্ণ স্টাফ ও সহৃদয় মেম্বারদের মাঝে নিরাপদে ও স্বাচ্ছন্দ্যে শরীরচর্চা করার পরিবেশ।',
      point2Title: 'প্রতিটি রেপে সঠিক পরামর্শ',
      point2Desc: 'ইনজুরি এড়াতে ট্রেনাররা সরাসরি সঠিক শারীরিক ভঙ্গি ও ফর্ম নিশ্চিত করে থাকেন।',
      ctaExperience: 'সরাসরি এসে ঘুরে দেখুন',
      ctaMaps: 'গুগল ম্যাপে লোকেশন দেখুন (HF2W+4J8) →'
    },
    equipment: {
      badge: 'প্রমাণিত ভারী সরঞ্জাম ও মেশিন',
      title: 'আমাদের আধুনিক জিম ইকুইপমেন্ট',
      subtitle: 'সঠিক মাসল টেনশন ও সর্বোচ্চ নিরাপত্তার কথা মাথায় রেখে আন্তর্জাতিক মানের সরঞ্জাম দ্বারা সজ্জিত।',
      filterAll: 'সকল সরঞ্জাম',
      filterFreeWeights: 'ফ্রি ওয়েট ও ডাম্বেল',
      filterCablePin: 'কেবল ও পিন লোডেড মেশিন',
      filterRacks: 'পাওয়ার কেজ ও বেঞ্চ',
      filterCardio: 'কার্ডিও ও স্ট্যামিনা',
      specsTitle: 'ইকুইপমেন্টের কারিগরি বিবরণ',
      claimTrial: '১ দিনের ফ্রি ট্রায়ালে এই মেশিন ব্যবহার করে দেখুন'
    },
    classes: {
      badge: 'বিশেষ ট্রেনিং প্রোগ্রাম',
      title: 'অভিজ্ঞদের পরিচালিত ট্রেনিং ক্লাস',
      subtitle: 'পেশিবহুল শরীর গঠন থেকে শুরু করে দ্রুত চর্বি কমানো এবং প্রতিযোগিতা প্রস্তুতির জন্য উপযোগী।',
      claimPass: 'ফ্রি ক্লাস পাস নিন',
      viewDetails: 'বিস্তারিত দেখুন',
      level: 'লেভেল',
      schedule: 'সময়সূচি'
    },
    transformation: {
      badge: 'সদস্যদের বাস্তব অর্জন',
      title: 'বাস্তব শারীরিক রূপান্তর (Transformation)',
      subtitle: 'মুন্সীগঞ্জের সাধারণ তরুণদের একাগ্রতা ও ওল্ড জিমের সঠিক নির্দেশনায় অর্জিত পরিবর্তন দেখুন।',
      dragHint: '↔ আগের ও পরের ছবি তুলনা করতে গোল্ডেন স্লাইডারটি ডানে-বামে টানুন',
      beforeLabel: 'আগে (Before)',
      afterLabel: 'পরে (ওল্ড জিম)',
      metricsTimeframe: 'সময়সীমা',
      metricsFatLoss: 'চর্বি কমেছে',
      metricsMuscleGain: 'পেশি বৃদ্ধি পেয়েছে',
      startJourney: 'আজই শুরু করুন আপনার শারীরিক রূপান্তর',
      guarantee: '৯০ দিনের নিবিড় কোচিং গ্যারান্টি'
    },
    nutrition: {
      badge: 'ইন্টারেক্টিভ নিউট্রিশন ও ট্রেনিং ইঞ্জিন',
      title: 'ব্যক্তিগত পুষ্টি ও খাবার তালিকা জেনারেটর',
      subtitle: 'বৈজ্ঞানিক Mifflin-St Jeor সূত্রের মাধ্যমে আপনার দৈনিক ক্যালরি ও প্রোটিনের সঠিক চাহিদা জানুন এবং সহজলভ্য দেশি খাবারের সমন্বয়ে তৈরি পুষ্টিকর তালিকা পান।',
      tabDiet: 'ব্যক্তিগত ডায়েট জেনারেটর',
      tabWorkout: '৪ দিনের ওয়ার্কআউট স্প্লিট',
      biometricsTitle: 'শারীরিক তথ্যাদি',
      reset: 'রিসেট',
      gender: 'লিঙ্গ',
      male: '👨 পুরুষ (লিফটার)',
      female: '👩 নারী',
      age: 'বয়স',
      years: 'বছর',
      weight: 'ওজন (কেজি)',
      height: 'উচ্চতা',
      primaryGoal: 'মূল ফিটনেস লক্ষ্য',
      goalFatLoss: 'চর্বি কমানো (-৪০০ ক্যালরি)',
      goalMuscleGain: 'মাসল গেইন (+৩০০ ক্যালরি)',
      goalMaintenance: 'ওজন ধরে রাখা (রিকম্প)',
      activityLevel: 'সাপ্তাহিক অ্যাক্টিভিটি লেভেল',
      dailyMacroTitle: 'আপনার দৈনিক পুষ্টির লক্ষ্যমাত্রা',
      bmr: 'বিএমআর',
      tdee: 'টিডিইই',
      prescribedEnergy: 'প্রয়োজনীয় দৈনিক ক্যালরি',
      kcalDay: 'ক্যালরি / প্রতিদিন',
      dailyProtein: 'দৈনিক প্রোটিন',
      cleanCarbs: 'স্বাস্থ্যকর শর্করা',
      essentialFats: 'প্রয়োজনীয় ফ্যাট',
      hydrationTarget: 'দৈনিক পানির চাহিদা:',
      litersDay: 'লিটার পানি / প্রতিদিন',
      sendWhatsapp: 'হোয়াটসঅ্যাপে এই ডায়েট চার্টটি গ্রহণ করুন →',
      mealsTitle: 'আপনার জন্য ৪ বেলার দেশি পুষ্টিকর খাবার তালিকা',
      localAssurance: 'মুন্সীগঞ্জের স্থানীয় বাজারে পাওয়া যায় এমন সাশ্রয়ী ও পুষ্টিকর খাবার। কোনো ব্যয়বহুল সাপ্লিমেন্টের প্রয়োজন নেই।',
      claimDietCta: 'সম্পূর্ণ ডায়েট চার্ট ও ফ্রি ট্রায়াল নিন'
    },
    bmi: {
      badge: 'তাৎক্ষণিক শারীরিক গঠন পরীক্ষা',
      title: 'ক্লিনিক্যাল বিএমআই ও স্বাস্থ্য ক্যালকুলেটর',
      subtitle: 'মেডিকেল বিএমআই স্কেলে আপনার বর্তমান অবস্থা পরীক্ষা করুন এবং আপনার জন্য মানানসই জিম প্রোগ্রাম জানুন।',
      heightLabel: 'উচ্চতা',
      weightLabel: 'ওজন',
      ageLabel: 'বয়স',
      bmiScore: 'আপনার বিএমআই স্কোর',
      categoryUnderweight: 'কম ওজন (Underweight)',
      categoryNormal: 'স্বাভাবিক ও ফিট (Normal)',
      categoryOverweight: 'অতিরিক্ত ওজন (Overweight)',
      categoryObese: 'স্থূলতা (Obese)',
      recommendationTitle: 'আপনার জন্য প্রস্তাবিত জিম প্রোগ্রাম',
      claimSuggestedPlan: 'এই প্রোগ্রামে ভর্তি হোন'
    },
    pricing: {
      badge: 'স্বচ্ছ ও সাশ্রয়ী ফি',
      title: 'মেম্বারশিপ প্যাকেজ ও মাসিক ফি',
      subtitle: 'মুন্সীগঞ্জের সেরা ফিটনেস সেন্টারে যুক্ত হোন। কোনো লুকানো চার্জ বা বাড়তি ফি নেই।',
      popularBadge: 'সবচেয়ে জনপ্রিয় · সেরা সাশ্রয়ী',
      includedBadge: '১০০% অন্তর্ভুক্ত',
      bdt: '৳',
      monthly: 'মাসিক প্যাকেজ',
      quarterly: '৩ মাসের প্যাকেজ',
      yearly: '১ বছরের ভিআইপি প্যাকেজ',
      getStarted: 'ভর্তি নিশ্চিত করুন',
      refundAssurance: 'প্রথমবার আগতদের জন্য রয়েছে ১ দিনের ফ্রি ট্রায়াল পাস।'
    },
    trainers: {
      badge: 'পেশাদার বডিবিল্ডার ও ট্রেনারবৃন্দ',
      title: 'আমাদের অভিজ্ঞ ট্রেনারদের সাথে পরিচিত হোন',
      subtitle: 'চ্যাম্পিয়ন ট্রেনারদের কাছ থেকে শিখুন, যারা নিয়মিত জিম করেন এবং শরীর গঠনের প্রতিটি বিজ্ঞান জানেন।',
      coachTitle: 'কোচ',
      experienceLabel: 'অভিজ্ঞতা',
      achievementsLabel: 'অর্জন ও পুরস্কার',
      specialtiesLabel: 'বিশেষ পারদর্শিতা',
      consultCoach: 'কোচিং পরামর্শ বুক করুন',
      flipHint: '🔄 বিস্তারিত দেখতে কার্ডে চাপুন বা হোভার করুন'
    },
    reviews: {
      badge: 'সদস্যদের অকুণ্ঠ ভালোবাসা',
      title: 'গুগলে ৪.৬ স্টার রেটিংপ্রাপ্ত জিম',
      subtitle: 'মুন্সীগঞ্জের অ্যাথলেট ও সাধারণ সদস্যদের বাস্তব মতামত ও সন্তুষ্টির অভিজ্ঞতা পড়ুন।',
      overallScore: '৪.৬ স্টার',
      verifiedMembers: '১৪টি ভেরিফায়েড গুগল রিভিউ',
      viewGoogleReviews: 'গুগল ম্যাপে সব রিভিউ দেখুন →',
      writeReview: 'একটি রিভিউ দিন'
    },
    contact: {
      badge: 'সরাসরি চলে আসুন',
      title: 'ওল্ড জিমের সাথে যোগাযোগ করুন',
      subtitle: 'সরাসরি জিম পরিদর্শন করুন অথবা আমাদের প্রধান ট্রেনারকে হোয়াটসঅ্যাপে মেসেজ পাঠান।',
      gymAddress: 'HF2W+4J8, মুন্সীগঞ্জ সদর, মুন্সীগঞ্জ ১৫০০',
      callNow: '০১৯১৯-০৪৮২২৭',
      operatingHours: 'খোলা থাকার সময়সূচি',
      mensShift: '👨 পুরুষদের শিফট',
      womensShift: '👩 নারীদের শিফট',
      fridaySpecial: '🕌 শুক্রবার স্পেশাল শিফট',
      formTitle: 'মেসেজ বা ভর্তির অনুসন্ধান পাঠান',
      fullName: 'আপনার পুরো নাম',
      phone: 'মোবাইল নম্বর',
      interest: 'আগ্রহের বিষয়',
      message: 'আপনার লক্ষ্য বা বার্তা',
      submit: 'হোয়াটসঅ্যাপে পাঠান',
      submitting: 'প্রক্রিয়াধীন...',
      successMessage: 'ধন্যবাদ! আমরা খুব শীঘ্রই আপনার সাথে যোগাযোগ করব।'
    },
    footer: {
      tagline: 'মুন্সীগঞ্জ এলাকার সেরা জিম - পরিষ্কার ও প্রফেশনাল',
      quickLinks: 'প্রয়োজনীয় লিংক',
      timingHeader: 'জিমের সময়সূচি',
      contactHeader: 'ঠিকানা ও ফোন',
      rights: 'সর্বস্বত্ব সংরক্ষিত।',
      adminLogin: 'অ্যাডমিন লগইন'
    },
    admin: {
      portalTitle: 'ওল্ড জিম ম্যানেজমেন্ট পোর্টাল',
      dashboard: 'অ্যাডমিন ড্যাশবোর্ড',
      overview: 'আয় ও পরিসংখ্যান',
      members: 'সদস্য ব্যবস্থাপনা',
      content: 'কন্টেন্ট ও শিডিউল এডিটর',
      leads: 'অনুসন্ধান ও সম্ভাব্য সদস্য',
      logout: 'অ্যাডমিন প্রস্থান',
      viewSite: 'লাইভ ওয়েবসাইট দেখুন',
      totalRevenue: 'মাসিক আয়',
      activeMembers: 'সক্রিয় সদস্য',
      pendingPayments: 'বকেয়া ফি',
      newLeads: 'নতুন অনুসন্ধান',
      scheduleEditor: 'জিমের সময়সূচি পরিবর্তন',
      mensSchedule: 'পুরুষদের শিফট সময়',
      womensSchedule: 'নারীদের শিফট সময়',
      fridaySchedule: 'শুক্রবার বিশেষ সময়',
      saveSchedule: 'সময়সূচি সংরক্ষণ করুন',
      savedSuccess: 'সময়সূচি সফলভাবে সংরক্ষিত হয়েছে!',
      addMember: 'নতুন সদস্য যোগ করুন',
      searchPlaceholder: 'নাম বা মোবাইল নম্বর দিয়ে খুঁজুন...',
      lockTitle: 'অ্যাডমিন সিকিউরিটি ভেরিফিকেশন',
      lockSubtitle: 'ম্যানেজমেন্ট প্যানেলে প্রবেশের জন্য সিকিউরিটি পাসওয়ার্ড বা পিন প্রদান করুন।',
      passcodeLabel: 'অ্যাডমিন সিকিউরিটি পিন / পাসওয়ার্ড',
      passcodePlaceholder: 'অ্যাডমিন পাসওয়ার্ড লিখুন (যেমনঃ admin123)',
      invalidError: 'Invalid Admin Passcode! ভুল অ্যাডমিন পাসকোড!',
      verifyBtn: 'Verify & Access (যাচাই ও প্রবেশ)',
      cancelBtn: 'Cancel (বাতিল)',
      defaultNote: 'ডিফল্ট ডেমো পাসকোড:',
      showPassword: 'পাসওয়ার্ড দেখান',
      hidePassword: 'পাসওয়ার্ড লুকান'
    }
  }
};

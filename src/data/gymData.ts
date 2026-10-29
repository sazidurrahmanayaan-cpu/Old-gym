export interface Review {
  id: string;
  name: string;
  avatarText: string;
  rating: number;
  reviewText: string;
  date: string;
  tag: string;
}

export interface GymClass {
  id: string;
  title: string;
  category: string;
  intensity: 'Medium' | 'High' | 'Extreme';
  schedule: string;
  description: string;
  highlights: string[];
  icon: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  billingPeriod: string;
  savings?: string;
  popular?: boolean;
  description: string;
  features: string[];
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  experience: string;
  specialties: string[];
  achievements: string;
  image: string;
}

export const GYM_INFO = {
  name: 'Old Gym Health & Fitness Center',
  bengaliName: 'ওল্ড জিম হেলথ & ফিটনেস সেন্টার',
  tagline: 'Best Gym in Munshiganj Area - Clean & Professional',
  logoImage: '/assets/images/old_gym_logo_badge_1790470745512.jpg',
  rating: 4.6,
  reviewCount: 14,
  phone: '01919-048227',
  formattedPhone: '+880 1919-048227',
  address: 'HF2W+4J8, Munshiganj',
  addressDetailed: 'HF2W+4J8, Munshiganj Sadar, Munshiganj 1500, Bangladesh',
  facebook: 'https://www.facebook.com/photo/?fbid=131508805643437&set=a.131508785643439&__tn__=%3C',
  facebookHandle: 'Old Gym Munshiganj Official Facebook',
  whatsappPhone: '01825-282322',
  whatsappNumber: '8801825282322',
  whatsappUrl: 'https://wa.me/8801825282322?text=Hello%20Old%20Gym%20Munshiganj!%20I%20am%20interested%20in%20joining%20and%20would%20like%20more%20information%20about%20packages%2C%20shift%20timings%2C%20and%20fees.',
  callUrl: 'tel:01919048227',
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=HF2W%2B4J8%2C+Munshiganj',
  googleMapsEmbed: 'https://maps.google.com/maps?q=HF2W%2B4J8%2C%20Munshiganj&t=&z=15&ie=UTF8&iwloc=&output=embed',
  hours: [
    { days: 'Saturday – Thursday', time: '6:00 AM – 10:30 PM' },
    { days: 'Friday', time: '3:00 PM – 9:30 PM' },
  ]
};

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Nazmul Hassan',
    avatarText: 'NH',
    rating: 5,
    reviewText: 'Experienced trainer, Good behavior, Enough space, clean & good environment, Best Gym in Munshiganj area',
    date: 'Verified Member',
    tag: 'Long-term Member'
  },
  {
    id: 'rev-2',
    name: 'ErronBlacK',
    avatarText: 'EB',
    rating: 5,
    reviewText: 'One of the best gym in munshiganj, great place for professional athletes. Friendly Members and stuffs, Runs by professional bodybuilder',
    date: 'Local Guide',
    tag: 'Athlete Member'
  },
  {
    id: 'rev-3',
    name: 'Antarik Islam',
    avatarText: 'AI',
    rating: 5,
    reviewText: 'Nice place. New equipment, Clean environment, Most attractive gym at Munshiganj',
    date: 'Fitness Enthusiast',
    tag: 'Active Member'
  }
];

export const FEATURES = [
  {
    id: 'feat-1',
    title: 'Experienced Trainer',
    subtitle: 'Run by Professional Bodybuilders',
    description: 'Direct mentoring from competitive bodybuilding champions who understand biomechanics, progressive overload, and customized form correction for real results.',
    icon: 'Trophy',
    stats: '100% Certified Coaches'
  },
  {
    id: 'feat-2',
    title: 'Clean & Sanitized Environment',
    subtitle: 'Hygienic, Odor-Free & Spacious',
    description: 'Munshiganj’s cleanest gym with high-airflow ventilation, continuous equipment sanitization, fresh filtered water, and spotless changing facilities.',
    icon: 'Sparkles',
    stats: 'Daily Deep Sanitization'
  },
  {
    id: 'feat-3',
    title: 'Enough Space & New Equipment',
    subtitle: 'Commercial Grade Heavy Iron',
    description: 'No waiting lines. Equipped with calibrated Olympic barbells, heavy dumbbells up to 40kg+, multi-grip cable crossover stations, squat cages, and dedicated deadlift platforms.',
    icon: 'Dumbbell',
    stats: '50+ High-End Machines'
  }
];

export const CLASSES: GymClass[] = [
  {
    id: 'class-1',
    title: 'Weight Training',
    category: 'Hypertrophy & Tone',
    intensity: 'High',
    schedule: 'Daily Sessions (Morning & Evening)',
    description: 'Targeted progressive overload training utilizing Olympic free weights, dumbbells, and cable isolation to build dense muscle mass.',
    highlights: ['Compound movement mastery', 'Tailored workout splits', 'Form supervision'],
    icon: 'Dumbbell'
  },
  {
    id: 'class-2',
    title: 'Cardio & Fat Loss',
    category: 'Conditioning & Shred',
    intensity: 'High',
    schedule: 'Mon / Wed / Sat',
    description: 'High-intensity metabolic conditioning combining sprint intervals, treadmill endurance, rowing, and fat-incinerating circuits.',
    highlights: ['Maximum caloric burn', 'Cardiovascular stamina', 'Body composition tracking'],
    icon: 'Flame'
  },
  {
    id: 'class-3',
    title: 'Professional Bodybuilding',
    category: 'Competitive Physique',
    intensity: 'Extreme',
    schedule: 'Personalized Coaching Track',
    description: 'Run directly by professional bodybuilders for serious lifters seeking symmetrical mass, contest prep, posing coaching, and strict nutrition protocols.',
    highlights: ['Peak physique guidance', 'Contest preparation', 'Advanced hypertrophy principles'],
    icon: 'Award'
  },
  {
    id: 'class-4',
    title: 'Personal Training',
    category: '1-on-1 Dedicated',
    intensity: 'Medium',
    schedule: 'Flexible Timings by Booking',
    description: 'Dedicated 1-on-1 training with a certified mentor focused entirely on your unique anatomy, target body goals, and diet accountability.',
    highlights: ['Exclusive trainer focus', 'Weekly body scans', 'Personalized diet charts'],
    icon: 'UserCheck'
  },
  {
    id: 'class-5',
    title: 'Zumba & Aerobics',
    category: 'Rhythm & Calorie Burn',
    intensity: 'Medium',
    schedule: 'Tue / Thu / Sat',
    description: 'High-energy, music-driven aerobic choreography designed to torch calories, improve agility, and relieve everyday stress in a supportive environment.',
    highlights: ['Full body rhythm cardio', 'Fun group energy', 'Endurance building'],
    icon: 'Activity'
  },
  {
    id: 'class-6',
    title: 'Strength Training',
    category: 'Power & Core Lift',
    intensity: 'Extreme',
    schedule: 'Sun / Tue / Thu',
    description: 'Focus on raw mechanical power in the Big 3: Squat, Bench Press, and Deadlift. Build bulletproof joints, tendon resilience, and neuromuscular power.',
    highlights: ['Deadlift & Squat mastery', 'Central nervous adaptation', 'Core stability'],
    icon: 'Zap'
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'plan-monthly',
    name: 'Monthly Membership',
    price: 1000,
    billingPeriod: 'per month',
    popular: false,
    description: 'Ideal for those seeking monthly flexibility without any long-term commitment.',
    features: [
      'Unlimited Gym Access (6 AM - 10:30 PM)',
      'Access to All Heavy Iron & Cardio Machines',
      'Free Locker & Changing Room Access',
      'Initial Fitness & Goal Assessment',
      'General Trainer Floor Support',
      'Clean & Sanitized Environment'
    ]
  },
  {
    id: 'plan-quarterly',
    name: '3 Months Package',
    price: 2500,
    billingPeriod: 'for 3 months',
    savings: 'Save ৳500',
    popular: true,
    description: 'Our most popular transformation tier. Just ৳833/month with dedicated progress tracking.',
    features: [
      'Everything in Monthly Membership',
      'Customized 3-Month Workout Split Chart',
      'Personalized Nutrition & Diet Guidance',
      'Bi-weekly Body Composition Check',
      'Form & Posture Correction by Pro Bodybuilders',
      'Priority Locker Facility',
      '1 Free Guest Pass for a Friend'
    ]
  },
  {
    id: 'plan-yearly',
    name: 'Yearly VIP Membership',
    price: 8000,
    billingPeriod: 'per year',
    savings: 'Save ৳4,000',
    popular: false,
    description: 'The ultimate commitment to your legacy. Just ৳667/month for dedicated athletes.',
    features: [
      'Full 12 Months All-Access Membership',
      'Comprehensive Bodybuilding/Transformation Blueprint',
      'Direct WhatsApp Mentorship with Senior Coach',
      'Full Diet & Supplement Protocol Plan',
      'Exclusive Old Gym Branded Athlete T-Shirt',
      'Unlimited Guest Passes (1/month)',
      'Freeze Membership for up to 30 Days'
    ]
  }
];

export const TRAINERS: Trainer[] = [
  {
    id: 'trainer-1',
    name: 'Coach Farhan Ahmed',
    role: 'Professional Bodybuilder & Certified Trainer',
    experience: '9+ Years Professional Experience',
    specialties: ['Competitive Bodybuilding', 'Heavy Hypertrophy', 'Advanced Nutrition'],
    achievements: 'Divisional Bodybuilding Championship Medalist & Munshiganj Senior Coach',
    image: '/assets/images/trainer_bodybuilder_pro_1790467287018.jpg'
  },
  {
    id: 'trainer-2',
    name: 'Coach Tariqul Islam',
    role: 'Professional Bodybuilder & Certified Trainer',
    experience: '7+ Years Coaching Experience',
    specialties: ['Rapid Fat Loss', 'Functional Strength', 'Biomechanics & Form'],
    achievements: 'Certified Strength & Conditioning Specialist with 200+ successful body transformations',
    image: '/assets/images/hero_gym_dark_1790467261162.jpg'
  },
  {
    id: 'trainer-3',
    name: 'Coach Shahinur Rahman',
    role: 'Professional Bodybuilder & Certified Trainer',
    experience: '8+ Years Lifting & Mentoring',
    specialties: ['Powerlifting Fundamentals', 'Posture Correction', 'Athletic Conditioning'],
    achievements: 'District Powerlifting Champion & Expert in Injury-Free Heavy Compound Lifting',
    image: '/assets/images/gym_interior_training_1790467298261.jpg'
  }
];

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Heavy Dumbbell & Free Weight Rack',
    category: 'Free Weights',
    image: '/assets/images/about_gym_equipment_1790467275863.jpg'
  },
  {
    id: 'gal-2',
    title: 'Main Training Floor & Power Racks',
    category: 'Strength Zone',
    image: '/assets/images/hero_gym_dark_1790467261162.jpg'
  },
  {
    id: 'gal-3',
    title: 'High-End Resistance & Cable Machines',
    category: 'New Equipment',
    image: '/assets/images/gym_interior_training_1790467298261.jpg'
  },
  {
    id: 'gal-4',
    title: 'Professional Bodybuilder Coach Corner',
    category: 'Coaching',
    image: '/assets/images/trainer_bodybuilder_pro_1790467287018.jpg'
  },
  {
    id: 'gal-5',
    title: 'Deadlift Platform & Calibrated Olympic Bars',
    category: 'Strength Zone',
    image: '/assets/images/about_gym_equipment_1790467275863.jpg'
  },
  {
    id: 'gal-6',
    title: 'Spacious Cardio & Conditioning Floor',
    category: 'Clean Space',
    image: '/assets/images/hero_gym_dark_1790467261162.jpg'
  }
];

export const getWhatsAppInquiryUrl = (customMessage?: string): string => {
  const defaultText =
    'Hello Old Gym Munshiganj! I am interested in joining and would like more information about membership packages, shift timings, and fees.';
  return `https://wa.me/8801825282322?text=${encodeURIComponent(customMessage || defaultText)}`;
};


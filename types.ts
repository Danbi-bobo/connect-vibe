export enum ArchetypeID {
  Protector = 'A',
  Heart = 'B',
  Abundance = 'C',
  Calm = 'D',
  Intuitive = 'E'
}

export enum SubNeedID {
  Protection = 'protection',
  Confidence = 'confidence',
  EmotionalBalance = 'emotional_balance',
  Calm = 'calm',
  Intuition = 'intuition'
}

export interface QuizOption {
  id: string; // 'A' | 'B' | 'C' | 'D' | 'E' | or Zodiac IDs
  text: string;
  value?: string; // Used for Stage 2 mapping or specific values
  mapsTo?: SubNeedID; // For Q6/Q7
  symbol?: string; // For Zodiac display (Unicode char or icon name)
  detail?: string; // For Zodiac dates
}

export interface QuizQuestion {
  id: number;
  stage: number;
  question: string;
  options: QuizOption[];
}

export interface ProductRecommendation {
  id: string;
  name: string;
  description: string;
  ritual: string; // Context on HOW/WHEN to use this item
  image: string; // URL placeholder
  price: string;
  type: 'Primary' | 'Supportive';
  tags: SubNeedID[];
  upsells?: ProductRecommendation[];
}

export interface UpsellItem {
  name: string;
  description: string;
  image: string;
}

export interface ArchetypeResult {
  id: ArchetypeID;
  name: string;
  title: string;
  description: string;
  patternInsight: string; // "Your Energy Pattern" - deeper insight
  blindSpot: string; // "What's Blocking You" - friction point
  affirmation: string; // Personal mantra
  color: string;
  textColor: string;
  bgGradient: string;
  
  // Core Specs
  chakra: string;
  chakraMeaning: string;
  chakraUpsell: UpsellItem;

  element: string;
  elementMeaning: string;
  elementUpsell: UpsellItem;

  symbol: string;
  symbolMeaning: string;
  symbolUpsell: UpsellItem;

  // Personality & Lifestyle Fields
  inRelationships: string;
  atWork: string;
  leadershipStyle: string;
  stressResponse: string;
  growthPath: string;
}

export interface QuizResult {
  archetype: ArchetypeID;
  subNeed: SubNeedID;
  preference: string; // From Q8
  zodiac?: string; // From Q10
  email?: string;
}
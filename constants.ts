import { ArchetypeID, SubNeedID, QuizQuestion, ArchetypeResult, ProductRecommendation } from './types';

// ============================================
// REAL SHOPIFY CDN IMAGES
// ============================================
const IMG = {
  // Pixiu Series
  TIGER_EYE_PIXIU: "https://cdn.shopify.com/s/files/1/0977/7027/5097/files/3_d4ff1a0f-05e7-4444-b002-18aaf59bf6dc.webp?v=1765438479",
  PIXIU_YELLOW: "https://cdn.shopify.com/s/files/1/0977/7027/5097/files/product-christmas-yellow-pixiu_3ad6e8e7-cb1a-4e75-9081-4b42fa40ae87.png?v=1765438479",
  PIXIU_WHITE: "https://cdn.shopify.com/s/files/1/0977/7027/5097/files/product-christmas-white-pixiu_cd3a97b9-bb20-4c82-bbf4-e76a036dbda0.png?v=1765438477",
  PIXIU_GREEN: "https://cdn.shopify.com/s/files/1/0977/7027/5097/files/product-christmas-green-pixiu.png?v=1765438475",

  // Fox Queen Series
  FOX_YELLOW: "https://cdn.shopify.com/s/files/1/0977/7027/5097/files/product-christmas-yellow-fox.png?v=1765438474",
  FOX_GREEN: "https://cdn.shopify.com/s/files/1/0977/7027/5097/files/product-christmas-green-leaf_fbd27dc1-1bd5-460f-8fb9-3a1caebc688c.png?v=1765438472",
  CATS_EYE_FOX: "https://cdn.shopify.com/s/files/1/0977/7027/5097/files/2_b93db039-aa67-486c-8ec7-b0ed1f29c05a.webp?v=1765438469",

  // Zodiac Series
  ZODIAC_ALIGNMENT: "https://cdn.shopify.com/s/files/1/0977/7027/5097/files/Rotate_the_Zodiac_Alignment_Bracelet_Natural_Stone-1765359162700_c3c9685b-9dfa-4c7a-9e0a-d96f468de782.webp?v=1765451007",
  MIXED_ZODIAC: "https://cdn.shopify.com/s/files/1/0977/7027/5097/files/Center_the_Zodiac_Alignment_Bracelet_on_a_pure_whi-1765360109294.webp?v=1765736301",
  PREMIUM_ZODIAC: "https://cdn.shopify.com/s/files/1/0977/7027/5097/files/Edit_the_image_of_the_Premium_Zodiac_Power_Bracele-1765359178224.webp?v=1765360309",
  OBSIDIAN_ZODIAC: "https://cdn.shopify.com/s/files/1/0977/7027/5097/files/Adjust_the_angle_of_the_Premium_Zodiac_Power_Brace-1765422221301.webp?v=1765422328",
  ZODIAC_ENERGY: "https://cdn.shopify.com/s/files/1/0977/7027/5097/files/1_Center_the_Zodiac_Energy_Bracelet_Mixed_Natural-1765359016621.webp?v=1765360282",

  // Healing & Energy
  HEALING_NECKLACE: "https://cdn.shopify.com/s/files/1/0977/7027/5097/files/Rotate_the_Healing_Necklace_Natural_Stone_Titanium-1765359125932_dcbd442e-e614-4c1a-9ee4-37852d5c87a8.webp?v=1765451228",
  ENERGY_SET: "https://cdn.shopify.com/s/files/1/0977/7027/5097/files/Adjust_the_orientation_of_the_Energy_Alignment_Jew-1765359149137.webp?v=1765360828",
  CHAKRA_BALANCE: "https://cdn.shopify.com/s/files/1/0977/7027/5097/files/1_Center_the_Chakra_Balance_Bracelet_Mixed_Stones-1765359038520.webp?v=1765360685",
  CHAKRA_7: "https://cdn.shopify.com/s/files/1/0977/7027/5097/files/Center_the_7_Chakra_Healing_Bracelet_Natural_Stone-1765421830658.webp?v=1765451181",
  QUARTZ_CUFF: "https://cdn.shopify.com/s/files/1/0977/7027/5097/files/1_Center_the_Crystal_Point_Energy_Amplifier_Quart-1765359025524_9bbc14c2-252f-4b39-b6e5-0e80c37c0ca4.webp?v=1765450916",

  // Grounding & Protection
  AGARWOOD: "https://cdn.shopify.com/s/files/1/0977/7027/5097/files/Rotate_the_Grounding_Healing_Bracelet_Agarwood_in_-1765359155182_7846ba7a-95d4-45b9-8664-c3a02c419b97.webp?v=1765451158",
  NINE_EYE_DZI: "https://cdn.shopify.com/s/files/1/0977/7027/5097/files/Center_the_Nine-Eye_Dzi_Bead_Power_Bracelet_made_o-1765359060310_14d0a737-eaac-4b5d-8efc-2a2509c6e87f.webp?v=1765451072",

  // Fortune & Abundance
  FIRE_HORSE_STRING: "https://cdn.shopify.com/s/files/1/0977/7027/5097/files/Rotate_the_Fortune_Bracelet_Red_String_Fire_Horse_-1765359093284.webp?v=1765360579",
  FIRE_HORSE_AGATE: "https://cdn.shopify.com/s/files/1/0977/7027/5097/files/Rotate_the_Fire_Horse_Fortune_Bracelet_Red_Agate_t-1765359231322.webp?v=1765360621",
  FOUR_LEAF_CLOVER: "https://cdn.shopify.com/s/files/1/0977/7027/5097/files/7_9fb35c29-3754-4e89-84aa-3d10ff5cdb6d.webp?v=1765438470",
  EMERALD_SET: "https://cdn.shopify.com/s/files/1/0977/7027/5097/files/Adjust_the_orientation_of_the_Solar_Energy_Protect-1765359139601.webp?v=1765431384",

  // Guidance
  TAROT_NECKLACE: "https://cdn.shopify.com/s/files/1/0977/7027/5097/files/1_Center_the_Tarot_Guidance_Necklace_Titanium_Nat-1765359045414.webp?v=1765360386",
};

// ============================================
// ARCHETYPES
// ============================================
export const ARCHETYPES: Record<ArchetypeID, ArchetypeResult> = {
  [ArchetypeID.Protector]: {
    id: ArchetypeID.Protector,
    name: "Grounded Protector",
    title: "The Grounded Protector",
    description: "You are the steady anchor. A builder and stabilizer, you prioritize loyalty, practical care, and ensuring the safety of those you love.",
    patternInsight: "PATTERN I — THE FREQUENCY\n\nYour energy is 'Earth' in its most sacred form: solid, reliable, and enduring. Like the mountain, you do not move for the wind; you shape the wind. You are the 'Sanctuary Builder,' possessing a rare gravitational pull that regulates the nervous systems of everyone around you. \n\nPATTERN II — THE RELATIONSHIP\n\nIn connection, you offer 'Architectural Love.' You do not just feel; you do. You anticipate needs before they are spoken, handling the logistics of survival so others have the freedom to dream. You are the stillness in the storm.\n\nPATTERN III — THE CONTRIBUTION\n\nProfessionally, you are the backbone. Where others see chaos, you see a foundation waiting to be laid. You embody responsibility and discipline, turning abstract ideas into tangible reality.",
    blindSpot: "BLOCK I — THE WEIGHT\n\nYour shadow is 'Hyper-Vigilance.' You carry the weight of the world, often believing that if you let go, everything will collapse. This compulsion to protect can turn into rigid control or micromanagement.\n\nBLOCK II — THE SILENT BURNOUT\n\nYou often confuse being needed with being loved. You wait for others to care for you the way you care for them, but your strength makes you look unbreakable. This leads to silent resentment and deep physical exhaustion.\n\nBLOCK III — PATH TO EQUILIBRIUM\n\nYou must learn that boundaries are not walls; they are the structure that makes your love sustainable. True protection includes protecting your own energy. You can be a sanctuary without being the sacrifice.",
    affirmation: "I release the weight of the world. I am safe to rest.",
    color: "bg-stone-800",
    textColor: "text-stone-800",
    bgGradient: "from-stone-800 to-stone-600",

    chakra: "Root Chakra",
    chakraMeaning: "The Root Chakra (Muladhara) is your energetic foundation. Located at the base of the spine, it governs your sense of safety, survival, and physical belonging. When balanced, it provides the 'unshakable' quality you are known for.",
    chakraUpsell: { name: "Chakra Balance Bracelet", description: "Ultimate guardian talisman for protection & wealth.", image: "https://cdn.shopify.com/s/files/1/0977/7027/5097/files/IMG_5823.jpg?v=1765360685", url: "https://store.taichigemstone.com/products/chakra-balance-bracelet-mixed-stones" },

    element: "Earth",
    elementMeaning: "Earth energy is dense, physical, and slow-moving. It is the builder's frequency—capable of turning abstract ideas into tangible reality. It provides the container for all life to flourish.",
    elementUpsell: { name: "Grounding Healing Bracelet Agarwood", description: "Ancient wood energy to root you deeply.", image: IMG.AGARWOOD, url: "https://store.taichigemstone.com/products/grounding-healing-bracelet-agarwood" },

    symbol: "The Mountain",
    symbolMeaning: "The Mountain represents ancient, immovable presence. It witnesses the changing seasons and storms without being altered by them. It is the ultimate symbol of shelter and perspective.",
    symbolUpsell: { name: "Nine-Eye Dzi Bead Power Bracelet", description: "Tibetan protection symbol with Black Onyx.", image: IMG.NINE_EYE_DZI, url: "https://store.taichigemstone.com/products/nine-eye-dzi-bead-power-bracelet" },

    inRelationships: "Absolutely loyal and dependable, always ready to support. Shows love through practical actions and creates safety for their partner.",
    atWork: "Highly reliable and responsible, excels in support roles. Manages details expertly and maintains systems with precision.",
    leadershipStyle: "Servant leadership approach. Creates stable environments, cares deeply for team welfare, and maintains beneficial traditions.",
    stressResponse: "Becomes over-worried and tends to micromanage. May self-sacrifice excessively and finds it hard to refuse requests.",
    growthPath: "Learn to prioritize self → Develop flexibility → Accept change → Create healthy boundaries"
  },
  [ArchetypeID.Heart]: {
    id: ArchetypeID.Heart,
    name: "Heart Aligner",
    title: "The Heart Aligner",
    description: "You are the emotional alchemist. A nurturer and connector, you navigate the world through deep empathy, authenticity, and the wisdom of feeling.",
    patternInsight: "PATTERN I — THE FREQUENCY\n\nYou operate with a 'Third Ear,' hearing the emotional texture beneath words. Your nature is fluid like Water—adaptable, deep, and healing. You do not fear the dark waters of emotion; you know that is where the pearl is found.\n\nPATTERN II — THE RELATIONSHIP\n\nIntimacy is your oxygen. You are the 'Mirror' that reflects people's truth back to them with compassion. You bind communities together, instinctively knowing how to weave disparate threads into a tapestry of belonging.\n\nPATTERN III — THE CONTRIBUTION\n\nYou lead through 'Inspirational Empathy.' You build cultures of trust where vulnerability is seen as strength. Your superpower is transforming sterile environments into spaces of genuine human connection.",
    blindSpot: "BLOCK I — THE SPONGE\n\nYour boundary is permeable. You do not just witness emotion; you absorb it. When the room is heavy, you become heavy. You often lose the edges of where you end and others begin.\n\nBLOCK II — EMPATHY FATIGUE\n\nTo survive the noise of others' needs, you may periodically shut down, withdrawing into numbness. This creates a painful cycle of over-giving followed by guilt-ridden retreat.\n\nBLOCK III — PATH TO EQUILIBRIUM\n\nYou must develop 'Compassionate Detachment.' Validating another's experience does not require carrying it for them. Your empathy is a gift, not a sentence.",
    affirmation: "My heart is a garden, not a public park. I choose who enters.",
    color: "bg-rose-300",
    textColor: "text-rose-700",
    bgGradient: "from-rose-400 to-rose-200",

    chakra: "Heart Chakra",
    chakraMeaning: "The Heart Chakra (Anahata) is the bridge between the physical and spiritual worlds. It governs compassion, self-love, and deep connection. It is the filter through which you process all human experience.",
    chakraUpsell: { name: "Healing Necklace Natural Stone", description: "Heart chakra activation pendant.", image: IMG.HEALING_NECKLACE, url: "https://store.taichigemstone.com/products/healing-necklace-natural-stone-titanium-chain" },

    element: "Water",
    elementMeaning: "Water is the element of emotion, adaptability, and subconscious flow. Like water, you are yielding yet powerful, capable of carving through stone through persistence and softness.",
    elementUpsell: { name: "7 Chakra Healing Bracelet", description: "Complete energy alignment for empaths.", image: IMG.CHAKRA_7, url: "https://store.taichigemstone.com/products/7-chakra-healing-bracelet-natural-stones" },

    symbol: "The Lotus",
    symbolMeaning: "The Lotus rises from the mud to bloom in the sun, symbolizing the alchemy of turning pain into wisdom. It represents purity of heart untouched by the chaos of the environment.",
    symbolUpsell: { name: "Pinky flower bracelet", description: "Full harmonization for emotional balance.", image: "https://cdn.shopify.com/s/files/1/0977/7027/5097/files/3_8924bded-0c8d-4adb-b34e-5d6d7ef8c743.webp?v=1765438471", url: "https://store.taichigemstone.com/products/lucky-four-leaf-clover-bracelet" },

    inRelationships: "Creates deep connections through high empathy and genuine listening. Provides an emotionally safe space for authentic expression.",
    atWork: "Builds positive work culture, resolves conflicts effectively, and inspires through authentic values. Creates cohesive, trusting teams.",
    leadershipStyle: "Inspirational and people-focused. Encourages personal development, creates meaning, and leads through emotional intelligence.",
    stressResponse: "Gets ruled by emotions, experiences difficulty making decisions. May withdraw inward and lose emotional balance.",
    growthPath: "Balance emotion and logic → Establish boundaries → Increase practicality → Develop decisiveness"
  },
  [ArchetypeID.Abundance]: {
    id: ArchetypeID.Abundance,
    name: "Abundance Mover",
    title: "The Abundance Mover",
    description: "You are the spark of creation. A pioneer and visionary, you believe in limitless potential and have the fire to manifest the impossible.",
    patternInsight: "PATTERN I — THE FREQUENCY\n\nYour energy is Solar—radiant, projective, and inherently optimistic. You are the 'Architect of Possibility.' You do not understand the concept of a dead end; to you, it is simply a pivot point.\n\nPATTERN II — THE RELATIONSHIP\n\nYou love through empowerment. You are the cheerleader and the benefactor, believing that rising tides lift all boats. You attract those ready to grow and challenge them to see their own greatness.\n\nPATTERN III — THE CONTRIBUTION\n\nYou are a generator of momentum. When a project stalls, you are the spark plug. You teach the world that abundance is not something you acquire, but a mindset you inhabit.",
    blindSpot: "BLOCK I — THE CHASE\n\nYou have a profound discomfort with stillness. You equate pausing with failing. Beneath your optimism lies a subtle, driving fear of scarcity or 'not enoughness.'\n\nBLOCK II — THE CRASH\n\nYour drive can morph into 'Toxic Positivity,' ignoring red flags to keep the energy moving. Eventually, the adrenaline runs out, leading to sudden, deep depletion.\n\nBLOCK III — PATH TO EQUILIBRIUM\n\nYou must befriend the pause. Rest is not the opposite of creation; it is the soil from which it grows. You attract by being, not just doing.",
    affirmation: "I do not chase. I attract. What is mine will find me.",
    color: "bg-amber-400",
    textColor: "text-amber-700",
    bgGradient: "from-amber-500 to-yellow-300",

    chakra: "Solar Plexus",
    chakraMeaning: "The Solar Plexus (Manipura) is the engine of will, ego, and action. Located in the core, it is where you metabolize life and assert your personal power to shape your destiny.",
    chakraUpsell: { name: "Fortune Bracelet Red String Fire Horse", description: "Manifestation accelerator with Fire Horse charm.", image: IMG.FIRE_HORSE_STRING, url: "https://store.taichigemstone.com/products/fortune-bracelet-red-string-fire-horse-charm" },

    element: "Fire",
    elementMeaning: "Fire is the great transformer. It consumes the old to create the new, providing heat, light, and inspiration. It is projective, radiant, and impossible to ignore.",
    elementUpsell: { name: "Fire Horse Fortune Bracelet Red Agate", description: "Passion and drive for manifestation.", image: IMG.FIRE_HORSE_AGATE, url: "https://store.taichigemstone.com/products/fire-horse-fortune-bracelet-red-agate" },

    symbol: "The Sun",
    symbolMeaning: "The Sun represents the divine masculine frequency—outward-facing, life-giving, and constant. It reminds you that your nature is to shine, not to shrink.",
    symbolUpsell: { name: "Lucky Four-Leaf Clover Bracelet", description: "Luck enhancer for abundant living.", image: IMG.FOUR_LEAF_CLOVER, url: "https://store.taichigemstone.com/products/lucky-four-leaf-clover-bracelet" },

    inRelationships: "Generous and positive, spreads good energy naturally. Encourages partner growth and shares opportunities freely.",
    atWork: "Creates new opportunities and drives growth. Motivates teams effectively and sees potential in every challenge.",
    leadershipStyle: "Visionary leadership that encourages innovation. Empowers teams and creates a culture of growth and possibility.",
    stressResponse: "Becomes overly optimistic, ignores red flags, makes hasty decisions, and may invest resources without consideration.",
    growthPath: "Balance optimism with reality → Develop strategic thinking → Learn financial management → Conscious risk assessment"
  },
  [ArchetypeID.Calm]: {
    id: ArchetypeID.Calm,
    name: "Calm Seeker",
    title: "The Calm Seeker",
    description: "You are the eye of the storm. A diplomat and harmonizer, you bring clarity, peace, and a neutralizing frequency to a chaotic world.",
    patternInsight: "PATTERN I — THE FREQUENCY\n\nYou are the 'Great Harmonizer.' Your internal rhythm is slow, deep, and deliberate. Like Air, you circulate and clear the atmosphere. You have a natural immunity to drama, preferring the clarity of silence.\n\nPATTERN II — THE RELATIONSHIP\n\nYou are the safe harbor. You offer a non-judgmental presence that allows others to drop their defenses. You create spaces where nervous systems can down-regulate and heal.\n\nPATTERN III — THE CONTRIBUTION\n\nYou lead through 'Diplomatic Consensus.' You are the mediator who can de-escalate high-tension situations without raising a voice. You bring sanity to the frantic.",
    blindSpot: "BLOCK I — THE SILENCE\n\nYour pursuit of peace often morphs into a war against your own voice. You swallow your truth to keep the water still, fearing that conflict will lead to separation.\n\nBLOCK II — PASSIVE WITHDRAWAL\n\nThe pressure of unexpressed emotion leads to 'Passive Withdrawal.' You remain physically present but energetically absent, drifting behind a wall of fog.\n\nBLOCK III — PATH TO EQUILIBRIUM\n\nPeace is not the absence of noise; it is the presence of alignment. You must risk the temporary discomfort of speaking your truth to find true harmony.",
    affirmation: "My voice is essential. I am safe in the center of conflict.",
    color: "bg-indigo-300",
    textColor: "text-indigo-800",
    bgGradient: "from-indigo-400 to-blue-200",

    chakra: "Crown Chakra",
    chakraMeaning: "The Crown Chakra (Sahasrara) connects you to the divine and universal consciousness. It represents a state of pure awareness, transcending the dualities of the physical world.",
    chakraUpsell: { name: "Premium Zodiac Power Bracelet", description: "Personal frequency harmonizer.", image: IMG.PREMIUM_ZODIAC, url: "https://store.taichigemstone.com/products/premium-zodiac-power-bracelet-natural-stones" },

    element: "Air/Water",
    elementMeaning: "A unique blend of Air (intellect) and Water (flow). You exist in the mist—soft but pervasive, regulating the emotional temperature of any room you enter.",
    elementUpsell: { name: "Zodiac Alignment Bracelet", description: "Energy centering for scattered minds.", image: IMG.ZODIAC_ALIGNMENT, url: "https://store.taichigemstone.com/products/zodiac-alignment-bracelet-natural-stone" },

    symbol: "Still Water",
    symbolMeaning: "Still Water reflects the world perfectly without distortion. It represents a mind so quiet that it can perceive the truth of things without the ripples of reactive emotion.",
    symbolUpsell: { name: "Grounding Healing Bracelet Agarwood", description: "Anxiety reduction through wood energy.", image: IMG.AGARWOOD, url: "https://store.taichigemstone.com/products/grounding-healing-bracelet-agarwood" },

    inRelationships: "Calm and patient, creates peace naturally. Accepts others without judgment and serves as an excellent, deep listener.",
    atWork: "Outstanding conflict mediator who maintains team harmony. Works steadily and creates a peaceful, productive environment.",
    leadershipStyle: "Peaceful leadership that seeks consensus. Respects diverse opinions and avoids imposing personal agenda on others.",
    stressResponse: "Withdraws and disconnects emotionally. Avoids facing problems directly, delays decisions, and may lose motivation.",
    growthPath: "Develop self-assertion → Face conflict healthily → Increase decisiveness → Set clear goals"
  },
  [ArchetypeID.Intuitive]: {
    id: ArchetypeID.Intuitive,
    name: "Intuitive Explorer",
    title: "The Intuitive Explorer",
    description: "You are the bridge between worlds. A mystic and visionary, you navigate life through symbolism, deep meaning, and the unseen currents of the universe.",
    patternInsight: "PATTERN I — THE FREQUENCY\n\nYou are the 'Mystic Voyager.' Your mind is a constellation of connections. You perceive the world through symbolism and synchronicities, understanding that reality is more porous than it appears.\n\nPATTERN II — THE RELATIONSHIP\n\nYou bond through the spirit. Small talk drains you; you crave conversations about the nature of consciousness and the texture of dreams. You help others see the magic in their mundane.\n\nPATTERN III — THE CONTRIBUTION\n\nYou are the futurist. You connect dots that others do not see. You challenge the status quo not to be difficult, but because you see a higher trajectory.",
    blindSpot: "BLOCK I — THE UNBOUND\n\nYou resist structure, fearing it will trap you. This leaves you ungrounded, with a brilliant mind full of visions that struggle to take root in reality.\n\nBLOCK II — DISSOCIATION\n\nWhen reality becomes too harsh, you escape into fantasy. This 'Spiritual Scattering' leaves you feeling misunderstood and isolated in a tower of high concepts.\n\nBLOCK III — PATH TO EQUILIBRIUM\n\nYou must build a container for your magic. Structure is not a cage; it is the channel through which your vision flows into the world.",
    affirmation: "I bring my vision down to earth. I honor the sacred in the structure.",
    color: "bg-violet-600",
    textColor: "text-violet-900",
    bgGradient: "from-violet-700 to-fuchsia-600",

    chakra: "Third Eye",
    chakraMeaning: "The Third Eye (Ajna) governs intuition, foresight, and imagination. It sees beyond the physical veil, perceiving patterns and truths that are invisible to the naked eye.",
    chakraUpsell: { name: "Tarot Guidance Necklace", description: "Archetypal wisdom connector.", image: IMG.TAROT_NECKLACE, url: "https://store.taichigemstone.com/products/tarot-guidance-necklace-titanium-natural-stone" },

    element: "Ether",
    elementMeaning: "Ether (Spirit) is the vastness of space. It is the void from which all other elements manifest—pure potentiality, holding the blueprint of what is yet to come.",
    elementUpsell: { name: "Quartz Crystal Point Cuff", description: "Vision amplifier for mystics.", image: IMG.QUARTZ_CUFF, url: "https://store.taichigemstone.com/products/crystal-point-energy-amplifier-quartz-charm" },

    symbol: "The Moon",
    symbolMeaning: "The Moon illuminates the dark. It represents cycles, shadows, and the feminine mystery of the subconscious. It guides not by burning bright, but by reflecting the hidden.",
    symbolUpsell: { name: "Zodiac Energy Bracelet", description: "Cosmic connection enhancer.", image: IMG.ZODIAC_ENERGY, url: "https://store.taichigemstone.com/products/zodiac-energy-bracelet-mixed-natural-stones" },

    inRelationships: "Creative and inspiring, shares vision freely. Encourages exploration in partners and creates new, meaningful experiences.",
    atWork: "Contributes unique ideas and sees future possibilities. Adapts flexibly and connects creative concepts innovatively.",
    leadershipStyle: "Creative leadership that encourages innovation. Grants creative freedom and guides long-term vision for the team.",
    stressResponse: "Scatters energy across too many projects. Has difficulty completing tasks, may avoid reality, and loses grounding.",
    growthPath: "Develop organizational skills → Balance vision and action → Learn to complete projects → Create supportive structure"
  }
};

// ============================================
// QUESTIONS
// ============================================
export const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    stage: 1,
    question: "When facing a major challenge, what is your instinctive reaction?",
    options: [
      { id: 'A', text: "I plan carefully and take it step-by-step." },
      { id: 'B', text: "I listen to my emotions and intuition." },
      { id: 'C', text: "I look for opportunities to act immediately." },
      { id: 'D', text: "I seek silence to find balance first." },
      { id: 'E', text: "I look for the hidden meaning or lesson." }
    ]
  },
  {
    id: 2,
    stage: 1,
    question: "What do you value most in your work or daily life?",
    options: [
      { id: 'A', text: "Responsibility, stability, and reliability." },
      { id: 'B', text: "Meaning, connection, and authenticity." },
      { id: 'C', text: "Growth, expansion, and success." },
      { id: 'D', text: "Harmony, peace, and low stress." },
      { id: 'E', text: "Innovation, freedom, and discovery." }
    ]
  },
  {
    id: 3,
    stage: 1,
    question: "How would you describe your communication style?",
    options: [
      { id: 'A', text: "Practical, detailed, and direct." },
      { id: 'B', text: "Sincere, empathetic, and warm." },
      { id: 'C', text: "Inspiring, energetic, and persuasive." },
      { id: 'D', text: "Calm, diplomatic, and listening." },
      { id: 'E', text: "Conceptual, symbolic, and deep." }
    ]
  },
  {
    id: 4,
    stage: 1,
    question: "When you are stressed, where do you go?",
    options: [
      { id: 'A', text: "Into control mode—I micro-manage the details." },
      { id: 'B', text: "Into emotion—I feel everything intensely." },
      { id: 'C', text: "Into overdrive—I ignore risks and rush forward." },
      { id: 'D', text: "Into withdrawal—I avoid the conflict." },
      { id: 'E', text: "Into fantasy—I escape reality." }
    ]
  },
  {
    id: 5,
    stage: 1,
    question: "Which trait best defines your core self?",
    options: [
      { id: 'A', text: "Loyalty and steadfastness." },
      { id: 'B', text: "Empathy and truth." },
      { id: 'C', text: "Optimism and generosity." },
      { id: 'D', text: "Patience and acceptance." },
      { id: 'E', text: "Curiosity and vision." }
    ]
  },
  {
    id: 6,
    stage: 2,
    question: "What inspires you to keep going?",
    options: [
      { id: 'A', text: "Protecting and providing for my loved ones.", mapsTo: SubNeedID.Protection },
      { id: 'B', text: "Living in alignment with my deepest values.", mapsTo: SubNeedID.EmotionalBalance },
      { id: 'C', text: "Creating abundance and unlocking potential.", mapsTo: SubNeedID.Confidence },
      { id: 'D', text: "Finding inner peace and stillness.", mapsTo: SubNeedID.Calm },
      { id: 'E', text: "Uncovering the mysteries of life.", mapsTo: SubNeedID.Intuition }
    ]
  },
  {
    id: 7,
    stage: 2,
    question: "What feels like your biggest energetic block right now?",
    options: [
      { id: 'A', text: "Feeling unsafe or ungrounded.", mapsTo: SubNeedID.Protection },
      { id: 'B', text: "Emotional overwhelm or heavy heart.", mapsTo: SubNeedID.EmotionalBalance },
      { id: 'C', text: "Self-doubt or fear of scarcity.", mapsTo: SubNeedID.Confidence },
      { id: 'D', text: "Anxiety and mental noise.", mapsTo: SubNeedID.Calm },
      { id: 'E', text: "Lack of clarity or direction.", mapsTo: SubNeedID.Intuition }
    ]
  },
  {
    id: 8,
    stage: 3,
    question: "What is your greatest fear?",
    options: [
      { id: 'A', text: "Failing those who depend on me." },
      { id: 'B', text: "Living a life that isn't authentic." },
      { id: 'C', text: "Stagnation and lack of growth." },
      { id: 'D', text: "Conflict and loss of harmony." },
      { id: 'E', text: "Being trapped in the mundane." }
    ]
  },
  {
    id: 9,
    stage: 3,
    question: "Select your Zodiac Sign",
    options: [
      { id: 'aries', text: "Aries", symbol: "♈", detail: "Mar 21 - Apr 19" },
      { id: 'taurus', text: "Taurus", symbol: "♉", detail: "Apr 20 - May 20" },
      { id: 'gemini', text: "Gemini", symbol: "♊", detail: "May 21 - Jun 20" },
      { id: 'cancer', text: "Cancer", symbol: "♋", detail: "Jun 21 - Jul 22" },
      { id: 'leo', text: "Leo", symbol: "♌", detail: "Jul 23 - Aug 22" },
      { id: 'virgo', text: "Virgo", symbol: "♍", detail: "Aug 23 - Sep 22" },
      { id: 'libra', text: "Libra", symbol: "♎", detail: "Sep 23 - Oct 22" },
      { id: 'scorpio', text: "Scorpio", symbol: "♏", detail: "Oct 23 - Nov 21" },
      { id: 'sagittarius', text: "Sagittarius", symbol: "♐", detail: "Nov 22 - Dec 21" },
      { id: 'capricorn', text: "Capricorn", symbol: "♑", detail: "Dec 22 - Jan 19" },
      { id: 'aquarius', text: "Aquarius", symbol: "♒", detail: "Jan 20 - Feb 18" },
      { id: 'pisces', text: "Pisces", symbol: "♓", detail: "Feb 19 - Mar 20" },
    ]
  }
];

// ============================================
// PRODUCT_MATRIX - Optimized Upsells (<$99, No Duplicates)
// ============================================
export const PRODUCT_MATRIX: Record<ArchetypeID, Record<SubNeedID, ProductRecommendation>> = {

  // === GROUNDED PROTECTOR (Earth) ===
  // Best upsells: Agarwood, Nine-Eye Dzi, Obsidian Zodiac, Zodiac Alignment, Chakra Balance
  [ArchetypeID.Protector]: {
    [SubNeedID.Protection]: {
      id: 'gp1',
      name: 'Tiger Eye Pixiu Bracelet',
      type: 'Primary',
      price: '$99',
      description: 'The ultimate guardian talisman. Tiger Eye grounds your energy while the Pixiu mythology offers protection from financial and energetic loss.',
      ritual: 'Wear on the left hand to welcome stability and shield your aura from chaotic environments.',
      image: IMG.TIGER_EYE_PIXIU,
      url: 'https://store.taichigemstone.com/products/tiger-eye-pixiu-bracelet',
      variantId: '51754993156377',
      tags: [SubNeedID.Protection],
      upsells: [
        { id: 'gp1-up1', name: 'Grounding Healing Bracelet Agarwood', price: '$49', description: 'Ancient wood energy to root you deeply into the earth.', image: IMG.AGARWOOD, type: 'Supportive', tags: [SubNeedID.Protection], ritual: 'Rub beads to release grounding scent during stress.', url: 'https://store.taichigemstone.com/products/grounding-healing-bracelet-agarwood', variantId: '51745532379417' },
        { id: 'gp1-up2', name: 'Obsidian Zodiac Protection Bracelet', price: '$59', description: 'Volcanic stone absorbs negativity and shields your energy field.', image: IMG.OBSIDIAN_ZODIAC, type: 'Supportive', tags: [SubNeedID.Protection], ritual: 'Wear on difficult days for energetic shielding.', url: 'https://store.taichigemstone.com/products/premium-zodiac-power-bracelet-natural-stones', variantId: '51750260539673' },
        { id: 'gp1-up3', name: 'Nine-Eye Dzi Bead Power Bracelet', price: '$69', description: 'Tibetan protection symbol amplifies your mountain-like stability.', image: IMG.NINE_EYE_DZI, type: 'Supportive', tags: [SubNeedID.Protection], ritual: 'Hold during conflict to remain unmoved.', url: 'https://store.taichigemstone.com/products/nine-eye-dzi-bead-power-bracelet-black-onyx', variantId: '51745577435417' }
      ]
    },
    [SubNeedID.Confidence]: {
      id: 'gp-conf-1',
      name: 'Tiger Eye Pixiu Bracelet',
      type: 'Primary',
      price: '$99',
      description: 'Wear when you need to project authority and inner strength.',
      ritual: 'Hold the stone while setting intentions for success.',
      image: IMG.TIGER_EYE_PIXIU,
      url: 'https://store.taichigemstone.com/products/tiger-eye-pixiu-bracelet',
      variantId: '51754993156377',
      tags: [SubNeedID.Confidence],
      upsells: [
        { id: 'gp-conf-up1', name: 'Nine-Eye Dzi Bead Power Bracelet', price: '$69', description: 'Ancient Tibetan energy for leadership presence.', image: IMG.NINE_EYE_DZI, type: 'Supportive', tags: [SubNeedID.Confidence], ritual: 'Wear to important meetings.', url: 'https://store.taichigemstone.com/products/nine-eye-dzi-bead-power-bracelet-black-onyx', variantId: '51745577435417' },
        { id: 'gp-conf-up2', name: 'Grounding Healing Bracelet Agarwood', price: '$49', description: 'Promotes calm authority and steadfast presence.', image: IMG.AGARWOOD, type: 'Supportive', tags: [SubNeedID.Confidence], ritual: 'Wear for calm confidence.', url: 'https://store.taichigemstone.com/products/grounding-healing-bracelet-agarwood', variantId: '51745532379417' }
      ]
    },
    [SubNeedID.Calm]: {
      id: 'gp-calm-1',
      name: 'Nine-Eye Dzi Bead Power Bracelet',
      type: 'Primary',
      price: '$69',
      description: 'Absorbs stress and negative thought patterns during meditation.',
      ritual: 'Use as a focal point during meditation.',
      image: IMG.NINE_EYE_DZI,
      url: 'https://store.taichigemstone.com/products/nine-eye-dzi-bead-power-bracelet-black-onyx',
      variantId: '51745577435417',
      tags: [SubNeedID.Calm],
      upsells: [
        { id: 'gp-calm-up1', name: 'Grounding Healing Bracelet Agarwood', price: '$49', description: 'Aromatherapy bracelet calms the nervous system.', image: IMG.AGARWOOD, type: 'Supportive', tags: [SubNeedID.Calm], ritual: 'Inhale scent when anxious.', url: 'https://store.taichigemstone.com/products/grounding-healing-bracelet-agarwood', variantId: '51745532379417' },
        { id: 'gp-calm-up2', name: 'Zodiac Alignment Bracelet', price: '$49', description: 'Aligns personal earth energy for emotional stability.', image: IMG.ZODIAC_ALIGNMENT, type: 'Supportive', tags: [SubNeedID.Calm], ritual: 'Daily anchor for peace.', url: 'https://store.taichigemstone.com/products/zodiac-alignment-bracelet-natural-stone', variantId: '51747345563929' }
      ]
    },
    [SubNeedID.EmotionalBalance]: {
      id: 'gp-em-1',
      name: 'Zodiac Alignment Bracelet',
      type: 'Primary',
      price: '$49',
      description: 'Aligns your personal earth energy for emotional stability.',
      ritual: 'Carry daily as your energetic anchor.',
      image: IMG.ZODIAC_ALIGNMENT,
      url: 'https://store.taichigemstone.com/products/zodiac-alignment-bracelet-natural-stone',
      variantId: '51747345563929',
      tags: [SubNeedID.EmotionalBalance],
      upsells: [
        { id: 'gp-em-up1', name: 'Chakra Balance Bracelet', price: '$49', description: 'Ensures all energy centers support emotional health.', image: IMG.CHAKRA_BALANCE, type: 'Supportive', tags: [SubNeedID.EmotionalBalance], ritual: 'Morning alignment ritual.', url: 'https://store.taichigemstone.com/products/chakra-balance-bracelet-mixed-stones', variantId: '51745535918361' },
        { id: 'gp-em-up2', name: 'Grounding Healing Bracelet Agarwood', price: '$49', description: 'Wood energy stabilizes emotional fluctuations.', image: IMG.AGARWOOD, type: 'Supportive', tags: [SubNeedID.EmotionalBalance], ritual: 'Touch when overwhelmed.', url: 'https://store.taichigemstone.com/products/grounding-healing-bracelet-agarwood', variantId: '51745532379417' }
      ]
    },
    [SubNeedID.Intuition]: {
      id: 'gp-int-1',
      name: 'Chakra Balance Bracelet',
      type: 'Primary',
      price: '$49',
      description: 'Ensures your foundation supports your intuitive vision.',
      ritual: 'Meditation aid for grounded intuition.',
      image: IMG.CHAKRA_BALANCE,
      url: 'https://store.taichigemstone.com/products/chakra-balance-bracelet-mixed-stones',
      variantId: '51745535918361',
      tags: [SubNeedID.Intuition],
      upsells: [
        { id: 'gp-int-up1', name: 'Zodiac Alignment Bracelet', price: '$49', description: 'Connects cosmic wisdom to earthly action.', image: IMG.ZODIAC_ALIGNMENT, type: 'Supportive', tags: [SubNeedID.Intuition], ritual: 'Wear for grounded insight.', url: 'https://store.taichigemstone.com/products/zodiac-alignment-bracelet-natural-stone', variantId: '51747345563929' },
        { id: 'gp-int-up2', name: 'Nine-Eye Dzi Bead Power Bracelet', price: '$69', description: 'Tibetan wisdom enhances inner knowing.', image: IMG.NINE_EYE_DZI, type: 'Supportive', tags: [SubNeedID.Intuition], ritual: 'Hold during decision-making.', url: 'https://store.taichigemstone.com/products/nine-eye-dzi-bead-power-bracelet-black-onyx', variantId: '51745577435417' }
      ]
    },
  },

  // === HEART ALIGNER (Water) ===
  // Best upsells: Chakra Balance, Chakra 7, Zodiac Energy, Quartz Cuff, Healing Necklace
  [ArchetypeID.Heart]: {
    [SubNeedID.EmotionalBalance]: {
      id: 'ha-em-1',
      name: 'Healing Necklace Natural Stone',
      type: 'Primary',
      price: '$79',
      description: 'Hold the stone to your heart when overwhelmed by others\' emotions to reset your boundary.',
      ritual: 'Wear over the heart chakra daily.',
      image: IMG.HEALING_NECKLACE,
      url: 'https://store.taichigemstone.com/products/healing-necklace-natural-stone-titanium-chain',
      variantId: '51747359326489',
      tags: [SubNeedID.EmotionalBalance],
      upsells: [
        { id: 'ha-em-up1', name: 'Chakra Balance Bracelet', price: '$49', description: 'Visualize light moving through each chakra for complete alignment.', image: IMG.CHAKRA_BALANCE, type: 'Supportive', tags: [SubNeedID.EmotionalBalance], ritual: 'Morning visualization practice.', url: 'https://store.taichigemstone.com/products/chakra-balance-bracelet-mixed-stones', variantId: '51745535918361' },
        { id: 'ha-em-up2', name: '7 Chakra Healing Bracelet', price: '$49', description: 'Align all energy centers so empathy remains a gift, not a burden.', image: IMG.CHAKRA_7, type: 'Supportive', tags: [SubNeedID.EmotionalBalance], ritual: 'Touch each bead for alignment.', url: 'https://store.taichigemstone.com/products/7-chakra-healing-bracelet-natural-stones', variantId: '51745534476569' },
        { id: 'ha-em-up3', name: 'Zodiac Energy Bracelet', price: '$49', description: 'Connects your emotional flow to cosmic rhythms.', image: IMG.ZODIAC_ENERGY, type: 'Supportive', tags: [SubNeedID.EmotionalBalance], ritual: 'Wear during emotional processing.', url: 'https://store.taichigemstone.com/products/zodiac-energy-bracelet-mixed-natural-stones', variantId: '51747373809945' }
      ]
    },
    [SubNeedID.Protection]: {
      id: 'ha-prot-1',
      name: '7 Chakra Healing Bracelet',
      type: 'Primary',
      price: '$49',
      description: 'Keeps your emotional flow clear and vibrant while protecting from energy drain.',
      ritual: 'Touch each bead to seal your energy field.',
      image: IMG.CHAKRA_7,
      url: 'https://store.taichigemstone.com/products/7-chakra-healing-bracelet-natural-stones',
      variantId: '51745534476569',
      tags: [SubNeedID.Protection],
      upsells: [
        { id: 'ha-prot-up1', name: 'Chakra Balance Bracelet', price: '$49', description: 'Creates energetic boundary while maintaining heart openness.', image: IMG.CHAKRA_BALANCE, type: 'Supportive', tags: [SubNeedID.Protection], ritual: 'Layer with main bracelet.', url: 'https://store.taichigemstone.com/products/chakra-balance-bracelet-mixed-stones', variantId: '51745535918361' },
        { id: 'ha-prot-up2', name: 'Zodiac Energy Bracelet', price: '$49', description: 'Aligns your natural defenses with cosmic timing.', image: IMG.ZODIAC_ENERGY, type: 'Supportive', tags: [SubNeedID.Protection], ritual: 'Wear in crowded spaces.', url: 'https://store.taichigemstone.com/products/zodiac-energy-bracelet-mixed-natural-stones', variantId: '51747373809945' }
      ]
    },
    [SubNeedID.Intuition]: {
      id: 'ha-int-1',
      name: 'Tarot Guidance Necklace',
      type: 'Primary',
      price: '$79',
      description: 'Trust the wisdom of your heart to guide decisions with love.',
      ritual: 'Hold pendant when seeking heart-centered answers.',
      image: IMG.TAROT_NECKLACE,
      url: 'https://store.taichigemstone.com/products/tarot-guidance-necklace-titanium-natural-stone',
      variantId: '51747364569369',
      tags: [SubNeedID.Intuition],
      upsells: [
        { id: 'ha-int-up1', name: 'Quartz Crystal Point Cuff', price: '$69', description: 'Amplifies intuitive heart wisdom.', image: IMG.QUARTZ_CUFF, type: 'Supportive', tags: [SubNeedID.Intuition], ritual: 'Wear during journaling.', url: 'https://store.taichigemstone.com/products/crystal-point-energy-amplifier-quartz-charm', variantId: '51751941144857' },
        { id: 'ha-int-up2', name: 'Zodiac Energy Bracelet', price: '$49', description: 'Connects heart wisdom to universal patterns.', image: IMG.ZODIAC_ENERGY, type: 'Supportive', tags: [SubNeedID.Intuition], ritual: 'Wear for clarity.', url: 'https://store.taichigemstone.com/products/zodiac-energy-bracelet-mixed-natural-stones', variantId: '51747373809945' }
      ]
    },
    [SubNeedID.Calm]: {
      id: 'ha-calm-1',
      name: 'Quartz Crystal Point Cuff',
      type: 'Primary',
      price: '$69',
      description: 'Amplifies healing energy for a peaceful heart.',
      ritual: 'Morning intention setting ritual.',
      image: IMG.QUARTZ_CUFF,
      url: 'https://store.taichigemstone.com/products/crystal-point-energy-amplifier-quartz-charm',
      variantId: '51751941144857',
      tags: [SubNeedID.Calm],
      upsells: [
        { id: 'ha-calm-up1', name: '7 Chakra Healing Bracelet', price: '$49', description: 'Balances all centers for deep peace.', image: IMG.CHAKRA_7, type: 'Supportive', tags: [SubNeedID.Calm], ritual: 'Breathwork companion.', url: 'https://store.taichigemstone.com/products/7-chakra-healing-bracelet-natural-stones', variantId: '51745534476569' },
        { id: 'ha-calm-up2', name: 'Chakra Balance Bracelet', price: '$49', description: 'Harmonizes emotional waters.', image: IMG.CHAKRA_BALANCE, type: 'Supportive', tags: [SubNeedID.Calm], ritual: 'Wear during meditation.', url: 'https://store.taichigemstone.com/products/chakra-balance-bracelet-mixed-stones', variantId: '51745535918361' }
      ]
    },
    [SubNeedID.Confidence]: {
      id: 'ha-conf-1',
      name: 'Healing Necklace Natural Stone',
      type: 'Primary',
      price: '$79',
      description: 'Trust the wisdom of your heart for authentic self-expression.',
      ritual: 'Wear for self-trust and inner knowing.',
      image: IMG.HEALING_NECKLACE,
      url: 'https://store.taichigemstone.com/products/healing-necklace-natural-stone-titanium-chain',
      variantId: '51747359326489',
      tags: [SubNeedID.Confidence],
      upsells: [
        { id: 'ha-conf-up1', name: 'Quartz Crystal Point Cuff', price: '$69', description: 'Amplifies authentic voice and presence.', image: IMG.QUARTZ_CUFF, type: 'Supportive', tags: [SubNeedID.Confidence], ritual: 'Wear for public speaking.', url: 'https://store.taichigemstone.com/products/crystal-point-energy-amplifier-quartz-charm', variantId: '51751941144857' },
        { id: 'ha-conf-up2', name: 'Zodiac Energy Bracelet', price: '$49', description: 'Connects personal power to cosmic support.', image: IMG.ZODIAC_ENERGY, type: 'Supportive', tags: [SubNeedID.Confidence], ritual: 'Wear for courage.', url: 'https://store.taichigemstone.com/products/zodiac-energy-bracelet-mixed-natural-stones', variantId: '51747373809945' }
      ]
    },
  },

  // === ABUNDANCE MOVER (Fire) ===
  // Best upsells: Fire Horse String, Fire Horse Agate, Four Leaf Clover, Emerald Set, Mixed Zodiac
  [ArchetypeID.Abundance]: {
    [SubNeedID.Confidence]: {
      id: 'am-conf-1',
      name: 'Fortune Bracelet Red String Fire Horse',
      type: 'Primary',
      price: '$49',
      description: 'Wear on your dominant hand to project your will and attract opportunity.',
      ritual: 'Activate with a specific goal in mind each morning.',
      image: IMG.FIRE_HORSE_STRING,
      url: 'https://store.taichigemstone.com/products/fortune-bracelet-red-string-fire-horse-charm',
      variantId: '51749940953369',
      tags: [SubNeedID.Confidence],
      upsells: [
        { id: 'am-conf-up1', name: 'Fire Horse Fortune Bracelet Red Agate', price: '$59', description: 'Amplifies passion and unstoppable drive for manifestation.', image: IMG.FIRE_HORSE_AGATE, type: 'Supportive', tags: [SubNeedID.Confidence], ritual: 'Stack with red string for power.', url: 'https://store.taichigemstone.com/products/fire-horse-fortune-bracelet-red-agate', variantId: '51751793918233' },
        { id: 'am-conf-up2', name: 'Emerald Titanium Gold Solar Set', price: '$69', description: 'Elegant energy for high-stakes negotiations.', image: IMG.EMERALD_SET, type: 'Supportive', tags: [SubNeedID.Confidence], ritual: 'Wear to business meetings.', url: 'https://store.taichigemstone.com/products/solar-energy-protection-jewelry-set-titanium-emerald', variantId: '51745520288025' },
        { id: 'am-conf-up3', name: 'Lucky Four-Leaf Clover Bracelet', price: '$49', description: 'Luck amplifier for bold moves.', image: IMG.FOUR_LEAF_CLOVER, type: 'Supportive', tags: [SubNeedID.Confidence], ritual: 'Touch before pitches.', url: 'https://store.taichigemstone.com/products/lucky-four-leaf-clover-bracelet', variantId: '51754990764313' }
      ]
    },
    [SubNeedID.Protection]: {
      id: 'am-prot-1',
      name: 'Fire Horse Fortune Bracelet Red Agate',
      type: 'Primary',
      price: '$59',
      description: 'Protects your accumulated abundance from draining away.',
      ritual: 'Wear consistently to guard your prosperity.',
      image: IMG.FIRE_HORSE_AGATE,
      url: 'https://store.taichigemstone.com/products/fire-horse-fortune-bracelet-red-agate',
      variantId: '51751793918233',
      tags: [SubNeedID.Protection],
      upsells: [
        { id: 'am-prot-up1', name: 'Fortune Bracelet Red String', price: '$49', description: 'Red string of fate protects manifestation journey.', image: IMG.FIRE_HORSE_STRING, type: 'Supportive', tags: [SubNeedID.Protection], ritual: 'Never remove during projects.', url: 'https://store.taichigemstone.com/products/fortune-bracelet-red-string-fire-horse-charm', variantId: '51749940953369' },
        { id: 'am-prot-up2', name: 'Lucky Four-Leaf Clover Bracelet', price: '$49', description: 'Shields good fortune from envy.', image: IMG.FOUR_LEAF_CLOVER, type: 'Supportive', tags: [SubNeedID.Protection], ritual: 'Wear in competitive environments.', url: 'https://store.taichigemstone.com/products/lucky-four-leaf-clover-bracelet', variantId: '51754990764313' }
      ]
    },
    [SubNeedID.Intuition]: {
      id: 'am-int-1',
      name: 'Emerald Titanium Gold Solar Set',
      type: 'Primary',
      price: '$69',
      description: 'Sharpens business intuition and opportunity recognition.',
      ritual: 'Wear when making strategic decisions.',
      image: IMG.EMERALD_SET,
      url: 'https://store.taichigemstone.com/products/solar-energy-protection-jewelry-set-titanium-emerald',
      variantId: '51745520288025',
      tags: [SubNeedID.Intuition],
      upsells: [
        { id: 'am-int-up1', name: 'Fire Horse Fortune Bracelet Red Agate', price: '$59', description: 'Connects gut instinct to action.', image: IMG.FIRE_HORSE_AGATE, type: 'Supportive', tags: [SubNeedID.Intuition], ritual: 'Wear for quick decisions.', url: 'https://store.taichigemstone.com/products/fire-horse-fortune-bracelet-red-agate', variantId: '51751793918233' },
        { id: 'am-int-up2', name: 'Mixed Stone Zodiac Bracelet', price: '$49', description: 'Cosmic timing for opportunities.', image: IMG.MIXED_ZODIAC, type: 'Supportive', tags: [SubNeedID.Intuition], ritual: 'Check alignment before deals.', url: 'https://store.taichigemstone.com/products/zodiac-energy-bracelet-mixed-natural-stones', variantId: '51747373809945' }
      ]
    },
    [SubNeedID.Calm]: {
      id: 'am-calm-1',
      name: 'Emerald Titanium Gold Solar Set',
      type: 'Primary',
      price: '$69',
      description: 'Grounded growth with elegant solar energy for balanced ambition.',
      ritual: 'Wear for steady progress without burnout.',
      image: IMG.EMERALD_SET,
      url: 'https://store.taichigemstone.com/products/solar-energy-protection-jewelry-set-titanium-emerald',
      variantId: '51745520288025',
      tags: [SubNeedID.Calm],
      upsells: [
        { id: 'am-calm-up1', name: 'Lucky Four-Leaf Clover Bracelet', price: '$49', description: 'Invites ease and flow into your hustle.', image: IMG.FOUR_LEAF_CLOVER, type: 'Supportive', tags: [SubNeedID.Calm], ritual: 'Touch when feeling rushed.', url: 'https://store.taichigemstone.com/products/lucky-four-leaf-clover-bracelet', variantId: '51754990764313' },
        { id: 'am-calm-up2', name: 'Fortune Bracelet Red String', price: '$49', description: 'Grounds fire energy without dimming it.', image: IMG.FIRE_HORSE_STRING, type: 'Supportive', tags: [SubNeedID.Calm], ritual: 'Breathe and touch string.', url: 'https://store.taichigemstone.com/products/fortune-bracelet-red-string-fire-horse-charm', variantId: '51749940953369' }
      ]
    },
    [SubNeedID.EmotionalBalance]: {
      id: 'am-em-1',
      name: 'Lucky Four-Leaf Clover Bracelet',
      type: 'Primary',
      price: '$49',
      description: 'Luck and ease for emotional harmony in your abundance journey.',
      ritual: 'Carry for good fortune and lightness of heart.',
      image: IMG.FOUR_LEAF_CLOVER,
      url: 'https://store.taichigemstone.com/products/lucky-four-leaf-clover-bracelet',
      variantId: '51754990764313',
      tags: [SubNeedID.EmotionalBalance],
      upsells: [
        { id: 'am-em-up1', name: 'Fire Horse Fortune Bracelet Red Agate', price: '$59', description: 'Balances drive with emotional wellness.', image: IMG.FIRE_HORSE_AGATE, type: 'Supportive', tags: [SubNeedID.EmotionalBalance], ritual: 'Wear during reflection.', url: 'https://store.taichigemstone.com/products/fire-horse-fortune-bracelet-red-agate', variantId: '51751793918233' },
        { id: 'am-em-up2', name: 'Mixed Stone Zodiac Bracelet', price: '$49', description: 'Harmonizes ambition with inner peace.', image: IMG.MIXED_ZODIAC, type: 'Supportive', tags: [SubNeedID.EmotionalBalance], ritual: 'Evening wind-down ritual.', url: 'https://store.taichigemstone.com/products/zodiac-energy-bracelet-mixed-natural-stones', variantId: '51747373809945' }
      ]
    },
  },

  // === CALM SEEKER (Air/Water) ===
  // Best upsells: Zodiac Alignment, Mixed Zodiac, Premium Zodiac, Agarwood, Tarot Necklace
  [ArchetypeID.Calm]: {
    [SubNeedID.Calm]: {
      id: 'cs-calm-1',
      name: 'Zodiac Alignment Bracelet',
      type: 'Primary',
      price: '$49',
      description: 'Use as a touchstone throughout the day. When you touch it, take one deep, conscious breath.',
      ritual: 'Touchstone for breathwork and presence.',
      image: IMG.ZODIAC_ALIGNMENT,
      url: 'https://store.taichigemstone.com/products/zodiac-alignment-bracelet-natural-stone',
      variantId: '51747345563929',
      tags: [SubNeedID.Calm],
      upsells: [
        { id: 'cs-calm-up1', name: 'Mixed Stone Zodiac Bracelet', price: '$49', description: 'Harmonizes your natural frequency and reduces internal static.', image: IMG.MIXED_ZODIAC, type: 'Supportive', tags: [SubNeedID.Calm], ritual: 'Stack for deeper harmony.', url: 'https://store.taichigemstone.com/products/zodiac-energy-bracelet-mixed-natural-stones', variantId: '51747373809945' },
        { id: 'cs-calm-up2', name: 'Premium Zodiac Power Bracelet', price: '$69', description: 'Resonant stones chosen specifically for your sign.', image: IMG.PREMIUM_ZODIAC, type: 'Supportive', tags: [SubNeedID.Calm], ritual: 'Wear during stressful periods.', url: 'https://store.taichigemstone.com/products/premium-zodiac-power-bracelet-natural-stones', variantId: '51750260539673' },
        { id: 'cs-calm-up3', name: 'Grounding Healing Bracelet Agarwood', price: '$49', description: 'Sacred scent pulls you out of mental loops.', image: IMG.AGARWOOD, type: 'Supportive', tags: [SubNeedID.Calm], ritual: 'Inhale for instant calm.', url: 'https://store.taichigemstone.com/products/grounding-healing-bracelet-agarwood', variantId: '51745532379417' }
      ]
    },
    [SubNeedID.EmotionalBalance]: {
      id: 'cs-em-1',
      name: 'Mixed Stone Zodiac Bracelet',
      type: 'Primary',
      price: '$49',
      description: 'Brings your scattered energy back to its center.',
      ritual: 'Place under pillow for restorative sleep.',
      image: IMG.MIXED_ZODIAC,
      url: 'https://store.taichigemstone.com/products/zodiac-energy-bracelet-mixed-natural-stones',
      variantId: '51747373809945',
      tags: [SubNeedID.EmotionalBalance],
      upsells: [
        { id: 'cs-em-up1', name: 'Premium Zodiac Power Bracelet', price: '$69', description: 'Deeper resonance for emotional regulation.', image: IMG.PREMIUM_ZODIAC, type: 'Supportive', tags: [SubNeedID.EmotionalBalance], ritual: 'Wear during difficult days.', url: 'https://store.taichigemstone.com/products/premium-zodiac-power-bracelet-natural-stones', variantId: '51750260539673' },
        { id: 'cs-em-up2', name: 'Zodiac Alignment Bracelet', price: '$49', description: 'Centers emotional fluctuations.', image: IMG.ZODIAC_ALIGNMENT, type: 'Supportive', tags: [SubNeedID.EmotionalBalance], ritual: 'Touch when overwhelmed.', url: 'https://store.taichigemstone.com/products/zodiac-alignment-bracelet-natural-stone', variantId: '51747345563929' }
      ]
    },
    [SubNeedID.Protection]: {
      id: 'cs-prot-1',
      name: 'Grounding Healing Bracelet Agarwood',
      type: 'Primary',
      price: '$49',
      description: 'Wear when entering chaotic environments to maintain your bubble of peace.',
      ritual: 'Creates a protective scent barrier around you.',
      image: IMG.AGARWOOD,
      url: 'https://store.taichigemstone.com/products/grounding-healing-bracelet-agarwood',
      variantId: '51745532379417',
      tags: [SubNeedID.Protection],
      upsells: [
        { id: 'cs-prot-up1', name: 'Zodiac Alignment Bracelet', price: '$49', description: 'Reinforces your energetic boundary.', image: IMG.ZODIAC_ALIGNMENT, type: 'Supportive', tags: [SubNeedID.Protection], ritual: 'Layer for double protection.', url: 'https://store.taichigemstone.com/products/zodiac-alignment-bracelet-natural-stone', variantId: '51747345563929' },
        { id: 'cs-prot-up2', name: 'Premium Zodiac Power Bracelet', price: '$69', description: 'Shields your peace from external chaos.', image: IMG.PREMIUM_ZODIAC, type: 'Supportive', tags: [SubNeedID.Protection], ritual: 'Wear in crowded spaces.', url: 'https://store.taichigemstone.com/products/premium-zodiac-power-bracelet-natural-stones', variantId: '51750260539673' }
      ]
    },
    [SubNeedID.Confidence]: {
      id: 'cs-conf-1',
      name: 'Premium Zodiac Power Bracelet',
      type: 'Primary',
      price: '$69',
      description: 'Personal frequency enhancer for confident, calm communication.',
      ritual: 'Wear for presentations and important conversations.',
      image: IMG.PREMIUM_ZODIAC,
      url: 'https://store.taichigemstone.com/products/premium-zodiac-power-bracelet-natural-stones',
      variantId: '51750260539673',
      tags: [SubNeedID.Confidence],
      upsells: [
        { id: 'cs-conf-up1', name: 'Tarot Guidance Necklace', price: '$79', description: 'Connects to inner wisdom for authentic expression.', image: IMG.TAROT_NECKLACE, type: 'Supportive', tags: [SubNeedID.Confidence], ritual: 'Hold before speaking up.', url: 'https://store.taichigemstone.com/products/tarot-guidance-necklace-titanium-natural-stone', variantId: '51747364569369' },
        { id: 'cs-conf-up2', name: 'Zodiac Alignment Bracelet', price: '$49', description: 'Grounds confidence in authenticity.', image: IMG.ZODIAC_ALIGNMENT, type: 'Supportive', tags: [SubNeedID.Confidence], ritual: 'Touch for reassurance.', url: 'https://store.taichigemstone.com/products/zodiac-alignment-bracelet-natural-stone', variantId: '51747345563929' }
      ]
    },
    [SubNeedID.Intuition]: {
      id: 'cs-int-1',
      name: 'Tarot Guidance Necklace',
      type: 'Primary',
      price: '$79',
      description: 'Quiet wisdom for meditation focus and inner knowing.',
      ritual: 'Meditation and reflection companion.',
      image: IMG.TAROT_NECKLACE,
      url: 'https://store.taichigemstone.com/products/tarot-guidance-necklace-titanium-natural-stone',
      variantId: '51747364569369',
      tags: [SubNeedID.Intuition],
      upsells: [
        { id: 'cs-int-up1', name: 'Zodiac Alignment Bracelet', price: '$49', description: 'Grounds intuitive insights into action.', image: IMG.ZODIAC_ALIGNMENT, type: 'Supportive', tags: [SubNeedID.Intuition], ritual: 'Pair during meditation.', url: 'https://store.taichigemstone.com/products/zodiac-alignment-bracelet-natural-stone', variantId: '51747345563929' },
        { id: 'cs-int-up2', name: 'Mixed Stone Zodiac Bracelet', price: '$49', description: 'Connects personal wisdom to universal flow.', image: IMG.MIXED_ZODIAC, type: 'Supportive', tags: [SubNeedID.Intuition], ritual: 'Wear during reflection.', url: 'https://store.taichigemstone.com/products/zodiac-energy-bracelet-mixed-natural-stones', variantId: '51747373809945' }
      ]
    },
  },

  // === INTUITIVE EXPLORER (Ether/Air) ===
  // Best upsells: Tarot Necklace, Quartz Cuff, Zodiac Energy, Chakra Balance, Cat's Eye Fox
  [ArchetypeID.Intuitive]: {
    [SubNeedID.Intuition]: {
      id: 'ie-int-1',
      name: 'Tarot Guidance Necklace',
      type: 'Primary',
      price: '$79',
      description: 'Hold the pendant when seeking an answer. Trust the first image or word that comes to mind.',
      ritual: 'Consult before big decisions.',
      image: IMG.TAROT_NECKLACE,
      url: 'https://store.taichigemstone.com/products/tarot-guidance-necklace-titanium-natural-stone',
      variantId: '51747364569369',
      tags: [SubNeedID.Intuition],
      upsells: [
        { id: 'ie-int-up1', name: 'Quartz Crystal Point Cuff', price: '$69', description: 'Amplifies and focuses your visions.', image: IMG.QUARTZ_CUFF, type: 'Supportive', tags: [SubNeedID.Intuition], ritual: 'Program with a question.', url: 'https://store.taichigemstone.com/products/crystal-point-energy-amplifier-quartz-charm', variantId: '51751941144857' },
        { id: 'ie-int-up2', name: 'Zodiac Energy Bracelet', price: '$49', description: 'Connects personal intuition to cosmic patterns.', image: IMG.ZODIAC_ENERGY, type: 'Supportive', tags: [SubNeedID.Intuition], ritual: 'Wear during readings.', url: 'https://store.taichigemstone.com/products/zodiac-energy-bracelet-mixed-natural-stones', variantId: '51747373809945' },
        { id: 'ie-int-up3', name: 'Chakra Balance Bracelet', price: '$49', description: 'Opens all channels for clear receiving.', image: IMG.CHAKRA_BALANCE, type: 'Supportive', tags: [SubNeedID.Intuition], ritual: 'Third eye activation.', url: 'https://store.taichigemstone.com/products/chakra-balance-bracelet-mixed-stones', variantId: '51745535918361' }
      ]
    },
    [SubNeedID.Confidence]: {
      id: 'ie-conf-1',
      name: 'Quartz Crystal Point Cuff',
      type: 'Primary',
      price: '$69',
      description: 'Amplifies your unique perspective and creative voice.',
      ritual: 'Wear when sharing your visions with others.',
      image: IMG.QUARTZ_CUFF,
      url: 'https://store.taichigemstone.com/products/crystal-point-energy-amplifier-quartz-charm',
      variantId: '51751941144857',
      tags: [SubNeedID.Confidence],
      upsells: [
        { id: 'ie-conf-up1', name: 'Tarot Guidance Necklace', price: '$79', description: 'Trust your inner knowing publicly.', image: IMG.TAROT_NECKLACE, type: 'Supportive', tags: [SubNeedID.Confidence], ritual: 'Wear to presentations.', url: 'https://store.taichigemstone.com/products/tarot-guidance-necklace-titanium-natural-stone', variantId: '51747364569369' },
        { id: 'ie-conf-up2', name: 'Zodiac Energy Bracelet', price: '$49', description: 'Cosmic support for bold expressions.', image: IMG.ZODIAC_ENERGY, type: 'Supportive', tags: [SubNeedID.Confidence], ritual: 'Touch before speaking.', url: 'https://store.taichigemstone.com/products/zodiac-energy-bracelet-mixed-natural-stones', variantId: '51747373809945' }
      ]
    },
    [SubNeedID.Calm]: {
      id: 'ie-calm-1',
      name: 'Zodiac Energy Bracelet',
      type: 'Primary',
      price: '$49',
      description: 'Grounds scattered mystical energy into peaceful flow.',
      ritual: 'Wear when feeling unmoored from reality.',
      image: IMG.ZODIAC_ENERGY,
      url: 'https://store.taichigemstone.com/products/zodiac-energy-bracelet-mixed-natural-stones',
      variantId: '51747373809945',
      tags: [SubNeedID.Calm],
      upsells: [
        { id: 'ie-calm-up1', name: 'Quartz Crystal Point Cuff', price: '$69', description: 'Clarifies mental noise without blocking insight.', image: IMG.QUARTZ_CUFF, type: 'Supportive', tags: [SubNeedID.Calm], ritual: 'Wear during meditation.', url: 'https://store.taichigemstone.com/products/crystal-point-energy-amplifier-quartz-charm', variantId: '51751941144857' },
        { id: 'ie-calm-up2', name: 'Chakra Balance Bracelet', price: '$49', description: 'Balances visionary mind with peaceful body.', image: IMG.CHAKRA_BALANCE, type: 'Supportive', tags: [SubNeedID.Calm], ritual: 'Evening grounding.', url: 'https://store.taichigemstone.com/products/chakra-balance-bracelet-mixed-stones', variantId: '51745535918361' }
      ]
    },
    [SubNeedID.Protection]: {
      id: 'ie-prot-1',
      name: 'Chakra Balance Bracelet',
      type: 'Primary',
      price: '$49',
      description: 'Seals your energy field while keeping third eye open.',
      ritual: 'Wear on spiritual adventures and explorations.',
      image: IMG.CHAKRA_BALANCE,
      url: 'https://store.taichigemstone.com/products/chakra-balance-bracelet-mixed-stones',
      variantId: '51745535918361',
      tags: [SubNeedID.Protection],
      upsells: [
        { id: 'ie-prot-up1', name: 'Zodiac Energy Bracelet', price: '$49', description: 'Cosmic shield for sensitive explorers.', image: IMG.ZODIAC_ENERGY, type: 'Supportive', tags: [SubNeedID.Protection], ritual: 'Layer for journeys.', url: 'https://store.taichigemstone.com/products/zodiac-energy-bracelet-mixed-natural-stones', variantId: '51747373809945' },
        { id: 'ie-prot-up2', name: 'Quartz Crystal Point Cuff', price: '$69', description: 'Amplifies protective intentions.', image: IMG.QUARTZ_CUFF, type: 'Supportive', tags: [SubNeedID.Protection], ritual: 'Set protection before travel.', url: 'https://store.taichigemstone.com/products/crystal-point-energy-amplifier-quartz-charm', variantId: '51751941144857' }
      ]
    },
    [SubNeedID.EmotionalBalance]: {
      id: 'ie-em-1',
      name: 'Zodiac Energy Bracelet',
      type: 'Primary',
      price: '$49',
      description: 'Universal connection for emotional grounding of the mystical mind.',
      ritual: 'Daily grounding for sensitive explorers.',
      image: IMG.ZODIAC_ENERGY,
      url: 'https://store.taichigemstone.com/products/zodiac-energy-bracelet-mixed-natural-stones',
      variantId: '51747373809945',
      tags: [SubNeedID.EmotionalBalance],
      upsells: [
        { id: 'ie-em-up1', name: 'Chakra Balance Bracelet', price: '$49', description: 'Aligns emotions with spiritual flow.', image: IMG.CHAKRA_BALANCE, type: 'Supportive', tags: [SubNeedID.EmotionalBalance], ritual: 'Morning alignment.', url: 'https://store.taichigemstone.com/products/chakra-balance-bracelet-mixed-stones', variantId: '51745535918361' },
        { id: 'ie-em-up2', name: 'Tarot Guidance Necklace', price: '$79', description: 'Wisdom for processing emotions.', image: IMG.TAROT_NECKLACE, type: 'Supportive', tags: [SubNeedID.EmotionalBalance], ritual: 'Consult during overwhelm.', url: 'https://store.taichigemstone.com/products/tarot-guidance-necklace-titanium-natural-stone', variantId: '51747364569369' }
      ]
    },
  }
};
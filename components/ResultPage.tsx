import React, { useState, useRef, useMemo, useEffect } from "react";
import { QuizResult, ArchetypeID, ProductRecommendation } from "../types";
import { ARCHETYPES, PRODUCT_MATRIX } from "../constants";
import {
  RefreshCw,
  Download,
  Quote,
  ArrowDown,
  Plus,
  Check,
  ArrowRight,
  Star,
  Heart,
  Briefcase,
  Crown,
  AlertTriangle,
  TrendingUp,
  Flower2,
  Sparkles,
} from "lucide-react";
import { enhanceProduct } from "../utils/productEnhancer";
import { ShareableCard } from "./ShareableCard";
import { trackEvent } from "../utils/facebookPixel";
// import { supabase } from '@/src/integrations/supabase/client'; // Temporarily disabled

interface ResultPageProps {
  result: QuizResult;
  onRetake: () => void;
}

export const ResultPage: React.FC<ResultPageProps> = ({ result, onRetake }) => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const productSectionRef = useRef<HTMLDivElement>(null);

  const archetype = ARCHETYPES[result.archetype];
  const baseRecommendations =
    PRODUCT_MATRIX[result.archetype][result.subNeed] || PRODUCT_MATRIX[result.archetype]["protection"];

  const recommendations = useMemo(() => {
    return enhanceProduct(baseRecommendations);
  }, [baseRecommendations]);

  // Track ViewContent when result page loads
  useEffect(() => {
    trackEvent("ViewContent", {
      content_name: archetype.name,
      content_category: "Quiz Result",
      content_type: result.archetype,
      sub_need: result.subNeed,
    });
  }, [archetype.name, result.archetype, result.subNeed]);

  const parsePrice = (priceStr?: string) => {
    if (!priceStr) return 0;
    const numericValue = parseFloat(priceStr.replace(/[$,]/g, ""));
    return isNaN(numericValue) ? 0 : numericValue;
  };

  const formatPrice = (value: number) => {
    return value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const mainPrice = parsePrice(recommendations.price);
  const upsellTotal = recommendations.upsells
    ? recommendations.upsells.reduce((acc, item) => acc + parsePrice(item.price), 0)
    : 0;

  const totalValue = mainPrice + upsellTotal;
  const bundlePrice = Math.floor(totalValue * 0.85);
  const savings = totalValue - bundlePrice;

  const handleDownloadPDF = () => {
    window.print();
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setIsSubmitting(true);
    try {
      // TODO: Re-enable Supabase to save email subscriptions to database
      // Temporarily disabled - just logging and marking as subscribed
      console.log("Email subscription (not saved to DB):", {
        email,
        archetype: result.archetype,
        sub_need: result.subNeed,
        preference: result.preference,
        zodiac: result.zodiac || null,
      });
      setSubscribed(true);

      // Original Supabase code (commented out):
      // const { error } = await supabase
      //    .from('quiz_results')
      //    .insert({
      //       email: email,
      //       archetype: result.archetype,
      //       sub_need: result.subNeed,
      //       preference: result.preference,
      //       zodiac: result.zodiac || null,
      //    });
      // if (error) {
      //    console.error('Error saving email subscription:', error);
      // } else {
      //    setSubscribed(true);
      // }
    } catch (err) {
      console.error("Failed to save email:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToProduct = () => {
    productSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Track upsell product clicks (Chakra, Element, Symbol)
  const handleChakraUpsellClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    e.preventDefault();
    console.log("🔵 Chakra upsell clicked:", archetype.chakraUpsell.name, url);
    trackEvent("ViewContent", {
      content_name: archetype.chakraUpsell.name,
      content_category: "Chakra Upsell",
      content_type: "product_click",
    });
    setTimeout(() => window.open(url, "_blank"), 300);
  };

  const handleElementUpsellClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    e.preventDefault();
    console.log("🟢 Element upsell clicked:", archetype.elementUpsell.name, url);
    trackEvent("ViewContent", {
      content_name: archetype.elementUpsell.name,
      content_category: "Element Upsell",
      content_type: "product_click",
    });
    setTimeout(() => window.open(url, "_blank"), 300);
  };

  const handleSymbolUpsellClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    e.preventDefault();
    console.log("🟣 Symbol upsell clicked:", archetype.symbolUpsell.name, url);
    trackEvent("ViewContent", {
      content_name: archetype.symbolUpsell.name,
      content_category: "Symbol Upsell",
      content_type: "product_click",
    });
    setTimeout(() => window.open(url, "_blank"), 300);
  };

  // Track main product click
  const handleMainProductClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    trackEvent("ViewContent", {
      content_name: recommendations.name,
      content_category: "Main Product",
      content_type: "product_click",
      value: parsePrice(recommendations.price),
      currency: "USD",
    });
    setTimeout(() => window.open(recommendations.url || "#", "_blank"), 300);
  };

  // Track pairs with product clicks
  const handlePairsWithClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: { name: string; price?: string; url?: string },
    index: number,
  ) => {
    e.preventDefault();
    console.log("🟠 Pairs with clicked:", item.name, index, item.url);
    trackEvent("ViewContent", {
      content_name: item.name,
      content_category: "Pairs With Upsell",
      content_type: "product_click",
      item_index: index + 1,
      value: parsePrice(item.price),
      currency: "USD",
    });
    setTimeout(() => window.open(item.url || "#", "_blank"), 300);
  };

  const handleClaimBundle = () => {
    // Track InitiateCheckout with Meta Pixel
    trackEvent("InitiateCheckout", {
      content_name: recommendations.name,
      content_category: result.archetype,
      value: bundlePrice,
      currency: "USD",
      num_items: 1 + (recommendations.upsells?.length || 0),
    });

    try {
      const variantIds: string[] = [];
      if (recommendations.variantId) {
        variantIds.push(recommendations.variantId);
      }
      if (recommendations.upsells) {
        recommendations.upsells.forEach((upsell) => {
          if (upsell.variantId) {
            variantIds.push(upsell.variantId);
          }
        });
      }
      if (variantIds.length === 0) {
        window.open("https://store.taichigemstone.com/collections/all", "_blank");
        return;
      }
      const cartItems = variantIds.map((id) => `${id}:1`).join(",");
      const cartUrl = `https://store.taichigemstone.com/cart/${cartItems}`;
      window.open(cartUrl, "_blank");
    } catch (error) {
      console.error("Error building cart URL:", error);
      window.open("https://store.taichigemstone.com/collections/all", "_blank");
    }
  };

  const renderLongText = (text: string) => {
    return text.split("\n\n").map((paragraph, idx) => {
      const isHeader = paragraph === paragraph.toUpperCase() && paragraph.length < 80;
      if (isHeader) {
        return (
          <h4
            key={idx}
            className="text-xs font-semibold uppercase tracking-wider text-moon-100 mt-8 mb-4 pt-4 border-t border-white/20"
          >
            {paragraph}
          </h4>
        );
      }
      return (
        <p key={idx} className="text-white text-lg md:text-xl leading-loose mb-6">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <div
      className="min-h-screen relative bg-cosmic-500 animate-fade-in selection:bg-olive-100 print:bg-white pb-20"
      style={{
        backgroundImage: "url(/celestial-bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Dark overlay for softer aesthetic - increased darkness */}
      <div className="absolute inset-0 bg-cosmic-600/50 backdrop-blur-sm pointer-events-none"></div>

      {/* Background shapes */}
      <div className="fixed inset-0 paper-texture pointer-events-none"></div>

      {/* HEADER / COVER */}
      <section className="relative pt-4 pb-4 px-6 text-center overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-20 left-10 w-40 h-40 bg-olive-200/30 blob-shape animate-blob"></div>
        <div
          className="absolute top-40 right-16 w-28 h-28 bg-terracotta-200/30 blob-shape animate-blob"
          style={{ animationDelay: "-2s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/4 w-32 h-32 bg-dusty-200/25 blob-shape animate-blob"
          style={{ animationDelay: "-4s" }}
        ></div>

        <div className="max-w-3xl mx-auto relative z-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Flower2 className="w-4 h-4 text-moon-100" />
            <p className="text-xs uppercase tracking-widest text-moon-100 font-medium">your energy blueprint</p>
            <Flower2 className="w-4 h-4 text-moon-100" />
          </div>

          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 italic">{archetype.name}</h1>

          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-16 h-px bg-white/50"></div>
            <Heart className="w-4 h-4 text-moon-200 animate-float" fill="currentColor" />
            <div className="w-16 h-px bg-white/50"></div>
          </div>

          <p className="text-lg md:text-xl text-moon-100 leading-relaxed max-w-2xl mx-auto mb-10">
            {archetype.description}
          </p>

          <button
            onClick={scrollToProduct}
            className="group inline-flex items-center gap-3 bg-clay-500 text-warm-50 px-8 py-4 hand-drawn transition-all duration-300 hover:bg-terracotta-400 cozy-shadow cozy-shadow-hover"
          >
            <span className="text-sm tracking-wider font-medium text-white">explore your curated anchor</span>
            <ArrowDown size={16} className="animate-bounce" />
          </button>
        </div>
      </section>

      {/* ENERGETIC PILLARS */}
      <section className="relative py-4 px-3 overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <h2 className="font-serif text-2xl md:text-3xl text-white italic mb-3 celestial-glow">
              your energetic composition
            </h2>
            <p className="text-moon-100 max-w-lg mx-auto text-sm">
              the three foundational elements that define your spiritual signature
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Chakra */}
            <div className="p-6 text-center">
              <span
                className="text-xs uppercase tracking-widest text-gold-300 font-semibold mb-3 block"
                style={{ textShadow: "0 0 8px rgba(234, 179, 8, 0.7), 0 0 15px rgba(234, 179, 8, 0.4)" }}
              >
                chakra center
              </span>
              <h3
                className="font-serif text-2xl text-white mb-3"
                style={{
                  textShadow:
                    "0 0 10px rgba(234, 179, 8, 0.8), 0 0 20px rgba(234, 179, 8, 0.5), 0 0 30px rgba(234, 179, 8, 0.3)",
                }}
              >
                {archetype.chakra}
              </h3>
              <p className="text-moon-100 text-sm leading-relaxed mb-6">{archetype.chakraMeaning}</p>

              <div className="p-4">
                <p className="text-xs uppercase tracking-wider text-gold-200 font-medium mb-3">harmonizing tool</p>
                <a
                  href={archetype.chakraUpsell.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  onClick={(e) => handleChakraUpsellClick(e, archetype.chakraUpsell.url || "#")}
                >
                  <div className="aspect-square w-full overflow-hidden mb-3">
                    <img
                      src={archetype.chakraUpsell.image}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      alt={archetype.chakraUpsell.name}
                    />
                  </div>
                  <h4 className="font-serif text-base text-white italic mb-1">{archetype.chakraUpsell.name}</h4>
                  <p className="text-xs text-moon-100 leading-relaxed">{archetype.chakraUpsell.description}</p>
                </a>
              </div>
            </div>

            {/* Element */}
            <div className="p-6 text-center">
              <span
                className="text-xs uppercase tracking-widest text-gold-300 font-semibold mb-3 block"
                style={{ textShadow: "0 0 8px rgba(234, 179, 8, 0.7), 0 0 15px rgba(234, 179, 8, 0.4)" }}
              >
                ruling element
              </span>
              <h3
                className="font-serif text-2xl text-white mb-3"
                style={{
                  textShadow:
                    "0 0 10px rgba(234, 179, 8, 0.8), 0 0 20px rgba(234, 179, 8, 0.5), 0 0 30px rgba(234, 179, 8, 0.3)",
                }}
              >
                {archetype.element}
              </h3>
              <p className="text-moon-100 text-sm leading-relaxed mb-6">{archetype.elementMeaning}</p>

              <div className="p-4">
                <p className="text-xs uppercase tracking-wider text-gold-200 font-medium mb-3">elemental tool</p>
                <a
                  href={archetype.elementUpsell.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  onClick={(e) => handleElementUpsellClick(e, archetype.elementUpsell.url || "#")}
                >
                  <div className="aspect-square w-full overflow-hidden mb-3">
                    <img
                      src={archetype.elementUpsell.image}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      alt={archetype.elementUpsell.name}
                    />
                  </div>
                  <h4 className="font-serif text-base text-white italic mb-1">{archetype.elementUpsell.name}</h4>
                  <p className="text-xs text-moon-100 leading-relaxed">{archetype.elementUpsell.description}</p>
                </a>
              </div>
            </div>

            {/* Symbol */}
            <div className="p-6 text-center">
              <span
                className="text-xs uppercase tracking-widest text-gold-300 font-semibold mb-3 block"
                style={{ textShadow: "0 0 8px rgba(234, 179, 8, 0.7), 0 0 15px rgba(234, 179, 8, 0.4)" }}
              >
                archetypal symbol
              </span>
              <h3
                className="font-serif text-2xl text-white mb-3"
                style={{
                  textShadow:
                    "0 0 10px rgba(234, 179, 8, 0.8), 0 0 20px rgba(234, 179, 8, 0.5), 0 0 30px rgba(234, 179, 8, 0.3)",
                }}
              >
                {archetype.symbol}
              </h3>
              <p className="text-moon-100 text-sm leading-relaxed mb-6">{archetype.symbolMeaning}</p>

              <div className="p-4">
                <p className="text-xs uppercase tracking-wider text-gold-200 font-medium mb-3">symbolic totem</p>
                <a
                  href={archetype.symbolUpsell.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  onClick={(e) => handleSymbolUpsellClick(e, archetype.symbolUpsell.url || "#")}
                >
                  <div className="aspect-square w-full overflow-hidden mb-3">
                    <img
                      src={archetype.symbolUpsell.image}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      alt={archetype.symbolUpsell.name}
                    />
                  </div>
                  <h4 className="font-serif text-base text-white italic mb-1">{archetype.symbolUpsell.name}</h4>
                  <p className="text-xs text-moon-100 leading-relaxed">{archetype.symbolUpsell.description}</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ANALYSIS CONTENT */}
      <section className="py-4 px-3 max-w-2xl mx-auto relative z-10">
        {/* Insight 1 */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-serif text-3xl text-gold-300">I.</span>
            <h3 className="font-serif text-2xl text-white italic celestial-glow">the frequency</h3>
          </div>
          <div className="bg-cosmic-600/80 backdrop-blur-md p-6 md:p-8 rounded-2xl cosmic-shadow mystical-border">
            {renderLongText(archetype.patternInsight)}
          </div>
        </div>

        {/* Insight 2 */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-serif text-3xl text-gold-300">II.</span>
            <h3 className="font-serif text-2xl text-white italic celestial-glow">the shadow</h3>
          </div>
          <div className="bg-cosmic-600/80 backdrop-blur-md p-6 md:p-8 rounded-2xl cosmic-shadow mystical-border">
            {renderLongText(archetype.blindSpot)}
          </div>
        </div>

        {/* Section III: Personality */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-serif text-3xl text-gold-300">III.</span>
            <h3 className="font-serif text-2xl text-white italic celestial-glow">your personality in life</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-cosmic-600/80 backdrop-blur-md p-5 rounded-xl cosmic-shadow mystical-border">
              <div className="flex items-center gap-2 mb-3">
                <Heart size={16} className="text-gold-300" />
                <span className="text-xs uppercase tracking-wider text-gold-200 font-semibold">relationships</span>
              </div>
              <p className="text-white text-sm leading-relaxed">{archetype.inRelationships}</p>
            </div>

            <div className="bg-cosmic-600/80 backdrop-blur-md p-5 rounded-xl cosmic-shadow mystical-border">
              <div className="flex items-center gap-2 mb-3">
                <Briefcase size={16} className="text-gold-300" />
                <span className="text-xs uppercase tracking-wider text-gold-200 font-semibold">at work</span>
              </div>
              <p className="text-white text-sm leading-relaxed">{archetype.atWork}</p>
            </div>

            <div className="bg-cosmic-600/80 backdrop-blur-md p-5 rounded-xl cosmic-shadow mystical-border">
              <div className="flex items-center gap-2 mb-3">
                <Crown size={16} className="text-gold-300" />
                <span className="text-xs uppercase tracking-wider text-gold-200 font-semibold">leadership</span>
              </div>
              <p className="text-white text-sm leading-relaxed">{archetype.leadershipStyle}</p>
            </div>
          </div>
        </div>

        {/* Section IV: Growth */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-serif text-3xl text-gold-300">IV.</span>
            <h3 className="font-serif text-2xl text-white italic celestial-glow">your growth journey</h3>
          </div>

          {/* Stress */}
          <div className="bg-cosmic-600/80 backdrop-blur-md p-5 rounded-xl cosmic-shadow mystical-border mb-6">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={16} className="text-gold-300" />
              <span className="text-xs uppercase tracking-wider text-gold-200 font-semibold">under stress</span>
            </div>
            <p className="text-white text-sm leading-relaxed">{archetype.stressResponse}</p>
          </div>

          {/* Growth Path */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={16} className="text-gold-300" />
              <span className="text-xs uppercase tracking-wider text-gold-200 font-semibold">your path forward</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {archetype.growthPath.split(" → ").map((step, idx, arr) => {
                const isLast = idx === arr.length - 1;
                return (
                  <div
                    key={idx}
                    className={`relative p-4 rounded-xl cosmic-shadow ${isLast ? "bg-cosmic-500/40 mystical-border border-gold-400" : "bg-cosmic-700/70 mystical-border"}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-light text-gold-300 leading-none">0{idx + 1}</span>
                      <h4 className="text-sm font-medium text-white leading-relaxed">{step}</h4>
                    </div>
                    {isLast && (
                      <div className="absolute top-3 right-3 text-[9px] text-gold-200 uppercase tracking-wider font-medium">
                        ✦ destination
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Diagnosis */}
        <div className="text-center py-10 border-t border-b border-white/20">
          <p className="text-xs uppercase tracking-widest text-moon-100 font-medium mb-3">current resonance</p>
          <p className="font-serif text-lg md:text-xl italic text-white leading-relaxed">
            "your responses indicate a need for{" "}
            <span className="not-italic font-semibold text-moon-200">{result.subNeed.replace(/_/g, " ")}</span> to
            restore equilibrium."
          </p>
        </div>
      </section>

      {/* MANTRA */}
      <section className="relative bg-cosmic-500 text-warm-50 py-12 px-6 text-center overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-clay-400/30 blob-shape animate-blob"></div>
        <div
          className="absolute bottom-10 right-10 w-24 h-24 bg-terracotta-400/20 blob-shape animate-blob"
          style={{ animationDelay: "-3s" }}
        ></div>

        <div className="max-w-2xl mx-auto relative z-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Quote className="text-white" size={28} />
          </div>
          <h3 className="font-serif text-2xl md:text-4xl italic leading-relaxed mb-6 text-white">
            "{archetype.affirmation}"
          </h3>
          <p className="text-xs uppercase tracking-widest text-white">daily mantra</p>
        </div>
      </section>

      {/* SHAREABLE CARD */}
      <section className="relative py-16 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="w-5 h-5 text-gold-300" />
              <h2 className="font-serif text-3xl md:text-4xl text-white italic celestial-glow">Share Your Discovery</h2>
              <Sparkles className="w-5 h-5 text-gold-300" />
            </div>
            <p className="text-moon-100 max-w-lg mx-auto text-sm">
              Download your personalized archetype card or share it with the world
            </p>
          </div>

          <ShareableCard archetype={archetype} zodiac={result.zodiac} />
        </div>
      </section>

      {/* PRIMARY RITUAL ANCHOR */}
      <section ref={productSectionRef} className="py-4 px-3 max-w-6xl mx-auto scroll-mt-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* LEFT COLUMN: Main Image */}
          <div className="lg:col-span-6 lg:sticky lg:top-20">
            <a
              href={recommendations.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleMainProductClick}
              className="relative aspect-square bg-cosmic-600/80 overflow-hidden cosmic-shadow group rounded-2xl mystical-border block"
            >
              <img
                src={recommendations.image}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt={recommendations.name}
              />
              <div className="absolute top-4 left-4 bg-cosmic-600/80 px-3 py-2 rounded-lg mystical-border backdrop-blur-md">
                <span className="text-xs uppercase tracking-wider text-gold-300 font-semibold flex items-center gap-2">
                  <Star size={10} fill="currentColor" className="text-gold-400" /> primary anchor
                </span>
              </div>
            </a>
          </div>

          {/* RIGHT COLUMN: Details */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-10 bg-white/50"></div>
                <span className="text-xs uppercase tracking-widest text-moon-100 font-medium">
                  essential recommendation
                </span>
              </div>

              <h2 className="font-serif text-4xl md:text-5xl text-white mb-4 leading-tight italic">
                {recommendations.name}
              </h2>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-serif text-2xl text-white">{recommendations.price}</span>
              </div>

              <p className="text-moon-100 text-base mb-6 leading-relaxed">{recommendations.description}</p>

              <div className="bg-cosmic-600/80 backdrop-blur-md p-5 border-l-4 border-gold-400 mb-8 rounded-xl mystical-border">
                <p className="text-xs uppercase tracking-wider text-gold-200 font-medium mb-2">prescribed ritual</p>
                <p className="text-sm italic text-white">"{recommendations.ritual}"</p>
              </div>

              <a
                href={recommendations.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleMainProductClick(e)}
                className="w-full md:w-auto px-10 py-4 border-2 border-gold-400 text-white text-sm tracking-wider font-medium hover:bg-gold-400 hover:text-cosmic-600 transition-all flex items-center justify-center gap-3 rounded-xl cosmic-shadow cosmic-shadow-hover mystical-border"
              >
                discover your anchor <Plus size={14} />
              </a>
            </div>

            {/* PAIRS WITH */}
            {recommendations.upsells && recommendations.upsells.length > 0 && (
              <div className="mb-10 pt-10 border-t border-cosmic-400/30">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-serif text-xl italic text-white celestial-glow">perfectly pairs with</span>
                  <span className="text-xs uppercase tracking-wider text-gold-200">complete the circuit</span>
                </div>

                <div className="space-y-4">
                  {recommendations.upsells.map((item, idx) => (
                    <a
                      key={idx}
                      href={item.url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => handlePairsWithClick(e, item, idx)}
                      className="flex gap-4 items-center group cursor-pointer hover:bg-cosmic-400/30 p-2 rounded-xl transition-colors"
                    >
                      <div className="w-16 h-16 shrink-0 bg-cosmic-600/80 overflow-hidden rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-serif text-base text-white leading-tight mb-1 group-hover:text-gold-300 transition-colors">
                          {item.name}
                        </h4>
                        <span className="text-sm text-moon-100">{item.price}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* BUNDLE CARD */}
            {recommendations.upsells && recommendations.upsells.length > 0 && (
              <div className="relative hand-drawn overflow-hidden cozy-shadow bg-cosmic-600 text-warm-50">
                <div className="p-6 md:p-8">
                  <div className="mb-6 pb-6 border-b border-white/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles size={14} className="text-white" />
                      <span className="text-xs uppercase tracking-widest text-white font-medium">
                        divine alignment set
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl md:text-3xl italic text-warm-50 mb-2 text-moon-100">
                      the complete ritual
                    </h3>
                    <p className="text-warm-200 text-xs max-w-xs text-moon-100">
                      includes the {recommendations.name} + {recommendations.upsells.length} harmonizers
                    </p>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
                    <div>
                      <p className="text-white/70 text-xs uppercase tracking-wider mb-1">total bundle value</p>
                      <div className="flex items-baseline gap-3">
                        <span className="text-white/50 line-through text-base">${formatPrice(totalValue)}</span>
                        <span className="font-serif text-3xl md:text-4xl text-white italic">
                          ${formatPrice(bundlePrice)}
                        </span>
                      </div>
                      <div className="inline-flex items-center gap-2 mt-2 bg-warm-50/10 px-3 py-1 hand-drawn">
                        <span className="w-2 h-2 rounded-full bg-olive-400"></span>
                        <span className="text-xs uppercase tracking-wider text-white font-medium">
                          save ${formatPrice(savings)} (15%)
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={handleClaimBundle}
                      className="flex-1 md:flex-none bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-cosmic-600 px-6 py-3 uppercase tracking-wider text-xs font-semibold transition-all flex items-center justify-center gap-2 rounded-lg cosmic-shadow cosmic-shadow-hover celestial-glow"
                    >
                      claim full bundle <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER ACTIONS */}
      <section className="border-t border-white/20 py-12 text-center bg-transparent relative z-10">
        <div className="flex flex-col md:flex-row justify-center gap-6 mb-8">
          <button
            onClick={handleDownloadPDF}
            className="text-xs uppercase tracking-wider text-moon-100 hover:text-white transition-colors flex items-center justify-center gap-2"
          >
            <Download size={14} /> save report
          </button>
          <button
            onClick={onRetake}
            className="text-xs uppercase tracking-wider text-moon-100 hover:text-white transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw size={14} /> restart analysis
          </button>
        </div>

        {!subscribed ? (
          <div className="max-w-sm mx-auto px-6">
            <p className="font-serif text-xl italic text-white mb-6 celestial-glow">stay connected to your center</p>
            <form
              onSubmit={handleSubscribe}
              className="flex bg-cosmic-600/80 p-1 mystical-border rounded-lg backdrop-blur-md"
            >
              <input
                type="email"
                placeholder="enter your email"
                className="flex-1 bg-transparent outline-none text-white placeholder:text-moon-300 px-4 py-3 text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="text-xs uppercase tracking-wider text-cosmic-600 font-medium bg-gradient-to-r from-gold-600 to-gold-500 px-4 py-3 hover:from-gold-500 hover:to-gold-400 transition-all rounded-lg celestial-glow"
              >
                join
              </button>
            </form>
          </div>
        ) : (
          <p className="text-xs uppercase tracking-wider text-white animate-fade-in celestial-glow">
            welcome to the circle ✦
          </p>
        )}
      </section>
    </div>
  );
};

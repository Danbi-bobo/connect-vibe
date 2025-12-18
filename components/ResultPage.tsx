import React, { useState, useRef, useMemo } from 'react';
import { QuizResult, ArchetypeID, ProductRecommendation } from '../types';
import { ARCHETYPES, PRODUCT_MATRIX } from '../constants';
import { RefreshCw, Download, Quote, ArrowDown, Plus, Check, ArrowRight, Star, Heart, Briefcase, Crown, AlertTriangle, TrendingUp, Flower2, Sparkles } from 'lucide-react';
import { enhanceProduct } from '../utils/productEnhancer';
import { supabase } from '@/src/integrations/supabase/client';

interface ResultPageProps {
   result: QuizResult;
   onRetake: () => void;
}

export const ResultPage: React.FC<ResultPageProps> = ({ result, onRetake }) => {
   const [email, setEmail] = useState('');
   const [subscribed, setSubscribed] = useState(false);
   const [isSubmitting, setIsSubmitting] = useState(false);

   const productSectionRef = useRef<HTMLDivElement>(null);

   const archetype = ARCHETYPES[result.archetype];
   const baseRecommendations = PRODUCT_MATRIX[result.archetype][result.subNeed] ||
      PRODUCT_MATRIX[result.archetype]['protection'];

   const recommendations = useMemo(() => {
      return enhanceProduct(baseRecommendations);
   }, [baseRecommendations]);

   const parsePrice = (priceStr?: string) => {
      if (!priceStr) return 0;
      const numericValue = parseFloat(priceStr.replace(/[$,]/g, ''));
      return isNaN(numericValue) ? 0 : numericValue;
   };

   const formatPrice = (value: number) => {
      return value.toLocaleString('en-US', {
         minimumFractionDigits: 2,
         maximumFractionDigits: 2
      });
   };

   const mainPrice = parsePrice(recommendations.price);
   const upsellTotal = recommendations.upsells
      ? recommendations.upsells.reduce((acc, item) => acc + parsePrice(item.price), 0)
      : 0;

   const totalValue = mainPrice + upsellTotal;
   const bundlePrice = Math.floor(totalValue * 0.85);
   const savings = totalValue - bundlePrice;

   const handleDownloadPDF = () => { window.print(); };

   const handleSubscribe = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!email || !email.includes('@')) return;
      
      setIsSubmitting(true);
      try {
         // Save email subscription with quiz result context
         const { error } = await supabase
            .from('quiz_results')
            .insert({
               email: email,
               archetype: result.archetype,
               sub_need: result.subNeed,
               preference: result.preference,
               zodiac: result.zodiac || null,
            });

         if (error) {
            console.error('Error saving email subscription:', error);
         } else {
            setSubscribed(true);
         }
      } catch (err) {
         console.error('Failed to save email:', err);
      } finally {
         setIsSubmitting(false);
      }
   };

   const scrollToProduct = () => {
      productSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
   };

   const handleClaimBundle = () => {
      try {
         const variantIds: string[] = [];
         if (recommendations.variantId) {
            variantIds.push(recommendations.variantId);
         }
         if (recommendations.upsells) {
            recommendations.upsells.forEach(upsell => {
               if (upsell.variantId) {
                  variantIds.push(upsell.variantId);
               }
            });
         }
         if (variantIds.length === 0) {
            window.open('https://store.taichigemstone.com/collections/all', '_blank');
            return;
         }
         const cartItems = variantIds.map(id => `${id}:1`).join(',');
         const cartUrl = `https://store.taichigemstone.com/cart/${cartItems}`;
         window.open(cartUrl, '_blank');
      } catch (error) {
         console.error('Error building cart URL:', error);
         window.open('https://store.taichigemstone.com/collections/all', '_blank');
      }
   };

   const renderLongText = (text: string) => {
      return text.split('\n\n').map((paragraph, idx) => {
         const isHeader = paragraph === paragraph.toUpperCase() && paragraph.length < 80;
         if (isHeader) {
            return (
               <h4 key={idx} className="text-xs font-semibold uppercase tracking-wider text-clay-400 mt-8 mb-4 pt-4 border-t border-warm-300">
                  {paragraph}
               </h4>
            );
         }
         return (
            <p key={idx} className="text-clay-600 text-lg md:text-xl leading-loose mb-6">
               {paragraph}
            </p>
         );
      });
   };

   return (
      <div className="min-h-screen bg-warm-100 animate-fade-in selection:bg-olive-100 print:bg-white pb-20">

         {/* Background shapes */}
         <div className="fixed inset-0 paper-texture pointer-events-none"></div>

         {/* HEADER / COVER */}
         <section className="relative pt-24 pb-20 px-6 text-center overflow-hidden">
            {/* Decorative blobs */}
            <div className="absolute top-20 left-10 w-40 h-40 bg-olive-200/30 blob-shape animate-blob"></div>
            <div className="absolute top-40 right-16 w-28 h-28 bg-terracotta-200/30 blob-shape animate-blob" style={{ animationDelay: '-2s' }}></div>
            <div className="absolute bottom-20 left-1/4 w-32 h-32 bg-dusty-200/25 blob-shape animate-blob" style={{ animationDelay: '-4s' }}></div>

            <div className="max-w-3xl mx-auto relative z-10">
               <div className="flex items-center justify-center gap-3 mb-6">
                  <Flower2 className="w-4 h-4 text-olive-400" />
                  <p className="text-xs uppercase tracking-widest text-clay-400 font-medium">your energy blueprint</p>
                  <Flower2 className="w-4 h-4 text-olive-400" />
               </div>

               <h1 className="text-5xl md:text-7xl font-serif text-clay-600 mb-6 italic">
                  {archetype.name}
               </h1>

               <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="w-16 h-px bg-sand-400/50"></div>
                  <Heart className="w-4 h-4 text-terracotta-400 animate-float" fill="currentColor" />
                  <div className="w-16 h-px bg-sand-400/50"></div>
               </div>

               <p className="text-lg md:text-xl text-clay-500 leading-relaxed max-w-2xl mx-auto mb-10">
                  {archetype.description}
               </p>

               <button
                  onClick={scrollToProduct}
                  className="group inline-flex items-center gap-3 bg-clay-500 text-warm-50 px-8 py-4 hand-drawn transition-all duration-300 hover:bg-terracotta-400 cozy-shadow cozy-shadow-hover"
               >
                  <span className="text-sm tracking-wider font-medium">explore your curated anchor</span>
                  <ArrowDown size={16} className="animate-bounce" />
               </button>
            </div>
         </section>

         {/* ENERGETIC PILLARS */}
         <section className="relative border-y border-warm-300 bg-warm-50 py-16 md:py-20 px-6 overflow-hidden">
            <div className="absolute inset-0 paper-texture pointer-events-none"></div>

            <div className="max-w-5xl mx-auto relative z-10">
               <div className="text-center mb-12">
                  <h2 className="font-serif text-2xl md:text-3xl text-clay-600 italic mb-3">your energetic composition</h2>
                  <p className="text-clay-400 max-w-lg mx-auto text-sm">the three foundational elements that define your spiritual signature</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Chakra */}
                  <div className="bg-warm-100 p-6 hand-drawn cozy-shadow text-center">
                     <span className="text-xs uppercase tracking-widest text-olive-500 font-semibold mb-3 block">chakra center</span>
                     <h3 className="font-serif text-2xl text-clay-600 mb-3">{archetype.chakra}</h3>
                     <p className="text-clay-500 text-sm leading-relaxed mb-6">{archetype.chakraMeaning}</p>

                     <div className="bg-warm-50 p-4 hand-drawn border border-warm-300">
                        <p className="text-xs uppercase tracking-wider text-clay-400 font-medium mb-3">harmonizing tool</p>
                        <a href={archetype.chakraUpsell.url || "#"} target="_blank" rel="noopener noreferrer" className="block">
                           <div className="aspect-square w-full bg-warm-200 overflow-hidden mb-3 hand-drawn">
                              <img src={archetype.chakraUpsell.image} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" alt={archetype.chakraUpsell.name} />
                           </div>
                           <h4 className="font-serif text-base text-clay-600 italic mb-1">{archetype.chakraUpsell.name}</h4>
                           <p className="text-xs text-clay-400 leading-relaxed">{archetype.chakraUpsell.description}</p>
                        </a>
                     </div>
                  </div>

                  {/* Element */}
                  <div className="bg-warm-100 p-6 hand-drawn cozy-shadow text-center">
                     <span className="text-xs uppercase tracking-widest text-terracotta-500 font-semibold mb-3 block">ruling element</span>
                     <h3 className="font-serif text-2xl text-clay-600 mb-3">{archetype.element}</h3>
                     <p className="text-clay-500 text-sm leading-relaxed mb-6">{archetype.elementMeaning}</p>

                     <div className="bg-warm-50 p-4 hand-drawn border border-warm-300">
                        <p className="text-xs uppercase tracking-wider text-clay-400 font-medium mb-3">elemental tool</p>
                        <a href={archetype.elementUpsell.url || "#"} target="_blank" rel="noopener noreferrer" className="block">
                           <div className="aspect-square w-full bg-warm-200 overflow-hidden mb-3 hand-drawn">
                              <img src={archetype.elementUpsell.image} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" alt={archetype.elementUpsell.name} />
                           </div>
                           <h4 className="font-serif text-base text-clay-600 italic mb-1">{archetype.elementUpsell.name}</h4>
                           <p className="text-xs text-clay-400 leading-relaxed">{archetype.elementUpsell.description}</p>
                        </a>
                     </div>
                  </div>

                  {/* Symbol */}
                  <div className="bg-warm-100 p-6 hand-drawn cozy-shadow text-center">
                     <span className="text-xs uppercase tracking-widest text-dusty-500 font-semibold mb-3 block">archetypal symbol</span>
                     <h3 className="font-serif text-2xl text-clay-600 mb-3">{archetype.symbol}</h3>
                     <p className="text-clay-500 text-sm leading-relaxed mb-6">{archetype.symbolMeaning}</p>

                     <div className="bg-warm-50 p-4 hand-drawn border border-warm-300">
                        <p className="text-xs uppercase tracking-wider text-clay-400 font-medium mb-3">symbolic totem</p>
                        <a href={archetype.symbolUpsell.url || "#"} target="_blank" rel="noopener noreferrer" className="block">
                           <div className="aspect-square w-full bg-warm-200 overflow-hidden mb-3 hand-drawn">
                              <img src={archetype.symbolUpsell.image} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" alt={archetype.symbolUpsell.name} />
                           </div>
                           <h4 className="font-serif text-base text-clay-600 italic mb-1">{archetype.symbolUpsell.name}</h4>
                           <p className="text-xs text-clay-400 leading-relaxed">{archetype.symbolUpsell.description}</p>
                        </a>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* ANALYSIS CONTENT */}
         <section className="py-16 px-6 max-w-2xl mx-auto relative z-10">
            {/* Insight 1 */}
            <div className="mb-14">
               <div className="flex items-center gap-3 mb-6">
                  <span className="font-serif text-3xl text-sand-400">I.</span>
                  <h3 className="font-serif text-2xl text-clay-600 italic">the frequency</h3>
               </div>
               <div className="bg-warm-50 p-6 hand-drawn cozy-shadow">
                  {renderLongText(archetype.patternInsight)}
               </div>
            </div>

            {/* Insight 2 */}
            <div className="mb-14">
               <div className="flex items-center gap-3 mb-6">
                  <span className="font-serif text-3xl text-sand-400">II.</span>
                  <h3 className="font-serif text-2xl text-clay-600 italic">the shadow</h3>
               </div>
               <div className="bg-dusty-100/50 p-6 hand-drawn border border-dusty-200">
                  {renderLongText(archetype.blindSpot)}
               </div>
            </div>

            {/* Section III: Personality */}
            <div className="mb-14">
               <div className="flex items-center gap-3 mb-6">
                  <span className="font-serif text-3xl text-sand-400">III.</span>
                  <h3 className="font-serif text-2xl text-clay-600 italic">your personality in life</h3>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-terracotta-50 p-5 hand-drawn border border-terracotta-200">
                     <div className="flex items-center gap-2 mb-3">
                        <Heart size={16} className="text-terracotta-400" />
                        <span className="text-xs uppercase tracking-wider text-terracotta-600 font-semibold">relationships</span>
                     </div>
                     <p className="text-clay-600 text-sm leading-relaxed">{archetype.inRelationships}</p>
                  </div>

                  <div className="bg-olive-50 p-5 hand-drawn border border-olive-200">
                     <div className="flex items-center gap-2 mb-3">
                        <Briefcase size={16} className="text-olive-500" />
                        <span className="text-xs uppercase tracking-wider text-olive-600 font-semibold">at work</span>
                     </div>
                     <p className="text-clay-600 text-sm leading-relaxed">{archetype.atWork}</p>
                  </div>

                  <div className="bg-sand-100 p-5 hand-drawn border border-sand-300">
                     <div className="flex items-center gap-2 mb-3">
                        <Crown size={16} className="text-sand-500" />
                        <span className="text-xs uppercase tracking-wider text-sand-600 font-semibold">leadership</span>
                     </div>
                     <p className="text-clay-600 text-sm leading-relaxed">{archetype.leadershipStyle}</p>
                  </div>
               </div>
            </div>

            {/* Section IV: Growth */}
            <div className="mb-14">
               <div className="flex items-center gap-3 mb-6">
                  <span className="font-serif text-3xl text-sand-400">IV.</span>
                  <h3 className="font-serif text-2xl text-clay-600 italic">your growth journey</h3>
               </div>

               {/* Stress */}
               <div className="bg-terracotta-100/50 p-5 hand-drawn border border-terracotta-200 mb-6">
                  <div className="flex items-center gap-2 mb-3">
                     <AlertTriangle size={16} className="text-terracotta-500" />
                     <span className="text-xs uppercase tracking-wider text-terracotta-600 font-semibold">under stress</span>
                  </div>
                  <p className="text-clay-600 text-sm leading-relaxed">{archetype.stressResponse}</p>
               </div>

               {/* Growth Path */}
               <div>
                  <div className="flex items-center gap-2 mb-4">
                     <TrendingUp size={16} className="text-olive-500" />
                     <span className="text-xs uppercase tracking-wider text-olive-600 font-semibold">your path forward</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                     {archetype.growthPath.split(' → ').map((step, idx, arr) => {
                        const isLast = idx === arr.length - 1;
                        return (
                           <div key={idx} className={`relative p-4 hand-drawn cozy-shadow ${isLast ? 'bg-olive-100 border border-olive-200' : 'bg-warm-50 border border-warm-300'}`}>
                              <span className="text-xl font-light text-sand-400 leading-none">0{idx + 1}</span>
                              <h4 className="text-sm font-medium text-clay-600 leading-relaxed mt-2">{step}</h4>
                              {isLast && (
                                 <div className="absolute top-3 right-3 text-[9px] text-olive-500 uppercase tracking-wider font-medium">✦ destination</div>
                              )}
                           </div>
                        );
                     })}
                  </div>
               </div>
            </div>

            {/* Diagnosis */}
            <div className="text-center py-10 border-t border-b border-warm-300">
               <p className="text-xs uppercase tracking-widest text-clay-400 font-medium mb-3">current resonance</p>
               <p className="font-serif text-lg md:text-xl italic text-clay-600 leading-relaxed">
                  "your responses indicate a need for <span className="not-italic font-semibold text-terracotta-500">{result.subNeed.replace(/_/g, ' ')}</span> to restore equilibrium."
               </p>
            </div>
         </section>

         {/* MANTRA */}
         <section className="relative bg-clay-500 text-warm-50 py-20 px-6 text-center overflow-hidden">
            <div className="absolute top-10 left-10 w-32 h-32 bg-clay-400/30 blob-shape animate-blob"></div>
            <div className="absolute bottom-10 right-10 w-24 h-24 bg-terracotta-400/20 blob-shape animate-blob" style={{ animationDelay: '-3s' }}></div>

            <div className="max-w-2xl mx-auto relative z-10">
               <div className="flex items-center justify-center gap-3 mb-6">
                  <Quote className="text-warm-200/50" size={28} />
               </div>
               <h3 className="font-serif text-2xl md:text-4xl italic leading-relaxed mb-6 text-warm-50">
                  "{archetype.affirmation}"
               </h3>
               <p className="text-xs uppercase tracking-widest text-warm-200/70">daily mantra</p>
            </div>
         </section>

         {/* PRIMARY RITUAL ANCHOR */}
         <section ref={productSectionRef} className="py-20 px-6 max-w-6xl mx-auto scroll-mt-10 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

               {/* LEFT COLUMN: Main Image */}
               <div className="lg:col-span-6 lg:sticky lg:top-20">
                  <a href={recommendations.url || "#"} target="_blank" rel="noopener noreferrer" className="relative aspect-[4/5] bg-warm-200 overflow-hidden cozy-shadow group hand-drawn block">
                     <img src={recommendations.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={recommendations.name} />
                     <div className="absolute top-4 left-4 bg-warm-50/95 px-3 py-2 hand-drawn">
                        <span className="text-xs uppercase tracking-wider text-clay-600 font-semibold flex items-center gap-2">
                           <Star size={10} fill="currentColor" className="text-terracotta-400" /> primary anchor
                        </span>
                     </div>
                  </a>
               </div>

               {/* RIGHT COLUMN: Details */}
               <div className="lg:col-span-6 flex flex-col">

                  <div className="mb-10">
                     <div className="flex items-center gap-2 mb-4">
                        <div className="h-px w-10 bg-sand-400"></div>
                        <span className="text-xs uppercase tracking-widest text-clay-400 font-medium">essential recommendation</span>
                     </div>

                     <h2 className="font-serif text-4xl md:text-5xl text-clay-600 mb-4 leading-tight italic">
                        {recommendations.name}
                     </h2>

                     <div className="flex items-baseline gap-3 mb-6">
                        <span className="font-serif text-2xl text-clay-600">{recommendations.price}</span>
                        <span className="text-xs uppercase tracking-wider text-olive-600 bg-olive-100 px-2 py-1 hand-drawn">in stock</span>
                     </div>

                     <p className="text-clay-500 text-base mb-6 leading-relaxed">{recommendations.description}</p>

                     <div className="bg-warm-50 p-5 border-l-4 border-terracotta-400 mb-8 hand-drawn">
                        <p className="text-xs uppercase tracking-wider text-clay-400 font-medium mb-2">prescribed ritual</p>
                        <p className="text-sm italic text-clay-600">"{recommendations.ritual}"</p>
                     </div>

                     <a href={recommendations.url || "#"} target="_blank" rel="noopener noreferrer" className="w-full md:w-auto px-10 py-4 border-2 border-clay-500 text-clay-600 text-sm tracking-wider font-medium hover:bg-clay-500 hover:text-warm-50 transition-all flex items-center justify-center gap-3 hand-drawn">
                        discover your anchor <Plus size={14} />
                     </a>
                  </div>

                  {/* PAIRS WITH */}
                  {recommendations.upsells && recommendations.upsells.length > 0 && (
                     <div className="mb-10 pt-10 border-t border-warm-300">
                        <div className="flex items-center justify-between mb-6">
                           <span className="font-serif text-xl italic text-clay-600">perfectly pairs with</span>
                           <span className="text-xs uppercase tracking-wider text-clay-400">complete the circuit</span>
                        </div>

                        <div className="space-y-4">
                           {recommendations.upsells.map((item, idx) => (
                              <div key={idx} className="flex gap-4 items-center group cursor-pointer hover:bg-warm-50 p-2 hand-drawn transition-colors">
                                 <div className="w-16 h-16 shrink-0 bg-warm-200 overflow-hidden hand-drawn">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                 </div>
                                 <div className="flex-1">
                                    <h4 className="font-serif text-base text-clay-600 leading-tight mb-1 group-hover:text-terracotta-500 transition-colors">{item.name}</h4>
                                    <span className="text-sm text-clay-400">{item.price}</span>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  )}

                  {/* BUNDLE CARD */}
                  {recommendations.upsells && recommendations.upsells.length > 0 && (
                     <div className="relative hand-drawn overflow-hidden cozy-shadow bg-clay-500 text-warm-50">
                        <div className="p-6 md:p-8">
                           <div className="mb-6 pb-6 border-b border-clay-400/30">
                              <div className="flex items-center gap-2 mb-2">
                                 <Sparkles size={14} className="text-sand-300" />
                                 <span className="text-xs uppercase tracking-widest text-sand-200 font-medium">divine alignment set</span>
                              </div>
                              <h3 className="font-serif text-2xl md:text-3xl italic text-warm-50 mb-2">the complete ritual</h3>
                              <p className="text-warm-200 text-xs max-w-xs">
                                 includes the {recommendations.name} + {recommendations.upsells.length} harmonizers
                              </p>
                           </div>

                           <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
                              <div>
                                 <p className="text-warm-200/70 text-xs uppercase tracking-wider mb-1">total bundle value</p>
                                 <div className="flex items-baseline gap-3">
                                    <span className="text-warm-200/50 line-through text-base">${formatPrice(totalValue)}</span>
                                    <span className="font-serif text-3xl md:text-4xl text-warm-50 italic">${formatPrice(bundlePrice)}</span>
                                 </div>
                                 <div className="inline-flex items-center gap-2 mt-2 bg-warm-50/10 px-3 py-1 hand-drawn">
                                    <span className="w-2 h-2 rounded-full bg-olive-400"></span>
                                    <span className="text-xs uppercase tracking-wider text-warm-50 font-medium">save ${formatPrice(savings)} (15%)</span>
                                 </div>
                              </div>

                              <button onClick={handleClaimBundle} className="flex-1 md:flex-none bg-warm-100 hover:bg-terracotta-100 text-clay-500 px-6 py-3 uppercase tracking-wider text-xs font-semibold transition-all flex items-center justify-center gap-2 hand-drawn border-2 border-clay-500">
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
         <section className="border-t border-warm-300 py-16 text-center bg-warm-50 relative z-10">
            <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
               <button onClick={handleDownloadPDF} className="text-xs uppercase tracking-wider text-clay-400 hover:text-clay-600 transition-colors flex items-center justify-center gap-2">
                  <Download size={14} /> save report
               </button>
               <button onClick={onRetake} className="text-xs uppercase tracking-wider text-clay-400 hover:text-clay-600 transition-colors flex items-center justify-center gap-2">
                  <RefreshCw size={14} /> restart analysis
               </button>
            </div>

            {!subscribed ? (
               <div className="max-w-sm mx-auto px-6">
                  <p className="font-serif text-xl italic text-clay-600 mb-6">stay connected to your center</p>
                  <form onSubmit={handleSubscribe} className="flex bg-warm-100 p-1 hand-drawn">
                     <input
                        type="email"
                        placeholder="enter your email"
                        className="flex-1 bg-transparent outline-none text-clay-600 placeholder:text-clay-300 px-4 py-3 text-sm"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                     />
                     <button type="submit" className="text-xs uppercase tracking-wider text-warm-50 font-medium bg-clay-500 px-4 py-3 hover:bg-terracotta-400 transition-colors hand-drawn">
                        join
                     </button>
                  </form>
               </div>
            ) : (
               <p className="text-xs uppercase tracking-wider text-clay-600 animate-fade-in">welcome to the circle ✦</p>
            )}
         </section>

      </div>
   );
};

import React, { useState, useRef } from 'react';
import { QuizResult, ArchetypeID, ProductRecommendation } from '../types';
import { ARCHETYPES, PRODUCT_MATRIX } from '../constants';
import { Button } from './Button';
import { RefreshCw, Download, Quote, ArrowDown, Minus, Plus, Sparkles, Check, ArrowRight, Star, Heart, Briefcase, Crown, AlertTriangle, TrendingUp, Leaf, Compass } from 'lucide-react';
import { FloatingParticles } from './FloatingParticles';

interface ResultPageProps {
   result: QuizResult;
   onRetake: () => void;
}

export const ResultPage: React.FC<ResultPageProps> = ({ result, onRetake }) => {
   const [email, setEmail] = useState('');
   const [subscribed, setSubscribed] = useState(false);

   // Ref for the product section to scroll to
   const productSectionRef = useRef<HTMLDivElement>(null);

   const archetype = ARCHETYPES[result.archetype];
   const recommendations = PRODUCT_MATRIX[result.archetype][result.subNeed] ||
      PRODUCT_MATRIX[result.archetype]['protection'];

   // --- Price Calculation Logic ---
   const parsePrice = (priceStr: string) => parseInt(priceStr.replace(/[^0-9]/g, ''), 10);

   const mainPrice = parsePrice(recommendations.price);
   const upsellTotal = recommendations.upsells
      ? recommendations.upsells.reduce((acc, item) => acc + parsePrice(item.price), 0)
      : 0;

   const totalValue = mainPrice + upsellTotal;
   const bundlePrice = Math.floor(totalValue * 0.85); // 15% Discount
   const savings = totalValue - bundlePrice;

   const handleDownloadPDF = () => { window.print(); };

   const handleSubscribe = (e: React.FormEvent) => {
      e.preventDefault();
      if (email && email.includes('@')) setSubscribed(true);
   };

   const scrollToProduct = () => {
      productSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
   };

   const handleClaimBundle = async () => {
      try {
         // Collect all items (main product + upsells) with variant IDs
         const items = [];

         // Add main product if it has variantId
         if (recommendations.variantId) {
            items.push({
               id: recommendations.variantId,
               quantity: 1
            });
         }

         // Add all upsells that have variantId
         if (recommendations.upsells) {
            recommendations.upsells.forEach(upsell => {
               if (upsell.variantId) {
                  items.push({
                     id: upsell.variantId,
                     quantity: 1
                  });
               }
            });
         }

         // If no variant IDs found, fallback to collections page
         if (items.length === 0) {
            window.open('https://store.taichigemstone.com/collections/all', '_blank');
            return;
         }

         // Add items to cart using Shopify Ajax API
         const response = await fetch('https://store.taichigemstone.com/cart/add.js', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ items })
         });

         if (response.ok) {
            // Redirect to cart page after successful add
            window.open('https://store.taichigemstone.com/cart', '_blank');
         } else {
            // Fallback if API fails
            console.error('Failed to add to cart');
            window.open('https://store.taichigemstone.com/collections/all', '_blank');
         }
      } catch (error) {
         console.error('Error adding to cart:', error);
         // Fallback to collections page on error
         window.open('https://store.taichigemstone.com/collections/all', '_blank');
      }
   };

   const renderLongText = (text: string) => {
      return text.split('\n\n').map((paragraph, idx) => {
         const isHeader = paragraph === paragraph.toUpperCase() && paragraph.length < 80;
         if (isHeader) {
            return (
               <h4 key={idx} className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400 mt-8 mb-4 pt-4 border-t border-stone-200">
                  {paragraph}
               </h4>
            );
         }
         return (
            <p key={idx} className="text-stone-700 text-lg md:text-xl leading-loose font-reading mb-6">
               {paragraph}
            </p>
         );
      });
   };

   return (
      <div className="min-h-screen bg-stone-50 animate-fade-in font-sans selection:bg-stone-200 text-stone-900 print:bg-white pb-20">

         {/* HEADER / COVER */}
         <section className="relative pt-32 pb-24 px-6 bg-stone-50 text-center overflow-hidden">
            {/* Cosmic Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-cosmic-indigo/[0.03] via-cosmic-ethereal/[0.05] to-transparent pointer-events-none"></div>

            {/* Animated Floating Particles */}
            <FloatingParticles intensity="medium" />

            {/* Archetype-specific gradient */}
            <div className={`absolute inset-0 opacity-[0.04] pointer-events-none bg-gradient-to-b ${archetype.bgGradient}`}></div>

            <div className="max-w-4xl mx-auto relative z-10">
               <div className="flex items-center justify-center gap-2 mb-6">
                  <Sparkles className="w-3 h-3 text-cosmic-gold/50 animate-twinkle" />
                  <p className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-medium">Energetic Blueprint</p>
                  <Sparkles className="w-3 h-3 text-cosmic-gold/50 animate-twinkle" style={{ animationDelay: '1s' }} />
               </div>

               <h1 className="text-6xl md:text-8xl font-serif text-stone-900 mb-6 font-light italic text-glow">
                  {archetype.name}
               </h1>

               <div className="flex items-center justify-center gap-3 mb-8">
                  <div className="w-12 h-px bg-gradient-to-r from-transparent via-cosmic-gold/30 to-transparent"></div>
                  <Sparkles className="w-2 h-2 text-cosmic-gold/40" />
                  <div className="w-12 h-px bg-gradient-to-r from-transparent via-cosmic-gold/30 to-transparent"></div>
               </div>

               <p className="text-xl md:text-2xl text-stone-600 leading-relaxed max-w-2xl mx-auto font-reading mb-10">
                  {archetype.description}
               </p>

               {/* CTA with cosmic glow */}
               <div className="flex justify-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
                  <button
                     onClick={scrollToProduct}
                     className="group flex items-center gap-4 bg-stone-900 text-stone-50 px-8 py-4 rounded-full hover:bg-cosmic-indigo transition-all duration-500 cosmic-glow hover:-translate-y-1"
                  >
                     <span className="text-xs uppercase tracking-[0.2em] font-medium">Explore Your Curated Anchor</span>
                     <ArrowDown size={16} className="animate-bounce" />
                  </button>
               </div>
            </div>
         </section>

         {/* ENERGETIC PILLARS: Meanings + Upsells */}
         <section className="relative border-y border-stone-200 bg-white py-16 md:py-24 px-6 overflow-hidden">
            {/* Subtle ethereal gradient */}
            <div className="absolute inset-0 ethereal-gradient pointer-events-none"></div>

            <div className="max-w-6xl mx-auto relative z-10">
               <div className="text-center mb-16">
                  <div className="flex items-center justify-center gap-2 mb-4">
                     <Sparkles className="w-3 h-3 text-cosmic-gold/40" />
                     <h2 className="font-serif text-3xl md:text-4xl text-stone-900 italic">Your Energetic Composition</h2>
                     <Sparkles className="w-3 h-3 text-cosmic-gold/40" />
                  </div>
                  <p className="text-stone-500 font-reading max-w-xl mx-auto">The three foundational elements that structure your reality and define your spiritual signature.</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 md:divide-x divide-stone-100">
                  {/* Chakra */}
                  <div className="flex flex-col items-center text-center px-4 md:px-8 group">
                     <span className="text-[10px] uppercase tracking-[0.25em] text-stone-500 font-semibold mb-4">Chakra Center</span>
                     <h3 className="font-serif text-3xl text-stone-900 mb-4">{archetype.chakra}</h3>
                     <p className="font-reading text-stone-600 text-base leading-relaxed mb-8 flex-grow">
                        {archetype.chakraMeaning}
                     </p>

                     {/* Integrated Upsell Card */}
                     <div className="w-full max-w-[260px] bg-stone-50 p-6 mt-8 rounded-sm border border-stone-100 shadow-sm group/card hover:shadow-md transition-all duration-500 flex flex-col items-center">
                        <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-4 text-center">Harmonizing Tool</p>
                        <div className="aspect-square w-full bg-white relative overflow-hidden mb-4 rounded-sm">
                           <img
                              src={archetype.chakraUpsell.image}
                              className="w-full h-full object-cover opacity-90 group-hover/card:opacity-100 group-hover/card:scale-105 transition-all duration-1000"
                              alt={archetype.chakraUpsell.name}
                           />
                        </div>
                        <h4 className="font-serif text-lg italic text-stone-900 text-center mb-2">{archetype.chakraUpsell.name}</h4>
                        <p className="text-xs text-stone-500 font-reading leading-relaxed text-center mb-4">{archetype.chakraUpsell.description}</p>
                        <a href={archetype.chakraUpsell.url || "https://store.taichigemstone.com/"} target="_blank" rel="noopener noreferrer" className="w-full py-2 border border-stone-200 text-[10px] uppercase tracking-widest hover:bg-stone-900 hover:text-white transition-colors text-center block">Explore</a>
                     </div>
                  </div>

                  {/* Element */}
                  <div className="flex flex-col items-center text-center px-4 md:px-8 group">
                     <span className="text-[10px] uppercase tracking-[0.25em] text-stone-500 font-semibold mb-4">Ruling Element</span>
                     <h3 className="font-serif text-3xl text-stone-900 mb-4">{archetype.element}</h3>
                     <p className="font-reading text-stone-600 text-base leading-relaxed mb-8 flex-grow">
                        {archetype.elementMeaning}
                     </p>

                     {/* Integrated Upsell Card */}
                     <div className="w-full max-w-[260px] bg-stone-50 p-6 mt-8 rounded-sm border border-stone-100 shadow-sm group/card hover:shadow-md transition-all duration-500 flex flex-col items-center">
                        <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-4 text-center">Elemental Tool</p>
                        <div className="aspect-square w-full bg-white relative overflow-hidden mb-4 rounded-sm">
                           <img
                              src={archetype.elementUpsell.image}
                              className="w-full h-full object-cover opacity-90 group-hover/card:opacity-100 group-hover/card:scale-105 transition-all duration-1000"
                              alt={archetype.elementUpsell.name}
                           />
                        </div>
                        <h4 className="font-serif text-lg italic text-stone-900 text-center mb-2">{archetype.elementUpsell.name}</h4>
                        <p className="text-xs text-stone-500 font-reading leading-relaxed text-center mb-4">{archetype.elementUpsell.description}</p>
                        <a href={archetype.elementUpsell.url || "https://store.taichigemstone.com/"} target="_blank" rel="noopener noreferrer" className="w-full py-2 border border-stone-200 text-[10px] uppercase tracking-widest hover:bg-stone-900 hover:text-white transition-colors text-center block">Explore</a>
                     </div>
                  </div>

                  {/* Symbol */}
                  <div className="flex flex-col items-center text-center px-4 md:px-8 group">
                     <span className="text-[10px] uppercase tracking-[0.25em] text-stone-500 font-semibold mb-4">Archetypal Symbol</span>
                     <h3 className="font-serif text-3xl text-stone-900 mb-4">{archetype.symbol}</h3>
                     <p className="font-reading text-stone-600 text-base leading-relaxed mb-8 flex-grow">
                        {archetype.symbolMeaning}
                     </p>

                     {/* Integrated Upsell Card */}
                     <div className="w-full max-w-[260px] bg-stone-50 p-6 mt-8 rounded-sm border border-stone-100 shadow-sm group/card hover:shadow-md transition-all duration-500 flex flex-col items-center">
                        <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-4 text-center">Symbolic Totem</p>
                        <div className="aspect-square w-full bg-white relative overflow-hidden mb-4 rounded-sm">
                           <img
                              src={archetype.symbolUpsell.image}
                              className="w-full h-full object-cover opacity-90 group-hover/card:opacity-100 group-hover/card:scale-105 transition-all duration-1000"
                              alt={archetype.symbolUpsell.name}
                           />
                        </div>
                        <h4 className="font-serif text-lg italic text-stone-900 text-center mb-2">{archetype.symbolUpsell.name}</h4>
                        <p className="text-xs text-stone-500 font-reading leading-relaxed text-center mb-4">{archetype.symbolUpsell.description}</p>
                        <a href={archetype.symbolUpsell.url || "https://store.taichigemstone.com/"} target="_blank" rel="noopener noreferrer" className="w-full py-2 border border-stone-200 text-[10px] uppercase tracking-widest hover:bg-stone-900 hover:text-white transition-colors text-center block">Explore</a>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* ANALYSIS CONTENT */}
         <section className="py-20 px-6 max-w-3xl mx-auto">
            {/* Insight 1 */}
            <div className="mb-16">
               <div className="flex items-center gap-4 mb-8">
                  <span className="font-serif text-4xl text-stone-300">I.</span>
                  <h3 className="font-serif text-3xl text-stone-900 italic">The Frequency</h3>
               </div>
               <div className="pl-0 md:pl-12">
                  {renderLongText(archetype.patternInsight)}
               </div>
            </div>

            {/* Insight 2 */}
            <div className="mb-16">
               <div className="flex items-center gap-4 mb-8">
                  <span className="font-serif text-4xl text-stone-300">II.</span>
                  <h3 className="font-serif text-3xl text-stone-900 italic">The Shadow</h3>
               </div>
               <div className="pl-0 md:pl-12 bg-stone-100/50 p-8 rounded-sm border border-stone-100">
                  {renderLongText(archetype.blindSpot)}
               </div>
            </div>

            {/* Section III: Your Personality in Life */}
            <div className="mb-16">
               <div className="flex items-center gap-4 mb-8">
                  <span className="font-serif text-4xl text-stone-300">III.</span>
                  <h3 className="font-serif text-3xl text-stone-900 italic">Your Personality in Life</h3>
               </div>
               <div className="pl-0 md:pl-12">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     {/* Relationships */}
                     <div className="bg-rose-50/50 p-6 rounded-sm border border-rose-100">
                        <div className="flex items-center gap-2 mb-4">
                           <Heart size={18} className="text-rose-400" />
                           <span className="text-[10px] uppercase tracking-[0.2em] text-rose-600 font-bold">Relationships</span>
                        </div>
                        <p className="text-stone-700 text-base leading-relaxed font-reading">
                           {archetype.inRelationships}
                        </p>
                     </div>

                     {/* At Work */}
                     <div className="bg-blue-50/50 p-6 rounded-sm border border-blue-100">
                        <div className="flex items-center gap-2 mb-4">
                           <Briefcase size={18} className="text-blue-400" />
                           <span className="text-[10px] uppercase tracking-[0.2em] text-blue-600 font-bold">At Work</span>
                        </div>
                        <p className="text-stone-700 text-base leading-relaxed font-reading">
                           {archetype.atWork}
                        </p>
                     </div>

                     {/* Leadership */}
                     <div className="bg-amber-50/50 p-6 rounded-sm border border-amber-100">
                        <div className="flex items-center gap-2 mb-4">
                           <Crown size={18} className="text-amber-500" />
                           <span className="text-[10px] uppercase tracking-[0.2em] text-amber-600 font-bold">Leadership</span>
                        </div>
                        <p className="text-stone-700 text-base leading-relaxed font-reading">
                           {archetype.leadershipStyle}
                        </p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Section IV: Your Growth Journey */}
            <div className="mb-16">
               <div className="flex items-center gap-4 mb-8">
                  <span className="font-serif text-4xl text-stone-300">IV.</span>
                  <h3 className="font-serif text-3xl text-stone-900 italic">Your Growth Journey</h3>
               </div>
               <div className="pl-0 md:pl-12">
                  {/* Stress Response */}
                  <div className="bg-orange-50 p-6 rounded-sm border border-orange-200 mb-8">
                     <div className="flex items-center gap-2 mb-4">
                        <AlertTriangle size={18} className="text-orange-500" />
                        <span className="text-[10px] uppercase tracking-[0.2em] text-orange-700 font-bold">Under Stress</span>
                     </div>
                     <p className="text-stone-700 text-base leading-relaxed font-reading">
                        {archetype.stressResponse}
                     </p>
                  </div>

                  {/* Growth Path - Energetic Card Grid */}
                  <div className="mt-8">
                     <div className="flex items-center gap-2 mb-6">
                        <TrendingUp size={18} className="text-sage-600" />
                        <span className="text-[10px] uppercase tracking-[0.2em] text-sage-700 font-bold">Your Path Forward</span>
                     </div>

                     {/* Card Grid */}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {archetype.growthPath.split(' → ').map((step, idx, arr) => {
                           const isLast = idx === arr.length - 1;

                           return (
                              <div
                                 key={idx}
                                 className="relative p-4 border border-stone-200 bg-white"
                              >
                                 {/* Step Number */}
                                 <span className="text-2xl font-light text-stone-400 leading-none">
                                    0{idx + 1}
                                 </span>



                                 {/* Step Content */}
                                 <h4 className="text-base font-normal text-stone-900 leading-relaxed mt-2">
                                    {step}
                                 </h4>



                                 {/* Destination Badge for final card */}
                                 {isLast && (
                                    <div className="absolute top-3 right-3 text-[9px] text-stone-500 uppercase tracking-wider">
                                       Your Destination
                                    </div>
                                 )}
                              </div>
                           );
                        })}
                     </div>
                  </div>
               </div>
            </div>

            {/* Diagnosis */}
            <div className="text-center py-12 border-t border-b border-stone-200">
               <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500 font-medium mb-4">Current Resonance</p>
               <p className="font-reading text-xl md:text-2xl italic text-stone-800 leading-relaxed">
                  "Your responses indicate a need for <span className="not-italic font-semibold border-b border-stone-300 pb-0.5">{result.subNeed.replace(/_/g, ' ')}</span> to restore equilibrium."
               </p>
            </div>
         </section>

         {/* MANTRA - Cosmic Night */}
         <section className="relative bg-cosmic-night text-cosmic-silver py-24 px-6 text-center overflow-hidden">
            {/* Dense Floating Particles for dramatic effect */}
            <FloatingParticles intensity="dense" />

            {/* Ethereal Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-cosmic-indigo/20 via-transparent to-cosmic-nebula/20 pointer-events-none"></div>

            <div className="max-w-2xl mx-auto relative z-10">
               <div className="flex items-center justify-center gap-3 mb-8">
                  <Sparkles className="w-4 h-4 text-cosmic-gold/60 animate-twinkle" />
                  <Quote className="text-cosmic-gold/40" size={32} />
                  <Sparkles className="w-4 h-4 text-cosmic-gold/60 animate-twinkle" style={{ animationDelay: '2s' }} />
               </div>
               <h3 className="font-serif text-3xl md:text-5xl italic leading-tight mb-8 text-cosmic-silver animate-float" style={{ textShadow: '0 0 40px rgba(201, 169, 98, 0.2)' }}>
                  "{archetype.affirmation}"
               </h3>
               <div className="flex items-center justify-center gap-2">
                  <div className="w-8 h-px bg-gradient-to-r from-transparent to-cosmic-gold/30"></div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-cosmic-gold/60">Daily Mantra</p>
                  <div className="w-8 h-px bg-gradient-to-l from-transparent to-cosmic-gold/30"></div>
               </div>
            </div>
         </section>

         {/* PRIMARY RITUAL ANCHOR */}
         <section ref={productSectionRef} className="py-24 px-6 max-w-7xl mx-auto scroll-mt-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

               {/* LEFT COLUMN: Main Image (Sticky) */}
               <div className="lg:col-span-6 lg:sticky lg:top-24">
                  <div className="relative aspect-[4/5] bg-stone-100 overflow-hidden shadow-2xl shadow-stone-200/50 group rounded-sm">
                     <img
                        src={recommendations.image}
                        className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105"
                        alt={recommendations.name}
                     />
                     {/* Overlay for depth */}
                     <div className="absolute inset-0 border border-stone-900/5 pointer-events-none"></div>

                     {/* Floating 'Primary' Tag */}
                     <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 border border-stone-200">
                        <span className="text-[10px] uppercase tracking-widest text-stone-900 font-bold flex items-center gap-2">
                           <Star size={10} fill="currentColor" /> Primary Anchor
                        </span>
                     </div>
                  </div>
               </div>

               {/* RIGHT COLUMN: Details + Upsells + Bundle */}
               <div className="lg:col-span-6 flex flex-col">

                  {/* 1. MAIN PRODUCT DETAILS */}
                  <div className="mb-12">
                     <div className="flex items-center gap-3 mb-6">
                        <div className="h-px w-12 bg-stone-300"></div>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-stone-500 font-bold">Essential Recommendation</span>
                     </div>

                     <h2 className="font-serif text-5xl md:text-6xl text-stone-900 mb-4 leading-[0.9] italic">
                        {recommendations.name}
                     </h2>

                     <div className="flex items-baseline gap-4 mb-8">
                        <span className="font-serif text-3xl text-stone-900">{recommendations.price}</span>
                        <span className="text-xs uppercase tracking-widest text-green-700 bg-green-50 px-2 py-1">In Stock</span>
                     </div>

                     <p className="font-reading text-lg text-stone-600 mb-8 leading-relaxed">
                        {recommendations.description}
                     </p>

                     <div className="bg-stone-50 p-6 border-l-2 border-stone-800 mb-10">
                        <p className="text-[10px] uppercase tracking-widest text-stone-500 font-bold mb-2">Prescribed Ritual</p>
                        <p className="text-base font-reading italic text-stone-800">"{recommendations.ritual}"</p>
                     </div>

                     <a href={recommendations.url || "https://store.taichigemstone.com/"} target="_blank" rel="noopener noreferrer" className="w-full md:w-auto px-12 py-4 border border-stone-900 text-stone-900 text-xs uppercase tracking-[0.25em] hover:bg-stone-900 hover:text-stone-50 transition-all flex items-center justify-center gap-3 group">
                        Discover Your Anchor <Plus size={14} className="group-hover:rotate-90 transition-transform" />
                     </a>
                  </div>

                  {/* 2. PAIRS WITH (Integrated) */}
                  {recommendations.upsells && recommendations.upsells.length > 0 && (
                     <div className="animate-fade-in mb-12 pt-12 border-t border-stone-100">
                        <div className="flex items-center justify-between mb-8">
                           <span className="font-serif text-2xl italic text-stone-800">Perfectly Pairs With</span>
                           <span className="text-[10px] uppercase tracking-widest text-stone-400">Complete the Circuit</span>
                        </div>

                        <div className="space-y-6">
                           {recommendations.upsells.map((item, idx) => (
                              <div key={idx} className="flex gap-5 items-center group cursor-pointer hover:bg-stone-50 p-2 rounded-lg -mx-2 transition-colors">
                                 {/* Thumbnail */}
                                 <div className="w-20 h-20 shrink-0 bg-stone-200 overflow-hidden relative rounded-sm shadow-sm">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                 </div>

                                 {/* Info */}
                                 <div className="flex-1">
                                    <h4 className="font-serif text-lg text-stone-900 leading-tight mb-1 group-hover:text-stone-600 transition-colors">
                                       {item.name}
                                    </h4>
                                    <div className="flex justify-between items-center">
                                       <span className="text-sm font-reading text-stone-500">{item.price}</span>
                                       <span className="text-[10px] uppercase tracking-widest text-stone-500 font-bold opacity-0 group-hover:opacity-100 transition-opacity">View Item</span>
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  )}

                  {/* 3. HIGH CONVERSION BUNDLE CARD (Black Background) */}
                  {recommendations.upsells && recommendations.upsells.length > 0 && (
                     <div className="relative rounded-sm overflow-hidden shadow-2xl group transform hover:-translate-y-1 transition-all duration-500">

                        {/* Background - Solid Black */}
                        <div className="absolute inset-0 bg-stone-950" />

                        {/* Gradient Overlay for Depth */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-stone-900/20 to-transparent"></div>

                        <div className="relative z-10 p-8 md:p-10">
                           {/* Header */}
                           <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-6">
                              <div>
                                 <div className="flex items-center gap-2 mb-2">
                                    <Sparkles size={14} className="text-amber-300 animate-pulse" />
                                    <span className="text-[10px] uppercase tracking-[0.25em] text-amber-200 font-bold">Divine Alignment Set</span>
                                 </div>
                                 <h3 className="font-serif text-3xl md:text-4xl italic text-white mb-2">The Complete Ritual</h3>
                                 <p className="text-stone-300 font-reading text-xs md:text-sm max-w-xs">
                                    Unlock your full potential. Includes the {recommendations.name} + {recommendations.upsells.length} harmonizers.
                                 </p>
                              </div>
                           </div>

                           {/* Price & CTA */}
                           <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                              <div>
                                 <p className="text-stone-400 text-xs uppercase tracking-widest mb-1">Total Bundle Value</p>
                                 <div className="flex items-baseline gap-3">
                                    <span className="text-stone-500 line-through text-lg">${totalValue}</span>
                                    <span className="font-serif text-4xl md:text-5xl text-white italic">${bundlePrice}</span>
                                 </div>
                                 <div className="inline-flex items-center gap-2 mt-2 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                                    <span className="text-[10px] uppercase tracking-widest text-white font-bold">You Save ${savings} (15%)</span>
                                 </div>
                              </div>

                              <button onClick={handleClaimBundle} className="flex-1 md:flex-none bg-white hover:bg-amber-50 text-stone-950 px-8 py-4 uppercase tracking-[0.2em] text-xs font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center justify-center gap-3 group/btn">
                                 Claim Full Bundle <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                              </button>
                           </div>
                        </div>
                     </div>
                  )}

               </div>
            </div>
         </section>

         {/* FOOTER ACTIONS */}
         <section className="border-t border-stone-200 py-20 text-center bg-stone-50">
            <div className="flex flex-col md:flex-row justify-center gap-8 mb-16">
               <button onClick={handleDownloadPDF} className="text-xs uppercase tracking-[0.2em] text-stone-500 hover:text-stone-900 transition-colors flex items-center justify-center gap-3 group">
                  <Download size={14} className="group-hover:-translate-y-0.5 transition-transform" /> Save Report
               </button>
               <button onClick={onRetake} className="text-xs uppercase tracking-[0.2em] text-stone-500 hover:text-stone-900 transition-colors flex items-center justify-center gap-3 group">
                  <RefreshCw size={14} className="group-hover:rotate-180 transition-transform duration-500" /> Restart Analysis
               </button>
            </div>

            {!subscribed ? (
               <div className="max-w-md mx-auto px-6">
                  <p className="font-serif text-2xl italic text-stone-900 mb-8">Stay connected to your center.</p>
                  <form onSubmit={handleSubscribe} className="flex border-b border-stone-300 pb-2 focus-within:border-stone-900 transition-colors">
                     <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 bg-transparent outline-none text-stone-900 placeholder:text-stone-400 font-serif"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                     />
                     <button type="submit" className="text-xs uppercase tracking-widest text-stone-900 font-bold hover:text-stone-500 ml-4">
                        Join
                     </button>
                  </form>
               </div>
            ) : (
               <p className="text-xs uppercase tracking-widest text-stone-900 animate-fade-in">Welcome to the circle.</p>
            )}
         </section>

      </div>
   );
};
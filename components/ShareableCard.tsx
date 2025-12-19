import React from 'react';
import { ArchetypeResult, ArchetypeID } from '../types';
import { Download, Share2, Facebook, Twitter } from 'lucide-react';

interface ShareableCardProps {
    archetype: ArchetypeResult;
    zodiac?: string;
}

// Map archetype IDs to their card image paths
const CARD_IMAGES: Record<ArchetypeID, string> = {
    [ArchetypeID.Protector]: '/cards/protector-card.png',
    [ArchetypeID.Heart]: '/cards/heart-card.png',
    [ArchetypeID.Abundance]: '/cards/abundance-card.png',
    [ArchetypeID.Calm]: '/cards/calm-card.png',
    [ArchetypeID.Intuitive]: '/cards/intuitive-card.png',
};

export const ShareableCard: React.FC<ShareableCardProps> = ({ archetype }) => {
    const [isDownloading, setIsDownloading] = React.useState(false);
    const [showToast, setShowToast] = React.useState(false);
    const [toastMessage, setToastMessage] = React.useState('');

    const cardImagePath = CARD_IMAGES[archetype.id];
    const quizUrl = window.location.origin; // Root URL of the quiz

    const showNotification = (message: string) => {
        setToastMessage(message);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const handleDownload = async () => {
        setIsDownloading(true);
        try {
            const response = await fetch(cardImagePath);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.download = `${archetype.name.replace(/\s+/g, '-').toLowerCase()}-archetype.png`;
            link.href = url;

            // For better mobile support
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Delay cleanup to ensure download starts on mobile
            setTimeout(() => {
                window.URL.revokeObjectURL(url);
            }, 100);

            showNotification('✓ Image downloaded! Now you can upload it to Instagram or Facebook');
        } catch (error) {
            console.error('Failed to download image:', error);
            showNotification('Failed to download image. Please try again.');
        } finally {
            setIsDownloading(false);
        }
    };

    const handleShare = async (platform: string) => {
        const url = quizUrl;
        const text = `I discovered my energy archetype: ${archetype.name}! Take the quiz to discover yours.`;

        const shareUrls: Record<string, string> = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`,
            twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
            pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(text)}&media=${encodeURIComponent(window.location.origin + cardImagePath)}`,
            whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
        };

        if (shareUrls[platform]) {
            window.open(shareUrls[platform], '_blank', 'width=600,height=400');
        }
    };

    const handleNativeShare = async () => {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        if (isMobile && navigator.share) {
            try {
                // First, download the image for the user
                await handleDownload();

                // Small delay to let download start
                await new Promise(resolve => setTimeout(resolve, 500));

                // Check if files sharing is supported
                if (navigator.canShare) {
                    const response = await fetch(cardImagePath);
                    const blob = await response.blob();
                    const file = new File([blob], `${archetype.name}-archetype.png`, { type: 'image/png' });

                    const shareData = {
                        title: `My Energy Archetype: ${archetype.name}`,
                        text: `I discovered my energy archetype: ${archetype.name}! Take the quiz to discover yours.`,
                        url: quizUrl,
                        files: [file],
                    };

                    // Check if we can share with files
                    if (navigator.canShare(shareData)) {
                        await navigator.share(shareData);
                        return;
                    }
                }

                // Fallback: Share without file (for Instagram etc.)
                await navigator.share({
                    title: `My Energy Archetype: ${archetype.name}`,
                    text: `I discovered my energy archetype: ${archetype.name}! Take the quiz to discover yours. ${quizUrl}`,
                });

                showNotification('💡 Tip: Your image is downloaded. Upload it manually to Instagram!');
            } catch (error: any) {
                if (error.name !== 'AbortError') {
                    console.log('Share failed:', error);
                    showNotification('Image downloaded! Upload it to your social media app.');
                }
            }
        } else {
            // Desktop fallback
            try {
                await navigator.clipboard.writeText(quizUrl);
                showNotification('✓ Quiz link copied to clipboard!');
            } catch {
                showNotification('Quiz link: ' + quizUrl);
            }
        }
    };

    return (
        <div className="space-y-6">
            {/* Toast Notification */}
            {showToast && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
                    <div className="bg-cosmic-600/95 backdrop-blur-md border border-gold-400/50 rounded-xl px-6 py-4 cosmic-shadow">
                        <p className="text-white text-sm text-center max-w-xs">{toastMessage}</p>
                    </div>
                </div>
            )}

            {/* The Shareable Card Image */}
            <div className="relative w-full max-w-2xl mx-auto rounded-2xl overflow-hidden cosmic-shadow">
                <img
                    src={cardImagePath}
                    alt={`${archetype.name} Archetype Card`}
                    className="w-full h-auto"
                />
            </div>

            {/* Share Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-cosmic-600 rounded-lg transition-all duration-300 cosmic-shadow text-sm font-semibold uppercase tracking-wider disabled:opacity-50"
                >
                    <Download size={16} />
                    {isDownloading ? 'Downloading...' : 'Download Card'}
                </button>

                <button
                    onClick={handleNativeShare}
                    className="flex items-center gap-2 px-6 py-3 bg-cosmic-600/80 hover:bg-cosmic-600 text-white border border-gold-400/30 hover:border-gold-400 rounded-lg transition-all duration-300 cosmic-shadow text-sm font-semibold uppercase tracking-wider"
                >
                    <Share2 size={16} />
                    Share
                </button>

                <button
                    onClick={() => handleShare('facebook')}
                    className="flex items-center gap-2 px-4 py-3 bg-cosmic-600/80 hover:bg-cosmic-600 text-white border border-white/20 hover:border-white/40 rounded-lg transition-all duration-300 text-sm"
                    title="Share on Facebook"
                >
                    <Facebook size={16} />
                </button>

                <button
                    onClick={() => handleShare('twitter')}
                    className="flex items-center gap-2 px-4 py-3 bg-cosmic-600/80 hover:bg-cosmic-600 text-white border border-white/20 hover:border-white/40 rounded-lg transition-all duration-300 text-sm"
                    title="Share on Twitter"
                >
                    <Twitter size={16} />
                </button>

                <button
                    onClick={() => handleShare('whatsapp')}
                    className="px-4 py-3 bg-cosmic-600/80 hover:bg-cosmic-600 text-white border border-white/20 hover:border-white/40 rounded-lg transition-all duration-300 text-sm font-semibold"
                    title="Share on WhatsApp"
                >
                    WhatsApp
                </button>
            </div>

            {/* Mobile Instructions */}
            <div className="md:hidden text-center px-4">
                <div className="bg-cosmic-600/50 backdrop-blur-sm border border-gold-400/30 rounded-xl p-4">
                    <p className="text-xs text-moon-100 mb-2">📱 To share on Instagram or Facebook:</p>
                    <ol className="text-xs text-white space-y-1 text-left max-w-xs mx-auto">
                        <li>1. Tap "Download Card" to save the image</li>
                        <li>2. Open Instagram/Facebook app</li>
                        <li>3. Create a new post and upload the saved image</li>
                    </ol>
                </div>
            </div>

            {/* Quiz Link Display */}
            <div className="text-center">
                <p className="text-xs text-moon-100 mb-2">Share this quiz with friends:</p>
                <div className="flex items-center justify-center gap-2 max-w-md mx-auto">
                    <input
                        type="text"
                        value={quizUrl}
                        readOnly
                        className="flex-1 px-4 py-2 bg-cosmic-600/50 border border-white/20 rounded-lg text-white text-sm"
                    />
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(quizUrl);
                            showNotification('✓ Link copied!');
                        }}
                        className="px-4 py-2 bg-gold-500 hover:bg-gold-400 text-cosmic-600 rounded-lg text-sm font-semibold transition-all"
                    >
                        Copy
                    </button>
                </div>
            </div>
        </div>
    );
};

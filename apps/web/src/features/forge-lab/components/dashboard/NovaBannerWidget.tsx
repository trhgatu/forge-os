import React, { useEffect, useState } from "react";
import { Sparkles, Zap } from "lucide-react";
import * as quoteService from "@/features/quote/services/quoteService";
import { Quote } from "@/shared/types/quote";

export const NovaBannerWidget: React.FC = () => {
    const [quote, setQuote] = useState<Quote | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchQuote = async () => {
        setLoading(true);
        try {
            const randomQuote = await quoteService.getRandomQuote();
            if (randomQuote) {
                setQuote(randomQuote);
            }
        } catch (error) {
            console.error("Failed to fetch nova reflection", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuote();
    }, []);

    return (
        <div className="relative p-0.5 rounded-3xl bg-linear-to-r from-forge-cyan/30 via-fuchsia-500/30 to-transparent overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-forge-cyan/10 via-fuchsia-500/10 to-transparent opacity-50 blur-xl"></div>
            <div className="bg-[#09090b]/90 backdrop-blur-xl rounded-[22px] p-6 md:p-8 relative overflow-hidden">
                {/* Decorative Background */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-forge-cyan/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 text-xs font-bold text-forge-cyan uppercase tracking-widest mb-3">
                            <Sparkles size={14} /> System Reflection
                        </div>
                        {loading ? (
                            <div className="h-20 flex items-center">
                                <div className="w-full space-y-2">
                                    <div className="h-4 bg-white/5 rounded w-3/4 animate-pulse" />
                                    <div className="h-4 bg-white/5 rounded w-1/2 animate-pulse" />
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <p className="text-xl md:text-2xl text-gray-200 font-light italic leading-relaxed">
                                    &quot;{quote?.text || "The architecture is stabilizing. Continue the evolution."}&quot;
                                </p>
                                {quote?.author && (
                                    <p className="text-sm text-fuchsia-400 font-medium">
                                        — {quote.author}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                    {/* Interactive Action */}
                    <button
                        onClick={fetchQuote}
                        disabled={loading}
                        className="whitespace-nowrap px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-forge-cyan/50 transition-all text-sm font-medium text-white group flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed">
                        <Zap size={16} className="text-yellow-400 group-hover:animate-pulse" />
                        Initiate Deep Scan
                    </button>
                </div>
            </div>
        </div>
    );
};

'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { animationClasses } from '@/lib/animations';

const statements = [
  "Innovation drives progress",
  "Collaboration enhances creativity", 
  "Quality over quantity",
  "Data-driven decisions",
  "User-centered design",
  "Sustainable practices",
  "Continuous learning",
  "Effective communication",
  "Strategic thinking",
  "Adaptability is key",
  "Trust builds teams",
  "Excellence through iteration"
];

interface StatementCard {
  id: number;
  text: string;
  position: number;
  isAnimating: boolean;
}

export default function Hero() {
  const [cards, setCards] = useState<StatementCard[]>([]);
  const [isGridFormed, setIsGridFormed] = useState(false);

  useEffect(() => {
    // Initialize cards with random positions
    const initialCards = statements.map((text, index) => ({
      id: index,
      text,
      position: Math.random() * 100,
      isAnimating: false
    }));
    setCards(initialCards);

    // Animate cards into Q-sort grid formation
    const timer = setTimeout(() => {
      const sortedCards = initialCards.map((card, index) => {
        const qPositions = [-3, -2, -2, -1, -1, -1, 0, 0, 0, 1, 1, 2]; // Q-sort distribution
        return {
          ...card,
          position: qPositions[index] || 0,
          isAnimating: true
        };
      });
      setCards(sortedCards);
      setIsGridFormed(true);
    }, 1500);

    // Reset animation periodically
    const resetTimer = setInterval(() => {
      setIsGridFormed(false);
      setCards(prev => prev.map(card => ({
        ...card,
        position: Math.random() * 100 - 50,
        isAnimating: false
      })));

      setTimeout(() => {
        setCards(prev => prev.map((card, index) => {
          const qPositions = [-3, -2, -2, -1, -1, -1, 0, 0, 0, 1, 1, 2];
          return {
            ...card,
            position: qPositions[index] || 0,
            isAnimating: true
          };
        }));
        setIsGridFormed(true);
      }, 1000);
    }, 12000);

    return () => {
      clearTimeout(timer);
      clearInterval(resetTimer);
    };
  }, []);

  const getCardStyle = (card: StatementCard) => {
    if (!isGridFormed) {
      return {
        transform: `translate(${card.position * 3}px, ${Math.sin(card.position) * 20}px) rotate(${card.position * 0.5}deg)`,
        opacity: 0.7
      };
    }

    const baseX = card.position * 80;
    const baseY = Math.abs(card.position) * -20 + 40;
    
    return {
      transform: `translate(${baseX}px, ${baseY}px) rotate(0deg)`,
      opacity: 1,
      transition: 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
    };
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-teal-600/10 animate-pulse" />
      
      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <div className="mb-16">
          <h1 className={`text-6xl lg:text-8xl font-bold text-white mb-8 ${animationClasses.fadeIn}`}>
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 bg-clip-text text-transparent">
              Q Methodology
            </span>
          </h1>
          <p className="text-2xl lg:text-3xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
            Unlock the power of subjective perspectives through systematic analysis.
            Transform qualitative insights into quantitative understanding.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 text-lg font-semibold rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-white/20"
            >
              Discover Q Methodology
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="bg-transparent border-2 border-white/40 text-white px-12 py-4 text-lg font-semibold rounded-full backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
            >
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Q-Sort Grid Animation */}
        <div className="relative max-w-4xl mx-auto">
          <div className="text-white/70 text-lg mb-8">
            Watch statements organize into Q methodology&apos;s signature distribution
          </div>
          
          <div className="relative h-80 flex items-center justify-center">
            {/* Grid lines */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="grid grid-cols-7 gap-4 opacity-20">
                {Array.from({ length: 35 }).map((_, i) => (
                  <div key={i} className="w-16 h-10 border border-white/30 rounded" />
                ))}
              </div>
            </div>

            {/* Animated statement cards */}
            <div className="relative">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className="absolute bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-3 text-sm text-white font-medium shadow-lg hover:bg-white/20 transition-all duration-300 cursor-pointer w-32 h-16 flex items-center justify-center text-center"
                  style={getCardStyle(card)}
                >
                  {card.text}
                </div>
              ))}
            </div>
          </div>

          {/* Distribution labels */}
          {isGridFormed && (
            <div className="flex justify-center mt-8 space-x-8 text-white/60 text-sm">
              <span className={animationClasses.fadeIn}>Strongly Disagree</span>
              <span className={animationClasses.fadeIn} style={{ animationDelay: '0.2s' }}>Neutral</span>
              <span className={animationClasses.fadeIn} style={{ animationDelay: '0.4s' }}>Strongly Agree</span>
            </div>
          )}
        </div>

        {/* Feature highlights */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              title: "Systematic Analysis",
              description: "Transform subjective opinions into structured data through forced distribution sorting",
              delay: "0s"
            },
            {
              title: "Factor Analysis",
              description: "Discover underlying patterns and shared viewpoints within your research population",
              delay: "0.2s"
            },
            {
              title: "Rich Insights",
              description: "Generate profound understanding of complex topics through perspective analysis",
              delay: "0.4s"
            }
          ].map((feature, index) => (
            <div 
              key={index} 
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl"
              style={{ animationDelay: feature.delay }}
            >
              <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-blue-100/80 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-teal-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
    </section>
  );
}
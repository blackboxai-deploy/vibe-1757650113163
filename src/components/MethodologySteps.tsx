'use client';

import { useState, useEffect, useRef } from 'react';
import { animationClasses } from '@/lib/animations';

const steps = [
  {
    number: 1,
    title: "Define Research Question",
    description: "Identify the subjective topic you want to explore and establish clear research objectives.",
    visual: "research-question",
    color: "from-blue-500 to-cyan-500"
  },
  {
    number: 2,
    title: "Develop Q-Sample",
    description: "Create a comprehensive set of statements representing different viewpoints on your topic.",
    visual: "statements",
    color: "from-purple-500 to-pink-500"
  },
  {
    number: 3,
    title: "Select Participants",
    description: "Choose participants who represent different perspectives relevant to your research question.",
    visual: "participants",
    color: "from-green-500 to-teal-500"
  },
  {
    number: 4,
    title: "Q-Sorting Process",
    description: "Participants sort statements into a forced distribution grid based on their agreement level.",
    visual: "sorting",
    color: "from-orange-500 to-red-500"
  },
  {
    number: 5,
    title: "Factor Analysis",
    description: "Analyze patterns in the Q-sorts to identify distinct viewpoints and shared perspectives.",
    visual: "analysis",
    color: "from-indigo-500 to-purple-500"
  },
  {
    number: 6,
    title: "Interpretation",
    description: "Transform statistical results into meaningful insights about different perspectives.",
    visual: "insights",
    color: "from-teal-500 to-blue-500"
  }
];

export default function MethodologySteps() {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!autoPlay || !isVisible) return;

    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [autoPlay, isVisible]);

  const getVisualComponent = (visual: string, color: string, isActive: boolean) => {
    const baseClasses = `w-full h-48 rounded-2xl bg-gradient-to-br ${color} transition-all duration-700 flex items-center justify-center overflow-hidden relative`;
    const activeClasses = isActive ? 'scale-105 shadow-2xl' : 'scale-100 shadow-lg opacity-70';

    switch (visual) {
      case 'research-question':
        return (
          <div className={`${baseClasses} ${activeClasses}`}>
            <div className="text-white text-6xl animate-pulse">?</div>
            <div className="absolute inset-0 bg-white/10 animate-pulse" />
          </div>
        );
      
      case 'statements':
        return (
          <div className={`${baseClasses} ${activeClasses}`}>
            <div className="grid grid-cols-3 gap-2 p-4">
              {Array.from({ length: 9 }).map((_, i) => (
                <div 
                  key={i} 
                  className="bg-white/20 rounded-md h-8 animate-pulse"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>
        );
      
      case 'participants':
        return (
          <div className={`${baseClasses} ${activeClasses}`}>
            <div className="flex space-x-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div 
                  key={i}
                  className="w-12 h-12 bg-white/30 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        );
      
      case 'sorting':
        return (
          <div className={`${baseClasses} ${activeClasses}`}>
            <div className="grid grid-cols-5 gap-1 p-4">
              {Array.from({ length: 15 }).map((_, i) => (
                <div 
                  key={i}
                  className={`bg-white/20 rounded-sm h-6 transform transition-all duration-1000 ${
                    isActive ? 'translate-y-0' : `translate-y-${(i % 3) * 2 + 2}`
                  }`}
                  style={{ 
                    animationDelay: `${i * 0.05}s`,
                    height: `${20 + (2 - Math.abs(i % 5 - 2)) * 8}px`
                  }}
                />
              ))}
            </div>
          </div>
        );
      
      case 'analysis':
        return (
          <div className={`${baseClasses} ${activeClasses}`}>
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 border-4 border-white/30 rounded-full animate-spin" />
              <div className="absolute inset-4 border-4 border-white/50 rounded-full animate-spin" style={{ animationDirection: 'reverse' }} />
              <div className="absolute inset-8 border-4 border-white/70 rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
                AI
              </div>
            </div>
          </div>
        );
      
      case 'insights':
        return (
          <div className={`${baseClasses} ${activeClasses}`}>
            <div className="relative">
              <div className="text-white text-4xl font-bold animate-pulse">IDEA</div>
              <div className="absolute -top-2 -left-2 w-16 h-16 border-2 border-white/30 rounded-full animate-ping" />
              <div className="absolute -top-4 -left-4 w-20 h-20 border-2 border-white/20 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>
        );
      
      default:
        return (
          <div className={`${baseClasses} ${activeClasses}`}>
            <div className="text-white text-2xl font-bold">{visual}</div>
          </div>
        );
    }
  };

  return (
    <section ref={containerRef} className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-5xl lg:text-6xl font-bold text-slate-900 mb-8 ${isVisible ? animationClasses.fadeIn : 'opacity-0'}`}>
            How Q Methodology
            <span className="block text-blue-600 mt-2">Works</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Follow our systematic approach to transform subjective perspectives into 
            quantifiable insights through rigorous research methodology.
          </p>
          
          <div className="flex justify-center items-center space-x-4">
            <button
              onClick={() => setAutoPlay(!autoPlay)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300"
            >
              {autoPlay ? 'Pause' : 'Play'} Auto
            </button>
            <span className="text-slate-500">Step {activeStep + 1} of {steps.length}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Steps navigation */}
        <div className="flex justify-center mb-12 overflow-x-auto">
          <div className="flex space-x-4 px-4">
            {steps.map((step, index) => (
              <button
                key={step.number}
                onClick={() => {
                  setActiveStep(index);
                  setAutoPlay(false);
                }}
                className={`
                  flex-shrink-0 w-12 h-12 rounded-full border-2 font-bold transition-all duration-300 flex items-center justify-center
                  ${index === activeStep 
                    ? 'bg-blue-600 text-white border-blue-600 scale-110 shadow-lg' 
                    : index < activeStep
                      ? 'bg-green-500 text-white border-green-500'
                      : 'bg-white text-slate-400 border-slate-300 hover:border-blue-400'
                  }
                `}
              >
                {index < activeStep ? '✓' : step.number}
              </button>
            ))}
          </div>
        </div>

        {/* Active step content */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Visual */}
            <div className="order-2 lg:order-1">
              {getVisualComponent(steps[activeStep].visual, steps[activeStep].color, true)}
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2 space-y-6">
              <div className="flex items-center space-x-4">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${steps[activeStep].color} flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                  {steps[activeStep].number}
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold text-slate-900">
                  {steps[activeStep].title}
                </h3>
              </div>
              
              <p className="text-lg text-slate-600 leading-relaxed">
                {steps[activeStep].description}
              </p>

              {/* Step indicators */}
              <div className="flex space-x-2">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === activeStep ? 'w-8 bg-blue-600' : 'w-2 bg-slate-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* All steps overview */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-slate-900 text-center mb-12">Complete Process Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`
                  bg-white rounded-2xl p-6 border-2 transition-all duration-500 cursor-pointer transform hover:-translate-y-2 hover:shadow-2xl
                  ${index === activeStep ? 'border-blue-500 shadow-xl scale-105' : 'border-slate-200 hover:border-blue-300'}
                `}
                onClick={() => setActiveStep(index)}
              >
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white text-xl font-bold mb-4`}>
                  {step.number}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h4>
                <p className="text-slate-600 leading-relaxed text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
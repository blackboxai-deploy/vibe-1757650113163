'use client';

import { useEffect } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Hero from '@/components/Hero';
import QMethodologyDemo from '@/components/QMethodologyDemo';
import MethodologySteps from '@/components/MethodologySteps';
import Features from '@/components/Features';
import CallToAction from '@/components/CallToAction';

export default function HomePage() {
  useEffect(() => {
    // Add custom keyframes for animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
      }
      
      @keyframes slideUp {
        from { 
          opacity: 0; 
          transform: translateY(30px); 
        }
        to { 
          opacity: 1; 
          transform: translateY(0px); 
        }
      }
      
      @keyframes slideDown {
        from { 
          opacity: 0; 
          transform: translateY(-30px); 
        }
        to { 
          opacity: 1; 
          transform: translateY(0px); 
        }
      }
      
      @keyframes scaleUp {
        from { 
          opacity: 0; 
          transform: scale(0.95); 
        }
        to { 
          opacity: 1; 
          transform: scale(1); 
        }
      }
      
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes qSort {
        0% {
          transform: translateX(-100px) rotate(-10deg);
          opacity: 0;
        }
        50% {
          transform: translateX(10px) rotate(2deg);
          opacity: 0.8;
        }
        100% {
          transform: translateX(0px) rotate(0deg);
          opacity: 1;
        }
      }
      
      @keyframes gridForm {
        0% {
          transform: scale(0.8) rotate(5deg);
          opacity: 0;
        }
        50% {
          transform: scale(1.02) rotate(-1deg);
          opacity: 0.8;
        }
        100% {
          transform: scale(1) rotate(0deg);
          opacity: 1;
        }
      }
      
      @keyframes perspectiveShift {
        0% {
          transform: perspective(1000px) rotateX(30deg) rotateY(-10deg);
          opacity: 0;
        }
        50% {
          transform: perspective(1000px) rotateX(-5deg) rotateY(5deg);
          opacity: 0.7;
        }
        100% {
          transform: perspective(1000px) rotateX(0deg) rotateY(0deg);
          opacity: 1;
        }
      }
      
      /* Custom scrollbar */
      ::-webkit-scrollbar {
        width: 8px;
      }
      
      ::-webkit-scrollbar-track {
        background: #f1f5f9;
      }
      
      ::-webkit-scrollbar-thumb {
        background: linear-gradient(45deg, #3b82f6, #8b5cf6);
        border-radius: 4px;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(45deg, #2563eb, #7c3aed);
      }
      
      /* Smooth focus transitions */
      button:focus,
      input:focus,
      textarea:focus {
        outline: 2px solid #3b82f6;
        outline-offset: 2px;
        transition: outline 0.2s ease-in-out;
      }
      
      /* Enhanced hover effects */
      .hover-lift {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .hover-lift:hover {
        transform: translateY(-4px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      }
      
      /* Glassmorphism effects */
      .glass {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
      
      /* Performance optimizations */
      * {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      
      img {
        image-rendering: -webkit-optimize-contrast;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Animated particle background */}
      <AnimatedBackground />
      
      {/* Page sections */}
      <Hero />
      <QMethodologyDemo />
      <MethodologySteps />
      <Features />
      <CallToAction />
      
      {/* Floating scroll indicator */}
      <div className="fixed bottom-8 right-8 z-50 hidden lg:block">
        <div className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 cursor-pointer group">
          <div className="w-6 h-6 flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce group-hover:animate-ping" />
          </div>
        </div>
      </div>
    </main>
  );
}
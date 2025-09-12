'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function CallToAction() {
  const [email, setEmail] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubmitted(true);
      // Here you would typically handle the email submission
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section ref={containerRef} className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl animate-spin" style={{ animationDuration: '60s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <div className={`
          transition-all duration-1000 transform
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
        `}>
          <h2 className="text-5xl lg:text-7xl font-bold text-white mb-8">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 bg-clip-text text-transparent">
              Start Your Q Methodology
            </span>
            <span className="block text-white mt-2">Journey Today</span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-12">
            Join the growing community of researchers discovering profound insights through Q methodology. 
            Transform how you understand subjective perspectives with our comprehensive platform.
          </p>
        </div>

        {/* Stats section */}
        <div className={`
          grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 transition-all duration-1000 transform
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
        `} style={{ transitionDelay: '0.2s' }}>
          {[
            { number: "10,000+", label: "Researchers Worldwide", icon: "👥" },
            { number: "500+", label: "Research Projects", icon: "📊" },
            { number: "50+", label: "Countries", icon: "🌍" }
          ].map((stat, index) => (
            <div 
              key={index} 
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2"
              style={{ transitionDelay: `${0.1 * index}s` }}
            >
              <div className="text-4xl mb-4">{stat.icon}</div>
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-blue-200 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Email signup form */}
        <div className={`
          max-w-2xl mx-auto transition-all duration-1000 transform
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
        `} style={{ transitionDelay: '0.4s' }}>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 lg:p-12 mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6">
              Get Started with a Free Account
            </h3>
            <p className="text-blue-100 mb-8">
              Create your free account today and explore the full potential of Q methodology research.
            </p>
            
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/90 border-white/20 text-slate-900 placeholder-slate-500 rounded-full px-6 py-4 text-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  required
                />
                <Button 
                  type="submit"
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl transition-all duration-300 transform hover:scale-105 border-0"
                >
                  Start Free Trial
                </Button>
              </form>
            ) : (
              <div className="bg-green-500/20 border border-green-400/30 rounded-2xl p-6 max-w-lg mx-auto">
                <div className="text-green-300 text-xl font-bold mb-2">Thank You!</div>
                <div className="text-green-200">We&apos;ll be in touch soon with your free account details.</div>
              </div>
            )}
            
            <p className="text-blue-200/80 text-sm mt-6">
              No credit card required • Free 30-day trial • Cancel anytime
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className={`
          flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-1000 transform
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
        `} style={{ transitionDelay: '0.6s' }}>
          <Button 
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-50 px-12 py-4 text-xl font-bold rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 border-0"
          >
            Watch Demo Video
          </Button>
          <Button 
            variant="outline"
            size="lg"
            className="bg-transparent border-2 border-white/40 text-white hover:bg-white hover:text-blue-600 px-12 py-4 text-xl font-bold rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-105"
          >
            Download Brochure
          </Button>
        </div>

        {/* Trust indicators */}
        <div className={`
          mt-16 transition-all duration-1000 transform
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
        `} style={{ transitionDelay: '0.8s' }}>
          <p className="text-blue-200/60 text-sm mb-8">Trusted by leading institutions worldwide</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto opacity-60">
            {[
              "University Research Labs",
              "Fortune 500 Companies", 
              "Government Agencies",
              "Healthcare Organizations"
            ].map((org, index) => (
              <div key={index} className="bg-white/5 rounded-xl p-4 text-blue-200 text-sm font-medium">
                {org}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
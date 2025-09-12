'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    title: "Advanced Analytics",
    description: "Powerful statistical analysis tools including factor analysis, correlation matrices, and significance testing to uncover hidden patterns in subjective data.",
    details: [
      "Principal Component Analysis (PCA)",
      "Factor rotation and interpretation",
      "Statistical significance testing",
      "Correlation analysis"
    ],
    image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d3282f18-d6dd-4f99-af85-b8d1083e0125.png",
    color: "from-blue-600 to-purple-600"
  },
  {
    title: "Interactive Q-Sorts",
    description: "Intuitive drag-and-drop interface for participants to sort statements according to their perspectives, with customizable grid configurations.",
    details: [
      "Drag-and-drop sorting interface",
      "Customizable grid layouts",
      "Real-time validation",
      "Mobile-responsive design"
    ],
    image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/997bc87c-187d-4a07-bfda-2bd7339b0f21.png",
    color: "from-green-600 to-teal-600"
  },
  {
    title: "Comprehensive Reporting",
    description: "Generate detailed reports with visualizations, factor interpretations, and participant insights to share your findings effectively.",
    details: [
      "Automated report generation",
      "Interactive data visualizations",
      "Export to multiple formats",
      "Customizable templates"
    ],
    image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/dcdea344-bfce-4c6d-afb1-fca4621cc2c7.png",
    color: "from-orange-600 to-red-600"
  },
  {
    title: "Collaborative Research",
    description: "Enable team collaboration with shared projects, real-time updates, and role-based access control for large-scale research initiatives.",
    details: [
      "Multi-user collaboration",
      "Real-time synchronization",
      "Role-based permissions",
      "Project management tools"
    ],
    image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d6387e98-3411-4c57-9652-1d01cf030043.png",
    color: "from-indigo-600 to-purple-600"
  },
  {
    title: "Data Security",
    description: "Enterprise-grade security with encrypted data storage, secure participant access, and compliance with research ethics standards.",
    details: [
      "End-to-end encryption",
      "GDPR compliance",
      "Secure participant portals",
      "Audit trails and logging"
    ],
    image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3f06a473-3b83-47de-a2a3-20e7d6a4ceed.png",
    color: "from-slate-600 to-blue-600"
  },
  {
    title: "Scalable Platform",
    description: "Handle projects of any size, from small academic studies to large organizational assessments, with cloud-based infrastructure.",
    details: [
      "Cloud-based architecture",
      "Unlimited participants",
      "High availability",
      "Performance optimization"
    ],
    image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8f285ea1-74ba-448b-8b81-59e0437d313a.png",
    color: "from-cyan-600 to-blue-600"
  }
];

export default function Features() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardIndex = parseInt(entry.target.getAttribute('data-card') || '0');
            setVisibleCards((prev) => 
              prev.includes(cardIndex) ? prev : [...prev, cardIndex].sort((a, b) => a - b)
            );
          }
        });
      },
      { threshold: 0.2, rootMargin: '50px' }
    );

    const cards = containerRef.current?.querySelectorAll('.feature-card');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={containerRef} className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl font-bold text-slate-900 mb-8">
            Powerful Features for
            <span className="block text-blue-600 mt-2">Modern Research</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Everything you need to conduct sophisticated Q methodology research, 
            from data collection to final insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const isVisible = visibleCards.includes(index);
            const isHovered = hoveredCard === index;
            
            return (
              <div
                key={index}
                data-card={index}
                className={`
                  feature-card group relative overflow-hidden transition-all duration-700 transform
                  ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
                  ${isHovered ? 'scale-105 z-10' : 'scale-100'}
                `}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <Card className="h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm">
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      width={600}
                      height={400}
                      className={`
                        w-full h-48 object-cover transition-all duration-700 group-hover:scale-110
                        ${isHovered ? 'brightness-110' : 'brightness-100'}
                      `}
                      priority={index < 3}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-tr ${feature.color} opacity-20 group-hover:opacity-30 transition-all duration-500`} />
                    
                    {/* Floating icon */}
                    <div className={`
                      absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-r ${feature.color} 
                      flex items-center justify-center text-white font-bold text-xl shadow-lg
                      transform transition-all duration-500
                      ${isHovered ? 'scale-110 rotate-12' : 'scale-100 rotate-0'}
                    `}>
                      {index + 1}
                    </div>
                  </div>

                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-slate-600 leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    {/* Feature details - revealed on hover */}
                    <div className={`
                      overflow-hidden transition-all duration-500 ease-in-out
                      ${isHovered ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}
                    `}>
                      <div className="pt-4 border-t border-slate-200">
                        <h4 className="font-semibold text-slate-800 mb-3">Key Features:</h4>
                        <ul className="space-y-2">
                          {feature.details.map((detail, detailIndex) => (
                            <li 
                              key={detailIndex} 
                              className={`
                                text-sm text-slate-600 flex items-center transition-all duration-300
                                ${isHovered ? 'translate-x-0' : 'translate-x-4'}
                              `}
                              style={{ transitionDelay: `${detailIndex * 50}ms` }}
                            >
                              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Action hint */}
                    <div className={`
                      mt-4 text-center transition-all duration-300
                      ${isHovered ? 'opacity-0 transform translate-y-2' : 'opacity-100 transform translate-y-0'}
                    `}>
                      <span className="text-xs text-slate-400 font-medium">Hover for details</span>
                    </div>
                  </CardContent>

                  {/* Animated border gradient */}
                  <div className={`
                    absolute inset-0 rounded-lg bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-100 transition-all duration-500
                    before:absolute before:inset-0.5 before:bg-white before:rounded-lg before:content-['']
                  `} />
                </Card>
              </div>
            );
          })}
        </div>

        {/* Call to action section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 shadow-2xl">
            <h3 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Research?
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of researchers who have already discovered the power of Q methodology 
              for understanding complex subjective perspectives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Start Free Trial
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
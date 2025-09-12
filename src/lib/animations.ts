// Animation utilities and configurations for Q methodology landing page

export const fadeInUp = {
  initial: { opacity: 0, transform: 'translateY(30px)' },
  animate: { opacity: 1, transform: 'translateY(0px)' },
  transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
};

export const fadeInLeft = {
  initial: { opacity: 0, transform: 'translateX(-30px)' },
  animate: { opacity: 1, transform: 'translateX(0px)' },
  transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
};

export const fadeInRight = {
  initial: { opacity: 0, transform: 'translateX(30px)' },
  animate: { opacity: 1, transform: 'translateX(0px)' },
  transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
};

export const scaleIn = {
  initial: { opacity: 0, transform: 'scale(0.95)' },
  animate: { opacity: 1, transform: 'scale(1)' },
  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
};

export const staggerChildren = (delay = 0.1) => ({
  animate: {
    transition: {
      staggerChildren: delay
    }
  }
});

// Q methodology inspired animations
export const qGridAnimation = {
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
    gap: '8px',
    maxWidth: '600px'
  },
  card: {
    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
    transformStyle: 'preserve-3d' as const
  }
};

export const sortingAnimation = {
  drag: {
    scale: 1.05,
    rotate: '2deg',
    zIndex: 1000,
    boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
  },
  drop: {
    scale: 1,
    rotate: '0deg',
    zIndex: 1,
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  }
};

// Intersection Observer utility for scroll animations
export const useScrollAnimation = () => {
  const observeElements = (callback: (entries: IntersectionObserverEntry[]) => void) => {
    if (typeof window === 'undefined') return null;
    
    const observer = new IntersectionObserver(
      callback,
      {
        threshold: 0.1,
        rootMargin: '50px 0px -50px 0px'
      }
    );
    
    return observer;
  };
  
  return { observeElements };
};

// Particle animation configurations
export const particleConfig = {
  count: 50,
  speed: 0.5,
  size: { min: 1, max: 3 },
  opacity: { min: 0.1, max: 0.6 },
  colors: ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981']
};

// CSS animation classes (to be used with Tailwind)
export const animationClasses = {
  float: 'animate-pulse',
  bounce: 'animate-bounce',
  spin: 'animate-spin',
  ping: 'animate-ping',
  pulse: 'animate-pulse',
  
  // Custom animations
  floatSlow: 'animate-[float_6s_ease-in-out_infinite]',
  slideUp: 'animate-[slideUp_0.6s_ease-out]',
  slideDown: 'animate-[slideDown_0.6s_ease-out]',
  scaleUp: 'animate-[scaleUp_0.5s_ease-out]',
  fadeIn: 'animate-[fadeIn_0.8s_ease-out]',
  
  // Q methodology specific
  qSort: 'animate-[qSort_1.2s_cubic-bezier(0.4,0,0.2,1)]',
  gridForm: 'animate-[gridForm_2s_ease-in-out]',
  perspectiveShift: 'animate-[perspectiveShift_1.5s_ease-in-out]'
};

// Timing functions
export const easings = {
  easeOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
};
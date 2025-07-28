import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const HeroBanner = () => {
  const shineRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const shineElement = shineRef.current;
    
    if (!shineElement) return;
    
    // Add a subtle animation to the shine effect
    const animateShine = () => {
      const shine = document.createElement('div');
      shine.classList.add('absolute', 'inset-0', 'bg-gradient-to-r', 'from-transparent', 'via-white/10', 'to-transparent', 'opacity-0');
      shineElement.appendChild(shine);
      
      // Animate the shine effect
      let start: number | null = null;
      
      const animate = (timestamp: number) => {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / 1000, 1);
        
        shine.style.opacity = `${Math.sin(progress * Math.PI) * 0.2}`;
        shine.style.transform = `translateX(${(progress - 0.5) * 200}%)`;
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          shine.remove();
        }
      };
      
      requestAnimationFrame(animate);
    };
    
    const interval = setInterval(animateShine, 3000);
    
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative w-full bg-gray-900 overflow-hidden rounded-lg">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute right-0 bottom-0 opacity-40">
          {Array.from({ length: 5 }).map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1 bg-brand-orange rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `pulse-gentle ${2 + Math.random() * 3}s infinite`
              }}
            />
          ))}
        </div>
        
        {/* Circular burst effect */}
        <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72">
          <div className="absolute inset-0 border-2 border-brand-orange/30 rounded-full animate-rotate-shine"></div>
          <div className="absolute inset-2 border border-brand-orange/20 rounded-full animate-rotate-shine" style={{ animationDuration: '25s', animationDirection: 'reverse' }}></div>
          <div className="absolute inset-4 border border-brand-orange/10 rounded-full animate-rotate-shine" style={{ animationDuration: '30s' }}></div>
        </div>
        
        {/* Dots pattern */}
        <div className="absolute bottom-4 left-16 grid grid-cols-3 gap-1.5 opacity-60">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-brand-orange rounded-full"></div>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-between px-8 py-12 md:py-16">
        {/* Product Image */}
        <div className="mb-8 md:mb-0 md:mr-8 relative z-10">
          <div className="relative">
            <div className="absolute -top-4 -left-4 bg-brand-orange text-white rounded-full py-1 px-3 font-bold text-sm shadow-lg animate-pulse-gentle">
              50% OFF
            </div>
            
            <div className="relative w-64 h-64 bg-white rounded-full overflow-hidden shadow-2xl flex items-center justify-center">
              <div ref={shineRef} className="absolute inset-0 overflow-hidden rounded-full">
                {/* Shine effect container */}
              </div>
              <img 
                src='https://images.unsplash.com/photo-1581091226825-a6a2a5aee158'
                alt="Running Shoes" 
                className="object-contain w-56 h-56 animate-float"
              />
            </div>
            
            <div className="absolute bottom-0 left-0 w-full flex justify-center">
              <div className="w-12 h-1 bg-brand-orange opacity-75 blur-sm"></div>
            </div>
          </div>
        </div>
        
        {/* Text Content */}
        <div className="text-white text-center md:text-left md:max-w-md z-10">
          <div className="mb-2 inline-block bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-xs uppercase tracking-wider">
            New Collection
          </div>
          
          <h1 className="text-5xl font-extrabold mb-2 tracking-tight">
            <span className="block text-right md:text-left opacity-80 text-3xl italic font-light mb-1">New Collection</span>
            <span className="text-brand-orange text-6xl block">RUNNING</span>
            <span className="text-black block">SHOES</span>
          </h1>
          
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="btn-shop-now group">
              SHOP NOW
              <ArrowRight className="inline-block ml-2 transform group-hover:translate-x-1 transition-transform" size={16} />
            </button>
            
            <div className="flex items-center text-sm text-white/80">
              <span className="mr-2">Contact:</span>
              <a href="tel:+1001234567" className="hover:text-white transition-colors">+100 123 456 789</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;

import { motion } from 'framer-motion';

const HeroAnimation = ({ visible }: { visible: boolean }) => {
    const fadeIn = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    };
  
    // Tech stack categories réorganisées selon l'ordre souhaité
    const techStack = [
      { name: 'Frontend', icon: '🌐', color: 'rgba(249, 115, 22, 0.8)' },
      { name: 'Mobile', icon: '📱', color: 'rgba(249, 115, 22, 0.8)' },
      { name: 'Backend', icon: '⚙️', color: 'rgba(249, 115, 22, 0.7)' },
      { name: 'Cloud', icon: '☁️', color: 'rgba(59, 130, 246, 0.7)' },
      { name: 'DevOps', icon: '🔧', color: 'rgba(59, 130, 246, 0.8)' },
      { name: 'IA', icon: '🤖', color: 'rgba(124, 58, 237, 0.7)' },
      { name: 'Data', icon: '📊', color: 'rgba(124, 58, 237, 0.8)' },
      { name: 'Design', icon: '🎨', color: 'rgba(236, 72, 153, 0.7)' },
    ];
  
    // Animation améliorée avec distribution plus précise des éléments
    const createOrbit = (index: number, totalItems: number) => {
      // Répartition optimisée des éléments sur le cercle
      const angle = (index * (360 / totalItems)) * (Math.PI / 180);
      
      // Rayon ajusté pour un meilleur espacement - Increased radius
      const baseRadius = 140; // Increased from 125
      
      // Calcul optimisé des positions x et y
      const x = Math.cos(angle) * baseRadius;
      const y = Math.sin(angle) * baseRadius;
      
      // Animation plus fluide avec amplitude adaptative - Reduced amplitude further
      const amplitude = 2; // Reduced from 4
      
      return {
        baseRadius, // Expose baseRadius for SVG
        x,
        y,
        animate: {
          x: [x, x + amplitude, x - amplitude, x],
          y: [y, y - amplitude, y + amplitude, y],
        },
        transition: {
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse" as const,
          ease: "easeInOut" as const,
          delay: index * 0.2, // Léger délai pour un effet cascade
        }
      };
    };
  
    return (
      <motion.div
        initial="hidden"
        animate={visible ? "visible" : "hidden"}
        variants={fadeIn}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="lg:col-span-2 relative hidden md:flex items-center justify-center p-4" // Added padding
      >
        {/* Container principal avec un aspect ratio fixe et taille responsive */}
        {/* Adjusted max-width for better responsiveness */}
        <div className="relative w-full aspect-square max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
          {/* Effet de lumière avec gradients superposés pour plus de profondeur */}
          <div className="absolute inset-0 z-0">
            <motion.div 
              // Adjusted size slightly to match container changes - Increased size
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 sm:w-44 md:w-52 lg:w-60 h-36 sm:h-44 md:h-52 lg:h-60 bg-gradient-to-tr from-orange-500/20 to-purple-500/10 rounded-full blur-2xl"
              animate={{ 
                scale: [1, 1.2, 1], 
                opacity: [0.3, 0.5, 0.3],
                rotate: [0, 180]
              }} 
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "easeInOut" as const
              }}
            />
          </div>
          
         
          
          {/* Cercles orbitaux pour guider visuellement les orbites - REMOVED */}
          {/*
          <svg className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none"> 
            {[dynamicBaseRadius, dynamicBaseRadius * 0.75].map((radius, idx) => ( // Adjusted inner radius relative to outer
              <motion.circle 
                key={`circle-${idx}`}
                cx="50%"
                cy="50%"
                r={radius}
                fill="none" 
                stroke={idx === 0 ? "rgba(249, 115, 22, 0.15)" : "rgba(124, 58, 237, 0.1)"}
                strokeWidth="1" 
                strokeDasharray={idx === 0 ? "5 5" : "3 6"}
                animate={{ rotate: idx === 0 ? 360 : -360 }}
                transition={{ duration: idx === 0 ? 60 : 45, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: 'center' }}
              />
            ))}
          </svg>
          */}
  
          {/* Éléments technologiques optimisés avec des transitions plus douces */}
          {techStack.map((tech, index) => {
            // Recalculate orbit for each item (or reuse if baseRadius is constant)
            const orbit = createOrbit(index, techStack.length); 
            
            return (
              <motion.div
                key={tech.name}
                // Adjusted padding and font sizes for better fit across sizes
                className="absolute top-1/2 left-1/2 px-2 py-1 sm:px-2.5 sm:py-1.5 md:px-3 md:py-2 rounded-lg backdrop-blur-md flex items-center gap-1 sm:gap-1.5 z-20" // Added z-20
                style={{ 
                  backgroundColor: 'rgba(17, 24, 39, 0.8)',
                  border: `1px solid ${tech.color}`,
                  boxShadow: `0 0 8px ${tech.color.replace(', 0.8', ', 0.2').replace(', 0.7', ', 0.15')}`, // Reduced shadow slightly
                  transform: `translate(calc(-50% + ${orbit.x}px), calc(-50% + ${orbit.y}px))`,
                }}
                animate={orbit.animate}
                transition={orbit.transition}
                whileHover={{ 
                  scale: 1.08, 
                  backgroundColor: 'rgba(24, 24, 27, 0.95)',
                  boxShadow: `0 0 12px ${tech.color.replace(', 0.8', ', 0.3').replace(', 0.7', ', 0.25')}`, // Adjusted hover shadow
                  transition: { duration: 0.2 }
                }}
              >
                {/* Adjusted icon size */}
                <span className="text-base sm:text-lg md:text-xl" style={{ filter: 'drop-shadow(0 0 2px rgba(0, 0, 0, 0.5))' }}>{tech.icon}</span>
                 {/* Adjusted text size */}
                <span className="text-[10px] sm:text-xs md:text-sm font-medium" style={{ color: tech.color }}>{tech.name}</span>
              </motion.div>
            );
          })}
  
          {/* Points lumineux additionnels pour renforcer l'effet 3D */}
          {[...Array(8)].map((_, i) => ( // Reduced number slightly more
            <motion.div 
              key={`dot-${i}`}
              // Adjusted size slightly
              className="absolute rounded-full w-0.5 sm:w-1 h-0.5 sm:h-1 z-0" // Ensure dots are behind tech items
              style={{
                backgroundColor: i % 3 === 0 ? 'rgba(249, 115, 22, 0.6)' : 
                                i % 3 === 1 ? 'rgba(124, 58, 237, 0.4)' : 
                                'rgba(255, 255, 255, 0.3)',
                // Ensure points stay within the general area
                top: `${20 + Math.random() * 60}%`, // Adjusted random range
                left: `${20 + Math.random() * 60}%`, // Adjusted random range
                filter: 'blur(1px)',
              }}
              animate={{ 
                opacity: [0.4, 0.8, 0.4], 
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut" as const
              }}
            />
          ))}
        </div>
      </motion.div>
    );
  };

export default HeroAnimation;
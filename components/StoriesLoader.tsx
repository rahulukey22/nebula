import { motion } from 'motion/react';
import { brand, getColorWithOpacity } from '../config/brand';

export function StoriesLoader() {
  return (
    <div 
      className="fixed inset-0 z-[9999] backdrop-blur-xl flex items-center justify-center"
      style={{ 
        background: `linear-gradient(135deg, ${getColorWithOpacity(brand.colors.primary, 0.1)}, ${getColorWithOpacity(brand.colors.primaryDark, 0.1)}, ${getColorWithOpacity(brand.colors.accent, 0.1)})` 
      }}
    >
      {/* Glassmorphism card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-white/80 backdrop-blur-2xl rounded-[32px] p-12 border border-white/40 max-w-sm mx-4"
        style={{ boxShadow: `0px 20px 60px 0px ${getColorWithOpacity(brand.colors.primary, 0.2)}` }}
      >
        {/* Logo Animation */}
        <div className="relative h-24 mb-8 flex items-center justify-center">
          {/* Outer rotating circle */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute w-20 h-20 rounded-full border-4 border-transparent"
            style={{ 
              borderTopColor: brand.colors.primary,
              borderRightColor: brand.colors.primaryDark,
            }}
          />
          
          {/* Middle rotating circle (opposite direction) */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute w-14 h-14 rounded-full border-4 border-transparent"
            style={{ 
              borderBottomColor: brand.colors.accent,
              borderLeftColor: brand.colors.primary,
            }}
          />
          
          {/* Inner pulsing circle */}
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-8 h-8 rounded-full"
            style={{ 
              background: `linear-gradient(135deg, ${brand.colors.primary}, ${brand.colors.primaryDark})` 
            }}
          />
          
          {/* Floating particles */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [-20, -40, -20],
                x: [0, (i - 1) * 10, 0],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut"
              }}
              className="absolute w-2 h-2 rounded-full"
              style={{ 
                backgroundColor: brand.colors.accent,
                top: `${30 + i * 10}%`,
                left: `${40 + i * 5}%`
              }}
            />
          ))}
        </div>

        {/* Text with gradient animation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-center"
        >
          <motion.p
            animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="text-[16px] font-medium bg-clip-text text-transparent bg-[length:200%_auto]"
            style={{ 
              backgroundImage: `linear-gradient(90deg, ${brand.colors.primary}, ${brand.colors.primaryDark}, ${brand.colors.primary})` 
            }}
          >
            {brand.content.loading.stories.text} {brand.content.loading.stories.emoji}
          </motion.p>
          
          {/* Animated dots */}
          <div className="flex justify-center gap-1.5 mt-4">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: brand.colors.primary }}
              />
            ))}
          </div>
        </motion.div>

        {/* Shimmer effect overlay */}
        <motion.div
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 0.5 }}
          className="absolute inset-0 w-full h-full overflow-hidden rounded-[32px] pointer-events-none"
        >
          <div 
            className="absolute inset-0 w-full h-full skew-x-12"
            style={{ 
              background: `linear-gradient(90deg, transparent, ${getColorWithOpacity(brand.colors.accent, 0.3)}, transparent)` 
            }} 
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
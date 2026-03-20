import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Gift, Star, Ticket } from 'lucide-react';

interface LuckyDrawReward {
  id: number;
  name: string;
  couponCode: string;
  discount: string;
  description: string;
  validDays: number;
  icon: string;
}

interface InteractiveLuckyDrawProps {
  onWin: (reward: LuckyDrawReward) => void;
  onNext: () => void;
}

const REWARDS: LuckyDrawReward[] = [
  {
    id: 1,
    name: 'Grand Prize',
    couponCode: 'LUCKY50',
    discount: '50% OFF',
    description: 'Massive 50% off on your entire order!',
    validDays: 10,
    icon: '🏆'
  },
  {
    id: 2,
    name: 'First Prize',
    couponCode: 'LUCKY35',
    discount: '35% OFF',
    description: 'Amazing 35% discount on your bill!',
    validDays: 7,
    icon: '🥇'
  },
  {
    id: 3,
    name: 'Second Prize',
    couponCode: 'LUCKY25',
    discount: '25% OFF',
    description: 'Get 25% off on your order!',
    validDays: 7,
    icon: '🥈'
  },
  {
    id: 4,
    name: 'Free Sundae',
    couponCode: 'SUNDAEFREE',
    discount: 'Free Premium Sundae',
    description: 'Enjoy a premium sundae on us!',
    validDays: 5,
    icon: '🍨'
  },
  {
    id: 5,
    name: 'Free Cake Slice',
    couponCode: 'CAKEFREE',
    discount: 'Free Ice Cream Cake Slice',
    description: 'Get a delicious cake slice free!',
    validDays: 5,
    icon: '🍰'
  },
  {
    id: 6,
    name: 'Consolation',
    couponCode: 'LUCKY10',
    discount: '10% OFF',
    description: 'Save 10% on your next visit!',
    validDays: 3,
    icon: '🎁'
  }
];

export function InteractiveLuckyDraw({ onWin, onNext }: InteractiveLuckyDrawProps) {
  const [isDrawing, setIsDrawing] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [wonReward, setWonReward] = useState<LuckyDrawReward | null>(null);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [revealedBoxes, setRevealedBoxes] = useState<number[]>([]);

  const handleDraw = () => {
    if (isDrawing || hasDrawn) return;

    setIsDrawing(true);
    setHasDrawn(true);
    
    // Weighted random selection (higher chance for lower prizes)
    const weights = [5, 10, 20, 25, 25, 15]; // Grand prize has lowest weight
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    let random = Math.random() * totalWeight;
    
    let selectedIndex = 0;
    for (let i = 0; i < weights.length; i++) {
      random -= weights[i];
      if (random <= 0) {
        selectedIndex = i;
        break;
      }
    }
    
    const selectedReward = REWARDS[selectedIndex];
    
    // Animate revealing boxes
    const revealSequence = async () => {
      for (let i = 0; i < 6; i++) {
        await new Promise(resolve => setTimeout(resolve, 300));
        setRevealedBoxes(prev => [...prev, i]);
        
        if (i === selectedIndex) {
          await new Promise(resolve => setTimeout(resolve, 800));
          setIsDrawing(false);
          setWonReward(selectedReward);
          setShowReward(true);
          onWin(selectedReward);
          break;
        }
      }
    };
    
    revealSequence();
  };

  return (
    <div className="relative w-full min-h-[80vh] pointer-events-none overflow-hidden rounded-3xl">
      {/* Background Gradient */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, #E8F4FF 0%, #FFF0F8 50%, #FFFFFF 100%)'
      }} />

      {/* Decorative Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.3, scale: 0.5 }}
            animate={{ 
              opacity: [0.3, 0.8, 0.3],
              scale: [0.5, 1, 0.5],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "linear"
            }}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <Star 
              size={12 + Math.random() * 8} 
              className={i % 2 === 0 ? 'text-pink-300' : 'text-blue-300'} 
              fill="currentColor" 
            />
          </motion.div>
        ))}
      </div>

      {/* Content Container */}
      <div className="absolute inset-0 flex flex-col items-center justify-between py-8 px-6">
        
        {/* Header */}
        <div className="text-center pointer-events-none">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-lg mb-4"
            style={{ border: '2px solid #005CB9' }}
          >
            <span className="text-3xl">🍦</span>
            <div>
              <p className="text-[#005CB9] font-black text-sm tracking-tight">BASKIN ROBBINS</p>
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="font-black mb-2"
            style={{
              fontSize: '44px',
              lineHeight: '1.1',
              background: 'linear-gradient(135deg, #005CB9 0%, #E30F84 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Monthly Lucky Draw
          </motion.h1>
          <p className="text-gray-600 font-semibold">Pick a box and reveal your prize!</p>
        </div>

        {/* Prize Boxes */}
        <div className="flex-1 flex items-center justify-center w-full max-w-md pointer-events-auto">
          <div className="w-full">
            
            {/* Mystery Boxes Grid */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {REWARDS.map((reward, index) => {
                const isRevealed = revealedBoxes.includes(index);
                const isWinner = wonReward?.id === reward.id && isRevealed;
                
                return (
                  <motion.div
                    key={reward.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="aspect-square"
                  >
                    <div className="relative w-full h-full">
                      {/* Front (Closed Box) */}
                      <AnimatePresence>
                        {!isRevealed && (
                          <motion.div
                            initial={{ rotateY: 0 }}
                            exit={{ rotateY: 90, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer"
                            style={{
                              background: 'linear-gradient(135deg, #E30F84 0%, #005CB9 100%)',
                              boxShadow: '0 8px 20px rgba(227, 15, 132, 0.3)',
                            }}
                            onClick={!hasDrawn ? handleDraw : undefined}
                          >
                            <motion.div
                              animate={{ 
                                rotate: [0, -10, 10, -10, 0],
                                y: [0, -5, 0]
                              }}
                              transition={{ 
                                duration: 2,
                                repeat: Infinity,
                                delay: index * 0.2,
                                ease: "easeInOut"
                              }}
                            >
                              <Gift className="text-white mb-2" size={32} />
                            </motion.div>
                            <p className="text-white text-xs font-bold">?</p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Back (Revealed Prize) */}
                      <AnimatePresence>
                        {isRevealed && (
                          <motion.div
                            initial={{ rotateY: -90, opacity: 0 }}
                            animate={{ rotateY: 0, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 rounded-2xl p-3 flex flex-col items-center justify-center"
                            style={{
                              background: isWinner 
                                ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)'
                                : 'linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%)',
                              boxShadow: isWinner 
                                ? '0 8px 24px rgba(255, 215, 0, 0.5), 0 0 0 3px #FFD700'
                                : '0 4px 12px rgba(0, 0, 0, 0.1)',
                            }}
                          >
                            {isWinner && (
                              <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-2 -right-2"
                              >
                                <Star size={20} className="text-yellow-500" fill="currentColor" />
                              </motion.div>
                            )}
                            <span className="text-3xl mb-1">{reward.icon}</span>
                            <p className={`text-[10px] font-black text-center leading-tight ${
                              isWinner ? 'text-white' : 'text-gray-600'
                            }`}>
                              {reward.name}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Draw Button */}
            <motion.button
              onClick={handleDraw}
              disabled={isDrawing || hasDrawn}
              whileHover={{ scale: hasDrawn ? 1 : 1.02 }}
              whileTap={{ scale: hasDrawn ? 1 : 0.98 }}
              className="w-full py-5 rounded-2xl font-black text-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
              style={{
                background: hasDrawn 
                  ? 'linear-gradient(135deg, #94A3B8 0%, #64748B 100%)'
                  : 'linear-gradient(135deg, #005CB9 0%, #003D82 100%)',
                color: 'white',
                boxShadow: hasDrawn 
                  ? '0 8px 16px rgba(0, 0, 0, 0.2)'
                  : '0 8px 24px rgba(0, 92, 185, 0.4)',
              }}
            >
              {isDrawing ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles size={20} />
                  </motion.div>
                  REVEALING...
                </span>
              ) : hasDrawn ? (
                'ALREADY DRAWN'
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Ticket size={20} />
                  TAP ANY BOX TO DRAW
                </span>
              )}
            </motion.button>

            {/* Prize Info */}
            <div className="mt-4 bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #E30F84 0%, #005CB9 100%)' }}
                >
                  <Star size={20} className="text-white" fill="white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-black text-gray-800 mb-1">6 Amazing Prizes</p>
                  <p className="text-xs text-gray-600">
                    From grand 50% OFF to free treats, every box is a winner!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pointer-events-none">
          <p className="text-gray-500 text-xs font-semibold">
            🎁 One lucky draw per month • Valid for premium members
          </p>
        </div>
      </div>

      {/* Reward Modal */}
      <AnimatePresence>
        {showReward && wonReward && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center z-50 pointer-events-auto"
            style={{ background: 'rgba(0, 0, 0, 0.75)' }}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-3xl p-8 max-w-sm mx-6 shadow-2xl relative overflow-hidden"
            >
              {/* Fireworks Effect */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ 
                      x: '50%', 
                      y: '50%',
                      scale: 0,
                      opacity: 1 
                    }}
                    animate={{ 
                      x: `${Math.random() * 100}%`,
                      y: `${Math.random() * 100}%`,
                      scale: [0, 1, 0],
                      opacity: [1, 1, 0]
                    }}
                    transition={{ 
                      duration: 1.5,
                      delay: i * 0.05,
                      ease: "easeOut"
                    }}
                    className="absolute"
                  >
                    <Sparkles 
                      size={16} 
                      className={i % 2 === 0 ? 'text-pink-400' : 'text-blue-400'} 
                    />
                  </motion.div>
                ))}
              </div>

              {/* Content */}
              <div className="relative z-10 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                  className="text-7xl mb-4"
                >
                  {wonReward.icon}
                </motion.div>
                
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-4xl font-black mb-2"
                  style={{ color: '#005CB9' }}
                >
                  {wonReward.name}!
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-sm text-gray-600 mb-6"
                >
                  🎉 You've won an amazing prize!
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-gradient-to-br from-blue-50 to-pink-50 rounded-2xl p-6 mb-4 border-2"
                  style={{ borderColor: '#005CB9' }}
                >
                  <p className="text-sm font-bold text-gray-600 mb-2">Your Prize</p>
                  <p className="text-3xl font-black mb-3" style={{ color: '#E30F84' }}>
                    {wonReward.discount}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">{wonReward.description}</p>
                  
                  <div className="bg-white rounded-xl p-4 border-2 border-dashed" style={{ borderColor: '#E30F84' }}>
                    <p className="text-xs font-bold text-gray-500 mb-1">COUPON CODE</p>
                    <p className="text-2xl font-black tracking-wider" style={{ color: '#E30F84' }}>
                      {wonReward.couponCode}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-center gap-1 mt-3 text-green-600">
                    <Star size={14} fill="currentColor" />
                    <p className="text-xs font-bold">Saved to your Coupons!</p>
                  </div>
                </motion.div>

                <p className="text-sm text-gray-500 mb-6">
                  Valid for {wonReward.validDays} day{wonReward.validDays !== 1 ? 's' : ''}
                </p>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  onClick={onNext}
                  className="w-full py-4 rounded-2xl font-black text-lg text-white transition-all active:scale-95"
                  style={{
                    background: 'linear-gradient(135deg, #005CB9 0%, #E30F84 100%)',
                    boxShadow: '0 8px 24px rgba(0, 92, 185, 0.4)',
                  }}
                >
                  Claim Prize →
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

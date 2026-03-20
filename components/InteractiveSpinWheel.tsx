import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Gift, Star, X } from 'lucide-react';

interface SpinWheelReward {
  id: number;
  label: string;
  couponCode: string;
  discount: string;
  description: string;
  validDays: number;
}

interface InteractiveSpinWheelProps {
  onWin: (reward: SpinWheelReward) => void;
  onNext: () => void;
}

const REWARDS: SpinWheelReward[] = [
  {
    id: 1,
    label: '20%\nOFF',
    couponCode: 'SPIN20',
    discount: '20% OFF',
    description: 'Get 20% off on your entire order!',
    validDays: 7
  },
  {
    id: 2,
    label: 'FREE\nSCOOP',
    couponCode: 'FREESCOOP',
    discount: 'Free Single Scoop',
    description: 'Enjoy one free scoop of any flavor!',
    validDays: 5
  },
  {
    id: 3,
    label: 'BUY 1\nGET 1',
    couponCode: 'BOGO31',
    discount: 'Buy 1 Get 1 Free',
    description: 'Buy one ice cream, get one free!',
    validDays: 3
  },
  {
    id: 4,
    label: '₹100\nOFF',
    couponCode: 'SAVE100',
    discount: '₹100 OFF',
    description: 'Save ₹100 on orders above ₹500!',
    validDays: 7
  },
  {
    id: 5,
    label: 'FREE\nTOPPING',
    couponCode: 'TOPPINGFREE',
    discount: 'Free Premium Topping',
    description: 'Add any premium topping for free!',
    validDays: 5
  },
  {
    id: 6,
    label: '30%\nOFF',
    couponCode: 'MEGA30',
    discount: '30% OFF',
    description: 'Massive 30% discount on entire bill!',
    validDays: 3
  }
];

const WHEEL_COLORS = ['#E30F84', '#005CB9', '#FF6B9D', '#0088CC', '#FF1493', '#0066AA'];

export function InteractiveSpinWheel({ onWin, onNext }: InteractiveSpinWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const [wonReward, setWonReward] = useState<SpinWheelReward | null>(null);
  const [hasSpun, setHasSpun] = useState(false);

  const handleSpin = () => {
    if (isSpinning || hasSpun) return;

    setIsSpinning(true);
    setShowReward(false);
    setHasSpun(true);
    
    const randomIndex = Math.floor(Math.random() * REWARDS.length);
    const selectedReward = REWARDS[randomIndex];
    
    const segmentAngle = 360 / REWARDS.length;
    const targetAngle = (REWARDS.length - randomIndex - 0.5) * segmentAngle;
    const fullRotations = 5;
    const finalRotation = rotation + (fullRotations * 360) + targetAngle;
    
    setRotation(finalRotation);
    
    setTimeout(() => {
      setIsSpinning(false);
      setWonReward(selectedReward);
      setShowReward(true);
      onWin(selectedReward);
    }, 4000);
  };

  const segmentAngle = 360 / REWARDS.length;

  return (
    <div className="relative w-full min-h-[80vh] pointer-events-none overflow-hidden rounded-3xl">
      {/* Background Gradient */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(135deg, #FFE8F5 0%, #E8F4FF 50%, #FFF5FA 100%)'
      }} />

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-8 left-6 w-20 h-20 rounded-full animate-pulse" style={{
          background: 'radial-gradient(circle, rgba(227, 15, 132, 0.2) 0%, transparent 70%)'
        }} />
        <div className="absolute top-24 right-6 w-28 h-28 rounded-full animate-pulse" style={{
          background: 'radial-gradient(circle, rgba(0, 92, 185, 0.2) 0%, transparent 70%)',
          animationDelay: '1s'
        }} />
        <div className="absolute bottom-24 left-8 w-24 h-24 rounded-full animate-pulse" style={{
          background: 'radial-gradient(circle, rgba(227, 15, 132, 0.15) 0%, transparent 70%)',
          animationDelay: '0.5s'
        }} />
      </div>

      {/* Content Container */}
      <div className="absolute inset-0 flex flex-col items-center justify-between py-6 px-6">
        
        {/* Header */}
        <div className="text-center pointer-events-none">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: -10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white rounded-full px-5 py-2.5 shadow-xl mb-3"
            style={{ border: '3px solid #E30F84' }}
          >
            <span className="text-2xl">🍦</span>
            <div>
              <p className="text-[#E30F84] font-black text-xs tracking-tight leading-tight">BASKIN ROBBINS</p>
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ y: -15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-black mb-1.5"
            style={{
              fontSize: '42px',
              lineHeight: '1',
              background: 'linear-gradient(135deg, #E30F84 0%, #005CB9 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Spin & Win!
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-700 font-bold text-sm"
          >
            Every spin is a guaranteed prize!
          </motion.p>
        </div>

        {/* Wheel Section */}
        <div className="flex-1 flex items-center justify-center w-full max-w-md pointer-events-auto">
          <div className="relative w-full">
            
            {/* Pointer */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 left-1/2 -translate-x-1/2 z-30"
            >
              <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[35px]" 
                style={{ 
                  borderTopColor: '#E30F84',
                  filter: 'drop-shadow(0 4px 12px rgba(227, 15, 132, 0.4))'
                }} 
              />
            </motion.div>

            {/* Wheel Container */}
            <div className="bg-white rounded-3xl p-6 shadow-2xl" style={{
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)'
            }}>
              
              {/* Wheel */}
              <div className="relative w-full aspect-square max-w-[300px] mx-auto mb-6">
                
                {/* Outer Decorative Ring */}
                <div className="absolute inset-0 rounded-full p-2" style={{
                  background: 'linear-gradient(135deg, #E30F84 0%, #005CB9 100%)',
                  boxShadow: '0 8px 24px rgba(227, 15, 132, 0.3)'
                }}>
                  <div className="w-full h-full rounded-full bg-white p-3">
                    
                    {/* Spinning Segments */}
                    <motion.div
                      className="w-full h-full rounded-full overflow-hidden relative"
                      animate={{ rotate: rotation }}
                      transition={{ duration: 4, ease: [0.25, 0.1, 0.25, 1] }}
                      style={{ boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.1)' }}
                    >
                      {REWARDS.map((reward, index) => {
                        const angle = index * segmentAngle;
                        const color = WHEEL_COLORS[index];
                        
                        return (
                          <div
                            key={reward.id}
                            className="absolute inset-0"
                            style={{
                              transform: `rotate(${angle}deg)`,
                              transformOrigin: 'center',
                            }}
                          >
                            <div 
                              className="absolute w-full h-full"
                              style={{
                                clipPath: `polygon(50% 50%, ${50 + 50 * Math.sin(0)}% ${50 - 50 * Math.cos(0)}%, ${50 + 50 * Math.sin((segmentAngle * Math.PI) / 180)}% ${50 - 50 * Math.cos((segmentAngle * Math.PI) / 180)}%)`,
                                background: color,
                              }}
                            >
                              <div className="absolute top-[18%] left-1/2 -translate-x-1/2 w-full text-center px-0.5">
                                <p className="text-white font-black text-base leading-[1.1] whitespace-pre-line"
                                  style={{ textShadow: '0 3px 8px rgba(0, 0, 0, 0.9), 0 1px 4px rgba(0, 0, 0, 1), 0 0 2px rgba(0, 0, 0, 0.8)' }}
                                >
                                  {reward.label}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      {/* Center Circle */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full shadow-xl flex items-center justify-center z-10"
                        style={{
                          background: 'linear-gradient(135deg, #E30F84 0%, #005CB9 100%)',
                        }}
                      >
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                          <span className="text-2xl">31</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Spin Button */}
              <motion.button
                onClick={handleSpin}
                disabled={isSpinning || hasSpun}
                whileHover={{ scale: hasSpun ? 1 : 1.02 }}
                whileTap={{ scale: hasSpun ? 1 : 0.98 }}
                className="w-full py-5 rounded-2xl font-black text-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                style={{
                  background: hasSpun 
                    ? 'linear-gradient(135deg, #94A3B8 0%, #64748B 100%)'
                    : 'linear-gradient(135deg, #E30F84 0%, #C00D6F 100%)',
                  color: 'white',
                  boxShadow: hasSpun 
                    ? '0 8px 16px rgba(0, 0, 0, 0.2)'
                    : '0 8px 24px rgba(227, 15, 132, 0.4)',
                }}
              >
                {isSpinning ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      ⭐
                    </motion.div>
                    SPINNING...
                  </span>
                ) : hasSpun ? (
                  'ALREADY SPUN'
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Star size={20} fill="white" />
                    SPIN NOW
                  </span>
                )}
              </motion.button>
            </div>

            {/* Reward Details */}
            <div className="mt-6 grid grid-cols-3 gap-2">
              {REWARDS.slice(0, 3).map((reward, idx) => (
                <div key={idx} className="bg-white/60 backdrop-blur-sm rounded-xl p-2 text-center border border-white shadow-sm">
                  <p className="text-xs font-black" style={{ color: WHEEL_COLORS[idx] }}>
                    {reward.discount.split(' ')[0]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pointer-events-none">
          <p className="text-gray-500 text-xs font-semibold">
            🎁 One free spin per visit • Terms apply
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
            className="absolute inset-0 flex items-center justify-center z-50 pointer-events-auto p-4"
            style={{ background: 'rgba(0, 0, 0, 0.80)' }}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl relative overflow-hidden"
              style={{ maxHeight: '90vh' }}
            >
              {/* Confetti Background */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: -20, opacity: 1 }}
                    animate={{ y: 400, opacity: 0 }}
                    transition={{ duration: 2, delay: i * 0.1, ease: "easeOut" }}
                    className="absolute"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: -20,
                    }}
                  >
                    <Sparkles size={18} className="text-yellow-400" />
                  </motion.div>
                ))}
              </div>

              {/* Close Button */}
              <button
                onClick={onNext}
                className="absolute top-4 right-4 z-20 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-gray-200 hover:bg-gray-50 active:scale-95 transition-all"
              >
                <X size={20} className="text-gray-700" />
              </button>

              {/* Scrollable Content */}
              <div className="relative z-10 text-center overflow-y-auto" style={{ maxHeight: 'calc(90vh - 48px)' }}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-3"
                  style={{
                    background: 'linear-gradient(135deg, #E30F84 0%, #005CB9 100%)',
                  }}
                >
                  <Gift className="text-white" size={32} />
                </motion.div>
                
                <h2 className="text-3xl font-black mb-3" style={{ color: '#E30F84' }}>
                  🎉 Congratulations!
                </h2>
                
                <div className="bg-gradient-to-br from-pink-50 to-blue-50 rounded-2xl p-5 mb-4 border-2" style={{ borderColor: '#E30F84' }}>
                  <p className="text-xs font-bold text-gray-600 mb-2">You won</p>
                  <p className="text-2xl font-black mb-2" style={{ color: '#E30F84' }}>
                    {wonReward.discount}
                  </p>
                  <p className="text-sm text-gray-600 mb-3">{wonReward.description}</p>
                  
                  <div className="bg-white rounded-xl p-3 border-2 border-dashed" style={{ borderColor: '#005CB9' }}>
                    <p className="text-xs font-bold text-gray-500 mb-1">COUPON CODE</p>
                    <p className="text-xl font-black tracking-wider" style={{ color: '#005CB9' }}>
                      {wonReward.couponCode}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-center gap-1 mt-3 text-green-600">
                    <Star size={14} fill="currentColor" />
                    <p className="text-xs font-bold">Saved to your Coupons!</p>
                  </div>
                </div>

                <p className="text-sm text-gray-500 mb-4">
                  Valid for {wonReward.validDays} day{wonReward.validDays !== 1 ? 's' : ''}
                </p>

                <button
                  onClick={onNext}
                  className="w-full py-3.5 rounded-2xl font-black text-base text-white transition-all active:scale-95"
                  style={{
                    background: 'linear-gradient(135deg, #E30F84 0%, #005CB9 100%)',
                    boxShadow: '0 8px 24px rgba(227, 15, 132, 0.4)',
                  }}
                >
                  Claim Reward →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
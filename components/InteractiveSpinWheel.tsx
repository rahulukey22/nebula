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
  { id: 1, label: '20%\nOFF',      couponCode: 'SPIN20',      discount: '20% OFF',             description: 'Get 20% off on your entire order!',     validDays: 7 },
  { id: 2, label: 'FREE\nSCOOP',   couponCode: 'FREESCOOP',   discount: 'Free Single Scoop',   description: 'Enjoy one free scoop of any flavor!',    validDays: 5 },
  { id: 3, label: 'BUY 1\nGET 1',  couponCode: 'BOGO31',      discount: 'Buy 1 Get 1 Free',    description: 'Buy one ice cream, get one free!',       validDays: 3 },
  { id: 4, label: '₹100\nOFF',     couponCode: 'SAVE100',     discount: '₹100 OFF',            description: 'Save ₹100 on orders above ₹500!',       validDays: 7 },
  { id: 5, label: 'FREE\nTOPPING', couponCode: 'TOPPINGFREE', discount: 'Free Premium Topping',description: 'Add any premium topping for free!',      validDays: 5 },
  { id: 6, label: '30%\nOFF',      couponCode: 'MEGA30',      discount: '30% OFF',             description: 'Massive 30% discount on entire bill!',   validDays: 3 },
];

const WHEEL_COLORS = ['#E30F84', '#005CB9', '#FF5BA8', '#0077D4', '#C0006A', '#003D82'];

const SIZE = 280;
const CX = SIZE / 2;
const CY = SIZE / 2;
const R  = SIZE / 2 - 4;

function polarXY(angleDeg: number, radius = R) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: CX + radius * Math.cos(rad), y: CY + radius * Math.sin(rad) };
}

function slicePath(startDeg: number, endDeg: number) {
  const s = polarXY(startDeg);
  const e = polarXY(endDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${CX} ${CY} L ${s.x} ${s.y} A ${R} ${R} 0 ${large} 1 ${e.x} ${e.y} Z`;
}

export function InteractiveSpinWheel({ onWin, onNext }: InteractiveSpinWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation]     = useState(0);
  const [showReward, setShowReward] = useState(false);
  const [wonReward, setWonReward]   = useState<SpinWheelReward | null>(null);
  const [hasSpun, setHasSpun]       = useState(false);

  const segAngle = 360 / REWARDS.length;

  const handleSpin = () => {
    if (isSpinning || hasSpun) return;
    setIsSpinning(true);
    setHasSpun(true);

    const idx = Math.floor(Math.random() * REWARDS.length);
    // Bring segment centre to the top pointer (0°)
    const targetOffset = 360 - (idx + 0.5) * segAngle;
    const finalRotation = rotation + 5 * 360 + (targetOffset - (rotation % 360) + 360) % 360;
    setRotation(finalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setWonReward(REWARDS[idx]);
      setShowReward(true);
      onWin(REWARDS[idx]);
    }, 4500);
  };

  return (
    <div
      className="relative w-full min-h-[80vh] overflow-hidden rounded-3xl flex flex-col"
      style={{ background: 'linear-gradient(160deg, #FFF0F8 0%, #EEF5FF 100%)' }}
    >
      {/* Decorative blobs */}
      <div className="absolute -top-20 -left-20 w-56 h-56 rounded-full opacity-20 pointer-events-none"
        style={{ background: '#E30F84' }} />
      <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full opacity-15 pointer-events-none"
        style={{ background: '#005CB9' }} />

      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 flex flex-col items-center pt-6 pb-2 px-4 gap-1"
      >
        <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-lg"
          style={{ border: '2.5px solid #E30F84' }}>
          <span className="text-lg">🍦</span>
          <span className="font-black text-xs tracking-wide" style={{ color: '#E30F84' }}>BASKIN ROBBINS</span>
        </div>
        <h1 className="font-black text-4xl leading-tight mt-1" style={{
          background: 'linear-gradient(135deg, #E30F84, #005CB9)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Spin &amp; Win!
        </h1>
        <p className="text-gray-500 text-sm font-semibold">Every spin is a guaranteed prize</p>
      </motion.div>

      {/* Wheel area */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-2">

        {/* Pointer */}
        <div className="w-0 h-0 mb-1"
          style={{
            borderLeft: '13px solid transparent',
            borderRight: '13px solid transparent',
            borderTop: '26px solid #E30F84',
            filter: 'drop-shadow(0 3px 6px rgba(227,15,132,0.5))',
          }}
        />

        {/* Wheel ring */}
        <div
          className="rounded-full p-[6px]"
          style={{
            background: 'linear-gradient(135deg, #E30F84, #005CB9)',
            boxShadow: '0 16px 48px rgba(227,15,132,0.35), 0 4px 16px rgba(0,92,185,0.25)',
          }}
        >
          <div className="rounded-full bg-white p-[4px]">
            <motion.svg
              width={SIZE}
              height={SIZE}
              viewBox={`0 0 ${SIZE} ${SIZE}`}
              animate={{ rotate: rotation }}
              transition={{ duration: 4.5, ease: [0.17, 0.67, 0.22, 1.0] }}
              style={{ display: 'block', borderRadius: '50%' }}
            >
              {REWARDS.map((reward, i) => {
                const start = i * segAngle;
                const end   = start + segAngle;
                const mid   = start + segAngle / 2;
                const { x: tx, y: ty } = polarXY(mid, R * 0.62);
                const lines = reward.label.split('\n');
                return (
                  <g key={reward.id}>
                    <path d={slicePath(start, end)} fill={WHEEL_COLORS[i]} stroke="white" strokeWidth="1.5" />
                    <g transform={`translate(${tx},${ty}) rotate(${mid})`}>
                      {lines.map((line, li) => (
                        <text
                          key={li}
                          x="0"
                          y={li * 13 - (lines.length - 1) * 6.5}
                          textAnchor="middle"
                          dominantBaseline="central"
                          fill="white"
                          fontWeight="900"
                          fontSize="11"
                          fontFamily="system-ui, -apple-system, sans-serif"
                          style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.7))' }}
                        >
                          {line}
                        </text>
                      ))}
                    </g>
                  </g>
                );
              })}

              {/* Divider lines */}
              {REWARDS.map((_, i) => {
                const { x, y } = polarXY(i * segAngle);
                return (
                  <line key={i} x1={CX} y1={CY} x2={x} y2={y}
                    stroke="white" strokeWidth="1.5" opacity="0.6" />
                );
              })}

              {/* Centre hub */}
              <circle cx={CX} cy={CY} r={30} fill="url(#hubGrad)" />
              <circle cx={CX} cy={CY} r={24} fill="white" />
              <text x={CX} y={CY} textAnchor="middle" dominantBaseline="central"
                fontSize="13" fontWeight="900" fill="#E30F84"
                fontFamily="system-ui, -apple-system, sans-serif">
                31
              </text>

              <defs>
                <linearGradient id="hubGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E30F84" />
                  <stop offset="100%" stopColor="#005CB9" />
                </linearGradient>
              </defs>
            </motion.svg>
          </div>
        </div>

        {/* Spin button */}
        <motion.button
          onClick={handleSpin}
          disabled={isSpinning || hasSpun}
          whileHover={{ scale: hasSpun ? 1 : 1.03 }}
          whileTap={{ scale: hasSpun ? 1 : 0.97 }}
          className="mt-5 w-64 py-4 rounded-2xl font-black text-lg text-white shadow-xl transition-all disabled:cursor-not-allowed"
          style={{
            background: hasSpun
              ? 'linear-gradient(135deg, #94A3B8, #64748B)'
              : 'linear-gradient(135deg, #E30F84, #C0006A)',
            boxShadow: hasSpun ? 'none' : '0 8px 24px rgba(227,15,132,0.45)',
            opacity: isSpinning ? 0.8 : 1,
          }}
        >
          {isSpinning ? (
            <span className="flex items-center justify-center gap-2">
              <motion.span animate={{ rotate: 360 }}
                transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}>⭐</motion.span>
              SPINNING…
            </span>
          ) : hasSpun ? 'ALREADY SPUN' : (
            <span className="flex items-center justify-center gap-2">
              <Star size={18} fill="white" />
              SPIN NOW
            </span>
          )}
        </motion.button>

        <p className="mt-3 text-gray-400 text-xs font-semibold">
          🎁 One free spin per visit · Terms apply
        </p>
      </div>

      {/* ── Reward Modal ── */}
      <AnimatePresence>
        {showReward && wonReward && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center z-50 p-5"
            style={{ background: 'rgba(0,0,0,0.78)' }}
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl relative overflow-hidden"
            >
              {/* Confetti */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(14)].map((_, i) => (
                  <motion.div key={i}
                    initial={{ y: -10, opacity: 1 }}
                    animate={{ y: 380, opacity: 0 }}
                    transition={{ duration: 2, delay: i * 0.08 }}
                    className="absolute"
                    style={{ left: `${6 + i * 7}%`, top: -10 }}
                  >
                    <Sparkles size={15} className={i % 2 === 0 ? 'text-pink-400' : 'text-blue-400'} />
                  </motion.div>
                ))}
              </div>

              <button onClick={onNext}
                className="absolute top-4 right-4 z-20 w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                <X size={18} className="text-gray-600" />
              </button>

              <div className="relative z-10 text-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #E30F84, #005CB9)' }}>
                  <Gift className="text-white" size={30} />
                </motion.div>

                <h2 className="text-2xl font-black mb-4" style={{ color: '#E30F84' }}>🎉 You Won!</h2>

                <div className="rounded-2xl p-5 mb-4 border-2 text-left"
                  style={{ background: 'linear-gradient(135deg,#FFF0F8,#EEF5FF)', borderColor: '#E30F84' }}>
                  <p className="text-[10px] font-bold text-gray-400 tracking-widest mb-1">YOUR PRIZE</p>
                  <p className="text-2xl font-black mb-1" style={{ color: '#E30F84' }}>{wonReward.discount}</p>
                  <p className="text-sm text-gray-600 mb-4">{wonReward.description}</p>
                  <div className="bg-white rounded-xl p-3 border-2 border-dashed text-center"
                    style={{ borderColor: '#005CB9' }}>
                    <p className="text-[10px] font-bold text-gray-400 tracking-widest mb-1">COUPON CODE</p>
                    <p className="text-xl font-black tracking-widest" style={{ color: '#005CB9' }}>
                      {wonReward.couponCode}
                    </p>
                  </div>
                  <p className="text-xs text-green-600 font-bold mt-3 text-center">
                    ✓ Saved to your Coupons · Valid {wonReward.validDays} days
                  </p>
                </div>

                <button onClick={onNext}
                  className="w-full py-3.5 rounded-2xl font-black text-white text-base transition-all active:scale-95"
                  style={{
                    background: 'linear-gradient(135deg, #E30F84, #005CB9)',
                    boxShadow: '0 8px 24px rgba(227,15,132,0.4)',
                  }}>
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

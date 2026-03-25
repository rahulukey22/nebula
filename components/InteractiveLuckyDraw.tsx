import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Star, Ticket, Trophy } from 'lucide-react';

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

const PRIZES: LuckyDrawReward[] = [
  { id: 1, name: 'Grand Prize',   couponCode: 'LUCKY50',   discount: '50% OFF',               description: 'Massive 50% off on your entire order!', validDays: 10, icon: '🏆' },
  { id: 2, name: 'First Prize',   couponCode: 'LUCKY35',   discount: '35% OFF',               description: 'Amazing 35% discount on your bill!',     validDays: 7,  icon: '🥇' },
  { id: 3, name: 'Second Prize',  couponCode: 'LUCKY25',   discount: '25% OFF',               description: 'Get 25% off on your order!',            validDays: 7,  icon: '🥈' },
  { id: 4, name: 'Free Sundae',   couponCode: 'SUNDAEFREE',discount: 'Free Premium Sundae',   description: 'Enjoy a premium sundae on us!',          validDays: 5,  icon: '🍨' },
  { id: 5, name: 'Free Cake Slice',couponCode: 'CAKEFREE', discount: 'Free Ice Cream Cake',   description: 'Get a delicious cake slice free!',       validDays: 5,  icon: '🍰' },
  { id: 6, name: 'Lucky Dip',     couponCode: 'LUCKY10',   discount: '10% OFF',               description: 'Save 10% on your next visit!',          validDays: 3,  icon: '🎁' },
];

// Simulated tickets the user has earned
const USER_TICKETS = [
  { number: 'BR-7823', earned: 'Purchase on 18 Mar' },
  { number: 'BR-7824', earned: 'Purchase on 20 Mar' },
  { number: 'BR-7825', earned: 'Referral bonus' },
  { number: 'BR-7826', earned: 'Purchase on 22 Mar' },
  { number: 'BR-7827', earned: 'Birthday reward' },
];

const DRAW_DATE = '31 March 2026';

type Phase = 'entry' | 'drawing' | 'result';

function RaffleTicket({ ticket, index }: { ticket: typeof USER_TICKETS[0]; index: number }) {
  return (
    <motion.div
      initial={{ x: -30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: index * 0.07 }}
      className="flex items-stretch rounded-xl overflow-hidden shadow-md flex-shrink-0"
      style={{ minWidth: 200 }}
    >
      {/* Left stub */}
      <div className="w-10 flex flex-col items-center justify-center gap-1 py-3"
        style={{ background: 'linear-gradient(180deg, #E30F84, #C0006A)' }}>
        <Ticket size={14} className="text-white rotate-90" />
        <div className="flex flex-col gap-0.5">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-1 h-1 rounded-full bg-white opacity-60" />
          ))}
        </div>
      </div>

      {/* Perforation */}
      <div className="w-px flex flex-col justify-between py-2"
        style={{ background: 'repeating-linear-gradient(to bottom, #E30F84 0, #E30F84 4px, transparent 4px, transparent 8px)' }} />

      {/* Ticket body */}
      <div className="flex-1 bg-white px-3 py-2.5 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-bold tracking-widest text-gray-400">BASKIN ROBBINS</span>
          <span className="text-[9px] font-bold text-pink-400">LUCKY DRAW</span>
        </div>
        <p className="font-black text-base tracking-widest" style={{ color: '#005CB9' }}>
          {ticket.number}
        </p>
        <p className="text-[9px] text-gray-400 font-medium">{ticket.earned}</p>
      </div>

      {/* Right stub */}
      <div className="w-px flex flex-col justify-between py-2"
        style={{ background: 'repeating-linear-gradient(to bottom, #E30F84 0, #E30F84 4px, transparent 4px, transparent 8px)' }} />
      <div className="w-8 flex items-center justify-center"
        style={{ background: 'linear-gradient(180deg, #005CB9, #003D82)' }}>
        <span className="text-white text-[9px] font-black rotate-90 whitespace-nowrap tracking-wider">DRAW</span>
      </div>
    </motion.div>
  );
}

function DrawingAnimation() {
  return (
    <div className="flex flex-col items-center gap-6 py-8">
      {/* Drum */}
      <div className="relative w-32 h-32">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-32 h-32 rounded-full border-8 flex items-center justify-center"
          style={{
            borderColor: '#E30F84',
            borderStyle: 'dashed',
            background: 'linear-gradient(135deg, #FFF0F8, #EEF5FF)',
          }}
        >
          <span className="text-4xl">🎰</span>
        </motion.div>

        {/* Flying ticket numbers */}
        {USER_TICKETS.map((t, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              x: [0, (i % 2 === 0 ? 1 : -1) * (40 + i * 8)],
              y: [0, -20 - i * 10],
            }}
            transition={{ duration: 1.2, delay: i * 0.3, repeat: Infinity, repeatDelay: 0.5 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg px-2 py-1 shadow-lg"
            style={{ border: '1.5px solid #E30F84' }}
          >
            <span className="text-[10px] font-black" style={{ color: '#005CB9' }}>{t.number}</span>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-black mb-1" style={{ color: '#005CB9' }}>Drawing Winner…</h2>
        <div className="flex items-center justify-center gap-1">
          {[0, 1, 2].map(i => (
            <motion.div key={i}
              animate={{ scale: [1, 1.6, 1], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 0.8, delay: i * 0.2, repeat: Infinity }}
              className="w-2 h-2 rounded-full"
              style={{ background: '#E30F84' }}
            />
          ))}
        </div>
        <p className="text-gray-500 text-sm mt-2 font-medium">Picking a lucky ticket from the drum…</p>
      </div>
    </div>
  );
}

export function InteractiveLuckyDraw({ onWin, onNext }: InteractiveLuckyDrawProps) {
  const [phase, setPhase]         = useState<Phase>('entry');
  const [wonReward, setWonReward] = useState<LuckyDrawReward | null>(null);
  const [winTicket, setWinTicket] = useState('');

  const handleEnterDraw = () => {
    setPhase('drawing');

    const weights = [5, 10, 20, 25, 25, 15];
    const total   = weights.reduce((a, b) => a + b, 0);
    let rnd = Math.random() * total;
    let idx = 0;
    for (let i = 0; i < weights.length; i++) {
      rnd -= weights[i];
      if (rnd <= 0) { idx = i; break; }
    }

    const reward = PRIZES[idx];
    const ticket = USER_TICKETS[Math.floor(Math.random() * USER_TICKETS.length)];

    setTimeout(() => {
      setWonReward(reward);
      setWinTicket(ticket.number);
      setPhase('result');
      onWin(reward);
    }, 3200);
  };

  return (
    <div
      className="relative w-full min-h-[80vh] overflow-hidden rounded-3xl flex flex-col"
      style={{ background: 'linear-gradient(160deg, #EEF5FF 0%, #FFF0F8 100%)' }}
    >
      {/* Decorative blobs */}
      <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full opacity-15 pointer-events-none"
        style={{ background: '#005CB9' }} />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full opacity-15 pointer-events-none"
        style={{ background: '#E30F84' }} />

      {/* Floating stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div key={i}
            animate={{ opacity: [0.2, 0.7, 0.2], scale: [0.5, 1, 0.5] }}
            transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, delay: i * 0.4 }}
            className="absolute"
            style={{ left: `${10 + i * 9}%`, top: `${10 + (i % 5) * 18}%` }}
          >
            <Star size={10 + (i % 3) * 4} fill="currentColor"
              className={i % 2 === 0 ? 'text-pink-200' : 'text-blue-200'} />
          </motion.div>
        ))}
      </div>

      {/* ── ENTRY PHASE ── */}
      <AnimatePresence mode="wait">
        {phase === 'entry' && (
          <motion.div key="entry"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }}
            className="relative z-10 flex flex-col h-full py-5 px-4 gap-4"
          >
            {/* Header */}
            <div className="flex flex-col items-center gap-1 text-center">
              <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-lg"
                style={{ border: '2.5px solid #005CB9' }}>
                <span className="text-lg">🍦</span>
                <span className="font-black text-xs tracking-wide" style={{ color: '#005CB9' }}>BASKIN ROBBINS</span>
              </div>
              <h1 className="font-black text-3xl leading-tight mt-1" style={{
                background: 'linear-gradient(135deg, #005CB9, #E30F84)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Monthly Lucky Draw
              </h1>
              <p className="text-gray-500 text-sm font-medium">Draw Date: <span className="font-bold text-gray-700">{DRAW_DATE}</span></p>
            </div>

            {/* Ticket count badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mx-auto rounded-2xl px-6 py-4 text-center shadow-xl"
              style={{ background: 'linear-gradient(135deg, #E30F84, #005CB9)', maxWidth: 280 }}
            >
              <p className="text-white text-xs font-bold opacity-80 tracking-widest mb-1">YOU HAVE EARNED</p>
              <div className="flex items-center justify-center gap-2">
                <Ticket size={28} className="text-white" />
                <span className="text-white font-black text-4xl">{USER_TICKETS.length}</span>
              </div>
              <p className="text-white font-bold text-sm opacity-90">Lucky Draw Tickets</p>
              <p className="text-white text-[10px] opacity-70 mt-1">Earned from your recent purchases</p>
            </motion.div>

            {/* Ticket strip */}
            <div>
              <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2 px-1">Your Tickets</p>
              <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
                {USER_TICKETS.map((t, i) => (
                  <RaffleTicket key={t.number} ticket={t} index={i} />
                ))}
              </div>
            </div>

            {/* Prize list */}
            <div>
              <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2 px-1">Prizes Up for Grabs</p>
              <div className="grid grid-cols-3 gap-2">
                {PRIZES.slice(0, 6).map((prize, i) => (
                  <motion.div key={prize.id}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    className="bg-white rounded-xl p-2.5 text-center shadow-sm border"
                    style={{ borderColor: i === 0 ? '#FFD700' : '#F3F4F6' }}
                  >
                    <span className="text-xl">{prize.icon}</span>
                    <p className="text-[10px] font-black mt-0.5 leading-tight"
                      style={{ color: i === 0 ? '#E30F84' : '#374151' }}>
                      {prize.discount}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-auto">
              <motion.button
                onClick={handleEnterDraw}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-2xl font-black text-lg text-white shadow-xl"
                style={{
                  background: 'linear-gradient(135deg, #005CB9, #003D82)',
                  boxShadow: '0 8px 24px rgba(0,92,185,0.45)',
                }}
              >
                <span className="flex items-center justify-center gap-2">
                  <Trophy size={20} />
                  Enter the Draw
                </span>
              </motion.button>
              <p className="text-center text-gray-400 text-xs font-semibold mt-2">
                🎫 All {USER_TICKETS.length} tickets will be entered · Draw on {DRAW_DATE}
              </p>
            </div>
          </motion.div>
        )}

        {/* ── DRAWING PHASE ── */}
        {phase === 'drawing' && (
          <motion.div key="drawing"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 flex flex-col items-center justify-center flex-1 px-6"
          >
            <DrawingAnimation />
          </motion.div>
        )}

        {/* ── RESULT PHASE ── */}
        {phase === 'result' && wonReward && (
          <motion.div key="result"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="relative z-10 flex flex-col items-center justify-center flex-1 px-5 py-6 gap-4"
          >
            {/* Confetti */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(16)].map((_, i) => (
                <motion.div key={i}
                  initial={{ y: -10, opacity: 1 }}
                  animate={{ y: 500, opacity: 0 }}
                  transition={{ duration: 2.5, delay: i * 0.1 }}
                  className="absolute"
                  style={{ left: `${4 + i * 6}%`, top: -10 }}
                >
                  <Sparkles size={14} className={i % 2 === 0 ? 'text-pink-400' : 'text-blue-400'} />
                </motion.div>
              ))}
            </div>

            {/* Win card */}
            <div className="w-full max-w-sm">
              {/* Winning ticket */}
              <motion.div
                initial={{ rotateY: 90 }} animate={{ rotateY: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="rounded-2xl overflow-hidden shadow-2xl mb-5"
                style={{ border: '3px solid #FFD700' }}
              >
                <div className="py-2 text-center text-white font-black text-xs tracking-widest"
                  style={{ background: 'linear-gradient(90deg, #E30F84, #005CB9)' }}>
                  🎉 WINNING TICKET
                </div>
                <div className="bg-white px-5 py-4 text-center">
                  <p className="text-[10px] font-bold text-gray-400 tracking-widest mb-1">TICKET NUMBER</p>
                  <p className="text-3xl font-black tracking-widest" style={{ color: '#005CB9' }}>{winTicket}</p>
                  <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="inline-flex items-center gap-1 mt-2 px-3 py-1 rounded-full"
                    style={{ background: 'linear-gradient(135deg, #FFF0F8, #EEF5FF)', border: '1.5px solid #E30F84' }}
                  >
                    <Star size={12} fill="#E30F84" className="text-pink-500" />
                    <span className="text-xs font-black" style={{ color: '#E30F84' }}>WINNER!</span>
                  </motion.div>
                </div>
              </motion.div>

              {/* Prize card */}
              <motion.div
                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="rounded-2xl p-5 mb-4 border-2"
                style={{ background: 'linear-gradient(135deg,#EEF5FF,#FFF0F8)', borderColor: '#005CB9' }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">{wonReward.icon}</span>
                  <div>
                    <p className="font-black text-lg leading-tight" style={{ color: '#005CB9' }}>{wonReward.name}</p>
                    <p className="text-2xl font-black" style={{ color: '#E30F84' }}>{wonReward.discount}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">{wonReward.description}</p>
                <div className="bg-white rounded-xl p-3 border-2 border-dashed text-center"
                  style={{ borderColor: '#E30F84' }}>
                  <p className="text-[10px] font-bold text-gray-400 tracking-widest mb-1">COUPON CODE</p>
                  <p className="text-xl font-black tracking-widest" style={{ color: '#E30F84' }}>
                    {wonReward.couponCode}
                  </p>
                </div>
                <p className="text-xs text-green-600 font-bold mt-3 text-center">
                  ✓ Saved to your Coupons · Valid {wonReward.validDays} days
                </p>
              </motion.div>

              <motion.button
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                onClick={onNext}
                className="w-full py-4 rounded-2xl font-black text-lg text-white transition-all active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #005CB9, #E30F84)',
                  boxShadow: '0 8px 24px rgba(0,92,185,0.4)',
                }}
              >
                Claim Prize →
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

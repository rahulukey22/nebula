import { Award, Gift, ChevronRight, TrendingUp, Star } from 'lucide-react';
import { Progress } from './ui/progress';

export function LoyaltyTab() {
  return (
    <div className="px-5 py-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Status Card */}
      <div className="bg-[#1a1a1a] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Star className="w-32 h-32" />
        </div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-white/70 text-sm uppercase tracking-wider font-medium">Star Balance</p>
              <h2 className="text-xl font-extrabold mt-1">125 Stars</h2>
            </div>
            <div className="bg-[#000000] px-3 py-1 rounded-full border border-white/10">
              <span className="text-sm font-semibold">Gold Level</span>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-white/90 font-medium">125 Stars</span>
              <span className="text-white/60">Reward at 150</span>
            </div>
            <Progress value={83} className="h-2 bg-white/20" indicatorClassName="bg-[#CBA258]" />
          </div>

          <p className="text-sm text-white/60">
            Earn 25 more Stars to unlock a <span className="text-[#CBA258] font-medium">Free Drink</span>!
          </p>
        </div>
      </div>

      {/* Benefits */}
      <div>
        <h3 className="font-bold text-base mb-4">Your Benefits</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm flex flex-col items-center text-center gap-2">
            <div className="w-10 h-10 rounded-full bg-[#000000]/10 flex items-center justify-center text-[#000000]">
              <Gift className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium">Birthday Reward</span>
          </div>
          <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm flex flex-col items-center text-center gap-2">
            <div className="w-10 h-10 rounded-full bg-[#000000]/10 flex items-center justify-center text-[#000000]">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium">Double Star Day</span>
          </div>
        </div>
      </div>

      {/* History */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-base">Star History</h3>
          <button className="text-sm text-gray-500 flex items-center gap-1">
            View All <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {[
            { title: 'Purchase at Zudio', date: '12 Jan 2025', points: '+24', type: 'credit' },
            { title: 'Redeemed Reward', date: '05 Jan 2025', points: '-150', type: 'debit' },
            { title: 'Double Star Day Bonus', date: '28 Dec 2024', points: '+15', type: 'credit' },
          ].map((item, i) => (
            <div key={i} className="p-4 flex items-center justify-between border-b border-gray-100 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#000000]/10 text-[#000000]">
                  {item.type === 'credit' ? <Star className="w-4 h-4" /> : <Gift className="w-4 h-4" />}
                </div>
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.date}</p>
                </div>
              </div>
              <span className="text-sm font-semibold text-[#101828]">
                {item.points} Stars
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
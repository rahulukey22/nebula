import { Coffee, ChevronRight, Calendar, MapPin } from 'lucide-react';

const orders = [
  {
    id: 'ORD-2025-001',
    store: 'Zudio - 1st & Pike',
    location: 'Seattle, WA',
    date: '12 Jan 2025',
    time: '08:15 AM',
    items: 2,
    amount: '12.45',
    status: 'Mobile Order'
  },
  {
    id: 'ORD-2025-002',
    store: 'Zudio - University Village',
    location: 'Seattle, WA',
    date: '10 Jan 2025',
    time: '02:30 PM',
    items: 3,
    amount: '18.75',
    status: 'In Store'
  },
  {
    id: 'ORD-2025-003',
    store: 'Zudio - Capitol Hill',
    location: 'Seattle, WA',
    date: '05 Jan 2025',
    time: '09:45 AM',
    items: 1,
    amount: '5.95',
    status: 'Delivery'
  }
];

export function HistoryTab() {
  return (
    <div className="px-5 py-6 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {orders.map((order) => (
        <div key={order.id} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:border-[#000000]/20 transition-colors cursor-pointer group">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#000000]/10 rounded-full flex items-center justify-center text-[#000000]">
                <Coffee className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm group-hover:text-[#000000] transition-colors">{order.store}</h3>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {order.location}
                </p>
              </div>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
              order.status === 'Mobile Order' ? 'bg-[#000000]/10 text-[#000000]' : 
              order.status === 'In Store' ? 'bg-gray-100 text-gray-600' : 
              'bg-orange-50 text-orange-600'
            }`}>
              {order.status}
            </span>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3 ml-10">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{order.date}</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-gray-300" />
            <span>{order.items} Items</span>
          </div>

          <div className="flex justify-between items-center pt-3 border-t border-gray-100 ml-10">
            <div>
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-base font-bold">${order.amount}</p>
            </div>
            <button className="text-sm font-medium flex items-center gap-1 text-[#000000] hover:gap-2 transition-all">
              View Receipt <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
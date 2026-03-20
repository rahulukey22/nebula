import { ChevronRight, Clock, CheckCircle2, AlertCircle, MessageSquare } from 'lucide-react';
import { cn } from './ui/utils';

export type TicketStatus = 'open' | 'in-progress' | 'resolved' | 'closed';
export type TicketCategory = 'return' | 'exchange' | 'billing' | 'product' | 'feedback' | 'other';

export interface Ticket {
  id: string;
  title: string;
  category: TicketCategory;
  status: TicketStatus;
  createdAt: string;
  lastMessage: string;
  unreadCount: number;
  invoiceNo?: string;
}

interface TicketListProps {
  tickets: Ticket[];
  onTicketClick: (ticket: Ticket) => void;
}

const statusConfig: Record<TicketStatus, { label: string; color: string; bgColor: string; dotColor: string }> = {
  'open': { 
    label: 'Open', 
    color: 'text-[#B54708]', 
    bgColor: 'bg-[#FFFAEB]', 
    dotColor: 'bg-[#F79009]' 
  },
  'in-progress': { 
    label: 'In Progress', 
    color: 'text-[#1849A9]', 
    bgColor: 'bg-[#EFF8FF]', 
    dotColor: 'bg-[#2E90FA]' 
  },
  'resolved': { 
    label: 'Resolved', 
    color: 'text-[#027A48]', 
    bgColor: 'bg-[#ECFDF3]', 
    dotColor: 'bg-[#12B76A]' 
  },
  'closed': { 
    label: 'Closed', 
    color: 'text-[#475467]', 
    bgColor: 'bg-[#F2F4F7]', 
    dotColor: 'bg-[#98A2B3]' 
  }
};

const categoryConfig: Record<TicketCategory, { label: string; icon: string }> = {
  'return': { label: 'Return', icon: '↩️' },
  'exchange': { label: 'Exchange', icon: '🔄' },
  'billing': { label: 'Billing', icon: '💰' },
  'product': { label: 'Product', icon: '🍦' },
  'feedback': { label: 'Feedback', icon: '⭐' },
  'other': { label: 'Other', icon: '💬' }
};

export function TicketList({ tickets, onTicketClick }: TicketListProps) {
  if (tickets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <MessageSquare className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-gray-500 text-center mb-1">No support tickets yet</p>
        <p style={{ fontSize: 'var(--text-sm)' }} className="text-gray-400 text-center">Create a ticket to get help with your order</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tickets.map((ticket) => {
        const statusStyle = statusConfig[ticket.status] || statusConfig['open'];
        const categoryInfo = categoryConfig[ticket.category] || categoryConfig['other'];

        return (
          <button
            key={ticket.id}
            onClick={() => onTicketClick(ticket)}
            className="w-full bg-white p-4 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-base">{categoryInfo.icon}</span>
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)' }} className="text-[#667085] uppercase tracking-wider">
                  {categoryInfo.label}
                </span>
              </div>
              <div className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-semibold",
                statusStyle.bgColor,
                statusStyle.color
              )}
              style={{ fontSize: 'var(--text-xs)' }}
              >
                <div className={cn("w-1.5 h-1.5 rounded-full", statusStyle.dotColor)}></div>
                {statusStyle.label}
              </div>
            </div>

            <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-bold)' }} className="text-[#101828] mb-2 text-left line-clamp-1">
              {ticket.title}
            </h3>

            <p style={{ fontSize: 'var(--text-sm)' }} className="text-[#667085] mb-3 text-left line-clamp-2">
              {ticket.lastMessage}
            </p>

            <div className="flex items-center justify-between">
              <div style={{ fontSize: 'var(--text-xs)' }} className="flex items-center gap-4 text-[#98A2B3]">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {ticket.createdAt}
                </span>
                {ticket.invoiceNo && (
                  <span style={{ fontWeight: 'var(--font-weight-medium)' }}>#{ticket.invoiceNo}</span>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                {ticket.unreadCount > 0 && (
                  <div style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-bold)' }} className="bg-red-500 text-white px-2 py-0.5 rounded-full min-w-[20px] text-center">
                    {ticket.unreadCount}
                  </div>
                )}
                <ChevronRight className="w-4 h-4 text-[#99A1AF]" />
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
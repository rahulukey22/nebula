import { Phone, Mail, MessageCircle, ChevronRight, ArrowLeft, Ticket as TicketIcon, Plus, Globe } from 'lucide-react';
import { useState } from 'react';
import { TicketList } from './TicketList';
import { TicketConversation } from './TicketConversation';
import { CreateTicket } from './CreateTicket';
import { toast } from 'sonner';
import type { Ticket, TicketCategory } from './TicketList';
import type { Message } from './TicketConversation';
import { useLanguage } from '../utils/LanguageContext';

interface SupportPageProps {
  onBack?: () => void;
}

type ViewMode = 'main' | 'tickets' | 'conversation' | 'create';

// Mock ticket data
const mockTickets: Ticket[] = [
  {
    id: 'TKT-001',
    title: 'In-Store Issue - Incorrect order served at counter',
    category: 'product',
    status: 'in-progress',
    createdAt: 'Yesterday',
    lastMessage: 'We are looking into the mix-up at our Phoenix MarketCity store...',
    unreadCount: 2,
    invoiceNo: '00989'
  },
  {
    id: 'TKT-002',
    title: 'Store Experience - Long wait time at billing counter',
    category: 'feedback',
    status: 'open',
    createdAt: '2 days ago',
    lastMessage: 'Waited over 20 minutes at the Andheri store just to place my order',
    unreadCount: 0,
    invoiceNo: '00845'
  },
  {
    id: 'TKT-003',
    title: 'In-Store Issue - Ice cream cake pickup had wrong decoration',
    category: 'product',
    status: 'resolved',
    createdAt: 'Last week',
    lastMessage: 'Thank you for bringing this to our attention!',
    unreadCount: 0,
    invoiceNo: '00722'
  }
];

const mockMessages: Record<string, Message[]> = {
  'TKT-001': [
    {
      id: 'msg-1',
      content: 'Hi, I visited the Phoenix MarketCity store today and ordered a Chocolate Fudge Sundae, but they served me a Butterscotch one instead. The staff didn\'t seem to care when I pointed it out.',
      sender: 'user',
      timestamp: 'Yesterday, 2:30 PM'
    },
    {
      id: 'msg-2',
      content: 'Hello! We sincerely apologize for the mix-up at our store. That is not the experience we want for our customers. Could you please share your receipt or invoice number so we can follow up with the store team?',
      sender: 'support',
      timestamp: 'Yesterday, 2:45 PM'
    },
    {
      id: 'msg-3',
      content: 'Sure, the invoice number is #00989. I visited around 2 PM today.',
      sender: 'user',
      timestamp: 'Yesterday, 3:00 PM'
    },
    {
      id: 'msg-4',
      content: 'Thank you! We\'ve flagged this with the store manager. Please visit any Baskin Robbins store and show this ticket ID for a complimentary sundae of your choice. We\'ve also added a coupon to your account.',
      sender: 'support',
      timestamp: 'Yesterday, 3:15 PM'
    }
  ],
  'TKT-002': [
    {
      id: 'msg-1',
      content: 'I visited the Andheri West store and had to wait over 20 minutes at the billing counter even though there were only 2 people ahead of me. Only one staff member was handling the entire counter. Very frustrating experience.',
      sender: 'user',
      timestamp: '2 days ago, 11:20 AM'
    }
  ],
  'TKT-003': [
    {
      id: 'msg-1',
      content: 'I pre-ordered an ice cream cake for my daughter\'s birthday for pickup at the Kurla store. When I picked it up, the name was spelled wrong and the decoration looked rushed and messy.',
      sender: 'user',
      timestamp: 'Last week, 4:00 PM'
    },
    {
      id: 'msg-2',
      content: 'We sincerely apologize for this experience. We take our cake orders very seriously, especially for special occasions. We\'ve issued a full refund and a complimentary cake coupon for your next order. The store manager will also personally follow up with you.',
      sender: 'support',
      timestamp: 'Last week, 4:30 PM'
    }
  ]
};

export function SupportPage({ onBack }: SupportPageProps) {
  const { t } = useLanguage();
  const [viewMode, setViewMode] = useState<ViewMode>('main');
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [messages, setMessages] = useState<Record<string, Message[]>>(mockMessages);

  const handleTicketClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setViewMode('conversation');
    // Mark as read
    setTickets(tickets.map(t => 
      t.id === ticket.id ? { ...t, unreadCount: 0 } : t
    ));
  };

  const handleSendMessage = (content: string, attachments: File[]) => {
    if (!selectedTicket) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      content,
      sender: 'user',
      timestamp: 'Just now',
      attachments: attachments.map(f => ({ name: f.name, url: '', type: 'image' }))
    };

    setMessages({
      ...messages,
      [selectedTicket.id]: [...(messages[selectedTicket.id] || []), newMessage]
    });

    // Update last message in ticket
    setTickets(tickets.map(t =>
      t.id === selectedTicket.id
        ? { ...t, lastMessage: content || '📎 Sent an attachment' }
        : t
    ));

    toast.success(t('messageSent'));
  };

  const handleCreateTicket = (data: {
    title: string;
    category: TicketCategory;
    description: string;
    invoiceNo?: string;
    attachments: File[];
  }) => {
    const newTicket: Ticket = {
      id: `TKT-${String(tickets.length + 1).padStart(3, '0')}`,
      title: data.title,
      category: data.category,
      status: 'open',
      createdAt: 'Just now',
      lastMessage: data.description,
      unreadCount: 0,
      invoiceNo: data.invoiceNo
    };

    const initialMessage: Message = {
      id: 'msg-1',
      content: data.description,
      sender: 'user',
      timestamp: 'Just now',
      attachments: data.attachments.map(f => ({ name: f.name, url: '', type: 'image' }))
    };

    setTickets([newTicket, ...tickets]);
    setMessages({ ...messages, [newTicket.id]: [initialMessage] });
    setViewMode('tickets');
    toast.success(t('ticketCreatedSuccess'));
  };

  // Show conversation view
  if (viewMode === 'conversation' && selectedTicket) {
    return (
      <TicketConversation
        ticket={selectedTicket}
        messages={messages[selectedTicket.id] || []}
        onBack={() => setViewMode('tickets')}
        onSendMessage={handleSendMessage}
      />
    );
  }

  // Show create ticket view
  if (viewMode === 'create') {
    return (
      <CreateTicket
        onBack={() => setViewMode('tickets')}
        onSubmit={handleCreateTicket}
      />
    );
  }

  // Show tickets list view
  if (viewMode === 'tickets') {
    return (
      <div className="bg-gray-50 min-h-screen pb-24">
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 px-4 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <button 
              onClick={() => setViewMode('main')}
              className="p-1 -ml-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-[#101828]" />
            </button>
            <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-weight-bold)' }} className="text-[#101828]">{t('myTickets')}</h1>
          </div>
          <button
            onClick={() => setViewMode('create')}
            className="w-full bg-[#000000] text-white py-3 rounded-xl flex items-center justify-center gap-2 font-semibold hover:bg-[#1a1a1a] transition-colors"
          >
            <Plus className="w-5 h-5" />
            Create New Ticket
          </button>
        </div>

        {/* Tickets List */}
        <div className="px-4 py-6">
          <TicketList tickets={tickets} onTicketClick={handleTicketClick} />
        </div>
      </div>
    );
  }

  // Main support view
  return (
    <div className="bg-white min-h-screen pb-24 max-w-[430px] w-full mx-auto relative">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 px-4 py-4 flex items-center gap-3 border-b border-gray-100">
        <button 
          onClick={onBack}
          className="p-1 -ml-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-[#101828]" />
        </button>
        <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-weight-bold)' }} className="text-[#101828]">{t('navSupport')}</h1>
      </div>

      {/* Content */}
      <div className="sm:px-[15px] px-3 py-6">
        <p style={{ fontSize: 'var(--text-sm)' }} className="text-[#667085] mb-6">
          {t('supportTitle')}
        </p>

        <div className="space-y-4">
          {/* My Tickets Card */}
          <div className="bg-white p-5 rounded-[20px] border border-[#dbdbdb] shadow-[0px_4px_15px_0px_rgba(0,0,0,0.05)]">
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-bold)' }} className="text-[#101828]">My Support Tickets</h3>
              {tickets.filter(t => t.unreadCount > 0).length > 0 && (
                <div style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-bold)' }} className="bg-red-500 text-white px-2.5 py-1 rounded-full">
                  {tickets.filter(t => t.unreadCount > 0).length} new
                </div>
              )}
            </div>
            
            <button 
              onClick={() => setViewMode('tickets')}
              className="w-full bg-[#F9FAFB] border border-[#EAECF0] p-3 rounded-[10px] flex items-center justify-between transition-colors hover:bg-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white border border-[#EAECF0] flex items-center justify-center">
                  <TicketIcon className="w-4 h-4 text-[#4A5565]" />
                </div>
                <div className="text-left">
                  <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }} className="text-[#101828]">{t('viewAllTickets')}</p>
                  <p style={{ fontSize: 'var(--text-sm)' }} className="text-[#667085]">{tickets.length} total tickets</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#99A1AF]" />
            </button>
          </div>

          {/* Customer Support Card */}
          <div className="bg-white p-5 rounded-[20px] border border-[#dbdbdb] shadow-[0px_4px_15px_0px_rgba(0,0,0,0.05)]">
            <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-bold)' }} className="text-[#101828] mb-4">Customer Support</h3>
            
            <div className="space-y-3">
              <button className="w-full bg-[#F9FAFB] border border-[#EAECF0] p-3 rounded-[10px] flex items-center justify-between transition-colors hover:bg-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white border border-[#EAECF0] flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-[#4A5565]" />
                  </div>
                  <div className="text-left">
                    <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }} className="text-[#101828]">{t('chatWithUs')}</p>
                    <p style={{ fontSize: 'var(--text-sm)' }} className="text-[#667085]">24/7 assistance</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#99A1AF]" />
              </button>

              <button className="w-full bg-[#F9FAFB] border border-[#EAECF0] p-3 rounded-[10px] flex items-center justify-between transition-colors hover:bg-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white border border-[#EAECF0] flex items-center justify-center">
                    <Mail className="w-4 h-4 text-[#4A5565]" />
                  </div>
                  <div className="text-left">
                    <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }} className="text-[#101828]">{t('emailUs')}</p>
                    <p style={{ fontSize: 'var(--text-sm)' }} className="text-[#667085]">customercare@baskinrobbins.in</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#99A1AF]" />
              </button>

              <button className="w-full bg-[#F9FAFB] border border-[#EAECF0] p-3 rounded-[10px] flex items-center justify-between transition-colors hover:bg-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white border border-[#EAECF0] flex items-center justify-center">
                    <Phone className="w-4 h-4 text-[#4A5565]" />
                  </div>
                  <div className="text-left">
                    <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }} className="text-[#101828]">{t('callUs')}</p>
                    <p style={{ fontSize: 'var(--text-sm)' }} className="text-[#667085]">022-6251-3131</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#99A1AF]" />
              </button>

              <button className="w-full bg-[#F9FAFB] border border-[#EAECF0] p-3 rounded-[10px] flex items-center justify-between transition-colors hover:bg-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white border border-[#EAECF0] flex items-center justify-center">
                    <Globe className="w-4 h-4 text-[#4A5565]" />
                  </div>
                  <div className="text-left">
                    <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }} className="text-[#101828]">Visit Website</p>
                    <a href="https://baskinrobbinsindia.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: 'var(--text-sm)' }} className="text-[#000000] hover:underline">baskinrobbinsindia.com</a>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#99A1AF]" />
              </button>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white p-5 rounded-[20px] border border-[#dbdbdb] shadow-[0px_4px_15px_0px_rgba(0,0,0,0.05)]">
            <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-bold)' }} className="text-[#101828] mb-4">Frequently Asked Questions</h3>
            
            <div className="space-y-3">
              <button className="w-full text-left bg-[#F9FAFB] border border-[#EAECF0] p-3 rounded-[10px] hover:bg-gray-100">
                <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }} className="text-[#101828] mb-1">How do I earn and redeem Stars?</p>
                <p style={{ fontSize: 'var(--text-sm)' }} className="text-[#667085]">Learn about Baskin Robbins Rewards</p>
              </button>

              <button className="w-full text-left bg-[#F9FAFB] border border-[#EAECF0] p-3 rounded-[10px] hover:bg-gray-100">
                <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }} className="text-[#101828] mb-1">What is your refund policy?</p>
                <p style={{ fontSize: 'var(--text-sm)' }} className="text-[#667085]">View refund & replacement guidelines</p>
              </button>

              <button className="w-full text-left bg-[#F9FAFB] border border-[#EAECF0] p-3 rounded-[10px] hover:bg-gray-100">
                <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }} className="text-[#101828] mb-1">How do I find my nearest store?</p>
                <p style={{ fontSize: 'var(--text-sm)' }} className="text-[#667085]">Baskin Robbins store locator</p>
              </button>
            </div>
          </div>

          {/* Business Hours */}
          <div className="bg-white p-5 rounded-[20px] border border-[#dbdbdb] shadow-[0px_4px_15px_0px_rgba(0,0,0,0.05)]">
            <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-bold)' }} className="text-[#101828] mb-4">Customer Care Hours</h3>
            
            <div className="space-y-2" style={{ fontSize: 'var(--text-sm)' }}>
              <div className="flex justify-between">
                <span className="text-[#667085]">Monday - Friday</span>
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }} className="text-[#101828]">10:00 AM - 11:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#667085]">Saturday - Sunday</span>
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }} className="text-[#101828]">10:00 AM - 11:00 PM</span>
              </div>
            </div>
          </div>

          {/* Company Information */}
          <div className="bg-gradient-to-br from-[#000000]/5 to-white p-5 rounded-[20px] border border-[#000000]/20 shadow-[0px_4px_15px_0px_rgba(0,0,0,0.05)]">
            <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-bold)' }} className="text-[#101828] mb-4">Company Information</h3>
            
            <div className="space-y-3" style={{ fontSize: 'var(--text-sm)' }}>
              <div>
                <p className="text-[#667085] mb-1">Company Name</p>
                <p style={{ fontWeight: 'var(--font-weight-medium)' }} className="text-[#101828]">Baskin Robbins India (Graviss Foods Pvt. Ltd.)</p>
              </div>
              <div>
                <p className="text-[#667085] mb-1">CIN</p>
                <p style={{ fontWeight: 'var(--font-weight-medium)' }} className="text-[#101828] font-mono text-xs">U15209MH1992PTC066aborz</p>
              </div>
              <div className="pt-2 border-t border-[#000000]/10">
                <p className="text-[#667085] text-xs italic leading-relaxed">
                  "Making people happy with 31 flavors of ice cream – one scoop at a time."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
}

export default SupportPage;
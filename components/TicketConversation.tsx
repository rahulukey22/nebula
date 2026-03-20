import { ArrowLeft, Send, Paperclip, X, Image as ImageIcon } from 'lucide-react';
import { useState, useRef } from 'react';
import { cn } from './ui/utils';
import type { Ticket, TicketStatus } from './TicketList';

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'support';
  timestamp: string;
  attachments?: { name: string; url: string; type: string }[];
}

interface TicketConversationProps {
  ticket: Ticket;
  messages: Message[];
  onBack: () => void;
  onSendMessage: (content: string, attachments: File[]) => void;
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

export function TicketConversation({ ticket, messages, onBack, onSendMessage }: TicketConversationProps) {
  const [messageText, setMessageText] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const statusStyle = statusConfig[ticket.status];

  const handleSend = () => {
    if (messageText.trim() || attachments.length > 0) {
      onSendMessage(messageText, attachments);
      setMessageText('');
      setAttachments([]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments([...attachments, ...Array.from(e.target.files)]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const isTicketActive = ticket.status === 'open' || ticket.status === 'in-progress';

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-3">
          <button 
            onClick={onBack}
            className="p-1 -ml-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-[#101828]" />
          </button>
          <div className="flex-1">
            <h1 style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-bold)' }} className="text-[#101828] line-clamp-1">{ticket.title}</h1>
            <p style={{ fontSize: 'var(--text-xs)' }} className="text-[#667085]">Ticket #{ticket.id}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold",
            statusStyle.bgColor,
            statusStyle.color
          )}
          style={{ fontSize: 'var(--text-xs)' }}
          >
            <div className={cn("w-1.5 h-1.5 rounded-full", statusStyle.dotColor)}></div>
            {statusStyle.label}
          </div>
          {ticket.invoiceNo && (
            <span style={{ fontSize: 'var(--text-xs)' }} className="text-[#667085]">Invoice #{ticket.invoiceNo}</span>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex",
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            <div
              className={cn(
                "max-w-[80%] rounded-2xl px-4 py-3",
                message.sender === 'user'
                  ? 'bg-[#000000] text-white rounded-br-md'
                  : 'bg-white border border-gray-200 rounded-bl-md'
              )}
            >
              {message.sender === 'support' && (
                <p 
                  style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)' }}
                  className={cn("mb-1", 
                    message.sender === 'user' ? 'text-gray-300' : 'text-[#667085]'
                  )}
                >
                  Baskin Robbins Support
                </p>
              )}
              <p 
                style={{ fontSize: 'var(--text-sm)' }}
                className={cn(
                  "whitespace-pre-wrap",
                  message.sender === 'user' ? 'text-white' : 'text-[#101828]'
                )}
              >
                {message.content}
              </p>
              
              {message.attachments && message.attachments.length > 0 && (
                <div className="mt-2 space-y-2">
                  {message.attachments.map((attachment, idx) => (
                    <div 
                      key={idx} 
                      style={{ fontSize: 'var(--text-xs)' }}
                      className={cn(
                        "flex items-center gap-2 p-2 rounded-lg",
                        message.sender === 'user' ? 'bg-white/10' : 'bg-gray-50'
                      )}
                    >
                      <ImageIcon className="w-4 h-4" />
                      <span className="truncate flex-1">{attachment.name}</span>
                    </div>
                  ))}
                </div>
              )}
              
              <p 
                style={{ fontSize: 'var(--text-xs)' }}
                className={cn(
                  "mt-1",
                  message.sender === 'user' ? 'text-gray-300' : 'text-[#98A2B3]'
                )}
              >
                {message.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      {isTicketActive ? (
        <div className="bg-white border-t border-gray-200 px-4 py-4">
          {/* Attachments Preview */}
          {attachments.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {attachments.map((file, idx) => (
                <div key={idx} style={{ fontSize: 'var(--text-xs)' }} className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
                  <ImageIcon className="w-4 h-4 text-gray-600" />
                  <span className="truncate max-w-[120px]">{file.name}</span>
                  <button
                    onClick={() => removeAttachment(idx)}
                    className="ml-1 p-0.5 hover:bg-gray-200 rounded"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-end gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors flex-shrink-0"
            >
              <Paperclip className="w-5 h-5 text-gray-600" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            
            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Type your message..."
              style={{ fontSize: 'var(--text-sm)' }}
              className="flex-1 bg-gray-100 border-0 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-[#000000]/5 resize-none min-h-[44px] max-h-[120px]"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            
            <button
              onClick={handleSend}
              disabled={!messageText.trim() && attachments.length === 0}
              className="p-2.5 rounded-xl bg-[#000000] text-white hover:bg-[#1a1a1a] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex-shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-gray-100 border-t border-gray-200 px-4 py-4 text-center">
          <p style={{ fontSize: 'var(--text-sm)' }} className="text-[#667085]">
            This ticket is {ticket.status}. No further messages can be sent.
          </p>
        </div>
      )}
    </div>
  );
}
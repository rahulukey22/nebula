import { ArrowLeft, X, Image as ImageIcon } from 'lucide-react';
import { useState, useRef } from 'react';
import type { TicketCategory } from './TicketList';

interface CreateTicketProps {
  onBack: () => void;
  onSubmit: (data: {
    title: string;
    category: TicketCategory;
    description: string;
    invoiceNo?: string;
    attachments: File[];
  }) => void;
}

const categories: { value: TicketCategory; label: string; icon: string; description: string }[] = [
  { value: 'return', label: 'Return/Refund', icon: '↩️', description: 'Request a refund for your order' },
  { value: 'exchange', label: 'Replacement', icon: '🔄', description: 'Replace a wrong or melted item' },
  { value: 'billing', label: 'Billing Issue', icon: '💰', description: 'Invoice or payment problem' },
  { value: 'product', label: 'Product Issue', icon: '🍦', description: 'Wrong flavor, melted, or quality concern' },
  { value: 'feedback', label: 'Feedback', icon: '⭐', description: 'Share your experience' },
  { value: 'other', label: 'Other', icon: '💬', description: 'General inquiry' }
];

export function CreateTicket({ onBack, onSubmit }: CreateTicketProps) {
  const [selectedCategory, setSelectedCategory] = useState<TicketCategory | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [invoiceNo, setInvoiceNo] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments([...attachments, ...Array.from(e.target.files)]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (selectedCategory && title.trim() && description.trim()) {
      onSubmit({
        title,
        category: selectedCategory,
        description,
        invoiceNo: invoiceNo || undefined,
        attachments
      });
    }
  };

  const isFormValid = selectedCategory && title.trim() && description.trim();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 px-4 py-4 flex items-center gap-3 border-b border-gray-100">
        <button 
          onClick={onBack}
          className="p-1 -ml-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-[#101828]" />
        </button>
        <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-weight-bold)' }} className="text-[#101828]">Create Support Ticket</h1>
      </div>

      {/* Form */}
      <div className="px-4 py-6 pb-24 space-y-6">
        {/* Category Selection */}
        <div>
          <label style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }} className="block text-[#344054] mb-3">
            Select Issue Type <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`p-4 rounded-2xl border-2 transition-all text-left ${
                  selectedCategory === cat.value
                    ? 'border-black bg-gray-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-2">{cat.icon}</div>
                <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }} className="text-[#101828] mb-1">{cat.label}</p>
                <p style={{ fontSize: 'var(--text-xs)' }} className="text-[#667085]">{cat.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Invoice Number (Optional) */}
        <div>
          <label style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }} className="block text-[#344054] mb-2">
            Invoice Number (Optional)
          </label>
          <input
            type="text"
            value={invoiceNo}
            onChange={(e) => setInvoiceNo(e.target.value)}
            placeholder="e.g., 00989"
            style={{ fontSize: 'var(--text-sm)' }}
            className="w-full bg-[#F9FAFB] border border-[#EAECF0] px-4 py-3 rounded-xl outline-none focus:border-black transition-colors"
          />
        </div>

        {/* Title */}
        <div>
          <label style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }} className="block text-[#344054] mb-2">
            Subject <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Brief description of your issue"
            style={{ fontSize: 'var(--text-sm)' }}
            className="w-full bg-[#F9FAFB] border border-[#EAECF0] px-4 py-3 rounded-xl outline-none focus:border-black transition-colors"
          />
        </div>

        {/* Description */}
        <div>
          <label style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }} className="block text-[#344054] mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide details about your issue..."
            rows={5}
            style={{ fontSize: 'var(--text-sm)' }}
            className="w-full bg-[#F9FAFB] border border-[#EAECF0] px-4 py-3 rounded-xl outline-none focus:border-black transition-colors resize-none"
          />
        </div>

        {/* Attachments */}
        <div>
          <label style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }} className="block text-[#344054] mb-2">
            Attachments (Optional)
          </label>
          <button
            onClick={() => fileInputRef.current?.click()}
            style={{ fontSize: 'var(--text-sm)' }}
            className="w-full bg-[#F9FAFB] border-2 border-dashed border-[#EAECF0] px-4 py-6 rounded-xl text-[#667085] hover:border-gray-300 transition-colors flex flex-col items-center justify-center gap-2"
          >
            <ImageIcon className="w-8 h-8 text-gray-400" />
            <span>Tap to upload images</span>
            <span style={{ fontSize: 'var(--text-xs)' }}>PNG, JPG up to 10MB</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          {attachments.length > 0 && (
            <div className="mt-3 space-y-2">
              {attachments.map((file, idx) => (
                <div key={idx} className="flex items-center justify-between bg-gray-100 px-4 py-3 rounded-xl">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <ImageIcon className="w-5 h-5 text-gray-600 flex-shrink-0" />
                    <span style={{ fontSize: 'var(--text-sm)' }} className="truncate">{file.name}</span>
                    <span style={{ fontSize: 'var(--text-xs)' }} className="text-gray-500 flex-shrink-0">
                      {(file.size / 1024).toFixed(1)} KB
                    </span>
                  </div>
                  <button
                    onClick={() => removeAttachment(idx)}
                    className="ml-2 p-1 hover:bg-gray-200 rounded-lg flex-shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4">
        <button
          onClick={handleSubmit}
          disabled={!isFormValid}
          style={{ fontWeight: 'var(--font-weight-semibold)' }}
          className="w-full bg-[#000000] text-white py-3.5 rounded-xl disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors hover:bg-[#1a1a1a]"
        >
          Submit Ticket
        </button>
      </div>
    </div>
  );
}
import { BadgeCheck } from 'lucide-react';

export function VerifiedBadge() {
  return (
    <div className="inline-flex items-center justify-center">
      <div className="relative w-[18px] h-[18px] bg-[#000000] rounded-full flex items-center justify-center border-2 border-white shadow-sm">
        <svg 
          viewBox="0 0 24 24" 
          className="w-3 h-3 text-white fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
        </svg>
      </div>
    </div>
  );
}
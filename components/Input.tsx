import React from 'react';
import { LucideIcon } from 'lucide-react';

interface TextInputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  icon?: LucideIcon;
  type?: string;
}

export const TextInput: React.FC<TextInputProps> = ({ label, value, onChange, placeholder, icon: Icon, type = 'text' }) => (
  <div className="mb-4">
    <label className="block text-slate-700 text-sm font-semibold mb-2">{label}</label>
    <div className="relative">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
          <Icon size={18} />
        </div>
      )}
      <input
        type={type}
        className={`w-full bg-white border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 block p-3 ${Icon ? 'pl-10' : ''} transition-all`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  </div>
);

interface RatingInputProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  max?: number;
}

export const RatingInput: React.FC<RatingInputProps> = ({ label, value, onChange, max = 5 }) => {
  return (
    <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
      <label className="block text-slate-800 font-semibold mb-3">{label}</label>
      <div className="flex justify-between items-center max-w-sm">
        {[...Array(max)].map((_, i) => {
          const ratingValue = i + 1;
          const isSelected = ratingValue <= value;
          return (
            <button
              key={i}
              type="button"
              onClick={() => onChange(ratingValue)}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-all transform hover:scale-110 focus:outline-none
                ${isSelected 
                  ? 'bg-amber-500 text-white shadow-md shadow-amber-200' 
                  : 'bg-white text-slate-300 border border-slate-200'
                }`}
            >
              {ratingValue}
            </button>
          );
        })}
      </div>
      <div className="flex justify-between text-xs text-slate-400 mt-2 max-w-sm px-1">
        <span>Poor</span>
        <span>Excellent</span>
      </div>
    </div>
  );
};

interface TextAreaProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  onPolish?: () => void;
  isPolishing?: boolean;
}

export const TextArea: React.FC<TextAreaProps> = ({ label, value, onChange, placeholder, onPolish, isPolishing }) => (
  <div className="mb-6">
    <div className="flex justify-between items-end mb-2">
      <label className="block text-slate-700 text-sm font-semibold">{label}</label>
      {onPolish && value.length > 10 && (
        <button 
          onClick={onPolish}
          disabled={isPolishing}
          className="text-xs flex items-center gap-1 text-amber-600 hover:text-amber-700 font-medium disabled:opacity-50"
        >
          {isPolishing ? (
            <span className="animate-pulse">Polishing with AI...</span>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z"/><path d="m14 7 3 3"/><path d="M5 6v4"/><path d="M19 14v4"/><path d="M10 22h4"/><path d="m5 18 3-3"/></svg>
              Polish Professional Tone
            </>
          )}
        </button>
      )}
    </div>
    <textarea
      className="w-full bg-white border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 block p-3 min-h-[120px] transition-all"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);
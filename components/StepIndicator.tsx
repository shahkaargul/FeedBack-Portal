import React from 'react';
import { Step } from '../types';

interface StepIndicatorProps {
  currentStep: Step;
  totalSteps: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  // Don't show on welcome or success
  if (currentStep === Step.WELCOME || currentStep === Step.SUCCESS) return null;

  // Steps 1 to 5 are actual form steps
  const activeStep = currentStep;
  const steps = [1, 2, 3, 4, 5];

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex justify-between items-center relative">
        {/* Background Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 rounded"></div>
        
        {/* Active Line */}
        <div 
          className="absolute top-1/2 left-0 h-1 bg-amber-500 -z-10 rounded transition-all duration-500 ease-in-out"
          style={{ width: `${((activeStep - 1) / (steps.length - 1)) * 100}%` }}
        ></div>

        {steps.map((s) => (
          <div 
            key={s}
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-2
              ${s <= activeStep 
                ? 'bg-slate-900 border-amber-500 text-white shadow-lg scale-110' 
                : 'bg-white border-gray-300 text-gray-400'
              }`}
          >
            {s}
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2 text-xs font-medium text-slate-500 uppercase tracking-wider">
        <span>Identity</span>
        <span>Exp.</span>
        <span>Logistics</span>
        <span>Feedback</span>
        <span>Memories</span>
      </div>
    </div>
  );
};
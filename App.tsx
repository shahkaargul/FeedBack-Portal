import React, { useState } from 'react';
import { Step, FeedbackData, INITIAL_DATA } from './types';
import { StepIndicator } from './components/StepIndicator';
import { TextInput, RatingInput, TextArea } from './components/Input';
import { MediaUpload } from './components/MediaUpload';
import { User, Briefcase, GraduationCap, Mail, ChevronRight, ChevronLeft, CheckCircle, Send, Sparkles } from 'lucide-react';
import { submitToGoogleSheets } from './services/sheetService';
import { polishFeedback } from './services/geminiService';

const App: React.FC = () => {
  const [step, setStep] = useState<Step>(Step.WELCOME);
  const [data, setData] = useState<FeedbackData>(INITIAL_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPolishing, setIsPolishing] = useState(false);

  const updateData = (field: keyof FeedbackData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const success = await submitToGoogleSheets(data);
    setIsSubmitting(false);
    if (success) setStep(Step.SUCCESS);
  };

  const handlePolish = async (field: 'improvements' | 'futureSuggestions' | 'bestMoment') => {
    setIsPolishing(true);
    const polished = await polishFeedback(data[field]);
    updateData(field, polished);
    setIsPolishing(false);
  };

  // Wizard View
  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800 bg-slate-50">
      {/* Header */}
      <header className="bg-slate-900 text-white py-6 shadow-lg border-b-4 border-amber-500">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => setStep(Step.WELCOME)}>
            <div>
              <h1 className="text-xl md:text-2xl font-bold font-serif tracking-wide text-amber-500">GIKI SCHOOL & COLLEGE REUNION 2025</h1>
              <p className="text-xs md:text-sm text-slate-300 uppercase tracking-widest">Feedback Portal</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-amber-500">27th December 2025</p>
              <p className="text-xs text-slate-400">GIKI Auditorium, Topi</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <StepIndicator currentStep={step} totalSteps={6} />

        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          
          {/* STEP 0: WELCOME */}
          {step === Step.WELCOME && (
            <div className="p-8 md:p-12 text-center">
              <div className="mb-6 inline-flex items-center justify-center w-20 h-20 bg-amber-50 rounded-full">
                <Sparkles className="text-amber-500 w-10 h-10" />
              </div>
              <h2 className="text-3xl font-bold font-serif text-slate-900 mb-4">Welcome Back Home!</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                We hope you enjoyed the GIKI School & College Reunion on 27th December at the Auditorium. 
                Your feedback is invaluable to us as we strive to make future gatherings even more memorable.
                This form takes less than 3 minutes.
              </p>
              <button 
                onClick={handleNext}
                className="inline-flex items-center px-8 py-4 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Start Feedback <ChevronRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          )}

          {/* STEP 1: PERSONAL INFO */}
          {step === Step.PERSONAL_INFO && (
            <div className="p-8">
              <h3 className="text-2xl font-bold font-serif text-slate-900 mb-6">About You</h3>
              <TextInput 
                label="Full Name" 
                value={data.fullName} 
                onChange={(v) => updateData('fullName', v)} 
                icon={User}
                placeholder="e.g. Muhammad Ali"
              />
              <TextInput 
                label="Batch / Graduation Year" 
                value={data.batchYear} 
                onChange={(v) => updateData('batchYear', v)} 
                icon={GraduationCap}
                placeholder="e.g. Batch 12 / 2005"
              />
              <TextInput 
                label="Current Professional Role" 
                value={data.currentRole} 
                onChange={(v) => updateData('currentRole', v)} 
                icon={Briefcase}
                placeholder="e.g. Senior Engineer at TechCorp"
              />
               <TextInput 
                label="Email Address" 
                value={data.email} 
                onChange={(v) => updateData('email', v)} 
                icon={Mail}
                type="email"
                placeholder="name@example.com"
              />
            </div>
          )}

          {/* STEP 2: EXPERIENCE */}
          {step === Step.EXPERIENCE && (
            <div className="p-8">
              <h3 className="text-2xl font-bold font-serif text-slate-900 mb-2">The Experience</h3>
              <p className="text-slate-500 mb-8 text-sm">Rate your experience at the Auditorium and events.</p>
              
              <RatingInput 
                label="Overall Satisfaction" 
                value={data.overallSatisfaction} 
                onChange={(v) => updateData('overallSatisfaction', v)} 
              />
              <RatingInput 
                label="Content & Program Quality" 
                value={data.contentQuality} 
                onChange={(v) => updateData('contentQuality', v)} 
              />
              <RatingInput 
                label="Nostalgia Factor" 
                value={data.nostalgiaFactor} 
                onChange={(v) => updateData('nostalgiaFactor', v)} 
              />
            </div>
          )}

          {/* STEP 3: LOGISTICS */}
          {step === Step.LOGISTICS && (
            <div className="p-8">
              <h3 className="text-2xl font-bold font-serif text-slate-900 mb-2">Logistics & Arrangements</h3>
              <p className="text-slate-500 mb-8 text-sm">How did we handle the details?</p>

              <div className="mb-6">
                <label className="block text-slate-700 text-sm font-semibold mb-3">Registration Process</label>
                <div className="flex gap-3">
                  {['Smooth', 'Okay', 'Chaotic'].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => updateData('registrationProcess', opt)}
                      className={`flex-1 py-3 px-4 rounded-lg border text-sm font-medium transition-all
                        ${data.registrationProcess === opt 
                          ? 'bg-slate-900 border-slate-900 text-white' 
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <RatingInput 
                label="Venue Comfort (Auditorium)" 
                value={data.venueComfort} 
                onChange={(v) => updateData('venueComfort', v)} 
              />
               <RatingInput 
                label="Food & Refreshments" 
                value={data.foodQuality} 
                onChange={(v) => updateData('foodQuality', v)} 
              />
            </div>
          )}

          {/* STEP 4: OPEN FEEDBACK */}
          {step === Step.OPEN_FEEDBACK && (
            <div className="p-8">
              <h3 className="text-2xl font-bold font-serif text-slate-900 mb-2">Your Voice</h3>
              <p className="text-slate-500 mb-6 text-sm">Help us improve. Use the AI Polish tool to refine your text.</p>
              
              <TextArea 
                label="What was the best moment for you?" 
                value={data.bestMoment} 
                onChange={(v) => updateData('bestMoment', v)}
                placeholder="Meeting old friends, the keynote speech..."
              />
              
              <TextArea 
                label="Suggested Improvements for Next Time" 
                value={data.improvements} 
                onChange={(v) => updateData('improvements', v)}
                placeholder="Better sound system, more networking time..."
                onPolish={() => handlePolish('improvements')}
                isPolishing={isPolishing}
              />

              <TextArea 
                label="Any specific suggestions for the Alumni Association?" 
                value={data.futureSuggestions} 
                onChange={(v) => updateData('futureSuggestions', v)}
                placeholder="Mentorship programs, regional chapters..."
                onPolish={() => handlePolish('futureSuggestions')}
                isPolishing={isPolishing}
              />
            </div>
          )}

          {/* STEP 5: MEDIA UPLOAD */}
          {step === Step.MEDIA_UPLOAD && (
            <div className="p-8">
              <MediaUpload 
                files={data.uploads}
                onFilesChange={(files) => updateData('uploads', files)}
              />
            </div>
          )}

          {/* STEP 6: SUCCESS */}
          {step === Step.SUCCESS && (
            <div className="p-12 text-center">
              <div className="mb-6 inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full">
                <CheckCircle className="text-green-600 w-10 h-10" />
              </div>
              <h2 className="text-3xl font-bold font-serif text-slate-900 mb-4">Thank You!</h2>
              <p className="text-slate-600 mb-8">
                Your feedback has been successfully recorded. We truly appreciate you taking the time to help us make the GIKI Alumni community stronger.
              </p>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 inline-block text-left max-w-sm">
                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-2">Submitted By</p>
                <p className="font-semibold text-slate-900">{data.fullName}</p>
                <p className="text-sm text-slate-600">{data.currentRole}</p>
                <p className="text-sm text-amber-600 font-medium mt-1">{data.batchYear}</p>
              </div>
              <div className="mt-8 flex flex-col gap-3 justify-center items-center">
                 <button 
                  onClick={() => window.location.reload()}
                  className="text-slate-500 hover:text-slate-800 text-sm underline"
                 >
                   Submit another response
                 </button>
              </div>
            </div>
          )}

          {/* Footer Controls (Navigation) */}
          {step !== Step.WELCOME && step !== Step.SUCCESS && (
            <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
              <button
                onClick={handleBack}
                className="flex items-center text-slate-500 hover:text-slate-800 font-medium px-4 py-2 rounded transition-colors"
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Back
              </button>
              
              {step === Step.MEDIA_UPLOAD ? (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center bg-amber-500 text-white hover:bg-amber-600 px-6 py-3 rounded-lg font-bold shadow-md transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Submit Feedback'} <Send className="w-4 h-4 ml-2" />
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex items-center bg-slate-900 text-white hover:bg-slate-800 px-6 py-3 rounded-lg font-bold shadow-md transition-all"
                >
                  Next Step <ChevronRight className="w-4 h-4 ml-2" />
                </button>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm mb-2">&copy; 2025 Ghulam Ishaq Khan Institute of Engineering Sciences and Technology.</p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6 text-xs mt-4 opacity-70">
             <div className="flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-amber-500"></span>
               Designed & Developed by <span className="text-slate-200 font-semibold">Muhammad Shahkaar</span>
             </div>
             <div className="hidden md:block text-slate-600">|</div>
             <div>Web & Design Co-ordinator</div>
             <div className="hidden md:block text-slate-600">|</div>
             <div>GIKI College Alumni Association</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
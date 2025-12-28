export interface FeedbackData {
  // Personal Info
  fullName: string;
  batchYear: string;
  email: string;
  currentRole: string;

  // Event Experience
  overallSatisfaction: number; // 1-5
  contentQuality: number; // 1-5
  nostalgiaFactor: number; // 1-5
  
  // Logistics
  registrationProcess: string; // 'Smooth', 'Okay', 'Chaotic'
  venueComfort: number; // 1-5
  foodQuality: number; // 1-5

  // Open Ended
  bestMoment: string;
  improvements: string;
  futureSuggestions: string;

  // Media
  uploads: File[];
}

export const INITIAL_DATA: FeedbackData = {
  fullName: '',
  batchYear: '',
  email: '',
  currentRole: '',
  overallSatisfaction: 5,
  contentQuality: 4,
  nostalgiaFactor: 5,
  registrationProcess: 'Smooth',
  venueComfort: 4,
  foodQuality: 4,
  bestMoment: '',
  improvements: '',
  futureSuggestions: '',
  uploads: []
};

export enum Step {
  WELCOME = 0,
  PERSONAL_INFO = 1,
  EXPERIENCE = 2,
  LOGISTICS = 3,
  OPEN_FEEDBACK = 4,
  MEDIA_UPLOAD = 5,
  SUCCESS = 6
}

export interface MediaItem {
  id: string;
  url: string;
  type: 'image' | 'video';
  caption: string;
  uploader: string;
  batch: string;
  status: 'approved' | 'pending' | 'rejected';
  timestamp: Date;
}
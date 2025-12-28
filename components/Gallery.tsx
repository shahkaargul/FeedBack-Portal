import React, { useState } from 'react';
import { MediaItem } from '../types';
import { Check, X, Shield, Lock, Unlock } from 'lucide-react';

// Mock Data for the Gallery
const MOCK_MEDIA: MediaItem[] = [
  { id: '1', url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80', type: 'image', caption: 'Batch 2005 Group Photo', uploader: 'Ali Khan', batch: '2005', status: 'approved', timestamp: new Date() },
  { id: '2', url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80', type: 'image', caption: 'Auditorium Entrance', uploader: 'Sarah Ahmed', batch: '2012', status: 'approved', timestamp: new Date() },
  { id: '3', url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80', type: 'image', caption: 'Keynote Speech', uploader: 'Admin', batch: 'Staff', status: 'approved', timestamp: new Date() },
  { id: '4', url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80', type: 'image', caption: 'Networking Dinner', uploader: 'Bilal', batch: '2018', status: 'pending', timestamp: new Date() },
  { id: '5', url: 'https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&q=80', type: 'image', caption: 'Campus Walk', uploader: 'Anonymous', batch: '2000', status: 'rejected', timestamp: new Date() },
];

export const Gallery: React.FC = () => {
  const [items, setItems] = useState<MediaItem[]>(MOCK_MEDIA);
  const [isModerator, setIsModerator] = useState(false);
  const [filter, setFilter] = useState<'all' | 'approved'>('approved');

  const displayedItems = items.filter(item => {
    if (isModerator) return true; // Moderators see everything
    return item.status === 'approved'; // Users only see approved
  });

  const handleStatusChange = (id: string, newStatus: 'approved' | 'rejected') => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, status: newStatus } : item
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Gallery Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-slate-200 pb-6">
        <div>
          <h2 className="text-3xl font-bold font-serif text-slate-900">Event Gallery</h2>
          <p className="text-slate-500 mt-1">Collective memories from the GIKI School & College Reunion 2025</p>
        </div>
        
        {/* Moderator Toggle */}
        <div className="mt-4 md:mt-0 flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {isModerator ? 'Moderator Mode' : 'View Mode'}
          </span>
          <button 
            onClick={() => setIsModerator(!isModerator)}
            className={`p-2 rounded-full transition-colors ${isModerator ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-500'}`}
            title="Toggle Moderator Tools"
          >
            {isModerator ? <Unlock size={20} /> : <Lock size={20} />}
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {displayedItems.map((item) => (
          <div key={item.id} className="break-inside-avoid relative group rounded-xl overflow-hidden bg-white shadow-md border border-slate-100">
            {/* Image */}
            <img 
              src={item.url} 
              alt={item.caption} 
              className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <p className="text-white font-medium">{item.caption}</p>
              <div className="flex justify-between items-center text-xs text-slate-300 mt-1">
                <span>By {item.uploader}</span>
                <span className="px-2 py-0.5 bg-amber-500 text-slate-900 rounded font-bold">{item.batch}</span>
              </div>
            </div>

            {/* Moderator Badge */}
            {isModerator && (
              <div className="absolute top-3 left-3 flex gap-2">
                <span className={`px-2 py-1 rounded text-xs font-bold uppercase shadow-sm
                  ${item.status === 'approved' ? 'bg-green-500 text-white' : ''}
                  ${item.status === 'pending' ? 'bg-amber-500 text-white' : ''}
                  ${item.status === 'rejected' ? 'bg-red-500 text-white' : ''}
                `}>
                  {item.status}
                </span>
              </div>
            )}

            {/* Moderator Controls */}
            {isModerator && (
              <div className="absolute top-3 right-3 flex gap-2">
                <button 
                  onClick={() => handleStatusChange(item.id, 'approved')}
                  className="p-1.5 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-transform hover:scale-110"
                  title="Approve"
                >
                  <Check size={16} />
                </button>
                <button 
                  onClick={() => handleStatusChange(item.id, 'rejected')}
                  className="p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-transform hover:scale-110"
                  title="Reject"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {displayedItems.length === 0 && (
        <div className="text-center py-20 text-slate-400">
          <p>No photos found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};
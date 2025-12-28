import React, { useCallback, useState } from 'react';
import { UploadCloud, X, Image as ImageIcon, Film } from 'lucide-react';

interface MediaUploadProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
}

export const MediaUpload: React.FC<MediaUploadProps> = ({ files, onFilesChange }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      // Validate types if needed
      onFilesChange([...files, ...newFiles]);
    }
  }, [files, onFilesChange]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      onFilesChange([...files, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    onFilesChange(newFiles);
  };

  return (
    <div className="mb-6">
      <h3 className="text-xl font-bold font-serif text-slate-900 mb-2">Share Your Memories</h3>
      <p className="text-slate-500 mb-6 text-sm">
        Upload photos or videos from the reunion. Help us build a collective memory album!
      </p>

      {/* Drop Zone */}
      <div 
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ease-in-out cursor-pointer group
          ${isDragging 
            ? 'border-amber-500 bg-amber-50' 
            : 'border-slate-300 hover:border-amber-400 hover:bg-slate-50'
          }`}
      >
        <input 
          type="file" 
          multiple 
          accept="image/*,video/*"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileSelect}
        />
        <div className="flex flex-col items-center justify-center pointer-events-none">
          <div className={`p-4 rounded-full mb-3 ${isDragging ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-400 group-hover:text-amber-500 group-hover:bg-amber-50'}`}>
            <UploadCloud className="w-8 h-8" />
          </div>
          <p className="text-slate-900 font-medium">Click to upload or drag and drop</p>
          <p className="text-slate-500 text-xs mt-1">SVG, PNG, JPG or MP4 (max. 10MB)</p>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
          {files.map((file, index) => (
            <div key={`${file.name}-${index}`} className="relative group bg-slate-50 rounded-lg border border-slate-200 overflow-hidden">
              <div className="aspect-square flex items-center justify-center bg-slate-100">
                {file.type.startsWith('image/') ? (
                  <img 
                    src={URL.createObjectURL(file)} 
                    alt="preview" 
                    className="w-full h-full object-cover" 
                    onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)}
                  />
                ) : (
                  <Film className="w-8 h-8 text-slate-400" />
                )}
              </div>
              <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => removeFile(index)}
                  className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 shadow-sm"
                >
                  <X size={14} />
                </button>
              </div>
              <div className="p-2 truncate text-xs font-medium text-slate-700">
                {file.name}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
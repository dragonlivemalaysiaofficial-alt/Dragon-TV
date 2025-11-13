import React, { useState, useRef } from 'react';
import { ChevronLeftIcon, UploadIcon as CloudUploadIcon, CheckIcon } from '../components/Icons';
import { allGenres } from '../data/mockData';

interface UploadScreenProps {
  onClose: () => void;
}

const UploadScreen: React.FC<UploadScreenProps> = ({ onClose }) => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadComplete, setIsUploadComplete] = useState(false);

  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (
    event: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setter(file);
    }
  };

  const handleGenreToggle = (genre: string) => {
    setSelectedGenres(prev => 
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
  };
  
  const handleUpload = () => {
    if (!videoFile || !title) {
      alert("Please select a video and provide a title.");
      return;
    }
    
    setIsUploading(true);
    setIsUploadComplete(false);
    setUploadProgress(0);

    // Simulate upload
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setIsUploadComplete(true);
          setTimeout(onClose, 2000); // Close after 2 seconds
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };
  
  const videoPreviewUrl = videoFile ? URL.createObjectURL(videoFile) : null;
  const thumbnailPreviewUrl = thumbnailFile ? URL.createObjectURL(thumbnailFile) : null;

  return (
    <div 
      className="fixed inset-0 bg-brand-dark z-50 flex flex-col animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="upload-screen-title"
    >
      <header className="flex items-center p-4 bg-brand-gray sticky top-0 z-10">
        <button onClick={onClose} aria-label="Go back">
          <ChevronLeftIcon />
        </button>
        <h1 id="upload-screen-title" className="text-xl font-bold text-white text-center flex-grow">
          Upload Video
        </h1>
        <div className="w-6"></div>
      </header>
      
      <div className="flex-grow p-4 space-y-6 overflow-y-auto">
        <input type="file" accept="video/*" ref={videoInputRef} onChange={(e) => handleFileSelect(e, setVideoFile)} className="hidden" />
        <input type="file" accept="image/*" ref={thumbnailInputRef} onChange={(e) => handleFileSelect(e, setThumbnailFile)} className="hidden" />
        
        <div className="space-y-2">
            <label className="font-semibold text-white">Video File</label>
            <button onClick={() => videoInputRef.current?.click()} className="w-full aspect-video bg-brand-gray rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-brand-light-gray hover:border-brand-purple transition-colors">
                {videoPreviewUrl ? (
                    <video src={videoPreviewUrl} controls className="w-full h-full object-cover rounded-lg" />
                ) : (
                    <>
                        <CloudUploadIcon className="h-12 w-12 text-brand-text-secondary" />
                        <span className="text-sm text-brand-text-secondary mt-2">Click to select video</span>
                    </>
                )}
            </button>
            {videoFile && <p className="text-xs text-brand-text-secondary truncate">Selected: {videoFile.name}</p>}
        </div>

         <div className="space-y-2">
            <label className="font-semibold text-white">Thumbnail Image</label>
            <button onClick={() => thumbnailInputRef.current?.click()} className="w-48 h-28 bg-brand-gray rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-brand-light-gray hover:border-brand-purple transition-colors">
                {thumbnailPreviewUrl ? (
                    <img src={thumbnailPreviewUrl} alt="Thumbnail preview" className="w-full h-full object-cover rounded-lg" />
                ) : (
                    <>
                        <CloudUploadIcon className="h-8 w-8 text-brand-text-secondary" />
                        <span className="text-xs text-brand-text-secondary mt-1">Select thumbnail</span>
                    </>
                )}
            </button>
            {thumbnailFile && <p className="text-xs text-brand-text-secondary truncate">Selected: {thumbnailFile.name}</p>}
        </div>

        <div className="space-y-4">
            <div>
                <label htmlFor="title" className="block font-semibold text-white mb-2">Title</label>
                <input id="title" type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-brand-gray rounded-lg p-3 text-brand-text placeholder-brand-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-purple" placeholder="Enter video title" />
            </div>
             <div>
                <label htmlFor="description" className="block font-semibold text-white mb-2">Description</label>
                <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={4} className="w-full bg-brand-gray rounded-lg p-3 text-brand-text placeholder-brand-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-purple" placeholder="Enter video description"></textarea>
            </div>
        </div>

        <section>
            <h3 className="font-semibold text-white mb-3">Genres</h3>
            <div className="flex flex-wrap gap-2">
                {allGenres.map(genre => (
                    <button key={genre} onClick={() => handleGenreToggle(genre)}
                    className={`px-4 py-2 text-sm rounded-full transition-colors border ${selectedGenres.includes(genre) ? 'bg-brand-purple text-white border-brand-purple' : 'border-brand-light-gray text-brand-text-secondary'}`}>
                        {genre}
                    </button>
                ))}
            </div>
        </section>
      </div>

      <footer className="p-4 bg-brand-dark sticky bottom-0">
        {isUploading && (
            <div className="w-full bg-brand-gray rounded-full h-2.5 mb-4">
                <div className="bg-brand-purple h-2.5 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
            </div>
        )}
        {isUploadComplete ? (
            <div className="flex items-center justify-center gap-2 py-3 bg-green-500 text-white rounded-full font-semibold">
                <CheckIcon />
                <span>Upload Successful!</span>
            </div>
        ) : (
            <button 
                onClick={handleUpload} 
                disabled={isUploading || !videoFile || !title}
                className="w-full py-3 bg-brand-purple text-white rounded-full font-semibold transition-opacity disabled:opacity-50"
            >
                {isUploading ? `Uploading... ${uploadProgress}%` : 'Upload Video'}
            </button>
        )}
      </footer>
    </div>
  );
};

export default UploadScreen;
import React, { useState } from 'react';

interface OnboardingTutorialProps {
  onClose: () => void;
}

const tutorialSteps = [
  {
    title: 'Welcome to Dragon TV!',
    description: 'Let\'s take a quick tour to show you all the cool features.',
    illustration: (
      <svg className="w-24 h-24 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Browse & Discover',
    description: 'Find new Movies and TV Shows right from the Home screen. Scroll through Trending and Popular carousels.',
    illustration: (
        <svg className="w-24 h-24 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
    ),
  },
  {
    title: 'Instant Search',
    description: 'Use the search bar at the top to find your favorite anime instantly.',
    illustration: (
        <svg className="w-24 h-24 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
    ),
  },
  {
    title: 'Rate Your Favorites',
    description: 'Let us know what you think! Tap the stars to rate shows and episodes.',
     illustration: (
        <svg className="w-24 h-24 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
    ),
  },
  {
    title: 'Stay Updated',
    description: 'Check "Discover" for the latest episodes and "Coming" for the weekly release schedule.',
     illustration: (
        <svg className="w-24 h-24 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
    ),
  },
  {
    title: 'You\'re All Set!',
    description: 'Enjoy the world of anime. Happy watching!',
     illustration: (
        <svg className="w-24 h-24 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
    ),
  },
];

const OnboardingTutorial: React.FC<OnboardingTutorialProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = tutorialSteps.length;
  const isLastStep = currentStep === totalSteps - 1;

  const handleNext = () => {
    if (!isLastStep) {
      setCurrentStep(prev => prev + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const step = tutorialSteps[currentStep];

  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="tutorial-title"
    >
      <div
        className="bg-brand-gray rounded-2xl p-6 md:p-8 w-full max-w-md flex flex-col items-center text-center space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {step.illustration}
        <h2 id="tutorial-title" className="text-2xl font-bold text-white">{step.title}</h2>
        <p className="text-brand-text-secondary">{step.description}</p>
        
        <div className="flex justify-center pt-4">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full mx-1 transition-colors duration-300 ${
                currentStep === index ? 'bg-brand-purple' : 'bg-brand-light-gray'
              }`}
            />
          ))}
        </div>

        <div className="flex justify-between w-full pt-4">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="px-6 py-2 rounded-full text-white font-semibold transition-opacity duration-200 disabled:opacity-0"
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-2 rounded-full bg-brand-purple text-white font-semibold transition-colors duration-200 hover:bg-purple-700"
          >
            {isLastStep ? 'Finish' : 'Next'}
          </button>
        </div>
        
        {!isLastStep && (
            <button onClick={onClose} className="text-sm text-brand-text-secondary mt-2">Skip Tutorial</button>
        )}
      </div>
    </div>
  );
};

export default OnboardingTutorial;

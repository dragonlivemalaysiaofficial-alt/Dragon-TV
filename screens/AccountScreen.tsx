import React, { useState, useRef } from 'react';
import { ChevronRightIcon, NotificationIcon, DarkModeIcon, LanguageIcon, HistoryIcon, FeedbackIcon, VersionIcon, QuestionMarkCircleIcon, MyListIcon, UploadIcon } from '../components/Icons';
import OnboardingTutorial from '../components/OnboardingTutorial';
import NotificationSettingsScreen from './NotificationSettingsScreen';
import UploadScreen from './UploadScreen';

interface AccountItemProps {
  icon: React.ReactNode;
  label: string;
  value?: string;
  onClick?: () => void;
}

const AccountItem: React.FC<AccountItemProps> = ({ icon, label, value, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center justify-between bg-brand-gray p-4 rounded-lg w-full text-left disabled:opacity-70 transition-colors duration-200 hover:bg-brand-light-gray disabled:hover:bg-brand-gray"
    disabled={!onClick}
    aria-label={label}
  >
    <div className="flex items-center space-x-4">
      <div className="text-green-400">{icon}</div>
      <span className="text-white">{label}</span>
    </div>
    <div className="flex items-center space-x-2">
      {value && <span className="text-brand-text-secondary text-sm">{value}</span>}
      <ChevronRightIcon />
    </div>
  </button>
);

const AccountScreen: React.FC = () => {
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [isTutorialOpen, setTutorialOpen] = useState(false);
  const [isNotificationSettingsOpen, setNotificationSettingsOpen] = useState(false);
  const [isUploadScreenOpen, setUploadScreenOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const accountItems1 = [
    { icon: <NotificationIcon />, label: 'Notifications', onClick: () => setNotificationSettingsOpen(true) },
    { icon: <DarkModeIcon />, label: 'Dark Mode', value: 'System' },
    { icon: <LanguageIcon />, label: 'Language', value: 'System Default' },
  ];

  const accountItems2 = [
    { icon: <MyListIcon />, label: 'My List' },
    { icon: <HistoryIcon />, label: 'History' },
    { icon: <UploadIcon />, label: 'Upload Content', onClick: () => setUploadScreenOpen(true) },
    { icon: <FeedbackIcon />, label: 'Feedback' },
    { icon: <QuestionMarkCircleIcon />, label: 'App Tutorial', onClick: () => setTutorialOpen(true) },
    { icon: <VersionIcon />, label: 'Version', value: '7.0.0' },
  ];

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <div className="p-4 space-y-8">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
        />
        <div className="flex items-center space-x-4">
          <button
            onClick={handleImageUploadClick}
            className="w-16 h-16 rounded-full bg-brand-gray flex items-center justify-center overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark focus:ring-brand-purple"
            aria-label="Upload profile picture"
          >
            {profilePic ? (
              <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            )}
          </button>
          <div>
              <h2 className="text-xl font-bold text-white">User Name</h2>
              <p className="text-sm text-brand-text-secondary">user@email.com</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-brand-gray p-3 rounded-lg">
                <p className="text-2xl font-bold text-brand-purple">124</p>
                <p className="text-xs text-brand-text-secondary">Hours Watched</p>
            </div>
            <div className="bg-brand-gray p-3 rounded-lg">
                <p className="text-2xl font-bold text-brand-purple">350</p>
                <p className="text-xs text-brand-text-secondary">Episodes Completed</p>
            </div>
        </div>
        
        <div className="space-y-3">
          {accountItems1.map(item => (
            <AccountItem key={item.label} icon={item.icon} label={item.label} value={item.value} onClick={item.onClick} />
          ))}
        </div>
        
        <div className="space-y-3">
          {accountItems2.map(item => (
            <AccountItem key={item.label} icon={item.icon} label={item.label} value={item.value} onClick={item.onClick} />
          ))}
        </div>
      </div>
      {isTutorialOpen && <OnboardingTutorial onClose={() => setTutorialOpen(false)} />}
      {isNotificationSettingsOpen && <NotificationSettingsScreen onClose={() => setNotificationSettingsOpen(false)} />}
      {isUploadScreenOpen && <UploadScreen onClose={() => setUploadScreenOpen(false)} />}
    </>
  );
};

export default AccountScreen;
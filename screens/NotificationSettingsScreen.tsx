import React, { useState } from 'react';
import ToggleSwitch from '../components/ToggleSwitch';
import { ChevronLeftIcon } from '../components/Icons';

interface NotificationSettingsScreenProps {
  onClose: () => void;
}

const mockNotificationSettings = {
  newEpisodes: true,
  recommendations: true,
  specialOffers: false,
  appUpdates: true,
};

const NotificationSettingsScreen: React.FC<NotificationSettingsScreenProps> = ({ onClose }) => {
  const [settings, setSettings] = useState(mockNotificationSettings);

  const handleSettingChange = (key: keyof typeof settings, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div 
      className="fixed inset-0 bg-brand-dark z-50 flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-labelledby="notification-settings-title"
    >
      <header className="flex items-center p-4 bg-brand-gray sticky top-0">
        <button onClick={onClose} aria-label="Go back">
          <ChevronLeftIcon />
        </button>
        <h1 id="notification-settings-title" className="text-xl font-bold text-white text-center flex-grow">
          Notification Settings
        </h1>
        <div className="w-6"></div>
      </header>

      <div className="p-4 space-y-4 flex-grow">
        <ToggleSwitch
          label="New Episode Releases"
          enabled={settings.newEpisodes}
          onChange={(value) => handleSettingChange('newEpisodes', value)}
        />
        <ToggleSwitch
          label="Show Recommendations"
          enabled={settings.recommendations}
          onChange={(value) => handleSettingChange('recommendations', value)}
        />
        <ToggleSwitch
          label="Special Offers & Promotions"
          enabled={settings.specialOffers}
          onChange={(value) => handleSettingChange('specialOffers', value)}
        />
        <ToggleSwitch
          label="App Updates"
          enabled={settings.appUpdates}
          onChange={(value) => handleSettingChange('appUpdates', value)}
        />
      </div>
    </div>
  );
};

export default NotificationSettingsScreen;

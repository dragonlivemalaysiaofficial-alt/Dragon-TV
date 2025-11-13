import React, { useState } from 'react';
import BottomNav from './components/BottomNav';
import HomeScreen from './screens/HomeScreen';
import DiscoverScreen from './screens/DiscoverScreen';
import ComingSoonScreen from './screens/ComingSoonScreen';
import AccountScreen from './screens/AccountScreen';
import SearchScreen from './screens/SearchScreen';
import { Page } from './types';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>(Page.Home);
  const [isSearching, setIsSearching] = useState(false);

  const renderPage = () => {
    switch (activePage) {
      case Page.Home:
        return <HomeScreen onActivateSearch={() => setIsSearching(true)} />;
      case Page.Discover:
        return <DiscoverScreen />;
      case Page.Coming:
        return <ComingSoonScreen />;
      case Page.Account:
        return <AccountScreen />;
      default:
        return <HomeScreen onActivateSearch={() => setIsSearching(true)} />;
    }
  };

  return (
    <div className="bg-brand-dark text-brand-text min-h-screen font-sans flex flex-col">
      <main className="flex-grow pb-20">
        {isSearching ? <SearchScreen onClose={() => setIsSearching(false)} /> : renderPage()}
      </main>
      <BottomNav activePage={activePage} setActivePage={setActivePage} />
    </div>
  );
};

export default App;

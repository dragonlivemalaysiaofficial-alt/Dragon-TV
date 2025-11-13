
import React from 'react';
import { Page } from '../types';
import { HomeIcon, DiscoverIcon, ComingIcon, AccountIcon } from './Icons';

interface BottomNavProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const NavItem: React.FC<{
  label: Page;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-1/4 transition-colors duration-200 ${isActive ? 'text-white' : 'text-brand-text-secondary'}`}
  >
    {icon}
    <span className="text-xs mt-1">{label}</span>
  </button>
);

const BottomNav: React.FC<BottomNavProps> = ({ activePage, setActivePage }) => {
  const navItems = [
    { label: Page.Home, icon: <HomeIcon /> },
    { label: Page.Discover, icon: <DiscoverIcon /> },
    { label: Page.Coming, icon: <ComingIcon /> },
    { label: Page.Account, icon: <AccountIcon /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-brand-gray border-t border-brand-light-gray flex justify-around items-center z-50">
      {navItems.map((item) => (
        <NavItem
          key={item.label}
          label={item.label}
          icon={item.icon}
          isActive={activePage === item.label}
          onClick={() => setActivePage(item.label)}
        />
      ))}
    </nav>
  );
};

export default BottomNav;

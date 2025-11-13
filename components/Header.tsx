import React from 'react';
import { SearchIcon } from './Icons';

interface HeaderProps {
  title?: string;
  onActivateSearch?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onActivateSearch }) => {
  return (
    <header className="p-4 sticky top-0 bg-brand-dark z-40">
      {title && <h1 className="text-3xl font-bold text-white mb-4">{title}</h1>}
      <div 
        className="relative" 
        onClick={onActivateSearch} 
        role="button" 
        tabIndex={0}
        aria-label="Activate search"
      >
        <div className="w-full bg-brand-gray rounded-full py-2 pl-10 pr-4 text-brand-text-secondary cursor-pointer hover:bg-brand-light-gray transition-colors">
          Search
        </div>
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <SearchIcon />
        </div>
      </div>
    </header>
  );
};

export default Header;

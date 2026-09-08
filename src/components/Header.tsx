import React from 'react';
import { Language } from '../types';

interface HeaderProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  language: Language;
  onToggleLanguage: () => void;
  isOfficerMode: boolean;
  onToggleOfficerMode: () => void;
  onQuickSearch: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  language,
  onToggleLanguage,
  isOfficerMode,
  onToggleOfficerMode,
  onQuickSearch,
}) => {
  const [quickInput, setQuickInput] = React.useState('');

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickInput.trim()) {
      onQuickSearch(quickInput.trim());
    }
  };

  const isHindi = language === 'hi';

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#c4c6cf]">
      {/* Sovereign Government Strip */}
      <aside
        aria-label="Official Government Banner"
        className="bg-[#00142f] text-[#faf8ff] py-1 px-4 sm:px-6 border-b border-[#0f294a]"
      >
        <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between text-[11px] font-medium">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[#e2e7ff]">
              {isHindi ? 'भारत सरकार | भूमि संसाधन मंत्रालय' : 'Government of India | Ministry of Land Resources'}
            </span>
            <span className="hidden sm:inline text-[#74777f]">|</span>
            <span className="text-[#dae2fd] font-mono text-[10px]">
              SIH 2026 (Problem Statement 26014)
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-[#0f294a] text-[#dae2fd] px-2 py-0.5 rounded text-[10px] font-mono">
              {isHindi ? 'नागरिक पोर्टल प्रोटोटाइप' : 'Citizen Portal Prototype'}
            </span>
            <button
              onClick={onToggleLanguage}
              className="flex items-center gap-1 text-[#faf8ff] font-semibold cursor-pointer hover:underline bg-[#0f294a]/80 px-2 py-0.5 rounded border border-[#30476a]"
              title="Toggle Language"
            >
              <span className="text-[12px]">🌐</span>
              <span>{isHindi ? 'English' : 'हिंदी'}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Navigation Bar */}
      <div className="w-full px-4 sm:px-6 max-w-[1600px] mx-auto h-14 flex justify-between items-center">
        {/* Brand */}
        <div className="flex items-center gap-4">
          <div
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded bg-[#00142f] flex items-center justify-center text-white border border-[#336fe2] shadow-xs">
              <svg className="w-5 h-5 text-[#dae2fd]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 21h18M3 10h18M5 10v11M19 10v11M9 10v11M14 10v11M4 10l8-7 8 7" />
              </svg>
            </div>
            <div className="leading-tight">
              <div className="flex items-baseline gap-2">
                <span className="font-headline text-[20px] font-bold tracking-tight text-[#00142f]">
                  BHOOMI-SETU
                </span>
                <span className="text-[11px] font-semibold text-[#44474e] hidden md:inline">
                  {isHindi ? 'भूमि बुद्धिमत्ता एवं समाधान प्रणाली' : 'Land Intelligence & Citizen Services'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-[13px] font-medium">
          <button
            onClick={() => onSelectTab('home')}
            className={`pb-1 transition-colors ${
              currentTab === 'home'
                ? 'border-b-2 border-[#0155c7] text-[#0155c7] font-semibold'
                : 'text-[#44474e] hover:text-[#00142f]'
            }`}
          >
            {isHindi ? 'मुख्य पृष्ठ' : 'Home'}
          </button>
          <button
            onClick={() => onSelectTab('gis')}
            className={`pb-1 transition-colors ${
              currentTab === 'gis'
                ? 'border-b-2 border-[#0155c7] text-[#0155c7] font-semibold'
                : 'text-[#44474e] hover:text-[#00142f]'
            }`}
          >
            {isHindi ? 'जीआईएस नक्शा' : 'GIS Explorer'}
          </button>
          <button
            onClick={() => onSelectTab('parcel')}
            className={`pb-1 transition-colors ${
              currentTab === 'parcel'
                ? 'border-b-2 border-[#0155c7] text-[#0155c7] font-semibold'
                : 'text-[#44474e] hover:text-[#00142f]'
            }`}
          >
            {isHindi ? 'भूखंड विवरण' : 'Parcel Profile'}
          </button>
          <button
            onClick={() => onSelectTab('buy')}
            className={`pb-1 transition-colors ${
              currentTab === 'buy'
                ? 'border-b-2 border-[#0155c7] text-[#0155c7] font-semibold'
                : 'text-[#44474e] hover:text-[#00142f]'
            }`}
          >
            {isHindi ? 'खरीद पूर्व जांच' : 'Before You Buy'}
          </button>
          <button
            onClick={() => onSelectTab('tracking')}
            className={`pb-1 transition-colors ${
              currentTab === 'tracking'
                ? 'border-b-2 border-[#0155c7] text-[#0155c7] font-semibold'
                : 'text-[#44474e] hover:text-[#00142f]'
            }`}
          >
            {isHindi ? 'मेरे अनुरोध' : 'My Requests'}
          </button>
          <button
            onClick={() => onSelectTab('government')}
            className={`pb-1 transition-colors ${
              currentTab === 'government'
                ? 'border-b-2 border-[#0155c7] text-[#0155c7] font-semibold'
                : 'text-[#44474e] hover:text-[#00142f]'
            }`}
          >
            {isHindi ? 'शासकीय डैशबोर्ड' : 'Government Dashboard'}
          </button>
        </nav>

        {/* Trailing Actions */}
        <div className="flex items-center gap-3">
          <form onSubmit={handleQuickSubmit} className="hidden xl:flex items-center bg-[#f2f3ff] border border-[#c4c6cf] rounded px-2.5 py-1">
            <svg className="w-4 h-4 text-[#74777f] mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={quickInput}
              onChange={(e) => setQuickInput(e.target.value)}
              placeholder="Quick ULPIN/Khasra..."
              className="bg-transparent border-none p-0 text-[12px] font-mono focus:outline-hidden text-[#131b2e] w-36"
            />
          </form>

          {/* Officer Portal Switch */}
          <button
            onClick={onToggleOfficerMode}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-[13px] font-semibold transition-all shadow-xs ${
              isOfficerMode
                ? 'bg-[#ba1a1a] text-white hover:bg-[#93000a]'
                : 'bg-[#00142f] text-[#faf8ff] hover:bg-[#0f294a]'
            }`}
            title="Switch between Citizen and Government Officer views"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>{isOfficerMode ? (isHindi ? 'नागरिक दृश्य' : 'Exit Officer Mode') : (isHindi ? 'अधिकारी पोर्टल' : 'Officer Portal')}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

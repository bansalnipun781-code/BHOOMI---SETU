import React from 'react';
import { Language } from '../types';

interface CitizenActionCardsProps {
  language: Language;
  onSelectAction: (action: 'check' | 'buy' | 'report' | 'track') => void;
  activeCaseId?: string;
}

export const CitizenActionCards: React.FC<CitizenActionCardsProps> = ({
  language,
  onSelectAction,
  activeCaseId = 'BS-2026-00182',
}) => {
  const isHindi = language === 'hi';

  return (
    <section className="py-8 bg-[#f2f3ff] border-y border-[#c4c6cf]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
        <div className="mb-6">
          <span className="text-[#0155c7] font-bold text-[11px] uppercase tracking-wider block">
            {isHindi ? 'सरल नागरिक सेवाएं' : 'Easy Citizen Services'}
          </span>
          <h2 className="font-headline text-[24px] sm:text-[28px] text-[#00142f] font-bold mt-1">
            {isHindi ? 'आप क्या करना चाहते हैं?' : 'What would you like to do?'}
          </h2>
          <p className="text-[14px] text-[#44474e] max-w-2xl">
            {isHindi
              ? 'रिकॉर्ड देखने, खरीद से पहले जांच करने, गलती सुधारने और समाधान ट्रैक करने के लिए 4 मुख्य सेवाएं।'
              : 'Simple tools to view records, verify before transacting, report mistakes, and track resolution.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* 1. CHECK MY LAND */}
          <div
            onClick={() => onSelectAction('check')}
            className="bg-white border border-[#c4c6cf] p-5 rounded-xl flex flex-col justify-between hover:border-[#0155c7] hover:shadow-sm transition-all group cursor-pointer"
          >
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#0155c7] group-hover:bg-[#0155c7] group-hover:text-white transition-colors mb-4">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <h3 className="font-headline text-[17px] font-bold text-[#00142f]">
                {isHindi ? 'अपनी जमीन की जांच करें' : 'CHECK MY LAND'}
              </h3>
              <p className="text-[13px] text-[#44474e] mt-1.5 leading-relaxed">
                {isHindi
                  ? 'अपनी भूमि का स्वास्थ्य स्कोर देखें, समस्याओं को पहचानें और जुड़े रिकॉर्ड की सरल भाषा रिपोर्ट पाएं।'
                  : 'See your land record health, check for problems, and get a plain-language summary of connected records.'}
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#c4c6cf]/60 flex items-center justify-between">
              <span className="text-[12px] font-semibold text-[#0155c7] group-hover:underline flex items-center gap-1">
                <span>{isHindi ? 'मेरी रिपोर्ट देखें' : 'View My Report'}</span>
                <span>→</span>
              </span>
            </div>
          </div>

          {/* 2. BEFORE YOU BUY */}
          <div
            onClick={() => onSelectAction('buy')}
            className="bg-white border border-[#c4c6cf] p-5 rounded-xl flex flex-col justify-between hover:border-[#0155c7] hover:shadow-sm transition-all group cursor-pointer"
          >
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#0155c7] group-hover:bg-[#0155c7] group-hover:text-white transition-colors mb-4">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <h3 className="font-headline text-[17px] font-bold text-[#00142f]">
                {isHindi ? 'खरीदने से पहले जांचें' : 'BEFORE YOU BUY'}
              </h3>
              <p className="text-[13px] text-[#44474e] mt-1.5 leading-relaxed">
                {isHindi
                  ? 'हस्ताक्षर या भुगतान करने से पहले अदालती रोक, पंजीकृत दावों, सीमा विवाद और ज़ोनिंग की जांच करें।'
                  : 'Pre-purchase check for disputes, registered claims, boundary mismatches, and zoning restrictions.'}
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#c4c6cf]/60 flex items-center justify-between">
              <span className="text-[12px] font-semibold text-[#0155c7] group-hover:underline flex items-center gap-1">
                <span>{isHindi ? 'क्रेता जांच प्रारंभ करें' : 'Run Buyer Check'}</span>
                <span>→</span>
              </span>
            </div>
          </div>

          {/* 3. REPORT A PROBLEM */}
          <div
            onClick={() => onSelectAction('report')}
            className="bg-white border border-[#c4c6cf] p-5 rounded-xl flex flex-col justify-between hover:border-[#0155c7] hover:shadow-sm transition-all group cursor-pointer"
          >
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#0155c7] group-hover:bg-[#0155c7] group-hover:text-white transition-colors mb-4">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="12" y1="18" x2="12" y2="12" />
                  <line x1="9" y1="15" x2="15" y2="15" />
                </svg>
              </div>
              <h3 className="font-headline text-[17px] font-bold text-[#00142f]">
                {isHindi ? 'समस्या की रिपोर्ट करें' : 'REPORT A PROBLEM'}
              </h3>
              <p className="text-[13px] text-[#44474e] mt-1.5 leading-relaxed">
                {isHindi
                  ? 'रिकॉर्ड, क्षेत्रफल, सीमा या नाम में कोई त्रुटि मिली? सीधे ऑनलाइन सुधार अनुरोध दर्ज करें।'
                  : 'Found a mistake in your record, boundary, or name? Start an instant correction request.'}
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#c4c6cf]/60 flex items-center justify-between">
              <span className="text-[12px] font-semibold text-[#0155c7] group-hover:underline flex items-center gap-1">
                <span>{isHindi ? 'अनुरोध शुरू करें' : 'Start Request'}</span>
                <span>→</span>
              </span>
            </div>
          </div>

          {/* 4. TRACK MY REQUEST */}
          <div
            onClick={() => onSelectAction('track')}
            className="bg-white border border-[#c4c6cf] p-5 rounded-xl flex flex-col justify-between hover:border-[#0155c7] hover:shadow-sm transition-all group cursor-pointer"
          >
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#0155c7] group-hover:bg-[#0155c7] group-hover:text-white transition-colors mb-4">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3 className="font-headline text-[17px] font-bold text-[#00142f]">
                {isHindi ? 'अनुरोध ट्रैक करें' : 'TRACK MY REQUEST'}
              </h3>
              <p className="text-[13px] text-[#44474e] mt-1.5 leading-relaxed">
                {isHindi
                  ? 'अपने जमा किए गए सत्यापन और समाधान मामलों की प्रगति पारदर्शी समय-सीमा के साथ ट्रैक करें।'
                  : 'Check the progress of your submitted verification and resolution cases with transparent timelines.'}
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#c4c6cf]/60 flex items-center justify-between">
              <span className="text-[12px] font-semibold text-[#0155c7] group-hover:underline flex items-center gap-1">
                <span>{isHindi ? `ट्रैक #${activeCaseId}` : `Track #${activeCaseId}`}</span>
                <span>→</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

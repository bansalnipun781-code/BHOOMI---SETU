import React, { useState } from 'react';
import { Language } from '../types';

interface SearchSectionProps {
  language: Language;
  onSearch: (identifierType: string, query: string) => void;
  onSelectSample: (ulpin: string) => void;
  activeUlpin: string;
}

export const SearchSection: React.FC<SearchSectionProps> = ({
  language,
  onSearch,
  onSelectSample,
  activeUlpin,
}) => {
  const [identifierType, setIdentifierType] = useState('survey');
  const [query, setQuery] = useState('Survey 142/3A, Rampur Khurd (IN-BS-2026-000005)');

  const isHindi = language === 'hi';

  const handleExecute = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(identifierType, query.trim());
    }
  };

  const sampleParcels = [
    {
      ulpin: 'IN-BS-2026-000001',
      label: '#000001 (Clean Title)',
      labelHi: '#000001 (स्पष्ट स्वामित्व)',
      dotColor: 'bg-emerald-600',
    },
    {
      ulpin: 'IN-BS-2026-000002',
      label: '#000002 (Tax Review)',
      labelHi: '#000002 (कर समीक्षा)',
      dotColor: 'bg-amber-500',
    },
    {
      ulpin: 'IN-BS-2026-000003',
      label: '#000003 (Zoning Review)',
      labelHi: '#000003 (ज़ोनिंग समीक्षा)',
      dotColor: 'bg-amber-500',
    },
    {
      ulpin: 'IN-BS-2026-000004',
      label: '#000004 (Ownership Timeline)',
      labelHi: '#000004 (स्वामित्व कालक्रम)',
      dotColor: 'bg-amber-500',
    },
    {
      ulpin: 'IN-BS-2026-000005',
      label: '#000005 (Issues Found: Court & Boundary)',
      labelHi: '#000005 (गंभीर मुद्दे: कोर्ट स्टे व सीमा)',
      dotColor: 'bg-[#ba1a1a]',
      isKiller: true,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Header Section */}
      <section className="bg-white border-b border-[#c4c6cf] py-8">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-4xl space-y-2">
              <div className="inline-flex items-center gap-2 bg-[#e2e7ff] border border-[#c4c6cf] px-3 py-1 rounded text-[11px] font-semibold text-[#0155c7]">
                <span className="w-2 h-2 rounded-full bg-[#0155c7]"></span>
                <span>{isHindi ? 'नागरिक-केंद्रित भूमि बुद्धिमत्ता प्रणाली' : 'Citizen-Centric Land Intelligence'}</span>
              </div>
              <h1 className="font-headline text-[32px] sm:text-[38px] tracking-tight text-[#00142f] font-bold leading-tight">
                {isHindi ? 'एक अनुरोध। एक भूखंड। ' : 'One Request. One Parcel. '}
                <span className="text-[#0155c7]">{isHindi ? 'एक संपूर्ण उत्तर।' : 'One Complete Answer.'}</span>
              </h1>
              <p className="text-[15px] sm:text-[16px] text-[#44474e] max-w-3xl leading-relaxed">
                {isHindi
                  ? 'अपनी भूमि से जुड़ी समस्त जानकारियों की जांच करें, समस्याओं को समझें और समाधान ट्रैक करें। आपको यह जानने की आवश्यकता नहीं है कि कौन सा विभाग कौन सा रिकॉर्ड रखता है — BHOOMI-SETU यह जटिल जांच आपके लिए करता है।'
                  : "Check your connected land information, understand problems, and track requests from one place. You don't need to know which department has your record. BHOOMI-SETU checks the connected records for you."}
              </p>
            </div>

            {/* Metric badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 min-w-[320px]">
              <div className="p-3 bg-[#f2f3ff] border border-[#c4c6cf] rounded">
                <div className="flex items-center gap-1.5 text-[#0155c7]">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                  <span className="text-[11px] font-bold uppercase tracking-wider">
                    {isHindi ? '7 आधिकारिक रजिस्ट्रियां' : '7 Registries'}
                  </span>
                </div>
                <p className="text-[13px] text-[#131b2e] mt-1 font-medium">
                  {isHindi ? 'एक सरल, सहज भाषा रिपोर्ट में एकीकृत' : 'Unified into one simple plain-language report'}
                </p>
              </div>

              <div className="p-3 bg-[#f2f3ff] border border-[#c4c6cf] rounded">
                <div className="flex items-center gap-1.5 text-emerald-700">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <span className="text-[11px] font-bold uppercase tracking-wider">
                    {isHindi ? 'दफ्तरों के चक्कर से मुक्ति' : 'Zero Run-Around'}
                  </span>
                </div>
                <p className="text-[13px] text-[#131b2e] mt-1 font-medium">
                  {isHindi ? 'त्वरित सत्यापन और पारदर्शी शिकायत ट्रैकिंग' : 'Instant verification and grievance tracking'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Identifier Search Bar */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6">
        <div className="bg-white border border-[#c4c6cf] rounded-xl p-5 sm:p-6 shadow-xs">
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-[#0155c7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="m4.93 4.93 4.24 4.24M14.83 9.17l4.24-4.24M14.83 14.83l4.24 4.24M9.17 14.83l-4.24 4.24" />
              </svg>
              <h2 className="font-headline text-[20px] font-bold text-[#00142f]">
                {isHindi ? 'अपनी जमीन खोजें (Find My Land)' : 'Find My Land'}
              </h2>
            </div>
            <p className="text-[13px] text-[#44474e] mt-1">
              {isHindi
                ? 'अपनी जमीन का कोई भी विवरण दर्ज करें। 14-अंकीय यूएलपिन या तकनीकी जानकारी आवश्यक नहीं है।'
                : 'Enter any land detail you know. No technical knowledge or 14-digit ULPIN needed to start.'}
            </p>
          </div>

          <form onSubmit={handleExecute} className="flex flex-col lg:flex-row gap-3">
            <div className="lg:w-1/4">
              <label className="block text-[11px] font-semibold text-[#44474e] mb-1">
                {isHindi ? 'पहचानकर्ता का प्रकार' : 'Identifier Type'}
              </label>
              <select
                value={identifierType}
                onChange={(e) => setIdentifierType(e.target.value)}
                className="w-full bg-[#f2f3ff] border border-[#c4c6cf] rounded text-[13px] font-medium text-[#00142f] py-2.5 px-3 focus:ring-2 focus:ring-[#0155c7] focus:border-[#0155c7]"
              >
                <option value="survey">Survey Number</option>
                <option value="ulpin">ULPIN (Bhu-Aadhaar 14-digit)</option>
                <option value="khasra">Khasra Number (खसरा संख्या)</option>
                <option value="khata">Khata Number (खाता संख्या)</option>
                <option value="owner">Owner / Holder Name (खातेदार का नाम)</option>
                <option value="village">Village &amp; Tehsil (ग्राम व तहसील)</option>
                <option value="property">Municipal Property ID (संपत्ति आईडी)</option>
                <option value="legacy">Legacy ID (पुरातन रिकॉर्ड संख्या)</option>
              </select>
            </div>

            <div className="lg:w-7/12">
              <label className="block text-[11px] font-semibold text-[#44474e] mb-1">
                {isHindi ? 'जमीन का कोई भी विवरण, सर्वे नं. या नाम दर्ज करें' : 'Enter Land Detail, Survey No., or Owner Name'}
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#74777f]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={
                    isHindi
                      ? 'उदा. Survey 142/3A, Rampur Khurd या Ramesh Kumar या IN-BS-2026-000005'
                      : 'e.g. Survey 142/3A, Rampur Khurd or Ramesh Kumar or IN-BS-2026-000005'
                  }
                  className="w-full bg-white border border-[#c4c6cf] pl-10 pr-3 py-2.5 rounded text-[14px] font-medium text-[#00142f] focus:ring-2 focus:ring-[#0155c7] focus:border-[#0155c7]"
                />
              </div>
            </div>

            <div className="lg:w-2/12 flex items-end">
              <button
                type="submit"
                className="w-full bg-[#0155c7] hover:bg-[#336fe2] text-white font-bold py-2.5 px-4 rounded flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>{isHindi ? 'जमीन की जांच करें' : 'CHECK MY LAND'}</span>
              </button>
            </div>
          </form>

          {/* Demonstration Quick Parcels */}
          <div className="mt-4 pt-3 border-t border-[#c4c6cf]">
            <div className="flex flex-wrap items-center gap-2 text-[13px]">
              <span className="font-semibold text-[11px] uppercase text-[#44474e] tracking-wider flex items-center gap-1 mr-1">
                <span>🎯</span>
                <span>{isHindi ? 'नमूना प्रदर्शन भूखंड:' : 'Sample Demonstration Parcels:'}</span>
              </span>
              {sampleParcels.map((p) => {
                const isSelected = activeUlpin === p.ulpin;
                return (
                  <button
                    key={p.ulpin}
                    type="button"
                    onClick={() => {
                      setQuery(p.ulpin);
                      onSelectSample(p.ulpin);
                    }}
                    className={`px-3 py-1 rounded text-[11px] font-medium transition-all flex items-center gap-1.5 cursor-pointer border ${
                      isSelected
                        ? 'bg-[#00142f] text-white border-[#00142f] shadow-xs font-bold ring-2 ring-[#0155c7]'
                        : p.isKiller
                        ? 'bg-[#ba1a1a] text-white border-[#ba1a1a] hover:bg-[#93000a] font-bold'
                        : 'bg-[#eaedff] hover:bg-[#dae2fd] text-[#00142f] border-[#c4c6cf]'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${p.dotColor}`}></span>
                    <span>{isHindi ? p.labelHi : p.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

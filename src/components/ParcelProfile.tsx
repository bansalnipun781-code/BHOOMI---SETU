import React, { useState } from 'react';
import { Parcel, Language, ParcelFinding, ConnectedRecordDomain } from '../types';

interface ParcelProfileProps {
  parcel: Parcel;
  language: Language;
  onOpenEvidence: (finding?: ParcelFinding) => void;
  onOpenTimeline: () => void;
  onResolveIssue: () => void;
  onInspectGis: () => void;
}

export const ParcelProfile: React.FC<ParcelProfileProps> = ({
  parcel,
  language,
  onOpenEvidence,
  onOpenTimeline,
  onResolveIssue,
  onInspectGis,
}) => {
  const [activeDomainProvenance, setActiveDomainProvenance] = useState<ConnectedRecordDomain | null>(null);
  const isHindi = language === 'hi';

  const isCritical = parcel.healthScore < 40;
  const isMedium = parcel.healthScore >= 40 && parcel.healthScore < 75;
  const isHealthy = parcel.healthScore >= 75;

  const scoreTextColor = isCritical
    ? 'text-[#ba1a1a]'
    : isMedium
    ? 'text-[#d97706]'
    : 'text-emerald-700';

  const topBarBg = isCritical
    ? 'bg-[#ba1a1a]'
    : isMedium
    ? 'bg-[#d97706]'
    : 'bg-emerald-600';

  const badgeBg = isCritical
    ? 'bg-[#ffdad6] text-[#ba1a1a]'
    : isMedium
    ? 'bg-amber-100 text-amber-800'
    : 'bg-emerald-100 text-emerald-800';

  const badgeText = isCritical
    ? isHindi ? '🔴 अति आवश्यक समीक्षा (Critical Attention)' : '🔴 Critical Attention'
    : isMedium
    ? isHindi ? '🟡 समीक्षा आवश्यक (Medium Attention)' : '🟡 Medium Attention'
    : isHindi ? '🟢 स्पष्ट स्वामित्व (Low Attention / Clean)' : '🟢 Low Attention (Clean)';

  const activeIssues = parcel.findings.filter((f) => !f.resolved);

  return (
    <div className="space-y-6" id="active-dossier">
      {/* 1. MY LAND Card */}
      <div className="bg-white border border-[#c4c6cf] rounded-xl p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#c4c6cf]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-[#00142f] text-white flex items-center justify-center">
              <svg className="w-6 h-6 text-[#dae2fd]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#0155c7] font-bold">
                {isHindi ? 'सक्रिय भूखंड विवरण' : 'Active Parcel Details'}
              </span>
              <h2 className="font-headline text-[22px] font-bold text-[#00142f]">
                {isHindi ? 'मेरी जमीन (MY LAND)' : 'MY LAND'}
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[12px] bg-[#eaedff] text-[#00142f] font-bold px-3 py-1 rounded border border-[#c4c6cf]">
              ULPIN: {parcel.ulpin}
            </span>
            <button
              onClick={onInspectGis}
              className="text-[12px] font-semibold text-[#0155c7] hover:underline flex items-center gap-1 border border-[#0155c7]/30 px-2.5 py-1 rounded bg-[#f2f3ff]"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                <line x1="8" y1="2" x2="8" y2="18" />
                <line x1="16" y1="6" x2="16" y2="22" />
              </svg>
              <span>{isHindi ? 'नक्शे पर देखें' : 'View on Map'}</span>
            </button>
          </div>
        </div>

        {/* 6 Essential Attributes */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 text-[13px]">
          <div className="p-3 bg-[#f2f3ff] rounded border border-[#c4c6cf]">
            <span className="text-[11px] text-[#44474e] block font-medium">
              {isHindi ? 'दर्ज खातेदार / मालिक' : 'Owner / Recorded Holder'}
            </span>
            <strong className="text-[#00142f] font-semibold text-[14px] mt-0.5 block">
              {isHindi && parcel.recordedHolderHi ? parcel.recordedHolderHi : parcel.recordedHolder}
            </strong>
          </div>

          <div className="p-3 bg-[#f2f3ff] rounded border border-[#c4c6cf]">
            <span className="text-[11px] text-[#44474e] block font-medium">
              {isHindi ? 'रकबा (क्षेत्रफल)' : 'Area'}
            </span>
            <strong className="text-[#00142f] font-semibold text-[14px] mt-0.5 block">
              {parcel.areaFormatted}
            </strong>
          </div>

          <div className="p-3 bg-[#f2f3ff] rounded border border-[#c4c6cf]">
            <span className="text-[11px] text-[#44474e] block font-medium">
              {isHindi ? 'सर्वे / खसरा संख्या' : 'Survey Number'}
            </span>
            <strong className="text-[#00142f] font-semibold font-mono text-[14px] mt-0.5 block">
              {parcel.surveyNumber}
            </strong>
          </div>

          <div className="p-3 bg-[#f2f3ff] rounded border border-[#c4c6cf]">
            <span className="text-[11px] text-[#44474e] block font-medium">
              {isHindi ? 'ग्राम व तहसील' : 'Village & Tehsil'}
            </span>
            <strong className="text-[#00142f] font-semibold text-[14px] mt-0.5 block">
              {parcel.village}
            </strong>
            <span className="text-[11px] text-[#44474e] block">{parcel.tehsil}</span>
          </div>

          <div className="p-3 bg-[#f2f3ff] rounded border border-[#c4c6cf]">
            <span className="text-[11px] text-[#44474e] block font-medium">
              {isHindi ? 'भूमि उपयोग एवं ज़ोन' : 'Land Use'}
            </span>
            <strong className="text-[#00142f] font-semibold text-[14px] mt-0.5 block">
              {parcel.landUse}
            </strong>
            <span className="text-[11px] text-emerald-700 font-medium block">{parcel.zoningCode}</span>
          </div>

          <div className="p-3 bg-[#f2f3ff] rounded border border-[#c4c6cf]">
            <span className="text-[11px] text-[#44474e] block font-medium">
              {isHindi ? 'यूएलपिन स्थिति' : 'ULPIN Status'}
            </span>
            <strong className="text-[#00142f] font-semibold font-mono text-[12px] mt-0.5 block">
              {parcel.ulpin}
            </strong>
            <span className="text-[11px] text-emerald-700 font-medium block">
              {isHindi ? '7 प्रणालियों में लिंक' : 'Linked across 7 systems'}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Prominent LAND HEALTH Card */}
      <div className="bg-white border-2 border-[#c4c6cf] rounded-xl p-5 sm:p-6 shadow-xs relative overflow-hidden">
        <div className={`absolute top-0 left-0 right-0 h-2 ${topBarBg}`}></div>

        <div className="flex flex-col lg:flex-row justify-between gap-6 items-start">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#44474e]">
                {isHindi ? 'भूमि स्वास्थ्य स्थिति' : 'Parcel Health Status'}
              </span>
              <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${badgeBg}`}>
                {badgeText}
              </span>
              {parcel.isResolved && (
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                  {isHindi ? '✓ समाधान पश्चात पुनः मूल्यांकन पूर्ण' : '✓ Parcel re-evaluated after resolution'}
                </span>
              )}
            </div>

            <h3 className="font-headline text-[24px] sm:text-[28px] font-bold text-[#00142f]">
              {isHindi ? 'भूमि स्वास्थ्य रिपोर्ट (LAND HEALTH)' : 'LAND HEALTH REPORT'}
            </h3>

            <p className="text-[14px] text-[#44474e] mt-1">
              {parcel.isResolved
                ? isHindi
                  ? 'शासकीय सत्यापन उपरांत सभी चिन्हित समस्याओं का निस्तारण हो गया है। खतौनी और सीमा नक्शा पुनः संरेखित हैं।'
                  : 'All identified issues were successfully resolved following official verification. Khatauni and boundary map are now reconciled.'
                : activeIssues.length > 0
                ? isHindi
                  ? `उपलब्ध जुड़े रिकॉर्ड में ${activeIssues.length} मुद्दे पाए गए हैं जिन्हें सुरक्षित लेनदेन से पहले आधिकारिक सत्यापन की आवश्यकता है।`
                  : `We found ${activeIssues.length} issues in the available connected records that need official verification before safe transaction.`
                : isHindi
                ? 'सभी जुड़े रिकॉर्ड में कोई बड़ा विरोधाभास नहीं पाया गया।'
                : 'All connected records appear consistent across available registries.'}
            </p>

            {/* Findings list */}
            <div className="mt-4 space-y-3">
              {parcel.findings.map((f) => {
                const isItemRed = f.severity === 'red';
                const isItemAmber = f.severity === 'amber';
                const borderClass = isItemRed
                  ? 'border-l-4 border-[#ba1a1a] bg-[#ffdad6]/20'
                  : isItemAmber
                  ? 'border-l-4 border-amber-500 bg-amber-50/50'
                  : 'border-l-4 border-emerald-600 bg-emerald-50/50';

                const badgeStyle = isItemRed
                  ? 'bg-[#ffdad6] text-[#ba1a1a]'
                  : isItemAmber
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-emerald-100 text-emerald-800';

                return (
                  <div
                    key={f.id}
                    className={`p-3.5 border-y border-r border-[#c4c6cf] rounded flex items-start gap-3 ${borderClass}`}
                  >
                    <span className="text-[20px] mt-0.5">
                      {isItemRed ? '🛑' : isItemAmber ? '⚠️' : '✅'}
                    </span>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-1">
                        <strong className="text-[13px] font-bold text-[#00142f]">
                          {isHindi ? f.titleHi : f.titleEn}
                        </strong>
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${badgeStyle}`}>
                          {isHindi ? f.badgeHi : f.badgeEn}
                        </span>
                      </div>
                      <p className="text-[13px] text-[#131b2e] mt-1 leading-relaxed">
                        {isHindi ? f.descriptionHi : f.descriptionEn}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Actions under Findings */}
            <div className="mt-5 pt-4 border-t border-[#c4c6cf] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onOpenEvidence()}
                  className="text-[#0155c7] hover:underline font-semibold text-[13px] flex items-center gap-1.5 cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                  <span>{isHindi ? 'प्रमाण व साक्ष्य देखें' : 'SEE DETAILS & EVIDENCE'}</span>
                </button>
                <span className="text-[#c4c6cf]">|</span>
                <button
                  onClick={onOpenTimeline}
                  className="text-[#0155c7] hover:underline font-semibold text-[13px] flex items-center gap-1.5 cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 14 14" />
                  </svg>
                  <span>{isHindi ? 'कालक्रम इतिहास (Timeline)' : 'Land Timeline'}</span>
                </button>
              </div>

              {/* Citizen Action Button */}
              {activeIssues.length > 0 ? (
                <button
                  onClick={onResolveIssue}
                  className="bg-[#0155c7] hover:bg-[#336fe2] text-white px-5 py-2.5 rounded font-bold text-[13px] flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 11 12 14 22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                  <span>{isHindi ? 'इस समस्या का समाधान करें' : 'RESOLVE THIS ISSUE'}</span>
                </button>
              ) : (
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-300 px-3 py-1.5 rounded font-semibold text-[12px] flex items-center gap-1.5">
                  <span>✓</span>
                  <span>{isHindi ? 'वर्तमान में किसी कार्रवाई की आवश्यकता नहीं' : 'NO ACTION CURRENTLY REQUIRED'}</span>
                </span>
              )}
            </div>
          </div>

          {/* Land Health Score Block */}
          <div className="flex flex-col items-center justify-center bg-[#f2f3ff] p-5 rounded-xl border border-[#c4c6cf] min-w-[210px] text-center w-full lg:w-auto">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#44474e] mb-1">
              {isHindi ? 'भूमि स्वास्थ्य सूचकांक' : 'LAND HEALTH'}
            </span>
            <div className="flex items-baseline justify-center">
              <span className={`font-headline text-[46px] font-bold leading-none ${scoreTextColor}`}>
                {parcel.healthScore}
              </span>
              <span className="text-[20px] font-bold text-[#44474e]">/100</span>
            </div>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded mt-2 ${badgeBg}`}>
              {isCritical
                ? isHindi ? 'समीक्षा आवश्यक' : 'Critical Attention'
                : isMedium
                ? isHindi ? 'समीक्षा जरूरी' : 'Needs Review'
                : isHindi ? 'स्पष्ट' : 'Clean Title'}
            </span>

            {/* Check statistics */}
            <div className="mt-4 pt-3 border-t border-[#c4c6cf] w-full text-[11px] space-y-1.5 font-medium">
              <div className="flex justify-between">
                <span className="text-emerald-700">
                  {isHindi ? '✓ निर्विवाद जांच:' : '✓ Consistent:'}
                </span>
                <span className="font-bold">
                  {parcel.connectedRecords.filter((r) => r.findingSeverity === 'green').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#ba1a1a]">
                  {isHindi ? '! ध्यान देने योग्य:' : '! Need Attention:'}
                </span>
                <span className="font-bold">
                  {parcel.connectedRecords.filter((r) => r.findingSeverity === 'red' || r.findingSeverity === 'amber').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#74777f]">
                  {isHindi ? '- अनुपलब्ध:' : '- Unavailable:'}
                </span>
                <span className="font-bold">
                  {parcel.connectedRecords.filter((r) => r.sourceStatus === 'UNAVAILABLE').length}
                </span>
              </div>
            </div>

            <p className="text-[10px] text-[#74777f] mt-3 leading-tight border-t border-[#c4c6cf]/60 pt-2">
              {isHindi
                ? 'यह स्कोर कानूनी स्वामित्व या टाइटल की गारंटी नहीं देता है।'
                : 'Score does not establish legal ownership or title guarantee.'}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Connected Records (The 7 Information Domains) */}
      <div className="bg-white border border-[#c4c6cf] rounded-xl p-5 sm:p-6 shadow-xs" id="connected-records-section">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#c4c6cf] mb-4">
          <div>
            <h3 className="font-headline text-[20px] font-bold text-[#00142f]">
              {isHindi ? 'जुड़े हुए रिकॉर्ड (VIEW CONNECTED RECORDS)' : 'View Connected Records'}
            </h3>
            <p className="text-[13px] text-[#44474e]">
              {isHindi
                ? 'प्रत्येक आधिकारिक रजिस्ट्री के स्रोत की उपलब्धता और जांच परिणामों का स्पष्ट विवरण।'
                : 'Clear breakdown comparing source availability against findings for each of the 7 connected domains.'}
            </p>
          </div>
          <span className="text-[11px] font-mono bg-[#eaedff] text-[#00142f] px-2.5 py-1 rounded border border-[#c4c6cf] self-start sm:self-auto">
            {isHindi ? '7 डेटाबेस में एकीकृत' : 'Federated Across 7 Registries'}
          </span>
        </div>

        {/* The 7 Domains List */}
        <div className="space-y-2.5">
          {parcel.connectedRecords.map((record) => {
            const isSrcAvail = record.sourceStatus === 'AVAILABLE';
            const isSrcIncons = record.sourceStatus === 'INCONSISTENT';

            const srcBadge = isSrcAvail
              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
              : isSrcIncons
              ? 'bg-amber-50 text-amber-800 border-amber-300'
              : 'bg-[#eaedff] text-[#44474e] border-[#c4c6cf]';

            const findingSeverity = record.findingSeverity;
            const findingBadge = findingSeverity === 'red'
              ? 'bg-[#ffdad6] text-[#ba1a1a] border-[#ffdad6]'
              : findingSeverity === 'amber'
              ? 'bg-amber-50 text-amber-800 border-amber-300'
              : findingSeverity === 'grey'
              ? 'bg-[#f2f3ff] text-[#44474e] border-[#c4c6cf]'
              : 'bg-emerald-50 text-emerald-800 border-emerald-300';

            return (
              <div
                key={record.id}
                className="p-3 bg-[#f2f3ff] rounded border border-[#c4c6cf] flex flex-col md:flex-row md:items-center justify-between gap-3 hover:border-[#0155c7] transition-all"
              >
                <div className="flex items-start gap-3">
                  <span className="text-[16px] font-mono font-bold text-[#0155c7] w-5 text-right mt-0.5">
                    {record.domainNumber}.
                  </span>
                  <div>
                    <strong className="text-[13px] font-semibold text-[#00142f] block">
                      {isHindi ? record.domainNameHi : record.domainNameEn}
                    </strong>
                    <span className="text-[12px] text-[#44474e] block">{record.summary}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
                  <span className={`text-[11px] border px-2 py-0.5 rounded font-medium ${srcBadge}`}>
                    Source: {record.sourceStatus}
                  </span>
                  <span className={`text-[11px] border px-2 py-0.5 rounded font-bold flex items-center gap-1 ${findingBadge}`}>
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        findingSeverity === 'red'
                          ? 'bg-[#ba1a1a]'
                          : findingSeverity === 'amber'
                          ? 'bg-amber-500'
                          : findingSeverity === 'grey'
                          ? 'bg-gray-400'
                          : 'bg-emerald-600'
                      }`}
                    ></span>
                    <span>{record.findingStatus}</span>
                  </span>
                  <button
                    onClick={() => setActiveDomainProvenance(record)}
                    className="text-[11px] font-medium text-[#0155c7] hover:underline bg-white border border-[#c4c6cf] px-2 py-0.5 rounded cursor-pointer ml-1"
                  >
                    {isHindi ? 'स्रोत विवरण (Provenance)' : 'Provenance'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Provenance Drawer/Modal */}
      {activeDomainProvenance && (
        <div className="fixed inset-0 z-50 bg-[#00142f]/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#c4c6cf] rounded-xl max-w-lg w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#c4c6cf]">
              <div className="flex items-center gap-2">
                <span className="text-[20px]">🏛️</span>
                <h4 className="font-headline text-[18px] font-bold text-[#00142f]">
                  {isHindi ? 'डेटा स्रोत एवं प्रामाणिकता (Provenance)' : 'Data Provenance & Audit Trail'}
                </h4>
              </div>
              <button
                onClick={() => setActiveDomainProvenance(null)}
                className="text-[#74777f] hover:text-[#00142f] text-[18px] font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-[13px]">
              <div>
                <span className="text-[11px] font-bold uppercase text-[#44474e] block">Registry Domain:</span>
                <strong className="text-[#00142f]">
                  {activeDomainProvenance.domainNumber}. {activeDomainProvenance.domainNameEn}
                </strong>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-[#f2f3ff] p-3 rounded border border-[#c4c6cf]">
                <div>
                  <span className="text-[11px] font-semibold text-[#44474e] block">Source:</span>
                  <span className="font-medium text-[#00142f]">{activeDomainProvenance.provenance.source}</span>
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-[#44474e] block">Department:</span>
                  <span className="font-medium text-[#00142f]">{activeDomainProvenance.provenance.sourceDepartment}</span>
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-[#44474e] block">Record Date:</span>
                  <span className="font-mono text-[#00142f]">{activeDomainProvenance.provenance.recordDate}</span>
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-[#44474e] block">Last Synchronized:</span>
                  <span className="font-mono text-[#00142f]">{activeDomainProvenance.provenance.lastSynchronized}</span>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-[#44474e] block">Status:</span>
                <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded text-[11px] inline-block border border-emerald-300">
                  {activeDomainProvenance.provenance.status}
                </span>
              </div>

              {activeDomainProvenance.provenance.recordId && (
                <div>
                  <span className="text-[11px] font-semibold text-[#44474e] block">System Identifier / Token:</span>
                  <code className="bg-[#eaedff] text-[#00142f] px-2 py-1 rounded text-[12px] font-mono block">
                    {activeDomainProvenance.provenance.recordId}
                  </code>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-[#c4c6cf] flex justify-end">
              <button
                onClick={() => setActiveDomainProvenance(null)}
                className="bg-[#00142f] text-white px-4 py-1.5 rounded text-[12px] font-semibold hover:bg-[#0f294a] cursor-pointer"
              >
                {isHindi ? 'बंद करें' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

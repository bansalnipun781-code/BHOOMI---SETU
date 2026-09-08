import React from 'react';
import { ResolutionCase, Language, Parcel } from '../types';

interface CaseTrackingProps {
  caseData: ResolutionCase;
  parcel: Parcel;
  language: Language;
  onSimulateResolution: () => void;
  onNavigateToParcel: () => void;
  onOpenOfficerPortal: () => void;
}

export const CaseTracking: React.FC<CaseTrackingProps> = ({
  caseData,
  parcel,
  language,
  onSimulateResolution,
  onNavigateToParcel,
  onOpenOfficerPortal,
}) => {
  const isHindi = language === 'hi';

  const steps = [
    { key: 'SUBMITTED', labelEn: 'Submitted', labelHi: 'जमा किया गया', date: '28 Aug 2026' },
    { key: 'UNDER_REVIEW', labelEn: 'Under Review', labelHi: 'समीक्षाधीन', date: '30 Aug 2026' },
    { key: 'FIELD_VERIFICATION', labelEn: 'Field Verification', labelHi: 'क्षेत्रीय सत्यापन', date: '01 Sep 2026' },
    { key: 'RESOLVED', labelEn: 'Resolved', labelHi: 'निस्तारित', date: '02 Sep 2026' },
  ];

  const getStepIndex = (status: ResolutionCase['status']) => {
    switch (status) {
      case 'SUBMITTED':
        return 0;
      case 'UNDER_REVIEW':
        return 1;
      case 'FIELD_VERIFICATION':
        return 2;
      case 'RESOLVED':
        return 3;
      default:
        return 0;
    }
  };

  const currentIdx = getStepIndex(caseData.status);
  const isResolved = caseData.status === 'RESOLVED';

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-[#c4c6cf] rounded-xl p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#c4c6cf]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0155c7]">
                {isHindi ? 'नागरिक अनुरोध ट्रैकर' : 'Citizen Grievance & Correction Tracker'}
              </span>
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                  isResolved
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {isResolved ? (isHindi ? 'पूर्ण / निस्तारित' : 'RESOLVED') : (isHindi ? 'प्रगति पर' : 'IN PROGRESS')}
              </span>
            </div>
            <h2 className="font-headline text-[22px] sm:text-[26px] font-bold text-[#00142f] mt-1">
              {isHindi ? `आपका अनुरोध: प्रकरण #${caseData.caseId}` : `Your Request: Case #${caseData.caseId}`}
            </h2>
            <p className="text-[13px] text-[#44474e]">
              ULPIN: <strong className="font-mono text-[#00142f]">{caseData.ulpin}</strong> | Survey:{' '}
              <strong className="font-mono text-[#00142f]">{parcel.surveyNumber}</strong> | Village:{' '}
              <strong>{parcel.village}</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {!isResolved ? (
              <button
                onClick={onSimulateResolution}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-[12px] px-4 py-2 rounded flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
                title="Simulate official government officer resolving this case in 1-click"
              >
                <span>⚡</span>
                <span>{isHindi ? '1-क्लिक समाधान डेमो चलाएं' : 'Simulate 1-Click Verification Demo'}</span>
              </button>
            ) : (
              <button
                onClick={onNavigateToParcel}
                className="bg-[#0155c7] hover:bg-[#336fe2] text-white font-bold text-[12px] px-4 py-2 rounded flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                <span>{isHindi ? 'पुनः मूल्यांकित स्वास्थ्य रिपोर्ट देखें (94/100)' : 'View Re-evaluated Health Report (94/100)'}</span>
              </button>
            )}

            <button
              onClick={onOpenOfficerPortal}
              className="bg-[#00142f] hover:bg-[#0f294a] text-[#dae2fd] text-[12px] font-semibold px-3 py-2 rounded border border-[#30476a] cursor-pointer"
            >
              {isHindi ? 'अधिकारी पोर्टल में जांचें' : 'Inspect in Officer Portal'}
            </button>
          </div>
        </div>

        {/* 4-Step Progress Tracker */}
        <div className="py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 relative">
            {steps.map((step, idx) => {
              const isPast = idx < currentIdx;
              const isCurrent = idx === currentIdx;

              const stepBg = isPast || isCurrent ? (isResolved ? 'bg-emerald-600' : 'bg-[#0155c7]') : 'bg-[#c4c6cf]';
              const textClass = isPast || isCurrent ? 'text-[#00142f] font-bold' : 'text-[#74777f]';

              return (
                <div key={step.key} className="flex flex-col items-center text-center p-3 rounded-lg bg-[#f2f3ff] border border-[#c4c6cf]/80">
                  <div
                    className={`w-9 h-9 rounded-full ${stepBg} text-white flex items-center justify-center font-bold text-[13px] mb-2 shadow-xs`}
                  >
                    {isPast || (isCurrent && isResolved) ? '✓' : idx + 1}
                  </div>
                  <span className={`text-[13px] ${textClass}`}>
                    {isHindi ? step.labelHi : step.labelEn}
                  </span>
                  <span className="text-[11px] font-mono text-[#44474e] mt-0.5">
                    {step.date}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Case Findings & Official Action Summary */}
        <div className="space-y-4 pt-4 border-t border-[#c4c6cf]">
          <h3 className="font-headline text-[16px] font-bold text-[#00142f]">
            {isHindi ? 'अनुरोधित मुद्दे एवं क्षेत्रीय सत्यापन स्थिति' : 'Addressed Discrepancies & Verification Status'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-3.5 rounded border ${isResolved ? 'bg-emerald-50 border-emerald-300' : 'bg-[#ffdad6]/20 border-[#ffdad6]'}`}>
              <div className="flex items-center justify-between mb-1">
                <strong className="text-[13px] text-[#00142f]">1. Court Stay Check</strong>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${isResolved ? 'bg-emerald-100 text-emerald-800' : 'bg-[#ffdad6] text-[#ba1a1a]'}`}>
                  {isResolved ? 'VACATED BY ORDER' : 'ACTIVE INJUNCTION'}
                </span>
              </div>
              <p className="text-[12px] text-[#44474e]">
                {isResolved
                  ? 'Compromise decree recorded in Sub-Registrar ledger; alienation ban removed.'
                  : 'OS-482/2024 active stay on alienation flagged in civil court computer system.'}
              </p>
            </div>

            <div className={`p-3.5 rounded border ${isResolved ? 'bg-emerald-50 border-emerald-300' : 'bg-amber-50 border-amber-300'}`}>
              <div className="flex items-center justify-between mb-1">
                <strong className="text-[13px] text-[#00142f]">2. Boundary Demarcation</strong>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${isResolved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                  {isResolved ? 'RE-DEMARCATED' : '0.36 AC OVERLAP'}
                </span>
              </div>
              <p className="text-[12px] text-[#44474e]">
                {isResolved
                  ? 'Joint drone survey placed boundary pillars at 1.97 acres clear of drainage nala.'
                  : 'Vector boundary overlapped drainage nala leading to 0.36 acre variance.'}
              </p>
            </div>

            <div className={`p-3.5 rounded border ${isResolved ? 'bg-emerald-50 border-emerald-300' : 'bg-amber-50 border-amber-300'}`}>
              <div className="flex items-center justify-between mb-1">
                <strong className="text-[13px] text-[#00142f]">3. Mutation & Title Chain</strong>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${isResolved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                  {isResolved ? 'SANCTIONED' : 'PENDING REVIEW'}
                </span>
              </div>
              <p className="text-[12px] text-[#44474e]">
                {isResolved
                  ? 'Khatauni 81 updated with registered deed #4109/25 and regularized chain.'
                  : '3 rapid transactions flagged title history verification before record entry.'}
              </p>
            </div>
          </div>

          {/* Officer Resolution Notes */}
          {isResolved && (
            <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-lg space-y-2">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-[14px]">
                <span>✓</span>
                <span>{isHindi ? 'शासकीय आदेश व निस्तारण टिप्पणी (Official Sanction Note)' : 'Official Sanction & Re-Reconciliation Audit'}</span>
              </div>
              <p className="text-[13px] text-emerald-950 font-mono bg-white p-3 rounded border border-emerald-200">
                Order #BS-2026-MUT-81 dated 02 Sep 2026: &quot;Verified with Senior Civil Court OS-482/2024 compromise disposal. Field verification by Naib Tehsildar with DGPS drone fixed boundary pillars. Recorded area confirmed at 1.97 Acres. Automated cross-registry health score restored from 28/100 to 94/100.&quot;
              </p>
              <div className="text-[11px] text-emerald-800 flex justify-between font-medium">
                <span>Sanctioning Authority: Sub-Divisional Magistrate (SDM), Rampur</span>
                <span>Digital Token: #SDM-RMP-2026-0902-817</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

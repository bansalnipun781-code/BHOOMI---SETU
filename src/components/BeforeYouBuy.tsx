import React from 'react';
import { Parcel, Language } from '../types';

interface BeforeYouBuyProps {
  parcel: Parcel;
  language: Language;
  onNavigateToParcel: () => void;
  onSelectSample: (ulpin: string) => void;
}

export const BeforeYouBuy: React.FC<BeforeYouBuyProps> = ({
  parcel,
  language,
  onNavigateToParcel,
  onSelectSample,
}) => {
  const isHindi = language === 'hi';

  const criticalIssues = parcel.findings.filter(f => f.severity === 'red');
  const reviewIssues = parcel.findings.filter(f => f.severity === 'amber');
  const totalConcerns = criticalIssues.length + reviewIssues.length;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-[#c4c6cf] rounded-xl p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#c4c6cf]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0155c7]">
                {isHindi ? 'खरीद पूर्व सतर्कता जांच' : 'Pre-Purchase Citizen Due-Diligence'}
              </span>
              <span className="bg-[#eaedff] text-[#00142f] text-[11px] font-bold px-2 py-0.5 rounded border border-[#c4c6cf]">
                7 Registries Checked
              </span>
            </div>
            <h2 className="font-headline text-[22px] sm:text-[26px] font-bold text-[#00142f] mt-1">
              {isHindi ? 'खरीदने से पहले जांचें (BEFORE YOU BUY)' : 'BEFORE YOU BUY — PRE-PURCHASE CHECK'}
            </h2>
            <p className="text-[13px] text-[#44474e]">
              Evaluating Parcel ULPIN: <strong className="font-mono text-[#00142f]">{parcel.ulpin}</strong> ({parcel.village}, Survey: {parcel.surveyNumber})
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onNavigateToParcel}
              className="bg-[#00142f] hover:bg-[#0f294a] text-white text-[12px] font-bold px-4 py-2 rounded transition-colors cursor-pointer"
            >
              {isHindi ? 'पूर्ण प्रोफाइल देखें' : 'View Full Parcel Profile'}
            </button>
          </div>
        </div>

        {/* Big Verdict Callout */}
        <div className="pt-6">
          <div
            className={`p-5 rounded-xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
              totalConcerns > 0
                ? 'bg-[#ffdad6]/25 border-[#ba1a1a]'
                : 'bg-emerald-50 border-emerald-300'
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold ${
                  totalConcerns > 0 ? 'bg-[#ba1a1a]' : 'bg-emerald-600'
                }`}
              >
                {totalConcerns > 0 ? '!' : '✓'}
              </div>
              <div>
                <h3 className="font-headline text-[18px] sm:text-[20px] font-bold text-[#00142f]">
                  {totalConcerns > 0
                    ? isHindi
                      ? `${totalConcerns} गंभीर मुद्दे पाए गए — अग्रिम भुगतान या बैनामा करने से पहले समाधान आवश्यक!`
                      : `${totalConcerns} issues require verification before proceeding with transaction`
                    : isHindi
                    ? 'जांचे गए सभी 7 रिकॉर्ड में कोई विरोधाभास नहीं मिला (सुरक्षित स्थिति)'
                    : 'No major cross-registry inconsistencies detected in connected records'}
                </h3>
                <p className="text-[13px] text-[#131b2e] mt-1">
                  {totalConcerns > 0
                    ? 'अदालती स्थगन आदेश (Stay) अथवा भौतिक सीमा विसंगति के कारण रजिस्ट्री अवैध घोषित हो सकती है अथवा बैंक ऋण अस्वीकृत हो सकता है।'
                    : 'Record of Rights, registration ledger, tax clearance, zoning code, and cadastral boundary are consistent.'}
                </p>
              </div>
            </div>

            <div className="text-right min-w-[140px] bg-white p-3 rounded-lg border border-[#c4c6cf]/80 self-stretch md:self-auto">
              <span className="text-[10px] font-bold uppercase text-[#44474e] block">Land Health Score</span>
              <div className="flex items-baseline justify-end gap-1">
                <span className={`font-headline text-[26px] font-bold ${totalConcerns > 0 ? 'text-[#ba1a1a]' : 'text-emerald-700'}`}>
                  {parcel.healthScore}
                </span>
                <span className="text-[14px] text-[#74777f]">/100</span>
              </div>
            </div>
          </div>
        </div>

        {/* 7-Domain Checklist */}
        <div className="pt-6 space-y-3">
          <h3 className="font-headline text-[16px] font-bold text-[#00142f]">
            {isHindi ? '7-आधिकारिक रजिस्ट्री सत्यापन जांच सूची' : '7-Domain Statutory Due Diligence Checklist'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {parcel.connectedRecords.map((rec) => {
              const isGreen = rec.findingSeverity === 'green';
              const isRed = rec.findingSeverity === 'red';
              const isAmber = rec.findingSeverity === 'amber';

              return (
                <div
                  key={rec.id}
                  className="p-3.5 bg-[#f2f3ff] rounded-lg border border-[#c4c6cf] flex items-start justify-between gap-3"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="text-[18px]">
                      {isRed ? '🛑' : isAmber ? '⚠️' : isGreen ? '✅' : 'ℹ️'}
                    </span>
                    <div>
                      <strong className="text-[13px] text-[#00142f] block">
                        {rec.domainNumber}. {isHindi ? rec.domainNameHi : rec.domainNameEn}
                      </strong>
                      <span className="text-[12px] text-[#44474e] block mt-0.5">{rec.summary}</span>
                    </div>
                  </div>

                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded shrink-0 ${
                      isRed
                        ? 'bg-[#ffdad6] text-[#ba1a1a]'
                        : isAmber
                        ? 'bg-amber-100 text-amber-800'
                        : isGreen
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {isRed ? 'Review Needed' : isAmber ? 'Check Required' : isGreen ? 'No Issue Found' : 'Unavailable'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mandatory Statutory Disclaimer as specified in guidelines */}
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg text-[12px] text-amber-900 flex items-start gap-2.5">
          <span className="text-[18px] text-amber-700">⚖️</span>
          <div>
            <strong className="block text-amber-950 font-bold mb-0.5">
              Statutory Disclaimer &amp; Citizen Notice:
            </strong>
            BHOOMI-SETU is an automated information aggregation and due-diligence aid designed to reveal hidden cross-departmental variances. It is NOT a legal title guarantee, conveyance deed, or conclusive proof of unencumbered ownership. Always inspect physical possession and consult local revenue authorities prior to executing registration agreements.
          </div>
        </div>
      </div>
    </div>
  );
};

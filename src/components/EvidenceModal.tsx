import React from 'react';
import { Parcel, Language, ParcelFinding } from '../types';

interface EvidenceModalProps {
  parcel: Parcel;
  selectedFinding?: ParcelFinding;
  language: Language;
  onClose: () => void;
  onStartResolution: () => void;
}

export const EvidenceModal: React.FC<EvidenceModalProps> = ({
  parcel,
  selectedFinding,
  language,
  onClose,
  onStartResolution,
}) => {
  const isHindi = language === 'hi';

  const findingsToDisplay = selectedFinding ? [selectedFinding] : parcel.findings;

  return (
    <div className="fixed inset-0 z-50 bg-[#00142f]/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-white border border-[#c4c6cf] rounded-xl max-w-4xl w-full p-6 shadow-2xl space-y-6 my-auto max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#c4c6cf]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-[#ba1a1a] text-white flex items-center justify-center font-bold">
              !
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#ba1a1a]">
                {isHindi ? 'सत्यापन योग्य साक्ष्य व तुलना' : 'Cross-Registry Audit Evidence'}
              </span>
              <h3 className="font-headline text-[20px] sm:text-[22px] font-bold text-[#00142f]">
                {isHindi ? 'साक्ष्य व विसंगति विश्लेषण (Evidence & Details)' : 'Evidence & Discrepancy Analysis'}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#74777f] hover:text-[#00142f] text-2xl font-bold p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Explainable AI & Statutory Banner */}
        <div className="bg-[#f2f3ff] border border-[#c4c6cf] rounded-lg p-3 text-[12px] text-[#44474e] flex items-start gap-2.5">
          <span className="text-[16px] text-[#0155c7]">ℹ️</span>
          <div>
            <strong className="text-[#00142f]">
              {isHindi ? 'स्पष्टीकरण सहायता सिद्धांत:' : 'Explainable Due-Diligence Aid:'}
            </strong>{' '}
            {isHindi
              ? 'BHOOMI-SETU केवल आधिकारिक रजिस्ट्रियों के बीच विसंगतियों को इंगित करता है। यह स्वामित्व तय नहीं करता और न ही अदालत के अधिकार क्षेत्र में हस्तक्षेप करता है।'
              : 'BHOOMI-SETU identifies cross-system inconsistencies to assist citizens and officers. It does not establish legal title or replace statutory court orders.'}
          </div>
        </div>

        {/* Findings and Side-by-Side Records */}
        <div className="space-y-6">
          {findingsToDisplay.map((finding, idx) => (
            <div
              key={finding.id || idx}
              className="border border-[#c4c6cf] rounded-lg p-4 space-y-3 bg-white"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#c4c6cf] pb-2">
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${finding.severity === 'red' ? 'bg-[#ba1a1a]' : 'bg-amber-500'}`}></span>
                  <h4 className="font-bold text-[15px] text-[#00142f]">
                    {isHindi ? finding.titleHi : finding.titleEn}
                  </h4>
                </div>
                <span className="text-[11px] font-semibold bg-[#ffdad6] text-[#ba1a1a] px-2.5 py-0.5 rounded">
                  {isHindi ? finding.badgeHi : finding.badgeEn}
                </span>
              </div>

              <p className="text-[13px] text-[#131b2e] leading-relaxed">
                {isHindi ? finding.descriptionHi : finding.descriptionEn}
              </p>

              {/* Side-by-side comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-[#f2f3ff] border border-[#c4c6cf] rounded">
                  <span className="text-[11px] font-bold uppercase text-[#0155c7] block">
                    {isHindi ? 'स्रोत रिकॉर्ड 1' : 'Source Record A'}
                  </span>
                  <div className="mt-1 text-[13px]">
                    <strong className="text-[#00142f] block">
                      {finding.id === 'f-005-1'
                        ? 'Judicial Injunction / e-Courts Registry'
                        : finding.id === 'f-005-2'
                        ? 'Revenue RoR Khatauni Ledger (Record of Rights)'
                        : 'Sub-Registrar Conveyance Register'}
                    </strong>
                    <div className="text-[12px] text-[#44474e] mt-1 font-mono">
                      {finding.id === 'f-005-1'
                        ? 'Suit OS-482/2024: "Status quo & stay on alienation of Survey 142/3A"'
                        : finding.id === 'f-005-2'
                        ? 'Recorded Khatauni Area: 1.97 Acres (0.797 Hectares)'
                        : 'Deed #4109/25: Transferred 3 times between July 2025 and Aug 2026'}
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-[#f2f3ff] border border-[#c4c6cf] rounded">
                  <span className="text-[11px] font-bold uppercase text-[#ba1a1a] block">
                    {isHindi ? 'स्रोत रिकॉर्ड 2 (विरोधाभास)' : 'Source Record B (Contradiction)'}
                  </span>
                  <div className="mt-1 text-[13px]">
                    <strong className="text-[#00142f] block">
                      {finding.id === 'f-005-1'
                        ? 'Sub-Registrar Registry (Registration Dept)'
                        : finding.id === 'f-005-2'
                        ? 'Cadastral GIS Vector Polygon & Irrigation Layer'
                        : 'District Agricultural Tenancy Benchmark'}
                    </strong>
                    <div className="text-[12px] text-[#44474e] mt-1 font-mono">
                      {finding.id === 'f-005-1'
                        ? 'Deed #4109/25 was presented without automatic stay impediment check'
                        : finding.id === 'f-005-2'
                        ? 'Mapped Vector Area: 1.61 Acres (0.36 Acre overlaps Public Nala drain)'
                        : 'Baseline transfer frequency is < 0.15/year for this village'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Citizen plain language impact */}
              <div className="p-3 bg-amber-50 border border-amber-200 rounded text-[12px] text-amber-900">
                <strong>{isHindi ? 'नागरिक के लिए इसका क्या अर्थ है?' : 'What this means for you:'}</strong>{' '}
                {finding.id === 'f-005-1'
                  ? 'If you purchase this land now, the court stay may invalidate your registration and bank loan approval will be blocked.'
                  : finding.id === 'f-005-2'
                  ? 'You are paying for 1.97 acres but physical boundary map only accommodates 1.61 acres. 0.36 acres is protected public drainage land.'
                  : 'Multiple recent transfers require title history verification to ensure no fraudulent power of attorney was executed.'}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-[#c4c6cf] flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-[#c4c6cf] rounded text-[13px] font-medium text-[#44474e] hover:bg-[#f2f3ff] cursor-pointer"
          >
            {isHindi ? 'वापस जाएं' : 'Close'}
          </button>
          <button
            onClick={() => {
              onClose();
              onStartResolution();
            }}
            className="bg-[#0155c7] hover:bg-[#336fe2] text-white px-5 py-2 rounded text-[13px] font-bold flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <span>{isHindi ? 'सुधार / समाधान अनुरोध शुरू करें' : 'Start Resolution Request'}</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

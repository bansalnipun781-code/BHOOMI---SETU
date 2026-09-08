import React from 'react';
import { Parcel, Language } from '../types';

interface TimelineModalProps {
  parcel: Parcel;
  language: Language;
  onClose: () => void;
}

export const TimelineModal: React.FC<TimelineModalProps> = ({
  parcel,
  language,
  onClose,
}) => {
  const isHindi = language === 'hi';

  const defaultEvents = [
    {
      date: '14 Jan 2011',
      title: 'Original Agricultural Allotment & Settlement',
      authority: 'Tehsil Revenue Court',
      desc: 'Settlement under Zamindari Abolition Act; initial Khatauni 81 created with 1.97 Acres recorded under hereditary tenancy.',
      status: 'Historical',
    },
    {
      date: '08 Mar 2018',
      title: 'District Cadastral Vector Resurvey (ETR/DGPS)',
      authority: 'Survey of India / State Settlement Office',
      desc: 'DGPS vector map generated. Survey mapped boundary without resolving natural nala drainage alignment.',
      status: 'Spatial Survey',
    },
    {
      date: '14 Jul 2024',
      title: 'Civil Dispute OS-482/2024 Injunction Lodged',
      authority: 'Senior Civil Court, Rampur',
      desc: 'Partition suit filed by co-sharers; interim order directed status quo on alienations and bank mortgages.',
      status: 'Judicial Notice',
      isFlagged: true,
    },
    {
      date: '19 Dec 2025',
      title: 'Conveyance Sale Deed Registered (#4109/25)',
      authority: 'Sub-Registrar Office, Rampur',
      desc: 'Sale deed executed without civil injunction verification; mutation stayed in revenue computer registry.',
      status: 'Registration',
      isFlagged: true,
    },
    {
      date: '28 Aug 2026',
      title: 'BHOOMI-SETU Cross-Registry Inconsistency Flagged',
      authority: 'Automated AI/Statutory Rule Engine',
      desc: '3 cross-departmental variances detected: court stay vs registration, RoR area vs vector polygon, and rapid transfer frequency.',
      status: 'Intelligence Audit',
      isFlagged: true,
    },
  ];

  if (parcel.isResolved) {
    defaultEvents.push({
      date: '02 Sep 2026',
      title: 'Official Resolution & Sanction (#BS-2026-00182)',
      authority: 'Joint Revenue & Civil Court Sanction',
      desc: 'Court stay vacated following compromise decree; drone survey demarcated 1.97 Acres boundary pillars; mutation sanctioned.',
      status: 'Resolved & Cleaned',
      isFlagged: false,
    });
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#00142f]/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-white border border-[#c4c6cf] rounded-xl max-w-3xl w-full p-6 shadow-2xl space-y-6 my-auto max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#c4c6cf]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-[#00142f] text-white flex items-center justify-center">
              <svg className="w-5 h-5 text-[#dae2fd]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 14 14" />
              </svg>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0155c7]">
                {isHindi ? 'कालक्रम एवं ऐतिहासिक श्रृंखला' : 'Unified Chain of Custody'}
              </span>
              <h3 className="font-headline text-[20px] sm:text-[22px] font-bold text-[#00142f]">
                {isHindi ? 'भूमि का ऐतिहासिक कालक्रम (Land Timeline)' : 'Historical Land Timeline'}
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

        <div className="bg-[#f2f3ff] p-3 rounded text-[12px] text-[#44474e] border border-[#c4c6cf] flex items-center justify-between">
          <span>
            ULPIN: <strong className="font-mono text-[#00142f]">{parcel.ulpin}</strong> | Survey:{' '}
            <strong className="font-mono text-[#00142f]">{parcel.surveyNumber}</strong>
          </span>
          <span className="text-[11px] font-semibold text-[#0155c7]">
            {isHindi ? '5 ऐतिहासिक बिंदु' : `${defaultEvents.length} Recorded Milestones`}
          </span>
        </div>

        {/* Vertical Timeline */}
        <div className="relative pl-6 border-l-2 border-[#c4c6cf] ml-4 space-y-6">
          {defaultEvents.map((evt, idx) => (
            <div key={idx} className="relative">
              <div
                className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 border-white ${
                  evt.isFlagged
                    ? 'bg-[#ba1a1a]'
                    : evt.status.includes('Resolved')
                    ? 'bg-emerald-600 ring-4 ring-emerald-100'
                    : 'bg-[#0155c7]'
                }`}
              ></div>

              <div className="bg-[#f2f3ff] border border-[#c4c6cf] rounded-lg p-3.5 space-y-1">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <span className="text-[11px] font-bold font-mono text-[#0155c7] bg-white px-2 py-0.5 rounded border border-[#c4c6cf]">
                    {evt.date}
                  </span>
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                      evt.isFlagged
                        ? 'bg-[#ffdad6] text-[#ba1a1a]'
                        : evt.status.includes('Resolved')
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-white text-[#44474e] border border-[#c4c6cf]'
                    }`}
                  >
                    {evt.status}
                  </span>
                </div>

                <h4 className="font-bold text-[14px] text-[#00142f] mt-1">{evt.title}</h4>
                <div className="text-[11px] font-medium text-[#44474e]">Authority: {evt.authority}</div>
                <p className="text-[12px] text-[#131b2e] pt-1 leading-relaxed">{evt.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Close Button */}
        <div className="pt-4 border-t border-[#c4c6cf] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#00142f] text-white rounded text-[13px] font-bold hover:bg-[#0f294a] cursor-pointer"
          >
            {isHindi ? 'बंद करें' : 'Close Timeline'}
          </button>
        </div>
      </div>
    </div>
  );
};

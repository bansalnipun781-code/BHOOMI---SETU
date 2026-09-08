import React, { useState } from 'react';
import { Parcel, ResolutionCase, Language } from '../types';

interface GovernmentDashboardProps {
  parcels: Parcel[];
  cases: ResolutionCase[];
  language: Language;
  onOpenParcel: (ulpin: string) => void;
  onResolveCase: (caseId: string) => void;
}

export const GovernmentDashboard: React.FC<GovernmentDashboardProps> = ({
  parcels,
  cases,
  language,
  onOpenParcel,
  onResolveCase,
}) => {
  const [filterUrgency, setFilterUrgency] = useState<'all' | 'critical' | 'medium' | 'resolved'>('all');
  const [selectedCaseModal, setSelectedCaseModal] = useState<ResolutionCase | null>(null);
  const [officerNote, setOfficerNote] = useState('');

  const isHindi = language === 'hi';

  // Calculate high-level metrics
  const totalParcels = parcels.length;
  const criticalParcels = parcels.filter(p => p.attentionLevel === 'Critical' || p.attentionLevel === 'High').length;
  const mediumParcels = parcels.filter(p => p.attentionLevel === 'Medium').length;
  const lowParcels = parcels.filter(p => p.attentionLevel === 'Low').length;

  const totalCases = cases.length;
  const openCases = cases.filter(c => c.status !== 'RESOLVED').length;
  const resolvedCases = cases.filter(c => c.status === 'RESOLVED').length;

  // Filtered priority queue
  const filteredParcels = parcels.filter(p => {
    if (filterUrgency === 'critical') return p.attentionLevel === 'Critical' || p.attentionLevel === 'High';
    if (filterUrgency === 'medium') return p.attentionLevel === 'Medium';
    if (filterUrgency === 'resolved') return p.isResolved;
    return true;
  });

  const handleResolveAction = (caseId: string) => {
    onResolveCase(caseId);
    setSelectedCaseModal(null);
  };

  return (
    <div className="space-y-6">
      {/* Officer Header */}
      <div className="bg-[#00142f] text-white p-6 rounded-xl shadow-xs border border-[#0f294a]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#dae2fd]">
                Internal Administrative Console
              </span>
            </div>
            <h1 className="font-headline text-[24px] sm:text-[28px] font-bold text-white mt-1">
              {isHindi ? 'शासकीय राजस्व एवं समाधान डैशबोर्ड' : 'Government Land Administration & Priority Queue'}
            </h1>
            <p className="text-[13px] text-[#dae2fd]/80 mt-1 max-w-2xl">
              Unified cross-registry triage center. Review anomalies, dispatch field survey verification, and record judicial/statutory reconciliation orders.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-[#0f294a] px-4 py-2.5 rounded-lg border border-[#30476a]">
            <div className="text-right">
              <span className="text-[11px] block text-[#dae2fd]">Logged Officer:</span>
              <strong className="text-[13px] text-white block">Dr. S. K. Verma, IAS (SDM Rampur)</strong>
            </div>
            <div className="w-9 h-9 rounded-full bg-[#0155c7] flex items-center justify-center font-bold text-white text-sm">
              SDM
            </div>
          </div>
        </div>
      </div>

      {/* 5 Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* 1. Attention Distribution */}
        <div className="bg-white border border-[#c4c6cf] p-4 rounded-xl shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#44474e] block">
            1. Attention Needs
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-[28px] font-bold text-[#ba1a1a]">{criticalParcels}</span>
            <span className="text-[12px] text-[#44474e]">Critical / High</span>
          </div>
          <div className="mt-2 text-[11px] text-[#44474e] flex justify-between border-t border-[#c4c6cf]/60 pt-1.5">
            <span>Med: {mediumParcels}</span>
            <span className="text-emerald-700 font-bold">Clean: {lowParcels}</span>
          </div>
        </div>

        {/* 2. Land-Use Distribution */}
        <div className="bg-white border border-[#c4c6cf] p-4 rounded-xl shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#44474e] block">
            2. Land-Use Split
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-[28px] font-bold text-[#00142f]">68%</span>
            <span className="text-[12px] text-[#44474e]">Agricultural</span>
          </div>
          <div className="mt-2 text-[11px] text-[#44474e] flex justify-between border-t border-[#c4c6cf]/60 pt-1.5">
            <span>Res: 22%</span>
            <span>Comm: 10%</span>
          </div>
        </div>

        {/* 3. Record Consistency */}
        <div className="bg-white border border-[#c4c6cf] p-4 rounded-xl shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#44474e] block">
            3. Registry Consistency
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-[28px] font-bold text-emerald-700">76%</span>
            <span className="text-[12px] text-[#44474e]">Fully Reconciled</span>
          </div>
          <div className="mt-2 text-[11px] text-[#44474e] flex justify-between border-t border-[#c4c6cf]/60 pt-1.5">
            <span>Variances: 24%</span>
            <span>7 Registries</span>
          </div>
        </div>

        {/* 4. Dispute Status */}
        <div className="bg-white border border-[#c4c6cf] p-4 rounded-xl shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#44474e] block">
            4. Judicial Disputes
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-[28px] font-bold text-[#ba1a1a]">5</span>
            <span className="text-[12px] text-[#44474e]">Injunctions Active</span>
          </div>
          <div className="mt-2 text-[11px] text-[#44474e] flex justify-between border-t border-[#c4c6cf]/60 pt-1.5">
            <span>Boundary: 8</span>
            <span className="text-emerald-700 font-medium">Clear: {totalParcels - 13}</span>
          </div>
        </div>

        {/* 5. Open Case Status */}
        <div className="bg-white border border-[#c4c6cf] p-4 rounded-xl shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#44474e] block">
            5. Case Workload
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-[28px] font-bold text-[#0155c7]">{openCases}</span>
            <span className="text-[12px] text-[#44474e]">Active Cases</span>
          </div>
          <div className="mt-2 text-[11px] text-[#44474e] flex justify-between border-t border-[#c4c6cf]/60 pt-1.5">
            <span>Total: {totalCases}</span>
            <span className="text-emerald-700 font-bold">Resolved: {resolvedCases}</span>
          </div>
        </div>
      </div>

      {/* Priority Queue Section */}
      <div className="bg-white border border-[#c4c6cf] rounded-xl p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#c4c6cf]">
          <div>
            <h2 className="font-headline text-[20px] font-bold text-[#00142f]">
              {isHindi ? 'प्राथमिकता कार्य सूची (Priority Action Queue)' : 'Priority Action Queue'}
            </h2>
            <p className="text-[13px] text-[#44474e]">
              Flagged parcels requiring departmental review, field survey dispatch, or statutory resolution.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-[#f2f3ff] p-1 rounded border border-[#c4c6cf]">
            <button
              onClick={() => setFilterUrgency('all')}
              className={`px-3 py-1 rounded text-[12px] font-medium transition-all ${
                filterUrgency === 'all' ? 'bg-[#00142f] text-white font-bold' : 'text-[#44474e] hover:text-[#00142f]'
              }`}
            >
              All ({parcels.length})
            </button>
            <button
              onClick={() => setFilterUrgency('critical')}
              className={`px-3 py-1 rounded text-[12px] font-medium transition-all ${
                filterUrgency === 'critical' ? 'bg-[#ba1a1a] text-white font-bold' : 'text-[#ba1a1a] hover:bg-[#ffdad6]'
              }`}
            >
              High/Critical ({criticalParcels})
            </button>
            <button
              onClick={() => setFilterUrgency('medium')}
              className={`px-3 py-1 rounded text-[12px] font-medium transition-all ${
                filterUrgency === 'medium' ? 'bg-amber-600 text-white font-bold' : 'text-amber-800 hover:bg-amber-100'
              }`}
            >
              Medium ({mediumParcels})
            </button>
            <button
              onClick={() => setFilterUrgency('resolved')}
              className={`px-3 py-1 rounded text-[12px] font-medium transition-all ${
                filterUrgency === 'resolved' ? 'bg-emerald-700 text-white font-bold' : 'text-emerald-800 hover:bg-emerald-100'
              }`}
            >
              Resolved ({parcels.filter(p => p.isResolved).length})
            </button>
          </div>
        </div>

        {/* Priority Queue Table */}
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left border-collapse text-[13px]">
            <thead>
              <tr className="border-b border-[#c4c6cf] text-[11px] font-bold uppercase text-[#44474e] bg-[#f2f3ff]">
                <th className="py-2.5 px-3">ULPIN / Survey</th>
                <th className="py-2.5 px-3">Village / Tehsil</th>
                <th className="py-2.5 px-3">Health Score</th>
                <th className="py-2.5 px-3">Key Discrepancies / Findings</th>
                <th className="py-2.5 px-3">Case Status</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c4c6cf]">
              {filteredParcels.map((p) => {
                const assocCase = cases.find(c => c.ulpin === p.ulpin);
                const isCrit = p.attentionLevel === 'Critical' || p.attentionLevel === 'High';
                const isMed = p.attentionLevel === 'Medium';

                return (
                  <tr key={p.ulpin} className="hover:bg-[#f2f3ff]/60 transition-colors">
                    <td className="py-3 px-3">
                      <strong className="font-mono text-[#00142f] block text-[13px]">{p.ulpin}</strong>
                      <span className="text-[11px] font-mono text-[#44474e]">Survey: {p.surveyNumber}</span>
                    </td>
                    <td className="py-3 px-3">
                      <strong className="text-[#00142f] block">{p.village}</strong>
                      <span className="text-[11px] text-[#44474e]">{p.tehsil}</span>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-baseline gap-1">
                        <span
                          className={`font-headline text-[18px] font-bold ${
                            isCrit ? 'text-[#ba1a1a]' : isMed ? 'text-amber-600' : 'text-emerald-700'
                          }`}
                        >
                          {p.healthScore}
                        </span>
                        <span className="text-[11px] text-[#74777f]">/100</span>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded inline-block mt-0.5 ${
                          isCrit
                            ? 'bg-[#ffdad6] text-[#ba1a1a]'
                            : isMed
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {p.isResolved ? 'Resolved (Clean)' : p.attentionLevel}
                      </span>
                    </td>
                    <td className="py-3 px-3 max-w-xs">
                      {p.findings.length > 0 ? (
                        <div className="space-y-1">
                          {p.findings.slice(0, 2).map((f) => (
                            <div key={f.id} className="text-[11px] truncate flex items-center gap-1.5">
                              <span className={`w-1.5 h-1.5 rounded-full ${f.severity === 'red' ? 'bg-[#ba1a1a]' : 'bg-amber-500'}`}></span>
                              <span className="text-[#131b2e]">{f.badgeEn}: {f.titleEn}</span>
                            </div>
                          ))}
                          {p.findings.length > 2 && (
                            <span className="text-[10px] text-[#74777f]">+{p.findings.length - 2} more issues</span>
                          )}
                        </div>
                      ) : (
                        <span className="text-[11px] text-emerald-700 font-medium">✓ No variances flagged</span>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      {assocCase ? (
                        <div>
                          <span className="font-mono text-[11px] text-[#0155c7] block font-semibold">
                            #{assocCase.caseId}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-1.5 py-0.5 rounded inline-block ${
                              assocCase.status === 'RESOLVED'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {assocCase.status}
                          </span>
                        </div>
                      ) : (
                        <span className="text-[11px] text-[#74777f]">No active case</span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onOpenParcel(p.ulpin)}
                          className="bg-[#00142f] hover:bg-[#0f294a] text-white px-2.5 py-1 rounded text-[11px] font-bold cursor-pointer transition-colors"
                        >
                          Open Parcel
                        </button>
                        {assocCase && assocCase.status !== 'RESOLVED' && (
                          <button
                            onClick={() => {
                              setSelectedCaseModal(assocCase);
                              setOfficerNote(
                                'Field verification with Revenue Inspector & DGPS drone completed. OS-482/2024 compromise decree recorded. RoR area regularized to 1.97 Acres.'
                              );
                            }}
                            className="bg-emerald-700 hover:bg-emerald-800 text-white px-2.5 py-1 rounded text-[11px] font-bold cursor-pointer transition-colors"
                          >
                            Resolve Case
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Case Resolution Modal for Officer */}
      {selectedCaseModal && (
        <div className="fixed inset-0 z-50 bg-[#00142f]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#c4c6cf] rounded-xl max-w-lg w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#c4c6cf]">
              <div className="flex items-center gap-2">
                <span className="text-[20px]">⚖️</span>
                <h3 className="font-headline text-[18px] font-bold text-[#00142f]">
                  Officer Adjudication &amp; Resolution
                </h3>
              </div>
              <button
                onClick={() => setSelectedCaseModal(null)}
                className="text-[#74777f] hover:text-[#00142f] text-[18px] font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="text-[13px] space-y-2">
              <div>
                <span className="text-[11px] font-bold uppercase text-[#44474e]">Case Identifier:</span>
                <strong className="block font-mono text-[#00142f]">#{selectedCaseModal.caseId} (ULPIN: {selectedCaseModal.ulpin})</strong>
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase text-[#44474e]">Title / Description:</span>
                <p className="text-[#131b2e]">{selectedCaseModal.title}</p>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-[#44474e] mb-1">
                  Official Statutory Sanction Note:
                </label>
                <textarea
                  value={officerNote}
                  onChange={(e) => setOfficerNote(e.target.value)}
                  rows={4}
                  className="w-full bg-[#f2f3ff] border border-[#c4c6cf] rounded p-2.5 text-[12px] font-mono text-[#00142f]"
                />
              </div>

              <div className="p-2.5 bg-emerald-50 border border-emerald-300 rounded text-[11px] text-emerald-900">
                <strong>Reconciliation Impact:</strong> Submitting this resolution will trigger automatic re-reconciliation, clearing the court restriction and boundary mismatch, and elevating Land Health to 94/100.
              </div>
            </div>

            <div className="pt-3 border-t border-[#c4c6cf] flex items-center justify-between">
              <button
                onClick={() => setSelectedCaseModal(null)}
                className="px-3 py-1.5 text-[12px] font-medium text-[#44474e] border border-[#c4c6cf] rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => handleResolveAction(selectedCaseModal.caseId)}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-[12px] px-4 py-2 rounded flex items-center gap-1.5 shadow-xs"
              >
                <span>✓</span>
                <span>Sign &amp; Sanction Resolution</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

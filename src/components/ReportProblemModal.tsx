import React, { useState } from 'react';
import { Parcel, Language } from '../types';

interface ReportProblemModalProps {
  parcel: Parcel;
  language: Language;
  onClose: () => void;
  onSubmitReport: (problemCategory: string, description: string, citizenName: string, phone: string) => void;
}

export const ReportProblemModal: React.FC<ReportProblemModalProps> = ({
  parcel,
  language,
  onClose,
  onSubmitReport,
}) => {
  const [category, setCategory] = useState('Boundary mismatch');
  const [description, setDescription] = useState('');
  const [citizenName, setCitizenName] = useState(parcel.recordedHolder || 'Citizen Applicant');
  const [phone, setPhone] = useState('9876543210');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const isHindi = language === 'hi';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitReport(category, description, citizenName, phone);
    setSubmittedSuccess(true);
    setTimeout(() => {
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#00142f]/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-[#c4c6cf] rounded-xl max-w-lg w-full p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#c4c6cf]">
          <div className="flex items-center gap-2">
            <span className="text-[20px]">📝</span>
            <h3 className="font-headline text-[18px] font-bold text-[#00142f]">
              {isHindi ? 'समस्या या त्रुटि की रिपोर्ट करें' : 'Report a Problem / Request Correction'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#74777f] hover:text-[#00142f] text-2xl font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {submittedSuccess ? (
          <div className="p-6 bg-emerald-50 border border-emerald-300 rounded-lg text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto text-xl font-bold">
              ✓
            </div>
            <h4 className="font-headline text-[18px] font-bold text-emerald-900">
              {isHindi ? 'अनुरोध सफलतापूर्वक दर्ज किया गया!' : 'Request Successfully Lodged!'}
            </h4>
            <p className="text-[13px] text-emerald-800">
              Your grievance has been registered with Revenue Administration. Case tracking details have been generated.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 text-[13px]">
            <div className="p-2.5 bg-[#f2f3ff] rounded border border-[#c4c6cf] flex justify-between items-center text-[12px]">
              <span>
                Target Parcel: <strong className="font-mono text-[#00142f]">{parcel.ulpin}</strong>
              </span>
              <span className="text-[#44474e]">Survey: {parcel.surveyNumber}</span>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-[#44474e] mb-1">
                {isHindi ? 'समस्या का प्रकार चुनें' : 'Select Problem Category'}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#f2f3ff] border border-[#c4c6cf] rounded py-2 px-3 text-[13px] text-[#00142f]"
              >
                <option value="Owner information mismatch">Owner / Recorded Holder Mismatch</option>
                <option value="Area mismatch">Area Discrepancy (खतौनी रकबा भिन्नता)</option>
                <option value="Boundary mismatch">Boundary / Cadastral Map Overlap (सीमा विवाद / नाला अतिक्रमण)</option>
                <option value="Tax record mismatch">Municipal Property Tax Variance</option>
                <option value="Land use mismatch">Zoning / Land Use Mismatch</option>
                <option value="Registration record mismatch">Unsynchronized Registration Deed (लंबित नामांतरण)</option>
                <option value="Dispute resolution update">Court Stay Vacated / Decree Passed</option>
                <option value="Missing record">Missing Historical Document</option>
                <option value="Other">Other Statutory Correction</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-[#44474e] mb-1">
                {isHindi ? 'समस्या का संक्षिप्त विवरण' : 'Description of Mistake / Ground Reality'}
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={3}
                placeholder="e.g. The civil court compromise was issued last week and the drainage nala boundary requires joint survey verification..."
                className="w-full bg-white border border-[#c4c6cf] rounded p-2.5 text-[13px] text-[#00142f]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase text-[#44474e] mb-1">Applicant Name</label>
                <input
                  type="text"
                  value={citizenName}
                  onChange={(e) => setCitizenName(e.target.value)}
                  className="w-full bg-white border border-[#c4c6cf] rounded py-1.5 px-2.5 text-[13px]"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase text-[#44474e] mb-1">Contact Mobile</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white border border-[#c4c6cf] rounded py-1.5 px-2.5 text-[13px]"
                  required
                />
              </div>
            </div>

            <div className="pt-3 border-t border-[#c4c6cf] flex items-center justify-between">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-[#c4c6cf] text-[#44474e] rounded font-medium text-[12px] hover:bg-[#f2f3ff]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#0155c7] hover:bg-[#336fe2] text-white font-bold text-[12px] px-5 py-2 rounded shadow-xs"
              >
                Submit Correction Request →
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

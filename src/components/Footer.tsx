import React from 'react';
import { Language } from '../types';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const isHindi = language === 'hi';

  return (
    <footer className="bg-[#00142f] text-[#faf8ff] border-t border-[#0f294a] mt-12 pt-10 pb-8 text-[13px]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-[#0f294a]">
          {/* Col 1: Brand */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-[#0f294a] border border-[#30476a] flex items-center justify-center text-white font-bold">
                BS
              </div>
              <span className="font-headline text-[20px] font-bold tracking-tight text-white">
                BHOOMI-SETU
              </span>
            </div>
            <p className="text-[#dae2fd]/80 text-[13px] max-w-md leading-relaxed">
              {isHindi
                ? 'स्मार्ट इंडिया हैकथॉन 2026 (समस्या कथन 26014) के अंतर्गत विकसित एकीकृत भूमि बुद्धिमत्ता एवं समाधान प्रणाली। "एक अनुरोध। एक भूखंड। एक संपूर्ण उत्तर।"'
                : 'Unified Land Intelligence and Resolution Platform developed for Smart India Hackathon 2026 (PS 26014). "One Request. One Parcel. One Complete Answer."'}
            </p>
            <div className="flex items-center gap-2 text-[11px] text-[#dae2fd]/60 font-mono">
              <span>National Cadastral Federated Architecture</span>
              <span>•</span>
              <span>ULPIN Standard</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-2">
            <h4 className="font-bold text-[13px] text-white uppercase tracking-wider">
              {isHindi ? 'नागरिक मॉड्यूल' : 'Citizen Modules'}
            </h4>
            <ul className="space-y-1 text-[12px] text-[#dae2fd]/80">
              <li>• {isHindi ? 'अपनी जमीन खोजें (Find My Land)' : 'Find My Land'}</li>
              <li>• {isHindi ? 'खरीदने से पहले जांचें (Before You Buy)' : 'Before You Buy Check'}</li>
              <li>• {isHindi ? 'समस्या रिपोर्ट (Report a Problem)' : 'Report a Discrepancy'}</li>
              <li>• {isHindi ? 'अनुरोध ट्रैकर (Case Tracker)' : 'Grievance Tracking'}</li>
              <li>• {isHindi ? 'जीआईएस नक्शा (Cadastral Explorer)' : 'Cadastral GIS Explorer'}</li>
            </ul>
          </div>

          {/* Col 3: Problem Statement Details */}
          <div className="space-y-2">
            <h4 className="font-bold text-[13px] text-white uppercase tracking-wider">
              {isHindi ? 'प्रतियोगिता विवरण' : 'Hackathon Context'}
            </h4>
            <div className="space-y-1.5 text-[12px] text-[#dae2fd]/80 font-mono">
              <div>PS ID: 26014</div>
              <div>Organization: Ministry of Land Resources</div>
              <div>Theme: Smart Governance &amp; Land Tech</div>
              <div className="text-emerald-400 font-semibold">• Killer Demo: Parcel 005 (28/100 → 94/100)</div>
            </div>
          </div>
        </div>

        {/* Mandatory SIH Prototype Disclaimer */}
        <div className="pt-6">
          <div className="bg-[#0f294a] border border-[#30476a] p-4 rounded-lg text-[11px] leading-relaxed text-[#dae2fd]/90">
            <strong className="text-white block font-bold mb-1">
              PROTOTYPE DISCLAIMER (Smart India Hackathon 2026):
            </strong>
            BHOOMI-SETU is a technological demonstration prototype developed strictly for academic and hackathon evaluation purposes under Problem Statement 26014. All citizen profiles, parcel numbers, ownership titles, and court suits presented are synthetically generated. This application does NOT connect to live government databases, does NOT store personally identifiable information (PII), does NOT adjudicate legal disputes, and does NOT constitute official land records. For official statutory land records, citizens must visit their respective State revenue and registration portals.
          </div>

          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#dae2fd]/60">
            <span>© 2026 BHOOMI-SETU Initiative • Ministry of Land Resources</span>
            <span>Digital Public Infrastructure for Bharat</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

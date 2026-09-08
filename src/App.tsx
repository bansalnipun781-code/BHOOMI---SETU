/**
 * BHOOMI-SETU
 * Smart India Hackathon 2026 | Problem Statement: PS 26014
 * "One Request. One Parcel. One Complete Answer."
 */

import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { SearchSection } from './components/SearchSection';
import { CitizenActionCards } from './components/CitizenActionCards';
import { ParcelProfile } from './components/ParcelProfile';
import { GisMap } from './components/GisMap';
import { BeforeYouBuy } from './components/BeforeYouBuy';
import { CaseTracking } from './components/CaseTracking';
import { GovernmentDashboard } from './components/GovernmentDashboard';
import { EvidenceModal } from './components/EvidenceModal';
import { TimelineModal } from './components/TimelineModal';
import { ReportProblemModal } from './components/ReportProblemModal';
import { Footer } from './components/Footer';

import {
  DEMO_PARCELS,
  DEMO_CASE_00182,
  generateSyntheticParcels,
} from './data/parcels';
import { resolveAndReconcileParcel005 } from './services/reconciliation';
import { Parcel, ResolutionCase, Language, ParcelFinding } from './types';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [isOfficerMode, setIsOfficerMode] = useState<boolean>(false);
  const [activeParcelUlpin, setActiveParcelUlpin] = useState<string>('IN-BS-2026-000005');

  // Load baseline demo parcels + synthetic 120+ map parcels
  const [parcels, setParcels] = useState<Parcel[]>(() => {
    const synthetic = generateSyntheticParcels();
    return [...DEMO_PARCELS, ...synthetic];
  });

  // Track resolution cases
  const [cases, setCases] = useState<ResolutionCase[]>([DEMO_CASE_00182]);

  // Modal dialog states
  const [isEvidenceModalOpen, setIsEvidenceModalOpen] = useState(false);
  const [selectedFindingForEvidence, setSelectedFindingForEvidence] = useState<ParcelFinding | undefined>();
  const [isTimelineModalOpen, setIsTimelineModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Success toast / announcement banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const activeParcel = useMemo(() => {
    const found = parcels.find((p) => p.ulpin === activeParcelUlpin);
    return found || parcels[0];
  }, [parcels, activeParcelUlpin]);

  const activeCase = useMemo(() => {
    return (
      cases.find((c) => c.ulpin === activeParcelUlpin) ||
      cases[0]
    );
  }, [cases, activeParcelUlpin]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Search logic
  const handleSearch = (_type: string, query: string) => {
    const q = query.trim().toLowerCase();
    const match = parcels.find(
      (p) =>
        p.ulpin.toLowerCase().includes(q) ||
        p.surveyNumber.toLowerCase().includes(q) ||
        p.khasraNumber.toLowerCase().includes(q) ||
        p.khataNumber.toLowerCase().includes(q) ||
        p.recordedHolder.toLowerCase().includes(q) ||
        p.village.toLowerCase().includes(q)
    );

    if (match) {
      setActiveParcelUlpin(match.ulpin);
      setCurrentTab('parcel');
      showToast(`Loaded parcel: ${match.ulpin} (${match.surveyNumber})`);
    } else {
      // Fallback to sample 005
      setActiveParcelUlpin('IN-BS-2026-000005');
      setCurrentTab('parcel');
      showToast('Loaded demonstration parcel #000005');
    }
  };

  const handleSelectSample = (ulpin: string) => {
    setActiveParcelUlpin(ulpin);
    setCurrentTab('parcel');
  };

  // Action cards routing
  const handleCitizenAction = (action: 'check' | 'buy' | 'report' | 'track') => {
    if (action === 'check') {
      setCurrentTab('parcel');
      // scroll to dossier
      setTimeout(() => {
        const el = document.getElementById('active-dossier');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (action === 'buy') {
      setCurrentTab('buy');
    } else if (action === 'report') {
      setIsReportModalOpen(true);
    } else if (action === 'track') {
      setCurrentTab('tracking');
    }
  };

  // KILLER DEMO: Trigger 1-click official government resolution & re-reconciliation!
  const handleSimulateResolution = () => {
    // 1. Re-evaluate parcel 005
    setParcels((prev) =>
      prev.map((p) => {
        if (p.ulpin === 'IN-BS-2026-000005') {
          return resolveAndReconcileParcel005(p);
        }
        return p;
      })
    );

    // 2. Mark Case BS-2026-00182 as RESOLVED
    setCases((prev) =>
      prev.map((c) => {
        if (c.caseId === 'BS-2026-00182' || c.ulpin === 'IN-BS-2026-000005') {
          return {
            ...c,
            status: 'RESOLVED',
            resolutionNotes:
              'Official sanction #BS-2026-MUT-81 signed by SDM Rampur. Court stay vacated in Sub-Registrar ledger, boundary pillars placed at 1.97 Acres.',
            updatedAt: '02 Sep 2026',
          };
        }
        return c;
      })
    );

    showToast('⚡ Resolution Sanctioned! Parcel re-evaluated: Health Score increased 28/100 → 94/100');
  };

  // Citizen lodging new report
  const handleSubmitReport = (
    category: string,
    description: string,
    citizenName: string,
    phone: string
  ) => {
    const newCaseId = `BS-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const newCase: ResolutionCase = {
      caseId: newCaseId,
      ulpin: activeParcel.ulpin,
      title: `${category}: ${description.substring(0, 48)}...`,
      citizenName,
      citizenPhone: phone,
      submittedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'SUBMITTED',
      steps: [
        {
          id: 'step-1',
          name: 'Grievance Registered',
          status: 'COMPLETED',
          date: new Date().toLocaleDateString('en-GB'),
        },
        {
          id: 'step-2',
          name: 'Administrative Review',
          status: 'IN_PROGRESS',
        },
        {
          id: 'step-3',
          name: 'Field Verification & Demarcation',
          status: 'PENDING',
        },
        {
          id: 'step-4',
          name: 'Statutory Order & Re-reconciliation',
          status: 'PENDING',
        },
      ],
    };

    setCases((prev) => [newCase, ...prev]);
    showToast(`Grievance lodged! Tracking Case #${newCaseId} created.`);
  };

  const isHindi = language === 'hi';

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col font-body selection:bg-[#dae2fd] selection:text-[#00142f]">
      {/* Toast Announcement */}
      {toastMessage && (
        <div className="fixed top-16 right-4 z-50 bg-[#00142f] text-white px-5 py-3 rounded-lg shadow-xl border border-[#336fe2] flex items-center gap-3 animate-fade-in text-[13px] font-medium">
          <span className="text-emerald-400 font-bold text-[16px]">✓</span>
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-[#dae2fd] hover:text-white text-xs ml-2 cursor-pointer font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Sovereign Header & Navigation */}
      <Header
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          if (tab === 'government') {
            setIsOfficerMode(true);
          }
        }}
        language={language}
        onToggleLanguage={() => setLanguage(language === 'en' ? 'hi' : 'en')}
        isOfficerMode={isOfficerMode}
        onToggleOfficerMode={() => {
          const next = !isOfficerMode;
          setIsOfficerMode(next);
          setCurrentTab(next ? 'government' : 'home');
        }}
        onQuickSearch={(q) => handleSearch('quick', q)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Officer Mode Banner */}
        {isOfficerMode && (
          <div className="bg-[#ba1a1a] text-white px-4 sm:px-6 py-2 border-b border-[#93000a] text-[12px] font-medium flex items-center justify-between">
            <div className="flex items-center gap-2 max-w-[1600px] mx-auto w-full">
              <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
              <span>
                <strong>{isHindi ? 'अधिकारी दृश्य सक्रिय:' : 'ADMINISTRATIVE OFFICER CONSOLE ACTIVE:'}</strong>{' '}
                {isHindi
                  ? 'तहसील व न्यायालयीन स्तर पर लंबित विसंगतियों की जांच एवं 1-क्लिक समाधान।'
                  : 'Inspecting cross-departmental queues, anomaly features, and official resolution workflow.'}
              </span>
            </div>
            <button
              onClick={() => {
                setIsOfficerMode(false);
                setCurrentTab('home');
              }}
              className="bg-white/20 hover:bg-white/30 text-white px-2.5 py-0.5 rounded text-[11px] font-bold"
            >
              Exit
            </button>
          </div>
        )}

        {/* Tab 1: HOME */}
        {currentTab === 'home' && (
          <div>
            <SearchSection
              language={language}
              onSearch={handleSearch}
              onSelectSample={handleSelectSample}
              activeUlpin={activeParcelUlpin}
            />

            <CitizenActionCards
              language={language}
              onSelectAction={handleCitizenAction}
              activeCaseId={activeCase.caseId}
            />

            {/* In-Home Parcel Preview if selected */}
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-8">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0155c7]">
                    {isHindi ? 'चयनित भूखंड की जांच' : 'Inspected Parcel Dossier'}
                  </span>
                  <h3 className="font-headline text-[22px] font-bold text-[#00142f]">
                    {activeParcel.surveyNumber} ({activeParcel.village})
                  </h3>
                </div>
                <button
                  onClick={() => setCurrentTab('parcel')}
                  className="text-[13px] font-bold text-[#0155c7] hover:underline flex items-center gap-1"
                >
                  <span>{isHindi ? 'विस्तृत रिपोर्ट खोलें' : 'Open Full Profile'}</span>
                  <span>→</span>
                </button>
              </div>

              <ParcelProfile
                parcel={activeParcel}
                language={language}
                onOpenEvidence={(finding) => {
                  setSelectedFindingForEvidence(finding);
                  setIsEvidenceModalOpen(true);
                }}
                onOpenTimeline={() => setIsTimelineModalOpen(true)}
                onResolveIssue={() => setCurrentTab('tracking')}
                onInspectGis={() => setCurrentTab('gis')}
              />
            </div>
          </div>
        )}

        {/* Tab 2: PARCEL PROFILE */}
        {currentTab === 'parcel' && (
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-[#c4c6cf]">
              <div>
                <span className="text-[11px] font-bold uppercase text-[#0155c7]">Current Parcel Profile</span>
                <h1 className="font-headline text-[22px] font-bold text-[#00142f]">
                  {activeParcel.surveyNumber} • {activeParcel.village}, {activeParcel.tehsil}
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentTab('buy')}
                  className="bg-[#f2f3ff] hover:bg-[#eaedff] text-[#00142f] border border-[#c4c6cf] px-3 py-1.5 rounded text-[12px] font-bold"
                >
                  Before You Buy Check
                </button>
                <button
                  onClick={() => setIsReportModalOpen(true)}
                  className="bg-[#00142f] hover:bg-[#0f294a] text-white px-3 py-1.5 rounded text-[12px] font-bold"
                >
                  Report Mistake
                </button>
              </div>
            </div>

            <ParcelProfile
              parcel={activeParcel}
              language={language}
              onOpenEvidence={(finding) => {
                setSelectedFindingForEvidence(finding);
                setIsEvidenceModalOpen(true);
              }}
              onOpenTimeline={() => setIsTimelineModalOpen(true)}
              onResolveIssue={() => setCurrentTab('tracking')}
              onInspectGis={() => setCurrentTab('gis')}
            />
          </div>
        )}

        {/* Tab 3: GIS EXPLORER */}
        {currentTab === 'gis' && (
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-8 space-y-6">
            <GisMap
              parcels={parcels}
              selectedParcelUlpin={activeParcelUlpin}
              onSelectParcel={(ulpin) => {
                setActiveParcelUlpin(ulpin);
                setCurrentTab('parcel');
                showToast(`Opened parcel: ${ulpin}`);
              }}
              language={language}
            />
          </div>
        )}

        {/* Tab 4: BEFORE YOU BUY */}
        {currentTab === 'buy' && (
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-8">
            <BeforeYouBuy
              parcel={activeParcel}
              language={language}
              onNavigateToParcel={() => setCurrentTab('parcel')}
              onSelectSample={handleSelectSample}
            />
          </div>
        )}

        {/* Tab 5: CASE TRACKING */}
        {currentTab === 'tracking' && (
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-8">
            <CaseTracking
              caseData={activeCase}
              parcel={activeParcel}
              language={language}
              onSimulateResolution={handleSimulateResolution}
              onNavigateToParcel={() => setCurrentTab('parcel')}
              onOpenOfficerPortal={() => {
                setIsOfficerMode(true);
                setCurrentTab('government');
              }}
            />
          </div>
        )}

        {/* Tab 6: GOVERNMENT DASHBOARD */}
        {currentTab === 'government' && (
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-8">
            <GovernmentDashboard
              parcels={parcels}
              cases={cases}
              language={language}
              onOpenParcel={(ulpin) => {
                setActiveParcelUlpin(ulpin);
                setCurrentTab('parcel');
              }}
              onResolveCase={(_caseId) => {
                handleSimulateResolution();
              }}
            />
          </div>
        )}
      </main>

      {/* Modals */}
      {isEvidenceModalOpen && (
        <EvidenceModal
          parcel={activeParcel}
          selectedFinding={selectedFindingForEvidence}
          language={language}
          onClose={() => setIsEvidenceModalOpen(false)}
          onStartResolution={() => {
            setIsEvidenceModalOpen(false);
            setCurrentTab('tracking');
          }}
        />
      )}

      {isTimelineModalOpen && (
        <TimelineModal
          parcel={activeParcel}
          language={language}
          onClose={() => setIsTimelineModalOpen(false)}
        />
      )}

      {isReportModalOpen && (
        <ReportProblemModal
          parcel={activeParcel}
          language={language}
          onClose={() => setIsReportModalOpen(false)}
          onSubmitReport={handleSubmitReport}
        />
      )}

      {/* Sovereign SIH 2026 Footer */}
      <Footer language={language} />
    </div>
  );
}

export type Language = 'en' | 'hi';

export type AttentionLevel = 'Low' | 'Medium' | 'High' | 'Critical';
export type SourceStatus = 'AVAILABLE' | 'INCONSISTENT' | 'UNAVAILABLE';
export type FindingSeverity = 'green' | 'amber' | 'red' | 'grey';

export type CaseStatus = 'SUBMITTED' | 'UNDER_REVIEW' | 'VERIFICATION' | 'FIELD_VERIFICATION' | 'RESOLVED';

export interface Provenance {
  source: string;
  sourceDepartment: string;
  recordDate: string;
  lastSynchronized: string;
  status: SourceStatus;
  recordId?: string;
}

export interface ConnectedRecordDomain {
  id: string;
  domainNumber: number;
  domainNameEn: string;
  domainNameHi: string;
  systemName: string;
  sourceStatus: SourceStatus;
  findingStatus: string;
  findingSeverity: FindingSeverity;
  summary: string;
  provenance: Provenance;
  details: Record<string, any>;
}

export interface EvidenceComparison {
  sourceA: {
    system: string;
    recordHolder?: string;
    value: string;
    recordDate: string;
    lastSync: string;
  };
  sourceB: {
    system: string;
    recordHolder?: string;
    value: string;
    recordDate: string;
    lastSync: string;
  };
  discrepancyNote: string;
}

export interface ParcelFinding {
  id: string;
  severity: 'red' | 'amber' | 'green';
  category: 'court' | 'boundary' | 'transfer' | 'tax' | 'zoning' | 'ownership' | 'missing';
  titleEn: string;
  titleHi: string;
  badgeEn: string;
  badgeHi: string;
  descriptionEn: string;
  descriptionHi: string;
  technicalDetails?: string;
  evidence?: EvidenceComparison;
  resolved?: boolean;
}

export interface TimelineEvent {
  year: string;
  date: string;
  eventEn: string;
  eventHi: string;
  source: string;
  explanationEn: string;
  explanationHi: string;
  type: 'survey' | 'inheritance' | 'mutation' | 'sale' | 'tax' | 'dispute' | 'resolution';
}

export interface ParcelIdentifier {
  type: 'ulpin' | 'survey' | 'khasra' | 'khata' | 'owner' | 'village' | 'property' | 'legacy';
  value: string;
  labelEn: string;
  labelHi: string;
}

export interface Parcel {
  ulpin: string; // Master identifier e.g. IN-BS-2026-000005
  stateParcelId: string;
  surveyNumber: string;
  khasraNumber: string;
  khataNumber: string;
  municipalPropertyId: string;
  legacyId: string;
  
  recordedHolder: string;
  recordedHolderHi?: string;
  historicalHolders: string[];
  
  areaAcres: number;
  rorAreaAcres: number;
  areaFormatted: string;
  
  village: string;
  tehsil: string;
  district: string;
  state: string;
  
  landUse: string;
  zoningCode: string;
  
  coordinates: {
    lat: number;
    lng: number;
  };
  polygonCoordinates?: [number, number][];
  
  // Health & Reconciliation
  healthScore: number; // 0-100
  attentionLevel: AttentionLevel;
  confidence: 'High' | 'Medium' | 'Low';
  
  findings: ParcelFinding[];
  connectedRecords: ConnectedRecordDomain[];
  timeline: TimelineEvent[];
  
  // Anomaly Vector (simulated Isolation Forest features)
  anomalyFeatures: {
    ownershipChanges: number;
    registrationCount: number;
    taxDelayMonths: number;
    landUseChanges: number;
    buildingPermissionStatus: string;
    disputeCount: number;
    transactionFrequencyPerYear: number;
    recordMismatchCount: number;
  };
  anomalyExplanation?: string;
  
  isResolved?: boolean;
  resolutionNote?: string;
  resolvedAt?: string;
}

export interface ResolutionCaseEvent {
  step: number;
  name: string;
  nameHi: string;
  description: string;
  descriptionHi: string;
  status: 'completed' | 'current' | 'upcoming';
  timestamp?: string;
  officerName?: string;
  note?: string;
}

export interface ResolutionCase {
  caseId: string; // e.g. BS-2026-00182
  parcelUlpin?: string;
  ulpin?: string;
  surveyNumber?: string;
  applicantName?: string;
  citizenName?: string;
  citizenPhone?: string;
  issueType?: string;
  title: string;
  description?: string;
  evidenceSummary?: string;
  status: CaseStatus;
  assignedAuthority?: string;
  targetSlaDays?: number;
  createdDate?: string;
  submittedDate?: string;
  updatedDate?: string;
  updatedAt?: string;
  resolutionNotes?: string;
  events?: ResolutionCaseEvent[];
  steps?: any[];
  citizenComment?: string;
}

export interface BuyerCheckItem {
  id: string;
  nameEn: string;
  nameHi: string;
  status: 'CLEAR' | 'REVIEW_NEEDED' | 'UNAVAILABLE';
  statusTextEn: string;
  statusTextHi: string;
  detailsEn: string;
  detailsHi: string;
  sourceDomain: string;
}

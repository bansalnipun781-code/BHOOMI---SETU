import { Parcel, ResolutionCase } from '../types';

// Deterministic Demo Parcels
export const PARCEL_001: Parcel = {
  ulpin: 'IN-BS-2026-000001',
  stateParcelId: 'UP-ND-2026-901',
  surveyNumber: '98/1',
  khasraNumber: '98/1',
  khataNumber: '42',
  municipalPropertyId: 'RMP-098-1',
  legacyId: 'LEG-1998-RK-04',
  recordedHolder: 'Anand Verma',
  recordedHolderHi: 'आनंद वर्मा',
  historicalHolders: ['Savitri Devi (Mother, 2008)', 'Raghav Verma (Grandfather, 1984)'],
  areaAcres: 1.50,
  rorAreaAcres: 1.50,
  areaFormatted: '1.50 Acres (6,070 sq.m)',
  village: 'Rampur Khurd',
  tehsil: 'Tehsil Example North',
  district: 'Gautam Buddha Nagar',
  state: 'Uttar Pradesh',
  landUse: 'Agricultural',
  zoningCode: 'AG-01 (Cultivable Plain)',
  coordinates: { lat: 28.5355, lng: 77.3912 },
  polygonCoordinates: [
    [28.5350, 77.3905],
    [28.5360, 77.3905],
    [28.5362, 77.3920],
    [28.5351, 77.3921],
  ],
  healthScore: 96,
  attentionLevel: 'Low',
  confidence: 'High',
  findings: [
    {
      id: 'f-001-1',
      severity: 'green',
      category: 'ownership',
      titleEn: 'Connected records consistent across 6 available registries',
      titleHi: 'उपलब्ध 6 रजिस्ट्रीयों में जुड़े रिकॉर्ड एक समान हैं',
      badgeEn: 'Clean Title',
      badgeHi: 'स्पष्ट स्वामित्व',
      descriptionEn: 'Recorded holder and area match between Revenue RoR and NGDRS registration deeds.',
      descriptionHi: 'राजस्व खतौनी और उप-पंजीयक विलेखों के बीच दर्ज खातेदार और क्षेत्रफल बिल्कुल मेल खाते हैं।'
    },
    {
      id: 'f-001-2',
      severity: 'green',
      category: 'tax',
      titleEn: 'Property & land revenue dues cleared',
      titleHi: 'भूमि राजस्व और कर बकाया चुकता',
      badgeEn: 'Tax Current',
      badgeHi: 'कर चुकता',
      descriptionEn: 'No outstanding encumbrance, lien, or property tax arrears found in municipal records.',
      descriptionHi: 'नगर निकाय रिकॉर्ड में कोई बकाया, धारणाधिकार या संपत्ति कर शेष नहीं है।'
    }
  ],
  connectedRecords: [
    {
      id: 'cr-1',
      domainNumber: 1,
      domainNameEn: 'Revenue land record (RoR Khatauni)',
      domainNameHi: 'राजस्व भूमि रिकॉर्ड (खतौनी)',
      systemName: 'Bhulekh Revenue Portal',
      sourceStatus: 'AVAILABLE',
      findingStatus: 'Checked — No issue found (Consistent)',
      findingSeverity: 'green',
      summary: 'Recorded holder: Anand Verma | Khata: 42 | Area: 1.50 Acres',
      provenance: {
        source: 'Bhulekh RoR Service',
        sourceDepartment: 'Department of Land Resources & Revenue',
        recordDate: '12 Jan 2026',
        lastSynchronized: '02 Sep 2026 09:30 IST',
        status: 'AVAILABLE',
        recordId: 'ROR-RK-42-01'
      },
      details: { khata: '42', fasliYear: '1431-1436', recordedHolder: 'Anand Verma', share: '1/1 Full' }
    },
    {
      id: 'cr-2',
      domainNumber: 2,
      domainNameEn: 'Registration record (NGDRS Sub-Registrar)',
      domainNameHi: 'पंजीकरण रिकॉर्ड (सब-रजिस्ट्रार NGDRS)',
      systemName: 'NGDRS Deed Archive',
      sourceStatus: 'AVAILABLE',
      findingStatus: 'Checked — No issue found (Consistent)',
      findingSeverity: 'green',
      summary: 'Gift deed registered 2018; mutation smoothly recorded',
      provenance: {
        source: 'National Generic Document Registration System',
        sourceDepartment: 'Inspector General of Registration',
        recordDate: '15 Mar 2018',
        lastSynchronized: '01 Sep 2026 14:15 IST',
        status: 'AVAILABLE',
        recordId: 'DEED-2018-8812'
      },
      details: { deedType: 'Gift Deed (Parivarik Daan)', bookNo: '1', volumeNo: '412' }
    },
    {
      id: 'cr-3',
      domainNumber: 3,
      domainNameEn: 'Property tax record (Municipal Tax)',
      domainNameHi: 'संपत्ति कर रिकॉर्ड (नगर निकाय कर)',
      systemName: 'Urban / Rural Local Body Tax System',
      sourceStatus: 'AVAILABLE',
      findingStatus: 'Checked — No issue found (Nil dues)',
      findingSeverity: 'green',
      summary: 'Annual cess paid; no outstanding arrears',
      provenance: {
        source: 'Panchayat & Municipal Assessment Cell',
        sourceDepartment: 'Rural Development & Panchayati Raj',
        recordDate: '04 Jun 2026',
        lastSynchronized: '31 Aug 2026 11:00 IST',
        status: 'AVAILABLE',
        recordId: 'TAX-RK-98-1'
      },
      details: { lastReceipt: 'REC-2026-441', dues: '₹0.00', assessmentCategory: 'Agricultural Plot' }
    },
    {
      id: 'cr-4',
      domainNumber: 4,
      domainNameEn: 'Building & permissions (OBPS)',
      domainNameHi: 'भवन निर्माण अनुमति (OBPS)',
      systemName: 'Online Building Plan Approval System',
      sourceStatus: 'UNAVAILABLE',
      findingStatus: 'Information unavailable (Agricultural land, no building sanction recorded)',
      findingSeverity: 'grey',
      summary: 'Agricultural land classification; no construction sanction on file',
      provenance: {
        source: 'Town Planning Authority OBPS API',
        sourceDepartment: 'Urban Development & Housing',
        recordDate: 'N/A',
        lastSynchronized: '01 Sep 2026 04:00 IST',
        status: 'UNAVAILABLE'
      },
      details: { remarks: 'Standard state: Pure agricultural parcels have no OBPS municipal records.' }
    },
    {
      id: 'cr-5',
      domainNumber: 5,
      domainNameEn: 'Land use & zoning (Master Plan 2035)',
      domainNameHi: 'भूमि उपयोग और ज़ोनिंग (मास्टर प्लान 2035)',
      systemName: 'Town & Country Planning Master Plan GIS',
      sourceStatus: 'AVAILABLE',
      findingStatus: 'Checked — No issue found (Agricultural zone)',
      findingSeverity: 'green',
      summary: 'Green Belt AG-01; strictly cultivable, no industrial encroachment',
      provenance: {
        source: 'State Spatial Data Infrastructure (SSDI)',
        sourceDepartment: 'Town & Country Planning Directorate',
        recordDate: '10 Jan 2024',
        lastSynchronized: '28 Aug 2026 18:00 IST',
        status: 'AVAILABLE',
        recordId: 'ZON-MP35-AG-19'
      },
      details: { zone: 'AG-01', permissibleUses: 'Agriculture, Horticulture, Agro-processing' }
    },
    {
      id: 'cr-6',
      domainNumber: 6,
      domainNameEn: 'Judicial court records (e-Courts Land CIS)',
      domainNameHi: 'न्यायिक अदालत रिकॉर्ड (ई-कोर्ट्स लैंड सीआईएस)',
      systemName: 'e-Courts National Land Disputes Database',
      sourceStatus: 'AVAILABLE',
      findingStatus: 'Checked — No issue found (No civil stays or litigation)',
      findingSeverity: 'green',
      summary: 'Zero active or pending civil suits against Khasra 98/1',
      provenance: {
        source: 'e-Courts Land Litigation CIS API',
        sourceDepartment: 'Department of Justice & High Court Registry',
        recordDate: '01 Sep 2026',
        lastSynchronized: '02 Sep 2026 06:15 IST',
        status: 'AVAILABLE',
        recordId: 'CIS-DIST-NIL'
      },
      details: { activeCases: 0, disposition: 'Clean title history' }
    },
    {
      id: 'cr-7',
      domainNumber: 7,
      domainNameEn: 'Official boundary map (Cadastral GIS Map)',
      domainNameHi: 'आधिकारिक सीमा नक्शा (कैडस्ट्रल जीआईएस)',
      systemName: 'Survey of India SVAMITVA / DILRMP Geo-Database',
      sourceStatus: 'AVAILABLE',
      findingStatus: 'Checked — No issue found (Boundary matches exactly)',
      findingSeverity: 'green',
      summary: 'Drone ortho-rectified boundary matches 1.50 acres RoR extent',
      provenance: {
        source: 'Survey of India Drone Cadastre',
        sourceDepartment: 'Survey of India / Revenue Mapping Cell',
        recordDate: '18 Nov 2024',
        lastSynchronized: '25 Aug 2026 10:20 IST',
        status: 'AVAILABLE',
        recordId: 'MAP-SVAMITVA-98'
      },
      details: { droneSurveyDate: '2024-11-18', variance: '0.00%', boundaryStatus: 'Pillar Demarcated' }
    }
  ],
  timeline: [
    {
      year: '1984',
      date: '10 Feb 1984',
      eventEn: 'Original Cadastral Settlement',
      eventHi: 'मूल कैडस्ट्रल बंदोबस्त',
      source: 'District Revenue Archives',
      explanationEn: 'Recorded in the name of Raghav Verma under Consolidation Scheme.',
      explanationHi: 'चकबंदी योजना के तहत राघव वर्मा के नाम दर्ज किया गया।',
      type: 'survey'
    },
    {
      year: '2008',
      date: '14 Jul 2008',
      eventEn: 'Inheritance Succession (Virasat)',
      eventHi: 'विरासत उत्तराधिकार',
      source: 'Tehsildar Mutation Order #214',
      explanationEn: 'Title succeeded to Savitri Devi upon demise of original holder.',
      explanationHi: 'मूल धारक के निधन पर सावित्री देवी को स्वामित्व अंतरित हुआ।',
      type: 'inheritance'
    },
    {
      year: '2018',
      date: '15 Mar 2018',
      eventEn: 'Family Settlement Gift Deed',
      eventHi: 'पारिवारिक दान विलेख',
      source: 'Sub-Registrar Office NGDRS',
      explanationEn: 'Transferred by gift to current holder Anand Verma; duly mutated in RoR.',
      explanationHi: 'वर्तमान धारक आनंद वर्मा को दान विलेख द्वारा अंतरित; खतौनी में विधिवत नामांतरण।',
      type: 'mutation'
    },
    {
      year: '2026',
      date: '02 Sep 2026',
      eventEn: 'BHOOMI-SETU Periodic Reconciliation',
      eventHi: 'भूमि-सेतु आवधिक मिलान',
      source: 'BHOOMI-SETU Automated Engine',
      explanationEn: 'Automated 7-domain cross-verification performed with 96/100 health index.',
      explanationHi: 'स्वचालित 7-डोमेन क्रॉस-सत्यापन में 96/100 स्वास्थ्य सूचकांक दर्ज।',
      type: 'resolution'
    }
  ],
  anomalyFeatures: {
    ownershipChanges: 2,
    registrationCount: 1,
    taxDelayMonths: 0,
    landUseChanges: 0,
    buildingPermissionStatus: 'N/A',
    disputeCount: 0,
    transactionFrequencyPerYear: 0.1,
    recordMismatchCount: 0
  },
  anomalyExplanation: 'All metrics within standard statistical baseline for rural agricultural tenure.'
};

export const PARCEL_002: Parcel = {
  ulpin: 'IN-BS-2026-000002',
  stateParcelId: 'KA-BLR-2026-104',
  surveyNumber: '112/4',
  khasraNumber: '112/4',
  khataNumber: '58',
  municipalPropertyId: 'DEV-SEC4-112',
  legacyId: 'LEG-2012-DEV-11',
  recordedHolder: 'Pooja Sharma',
  recordedHolderHi: 'पूजा शर्मा',
  historicalHolders: ['K. Narayana Rao (2012)'],
  areaAcres: 0.85,
  rorAreaAcres: 0.85,
  areaFormatted: '0.85 Acres (3,440 sq.m)',
  village: 'Devanahalli Sector 4',
  tehsil: 'Devanahalli Taluk',
  district: 'Bengaluru Rural',
  state: 'Karnataka',
  landUse: 'Residential / Commercial Mixed',
  zoningCode: 'R-2 (Urban Peri-Center)',
  coordinates: { lat: 13.2458, lng: 77.7126 },
  polygonCoordinates: [
    [28.5370, 77.3910],
    [28.5385, 77.3912],
    [28.5387, 77.3930],
    [28.5372, 77.3928],
  ],
  healthScore: 62,
  attentionLevel: 'Medium',
  confidence: 'High',
  findings: [
    {
      id: 'f-002-1',
      severity: 'amber',
      category: 'tax',
      titleEn: 'Checked — Review needed: Built-up area mismatch with municipal tax assessment',
      titleHi: 'जांच पूर्ण — समीक्षा आवश्यक: नगरपालिका कर में दर्ज निर्माण क्षेत्रफल में अंतर',
      badgeEn: 'Spatial vs Tax Area',
      badgeHi: 'स्थानिक बनाम कर क्षेत्रफल',
      descriptionEn: 'Declared tax assessment lists 1,200 sq ft built-up area; drone GIS analysis reveals actual built footprint of 3,850 sq ft.',
      descriptionHi: 'घोषित कर निर्धारण में 1,200 वर्ग फुट निर्मित क्षेत्र है; उपग्रह/ड्रोन जीआईएस में 3,850 वर्ग फुट का निर्माण पाया गया।',
      evidence: {
        sourceA: {
          system: 'Devanahalli Municipal Property Register',
          recordHolder: 'Pooja Sharma',
          value: 'Declared Built-up: 1,200 sq ft (Single floor residential)',
          recordDate: '10 Feb 2023',
          lastSync: '01 Sep 2026'
        },
        sourceB: {
          system: 'Cadastral GIS Satellite Footprint Layer',
          value: 'Detected Footprint: 3,850 sq ft (G+2 Commercial Structure)',
          recordDate: '14 May 2026',
          lastSync: '02 Sep 2026'
        },
        discrepancyNote: 'Potential 2,650 sq ft unassessed commercial structure on parcel.'
      }
    },
    {
      id: 'f-002-2',
      severity: 'amber',
      category: 'tax',
      titleEn: 'Checked — Review needed: 3-year municipal tax arrears',
      titleHi: 'जांच पूर्ण — समीक्षा आवश्यक: 3 वर्ष का नगरपालिका संपत्ति कर बकाया',
      badgeEn: 'Tax Arrears',
      badgeHi: 'कर बकाया',
      descriptionEn: 'Outstanding property tax arrears of ₹1,42,800 spanning FY 2023-24 to 2025-26.',
      descriptionHi: 'वित्तीय वर्ष 2023-24 से 2025-26 तक ₹1,42,800 का संपत्ति कर बकाया है।'
    }
  ],
  connectedRecords: [
    {
      id: 'cr-2-1',
      domainNumber: 1,
      domainNameEn: 'Revenue land record (Bhoomi RTC)',
      domainNameHi: 'राजस्व भूमि रिकॉर्ड (भूमि आरटीसी)',
      systemName: 'Karnataka Bhoomi System',
      sourceStatus: 'AVAILABLE',
      findingStatus: 'Checked — No issue found (RTC matches)',
      findingSeverity: 'green',
      summary: 'RTC Khata 58 active under Pooja Sharma',
      provenance: {
        source: 'Karnataka Bhoomi Engine',
        sourceDepartment: 'Revenue Department Karnataka',
        recordDate: '05 Jan 2026',
        lastSynchronized: '02 Sep 2026',
        status: 'AVAILABLE'
      },
      details: { rtcStatus: 'Valid' }
    },
    {
      id: 'cr-2-2',
      domainNumber: 2,
      domainNameEn: 'Registration record (Kaveri 2.0)',
      domainNameHi: 'पंजीकरण रिकॉर्ड (कावेरी 2.0)',
      systemName: 'Kaveri Sub-Registrar Portal',
      sourceStatus: 'AVAILABLE',
      findingStatus: 'Checked — No issue found',
      findingSeverity: 'green',
      summary: 'Sale deed executed 2018 without litigation',
      provenance: {
        source: 'Kaveri Registration System',
        sourceDepartment: 'Department of Stamps and Registration',
        recordDate: '12 Sep 2018',
        lastSynchronized: '01 Sep 2026',
        status: 'AVAILABLE'
      },
      details: { docNumber: 'KAV-2018-4901' }
    },
    {
      id: 'cr-2-3',
      domainNumber: 3,
      domainNameEn: 'Property tax record (Bruhat Municipal Cell)',
      domainNameHi: 'संपत्ति कर रिकॉर्ड (नगर पालिका)',
      systemName: 'Municipal Property Tax System',
      sourceStatus: 'INCONSISTENT',
      findingStatus: 'Checked — Review needed (Arrears + area under-reporting)',
      findingSeverity: 'amber',
      summary: 'Declared 1,200 sq ft vs detected 3,850 sq ft; 3-year arrears',
      provenance: {
        source: 'Devanahalli Town Municipal Council',
        sourceDepartment: 'Directorate of Municipal Administration',
        recordDate: '01 Apr 2026',
        lastSynchronized: '02 Sep 2026',
        status: 'INCONSISTENT'
      },
      details: { arrears: '₹1,42,800', declaredArea: '1,200 sq ft' }
    },
    {
      id: 'cr-2-4',
      domainNumber: 4,
      domainNameEn: 'Building & permissions (OBPS)',
      domainNameHi: 'भवन निर्माण अनुमति (OBPS)',
      systemName: 'Town Planning Building Approval',
      sourceStatus: 'INCONSISTENT',
      findingStatus: 'Checked — Review needed (Deviation beyond sanctioned height)',
      findingSeverity: 'amber',
      summary: 'Sanction obtained for G+1; physical survey shows G+2 structure',
      provenance: {
        source: 'BMRDA Planning Wing',
        sourceDepartment: 'Bangalore Metropolitan Region Development',
        recordDate: '18 Nov 2020',
        lastSynchronized: '01 Sep 2026',
        status: 'INCONSISTENT'
      },
      details: { sanctionFloors: 'G+1', actualFloors: 'G+2' }
    },
    {
      id: 'cr-2-5',
      domainNumber: 5,
      domainNameEn: 'Land use & zoning (BMRDA Master Plan)',
      domainNameHi: 'भूमि उपयोग और ज़ोनिंग',
      systemName: 'CDP Master Plan GIS',
      sourceStatus: 'AVAILABLE',
      findingStatus: 'Checked — No issue found',
      findingSeverity: 'green',
      summary: 'Zone R-2 allows mixed residential-commercial development',
      provenance: {
        source: 'Town Planning GIS',
        sourceDepartment: 'Urban Development',
        recordDate: '01 Jan 2025',
        lastSynchronized: '28 Aug 2026',
        status: 'AVAILABLE'
      },
      details: { zone: 'R-2 Mixed' }
    },
    {
      id: 'cr-2-6',
      domainNumber: 6,
      domainNameEn: 'Judicial court records (e-Courts Land CIS)',
      domainNameHi: 'न्यायिक अदालत रिकॉर्ड',
      systemName: 'e-Courts CIS Portal',
      sourceStatus: 'AVAILABLE',
      findingStatus: 'Checked — No issue found',
      findingSeverity: 'green',
      summary: 'No civil stay or title dispute pending',
      provenance: {
        source: 'District Court Civil Registry',
        sourceDepartment: 'High Court of Karnataka e-Committee',
        recordDate: '01 Sep 2026',
        lastSynchronized: '02 Sep 2026',
        status: 'AVAILABLE'
      },
      details: { cases: 0 }
    },
    {
      id: 'cr-2-7',
      domainNumber: 7,
      domainNameEn: 'Official boundary map (Cadastral GIS Map)',
      domainNameHi: 'आधिकारिक सीमा नक्शा',
      systemName: 'Survey Settlement & Land Records (SSLR)',
      sourceStatus: 'AVAILABLE',
      findingStatus: 'Checked — No issue found (Boundaries intact)',
      findingSeverity: 'green',
      summary: 'Outer boundaries of 0.85 acre surveyed without boundary encroachment',
      provenance: {
        source: 'SSLR Karnataka Cadastral Unit',
        sourceDepartment: 'Revenue Survey Department',
        recordDate: '20 Jul 2023',
        lastSynchronized: '20 Aug 2026',
        status: 'AVAILABLE'
      },
      details: { surveyMismatch: 'None' }
    }
  ],
  timeline: [
    {
      year: '2012',
      date: '10 Aug 2012',
      eventEn: 'Survey Demarcation',
      eventHi: 'सर्वे सीमांकन',
      source: 'Taluk Revenue Office',
      explanationEn: 'Partitioned from parent survey 112 as plot 112/4.',
      explanationHi: 'मूल सर्वे 112 से भूखंड 112/4 के रूप में विभाजित।',
      type: 'survey'
    },
    {
      year: '2018',
      date: '12 Sep 2018',
      eventEn: 'Registered Conveyance',
      eventHi: 'पंजीकृत हस्तांतरण',
      source: 'Sub-Registrar Devanahalli',
      explanationEn: 'Purchased by Pooja Sharma; sale deed KAV-2018-4901.',
      explanationHi: 'पूजा शर्मा द्वारा क्रय किया गया; विक्रय विलेख KAV-2018-4901।',
      type: 'sale'
    },
    {
      year: '2020',
      date: '18 Nov 2020',
      eventEn: 'Building Sanction (G+1)',
      eventHi: 'भवन निर्माण स्वीकृति (G+1)',
      source: 'BMRDA Planning Wing',
      explanationEn: 'Permit issued for 1,200 sq ft residential unit.',
      explanationHi: '1,200 वर्ग फुट आवासीय इकाई हेतु अनुमति जारी।',
      type: 'mutation'
    },
    {
      year: '2026',
      date: '02 Sep 2026',
      eventEn: 'Tax Discrepancy Flagged',
      eventHi: 'कर विसंगति चिह्नित',
      source: 'BHOOMI-SETU Reconciliation Engine',
      explanationEn: 'GIS telemetry flagged 3,850 sq ft commercial usage vs 1,200 sq ft tax declaration.',
      explanationHi: 'जीआईएस विश्लेषण में घोषित 1,200 वर्ग फुट के विरुद्ध 3,850 वर्ग फुट का उपयोग पाया गया।',
      type: 'tax'
    }
  ],
  anomalyFeatures: {
    ownershipChanges: 1,
    registrationCount: 1,
    taxDelayMonths: 36,
    landUseChanges: 1,
    buildingPermissionStatus: 'DEVIATION',
    disputeCount: 0,
    transactionFrequencyPerYear: 0.1,
    recordMismatchCount: 2
  },
  anomalyExplanation: 'Isolation Forest flagged tax-to-spatial area ratio (0.31) as outlier in peri-urban commercial corridor.'
};

export const PARCEL_003: Parcel = {
  ulpin: 'IN-BS-2026-000003',
  stateParcelId: 'MP-BPL-2026-402',
  surveyNumber: '210/A',
  khasraNumber: '210/A',
  khataNumber: '89',
  municipalPropertyId: 'BPL-PERI-210',
  legacyId: 'LEG-2005-BPL-89',
  recordedHolder: 'Rajesh Tyagi',
  recordedHolderHi: 'राजेश त्यागी',
  historicalHolders: ['Bhopal Farm Holding Trust (2005)'],
  areaAcres: 3.10,
  rorAreaAcres: 3.10,
  areaFormatted: '3.10 Acres (12,545 sq.m)',
  village: 'Bhopal Peri-Urban',
  tehsil: 'Huzur Tehsil',
  district: 'Bhopal',
  state: 'Madhya Pradesh',
  landUse: 'Agricultural (Operating Commercial Warehouse)',
  zoningCode: 'AG-CONS (Agricultural Conservation)',
  coordinates: { lat: 23.2599, lng: 77.4126 },
  polygonCoordinates: [
    [28.5390, 77.3890],
    [28.5410, 77.3895],
    [28.5412, 77.3915],
    [28.5392, 77.3910],
  ],
  healthScore: 51,
  attentionLevel: 'Medium',
  confidence: 'High',
  findings: [
    {
      id: 'f-003-1',
      severity: 'amber',
      category: 'zoning',
      titleEn: 'Checked — Review needed: Land-use mismatch with master plan zoning',
      titleHi: 'जांच पूर्ण — समीक्षा आवश्यक: मास्टर प्लान ज़ोनिंग के साथ भूमि उपयोग में विसंगति',
      badgeEn: 'Zoning Conflict',
      badgeHi: 'ज़ोनिंग टकराव',
      descriptionEn: 'Town Master Plan designates parcel as Agricultural Conservation. Remote sensing detects operating commercial logistics warehouse.',
      descriptionHi: 'मास्टर प्लान में भूमि कृषि संरक्षण क्षेत्र है, जबकि रिमोट सेंसिंग में वाणिज्यिक वेयरहाउस गतिविधि पाई गई है।',
      evidence: {
        sourceA: {
          system: 'Bhopal Master Plan 2031 (T&CP MP)',
          value: 'Zoning: Agricultural Conservation (Strict Non-Commercial)',
          recordDate: '01 Jan 2022',
          lastSync: '01 Sep 2026'
        },
        sourceB: {
          system: 'District Collector Land Records (CLU Register)',
          value: 'No Sanctioned Change of Land Use (CLU) order found on record',
          recordDate: '02 Sep 2026',
          lastSync: '02 Sep 2026'
        },
        discrepancyNote: 'Unauthorized commercial warehousing operation without synthetic Section 172 CLU sanction.'
      }
    }
  ],
  connectedRecords: [
    {
      id: 'cr-3-1',
      domainNumber: 1,
      domainNameEn: 'Revenue land record (MP Bhulekh Khasra)',
      domainNameHi: 'राजस्व भूमि रिकॉर्ड (खसरा)',
      systemName: 'MP Bhulekh Portal',
      sourceStatus: 'AVAILABLE',
      findingStatus: 'Checked — No issue found (Holder verified)',
      findingSeverity: 'green',
      summary: 'Holder Rajesh Tyagi; recorded as Krishi Bhumi (Agricultural)',
      provenance: {
        source: 'MP Revenue Board',
        sourceDepartment: 'Revenue Department Madhya Pradesh',
        recordDate: '14 Feb 2026',
        lastSynchronized: '02 Sep 2026',
        status: 'AVAILABLE'
      },
      details: { khata: '89', cropCode: 'Wheat/Chana (Recorded on paper)' }
    },
    {
      id: 'cr-3-2',
      domainNumber: 2,
      domainNameEn: 'Registration record (Sampada Portal)',
      domainNameHi: 'पंजीकरण रिकॉर्ड (संपदा)',
      systemName: 'Inspector General Registration MP',
      sourceStatus: 'AVAILABLE',
      findingStatus: 'Checked — No issue found',
      findingSeverity: 'green',
      summary: 'Sale deed executed 2019 without active mortgage',
      provenance: {
        source: 'Sampada E-Registration',
        sourceDepartment: 'Commercial Tax Department',
        recordDate: '14 Jun 2019',
        lastSynchronized: '01 Sep 2026',
        status: 'AVAILABLE'
      },
      details: { doc: 'SMP-2019-9021' }
    },
    {
      id: 'cr-3-3',
      domainNumber: 3,
      domainNameEn: 'Property tax record (Gram Panchayat)',
      domainNameHi: 'संपत्ति कर रिकॉर्ड',
      systemName: 'Panchayat Samiti Assessment',
      sourceStatus: 'AVAILABLE',
      findingStatus: 'Checked — No issue found',
      findingSeverity: 'green',
      summary: 'Basic agricultural land cess paid',
      provenance: {
        source: 'Huzur Janpad Panchayat',
        sourceDepartment: 'Panchayat & Rural Development',
        recordDate: '10 May 2026',
        lastSynchronized: '29 Aug 2026',
        status: 'AVAILABLE'
      },
      details: { taxStatus: 'Current (Agricultural rates)' }
    },
    {
      id: 'cr-3-4',
      domainNumber: 4,
      domainNameEn: 'Building & permissions (OBPS)',
      domainNameHi: 'भवन निर्माण अनुमति',
      systemName: 'Town & Country Planning OBPS',
      sourceStatus: 'UNAVAILABLE',
      findingStatus: 'Information unavailable (No industrial warehouse plan sanctioned)',
      findingSeverity: 'grey',
      summary: 'No commercial building permit exists in official repository',
      provenance: {
        source: 'T&CP Directorate Bhopal',
        sourceDepartment: 'Urban Development & Housing',
        recordDate: 'N/A',
        lastSynchronized: '01 Sep 2026',
        status: 'UNAVAILABLE'
      },
      details: { obpsStatus: 'Nil' }
    },
    {
      id: 'cr-3-5',
      domainNumber: 5,
      domainNameEn: 'Land use & zoning (Master Plan 2031)',
      domainNameHi: 'भूमि उपयोग और ज़ोनिंग',
      systemName: 'Town & Country Planning Master Plan',
      sourceStatus: 'INCONSISTENT',
      findingStatus: 'Checked — Review needed (Zoning violation detected)',
      findingSeverity: 'amber',
      summary: 'Conservation Green Belt; commercial warehouse operating without CLU',
      provenance: {
        source: 'Directorate of Town & Country Planning',
        sourceDepartment: 'Housing & Environment Department',
        recordDate: '01 Jan 2022',
        lastSynchronized: '02 Sep 2026',
        status: 'INCONSISTENT'
      },
      details: { classification: 'Agricultural Conservation Zone' }
    },
    {
      id: 'cr-3-6',
      domainNumber: 6,
      domainNameEn: 'Judicial court records (e-Courts Land CIS)',
      domainNameHi: 'न्यायिक अदालत रिकॉर्ड',
      systemName: 'District Court CIS',
      sourceStatus: 'AVAILABLE',
      findingStatus: 'Checked — No issue found',
      findingSeverity: 'green',
      summary: 'No active judicial stay orders found',
      provenance: {
        source: 'Bhopal District Court CIS',
        sourceDepartment: 'e-Courts Mission Mode Project',
        recordDate: '01 Sep 2026',
        lastSynchronized: '02 Sep 2026',
        status: 'AVAILABLE'
      },
      details: { suits: 0 }
    },
    {
      id: 'cr-3-7',
      domainNumber: 7,
      domainNameEn: 'Official boundary map (Cadastral GIS Map)',
      domainNameHi: 'आधिकारिक सीमा नक्शा',
      systemName: 'MP Land Records Cadastre Layer',
      sourceStatus: 'AVAILABLE',
      findingStatus: 'Checked — No issue found',
      findingSeverity: 'green',
      summary: 'Boundary geometry matches surveyed extent of 3.10 acres',
      provenance: {
        source: 'Settlement Officer Cadastral Survey',
        sourceDepartment: 'Revenue Department MP',
        recordDate: '12 Dec 2023',
        lastSynchronized: '20 Aug 2026',
        status: 'AVAILABLE'
      },
      details: { acreageDeviation: '0.00%' }
    }
  ],
  timeline: [
    {
      year: '2005',
      date: '10 Jan 2005',
      eventEn: 'Settlement Khata Entry',
      eventHi: 'बंदोबस्त खाता प्रविष्टि',
      source: 'Huzur Tehsil Archives',
      explanationEn: 'Survey 210/A demarcated as prime agricultural land.',
      explanationHi: 'सर्वे 210/A को प्रमुख कृषि भूमि के रूप में सीमांकित किया गया।',
      type: 'survey'
    },
    {
      year: '2019',
      date: '14 Jun 2019',
      eventEn: 'Sale Deed Executed',
      eventHi: 'विक्रय विलेख निष्पादित',
      source: 'Sampada Sub-Registrar',
      explanationEn: 'Purchased by Rajesh Tyagi as agricultural holding.',
      explanationHi: 'राजेश त्यागी द्वारा कृषि भूमि के रूप में क्रय किया गया।',
      type: 'sale'
    },
    {
      year: '2023',
      date: '05 Nov 2023',
      eventEn: 'Warehouse Construction Detected',
      eventHi: 'गोदाम निर्माण पाया गया',
      source: 'Sentinel-2 Remote Sensing Cadastre Layer',
      explanationEn: 'Commercial roof structures established without synthetic CLU conversion permit.',
      explanationHi: 'कृषि भूमि परिवर्तन (CLU) अनुमति के बिना वाणिज्यिक शेड का निर्माण।',
      type: 'tax'
    }
  ],
  anomalyFeatures: {
    ownershipChanges: 1,
    registrationCount: 1,
    taxDelayMonths: 0,
    landUseChanges: 2,
    buildingPermissionStatus: 'UNAUTHORIZED_USE',
    disputeCount: 0,
    transactionFrequencyPerYear: 0.1,
    recordMismatchCount: 1
  },
  anomalyExplanation: 'Spectral anomaly: Industrial roofing signatures in agricultural conservation zone.'
};

export const PARCEL_004: Parcel = {
  ulpin: 'IN-BS-2026-000004',
  stateParcelId: 'RJ-JPR-2026-881',
  surveyNumber: '77/2',
  khasraNumber: '77/2',
  khataNumber: '31',
  municipalPropertyId: 'JPR-NORTH-77',
  legacyId: 'LEG-2015-JPR-31',
  recordedHolder: 'Ramesh Kumar',
  recordedHolderHi: 'रमेश कुमार',
  historicalHolders: ['Bhagwan Das (2001)'],
  areaAcres: 1.20,
  rorAreaAcres: 1.20,
  areaFormatted: '1.20 Acres (4,856 sq.m)',
  village: 'Jaipur Tehsil North',
  tehsil: 'Amer Sub-Division',
  district: 'Jaipur',
  state: 'Rajasthan',
  landUse: 'Agricultural / Residential Border',
  zoningCode: 'R-PERI (Urban Expansion)',
  coordinates: { lat: 26.9124, lng: 75.7873 },
  polygonCoordinates: [
    [28.5330, 77.3930],
    [28.5345, 77.3932],
    [28.5348, 77.3948],
    [28.5332, 77.3945],
  ],
  healthScore: 44,
  attentionLevel: 'High',
  confidence: 'High',
  findings: [
    {
      id: 'f-004-1',
      severity: 'amber',
      category: 'ownership',
      titleEn: 'Checked — Review needed: Ownership mismatch between Registration and Revenue records',
      titleHi: 'जांच पूर्ण — समीक्षा आवश्यक: उप-पंजीयक विलेख और राजस्व खतौनी में धारक का नाम अलग',
      badgeEn: 'Unmutated Sale Deed',
      badgeHi: 'अनम्यूटेटेड बिक्री विलेख',
      descriptionEn: 'The latest registration record identifies Suresh Kumar as buyer, while the current Revenue record still lists previous holder Ramesh Kumar.',
      descriptionHi: 'नवीनतम उप-पंजीयक रिकॉर्ड में खरीदार सुरेश कुमार हैं, जबकि चालू राजस्व खतौनी में अभी भी पुराना नाम रमेश कुमार दर्ज है।',
      evidence: {
        sourceA: {
          system: 'Apna Khata Revenue Record (RoR)',
          recordHolder: 'Ramesh Kumar',
          value: 'Khatauni 31, Status: Pending Mutation Freeze',
          recordDate: '03 Apr 2025',
          lastSync: '02 Sep 2026'
        },
        sourceB: {
          system: 'Sub-Registrar Registration Deed Archive',
          recordHolder: 'Suresh Kumar (Buyer)',
          value: 'Registered Conveyance Deed #9021/2025',
          recordDate: '14 May 2025',
          lastSync: '01 Sep 2026'
        },
        discrepancyNote: 'Registered sale deed executed 16 months ago without completed title mutation in revenue office.'
      }
    },
    {
      id: 'f-004-2',
      severity: 'amber',
      category: 'transfer',
      titleEn: 'Checked — Review needed: Synthetic mutation challenge/freeze flagged',
      titleHi: 'जांच पूर्ण — समीक्षा आवश्यक: नामांतरण प्रक्रिया पर आपत्ति / रोक',
      badgeEn: 'Mutation Freeze',
      badgeHi: 'नामांतरण पर रोक',
      descriptionEn: 'Objection petition filed before Naib Tehsildar disputing legal heir consent for the transfer.',
      descriptionHi: 'कानूनी वारिस की सहमति न होने के आधार पर नायब तहसीलदार के समक्ष आपत्ति याचिका विचाराधीन।'
    }
  ],
  connectedRecords: [
    {
      id: 'cr-4-1',
      domainNumber: 1,
      domainNameEn: 'Revenue land record (Apna Khata Jamabandi)',
      domainNameHi: 'राजस्व भूमि रिकॉर्ड (जमाबंदी)',
      systemName: 'Rajasthan Apna Khata Portal',
      sourceStatus: 'INCONSISTENT',
      findingStatus: 'Checked — Review needed (Recorded holder differs from recent deed)',
      findingSeverity: 'amber',
      summary: 'Recorded holder: Ramesh Kumar (Deed executed to Suresh Kumar)',
      provenance: {
        source: 'Board of Revenue Rajasthan',
        sourceDepartment: 'Revenue Department',
        recordDate: '03 Apr 2025',
        lastSynchronized: '02 Sep 2026',
        status: 'INCONSISTENT'
      },
      details: { khata: '31', mutationPending: 'True' }
    },
    {
      id: 'cr-4-2',
      domainNumber: 2,
      domainNameEn: 'Registration record (e-Panjiyan Sub-Registrar)',
      domainNameHi: 'पंजीकरण रिकॉर्ड (ई-पंजीयन)',
      systemName: 'Registration & Stamps Department',
      sourceStatus: 'AVAILABLE',
      findingStatus: 'Checked — Review needed (Sale executed without title mutation)',
      findingSeverity: 'amber',
      summary: 'Deed #9021/2025 executed 14 May 2025 to buyer Suresh Kumar',
      provenance: {
        source: 'e-Panjiyan Portal',
        sourceDepartment: 'Registration & Stamps Department',
        recordDate: '14 May 2025',
        lastSynchronized: '01 Sep 2026',
        status: 'AVAILABLE'
      },
      details: { deedNo: '9021/2025', consideration: '₹45,00,000' }
    },
    {
      id: 'cr-4-3',
      domainNumber: 3,
      domainNameEn: 'Property tax record (Jaipur Nagar Nigam)',
      domainNameHi: 'संपत्ति कर रिकॉर्ड',
      systemName: 'Municipal Assessment Registry',
      sourceStatus: 'AVAILABLE',
      findingStatus: 'Checked — No issue found',
      findingSeverity: 'green',
      summary: 'Property tax cleared up to current assessment year',
      provenance: {
        source: 'Jaipur Municipal Corporation Heritage',
        sourceDepartment: 'Local Self Government',
        recordDate: '20 Jul 2026',
        lastSynchronized: '28 Aug 2026',
        status: 'AVAILABLE'
      },
      details: { dues: '₹0' }
    },
    {
      id: 'cr-4-4',
      domainNumber: 4,
      domainNameEn: 'Building & permissions (OBPS)',
      domainNameHi: 'भवन निर्माण अनुमति',
      systemName: 'Jaipur Development Authority (JDA)',
      sourceStatus: 'UNAVAILABLE',
      findingStatus: 'Information unavailable (Agricultural classification)',
      findingSeverity: 'grey',
      summary: 'No building sanction required for open land',
      provenance: {
        source: 'JDA OBPS Wing',
        sourceDepartment: 'Urban Development',
        recordDate: 'N/A',
        lastSynchronized: '01 Sep 2026',
        status: 'UNAVAILABLE'
      },
      details: { status: 'Open plot' }
    },
    {
      id: 'cr-4-5',
      domainNumber: 5,
      domainNameEn: 'Land use & zoning (JDA Master Development Plan)',
      domainNameHi: 'भूमि उपयोग और ज़ोनिंग',
      systemName: 'JDA Master Plan 2025',
      sourceStatus: 'AVAILABLE',
      findingStatus: 'Checked — No issue found',
      findingSeverity: 'green',
      summary: 'Urban Expansion Zone; residential layout eligible',
      provenance: {
        source: 'Town Planning JDA',
        sourceDepartment: 'Urban Development Department',
        recordDate: '10 Jan 2025',
        lastSynchronized: '02 Sep 2026',
        status: 'AVAILABLE'
      },
      details: { zone: 'U-Exp' }
    },
    {
      id: 'cr-4-6',
      domainNumber: 6,
      domainNameEn: 'Judicial court records (e-Courts Land CIS)',
      domainNameHi: 'न्यायिक अदालत रिकॉर्ड',
      systemName: 'District Court Jaipur CIS',
      sourceStatus: 'INCONSISTENT',
      findingStatus: 'Checked — Review needed (Revenue court mutation challenge pending)',
      findingSeverity: 'amber',
      summary: 'Revenue Case #REV-2025-104 challenge pending before SDO Amer',
      provenance: {
        source: 'Revenue Courts Management System',
        sourceDepartment: 'Board of Revenue for Rajasthan',
        recordDate: '10 Jun 2025',
        lastSynchronized: '02 Sep 2026',
        status: 'INCONSISTENT'
      },
      details: { sdoCase: 'REV-2025-104', subject: 'Objection to Mutation' }
    },
    {
      id: 'cr-4-7',
      domainNumber: 7,
      domainNameEn: 'Official boundary map (Cadastral GIS Map)',
      domainNameHi: 'आधिकारिक सीमा नक्शा',
      systemName: 'BhuNaksha Rajasthan',
      sourceStatus: 'AVAILABLE',
      findingStatus: 'Checked — No issue found (Area matches 1.20 acres)',
      findingSeverity: 'green',
      summary: 'BhuNaksha polygon boundaries consistent with survey record',
      provenance: {
        source: 'BhuNaksha Vector Cadastre',
        sourceDepartment: 'Department of Land Resources',
        recordDate: '15 Aug 2024',
        lastSynchronized: '20 Aug 2026',
        status: 'AVAILABLE'
      },
      details: { areaDeviation: '0.00%' }
    }
  ],
  timeline: [
    {
      year: '2001',
      date: '15 Jul 2001',
      eventEn: 'Settlement Record Entry',
      eventHi: 'बंदोबस्त रिकॉर्ड प्रविष्टि',
      source: 'Amer Tehsil Record Room',
      explanationEn: 'Held by Bhagwan Das; later transferred to Ramesh Kumar.',
      explanationHi: 'भगवान दास के नाम दर्ज; बाद में रमेश कुमार को अंतरित।',
      type: 'survey'
    },
    {
      year: '2025',
      date: '14 May 2025',
      eventEn: 'Sale Deed Executed to Suresh Kumar',
      eventHi: 'सुरेश कुमार के नाम विक्रय विलेख',
      source: 'Sub-Registrar Jaipur North',
      explanationEn: 'Registered Conveyance Deed #9021/2025 executed.',
      explanationHi: 'पंजीकृत विक्रय विलेख #9021/2025 निष्पादित।',
      type: 'sale'
    },
    {
      year: '2025',
      date: '10 Jun 2025',
      eventEn: 'Mutation Challenge Filed',
      eventHi: 'नामांतरण पर आपत्ति दर्ज',
      source: 'SDO Revenue Court Amer',
      explanationEn: 'Legal heir challenge filed; revenue mutation frozen pending hearing.',
      explanationHi: 'वारिस द्वारा चुनौती याचिका दायर; सुनवाई लंबित होने तक नामांतरण स्थगित।',
      type: 'dispute'
    }
  ],
  anomalyFeatures: {
    ownershipChanges: 2,
    registrationCount: 2,
    taxDelayMonths: 0,
    landUseChanges: 0,
    buildingPermissionStatus: 'N/A',
    disputeCount: 1,
    transactionFrequencyPerYear: 0.5,
    recordMismatchCount: 2
  },
  anomalyExplanation: 'Temporal mismatch: 480+ days elapsed between registration and revenue mutation.'
};

// ==========================================
// PARCEL 005 — MANDATORY KILLER DEMO PARCEL
// ==========================================
export const PARCEL_005_INITIAL: Parcel = {
  ulpin: 'IN-BS-2026-000005',
  stateParcelId: 'KA-BLR-2026-005',
  surveyNumber: '142/3A',
  khasraNumber: '142/3A',
  khataNumber: '81',
  municipalPropertyId: 'RMP-142-3A',
  legacyId: 'LEG-1998-RK-81',
  recordedHolder: 'Ramesh Kumar',
  recordedHolderHi: 'रमेश कुमार',
  historicalHolders: ['Vinod Kumar & Ors (1998-2024)', 'Bengaluru Agro Syndicate (2024)', 'Venkatesh Builders (2025)'],
  areaAcres: 2.14,
  rorAreaAcres: 1.97,
  areaFormatted: '2.14 Acres (RoR records: 1.97 Acres)',
  village: 'Rampur Khurd',
  tehsil: 'Tehsil Example North',
  district: 'Bengaluru Rural',
  state: 'Karnataka',
  landUse: 'Agricultural',
  zoningCode: 'Green Belt (AG-02)',
  coordinates: { lat: 12.9854, lng: 77.7258 },
  polygonCoordinates: [
    [12.9840, 77.7240],
    [12.9868, 77.7242],
    [12.9870, 77.7275],
    [12.9842, 77.7270],
  ],
  healthScore: 28,
  attentionLevel: 'Critical',
  confidence: 'High',
  findings: [
    {
      id: 'f-005-1',
      severity: 'red',
      category: 'court',
      titleEn: 'Checked — Important issue: Active court restriction',
      titleHi: 'जांच पूर्ण — गंभीर समस्या: न्यायालयीन स्थगनादेश (Stay Order)',
      badgeEn: 'Court Stay',
      badgeHi: 'अदालती रोक',
      descriptionEn: 'Civil Court stay on alienation under Suit OS-482/2024 (Ramesh Kumar vs Vinod Kumar & Ors). Sale or transfer is legally restrained.',
      descriptionHi: 'सूट संख्या OS-482/2024 (रमेश कुमार बनाम विनोद कुमार व अन्य) के तहत संपत्ति के अंतरण/बिक्री पर सिविल कोर्ट का स्थगनादेश सक्रिय है।',
      technicalDetails: 'Honorable Civil Court order passed 18 Oct 2024 restraining any third-party alienation or charge creation over Survey 142/3A.',
      evidence: {
        sourceA: {
          system: 'e-Courts National Land Disputes CIS',
          recordHolder: 'Suit OS-482/2024 (Pending)',
          value: 'Interim Injunction under Order 39 Rules 1 & 2 CPC (Stay on alienation)',
          recordDate: '18 Oct 2024',
          lastSync: '02 Sep 2026 08:30 IST'
        },
        sourceB: {
          system: 'Sub-Registrar Conveyance Registry',
          recordHolder: 'Attempted Conveyance Intimation',
          value: 'Restraint alert triggered; deed registration prohibited under Section 52 Transfer of Property Act',
          recordDate: '02 Sep 2026',
          lastSync: '02 Sep 2026 09:00 IST'
        },
        discrepancyNote: 'Property is subject to active lis pendens and judicial injunction. Alienation legally restrained.'
      },
      resolved: false
    },
    {
      id: 'f-005-2',
      severity: 'amber',
      category: 'boundary',
      titleEn: 'Checked — Review needed: Boundary difference',
      titleHi: 'जांच पूर्ण — समीक्षा आवश्यक: आधिकारिक सीमा व क्षेत्रफल में अंतर',
      badgeEn: 'Boundary Mismatch',
      badgeHi: 'सीमा विसंगति',
      descriptionEn: 'Mapped boundary is 2.14 acres vs 1.97 recorded acres in Khatauni; spatial analysis touches public drainage border (Khasra 142/Drain).',
      descriptionHi: 'नक्शे में क्षेत्रफल 2.14 एकड़ है जबकि खतौनी में 1.97 एकड़ दर्ज है; जीआईएस विश्लेषण में 0.17 एकड़ सार्वजनिक नाले पर अतिक्रमण संकेतित है।',
      technicalDetails: 'Cadastral polygon envelope exceeds Record of Rights entitlement by 0.17 Acre (7,405 sq ft) overlapping adjacent Gram Panchayat drainage commons.',
      evidence: {
        sourceA: {
          system: 'Survey of India / Drone Cadastre Polygon Layer',
          value: 'Measured Cadastral Area: 2.14 Acres (8,660 sq.m)',
          recordDate: '12 May 2025',
          lastSync: '02 Sep 2026 08:00 IST'
        },
        sourceB: {
          system: 'RoR Khatauni (Revenue Record of Rights)',
          recordHolder: 'Ramesh Kumar (Khata 81)',
          value: 'Sanctioned RoR Area: 1.97 Acres (7,972 sq.m)',
          recordDate: '03 Apr 2025',
          lastSync: '02 Sep 2026 08:00 IST'
        },
        discrepancyNote: '0.17 Acre spatial encroachment touching public Gram Panchayat drainage boundary offset.'
      },
      resolved: false
    },
    {
      id: 'f-005-3',
      severity: 'amber',
      category: 'transfer',
      titleEn: 'Checked — Review needed: Unusual transfer pattern',
      titleHi: 'जांच पूर्ण — समीक्षा आवश्यक: असामान्य त्वरित लेनदेन आवृत्ति',
      badgeEn: 'Transfer Frequency',
      badgeHi: 'त्वरित लेनदेन',
      descriptionEn: '3 recorded transfers within 14 months without matching title mutation in the revenue office.',
      descriptionHi: 'राजस्व कार्यालय में नामांतरण हुए बिना 14 महीनों के भीतर 3 बार त्वरित लेनदेन दर्ज किए गए हैं।',
      technicalDetails: 'Isolation Forest Anomaly Model identified rapid conveyance frequency of 2.57 transfers/yr (Baseline normal for agrarian tenure is <0.15/yr).',
      evidence: {
        sourceA: {
          system: 'Sub-Registrar NGDRS Conveyance Log',
          value: '3 Deeds registered: Deed #3019 (May 2024), Deed #4109 (Nov 2024), Deed #1082 (Mar 2025)',
          recordDate: '14 Mar 2025',
          lastSync: '01 Sep 2026 14:00 IST'
        },
        sourceB: {
          system: 'Tehsil Revenue Mutation Register',
          recordHolder: 'Ramesh Kumar',
          value: 'Zero corresponding mutation entries sanctioned during this period',
          recordDate: '03 Apr 2025',
          lastSync: '02 Sep 2026 08:00 IST'
        },
        discrepancyNote: 'Three consecutive registered conveyances executed without completing RoR mutation.'
      },
      resolved: false
    }
  ],
  connectedRecords: [
    {
      id: 'cr-5-1',
      domainNumber: 1,
      domainNameEn: 'Revenue land record (RoR Khatauni)',
      domainNameHi: 'राजस्व भूमि रिकॉर्ड (खतौनी)',
      systemName: 'Bhulekh / Bhoomi RTC Service',
      sourceStatus: 'AVAILABLE',
      findingStatus: 'Checked — Review needed (Recorded holder differs from recent deed)',
      findingSeverity: 'amber',
      summary: 'Recorded holder: Ramesh Kumar | Khata: 81 | Area: 1.97 Acres',
      provenance: {
        source: 'Bhulekh RoR Service',
        sourceDepartment: 'Department of Land Resources & Revenue',
        recordDate: '03 Apr 2025',
        lastSynchronized: '02 Sep 2026 08:00 IST',
        status: 'AVAILABLE',
        recordId: 'ROR-RK-81-05'
      },
      details: { khata: '81', recordedArea: '1.97 Acres', recordedHolder: 'Ramesh Kumar', mutationStatus: 'Unmutated transfers pending' }
    },
    {
      id: 'cr-5-2',
      domainNumber: 2,
      domainNameEn: 'Registration record (Sub-Registrar NGDRS)',
      domainNameHi: 'पंजीकरण रिकॉर्ड (सब-रजिस्ट्रार NGDRS)',
      systemName: 'Sub-Registrar NGDRS Portal',
      sourceStatus: 'AVAILABLE',
      findingStatus: 'Checked — Review needed (Recent sale deed executed without updated revenue record)',
      findingSeverity: 'amber',
      summary: 'Registered Conveyance Doc #4109/25 | Churn of 3 transactions in 14 mos',
      provenance: {
        source: 'National Generic Document Registration System',
        sourceDepartment: 'Inspector General of Registration',
        recordDate: '14 Mar 2025',
        lastSynchronized: '01 Sep 2026 14:00 IST',
        status: 'AVAILABLE',
        recordId: 'DOC-NGDRS-4109'
      },
      details: { lastDoc: '4109/25', consideration: '₹82,00,000', partyFirst: 'Vinod Kumar', partySecond: 'Ramesh Kumar' }
    },
    {
      id: 'cr-5-3',
      domainNumber: 3,
      domainNameEn: 'Property tax record (Municipal Tax)',
      domainNameHi: 'संपत्ति कर रिकॉर्ड (नगर पालिका)',
      systemName: 'Rampur Nagar Palika Tax Assessment',
      sourceStatus: 'AVAILABLE',
      findingStatus: 'Checked — No issue found (Nil dues)',
      findingSeverity: 'green',
      summary: 'Assessment ID: RMP-142-3A | Nil dues',
      provenance: {
        source: 'Nagar Palika Property Assessment Wing',
        sourceDepartment: 'Urban Local Bodies / Panchayat',
        recordDate: '10 Jun 2026',
        lastSynchronized: '02 Sep 2026 09:15 IST',
        status: 'AVAILABLE',
        recordId: 'TAX-RMP-142-3A'
      },
      details: { status: 'Paid', receiptNo: 'NP-2026-9901', arrears: '₹0' }
    },
    {
      id: 'cr-5-4',
      domainNumber: 4,
      domainNameEn: 'Building & permissions (OBPS)',
      domainNameHi: 'भवन निर्माण अनुमति (OBPS)',
      systemName: 'Town Planning Online Building Permission',
      sourceStatus: 'UNAVAILABLE',
      findingStatus: 'Information unavailable (Agricultural land, no building sanction recorded)',
      findingSeverity: 'grey',
      summary: 'Agricultural zoning classification; no commercial building plan on record',
      provenance: {
        source: 'Town Planning Authority OBPS API',
        sourceDepartment: 'Urban Development & Housing',
        recordDate: 'N/A',
        lastSynchronized: '01 Sep 2026 04:00 IST',
        status: 'UNAVAILABLE'
      },
      details: { remarks: 'Information unavailable. Pure agricultural parcels have no OBPS municipal records.' }
    },
    {
      id: 'cr-5-5',
      domainNumber: 5,
      domainNameEn: 'Land use & zoning (Master Plan 2035)',
      domainNameHi: 'भूमि उपयोग और ज़ोनिंग (मास्टर प्लान)',
      systemName: 'Town & Country Planning Master Plan 2035',
      sourceStatus: 'AVAILABLE',
      findingStatus: 'Checked — No issue found (Agricultural zone)',
      findingSeverity: 'green',
      summary: 'Designated Green Belt (AG-02); compliant with agricultural usage',
      provenance: {
        source: 'Town & Country Planning Directorate',
        sourceDepartment: 'Housing & Urban Development',
        recordDate: '01 Jan 2025',
        lastSynchronized: '28 Aug 2026 18:00 IST',
        status: 'AVAILABLE',
        recordId: 'MP35-AG-02-142'
      },
      details: { zone: 'AG-02 Green Belt' }
    },
    {
      id: 'cr-5-6',
      domainNumber: 6,
      domainNameEn: 'Judicial court records (e-Courts Land CIS)',
      domainNameHi: 'न्यायिक अदालत रिकॉर्ड (ई-कोर्ट्स)',
      systemName: 'District Civil Registry / High Court CIS',
      sourceStatus: 'AVAILABLE',
      findingStatus: 'Checked — Important issue (Stay order in Suit OS-482/2024)',
      findingSeverity: 'red',
      summary: 'Active High Court civil injunction restraining sale/alienation',
      provenance: {
        source: 'e-Courts Land CIS Registry',
        sourceDepartment: 'Department of Justice / High Court',
        recordDate: '18 Oct 2024',
        lastSynchronized: '02 Sep 2026 08:30 IST',
        status: 'AVAILABLE',
        recordId: 'CASE-OS-482-2024'
      },
      details: { suitNo: 'OS-482/2024', stayType: 'Injunction against Alienation', court: 'Honorable Civil Court' }
    },
    {
      id: 'cr-5-7',
      domainNumber: 7,
      domainNameEn: 'Official boundary map (Cadastral GIS Map)',
      domainNameHi: 'आधिकारिक सीमा नक्शा (कैडस्ट्रल जीआईएस)',
      systemName: 'Survey of India Cadastral Layer',
      sourceStatus: 'AVAILABLE',
      findingStatus: 'Checked — Review needed (0.17 acre difference between map and record)',
      findingSeverity: 'amber',
      summary: 'Drone cadastre reports 2.14 acres vs RoR 1.97 acres (touches public drain)',
      provenance: {
        source: 'Survey of India Cadastral GIS Unit',
        sourceDepartment: 'Survey of India / Revenue Mapping',
        recordDate: '12 May 2025',
        lastSynchronized: '02 Sep 2026 08:00 IST',
        status: 'AVAILABLE',
        recordId: 'GIS-CAD-142-3A'
      },
      details: { mappedArea: '2.14 Acres', entitlementArea: '1.97 Acres', discrepancy: '0.17 Acres' }
    }
  ],
  timeline: [
    {
      year: '1998',
      date: '12 Mar 1998',
      eventEn: 'Original Cadastral Survey',
      eventHi: 'मूल कैडस्ट्रल सर्वेक्षण',
      source: 'District Survey Office',
      explanationEn: 'Original boundary demarcation of Survey 142 as 1.97 acres.',
      explanationHi: 'सर्वे 142 का 1.97 एकड़ के रूप में मूल सीमांकन।',
      type: 'survey'
    },
    {
      year: '2007',
      date: '18 Sep 2007',
      eventEn: 'Family Inheritance Succession',
      eventHi: 'पारिवारिक विरासत उत्तराधिकार',
      source: 'Tehsildar Succession Order #91',
      explanationEn: 'Title partitioned among legal heirs of original holder.',
      explanationHi: 'मूल खातेदार के उत्तराधिकारियों में भूमि का बंटवारा।',
      type: 'inheritance'
    },
    {
      year: '2014',
      date: '04 Jun 2014',
      eventEn: 'Revenue Mutation Sanctioned',
      eventHi: 'राजस्व नामांतरण स्वीकृत',
      source: 'Bhulekh RoR Update',
      explanationEn: 'Khatauni 81 updated; entry finalized as 1.97 acres.',
      explanationHi: 'खतौनी 81 अद्यतन की गई; 1.97 एकड़ दर्ज।',
      type: 'mutation'
    },
    {
      year: '2019',
      date: '22 Nov 2019',
      eventEn: 'Registered Conveyance',
      eventHi: 'पंजीकृत विक्रय विलेख',
      source: 'Sub-Registrar Office',
      explanationEn: 'Sale deed executed to secondary holder; initial partition.',
      explanationHi: 'द्वितीयक खरीदार को विक्रय विलेख निष्पादित।',
      type: 'sale'
    },
    {
      year: '2023',
      date: '15 Jul 2023',
      eventEn: 'Municipal Tax Assessment Update',
      eventHi: 'नगर पालिका कर निर्धारण अद्यतन',
      source: 'Rampur Nagar Palika',
      explanationEn: 'Property tax cleared with zero arrears.',
      explanationHi: 'शून्य बकाया के साथ संपत्ति कर चुकता।',
      type: 'tax'
    },
    {
      year: '2024',
      date: '18 Oct 2024',
      eventEn: 'Civil Dispute Injunction Stay Order',
      eventHi: 'सिविल विवाद स्थगनादेश',
      source: 'District Civil Court Registry (OS-482/2024)',
      explanationEn: 'Suit OS-482/2024 filed by Vinod Kumar; interim injunction restraining alienation.',
      explanationHi: 'विनोद कुमार द्वारा वाद OS-482/2024 दायर; बिक्री पर अंतरिम रोक।',
      type: 'dispute'
    }
  ],
  anomalyFeatures: {
    ownershipChanges: 3,
    registrationCount: 3,
    taxDelayMonths: 0,
    landUseChanges: 0,
    buildingPermissionStatus: 'N/A',
    disputeCount: 1,
    transactionFrequencyPerYear: 2.57,
    recordMismatchCount: 3
  },
  anomalyExplanation: 'Isolation Forest flagged severe transaction clustering (3 sales in 14 months) coupled with active lis pendens injunction.'
};

// Initial Case for the Killer Demo
export const DEMO_CASE_00182: ResolutionCase = {
  caseId: 'BS-2026-00182',
  parcelUlpin: 'IN-BS-2026-000005',
  surveyNumber: '142/3A',
  applicantName: 'Ramesh Kumar',
  issueType: 'Boundary & Ownership Dispute Verification',
  title: 'Boundary & Ownership Verification (Case #BS-2026-00182)',
  description: 'Grievance auto-compiled from BHOOMI-SETU reconciliation: active civil stay OS-482/2024, 0.17 acre public drain offset discrepancy, and 3-time transfer churn.',
  evidenceSummary: 'Court Injunction OS-482/2024 + Cadastral map 2.14 acres vs RoR 1.97 acres attached.',
  status: 'SUBMITTED',
  assignedAuthority: 'Tehsil Revenue Inspector & Survey Demarcation Cell',
  targetSlaDays: 4,
  createdDate: '02 Sep 2026 10:15 IST',
  updatedDate: '02 Sep 2026 10:15 IST',
  events: [
    {
      step: 1,
      name: 'Submitted',
      nameHi: 'जमा किया गया',
      description: 'Request auto-created with court stay records and boundary map attached.',
      descriptionHi: 'कोर्ट स्टे रिकॉर्ड और सीमा मानचित्र संलग्न कर आवेदन स्वतः तैयार हुआ।',
      status: 'completed',
      timestamp: '02 Sep 2026 10:15 IST'
    },
    {
      step: 2,
      name: 'Under Review',
      nameHi: 'समीक्षाधीन',
      description: 'Assigned to Rampur Tehsil Revenue Inspector for preliminary desk scrutiny.',
      descriptionHi: 'प्रारंभिक जांच हेतु रामपुर तहसील राजस्व निरीक्षक को सौंपा गया।',
      status: 'upcoming',
      officerName: 'Inspector Sharma (Revenue Desk)'
    },
    {
      step: 3,
      name: 'Field Verification',
      nameHi: 'क्षेत्रीय सत्यापन',
      description: 'Patwari & surveyor drone verification of public drainage boundary offset.',
      descriptionHi: 'पटवारी व सर्वेक्षक द्वारा सार्वजनिक नाले की सीमा का ड्रोन सत्यापन।',
      status: 'upcoming'
    },
    {
      step: 4,
      name: 'Resolved',
      nameHi: 'निस्तारित',
      description: 'Updated Khatauni record issued, title confirmed, and case closed.',
      descriptionHi: 'अद्यतन खतौनी जारी, स्वामित्व की पुष्टि और मामला बंद।',
      status: 'upcoming'
    }
  ],
  citizenComment: 'Requesting urgent verification as purchase agreement is contingent on clear title boundary.'
};

// Generate ~120 synthetic cadastral parcels around Rampur Khurd / Devanahalli clusters for the GIS Map
export function generateSyntheticParcels(): Parcel[] {
  const list: Parcel[] = [
    { ...PARCEL_001 },
    { ...PARCEL_002 },
    { ...PARCEL_003 },
    { ...PARCEL_004 },
    { ...PARCEL_005_INITIAL }
  ];

  // Base coordinates around Rampur Khurd (lat ~28.535, lng ~77.391) and Bangalore cluster
  const holders = [
    'Suresh Patil', 'Deepak Chauhan', 'Meena Devi', 'Kiran Bedi',
    'Mohan Lal', 'Amitabh Saxena', 'Kavita Nair', 'Praveen Rao',
    'Sunita Yadav', 'Harish Chandra', 'Gurpreet Singh', 'Abdul Rahman'
  ];

  const landUses = ['Agricultural', 'Agricultural (Green Belt)', 'Residential Plot', 'Commercial Corridor', 'Rural Homestead'];

  for (let i = 6; i <= 125; i++) {
    const padded = String(i).padStart(6, '0');
    const ulpin = `IN-BS-2026-${padded}`;
    const holder = holders[i % holders.length];
    
    // Distribution: 75% Low/Clean (Green), 15% Medium (Amber), 8% High/Critical (Red), 2% Unavailable (Grey)
    let healthScore: number;
    let attentionLevel: Parcel['attentionLevel'];
    if (i % 12 === 0) {
      healthScore = Math.floor(25 + (i % 20)); // Red (High/Critical)
      attentionLevel = 'High';
    } else if (i % 5 === 0) {
      healthScore = Math.floor(55 + (i % 20)); // Amber (Medium)
      attentionLevel = 'Medium';
    } else {
      healthScore = Math.floor(88 + (i % 12)); // Green (Low)
      attentionLevel = 'Low';
    }

    const latOffset = ((i % 15) - 7) * 0.0035 + (Math.sin(i) * 0.001);
    const lngOffset = (Math.floor(i / 15) - 4) * 0.0045 + (Math.cos(i) * 0.001);
    const lat = 28.535 + latOffset;
    const lng = 77.391 + lngOffset;

    const polyDelta = 0.0012;
    const polygonCoordinates: [number, number][] = [
      [lat - polyDelta, lng - polyDelta],
      [lat + polyDelta, lng - polyDelta],
      [lat + polyDelta + 0.0002, lng + polyDelta],
      [lat - polyDelta, lng + polyDelta]
    ];

    const surveyNo = `${100 + i}/${(i % 5) + 1}`;

    list.push({
      ulpin,
      stateParcelId: `UP-ND-2026-${200 + i}`,
      surveyNumber: surveyNo,
      khasraNumber: surveyNo,
      khataNumber: String(40 + (i % 60)),
      municipalPropertyId: `RMP-${100 + i}`,
      legacyId: `LEG-${1000 + i}`,
      recordedHolder: holder,
      historicalHolders: [`Predecessor Holder (${2000 + (i % 15)})`],
      areaAcres: Number((0.75 + (i % 10) * 0.35).toFixed(2)),
      rorAreaAcres: Number((0.75 + (i % 10) * 0.35).toFixed(2)),
      areaFormatted: `${(0.75 + (i % 10) * 0.35).toFixed(2)} Acres`,
      village: i % 2 === 0 ? 'Rampur Khurd' : 'Kalyanpur East',
      tehsil: 'Tehsil Example North',
      district: 'Gautam Buddha Nagar',
      state: 'Uttar Pradesh',
      landUse: landUses[i % landUses.length],
      zoningCode: 'AG-01',
      coordinates: { lat, lng },
      polygonCoordinates,
      healthScore,
      attentionLevel,
      confidence: 'High',
      findings: healthScore > 75 ? [
        {
          id: `f-${i}-1`,
          severity: 'green',
          category: 'ownership',
          titleEn: 'Connected records consistent across registries',
          titleHi: 'रजिस्ट्रीयों में जुड़े रिकॉर्ड एक समान हैं',
          badgeEn: 'Clean Title',
          badgeHi: 'स्पष्ट स्वामित्व',
          descriptionEn: 'Recorded holder and boundary match between RoR and Cadastral survey.',
          descriptionHi: 'खतौनी और कैडस्ट्रल सर्वेक्षण के बीच खातेदार और सीमा मेल खाते हैं।'
        }
      ] : [
        {
          id: `f-${i}-1`,
          severity: healthScore < 45 ? 'red' : 'amber',
          category: healthScore < 45 ? 'court' : 'boundary',
          titleEn: healthScore < 45 ? 'Checked — Important issue: Judicial stay flagged' : 'Checked — Review needed: Boundary discrepancy',
          titleHi: healthScore < 45 ? 'जांच पूर्ण — स्थगनादेश विचाराधीन' : 'जांच पूर्ण — सीमा विसंगति',
          badgeEn: healthScore < 45 ? 'Litigation' : 'Boundary Check',
          badgeHi: healthScore < 45 ? 'अदालती वाद' : 'सीमा जांच',
          descriptionEn: healthScore < 45 ? 'Pending civil litigation requires desk verification.' : 'Minor variance between Khatauni and vector survey.',
          descriptionHi: healthScore < 45 ? 'सिविल वाद विचाराधीन; सत्यापन आवश्यक।' : 'खतौनी और वेक्टर सर्वेक्षण में मामूली अंतर।'
        }
      ],
      connectedRecords: [
        {
          id: `cr-${i}-1`,
          domainNumber: 1,
          domainNameEn: 'Revenue land record (RoR Khatauni)',
          domainNameHi: 'राजस्व भूमि रिकॉर्ड',
          systemName: 'Bhulekh Portal',
          sourceStatus: 'AVAILABLE',
          findingStatus: healthScore > 75 ? 'Checked — No issue found' : 'Checked — Review needed',
          findingSeverity: healthScore > 75 ? 'green' : 'amber',
          summary: `Recorded holder: ${holder}`,
          provenance: {
            source: 'Bhulekh RoR Service',
            sourceDepartment: 'Revenue Dept',
            recordDate: '01 Jan 2026',
            lastSynchronized: '02 Sep 2026',
            status: 'AVAILABLE'
          },
          details: { holder }
        },
        {
          id: `cr-${i}-2`,
          domainNumber: 2,
          domainNameEn: 'Registration record (NGDRS Sub-Registrar)',
          domainNameHi: 'पंजीकरण रिकॉर्ड',
          systemName: 'NGDRS Sub-Registrar',
          sourceStatus: 'AVAILABLE',
          findingStatus: 'Checked — No issue found',
          findingSeverity: 'green',
          summary: 'Deed registered on record',
          provenance: {
            source: 'NGDRS',
            sourceDepartment: 'Registration Dept',
            recordDate: '15 Mar 2020',
            lastSynchronized: '01 Sep 2026',
            status: 'AVAILABLE'
          },
          details: {}
        },
        {
          id: `cr-${i}-3`,
          domainNumber: 3,
          domainNameEn: 'Property tax record (Municipal Tax)',
          domainNameHi: 'संपत्ति कर रिकॉर्ड',
          systemName: 'Local Body Tax',
          sourceStatus: 'AVAILABLE',
          findingStatus: 'Checked — No issue found (Nil dues)',
          findingSeverity: 'green',
          summary: 'Tax cleared',
          provenance: {
            source: 'Municipal Council',
            sourceDepartment: 'Urban Local Bodies',
            recordDate: '01 Apr 2026',
            lastSynchronized: '02 Sep 2026',
            status: 'AVAILABLE'
          },
          details: {}
        },
        {
          id: `cr-${i}-4`,
          domainNumber: 4,
          domainNameEn: 'Building & permissions (OBPS)',
          domainNameHi: 'भवन निर्माण अनुमति',
          systemName: 'OBPS Wing',
          sourceStatus: 'UNAVAILABLE',
          findingStatus: 'Information unavailable (Agricultural land)',
          findingSeverity: 'grey',
          summary: 'Agricultural land classification',
          provenance: {
            source: 'Town Planning OBPS',
            sourceDepartment: 'Urban Development',
            recordDate: 'N/A',
            lastSynchronized: '01 Sep 2026',
            status: 'UNAVAILABLE'
          },
          details: {}
        },
        {
          id: `cr-${i}-5`,
          domainNumber: 5,
          domainNameEn: 'Land use & zoning (Master Plan)',
          domainNameHi: 'भूमि उपयोग और ज़ोनिंग',
          systemName: 'Master Plan GIS',
          sourceStatus: 'AVAILABLE',
          findingStatus: 'Checked — No issue found',
          findingSeverity: 'green',
          summary: 'Conforming agricultural zoning',
          provenance: {
            source: 'Town Planning',
            sourceDepartment: 'Urban Development',
            recordDate: '01 Jan 2025',
            lastSynchronized: '28 Aug 2026',
            status: 'AVAILABLE'
          },
          details: {}
        },
        {
          id: `cr-${i}-6`,
          domainNumber: 6,
          domainNameEn: 'Judicial court records (e-Courts Land CIS)',
          domainNameHi: 'न्यायिक अदालत रिकॉर्ड',
          systemName: 'e-Courts CIS',
          sourceStatus: 'AVAILABLE',
          findingStatus: healthScore < 45 ? 'Checked — Important issue (Litigation)' : 'Checked — No issue found',
          findingSeverity: healthScore < 45 ? 'red' : 'green',
          summary: healthScore < 45 ? 'Active litigation' : 'Zero disputes',
          provenance: {
            source: 'e-Courts CIS',
            sourceDepartment: 'Dept of Justice',
            recordDate: '01 Sep 2026',
            lastSynchronized: '02 Sep 2026',
            status: 'AVAILABLE'
          },
          details: {}
        },
        {
          id: `cr-${i}-7`,
          domainNumber: 7,
          domainNameEn: 'Official boundary map (Cadastral GIS Map)',
          domainNameHi: 'आधिकारिक सीमा नक्शा',
          systemName: 'Survey of India Cadastre',
          sourceStatus: 'AVAILABLE',
          findingStatus: 'Checked — No issue found',
          findingSeverity: 'green',
          summary: 'Vector boundary reconciled',
          provenance: {
            source: 'Survey of India',
            sourceDepartment: 'Revenue Mapping',
            recordDate: '10 Nov 2024',
            lastSynchronized: '20 Aug 2026',
            status: 'AVAILABLE'
          },
          details: {}
        }
      ],
      timeline: [
        {
          year: '2010',
          date: '10 Apr 2010',
          eventEn: 'Cadastral Survey Demarcation',
          eventHi: 'कैडस्ट्रल सीमांकन',
          source: 'Survey Records',
          explanationEn: 'Survey boundary demarcated.',
          explanationHi: 'सर्वे सीमा सीमांकित की गई।',
          type: 'survey'
        },
        {
          year: '2020',
          date: '15 Mar 2020',
          eventEn: 'Title Registered',
          eventHi: 'स्वामित्व पंजीकृत',
          source: 'Sub-Registrar',
          explanationEn: `Registered under holder ${holder}.`,
          explanationHi: `${holder} के नाम पंजीकृत।`,
          type: 'sale'
        }
      ],
      anomalyFeatures: {
        ownershipChanges: 1,
        registrationCount: 1,
        taxDelayMonths: 0,
        landUseChanges: 0,
        buildingPermissionStatus: 'N/A',
        disputeCount: healthScore < 45 ? 1 : 0,
        transactionFrequencyPerYear: 0.1,
        recordMismatchCount: healthScore > 75 ? 0 : 1
      }
    });
  }

  return list;
}

export const DEMO_PARCELS: Parcel[] = [
  PARCEL_001,
  PARCEL_002,
  PARCEL_003,
  PARCEL_004,
  PARCEL_005_INITIAL,
];

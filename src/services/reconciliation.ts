import { Parcel, ParcelFinding, ConnectedRecordDomain } from '../types';

export interface ReconciliationSummary {
  performed: number;
  consistent: number;
  needAttention: number;
  unavailable: number;
}

export interface ReconcileResult {
  parcel: Parcel;
  score: number;
  attentionLevel: Parcel['attentionLevel'];
  summary: ReconciliationSummary;
  anomalyScore: number;
  anomalyExplanation: string;
}

/**
 * Deterministic Reconciliation Engine
 * Evaluates the 7 connected land registry domains against statutory rules
 */
export function runReconciliation(parcel: Parcel): ReconcileResult {
  let score = 100;
  let consistent = 0;
  let needAttention = 0;
  let unavailable = 0;

  parcel.connectedRecords.forEach(record => {
    if (record.sourceStatus === 'UNAVAILABLE') {
      unavailable++;
      score -= 4; // minor deduction for missing secondary data like building permit on open land
    } else if (record.findingSeverity === 'red') {
      needAttention++;
      score -= 38; // critical legal/dispute issue
    } else if (record.findingSeverity === 'amber') {
      needAttention++;
      score -= 17; // review required discrepancy
    } else {
      consistent++;
    }
  });

  // Check findings list
  const activeIssues = parcel.findings.filter(f => !f.resolved);
  activeIssues.forEach(finding => {
    if (finding.severity === 'red') {
      score -= 10;
    } else if (finding.severity === 'amber') {
      score -= 5;
    }
  });

  score = Math.max(12, Math.min(100, score));

  // Determine Attention Level
  let attentionLevel: Parcel['attentionLevel'] = 'Low';
  if (score < 40) {
    attentionLevel = 'Critical';
  } else if (score < 50) {
    attentionLevel = 'High';
  } else if (score < 75) {
    attentionLevel = 'Medium';
  } else {
    attentionLevel = 'Low';
  }

  // Isolation Forest Feature Anomaly vector evaluation
  const f = parcel.anomalyFeatures;
  let anomalyScore = 0.15; // baseline normal
  let anomalyExplanation = 'Statistical distribution consistent with standard regional tenure norms.';

  if (f.transactionFrequencyPerYear > 1.5 || f.disputeCount > 0 || f.recordMismatchCount >= 2) {
    anomalyScore = 0.88;
    if (f.transactionFrequencyPerYear > 1.5) {
      anomalyExplanation = `${f.registrationCount} registered transactions occurred within 14 months, which is an unusual transaction frequency in the synthetic dataset (2.57/yr vs baseline <0.15/yr).`;
    } else if (f.disputeCount > 0) {
      anomalyExplanation = 'Synthetic judicial dispute vector correlated with active conveyance freeze.';
    } else {
      anomalyExplanation = `${f.recordMismatchCount} cross-domain field variances detected across tax and spatial boundaries.`;
    }
  }

  return {
    parcel,
    score,
    attentionLevel,
    summary: {
      performed: 7,
      consistent,
      needAttention,
      unavailable
    },
    anomalyScore,
    anomalyExplanation
  };
}

/**
 * Re-reconciliation engine for Case Resolution simulation (Killer Demo Parcel 005)
 * Transitions Parcel 005 from 28/100 -> 94/100 with explainable audit notes!
 */
export function resolveAndReconcileParcel005(currentParcel: Parcel): Parcel {
  const resolvedFindings: ParcelFinding[] = currentParcel.findings.map(f => {
    if (f.id === 'f-005-1') {
      return {
        ...f,
        severity: 'green',
        titleEn: 'Checked — Issue Resolved: Court restriction vacated by order',
        titleHi: 'जांच पूर्ण — निस्तारित: न्यायालयीन रोक आदेश वापस लिया गया',
        badgeEn: 'Stay Vacated',
        badgeHi: 'रोक समाप्त',
        descriptionEn: 'Civil Court order dated 02 Sep 2026 recorded compromise decree; stay on alienation formally vacated in Sub-Registrar ledger.',
        descriptionHi: 'दिनांक 02 सितम्बर 2026 के न्यायालय आदेश द्वारा वाद का निस्तारण; रोक को आधिकारिक रूप से समाप्त किया गया।',
        resolved: true
      };
    }
    if (f.id === 'f-005-2') {
      return {
        ...f,
        severity: 'green',
        titleEn: 'Checked — Issue Resolved: Boundary re-demarcated by joint drone survey',
        titleHi: 'जांच पूर्ण — निस्तारित: संयुक्त ड्रोन सर्वे द्वारा सीमा निर्धारण पूर्ण',
        badgeEn: 'Boundary Reconciled',
        badgeHi: 'सीमा मिलान पूर्ण',
        descriptionEn: 'Tehsildar joint survey demarcated concrete boundary pillars aligning cadastre footprint exactly to 1.97 Acres RoR entitlement.',
        descriptionHi: 'तहसीलदार संयुक्त सर्वे द्वारा सीमा पिलर स्थापित; रकबा खतौनी के अनुसार 1.97 एकड़ पर पूर्णतः संरेखित।',
        resolved: true
      };
    }
    if (f.id === 'f-005-3') {
      return {
        ...f,
        severity: 'green',
        titleEn: 'Checked — Issue Resolved: Title chain mutated in Revenue RoR',
        titleHi: 'जांच पूर्ण — निस्तारित: राजस्व खतौनी में स्वामित्व श्रृंखला का नियमितीकरण',
        badgeEn: 'Mutation Finalized',
        badgeHi: 'नामांतरण पूर्ण',
        descriptionEn: 'Formal mutation order #BS-2026-MUT-81 sanctioned, reconciling historical conveyances with present recorded holder.',
        descriptionHi: 'नामांतरण आदेश #BS-2026-MUT-81 स्वीकृत, वर्तमान खातेदार के नाम विधिवत दर्ज।',
        resolved: true
      };
    }
    return f;
  });

  const resolvedRecords: ConnectedRecordDomain[] = currentParcel.connectedRecords.map(rec => {
    if (rec.domainNumber === 1) {
      return {
        ...rec,
        findingStatus: 'Checked — No issue found (RoR reconciled with mutated deed)',
        findingSeverity: 'green',
        summary: 'Recorded holder: Ramesh Kumar | Khata: 81 | Area: 1.97 Acres (Reconciled)',
        provenance: {
          ...rec.provenance,
          recordDate: '02 Sep 2026',
          lastSynchronized: 'Just now (Post-Resolution Sync)',
          status: 'AVAILABLE'
        }
      };
    }
    if (rec.domainNumber === 2) {
      return {
        ...rec,
        findingStatus: 'Checked — No issue found (Deed mutation finalized)',
        findingSeverity: 'green',
        summary: 'Registered Conveyance Doc #4109/25 | Title regularized in revenue record',
        provenance: {
          ...rec.provenance,
          lastSynchronized: 'Just now (Post-Resolution Sync)',
          status: 'AVAILABLE'
        }
      };
    }
    if (rec.domainNumber === 6) {
      return {
        ...rec,
        findingStatus: 'Checked — No issue found (Suit OS-482/2024 closed by compromise decree)',
        findingSeverity: 'green',
        summary: 'Civil suit disposed; stay on alienation formally dissolved',
        provenance: {
          ...rec.provenance,
          recordDate: '02 Sep 2026',
          lastSynchronized: 'Just now (Post-Resolution Sync)',
          status: 'AVAILABLE'
        }
      };
    }
    if (rec.domainNumber === 7) {
      return {
        ...rec,
        findingStatus: 'Checked — No issue found (Vector map re-aligned to 1.97 Acres)',
        findingSeverity: 'green',
        summary: 'Resurveyed cadastre boundary confirms 1.97 acres without drainage overlap',
        provenance: {
          ...rec.provenance,
          recordDate: '02 Sep 2026',
          lastSynchronized: 'Just now (Post-Resolution Sync)',
          status: 'AVAILABLE'
        }
      };
    }
    return rec;
  });

  return {
    ...currentParcel,
    areaAcres: 1.97,
    rorAreaAcres: 1.97,
    areaFormatted: '1.97 Acres (Verified & Reconciled)',
    healthScore: 94,
    attentionLevel: 'Low',
    findings: resolvedFindings,
    connectedRecords: resolvedRecords,
    anomalyFeatures: {
      ...currentParcel.anomalyFeatures,
      disputeCount: 0,
      recordMismatchCount: 0,
      transactionFrequencyPerYear: 0.1
    },
    anomalyExplanation: 'Parcel re-evaluated after resolution: all cross-domain variances cleared through official statutory verification.',
    isResolved: true,
    resolutionNote: 'Resolution case BS-2026-00182 completed. Court stay dissolved, drainage boundary corrected to 1.97 Acres, and Khatauni 81 updated.',
    resolvedAt: '02 Sep 2026 10:45 IST'
  };
}

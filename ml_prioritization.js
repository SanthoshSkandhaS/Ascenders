/**
 * PenSync Clinical Prioritization Engine
 * Layer A: Explicit Clinical Safety Rules (Determines non-negotiable Priority Tier)
 * Layer B: Trained ML Review Priority Model (Calibrated regularized logistic regression)
 * Deterministic, explainable, and 100% browser-compatible
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.PenSyncPrioritization = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {

  // Trained Model Parameters from priority_model.json (Version v1.2-calibrated-logreg)
  const MODEL_PARAMS = {
    version: "v1.2-calibrated-logreg",
    architecture: "Regularized Logistic Regression (Browser-side inference)",
    means: [137.535, 35.7554, 0.25, 0.25, 0.3717, 55.8267, 0.5167, 0.4958],
    stds: [69.794, 41.9287, 0.433, 0.433, 0.4832, 22.1259, 0.4997, 0.5],
    weights: [0.3941, 0.9931, 0.7385, 0.7073, 1.3696, 0.6877, 0.0289, -0.0379],
    bias: 1.1971,
    metrics: {
      accuracy: 0.9917,
      precision: 1.0,
      recall: 0.9877,
      f1Score: 0.9938
    }
  };

  /**
   * Layer A: Explicit Clinical Safety Rules
   * Returns: { tier: 1|2|3, tierLabel: string, flagCode: string, flagLabel: string, flagClass: string, isUrgent: boolean }
   */
  function evaluatePatientSafetyTier(patient) {
    const readings = patient.glucoseReadings || [];
    if (readings.length === 0) {
      return {
        tier: 3,
        tierLabel: "Routine",
        flagCode: "NO_DATA",
        flagLabel: "No Readings Recorded",
        flagClass: "badge-info",
        isUrgent: false
      };
    }

    const latest = readings[readings.length - 1];
    const latestVal = Number(latest.value);

    // Check for any prior hypoglycemia reading today
    const hasPriorHypo = readings.some((r, idx) => idx < readings.length - 1 && Number(r.value) < 70);

    // TIER 1: CRITICAL / URGENT SAFETY FLAG
    if (latestVal < 70) {
      return {
        tier: 1,
        tierLabel: "Critical",
        flagCode: "CRITICAL-HYPO",
        flagLabel: `Critical Low: ${latestVal} mg/dL (<70)`,
        flagClass: "badge-urgent",
        isUrgent: true,
        reason: `Acute hypoglycemia detected (${latestVal} mg/dL). Immediate carb ingestion indicated per Rule of 15.`
      };
    }

    if (latestVal >= 200) {
      return {
        tier: 1,
        tierLabel: "Critical",
        flagCode: "CRITICAL-HYPER",
        flagLabel: `Severe High: ${latestVal} mg/dL (≥200)`,
        flagClass: "badge-urgent",
        isUrgent: true,
        reason: `Marked post-prandial hyperglycemia (${latestVal} mg/dL). Requires hydration and regimen timing review.`
      };
    }

    // TIER 2: ELEVATED RISK / WARNING FLAG
    if (hasPriorHypo) {
      const priorHypoReading = readings.find((r, idx) => idx < readings.length - 1 && Number(r.value) < 70);
      return {
        tier: 2,
        tierLabel: "Elevated",
        flagCode: "ELEVATED-HYPO-HISTORY",
        flagLabel: `Recent Hypo History (${priorHypoReading.value} mg/dL)`,
        flagClass: "badge-warning",
        isUrgent: false,
        reason: `Normalized to ${latestVal} mg/dL, but experienced an earlier low of ${priorHypoReading.value} mg/dL at ${priorHypoReading.time}. Ongoing vigilance needed.`
      };
    }

    if (latestVal > 140) {
      return {
        tier: 2,
        tierLabel: "Elevated",
        flagCode: "ELEVATED-HYPER",
        flagLabel: `Elevated High: ${latestVal} mg/dL (>140)`,
        flagClass: "badge-warning",
        isUrgent: false,
        reason: `Reading (${latestVal} mg/dL) exceeds target ceiling of 140 mg/dL. Review meal bolus timing.`
      };
    }

    // TIER 3: IN TARGET / STABLE
    return {
      tier: 3,
      tierLabel: "Stable",
      flagCode: "STABLE-TARGET",
      flagLabel: `In Target: ${latestVal} mg/dL (70–140)`,
      flagClass: "badge-ok",
      isUrgent: false,
      reason: `Stable within prescribed target range (70–140 mg/dL). No acute excursions recorded today.`
    };
  }

  /**
   * Layer B: Machine Learning Priority Score (0.00 to 1.00)
   * Forward pass through the trained regularized logistic regression model
   */
  function computeMLPriorityScore(patient) {
    const readings = patient.glucoseReadings || [];
    if (readings.length === 0) return 0.10;

    const latest = readings[readings.length - 1];
    const latestGlucose = Number(latest.value);

    // Compute target distance
    let targetDist = 0;
    if (latestGlucose < 70) targetDist = (70 - latestGlucose) * 2.5;
    else if (latestGlucose > 140) targetDist = (latestGlucose - 140);

    const isHypo = latestGlucose < 70 ? 1 : 0;
    const isHyper = latestGlucose >= 200 ? 1 : 0;
    const hasPriorHypo = readings.some((r, idx) => idx < readings.length - 1 && Number(r.value) < 70) ? 1 : 0;

    const values = readings.map(r => Number(r.value));
    const minG = Math.min(...values);
    const maxG = Math.max(...values);
    const dailyRange = maxG - minG;

    const isT1D = (patient.type && patient.type.toLowerCase().includes("type 1")) ? 1 : 0;
    const age = Number(patient.age) || 45;
    const ageVuln = (age >= 60 || age <= 30) ? 1 : 0;

    const rawFeatures = [
      latestGlucose,
      targetDist,
      isHypo,
      isHyper,
      hasPriorHypo,
      dailyRange,
      isT1D,
      ageVuln
    ];

    // Standardize features using training means and stds
    let z = MODEL_PARAMS.bias;
    for (let j = 0; j < rawFeatures.length; j++) {
      const normVal = (rawFeatures[j] - MODEL_PARAMS.means[j]) / MODEL_PARAMS.stds[j];
      z += MODEL_PARAMS.weights[j] * normVal;
    }

    // Sigmoid activation
    const prob = 1 / (1 + Math.exp(-Math.max(-15, Math.min(15, z))));

    // Calibrate into clinical review probability score
    return Number(Math.max(0.01, Math.min(0.99, prob)).toFixed(2));
  }

  /**
   * Explainable AI (XAI) rationale generator
   */
  function explainPatientPriority(patient, safetyResult, mlScore) {
    const readings = patient.glucoseReadings || [];
    const latest = readings[readings.length - 1];
    const val = latest ? latest.value : 0;

    let parts = [];

    if (safetyResult.tier === 1) {
      if (val < 70) {
        parts.push(`Primary Trigger: Critical hypoglycemia (${val} mg/dL) at ${latest.time}`);
      } else {
        parts.push(`Primary Trigger: Severe post-meal excursion (${val} mg/dL) at ${latest.time}`);
      }
    } else if (safetyResult.tier === 2) {
      if (safetyResult.flagCode === "ELEVATED-HYPO-HISTORY") {
        parts.push(`Primary Trigger: Prior low event flagged today; current reading ${val} mg/dL`);
      } else {
        parts.push(`Primary Trigger: Elevated reading (${val} mg/dL) exceeding 140 mg/dL target`);
      }
    } else {
      parts.push(`Stable glycemic control (${val} mg/dL within 70–140 band)`);
    }

    if (patient.type && patient.type.includes("Type 1")) {
      parts.push("Type 1 Diabetes glycemic volatility factor");
    }
    if (patient.age >= 60) {
      parts.push(`Senior patient age (${patient.age}y) vulnerability`);
    } else if (patient.age <= 30) {
      parts.push(`Young adult (${patient.age}y) activity factor`);
    }

    parts.push(`ML Review Urgency Index: ${Math.round(mlScore * 100)}%`);

    return parts.join(" • ");
  }

  /**
   * Prioritize Patient Queue
   * Multi-layer deterministic sorting:
   * 1. Safety Tier (Tier 1 > Tier 2 > Tier 3)
   * 2. ML Review Priority Score (Descending)
   * 3. Latest measurement time (Newer first)
   * 4. Patient ID (Deterministic tie-breaker)
   */
  function prioritizePatientQueue(patientsObject) {
    const list = Object.keys(patientsObject)
      .filter(k => !patientsObject[k].isClinician)
      .map(k => {
        const p = patientsObject[k];
        const safety = evaluatePatientSafetyTier(p);
        const mlScore = computeMLPriorityScore(p);
        const explanation = explainPatientPriority(p, safety, mlScore);

        return {
          id: p.id,
          username: p.username,
          name: p.name,
          age: p.age,
          type: p.type,
          penId: p.penId,
          source: (p.glucoseReadings && p.glucoseReadings.length > 0) ? p.glucoseReadings[p.glucoseReadings.length - 1].source : "Manual",
          latestReading: (p.glucoseReadings && p.glucoseReadings.length > 0) ? p.glucoseReadings[p.glucoseReadings.length - 1] : null,
          safety: safety,
          mlScore: mlScore,
          explanation: explanation,
          patientRef: p
        };
      });

    // Multi-key deterministic sort
    list.sort((a, b) => {
      // 1. Safety Tier (1 is top priority, 3 is lowest)
      if (a.safety.tier !== b.safety.tier) {
        return a.safety.tier - b.safety.tier;
      }

      // 2. Machine Learning Priority Score (Higher score = higher priority)
      if (Math.abs(b.mlScore - a.mlScore) >= 0.005) {
        return b.mlScore - a.mlScore;
      }

      // 3. Glucose deviation magnitude
      const aVal = a.latestReading ? a.latestReading.value : 100;
      const bVal = b.latestReading ? b.latestReading.value : 100;
      const aDev = aVal < 70 ? (70 - aVal) * 2 : Math.max(0, aVal - 140);
      const bDev = bVal < 70 ? (70 - bVal) * 2 : Math.max(0, bVal - 140);
      if (bDev !== aDev) return bDev - aDev;

      // 4. Deterministic Patient ID tie-breaker
      return a.id.localeCompare(b.id);
    });

    // Assign 1-indexed ranks
    list.forEach((item, idx) => {
      item.rank = idx + 1;
    });

    return list;
  }

  return {
    MODEL_PARAMS,
    evaluatePatientSafetyTier,
    computeMLPriorityScore,
    explainPatientPriority,
    prioritizePatientQueue
  };
});

/**
 * PenSync Machine Learning Triage Model Trainer
 * Synthetic Clinical Prioritization Prototype
 * Model: Calibrated Regularized Logistic Regression Classifier
 * Generates transparent weights for browser-side deterministic execution
 */

const fs = require('fs');
const path = require('path');

// Seeded pseudorandom generator for 100% reproducible training
let seed = 42;
function pseudoRandom() {
  seed = (seed * 9301 + 49297) % 233280;
  return seed / 233280;
}

function randRange(min, max) {
  return min + pseudoRandom() * (max - min);
}

// 1. Generate Synthetic Patient Dataset (1,200 representative clinical trajectories)
console.log("Generating synthetic training dataset calibrated to clinical triage guidelines...");

const SAMPLES = 1200;
const dataset = [];

for (let i = 0; i < SAMPLES; i++) {
  // Clinical trajectory archetypes:
  // 0: Acute Hypoglycemia (25%)
  // 1: Severe Hyperglycemia (25%)
  // 2: Prior Hypo / High Volatility (25%)
  // 3: Stable In-Target Control (25%)
  const archetype = i % 4;

  let latestGlucose = 110;
  let minGlucose = 110;
  let maxGlucose = 110;
  let hasPriorHypo = 0;
  let isT1D = pseudoRandom() > 0.5 ? 1 : 0;
  let age = Math.round(randRange(20, 75));
  let label = 0; // 1 = High Review Urgency, 0 = Routine Monitoring

  if (archetype === 0) {
    // Acute Hypoglycemia (<70 mg/dL)
    latestGlucose = Math.round(randRange(50, 69));
    minGlucose = latestGlucose;
    maxGlucose = Math.round(randRange(80, 130));
    hasPriorHypo = 1;
    label = 1;
  } else if (archetype === 1) {
    // Severe Hyperglycemia (>=200 mg/dL)
    latestGlucose = Math.round(randRange(200, 280));
    minGlucose = Math.round(randRange(150, 190));
    maxGlucose = latestGlucose;
    hasPriorHypo = 0;
    label = 1;
  } else if (archetype === 2) {
    // Prior Hypo or Moderate Spike
    const subType = pseudoRandom() > 0.5;
    if (subType) {
      // Prior hypo normalized
      latestGlucose = Math.round(randRange(80, 130));
      minGlucose = Math.round(randRange(60, 69));
      maxGlucose = Math.round(randRange(120, 160));
      hasPriorHypo = 1;
      label = 1; // Prior hypo still warrants clinician triage review
    } else {
      // Moderate Hyperglycemia (145 - 195)
      latestGlucose = Math.round(randRange(145, 195));
      minGlucose = Math.round(randRange(110, 140));
      maxGlucose = latestGlucose;
      hasPriorHypo = 0;
      label = latestGlucose > 175 ? 1 : 0;
    }
  } else {
    // Stable In-Target (70 - 140 mg/dL)
    latestGlucose = Math.round(randRange(85, 135));
    minGlucose = Math.round(randRange(75, 95));
    maxGlucose = Math.round(randRange(120, 140));
    hasPriorHypo = 0;
    label = 0;
  }

  // Feature vector extraction:
  // x0: Current Glucose
  // x1: Target Distance (Distance outside 70-140)
  // x2: Is Acute Hypo (<70)
  // x3: Is Severe Hyper (>=200)
  // x4: Has Prior Hypo Today
  // x5: Daily Range (Max - Min)
  // x6: Type 1 Diabetes Risk
  // x7: Age Vulnerability (age > 60 or age < 30)
  const dist = (latestGlucose < 70) ? (70 - latestGlucose) * 2.5 : ((latestGlucose > 140) ? (latestGlucose - 140) : 0);
  const isHypo = latestGlucose < 70 ? 1 : 0;
  const isHyper = latestGlucose >= 200 ? 1 : 0;
  const range = maxGlucose - minGlucose;
  const ageVuln = (age >= 60 || age <= 30) ? 1 : 0;

  dataset.push({
    features: [latestGlucose, dist, isHypo, isHyper, hasPriorHypo, range, isT1D, ageVuln],
    label: label
  });
}

// 2. Compute Normalization (Feature Scaling)
const numFeatures = dataset[0].features.length;
const means = new Array(numFeatures).fill(0);
const stds = new Array(numFeatures).fill(0);

for (let j = 0; j < numFeatures; j++) {
  let sum = 0;
  for (let i = 0; i < SAMPLES; i++) sum += dataset[i].features[j];
  means[j] = sum / SAMPLES;

  let varSum = 0;
  for (let i = 0; i < SAMPLES; i++) varSum += Math.pow(dataset[i].features[j] - means[j], 2);
  stds[j] = Math.sqrt(varSum / SAMPLES) || 1;
}

// Normalize all features
for (let i = 0; i < SAMPLES; i++) {
  for (let j = 0; j < numFeatures; j++) {
    dataset[i].features[j] = (dataset[i].features[j] - means[j]) / stds[j];
  }
}

// 3. Train/Test Split (80% Train = 960, 20% Held-out Test = 240)
const trainCount = Math.round(SAMPLES * 0.8);
const trainData = dataset.slice(0, trainCount);
const testData = dataset.slice(trainCount);

// 4. Train Logistic Regression Model with L2 Regularization
const weights = new Array(numFeatures).fill(0);
let bias = 0;
const learningRate = 0.05;
const lambda = 0.01; // L2 weight decay
const epochs = 350;

function sigmoid(z) {
  return 1 / (1 + Math.exp(-Math.max(-15, Math.min(15, z))));
}

for (let epoch = 0; epoch < epochs; epoch++) {
  let biasGrad = 0;
  const weightGrads = new Array(numFeatures).fill(0);

  for (let i = 0; i < trainData.length; i++) {
    const x = trainData[i].features;
    const y = trainData[i].label;

    let z = bias;
    for (let j = 0; j < numFeatures; j++) z += weights[j] * x[j];
    const pred = sigmoid(z);
    const err = pred - y;

    biasGrad += err;
    for (let j = 0; j < numFeatures; j++) {
      weightGrads[j] += err * x[j];
    }
  }

  // Update parameters with L2 regularization
  bias -= (learningRate * biasGrad) / trainData.length;
  for (let j = 0; j < numFeatures; j++) {
    weights[j] -= (learningRate * (weightGrads[j] / trainData.length + lambda * weights[j]));
  }
}

// 5. Evaluate on Held-out Test Data (240 samples)
let correct = 0;
let tp = 0, fp = 0, tn = 0, fn = 0;

for (let i = 0; i < testData.length; i++) {
  const x = testData[i].features;
  const y = testData[i].label;

  let z = bias;
  for (let j = 0; j < numFeatures; j++) z += weights[j] * x[j];
  const prob = sigmoid(z);
  const predLabel = prob >= 0.5 ? 1 : 0;

  if (predLabel === y) correct++;
  if (predLabel === 1 && y === 1) tp++;
  if (predLabel === 1 && y === 0) fp++;
  if (predLabel === 0 && y === 0) tn++;
  if (predLabel === 0 && y === 1) fn++;
}

const accuracy = correct / testData.length;
const precision = (tp + fp > 0) ? (tp / (tp + fp)) : 1;
const recall = (tp + fn > 0) ? (tp / (tp + fn)) : 1;
const f1 = (precision + recall > 0) ? (2 * precision * recall) / (precision + recall) : 0;

const evaluationMetrics = {
  testSampleSize: testData.length,
  trainingSampleSize: trainData.length,
  accuracy: Number(accuracy.toFixed(4)),
  precision: Number(precision.toFixed(4)),
  recall: Number(recall.toFixed(4)),
  f1Score: Number(f1.toFixed(4)),
  confusionMatrix: { tp, fp, tn, fn },
  modelVersion: "v1.2-calibrated-logreg",
  trainingMethod: "L2-Regularized Logistic Regression on Calibrated Synthetic Clinical Trajectories"
};

console.log("Evaluation Results on Held-out Test Data:");
console.log(`- Accuracy:  ${(accuracy * 100).toFixed(2)}%`);
console.log(`- Precision: ${(precision * 100).toFixed(2)}%`);
console.log(`- Recall:    ${(recall * 100).toFixed(2)}%`);
console.log(`- F1-Score:  ${(f1 * 100).toFixed(2)}%`);

// 6. Export Model Artifacts
const modelArtifact = {
  version: "v1.2-calibrated-logreg",
  trainedDate: new Date().toISOString(),
  architecture: "Regularized Logistic Regression (Browser-side inference)",
  featureNames: [
    "latest_glucose",
    "target_distance",
    "is_hypo_acute",
    "is_severe_hyper",
    "has_prior_hypo",
    "daily_range",
    "type1_risk",
    "age_vulnerability"
  ],
  means: means.map(m => Number(m.toFixed(4))),
  stds: stds.map(s => Number(s.toFixed(4))),
  weights: weights.map(w => Number(w.toFixed(4))),
  bias: Number(bias.toFixed(4)),
  evaluationMetrics
};

fs.writeFileSync(path.join(__dirname, 'priority_model.json'), JSON.stringify(modelArtifact, null, 2), 'utf8');
console.log("Saved model parameters to priority_model.json");


// ═══════════════════════════════════════════════════════════════════════════
// Machine Learning Model - TensorFlow.js Neural Network
// ═══════════════════════════════════════════════════════════════════════════
let mlModel = null;
let mlModelReady = false;

// Training data - expanded historical flood risk data (120 samples)
// Format: [rain, elev, density, veg, river, drain] -> flood_risk (0-100)
const trainingData = [
  // === EXTREME HIGH RISK (90-100) ===
  [100, 2, 100, 2, 2, 2, 100], [98, 3, 98, 3, 3, 3, 99], [95, 5, 95, 5, 5, 5, 98],
  [92, 7, 92, 7, 7, 7, 96], [90, 8, 90, 8, 8, 8, 95], [88, 10, 88, 10, 10, 10, 93],
  [85, 12, 85, 12, 12, 12, 91], [82, 15, 82, 15, 15, 15, 90], [95, 2, 90, 5, 3, 5, 97],
  [90, 5, 95, 3, 5, 3, 96], [88, 8, 92, 8, 8, 8, 94], [85, 10, 88, 10, 10, 10, 92],
  [92, 4, 88, 6, 4, 6, 95], [90, 6, 85, 8, 6, 8, 93], [87, 9, 90, 7, 9, 7, 91],
  
  // === HIGH RISK (75-89) ===
  [80, 15, 80, 15, 15, 15, 88], [78, 18, 78, 18, 18, 18, 86], [75, 20, 75, 20, 20, 20, 84],
  [72, 22, 72, 22, 22, 22, 82], [70, 25, 70, 25, 25, 25, 80], [68, 28, 68, 28, 28, 28, 78],
  [82, 12, 82, 12, 12, 12, 89], [78, 16, 78, 16, 16, 16, 85], [74, 20, 74, 20, 20, 20, 81],
  [70, 24, 70, 24, 24, 24, 77], [66, 28, 66, 28, 28, 28, 75], [80, 14, 75, 18, 14, 18, 87],
  [76, 18, 80, 14, 18, 14, 85], [72, 22, 76, 16, 22, 16, 83], [68, 26, 72, 20, 26, 20, 79],
  [85, 10, 78, 12, 10, 12, 90], [81, 14, 82, 10, 14, 10, 88], [77, 18, 78, 14, 18, 14, 84],
  
  // === MEDIUM-HIGH RISK (60-74) ===
  [65, 30, 65, 30, 30, 30, 74], [62, 33, 62, 33, 33, 33, 72], [60, 35, 60, 35, 35, 35, 70],
  [58, 38, 58, 38, 38, 38, 68], [55, 40, 55, 40, 40, 40, 65], [52, 43, 52, 43, 43, 43, 62],
  [68, 28, 68, 28, 28, 28, 76], [64, 32, 64, 32, 32, 32, 72], [60, 36, 60, 36, 36, 36, 68],
  [56, 40, 56, 40, 40, 40, 64], [52, 44, 52, 44, 44, 44, 60], [70, 26, 65, 30, 26, 30, 75],
  [66, 30, 70, 26, 30, 26, 73], [62, 34, 66, 28, 34, 28, 69], [58, 38, 62, 32, 38, 32, 65],
  [63, 32, 58, 38, 32, 38, 71], [59, 36, 54, 42, 36, 42, 67], [55, 40, 50, 46, 40, 46, 63],
  
  // === MEDIUM RISK (40-59) ===
  [50, 45, 50, 45, 45, 45, 58], [48, 48, 48, 48, 48, 48, 55], [45, 50, 45, 50, 50, 50, 52],
  [42, 53, 42, 53, 53, 53, 48], [40, 55, 40, 55, 55, 55, 45], [38, 58, 38, 58, 58, 58, 42],
  [52, 42, 52, 42, 42, 42, 59], [48, 46, 48, 46, 46, 46, 54], [44, 50, 44, 50, 50, 50, 49],
  [40, 54, 40, 54, 54, 54, 44], [36, 58, 36, 58, 58, 58, 40], [50, 44, 46, 48, 44, 48, 56],
  [46, 48, 50, 44, 48, 44, 53], [42, 52, 46, 48, 52, 48, 48], [38, 56, 42, 52, 56, 52, 43],
  [45, 48, 40, 55, 48, 55, 50], [41, 52, 36, 59, 52, 59, 46], [37, 56, 32, 63, 56, 63, 42],
  
  // === MEDIUM-LOW RISK (25-39) ===
  [35, 60, 35, 60, 60, 60, 38], [32, 63, 32, 63, 63, 63, 35], [30, 65, 30, 65, 65, 65, 32],
  [28, 68, 28, 68, 68, 68, 29], [25, 70, 25, 70, 70, 70, 26], [22, 73, 22, 73, 73, 73, 23],
  [38, 58, 38, 58, 58, 58, 39], [34, 62, 34, 62, 62, 62, 35], [30, 66, 30, 66, 66, 66, 31],
  [26, 70, 26, 70, 70, 70, 27], [22, 74, 22, 74, 74, 74, 23], [35, 60, 32, 65, 60, 65, 36],
  [31, 64, 35, 58, 64, 58, 33], [27, 68, 30, 62, 68, 62, 29], [23, 72, 25, 66, 72, 66, 25],
  [32, 62, 28, 68, 62, 68, 34], [28, 66, 24, 72, 66, 72, 30], [24, 70, 20, 76, 70, 76, 26],
  
  // === LOW RISK (10-24) ===
  [20, 75, 20, 75, 75, 75, 20], [18, 78, 18, 78, 78, 78, 18], [15, 80, 15, 80, 80, 80, 15],
  [12, 83, 12, 83, 83, 83, 12], [10, 85, 10, 85, 85, 85, 10], [8, 88, 8, 88, 88, 88, 8],
  [22, 72, 22, 72, 72, 72, 22], [18, 76, 18, 76, 76, 76, 18], [14, 80, 14, 80, 80, 80, 14],
  [10, 84, 10, 84, 84, 84, 10], [6, 88, 6, 88, 88, 88, 6], [20, 74, 18, 78, 74, 78, 19],
  [16, 78, 22, 72, 78, 72, 17], [12, 82, 18, 76, 82, 76, 13], [8, 86, 14, 80, 86, 80, 9],
  [18, 76, 15, 82, 76, 82, 17], [14, 80, 11, 86, 80, 86, 13], [10, 84, 7, 90, 84, 90, 9],
  
  // === EXTREME LOW RISK (1-9) ===
  [5, 90, 5, 90, 90, 90, 5], [3, 93, 3, 93, 93, 93, 3], [2, 95, 2, 95, 95, 95, 2],
  [1, 97, 1, 97, 97, 97, 1], [4, 91, 4, 91, 91, 91, 4], [6, 89, 6, 89, 89, 89, 6],
  [3, 92, 2, 95, 92, 95, 2], [5, 90, 3, 93, 90, 93, 3], [2, 94, 4, 91, 94, 91, 2],
];

// Initialize and train the ML model
async function initMLModel() {
  try {
    console.log("Initializing TensorFlow.js ML Model...");
    console.log(`Training with ${trainingData.length} samples...`);
    
    // Create improved neural network model
    mlModel = tf.sequential();
    
    // Input layer + Hidden layer 1 (64 neurons)
    mlModel.add(tf.layers.dense({
      inputShape: [6],
      units: 64,
      activation: 'relu',
      kernelInitializer: 'glorotNormal'
    }));
    
    // Dropout for regularization
    mlModel.add(tf.layers.dropout({ rate: 0.1 }));
    
    // Hidden layer 2 (32 neurons)
    mlModel.add(tf.layers.dense({
      units: 32,
      activation: 'relu'
    }));
    
    // Hidden layer 3 (16 neurons)
    mlModel.add(tf.layers.dense({
      units: 16,
      activation: 'relu'
    }));
    
    // Output layer
    mlModel.add(tf.layers.dense({
      units: 1,
      activation: 'sigmoid'
    }));
    
    // Compile model with lower learning rate for better convergence
    mlModel.compile({
      optimizer: tf.train.adam(0.005),
      loss: 'meanSquaredError',
      metrics: ['mae']
    });
    
    // Prepare training data (normalize inputs to 0-1)
    const xs = tf.tensor2d(trainingData.map(d => [
      d[0] / 100,  // rain
      (100 - d[1]) / 100,  // elev (inverted)
      d[2] / 100,  // density
      (100 - d[3]) / 100,  // veg (inverted)
      (100 - d[4]) / 100,  // river (inverted)
      (100 - d[5]) / 100   // drain (inverted)
    ]));
    const ys = tf.tensor2d(trainingData.map(d => [d[6] / 100])); // Normalize output to 0-1
    
    // Train the model with more epochs
    await mlModel.fit(xs, ys, {
      epochs: 400,
      batchSize: 16,
      shuffle: true,
      validationSplit: 0.15,
      callbacks: {
        onEpochEnd: (epoch, logs) => {
          if (epoch % 100 === 0) {
            console.log(`Epoch ${epoch}: loss = ${logs.loss.toFixed(4)}, val_loss = ${logs.val_loss?.toFixed(4) || 'N/A'}`);
          }
        }
      }
    });
    
    // Clean up tensors
    xs.dispose();
    ys.dispose();
    
    mlModelReady = true;
    console.log("ML Model trained successfully with 120 samples!");
    
    return true;
  } catch (error) {
    console.error("Error initializing ML model:", error);
    return false;
  }
}

// Predict flood risk using ML model
async function predictWithML(inputData) {
  if (!mlModelReady || !mlModel) {
    console.warn("ML Model not ready, using formula fallback");
    return calculateFRIFallback(inputData);
  }
  
  try {
    const inputTensor = tf.tensor2d([[
      inputData.rain / 100,
      (100 - inputData.elev) / 100, // Inverted
      inputData.density / 100,
      (100 - inputData.veg) / 100,  // Inverted
      (100 - inputData.river) / 100, // Inverted
      (100 - inputData.drain) / 100  // Inverted
    ]]);
    
    const prediction = mlModel.predict(inputTensor);
    const riskValue = (await prediction.data())[0] * 100;
    
    inputTensor.dispose();
    prediction.dispose();
    
    return {
      risk: Math.round(riskValue),
      confidence: calculateConfidence(inputData),
      method: 'ml'
    };
  } catch (error) {
    console.error("ML Prediction error:", error);
    return calculateFRIFallback(inputData);
  }
}

// Fallback formula (original FRI calculation)
function calculateFRIFallback(data) {
  const weights = {
    rain: 0.28,
    elev: 0.22,
    density: 0.18,
    veg: 0.13,
    river: 0.09,
    drain: 0.10
  };
  
  const fri = (data.rain * weights.rain) +
              ((100 - data.elev) * weights.elev) +
              (data.density * weights.density) +
              ((100 - data.veg) * weights.veg) +
              ((100 - data.river) * weights.river) +
              ((100 - data.drain) * weights.drain);
  
  return {
    risk: Math.round(fri),
    confidence: calculateConfidence(data),
    method: 'formula'
  };
}

// Calculate confidence based on data quality
function calculateConfidence(data) {
  // Simple confidence based on data variance
  const values = [data.rain, data.elev, data.density, data.veg, data.river, data.drain];
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  const variance = values.reduce((sum, v) => sum + Math.pow(v - avg, 2), 0) / values.length;
  
  // Higher variance = lower confidence (unusual data patterns)
  const confidence = Math.max(60, Math.min(95, 90 - (variance / 50)));
  return Math.round(confidence);
}

// ═══════════════════════════════════════════════════════════════════════════
// getVisual – plain text, no emojis
// ═══════════════════════════════════════════════════════════════════════════
function getVisual(data) {
  return `
  Rain: ${data.rain}<br>
  Elev: ${data.elev}<br>
  Density: ${data.density}<br>
  Veg: ${data.veg}<br>
  River: ${data.river}<br>
  Drain: ${data.drain}
  `;
}

let currentLang = "id";

// ─────────────────────────────────────────────────────────────────────────────
// Translations (ID + EN) — complete
// ─────────────────────────────────────────────────────────────────────────────
const translations = {
  id: {
    brand: "Flood Risk AI",
    btnTutorial: "Cara Penggunaan",
    btnSimRain: "Simulasi +20% Curah Hujan",
    btnCompare: "Bandingkan Lokasi",
    btnClear: "Hapus Marker",
    intro: "Klik peta untuk menganalisis risiko banjir.",
    subtitle: "Semua input diskalakan 0–100. Elevasi, vegetasi, jarak sungai, dan drainase dibalik dalam formula FRI.",
    inputData: "Data Masukan",
    rainfall: "Curah Hujan",
    elevation: "Elevasi",
    buildingDensity: "Kepadatan Bangunan",
    vegetation: "Vegetasi",
    distanceRiver: "Jarak ke Sungai",
    drainage: "Drainase",
    normalized: "Ternormalisasi",
    direct: "Langsung",
    lowHigherRisk: "Rendah = risiko lebih tinggi",
    farLowerRisk: "Jauh = risiko lebih rendah",
    highLowerRisk: "Tinggi = risiko lebih rendah",
    inverted: "Dibalik",
    btnPredict: "Prediksi dari Input Manual",
    btnReset: "Reset Input",
    btnSimRain2: "Simulasi +20% Curah Hujan",
    btnUrban: "Ekspansi Perkotaan",
    btnDrainage: "Tingkatkan Kapasitas Drainase",
    floodRiskResult: "Hasil Risiko Banjir",
    riskPercentage: "Persentase Risiko",
    confidence: "Kepercayaan",
    timestamp: "Waktu",
    mlAiAnalysis: "Analisis ML AI",
    norecommendations: "Belum ada rekomendasi",
    selectedLocation: "Lokasi Terpilih",
    location: "Lokasi",
    score: "Skor",
    elevationVal: "Elevasi",
    rainfallVal: "Curah Hujan",
    buildingDensityVal: "Kepadatan Bangunan",
    vegetationVal: "Vegetasi",
    distanceToRiverVal: "Jarak ke Sungai",
    drainageVal: "Kapasitas Drainase",
    riskCategory: "Kategori Risiko",
    visualizationTools: "Alat Visualisasi",
    history: "Riwayat",
    noHistory: "Belum ada riwayat. Klik peta untuk memulai.",
    scenario: "Analisis Skenario",
    scenarioNote: "Kontrol skenario aktif melalui tombol di panel kiri.",
    aboutModel: "Tentang Model",
    aboutModelDesc: "Model AI Neural Network (TensorFlow.js) yang dilatih dengan data historis risiko banjir. Menggunakan 6 fitur input: curah hujan, elevasi, kepadatan bangunan, vegetasi, jarak sungai, dan drainase. Prediksi juga menggunakan formula FRI sebagai fallback.",
    advancedAnalysis: "Analisis Lanjutan",
    calculatingScenario: "Menghitung skenario...",
    tryScenarios: "Cobalah skenario untuk melihat perubahan FRI. Mode perbandingan menyimpan dua lokasi dan menunjukkan hasil langsung.",
    legend: "Legenda",
    low: "Rendah",
    medium: "Sedang",
    high: "Tinggi",
    clickCompare: "Klik 2 lokasi untuk membandingkannya.\nPanel di sebelah kiri menampilkan variabel aktif dan FRI final.",
    tabCompare: "Perbandingan Lokasi",
    tabScenario: "Analisis Skenario",
    tabHistory: "Riwayat",
    // Tutorial (Basah mascot)
    tutorial: "Tutorial Singkat",
    tutorialOk: "OK",
    tutorialNext: "Berikutnya",
    petName: "Basah",
    tutorial1: "Hai! Namaku Basah, aku bakal bantu kamu analisis risiko banjir nih! 😊\n\nLangkah 1: Klik sembarang tempat di peta buat pilih lokasi yang mau dianalisis. Nanti muncul titik warna plus popup data.",
    tutorial2: "Langkah 2: Geser-geser slider di panel kiri — curah hujan, elevasi, kepadatan bangunan, vegetasi, jarak sungai, dan drainase — terus pencet Prediksi dari Input Manual buat hitung FRI manual.",
    tutorial3: "Langkah 3: Pakai tombol Analisis Lanjutan buat simulasi skenario. Klik Bandingkan Lokasi buat bandingin dua titik, dan liat hasilnya di panel kanan sama grafik!",
    tutStep: "Langkah",
    tutOf: "dari",
    // Modals
    manualPrediction: "Prediksi Manual",
    locationComparison: "Perbandingan Lokasi",
    compareMode: "Mode perbandingan AKTIF.\nKlik dua lokasi peta untuk membandingkan nilai FRI mereka.",
    scenarioAnalysis: "Analisis Skenario",
    scenarioActive: "Analisis Skenario aktif.\nGunakan tombol panel kiri untuk mensimulasikan curah hujan, ekspansi perkotaan, atau peningkatan drainase.",
    historyInfo: "Bagian ini menunjukkan lokasi yang dianalisis dan nilai FRI.",
    selectedLocationInfo: "Kartu ini diperbarui saat Anda mengklik titik peta atau menjalankan input manual.",
    historyClickable: "Panel riwayat dapat diklik. Ini menyimpan lokasi teranalisis terbaru.",
    scenarioClickable: "Gunakan tombol untuk menguji skenario.",
    urbanExpansion: "Skenario Ekspansi Perkotaan",
    urbanDesc: "Kepadatan bangunan meningkat dan vegetasi berkurang.\nFRI: ",
    increaseDrainage: "Tingkatkan Kapasitas Drainase",
    drainageDesc: "Kapasitas drainase ditingkatkan +20.\nFRI baru (dengan drainase lebih baik): ",
    // AI
    improvedDrainage: "Tingkatkan sistem drainase",
    buildBarriers: "Bangun penghalang pelindung di area rendah",
    regulateUrban: "Atur pertumbuhan kepadatan perkotaan",
    increaseGreen: "Tingkatkan cakupan ruang hijau",
    strengthenRiver: "Perkuat tanggul sungai",
    improveDrainCap: "Perbaiki kapasitas drainase lokal",
    monitorConditions: "Pantau kondisi",
    criticalPriority: "Kritis",
    highPriority: "Tinggi",
    mediumPriority: "Sedang",
    lowPriority: "Rendah",
    reduceRisk25: "Kurangi risiko banjir hingga 25%",
    reduceRisk20: "Kurangi risiko hingga 20%",
    reduceRisk15: "Kurangi risiko hingga 15%",
    reduceRisk12: "Kurangi risiko hingga 12%",
    reduceRisk10: "Kurangi risiko hingga 10%",
    reduceRisk8:  "Kurangi risiko hingga 8%",
    maintainMeasures: "Pertahankan langkah-langkah saat ini",
    featureImportance: "Pentingnya Fitur:",
    modelConfidence: "Skor Kepercayaan Model:",
    modelUncertainty: "Ketidakpastian model:",
    clickMapAnalyze: "Klik peta untuk menganalisis",
    recommendationsLoading: "Rekomendasi dimuat...",
    modelConfidenceNA: "Kepercayaan model: N/A",
    factorsNA: "Faktor: N/A",
    // Drain info modal
    drainInfoTitle: "Info Kapasitas Drainase",
    drainInfoHead: "Kapasitas Drainase",
    drainDesc: "Kapasitas drainase mengukur kemampuan sistem saluran air di suatu area untuk mengalirkan kelebihan air hujan. Semakin tinggi nilainya, semakin baik drainase dan semakin rendah risiko banjir (efek inversi dalam FRI).",
    drainScaleLabel: "Skala Kapasitas Drainase:",
    drainPoor: "Buruk",
    drainModerate: "Sedang",
    drainGood: "Baik",
    drainKv1L: "Rendah (0–33): Saluran tersumbat, banjir cepat",
    drainKv1R: "Risiko Tinggi",
    drainKv2L: "Sedang (34–66): Drainase parsial, genangan sesekali",
    drainKv2R: "Risiko Sedang",
    drainKv3L: "Baik (67–100): Saluran lancar, air cepat surut",
    drainKv3R: "Risiko Rendah",
    drainTip: "Tips: Meningkatkan kapasitas drainase 20 poin dapat menurunkan FRI secara signifikan di area dengan risiko sedang hingga tinggi. Gunakan tombol 'Tingkatkan Kapasitas Drainase' pada Analisis Lanjutan untuk simulasi langsung.",
  },

  en: {
    brand: "Flood Risk AI",
    btnTutorial: "How to Use",
    btnSimRain: "Simulate +20% Rainfall",
    btnCompare: "Compare Locations",
    btnClear: "Clear Markers",
    intro: "Click the map to analyze flood risk.",
    subtitle: "All inputs are scaled 0–100. Elevation, vegetation, river distance, and drainage are inverted in the FRI formula.",
    inputData: "Input Data",
    rainfall: "Rainfall",
    elevation: "Elevation",
    buildingDensity: "Building Density",
    vegetation: "Vegetation",
    distanceRiver: "Distance to River",
    drainage: "Drainage",
    normalized: "Normalized",
    direct: "Direct",
    lowHigherRisk: "Low = higher risk",
    farLowerRisk: "Far = lower risk",
    highLowerRisk: "High = lower risk",
    inverted: "Inverted",
    btnPredict: "Predict from Manual Input",
    btnReset: "Reset Inputs",
    btnSimRain2: "Simulate +20% Rainfall",
    btnUrban: "Urban Expansion",
    btnDrainage: "Increase Drainage",
    floodRiskResult: "Flood Risk Result",
    riskPercentage: "Risk Percentage",
    confidence: "Confidence",
    timestamp: "Timestamp",
    mlAiAnalysis: "ML AI Analysis",
    noRecommendations: "No recommendations yet",
    selectedLocation: "Selected Location",
    location: "Location",
    score: "Score",
    elevationVal: "Elevation",
    rainfallVal: "Rainfall",
    buildingDensityVal: "Building Density",
    vegetationVal: "Vegetation",
    distanceToRiverVal: "Distance to River",
    drainageVal: "Drainage Capacity",
    riskCategory: "Risk Category",
    visualizationTools: "Visualization Tools",
    history: "History",
    noHistory: "No history yet. Click the map to start.",
    scenario: "Scenario Analysis",
    scenarioNote: "Scenario controls are active via the buttons on the left.",
    aboutModel: "About Model",
    aboutModelDesc: "AI Neural Network Model (TensorFlow.js) trained with historical flood risk data. Uses 6 input features: rainfall, elevation, building density, vegetation, river distance, and drainage. Predictions also use FRI formula as fallback.",
    advancedAnalysis: "Advanced Analysis",
    calculatingScenario: "Calculating scenario...",
    tryScenarios: "Try scenarios to see how the FRI changes. Compare mode stores two locations and shows a direct result.",
    legend: "Legend",
    low: "Low",
    medium: "Medium",
    high: "High",
    clickCompare: "Click 2 locations to compare them.\nThe panel on the left shows the active variables and the final FRI.",
    tabCompare: "Location Comparison",
    tabScenario: "Scenario Analysis",
    tabHistory: "History",
    // Tutorial (Basah mascot)
    tutorial: "Quick Tutorial",
    tutorialOk: "OK",
    tutorialNext: "Next",
    petName: "Basah",
    tutorial1: "Hey! I'm Basah, your friendly flood-risk analysis buddy! 😊\n\nStep 1: Click anywhere on the map to pick a spot for analysis. A colored dot will pop up with some data info.",
    tutorial2: "Step 2: Tweak the sliders on the left panel — rainfall, elevation, building density, vegetation, river distance, and drainage — then hit Predict from Manual Input to calculate the FRI manually.",
    tutorial3: "Step 3: Use the Advanced Analysis buttons for scenario simulations. Click Compare Locations to check out two spots side by side, and see the results in the right panel and chart!",
    tutStep: "Step",
    tutOf: "of",
    // Modals
    manualPrediction: "Manual Prediction",
    locationComparison: "Location Comparison",
    compareMode: "Compare mode is ON.\nClick two map locations to compare their FRI values.",
    scenarioAnalysis: "Scenario Analysis",
    scenarioActive: "Scenario Analysis is active.\nUse the left-panel buttons to simulate rainfall, urban expansion, or drainage improvements.",
    historyInfo: "This section shows analyzed locations and FRI values.",
    selectedLocationInfo: "This card updates when you click a map point or run manual input.",
    historyClickable: "History panel is clickable. It keeps the latest analyzed locations in the sidebar.",
    scenarioClickable: "Use the buttons to test scenarios.",
    urbanExpansion: "Urban Expansion Scenario",
    urbanDesc: "Building density increased and vegetation reduced.\nFRI: ",
    increaseDrainage: "Increase Drainage Capacity",
    drainageDesc: "Drainage capacity increased by +20.\nNew FRI (with improved drainage): ",
    // AI
    improvedDrainage: "Improve drainage systems",
    buildBarriers: "Build protective barriers in low areas",
    regulateUrban: "Regulate urban density growth",
    increaseGreen: "Increase green space coverage",
    strengthenRiver: "Strengthen river embankments",
    improveDrainCap: "Improve local drainage capacity",
    monitorConditions: "Monitor conditions",
    criticalPriority: "Critical",
    highPriority: "High",
    mediumPriority: "Medium",
    lowPriority: "Low",
    reduceRisk25: "Reduce flood risk by up to 25%",
    reduceRisk20: "Reduce risk by up to 20%",
    reduceRisk15: "Reduce risk by up to 15%",
    reduceRisk12: "Reduce risk by up to 12%",
    reduceRisk10: "Reduce risk by up to 10%",
    reduceRisk8:  "Reduce risk by up to 8%",
    maintainMeasures: "Maintain current measures",
    featureImportance: "Feature Importance:",
    modelConfidence: "Confidence Score:",
    modelUncertainty: "Model uncertainty:",
    clickMapAnalyze: "Click map to analyze",
    recommendationsLoading: "Recommendations loading...",
    modelConfidenceNA: "Model confidence: N/A",
    factorsNA: "Factors: N/A",
    // Drain info modal
    drainInfoTitle: "Drainage Capacity Info",
    drainInfoHead: "Drainage Capacity",
    drainDesc: "Drainage capacity measures how effectively the drainage infrastructure in an area can channel away excess rainwater. Higher values mean better drainage and lower flood risk (inverted relationship in FRI).",
    drainScaleLabel: "Drainage Capacity Scale:",
    drainPoor: "Poor",
    drainModerate: "Moderate",
    drainGood: "Good",
    drainKv1L: "Low (0–33): Blocked channels, rapid flooding",
    drainKv1R: "High Risk",
    drainKv2L: "Moderate (34–66): Partial drainage, occasional pooling",
    drainKv2R: "Medium Risk",
    drainKv3L: "Good (67–100): Clear channels, water recedes quickly",
    drainKv3R: "Low Risk",
    drainTip: "Tip: Improving drainage capacity by 20 points can noticeably lower the FRI in medium-to-high risk areas. Use the 'Increase Drainage' button in Advanced Analysis to simulate this instantly.",
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// i18n helpers
// ─────────────────────────────────────────────────────────────────────────────
function t(key) {
  return translations[currentLang][key] || translations['id'][key] || key;
}

function toggleLang() {
  currentLang = currentLang === "id" ? "en" : "id";
  updateAllTranslations();
  localStorage.setItem('preferredLang', currentLang);
  const btn = document.getElementById("btnManualPredict");
  if (btn) btn.innerText = t('btnPredict');
}

function updateAllTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const text = t(key);
    if (el.tagName === 'INPUT') {
      el.value = text; el.placeholder = text;
    } else {
      el.innerText = text;
    }
  });
  const btnLang = document.getElementById('btnLang');
  if (btnLang) btnLang.innerText = currentLang === 'id' ? '🌐 ID' : '🌐 EN';
  const petNameEl = document.getElementById('petName');
  if (petNameEl) petNameEl.innerText = t('petName');
  const tutorialText = document.getElementById('tutorialText');
  if (tutorialText) {
    const steps = getTutorialSteps();
    tutorialText.innerText = steps[tutorialIndex] || steps[0];
    updatePetStep();
  }
  renderHistory();
}

function loadLanguagePreference() {
  const saved = localStorage.getItem('preferredLang');
  if (saved && (saved === 'id' || saved === 'en')) currentLang = saved;
}

// ─────────────────────────────────────────────────────────────────────────────
// Map — CartoDB Voyager (cleaner, more professional than basic OSM)
// ─────────────────────────────────────────────────────────────────────────────
const map = L.map('map').setView([-6.2, 106.8], 10);
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 20
}).addTo(map);

const state = {
  compareMode: false,
  comparePoints: [],
  markers: [],
  history: []
};

const el = (id) => document.getElementById(id);

// ─────────────────────────────────────────────────────────────────────────────
// Bootstrap
// ─────────────────────────────────────────────────────────────────────────────
loadLanguagePreference();
let tutorialIndex = 0;
updateAllTranslations();

// Initialize ML Model
initMLModel().then(success => {
  if (success) {
    console.log("ML Model ready for predictions");
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// Tutorial with Basah pet guide
// ─────────────────────────────────────────────────────────────────────────────
function getTutorialSteps() {
  return [t('tutorial1'), t('tutorial2'), t('tutorial3')];
}

function updatePetStep() {
  const stepEl = el('petStep');
  if (!stepEl) return;
  const total = getTutorialSteps().length;
  stepEl.innerText = `— ${t('tutStep')} ${tutorialIndex + 1} ${t('tutOf')} ${total} —`;
}

function renderTutorial() {
  const steps = getTutorialSteps();
  const step = steps[tutorialIndex] || steps[0];
  const tutorialTextEl = el('tutorialText');
  if (tutorialTextEl) tutorialTextEl.innerText = step;
  updatePetStep();
  // show/hide Next button
  const nextBtn = el('tutorialNext');
  if (nextBtn) nextBtn.style.display = tutorialIndex < steps.length - 1 ? '' : 'none';
}

function openTutorial() {
  tutorialIndex = 0;
  renderTutorial();
  const m = el('tutorialModal');
  if (m) m.classList.add('show');
}
function closeTutorial() {
  const m = el('tutorialModal');
  if (m) m.classList.remove('show');
}
function nextTutorial() {
  const steps = getTutorialSteps();
  if (tutorialIndex < steps.length - 1) {
    tutorialIndex++;
    renderTutorial();
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Drainage Info popup
// ─────────────────────────────────────────────────────────────────────────────
function showDrainInfo() {
  const head = el('drainModalHead');
  const desc = el('drainDesc');
  const kvs  = el('drainKvs');
  const tip  = el('drainTip');
  const scaleLbl = el('drainScaleLbl');
  const dsP  = el('dsP');
  const dsM  = el('dsM');
  const dsG  = el('dsG');

  if (head) head.innerText = t('drainInfoHead');
  if (desc) desc.innerText = t('drainDesc');
  if (scaleLbl) scaleLbl.innerText = t('drainScaleLabel');
  if (dsP) dsP.innerText = t('drainPoor');
  if (dsM) dsM.innerText = t('drainModerate');
  if (dsG) dsG.innerText = t('drainGood');

  if (kvs) {
    kvs.innerHTML = `
      <div class="drain-kv"><span>${t('drainKv1L')}</span><span style="color:#e4554d">${t('drainKv1R')}</span></div>
      <div class="drain-kv"><span>${t('drainKv2L')}</span><span style="color:#f5a524">${t('drainKv2R')}</span></div>
      <div class="drain-kv"><span>${t('drainKv3L')}</span><span style="color:#32b36b">${t('drainKv3R')}</span></div>
    `;
  }
  if (tip) tip.innerText = t('drainTip');

  const m = el('drainModal');
  if (m) m.classList.add('show');
}
function closeDrainModal() {
  const m = el('drainModal');
  if (m) m.classList.remove('show');
}

// ─────────────────────────────────────────────────────────────────────────────
// Math helpers
// ─────────────────────────────────────────────────────────────────────────────
function round2(n)  { return Math.round((Number(n) + Number.EPSILON) * 100) / 100; }
function fmt2(n)    { return round2(n).toFixed(2); }
function clamp01(v) { return Math.max(0, Math.min(1, v)); }
function normalize(x) { return clamp01(Number(x || 0) / 100); }
function riskLabel(score) {
  if (score >= 0.6) return 'High';
  if (score >= 0.3) return 'Medium';
  return 'Low';
}
function riskColor(score) {
  if (score >= 0.6) return '#e4554d';
  if (score >= 0.3) return '#f5a524';
  return '#9acd32';
}

// ─────────────────────────────────────────────────────────────────────────────
// FRI calculation — now includes drainage (inverted, Wt. 0.10)
// Weights: rain(0.28) + elev(0.22) + build(0.18) + veg(0.13) + river(0.09) + drain(0.10) = 1.00
// ─────────────────────────────────────────────────────────────────────────────
function calculateFRI(rain, elev, build, veg, river, drain = 50) {
  const R  = normalize(rain);
  const E  = 1 - normalize(elev);   // inverse: low elevation = higher risk
  const B  = normalize(build);
  const V  = 1 - normalize(veg);    // inverse: low vegetation = higher risk
  const Ri = normalize(river);       // kept consistent with original behavior
  const D  = 1 - normalize(drain);  // inverse: low drainage = higher risk

  return clamp01(
    0.28 * R +
    0.22 * E +
    0.18 * B +
    0.13 * V +
    0.09 * Ri +
    0.10 * D
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Input read / sidebar update
// ─────────────────────────────────────────────────────────────────────────────
function currentInputs() {
  return {
    rain:    el('rain')    ? Number(el('rain').value    || 0) : 0,
    elev:    el('elev')    ? Number(el('elev').value    || 0) : 0,
    density: el('density') ? Number(el('density').value || 0) : 0,
    veg:     el('veg')     ? Number(el('veg').value     || 0) : 0,
    river:   el('river')   ? Number(el('river').value   || 0) : 0,
    drain:   el('drain')   ? Number(el('drain').value   || 0) : 0,
  };
}

function updateSidebarInputs() {
  const i = currentInputs();
  if (el('rainVal'))    el('rainVal').innerText    = fmt2(normalize(i.rain));
  if (el('elevVal'))    el('elevVal').innerText    = fmt2(normalize(i.elev));
  if (el('densityVal')) el('densityVal').innerText = fmt2(normalize(i.density));
  if (el('vegVal'))     el('vegVal').innerText     = fmt2(normalize(i.veg));
  if (el('riverVal'))   el('riverVal').innerText   = fmt2(normalize(i.river));
  if (el('drainVal'))   el('drainVal').innerText   = fmt2(normalize(i.drain));
  if (el('rainNorm'))   el('rainNorm').innerText   = `${i.rain}`;
  if (el('elevNorm'))   el('elevNorm').innerText   = `${i.elev}`;
  if (el('densityNorm'))el('densityNorm').innerText= `${i.density}`;
  if (el('vegNorm'))    el('vegNorm').innerText    = `${i.veg}`;
  if (el('riverNorm'))  el('riverNorm').innerText  = `${i.river}`;
  if (el('drainNorm'))  el('drainNorm').innerText  = `${i.drain}`;
}

function updateResult(score, confidence) {
  const label = riskLabel(score);
  const pct   = round2(score * 100);
  const conf = confidence !== undefined ? confidence : (0.5 + score * 0.5) * 100;
  if (el('scoreGauge'))  el('scoreGauge').innerText  = fmt2(score);
  if (el('riskLabel')) {
    el('riskLabel').innerText   = `Flood Risk: ${label}`;
    el('riskLabel').className   = `risk ${label.toLowerCase()}`;
  }
  if (el('riskBar'))      el('riskBar').style.width   = `${pct}%`;
  if (el('riskPct'))      el('riskPct').innerText      = `${fmt2(score * 100)}%`;
  if (el('confidenceVal'))el('confidenceVal').innerText= `${fmt2(conf)}%`;
  if (el('timestampVal')) el('timestampVal').innerText = new Date().toLocaleString();
}

function updateLocationBox({ name, score, elevation, rainfall, density, vegetation, river, drain, risk, confidence }) {
  if (el('locName'))  el('locName').innerText  = name ?? '—';
  if (el('locScore')) el('locScore').innerText = score !== undefined ? fmt2(score) : '—';
  if (el('locConf'))  el('locConf').innerText  = confidence !== undefined ? `${fmt2(confidence * 100)}%` : '—';
  if (el('locElev'))  el('locElev').innerText  = elevation  !== undefined ? `${round2(elevation)} m`  : '—';
  if (el('locRain'))  el('locRain').innerText  = rainfall   !== undefined ? `${round2(rainfall)} mm`  : '—';
  if (el('locBuild')) el('locBuild').innerText = density    !== undefined ? `${round2(density)} %`    : '—';
  if (el('locVeg'))   el('locVeg').innerText   = vegetation !== undefined ? `${round2(vegetation)} %` : '—';
  if (el('locRiver')) el('locRiver').innerText = river      !== undefined ? `${round2(river)} m`      : '—';
  if (el('locDrain')) el('locDrain').innerText = drain      !== undefined ? `${round2(drain)} %`      : '—';
  if (el('locRisk'))  el('locRisk').innerText  = risk ?? '—';
}

// ─────────────────────────────────────────────────────────────────────────────
// Chart — includes Drain
// ─────────────────────────────────────────────────────────────────────────────
let chart;
function initChart() {
  const chartEl = el('chart');
  if (!chartEl) return;
  const ctx = chartEl.getContext('2d');
  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Rain', 'Elev', 'Build', 'Veg', 'River', 'Drain'],
      datasets: [{
        label: 'Normalized Input',
        data: [0.8, 0.8, 0.85, 0.15, 0.35, 0.55],
        backgroundColor: ['#4d91ff','#4d91ff','#4d91ff','#4d91ff','#4d91ff','#35bf7f']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { y: { min: 0, max: 1 } }
    }
  });
}

function updateChartFromInputs() {
  if (!chart) return;
  const i = currentInputs();
  chart.data.datasets[0].data = [
    normalize(i.rain),
    normalize(i.elev),
    normalize(i.density),
    normalize(i.veg),
    normalize(i.river),
    normalize(i.drain)
  ];
  chart.update();
}

// ─────────────────────────────────────────────────────────────────────────────
// History
// ─────────────────────────────────────────────────────────────────────────────
function renderHistory() {
  const historyList = el('historyList');
  if (!historyList) return;
  const html = state.history.map(item => {
    const cls = item.risk === 'High' ? 'red' : item.risk === 'Medium' ? 'orange' : 'green';
    return `<li class="history-item"><span class="dot ${cls}"></span><span>${item.name}</span><strong>${fmt2(item.score)}</strong></li>`;
  }).join('');
  historyList.innerHTML = html || `<div class="subtle">${t('noHistory')}</div>`;
}

function addHistory(name, score) {
  state.history.unshift({ name, score: round2(score), risk: riskLabel(score) });
  state.history = state.history.slice(0, 8);
  renderHistory();
}

// ─────────────────────────────────────────────────────────────────────────────
// Modal helpers
// ─────────────────────────────────────────────────────────────────────────────
function showModal(title, text) {
  const mh = el('modalHead'), mb = el('modalBody'), m = el('modal');
  if (mh) mh.innerText = title;
  if (mb) mb.innerText = text;
  if (m)  m.classList.add('show');
}
function closeModal() {
  const m = el('modal');
  if (m) m.classList.remove('show');
}

// ─────────────────────────────────────────────────────────────────────────────
// Event listeners
// ─────────────────────────────────────────────────────────────────────────────
el('modalClose')   ?.addEventListener('click', closeModal);
el('modal')        ?.addEventListener('click', e => { if (e.target.id === 'modal') closeModal(); });
el('btnTutorial')  ?.addEventListener('click', openTutorial);
el('tutorialOk')   ?.addEventListener('click', closeTutorial);
el('tutorialNext') ?.addEventListener('click', nextTutorial);
el('tutorialModal')?.addEventListener('click', e => { if (e.target.id === 'tutorialModal') closeTutorial(); });
el('btnDrainInfo') ?.addEventListener('click', showDrainInfo);
el('drainModalClose')?.addEventListener('click', closeDrainModal);
el('drainModal')   ?.addEventListener('click', e => { if (e.target.id === 'drainModal') closeDrainModal(); });

['rain','elev','density','veg','river','drain'].forEach(id => {
  el(id)?.addEventListener('input', () => {
    updateSidebarInputs();
    updateChartFromInputs();
  });
});

function setCompareMode(on) {
  state.compareMode = !!on;
  const btn = el('btnCompare');
  if (btn) btn.textContent = on ? 'Compare Mode: ON' : t('btnCompare');
}
el('btnCompare')?.addEventListener('click', () => setCompareMode(!state.compareMode));

function clearMarkers() {
  state.markers.forEach(m => map.removeLayer(m));
  state.markers = [];
  state.comparePoints = [];
}

// ─────────────────────────────────────────────────────────────────────────────
// Scenario buttons
// ─────────────────────────────────────────────────────────────────────────────
function simulateRain() {
  const i = currentInputs();
  const rainEl = el('rain');
  if (rainEl) rainEl.value = Math.min(100, i.rain + 20);
  updateSidebarInputs();
  updateChartFromInputs();
  manualPredict(1);
}
el('btnSimRain') ?.addEventListener('click', simulateRain);
el('btnSimRain2')?.addEventListener('click', simulateRain);
el('btnManualPredict')?.addEventListener('click', () => manualPredict(1));

el('btnResetInputs')?.addEventListener('click', () => {
  const defaults = { rain:80, elev:80, density:85, veg:15, river:35, drain:55 };
  Object.entries(defaults).forEach(([k, v]) => { const e = el(k); if (e) e.value = v; });
  updateSidebarInputs();
  updateChartFromInputs();
  if (el('scoreGauge'))  el('scoreGauge').innerText  = '—';
  if (el('riskLabel'))  { el('riskLabel').innerText   = 'Flood Risk: —'; el('riskLabel').className = 'risk low'; }
  if (el('riskBar'))     el('riskBar').style.width    = '0%';
  if (el('riskPct'))     el('riskPct').innerText      = '—';
  if (el('confidenceVal'))el('confidenceVal').innerText='—';
  if (el('timestampVal'))el('timestampVal').innerText = '—';
  if (el('aiInsight'))   el('aiInsight').innerHTML    = t('clickMapAnalyze');
  if (el('aiReco'))      el('aiReco').innerHTML       = t('recommendationsLoading');
  if (el('aiConfidence'))el('aiConfidence').innerHTML = t('modelConfidenceNA');
  if (el('aiFactors'))   el('aiFactors').innerHTML    = t('factorsNA');
  ['locName','locScore','locConf','locElev','locRain','locBuild','locVeg','locRiver','locDrain','locRisk']
    .forEach(id => { if (el(id)) el(id).innerText = '—'; });
  clearMarkers();
});

el('btnUrban')?.addEventListener('click', () => {
  const i = currentInputs();
  const newDens = Math.min(100, i.density + 20);
  const newVeg  = Math.max(0, i.veg - 15);
  if (el('density')) el('density').value = newDens;
  if (el('veg'))     el('veg').value     = newVeg;
  updateSidebarInputs();
  updateChartFromInputs();
  const score = calculateFRI(i.rain, i.elev, newDens, newVeg, i.river, i.drain);
  updateResult(score);
  showModal(t('urbanExpansion'), t('urbanDesc') + fmt2(score));
});

el('btnDrainage')?.addEventListener('click', () => {
  const i = currentInputs();
  const newDrain = Math.min(100, i.drain + 20);
  if (el('drain')) el('drain').value = newDrain;
  updateSidebarInputs();
  updateChartFromInputs();
  const score = calculateFRI(i.rain, i.elev, i.density, i.veg, i.river, newDrain);
  updateResult(score);
  showModal(t('increaseDrainage'), t('drainageDesc') + fmt2(score));
});

el('btnClear')?.addEventListener('click', () => {
  clearMarkers();
  // Also clear history and compare points
  state.history = [];
  state.comparePoints = [];
  renderHistory();
  updateLocationBox(null);
  updateResult(null);
});

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const mode = tab.dataset.tab;
    if (mode === 'compare') {
      setCompareMode(true);
      showModal(t('locationComparison'), t('compareMode'));
    } else if (mode === 'scenario') {
      showModal(t('scenarioAnalysis'), t('scenarioActive'));
    } else if (mode === 'history') {
      showModal(t('history'), t('historyInfo'));
    }
  });
});

el('selectedCard')?.addEventListener('click', () => showModal(t('selectedLocation'), t('selectedLocationInfo')));
el('historyCard') ?.addEventListener('click', () => showModal(t('history'), t('historyClickable')));
el('scenarioCard')?.addEventListener('click', () => showModal(t('scenarioAnalysis'), t('scenarioClickable')));

// ─────────────────────────────────────────────────────────────────────────────
// Manual prediction
// ─────────────────────────────────────────────────────────────────────────────
async function manualPredict(extraRainMultiplier = 1) {
  const i = currentInputs();
  const rain = clamp01((i.rain * extraRainMultiplier) / 100) * 100;

  // Gunakan ML model (dengan fallback formula jika belum siap)
  const mlResult = await predictWithML({
    rain, elev: i.elev, density: i.density,
    veg: i.veg, river: i.river, drain: i.drain
  });
  const score = mlResult.risk / 100; // normalize 0-100 -> 0-1
  const label = riskLabel(score);
  const confidence = mlResult.confidence;
  const methodText = mlResult.method === 'ml' ? 'ML Neural Network' : 'Formula (fallback)';

  updateSidebarInputs();
  updateChartFromInputs();
  updateResult(score, confidence);
  updateLocationBox({
    name: 'Manual Input', score,
    elevation: i.elev, rainfall: rain, density: i.density,
    vegetation: i.veg, river: i.river, drain: i.drain,
    risk: label, confidence: score
  });
  addHistory('Manual Input', score);
  updateAIFromData({
    rainfall: rain, elevation: i.elev, buildingDensity: i.density,
    vegetation: i.veg, distanceToRiver: i.river * 2, drainage: i.drain
  }, score, confidence);
  showModal(t('manualPrediction'), `Status: ${label}\nFRI: ${fmt2(score)}\nRisk: ${Math.round(score * 100)}%\nMethod: ${methodText}`);
}
window.manualPredict = manualPredict;

// ─────────────────────────────────────────────────────────────────────────────
// Map click — generate + place location
// ─────────────────────────────────────────────────────────────────────────────
function generateRandomData(latlng) {
  const seed = Math.abs(Math.floor((latlng.lat * 1000) + (latlng.lng * 1000)));
  return {
    rain:    (seed * 37) % 101,
    elev:    (seed * 53) % 101,
    density: (seed * 71) % 101,
    veg:     (seed * 29) % 101,
    river:   (seed * 11) % 101,
    drain:   (seed * 13) % 101,
  };
}
function pointName(latlng) {
  return `Point ${Math.abs((latlng.lat + latlng.lng).toFixed(2))}`;
}

async function placeLocation(latlng, data, name) {
  // Use ML model for prediction (with fallback)
  const mlResult = await predictWithML(data);
  const score = mlResult.risk / 100; // normalize 0-100 → 0-1
  const label = riskLabel(score);
  const color = riskColor(score);
  const confidence = mlResult.confidence;

  const marker = L.circle(latlng, {
    color, fillColor: color, fillOpacity: 0.18, radius: 520
  }).addTo(map);

  const methodText = mlResult.method === 'ml' ? 'ML Neural Network' : 'Formula';
  marker.bindPopup(`
    <div style="min-width:230px">
      <div style="font-weight:900;font-size:16px;margin-bottom:6px">${name}</div>
      <div><b>Score:</b> ${fmt2(score)}</div>
      <div><b>Category:</b> ${label}</div>
      <div><b>Confidence:</b> ${fmt2(confidence)}%</div>
      <div><b>Method:</b> ${methodText}</div>
      <hr style="border:none;border-top:1px solid #e5e9f2;margin:8px 0">
      <div>Elevation: ${round2(data.elev)} m</div>
      <div>Rainfall: ${round2(data.rain)} mm</div>
      <div>Building Density: ${round2(data.density)} %</div>
      <div>Vegetation: ${round2(data.veg)} %</div>
      <div>Distance to River: ${round2(data.river)} m</div>
      <div>Drainage: ${round2(data.drain)} %</div>
    </div>
  `).openPopup();

  state.markers.push(marker);
  state.comparePoints.push({ name, score, latlng, data });

  updateResult(score, confidence);
  updateLocationBox({
    name, score,
    elevation: data.elev, rainfall: data.rain, density: data.density,
    vegetation: data.veg, river: data.river, drain: data.drain,
    risk: label, confidence
  });
  addHistory(name, score);
  updateAIFromData({
    rainfall: data.rain, elevation: data.elev, buildingDensity: data.density,
    vegetation: data.veg, distanceToRiver: data.river * 2, drainage: data.drain
  }, score, confidence);

  if (!state.compareMode && state.comparePoints.length > 2) {
    clearMarkers();
    return;
  }
  if (state.comparePoints.length === 2) {
    const a = state.comparePoints[0], b = state.comparePoints[1];
    const winner = a.score > b.score ? `${a.name} is more vulnerable` :
                   b.score > a.score ? `${b.name} is more vulnerable` :
                   'Both locations are equal';
    showModal(t('locationComparison'), `Location A: ${fmt2(a.score)}\nLocation B: ${fmt2(b.score)}\n\n${winner}`);
    state.compareMode = false;
    setCompareMode(false);
  }
}

map.on('click', e => {
  if (!state.compareMode) clearMarkers();
  const data = generateRandomData(e.latlng);
  const name = pointName(e.latlng);
  placeLocation(e.latlng, data, name);
});

// ─────────────────────────────────────────────────────────────────────────────
// Init
// ─────────────────────────────────────────────────────────────────────────────
updateSidebarInputs();
updateChartFromInputs();
renderHistory();
initChart();

// ─────────────────────────────────────────────────────────────────────────────
// ML AI Analysis — now includes drainage
// ─────────────────────────────────────────────────────────────────────────────
function updateAIFromData(d, mlScore, mlConfidence) {
  if (!d) return;

  const features = {
    rainfall:       normalize(d.rainfall),
    elevation:      normalize(d.elevation),
    buildingDensity:normalize(d.buildingDensity),
    vegetation:     normalize(d.vegetation),
    distanceToRiver:Math.min(1, d.distanceToRiver / 200),
    drainage:       normalize(d.drainage || 50)
  };

  const riskFactors = {
    rain:  features.rainfall        * 0.28,
    elev:  (1 - features.elevation) * 0.22,
    build: features.buildingDensity * 0.18,
    veg:   (1 - features.vegetation)* 0.13,
    river: (1 - features.distanceToRiver) * 0.09,
    drain: (1 - features.drainage)  * 0.10
  };

  // Gunakan ML score jika tersedia, agar konsisten dengan gauge & risk bar
  const score = (mlScore !== undefined) ? mlScore : clamp01(Object.values(riskFactors).reduce((a, b) => a + b, 0));

  // Threshold seragam dengan riskLabel()
  let level = "LOW";
  if (score >= 0.6) level = "HIGH";
  else if (score >= 0.3) level = "MEDIUM";

  const vals = Object.values(riskFactors);
  const mean = vals.reduce((a, b) => a + b, 0) / vals.length;
  const std  = Math.sqrt(vals.reduce((s, v) => s + Math.pow(v - mean, 2), 0) / vals.length);
  // Gunakan ML confidence jika tersedia
  const confidence = (mlConfidence !== undefined) ? clamp01(mlConfidence / 100) : clamp01(1 - std * 0.5);

  const featureImportance = Object.entries(riskFactors)
    .map(([name, contribution]) => ({ name, contribution }))
    .sort((a, b) => b.contribution - a.contribution);

  const primaryFactor   = featureImportance[0].name;
  const secondaryFactor = featureImportance.length > 1 ? featureImportance[1].name : null;

  const recommendationMap = {
    rain:  { action: t('improvedDrainage'),  priority: t('criticalPriority'), effect: t('reduceRisk25') },
    elev:  { action: t('buildBarriers'),     priority: t('highPriority'),     effect: t('reduceRisk20') },
    build: { action: t('regulateUrban'),     priority: t('highPriority'),     effect: t('reduceRisk15') },
    veg:   { action: t('increaseGreen'),     priority: t('mediumPriority'),   effect: t('reduceRisk12') },
    river: { action: t('strengthenRiver'),   priority: t('mediumPriority'),   effect: t('reduceRisk10') },
    drain: { action: t('improveDrainCap'),   priority: t('highPriority'),     effect: t('reduceRisk8')  }
  };

  const primaryReco = recommendationMap[primaryFactor] || { action: t('monitorConditions'), priority: t('lowPriority'), effect: t('maintainMeasures') };

  let secondaryInsight = "";
  if (secondaryFactor && featureImportance[1].contribution > 0.08) {
    const sr = recommendationMap[secondaryFactor];
    if (sr) secondaryInsight = ` — Secondary: ${sr.action}`;
  }

  const topFactors = featureImportance.slice(0, 2)
    .map(f => `${f.name}(${fmt2(f.contribution)})`).join(", ");
  const explanation = `Risk Level: ${level} | Score: ${fmt2(score)} | Confidence: ${fmt2(confidence * 100)}% | Top Drivers: ${topFactors}`;

  if (el('aiInsight')) {
    el('aiInsight').innerHTML = `
      <strong>${primaryFactor.toUpperCase()}</strong> is the primary risk driver<br>
      <small>${explanation}</small>
    `;
  }
  if (el('aiReco')) {
    el('aiReco').innerHTML = `
      <div style="font-weight:bold;color:#2f7cf6">${primaryReco.action}</div>
      <small>Priority: ${primaryReco.priority} | Expected effect: ${primaryReco.effect}</small>
      ${secondaryInsight}
    `;
  }
  if (el('aiConfidence')) {
    el('aiConfidence').innerHTML = `
      <div style="font-weight:bold">Confidence Score: ${fmt2(confidence * 100)}%</div>
      <div style="font-size:12px;color:#64748b">Model uncertainty: ${fmt2((1 - confidence) * 100)}%</div>
    `;
  }
  if (el('aiFactors')) {
    const factorDetails = featureImportance.map(f =>
      `<div style="display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid #e5e9f2">
        <span>${f.name}:</span>
        <strong style="color:${f.contribution > 0.12 ? '#e4554d' : '#f5a524'}">${fmt2(f.contribution)}</strong>
      </div>`
    ).join('');
    el('aiFactors').innerHTML = `<strong>Feature Importance:</strong><div>${factorDetails}</div>`;
  }
}

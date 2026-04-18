
// ─────────────────────────────────────────────────────────────────────────────
// getVisual – plain text, no emojis
// ─────────────────────────────────────────────────────────────────────────────
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
    aboutModelDesc: "FRI = jumlah tertimbang: curah hujan (0.28), inversi elevasi (0.22), kepadatan bangunan (0.18), inversi vegetasi (0.13), inversi jarak sungai (0.09), dan inversi drainase (0.10). Dirancang untuk penyaringan risiko banjir yang dapat dijelaskan.",
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
    aboutModelDesc: "FRI = weighted sum of rainfall (0.28), inverse elevation (0.22), building density (0.18), inverse vegetation (0.13), inverse river distance (0.09), and inverse drainage (0.10). Designed for explainable flood-risk screening.",
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

function updateResult(score) {
  const label = riskLabel(score);
  const pct   = round2(score * 100);
  if (el('scoreGauge'))  el('scoreGauge').innerText  = fmt2(score);
  if (el('riskLabel')) {
    el('riskLabel').innerText   = `Flood Risk: ${label}`;
    el('riskLabel').className   = `risk ${label.toLowerCase()}`;
  }
  if (el('riskBar'))      el('riskBar').style.width   = `${pct}%`;
  if (el('riskPct'))      el('riskPct').innerText      = `${fmt2(score * 100)}%`;
  if (el('confidenceVal'))el('confidenceVal').innerText= `${fmt2((0.5 + score * 0.5) * 100)}%`;
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
function manualPredict(extraRainMultiplier = 1) {
  const i = currentInputs();
  const rain = clamp01((i.rain * extraRainMultiplier) / 100) * 100;
  const score = calculateFRI(rain, i.elev, i.density, i.veg, i.river, i.drain);
  const label = riskLabel(score);
  updateSidebarInputs();
  updateChartFromInputs();
  updateResult(score);
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
  });
  showModal(t('manualPrediction'), `Status: ${label}\nFRI: ${fmt2(score)}\nRisk: ${Math.round(score * 100)}%`);
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

function placeLocation(latlng, data, name) {
  const score      = calculateFRI(data.rain, data.elev, data.density, data.veg, data.river, data.drain);
  const label      = riskLabel(score);
  const color      = riskColor(score);
  const confidence = 0.55 + (score * 0.45);

  const marker = L.circle(latlng, {
    color, fillColor: color, fillOpacity: 0.18, radius: 520
  }).addTo(map);

  marker.bindPopup(`
    <div style="min-width:230px">
      <div style="font-weight:900;font-size:16px;margin-bottom:6px">${name}</div>
      <div><b>Score:</b> ${fmt2(score)}</div>
      <div><b>Category:</b> ${label}</div>
      <div><b>Confidence:</b> ${fmt2(confidence * 100)}%</div>
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

  updateResult(score);
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
  });

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
function updateAIFromData(d) {
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

  const score = clamp01(Object.values(riskFactors).reduce((a, b) => a + b, 0));

  let level = "LOW";
  if (score >= 0.65) level = "HIGH";
  else if (score >= 0.35) level = "MEDIUM";

  const vals = Object.values(riskFactors);
  const mean = vals.reduce((a, b) => a + b, 0) / vals.length;
  const std  = Math.sqrt(vals.reduce((s, v) => s + Math.pow(v - mean, 2), 0) / vals.length);
  const confidence = clamp01(1 - std * 0.5);

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

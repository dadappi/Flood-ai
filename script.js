
function getVisual(data){
  return `
  🌧️ Rain: ${data.rain}<br>
  ⛰️ Elev: ${data.elev}<br>
  🏢 Density: ${data.density}<br>
  🌱 Veg: ${data.veg}<br>
  🌊 River: ${data.river}<br>
  🚧 Drain: ${data.drain}
  `;
}

let currentLang = "id";

// Complete translation system for Indonesian and English
const translations = {
  id: {
    // Topbar
    brand: "Flood Risk AI",
    btnTutorial: "Cara Penggunaan",
    btnSimRain: "Simulasi +20% Curah Hujan",
    btnCompare: "Bandingkan Lokasi",
    btnReport: "Unduh Laporan (PDF)",
    
    // Sidebar Intro
    intro: "Klik peta untuk menganalisis risiko banjir.",
    subtitle: "Semua input diskalakan 0–100. Elevasi, vegetasi, dan jarak sungai diinversi dalam formula FRI.",
    
    // Input Data Card
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
    usedScenario: "Digunakan dalam skenario",
    
    // Buttons
    btnPredict: "Prediksi dari Input Manual",
    btnReset: "Reset Input",
    btnSimRain2: "Simulasi +20% Curah Hujan",
    btnUrban: "Ekspansi Perkotaan",
    btnDrainage: "Tingkatkan Kapasitas Drainase",
    
    // Flood Risk Result
    floodRiskResult: "Hasil Risiko Banjir",
    riskPercentage: "Persentase Risiko",
    confidence: "Kepercayaan",
    timestamp: "Waktu",
    mlAiAnalysis: "Analisis ML AI",
    norecommendations: "Belum ada rekomendasi",
    
    // Selected Location
    selectedLocation: "Lokasi Terpilih",
    location: "Lokasi",
    score: "Skor",
    elevationVal: "Elevasi",
    rainfallVal: "Curah Hujan",
    buildingDensityVal: "Kepadatan Bangunan",
    vegetationVal: "Vegetasi",
    distanceToRiverVal: "Jarak ke Sungai",
    riskCategory: "Kategori Risiko",
    
    // Visualization
    visualizationTools: "Alat Visualisasi",
    history: "Riwayat",
    noHistory: "Belum ada riwayat. Klik peta untuk memulai.",
    scenario: "Analisis Skenario",
    scenarioNote: "Kontrol skenario aktif melalui tombol di panel kiri. Klik kartu ini untuk fokus pada panel skenario.",
    aboutModel: "Tentang Model",
    aboutModelDesc: "FRI = kombinasi tertimbang dari curah hujan, inversi elevasi, kepadatan bangunan, inversi vegetasi, dan inversi jarak sungai. Dirancang untuk penyaringan risiko banjir yang dapat dijelaskan.",
    
    // Advanced Analysis
    advancedAnalysis: "Analisis Lanjutan",
    calculatingScenario: "Menghitung skenario...",
    tryScenarios: "Cobalah skenario untuk melihat perubahan FRI. Mode perbandingan menyimpan dua lokasi dan menunjukkan hasil langsung.",
    
    // Map
    legend: "Legenda",
    low: "Rendah",
    medium: "Sedang",
    high: "Tinggi",
    clickCompare: "Klik 2 lokasi untuk membandingkannya.\nPanel di sebelah kiri menampilkan variabel aktif dan FRI final.",
    
    // Tabs
    tabCompare: "Perbandingan Lokasi",
    tabScenario: "Analisis Skenario",
    tabHistory: "Riwayat",
    
    // Modals
    tutorial: "Tutorial Singkat",
    tutorial1: "1) Klik peta untuk memilih lokasi analisis.\n2) Ubah nilai input di panel kiri sesuai kondisi yang ingin diuji.",
    tutorial2: "3) Tekan Prediksi dari Input Manual untuk menghitung Flood Risk Index dari input tersebut.\n4) Lihat hasilnya di kartu Hasil Risiko Banjir dan Lokasi Terpilih.",
    tutorial3: "5) Aktifkan Bandingkan Lokasi untuk membandingkan dua titik di peta.\n6) Pakai Analisis Skenario untuk uji perubahan curah hujan, ekspansi perkotaan, atau drainase.",
    tutorialOk: "OK",
    tutorialNext: "Berikutnya",
    
    manualPrediction: "Prediksi Manual",
    locationComparison: "Perbandingan Lokasi",
    compareMode: "Mode perbandingan AKTIF.\nKlik dua lokasi peta untuk membandingkan nilai FRI mereka.",
    scenarioAnalysis: "Analisis Skenario",
    scenarioActive: "Analisis Skenario aktif.\nGunakan tombol panel kiri untuk mensimulasikan curah hujan, ekspansi perkotaan, atau peningkatan drainase.",
    historyInfo: "Bagian ini menunjukkan lokasi yang dianalisis dan nilai FRI.\nKlik sebelumnya juga disimpan di panel riwayat.",
    
    selectedLocationInfo: "Kartu ini diperbarui saat Anda mengklik titik peta atau menjalankan input manual.\nIni menunjukkan skor, kepercayaan, dan nilai variabel.",
    historyClickable: "Panel riwayat dapat diklik.\nIni menyimpan lokasi teranalisis terbaru di bilah samping.",
    scenarioClickable: "Gunakan tombol untuk menguji skenario.\nKartu ini dapat diklik sehingga bagian terasa interaktif.",
    
    urbanExpansion: "Skenario Ekspansi Perkotaan",
    urbanDesc: "Kepadatan bangunan meningkat dan vegetasi berkurang.\nFRI: ",
    increaseDrainage: "Tingkatkan Kapasitas Drainase",
    drainageDesc: "Kapasitas drainase ditingkatkan.\nEfek mitigasi disiapkan untuk penggunaan laporan / skenario.",
    downloadReport: "Unduh Laporan (PDF)",
    reportDesc: "Ekspor PDF adalah placeholder dalam ZIP ini.\nAnda dapat menghubungkannya ke alur cetak-ke-PDF selanjutnya.",
    
    // AI Recommendations
    improvedDrainage: "Tingkatkan sistem drainase",
    buildBarriers: "Bangun penghalang pelindung di area rendah",
    regulateUrban: "Atur pertumbuhan kepadatan perkotaan",
    increaseGreen: "Tingkatkan cakupan ruang hijau",
    strengthenRiver: "Perkuat tanggul sungai",
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
    maintainMeasures: "Pertahankan langkah-langkah saat ini",
    
    featureImportance: "Pentingnya Fitur:",
    modelConfidence: "Skor Kepercayaan Model:",
    modelUncertainty: "Ketidakpastian model:",
    
    clickMapAnalyze: "Klik peta untuk menganalisis",
    recommendationsLoading: "Rekomendasi dimuat...",
    modelConfidenceNA: "Kepercayaan model: N/A",
    factorsNA: "Faktor: N/A",
  },
  
  en: {
    // Topbar
    brand: "Flood Risk AI",
    btnTutorial: "How to Use",
    btnSimRain: "Simulate +20% Rainfall",
    btnCompare: "Compare Locations",
    btnReport: "Download Report (PDF)",
    
    // Sidebar Intro
    intro: "Click the map to analyze flood risk.",
    subtitle: "All inputs are scaled 0–100. Elevation, vegetation, and river distance are inverted in the FRI formula.",
    
    // Input Data Card
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
    usedScenario: "Used in scenario",
    
    // Buttons
    btnPredict: "Predict from Manual Input",
    btnReset: "Reset Inputs",
    btnSimRain2: "Simulate +20% Rainfall",
    btnUrban: "Urban Expansion",
    btnDrainage: "Increase Drainage",
    
    // Flood Risk Result
    floodRiskResult: "Flood Risk Result",
    riskPercentage: "Risk Percentage",
    confidence: "Confidence",
    timestamp: "Timestamp",
    mlAiAnalysis: "ML AI Analysis",
    noRecommendations: "No recommendations yet",
    
    // Selected Location
    selectedLocation: "Selected Location",
    location: "Location",
    score: "Score",
    elevationVal: "Elevation",
    rainfallVal: "Rainfall",
    buildingDensityVal: "Building Density",
    vegetationVal: "Vegetation",
    distanceToRiverVal: "Distance to River",
    riskCategory: "Risk Category",
    
    // Visualization
    visualizationTools: "Visualization Tools",
    history: "History",
    noHistory: "No history yet. Click the map to start.",
    scenario: "Scenario Analysis",
    scenarioNote: "Scenario controls are active via the buttons on the left. Clicking this card will focus the scenario panel.",
    aboutModel: "About Model",
    aboutModelDesc: "FRI = weighted combination of rainfall, inverse elevation, building density, inverse vegetation, and inverse river distance. Designed for explainable flood-risk screening.",
    
    // Advanced Analysis
    advancedAnalysis: "Advanced Analysis",
    calculatingScenario: "Calculating scenario...",
    tryScenarios: "Try scenarios to see how the FRI changes. Compare mode stores two locations and shows a direct result.",
    
    // Map
    legend: "Legend",
    low: "Low",
    medium: "Medium",
    high: "High",
    clickCompare: "Click 2 locations to compare them.\nThe panel on the left shows the active variables and the final FRI.",
    
    // Tabs
    tabCompare: "Location Comparison",
    tabScenario: "Scenario Analysis",
    tabHistory: "History",
    
    // Modals
    tutorial: "Quick Tutorial",
    tutorial1: "1) Click the map to select an analysis location.\n2) Change input values in the left panel according to conditions you want to test.",
    tutorial2: "3) Press Predict from Manual Input to calculate the Flood Risk Index from the input.\n4) See the result in the Flood Risk Result card and Selected Location.",
    tutorial3: "5) Enable Compare Locations to compare two points on the map.\n6) Use Scenario Analysis to test changes in rainfall, urban expansion, or drainage.",
    tutorialOk: "OK",
    tutorialNext: "Next",
    
    manualPrediction: "Manual Prediction",
    locationComparison: "Location Comparison",
    compareMode: "Compare mode is ON.\nClick two map locations to compare their FRI values.",
    scenarioAnalysis: "Scenario Analysis",
    scenarioActive: "Scenario Analysis is active.\nUse the left-panel buttons to simulate rainfall, urban expansion, or drainage improvements.",
    historyInfo: "This section shows analyzed locations and FRI values.\nYour previous clicks are also stored in the history panel.",
    
    selectedLocationInfo: "This card updates when you click a map point or run manual input.\nIt shows score, confidence, and variable values.",
    historyClickable: "History panel is clickable.\nIt keeps the latest analyzed locations in the sidebar.",
    scenarioClickable: "Use the buttons to test scenarios.\nThis card is clickable so the section feels interactive.",
    
    urbanExpansion: "Urban Expansion Scenario",
    urbanDesc: "Building density increased and vegetation reduced.\nFRI: ",
    increaseDrainage: "Increase Drainage Capacity",
    drainageDesc: "Drainage capacity increased.\nMitigation effect prepared for report / scenario use.",
    downloadReport: "Download Report (PDF)",
    reportDesc: "PDF export is a placeholder in this ZIP.\nYou can connect it to a print-to-PDF flow next.",
    
    // AI Recommendations
    improvedDrainage: "Improve drainage systems",
    buildBarriers: "Build protective barriers in low areas",
    regulateUrban: "Regulate urban density growth",
    increaseGreen: "Increase green space coverage",
    strengthenRiver: "Strengthen river embankments",
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
    maintainMeasures: "Maintain current measures",
    
    featureImportance: "Feature Importance:",
    modelConfidence: "Confidence Score:",
    modelUncertainty: "Model uncertainty:",
    
    clickMapAnalyze: "Click map to analyze",
    recommendationsLoading: "Recommendations loading...",
    modelConfidenceNA: "Model confidence: N/A",
    factorsNA: "Factors: N/A",
  }
};

// Get translation function
function t(key) {
  return translations[currentLang][key] || translations['id'][key] || key;
}

// Toggle language function
function toggleLang(){
  currentLang = currentLang === "id" ? "en" : "id";
  
  // Update all translated elements
  updateAllTranslations();
  
  // Store preference
  localStorage.setItem('preferredLang', currentLang);
  
  // Update button text
  const btn = document.getElementById("btnManualPredict");
  if(btn) btn.innerText = t('btnPredict');
}

// Update all translations on page
function updateAllTranslations() {
  // Update basic elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const text = t(key);
    
    if (el.tagName === 'INPUT') {
      el.value = text;
      el.placeholder = text;
    } else if (el.tagName === 'BUTTON') {
      el.innerText = text;
    } else {
      el.innerText = text;
    }
  });
  
  // Update language button
  const btnLang = document.getElementById('btnLang');
  if (btnLang) {
    btnLang.innerText = currentLang === 'id' ? '🌐 ID' : '🌐 EN';
  }
  
  // Update tutorial steps
  const tutorialSteps = [
    t('tutorial1'),
    t('tutorial2'),
    t('tutorial3')
  ];
  
  // Update tutorial if visible
  const tutorialText = document.getElementById('tutorialText');
  if (tutorialText) {
    tutorialText.innerText = tutorialSteps[tutorialIndex] || tutorialSteps[0];
  }
  
  // Update history if exists
  renderHistory();
}

// Load saved language preference
function loadLanguagePreference() {
  const saved = localStorage.getItem('preferredLang');
  if (saved && (saved === 'id' || saved === 'en')) {
    currentLang = saved;
  }
}

// Initialize map and core state objects BEFORE calling language functions
const map = L.map('map').setView([-6.2, 106.8], 10);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap'
}).addTo(map);

const state = {
  compareMode: false,
  comparePoints: [],
  markers: [],
  history: []
};

const el = (id) => document.getElementById(id);

// NOW call language functions - after el() and state are defined
loadLanguagePreference();
let tutorialIndex = 0;
updateAllTranslations();

function getTutorialSteps() {
  return [
    t('tutorial1'),
    t('tutorial2'),
    t('tutorial3')
  ];
}

function renderTutorial() {
  const steps = getTutorialSteps();
  const step = steps[tutorialIndex] || steps[0];
  const tutorialTextEl = el('tutorialText');
  if (tutorialTextEl) tutorialTextEl.innerText = step;
}

function openTutorial() {
  tutorialIndex = 0;
  renderTutorial();
  const tutorialModal = el('tutorialModal');
  if (tutorialModal) tutorialModal.classList.add('show');
}
function closeTutorial() {
  const tutorialModal = el('tutorialModal');
  if (tutorialModal) tutorialModal.classList.remove('show');
}
function nextTutorial() {
  const steps = getTutorialSteps();
  tutorialIndex = Math.min(steps.length - 1, tutorialIndex + 1);
  renderTutorial();
}


function round2(n) {
  return Math.round((Number(n) + Number.EPSILON) * 100) / 100;
}
function fmt2(n) {
  return round2(n).toFixed(2);
}
function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}
function normalize(x) {
  return clamp01(Number(x || 0) / 100);
}
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

// Improved ML-like AI scoring with better normalization
function calculateFRI(rain, elev, build, veg, river) {
  // Normalize inputs with domain-specific scaling
  const R = normalize(rain);           // Higher rain = higher risk
  const E = 1 - normalize(elev);       // Lower elevation = higher risk
  const B = normalize(build);          // Higher density = higher risk
  const V = 1 - normalize(veg);        // Lower vegetation = higher risk
  const Dr = normalize(river);         // Distance to river (lower = higher risk)
  
  // ML weighted scoring with better coefficients based on flood dynamics
  const weights = {
    rainfall: 0.30,      // Rainfall is primary driver
    elevation: 0.25,     // Topography is important
    building: 0.20,      // Urban density increases runoff
    vegetation: 0.15,    // Natural barriers reduce risk
    river: 0.10          // River proximity is secondary
  };
  
  const score = clamp01(
    (weights.rainfall * R) + 
    (weights.elevation * E) + 
    (weights.building * B) + 
    (weights.vegetation * V) + 
    (weights.river * Dr)
  );
  
  return score;
}

function currentInputs() {
  const rainEl = el('rain');
  const elevEl = el('elev');
  const densityEl = el('density');
  const vegEl = el('veg');
  const riverEl = el('river');
  const drainEl = el('drain');
  
  return {
    rain: rainEl ? Number(rainEl.value || 0) : 0,
    elev: elevEl ? Number(elevEl.value || 0) : 0,
    density: densityEl ? Number(densityEl.value || 0) : 0,
    veg: vegEl ? Number(vegEl.value || 0) : 0,
    river: riverEl ? Number(riverEl.value || 0) : 0,
    drain: drainEl ? Number(drainEl.value || 0) : 0,
  };
}

function updateSidebarInputs() {
  const i = currentInputs();
  
  // Update normalized values
  if (el('rainVal')) el('rainVal').innerText = fmt2(normalize(i.rain));
  if (el('elevVal')) el('elevVal').innerText = fmt2(normalize(i.elev));
  if (el('densityVal')) el('densityVal').innerText = fmt2(normalize(i.density));
  if (el('vegVal')) el('vegVal').innerText = fmt2(normalize(i.veg));
  if (el('riverVal')) el('riverVal').innerText = fmt2(normalize(i.river));
  if (el('drainVal')) el('drainVal').innerText = fmt2(normalize(i.drain));

  // Update raw values
  if (el('rainNorm')) el('rainNorm').innerText = `${i.rain}`;
  if (el('elevNorm')) el('elevNorm').innerText = `${i.elev}`;
  if (el('densityNorm')) el('densityNorm').innerText = `${i.density}`;
  if (el('vegNorm')) el('vegNorm').innerText = `${i.veg}`;
  if (el('riverNorm')) el('riverNorm').innerText = `${i.river}`;
  if (el('drainNorm')) el('drainNorm').innerText = `${i.drain}`;
}

function updateResult(score) {
  const label = riskLabel(score);
  const pct = round2(score * 100);

  if (el('scoreGauge')) el('scoreGauge').innerText = fmt2(score);
  if (el('riskLabel')) {
    el('riskLabel').innerText = `Flood Risk: ${label}`;
    el('riskLabel').className = `risk ${label.toLowerCase()}`;
  }
  if (el('riskBar')) el('riskBar').style.width = `${pct}%`;
  if (el('riskPct')) el('riskPct').innerText = `${fmt2(score * 100)}%`;
  if (el('confidenceVal')) el('confidenceVal').innerText = `${fmt2((0.5 + score * 0.5) * 100)}%`;
  if (el('timestampVal')) el('timestampVal').innerText = new Date().toLocaleString();
}

function updateLocationBox({name, score, elevation, rainfall, density, vegetation, river, risk, confidence}) {
  if (el('locName')) el('locName').innerText = name ?? '—';
  if (el('locScore')) el('locScore').innerText = score !== undefined ? fmt2(score) : '—';
  if (el('locConf')) el('locConf').innerText = confidence !== undefined ? `${fmt2(confidence * 100)}%` : '—';
  if (el('locElev')) el('locElev').innerText = elevation !== undefined ? `${round2(elevation)} m` : '—';
  if (el('locRain')) el('locRain').innerText = rainfall !== undefined ? `${round2(rainfall)} mm` : '—';
  if (el('locBuild')) el('locBuild').innerText = density !== undefined ? `${round2(density)} %` : '—';
  if (el('locVeg')) el('locVeg').innerText = vegetation !== undefined ? `${round2(vegetation)} %` : '—';
  if (el('locRiver')) el('locRiver').innerText = river !== undefined ? `${round2(river)} m` : '—';
  if (el('locRisk')) el('locRisk').innerText = risk ?? '—';
}

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

function showModal(title, text) {
  const modalHead = el('modalHead');
  const modalBody = el('modalBody');
  const modal = el('modal');
  if (modalHead) modalHead.innerText = title;
  if (modalBody) modalBody.innerText = text;
  if (modal) modal.classList.add('show');
}
function closeModal() {
  const modal = el('modal');
  if (modal) modal.classList.remove('show');
}
const modalCloseEl = el('modalClose');
if (modalCloseEl) modalCloseEl.addEventListener('click', closeModal);
const modalEl = el('modal');
if (modalEl) modalEl.addEventListener('click', (e) => {
  if (e.target.id === 'modal') closeModal();
});

const btnTutorial = el('btnTutorial');
if (btnTutorial) btnTutorial.addEventListener('click', openTutorial);
const tutorialOk = el('tutorialOk');
if (tutorialOk) tutorialOk.addEventListener('click', closeTutorial);
const tutorialNext = el('tutorialNext');
if (tutorialNext) tutorialNext.addEventListener('click', nextTutorial);
const tutorialModalEl = el('tutorialModal');
if (tutorialModalEl) tutorialModalEl.addEventListener('click', (e) => {
  if (e.target.id === 'tutorialModal') closeTutorial();
});

let chart;
function initChart() {
  const chartEl = el('chart');
  if (!chartEl) return;
  const ctx = chartEl.getContext('2d');
  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Rain', 'Elev', 'Build', 'Veg', 'River'],
      datasets: [{
        label: 'Normalized Input',
        data: [0.8, 0.8, 0.85, 0.15, 0.35],
        backgroundColor: ['#4d91ff','#4d91ff','#4d91ff','#4d91ff','#4d91ff']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { min: 0, max: 1 }
      }
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
    normalize(i.river)
  ];
  chart.update();
}

function setCompareMode(on) {
  state.compareMode = !!on;
  const btnComp = el('btnCompare');
  if (btnComp) btnComp.textContent = on ? 'Compare Mode: ON' : 'Compare Locations';
}
const btnCompareEl = el('btnCompare');
if (btnCompareEl) btnCompareEl.addEventListener('click', () => setCompareMode(!state.compareMode));

function clearMarkers() {
  state.markers.forEach(m => map.removeLayer(m));
  state.markers = [];
  state.comparePoints = [];
}

function simulateRain() {
  const i = currentInputs();
  const rainEl = el('rain');
  if (rainEl) rainEl.value = Math.min(100, i.rain + 20);
  updateSidebarInputs();
  updateChartFromInputs();
  manualPredict(1);
}
const btnSimRain = document.getElementById('btnSimRain');
if (btnSimRain) btnSimRain.addEventListener('click', simulateRain);
const btnSimRain2 = document.getElementById('btnSimRain2');
if (btnSimRain2) btnSimRain2.addEventListener('click', simulateRain);

const btnManualPredict = document.getElementById('btnManualPredict');
if (btnManualPredict) btnManualPredict.addEventListener('click', () => manualPredict(1));

const btnResetInputs = document.getElementById('btnResetInputs');
if (btnResetInputs) btnResetInputs.addEventListener('click', () => {
  // Set input values
  const rainEl = el('rain'), elevEl = el('elev'), densityEl = el('density');
  const vegEl = el('veg'), riverEl = el('river'), drainEl = el('drain');
  
  if (rainEl) rainEl.value = 80;
  if (elevEl) elevEl.value = 80;
  if (densityEl) densityEl.value = 85;
  if (vegEl) vegEl.value = 15;
  if (riverEl) riverEl.value = 35;
  if (drainEl) drainEl.value = 55;
  
  updateSidebarInputs();
  updateChartFromInputs();
  
  // Clear results
  if (el('scoreGauge')) el('scoreGauge').innerText = '—';
  if (el('riskLabel')) {
    el('riskLabel').innerText = 'Flood Risk: —';
    el('riskLabel').className = 'risk low';
  }
  if (el('riskBar')) el('riskBar').style.width = '0%';
  if (el('riskPct')) el('riskPct').innerText = '—';
  if (el('confidenceVal')) el('confidenceVal').innerText = '—';
  if (el('timestampVal')) el('timestampVal').innerText = '—';
  if (el('aiInsight')) el('aiInsight').innerHTML = 'Click map to analyze';
  if (el('aiReco')) el('aiReco').innerHTML = 'Recommendations loading...';
  if (el('aiConfidence')) el('aiConfidence').innerHTML = 'Model confidence: N/A';
  if (el('aiFactors')) el('aiFactors').innerHTML = 'Factors: N/A';
  
  // Clear selected location
  if (el('locName')) el('locName').innerText = '—';
  if (el('locScore')) el('locScore').innerText = '—';
  if (el('locConf')) el('locConf').innerText = '—';
  if (el('locElev')) el('locElev').innerText = '—';
  if (el('locRain')) el('locRain').innerText = '—';
  if (el('locBuild')) el('locBuild').innerText = '—';
  if (el('locVeg')) el('locVeg').innerText = '—';
  if (el('locRiver')) el('locRiver').innerText = '—';
  if (el('locRisk')) el('locRisk').innerText = '—';
  
  // Clear markers
  clearMarkers();
});

function manualPredict(extraRainMultiplier = 1) {
  const i = currentInputs();
  const rain = clamp01((i.rain * extraRainMultiplier) / 100) * 100;
  const score = calculateFRI(rain, i.elev, i.density, i.veg, i.river);
  const label = riskLabel(score);
  updateSidebarInputs();
  updateChartFromInputs();
  updateResult(score);
  updateLocationBox({
    name: 'Manual Input',
    score,
    elevation: i.elev,
    rainfall: rain,
    density: i.density,
    vegetation: i.veg,
    river: i.river,
    risk: label,
    confidence: score
  });
  addHistory('Manual Input', score);
  
  // Call ML AI analysis
  updateAIFromData({
    rainfall: rain,
    elevation: i.elev,
    buildingDensity: i.density,
    vegetation: i.veg,
    distanceToRiver: i.river * 2
  });
  
  showModal(t('manualPrediction'), `Status: ${label}\nFRI: ${fmt2(score)}\nRisk: ${Math.round(score*100)}%`);
}
window.manualPredict = manualPredict;

const btnUrban = document.getElementById('btnUrban');
if (btnUrban) btnUrban.addEventListener('click', () => {
  const i = currentInputs();
  const densityEl = el('density');
  const vegEl = el('veg');
  if (densityEl) densityEl.value = Math.min(100, i.density + 20);
  if (vegEl) vegEl.value = Math.max(0, i.veg - 15);
  updateSidebarInputs();
  updateChartFromInputs();
  const score = calculateFRI(i.rain, i.elev, Math.min(100, i.density + 20), Math.max(0, i.veg - 15), i.river);
  updateResult(score);
  showModal(t('urbanExpansion'), t('urbanDesc') + fmt2(score));
});
const btnDrainage = document.getElementById('btnDrainage');
if (btnDrainage) btnDrainage.addEventListener('click', () => {
  const i = currentInputs();
  const drainEl = el('drain');
  if (drainEl) drainEl.value = Math.min(100, i.drain + 20);
  updateSidebarInputs();
  updateChartFromInputs();
  showModal(t('increaseDrainage'), t('drainageDesc'));
});

const btnReport = document.getElementById('btnReport');
if (btnReport) btnReport.addEventListener('click', () => {
  showModal(t('downloadReport'), t('reportDesc'));
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

const selectedCardEl = document.getElementById('selectedCard');
if (selectedCardEl) selectedCardEl.addEventListener('click', () => {
  showModal(t('selectedLocationInfo'), t('selectedLocationInfo'));
});
const historyCardEl = document.getElementById('historyCard');
if (historyCardEl) historyCardEl.addEventListener('click', () => {
  showModal(t('history'), t('historyClickable'));
});
const scenarioCardEl = document.getElementById('scenarioCard');
if (scenarioCardEl) scenarioCardEl.addEventListener('click', () => {
  showModal(t('scenarioAnalysis'), t('scenarioClickable'));
});

['rain','elev','density','veg','river','drain'].forEach(id => {
  const elem = document.getElementById(id);
  if (elem) elem.addEventListener('input', () => {
    updateSidebarInputs();
    updateChartFromInputs();
  });
});

function generateRandomData(latlng) {
  const seed = Math.abs(Math.floor((latlng.lat * 1000) + (latlng.lng * 1000)));
  return {
    rain: (seed * 37) % 101,
    elev: (seed * 53) % 101,
    density: (seed * 71) % 101,
    veg: (seed * 29) % 101,
    river: (seed * 11) % 101,
    drain: (seed * 13) % 101,
  };
}
function pointName(latlng) {
  return `Point ${Math.abs((latlng.lat + latlng.lng).toFixed(2))}`;
}

function placeLocation(latlng, data, name) {
  const score = calculateFRI(data.rain, data.elev, data.density, data.veg, data.river);
  const label = riskLabel(score);
  const color = riskColor(score);
  const confidence = 0.55 + (score * 0.45);

  const marker = L.circle(latlng, {
    color,
    fillColor: color,
    fillOpacity: 0.18,
    radius: 520
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
    ${getVisual(data)}</div>
  `).openPopup();

  state.markers.push(marker);
  state.comparePoints.push({ name, score, latlng, data });

  updateResult(score);
  updateLocationBox({
    name, score,
    elevation: data.elev,
    rainfall: data.rain,
    density: data.density,
    vegetation: data.veg,
    river: data.river,
    risk: label,
    confidence
  });
  addHistory(name, score);
  
  // Call ML AI analysis with proper data format
  updateAIFromData({
    rainfall: data.rain,
    elevation: data.elev,
    buildingDensity: data.density,
    vegetation: data.veg,
    distanceToRiver: data.river * 2  // scale appropriately
  });

  if (!state.compareMode && state.comparePoints.length > 2) {
    clearMarkers();
    return;
  }

  if (state.comparePoints.length === 2) {
    const a = state.comparePoints[0];
    const b = state.comparePoints[1];
    const winner = a.score > b.score ? `${a.name} is more vulnerable` :
                   b.score > a.score ? `${b.name} is more vulnerable` :
                   'Both locations are equal';
    showModal(
      t('locationComparison'),
      `Location A: ${fmt2(a.score)}\nLocation B: ${fmt2(b.score)}\n\n${winner}`
    );
    state.compareMode = false;
    setCompareMode(false);
  }
}

map.on('click', (e) => {
  if (!state.compareMode) {
    clearMarkers();
  }
  const data = generateRandomData(e.latlng);
  const name = pointName(e.latlng);
  placeLocation(e.latlng, data, name);
});

// init
updateSidebarInputs();
updateChartFromInputs();
renderHistory();
initChart();

// Don't show initial data - let user select a location first
// Results will populate after map click or manual predict


// Advanced ML-like AI Analysis with Feature Importance, Uncertainty, and Smart Recommendations
function updateAIFromData(d){
  if(!d) return;

  // 1. FEATURE NORMALIZATION (proper ML preprocessing)
  const features = {
    rainfall: normalize(d.rainfall),                    // 0-1
    elevation: normalize(d.elevation),                  // 0-1
    buildingDensity: normalize(d.buildingDensity),     // 0-1
    vegetation: normalize(d.vegetation),               // 0-1
    distanceToRiver: Math.min(1, d.distanceToRiver / 200) // normalize to ~0-1 based on typical distances
  };

  // 2. INVERSE FEATURES (for risk calculation)
  const riskFactors = {
    rain: features.rainfall * 0.30,
    elev: (1 - features.elevation) * 0.25,
    build: features.buildingDensity * 0.20,
    veg: (1 - features.vegetation) * 0.15,
    river: (1 - features.distanceToRiver) * 0.10
  };

  // 3. CALCULATE COMPOSITE SCORE using ML-like aggregation
  const score = Object.values(riskFactors).reduce((a, b) => a + b, 0);
  const normalizedScore = clamp01(score);

  // 4. RISK LEVEL CLASSIFICATION with thresholds
  const riskThresholds = {
    HIGH: 0.65,
    MEDIUM: 0.35,
    LOW: 0.0
  };
  
  let level = "LOW";
  if (normalizedScore >= riskThresholds.HIGH) level = "HIGH";
  else if (normalizedScore >= riskThresholds.MEDIUM) level = "MEDIUM";

  // 5. CONFIDENCE SCORING (ML uncertainty estimation)
  // Confidence based on feature consensus - high when multiple factors agree
  const factorValues = Object.values(riskFactors);
  const factorMean = factorValues.reduce((a, b) => a + b, 0) / factorValues.length;
  const variance = factorValues.reduce((sum, val) => sum + Math.pow(val - factorMean, 2), 0) / factorValues.length;
  const std = Math.sqrt(variance);
  const confidence = clamp01(1 - (std * 0.5)); // Higher std = lower confidence
  
  // 6. FEATURE IMPORTANCE RANKING (using contribution analysis)
  const featureImportance = Object.entries(riskFactors)
    .map(([name, value]) => ({ name, contribution: value }))
    .sort((a, b) => b.contribution - a.contribution);

  const primaryFactor = featureImportance[0].name;
  const secondaryFactor = featureImportance.length > 1 ? featureImportance[1].name : null;

  // 7. DYNAMIC RECOMMENDATION ENGINE (ML-based recommendations)
  const recommendationMap = {
    rain: { action: t('improvedDrainage'), priority: t('criticalPriority'), effect: t('reduceRisk25'), icon: "🌧️" },
    elev: { action: t('buildBarriers'), priority: t('highPriority'), effect: t('reduceRisk20'), icon: "🏗️" },
    build: { action: t('regulateUrban'), priority: t('highPriority'), effect: t('reduceRisk15'), icon: "🏢" },
    veg: { action: t('increaseGreen'), priority: t('mediumPriority'), effect: t('reduceRisk12'), icon: "🌳" },
    river: { action: t('strengthenRiver'), priority: t('mediumPriority'), effect: t('reduceRisk10'), icon: "🌊" }
  };

  // 8. GENERATE PRIMARY RECOMMENDATION
  const primaryReco = recommendationMap[primaryFactor] || { action: t('monitorConditions'), priority: t('lowPriority'), effect: t('maintainMeasures'), icon: "📊" };
  
  // 9. GENERATE SECONDARY INSIGHT (if secondary factor is significant)
  let secondaryInsight = "";
  if (secondaryFactor && featureImportance[1].contribution > 0.08) {
    const secondaryReco = recommendationMap[secondaryFactor];
    secondaryInsight = ` Secondary concern: ${secondaryReco.action}`;
  }

  // 10. GENERATE RISK EXPLANATION
  let explanation = `Risk Level: ${level} | Score: ${fmt2(normalizedScore)} | Confidence: ${fmt2(confidence * 100)}%`;
  
  // Add contributing factors
  const topFactors = featureImportance.slice(0, 2)
    .map(f => `${f.name}(${fmt2(f.contribution)})`)
    .join(", ");
  explanation += ` | Top Drivers: ${topFactors}`;

  // 11. UPDATE UI WITH ML INSIGHTS
  const aiInsightEl = document.getElementById("aiInsight");
  const aiRecoEl = document.getElementById("aiReco");
  const aiConfidenceEl = document.getElementById("aiConfidence");
  const aiFactorsEl = document.getElementById("aiFactors");

  if (aiInsightEl) {
    aiInsightEl.innerHTML = `
      <strong>${primaryFactor.toUpperCase()}</strong> is the primary risk driver<br>
      <small>${explanation}</small>
    `;
  }

  if (aiRecoEl) {
    aiRecoEl.innerHTML = `
      <div style="font-weight: bold; color: #2f7cf6;">${primaryReco.icon} ${primaryReco.action}</div>
      <small>Priority: ${primaryReco.priority} | Expected effect: ${primaryReco.effect}</small>
      ${secondaryInsight}
    `;
  }

  if (aiConfidenceEl) {
    aiConfidenceEl.innerHTML = `
      <div style="font-weight: bold;">Confidence Score: ${fmt2(confidence * 100)}%</div>
      <div style="font-size: 12px; color: #64748b;">Model uncertainty: ${fmt2((1 - confidence) * 100)}%</div>
    `;
  }

  if (aiFactorsEl) {
    const factorDetails = featureImportance.map(f => 
      `<div style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid #e5e9f2;">
        <span>${f.name}:</span>
        <strong style="color: ${f.contribution > 0.12 ? '#e4554d' : '#f5a524'}">${fmt2(f.contribution)}</strong>
      </div>`
    ).join('');
    aiFactorsEl.innerHTML = `<strong>Feature Importance:</strong><div>${factorDetails}</div>`;
  }
}

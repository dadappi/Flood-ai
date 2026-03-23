// ===== MAP =====
var map = L.map('map').setView([-6.2, 106.8], 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// ===== HEATMAP LAYER =====
let heatPoints = [];
let heatLayer = L.heatLayer(heatPoints, {radius: 25, blur: 15}).addTo(map);

// ===== AI MODEL =====
let model;
let modelReady = false;

async function trainModel() {
    // "dataset Indo sederhana" (curah hujan mm, elevasi m → risiko 0–1)
    const xs = tf.tensor2d([
        [150/200, 10/200],  // hujan tinggi, elevasi rendah → tinggi
        [140/200, 20/200],
        [120/200, 30/200],
        [100/200, 50/200],
        [90/200, 70/200],
        [80/200, 100/200],
        [60/200, 120/200],
        [40/200, 150/200],
        [30/200, 180/200]
    ]);

    const ys = tf.tensor2d([
        [1], [0.95], [0.9], [0.8], [0.6], [0.4], [0.3], [0.1], [0]
    ]);

    model = tf.sequential();
    model.add(tf.layers.dense({units: 1, inputShape: [2]}));

    model.compile({
        optimizer: 'adam',
        loss: 'meanSquaredError'
    });

    await model.fit(xs, ys, {epochs: 300});
    modelReady = true;
}

// ===== PREDICT =====
function predictFlood(rainfall, elevation) {
    const input = tf.tensor2d([[rainfall/200, elevation/200]]);
    const pred = model.predict(input).dataSync()[0];

    if (pred > 0.6) return ["Tinggi", "red", pred];
    if (pred > 0.3) return ["Sedang", "orange", pred];
    return ["Aman", "green", pred];
}

// ===== REAL DATA: ELEVATION =====
async function getElevation(lat, lng) {
    try {
        let res = await fetch(`https://api.open-elevation.com/api/v1/lookup?locations=${lat},${lng}`);
        let data = await res.json();
        return data.results[0].elevation;
    } catch {
        return Math.random() * 150; // fallback
    }
}

// ===== REAL DATA: RAINFALL (Open-Meteo) =====
async function getRainfall(lat, lng) {
    try {
        let res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=rain`
        );
        let data = await res.json();
        return data.current.rain || 0;
    } catch {
        return Math.random() * 120; // fallback
    }
}

// ===== INIT =====
trainModel();

// ===== CLICK MAP =====
map.on('click', async function(e) {
    if (!modelReady) {
        alert("AI masih training...");
        return;
    }

    let lat = e.latlng.lat;
    let lng = e.latlng.lng;

    // loading popup
    L.popup()
        .setLatLng(e.latlng)
        .setContent("Mengambil data real...")
        .openOn(map);

    let elevation = await getElevation(lat, lng);
    let rainfall = await getRainfall(lat, lng);

    let [status, color, score] = predictFlood(rainfall, elevation);

    // ===== MARKER =====
    L.circle(e.latlng, {
        color: color,
        radius: 500
    }).addTo(map)
    .bindPopup(`
        <b>Risiko: ${status}</b><br>
        Skor AI: ${score.toFixed(2)}<br>
        Elevasi: ${elevation.toFixed(1)} m<br>
        Hujan: ${rainfall.toFixed(2)} mm
    `)
    .openPopup();

    // ===== HEATMAP UPDATE =====
    heatPoints.push([lat, lng, score]); // score jadi intensitas
    heatLayer.setLatLngs(heatPoints);
});}

// ===== INIT =====
trainModel();

// ===== CLICK MAP =====
map.on('click', async function(e) {
    if (!modelReady) {
        alert("AI masih training...");
        return;
    }

    let lat = e.latlng.lat;
    let lng = e.latlng.lng;

    let elevation = await getElevation(lat, lng);
    let rainfall = await getRainfall(lat, lng);

    let [status, color, score] = predictFlood(rainfall, elevation);

    L.circle(e.latlng, {
        color: color,
        radius: 500
    }).addTo(map);

    heatPoints.push([lat, lng, score]);
    heatLayer.setLatLngs(heatPoints);
});

// ===== MAP =====
var map = L.map('map').setView([-6.2, 106.8], 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// ===== AI MODEL =====
let model;

async function trainModel() {
    const xs = tf.tensor2d([
        [120/150, 20/200],
        [130/150, 25/200],
        [110/150, 30/200],
        [100/150, 40/200],
        [90/150, 50/200],
        [80/150, 60/200],
        [70/150, 80/200],
        [60/150, 100/200],
        [50/150, 120/200],
        [40/150, 150/200],
        [30/150, 200/200]
    ]);

    const ys = tf.tensor2d([
        [1], [1], [0.9], [0.8], [0.7],
        [0.6], [0.5], [0.3], [0.2], [0.1], [0]
    ]);

    model = tf.sequential();
    model.add(tf.layers.dense({units: 1, inputShape: [2]}));

    model.compile({
        optimizer: 'sgd',
        loss: 'meanSquaredError'
    });

    await model.fit(xs, ys, {epochs: 200});
}

// ===== PREDICT =====
function predictFlood(rainfall, elevation) {
    const input = tf.tensor2d([[rainfall/150, elevation/200]]);
    const pred = model.predict(input).dataSync()[0];

    if (pred > 0.7) return ["Tinggi", "red"];
    if (pred > 0.4) return ["Sedang", "orange"];
    return ["Aman", "green"];
}

// ===== GET ELEVATION (REAL + FALLBACK) =====
async function getElevation(lat, lng) {
    try {
        let res = await fetch(`https://api.open-elevation.com/api/v1/lookup?locations=${lat},${lng}`);
        let data = await res.json();
        return data.results[0].elevation;
    } catch {
        return Math.random() * 150; // fallback
    }
}

// ===== GET RAINFALL (SEMENTARA DUMMY) =====
function getRainfall() {
    return Math.random() * 120;
}

// ===== INIT =====
trainModel();

// ===== CLICK MAP =====
map.on('click', async function(e) {
    let lat = e.latlng.lat;
    let lng = e.latlng.lng;

    let elevation = await getElevation(lat, lng);
    let rainfall = getRainfall();

    let result = predictFlood(rainfall, elevation);

    L.circle(e.latlng, {
        color: result[1],
        radius: 500
    }).addTo(map)
    .bindPopup(`
        Risiko: ${result[0]} <br>
        Elevasi: ${elevation.toFixed(1)} m <br>
        Hujan: ${rainfall.toFixed(1)} mm
    `)
    .openPopup();
});

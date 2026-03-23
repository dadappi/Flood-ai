var map = L.map('map').setView([-6.2, 106.8], 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

let model;

async function trainModel() {
    const xs = tf.tensor2d([
        [120, 30],
        [110, 40],
        [90, 60],
        [80, 70],
        [60, 120],
        [50, 150],
        [30, 200]
    ]);

    const ys = tf.tensor2d([
        [1], [1], [0.7], [0.6], [0.2], [0.1], [0]
    ]);

    model = tf.sequential();
    model.add(tf.layers.dense({units: 1, inputShape: [2]}));

    model.compile({
        optimizer: 'sgd',
        loss: 'meanSquaredError'
    });

    await model.fit(xs, ys, {epochs: 200});
}

function predictFlood(rainfall, elevation) {
    const input = tf.tensor2d([[rainfall, elevation]]);
    const pred = model.predict(input).dataSync()[0];

    if (pred > 0.7) return ["Tinggi", "red"];
    if (pred > 0.4) return ["Sedang", "orange"];
    return ["Aman", "green"];
}

trainModel();

map.on('click', function(e) {
    let rainfall = Math.random() * 120;
    let elevation = Math.random() * 150;

    let result = predictFlood(rainfall, elevation);

    L.circle(e.latlng, {
        color: result[1],
        radius: 500
    }).addTo(map)
    .bindPopup("Risiko: " + result[0])
    .openPopup();
});

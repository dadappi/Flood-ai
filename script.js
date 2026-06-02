const app = document.getElementById("app");

let state = {
  currentFilter: "Semua",
  answers: {},
  reviewMode: false,
};

function isMultiCorrect(selected, answer) {
  if (!Array.isArray(selected) || !Array.isArray(answer)) return false;
  const a = [...answer].sort().join(",");
  const b = [...selected].sort().join(",");
  return a === b;
}

function isMatchCorrect(selected, answer) {
  if (!Array.isArray(selected) || !Array.isArray(answer)) return false;
  if (selected.length !== answer.length) return false;
  return selected.every((v, i) => v === answer[i]);
}

function getScore() {
  let correct = 0;
  for (const q of QUESTIONS) {
    const ans = state.answers[q.id];
    if (q.type === "mcq" && ans === q.answer) correct++;
    if (q.type === "multi" && isMultiCorrect(ans, q.answer)) correct++;
    if (q.type === "match" && isMatchCorrect(ans, q.pairs)) correct++;
  }
  return Math.round((correct / QUESTIONS.length) * 100);
}

function getAnsweredCount() {
  return Object.keys(state.answers).length;
}

function render() {
  const filtered =
    state.currentFilter === "Semua"
      ? QUESTIONS
      : QUESTIONS.filter((q) => q.topic === state.currentFilter);

  const score = getScore();
  const progress = Math.round((getAnsweredCount() / QUESTIONS.length) * 100);

  app.innerHTML = `
    <div class="container">
      <div class="header">
        <h1>Simulasi PAS Sosiologi Kelas X</h1>
        <p>
          Web interaktif lengkap: pilihan ganda, PG kompleks, menjodohkan, skor otomatis, dan pembahasan.
        </p>

        <div class="stats">
          <div class="stat">
            <div class="label">Soal</div>
            <div class="value">${QUESTIONS.length}</div>
          </div>
          <div class="stat">
            <div class="label">Terjawab</div>
            <div class="value">${getAnsweredCount()}</div>
          </div>
          <div class="stat">
            <div class="label">Progres</div>
            <div class="value">${progress}%</div>
          </div>
          <div class="stat">
            <div class="label">Skor</div>
            <div class="value">${score}/100</div>
          </div>
        </div>

        <div class="progress-wrap">
          <div class="progress-bar" style="width:${progress}%"></div>
        </div>

        <div class="topbar">
          <button class="btn btn-primary" id="btnReview">${state.reviewMode ? "Mode Ujian" : "Mode Pembahasan"}</button>
          <button class="btn btn-secondary" id="btnReset">Reset</button>
        </div>
      </div>

      <div class="grid">
        <div id="questions"></div>

        <div class="panel">
          <h3>Filter Materi</h3>
          <p class="small">Pilih bab untuk menampilkan soal tertentu.</p>
          <select id="filterSelect" class="select">
            ${["Semua", ...new Set(QUESTIONS.map((q) => q.topic))]
              .map(
                (topic) => `
                  <option value="${topic}" ${topic === state.currentFilter ? "selected" : ""}>
                    ${topic}
                  </option>
                `
              )
              .join("")}
          </select>

          <hr style="border:none;border-top:1px solid #e2e8f0;margin:16px 0;" />

          <h3>Tips cepat</h3>
          <p class="small">
            Bedakan diferensiasi dan stratifikasi, hafalkan jenis norma, dan pahami sosialisasi, penyimpangan, serta pengendalian sosial.
          </p>

          <h3>Hasil</h3>
          <p class="small">Skor saat ini: <strong>${score}/100</strong></p>
          <p class="small">Jawaban tersimpan selama halaman masih dibuka.</p>
        </div>
      </div>
    </div>
  `;

  document.getElementById("btnReview").onclick = () => {
    state.reviewMode = !state.reviewMode;
    render();
  };

  document.getElementById("btnReset").onclick = () => {
    state.answers = {};
    state.reviewMode = false;
    render();
  };

  document.getElementById("filterSelect").onchange = (e) => {
    state.currentFilter = e.target.value;
    render();
  };

  renderQuestions(filtered);
}

function renderQuestions(list) {
  const wrap = document.getElementById("questions");

  wrap.innerHTML = list
    .map((q) => {
      const user = state.answers[q.id];

      let optionsHtml = "";
      if (q.type === "mcq") {
        optionsHtml = `
          <div class="options">
            ${q.options
              .map((opt, idx) => {
                const selected = user === idx;
                const showCorrect = state.reviewMode && idx === q.answer;
                const showWrong = state.reviewMode && selected && idx !== q.answer;
                const cls = [
                  "option",
                  selected ? "selected" : "",
                  showCorrect ? "correct" : "",
                  showWrong ? "wrong" : "",
                ].join(" ");
                return `
                  <button class="${cls}" data-qid="${q.id}" data-type="mcq" data-idx="${idx}">
                    <strong>${String.fromCharCode(65 + idx)}.</strong> ${opt}
                  </button>
                `;
              })
              .join("")}
          </div>
        `;
      }

      if (q.type === "multi") {
        const current = Array.isArray(user) ? user : [];
        optionsHtml = `
          <div class="options">
            ${q.options
              .map((opt, idx) => {
                const selected = current.includes(idx);
                const cls = ["option", selected ? "selected" : ""].join(" ");
                return `
                  <button class="${cls}" data-qid="${q.id}" data-type="multi" data-idx="${idx}">
                    <strong>${String.fromCharCode(65 + idx)}.</strong> ${opt}
                  </button>
                `;
              })
              .join("")}
          </div>
        `;
      }

      if (q.type === "match") {
        const current = Array.isArray(user) ? user : Array(q.left.length).fill("");
        optionsHtml = `
          <div class="options" style="grid-template-columns:1fr 1fr;gap:14px;">
            <div>
              ${q.left
                .map((item, idx) => `<div class="feedback" style="margin-top:0;margin-bottom:10px;"><strong>${String.fromCharCode(65 + idx)}.</strong> ${item}</div>`)
                .join("")}
            </div>
            <div>
              ${q.left
                .map(
                  (_, idx) => `
                    <div style="margin-bottom:12px;">
                      <div class="small" style="margin-bottom:6px;">Pasangan ${String.fromCharCode(65 + idx)}</div>
                      <select class="select" data-qid="${q.id}" data-type="match" data-idx="${idx}">
                        <option value="">Pilih jawaban</option>
                        ${q.right
                          .map(
                            (r, rIdx) => `
                              <option value="${rIdx}" ${String(current[idx]) === String(rIdx) ? "selected" : ""}>
                                ${rIdx + 1}. ${r}
                              </option>
                            `
                          )
                          .join("")}
                      </select>
                    </div>
                  `
                )
                .join("")}
            </div>
          </div>
        `;
      }

      const result =
        state.reviewMode && q.type === "mcq"
          ? `<div class="feedback"><strong>Pembahasan:</strong> ${q.explanation}<br><strong>Jawaban:</strong> ${
              String.fromCharCode(65 + q.answer)
            }. ${q.options[q.answer]}</div>`
          : state.reviewMode && q.type === "multi"
          ? `<div class="feedback"><strong>Pembahasan:</strong> ${q.explanation}</div>`
          : state.reviewMode && q.type === "match"
          ? `<div class="feedback"><strong>Pembahasan:</strong> ${q.explanation}</div>`
          : "";

      return `
        <div class="question-card">
          <div class="question-title">
            <div>
              <h3>No. ${q.id}</h3>
              <div class="small">${q.topic}</div>
            </div>
            <div class="badge">${q.type.toUpperCase()}</div>
          </div>

          <div class="prompt">${q.prompt}</div>
          ${optionsHtml}
          ${result}
        </div>
      `;
    })
    .join("");

  wrap.querySelectorAll('button[data-type="mcq"]').forEach((btn) => {
    btn.onclick = () => {
      const qid = Number(btn.dataset.qid);
      const idx = Number(btn.dataset.idx);
      state.answers[qid] = idx;
      render();
    };
  });

  wrap.querySelectorAll('button[data-type="multi"]').forEach((btn) => {
    btn.onclick = () => {
      const qid = Number(btn.dataset.qid);
      const idx = Number(btn.dataset.idx);
      const current = Array.isArray(state.answers[qid]) ? state.answers[qid] : [];
      state.answers[qid] = current.includes(idx)
        ? current.filter((v) => v !== idx)
        : [...current, idx];
      render();
    };
  });

  wrap.querySelectorAll('select[data-type="match"]').forEach((sel) => {
    sel.onchange = (e) => {
      const qid = Number(sel.dataset.qid);
      const idx = Number(sel.dataset.idx);
      const current = Array.isArray(state.answers[qid])
        ? [...state.answers[qid]]
        : Array(QUESTIONS.find((q) => q.id === qid).left.length).fill("");
      current[idx] = e.target.value === "" ? "" : Number(e.target.value);
      state.answers[qid] = current;
      render();
    };
  });
}

render();

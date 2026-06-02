:root {
  --bg: #f7fafc;
  --card: #ffffff;
  --text: #0f172a;
  --muted: #64748b;
  --primary: #0ea5e9;
  --primary-dark: #0284c7;
  --border: #e2e8f0;
  --success: #16a34a;
  --danger: #dc2626;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background: var(--bg);
  color: var(--text);
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px;
}

.header {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.04);
}

.header h1 {
  margin: 0 0 8px;
  font-size: 28px;
}

.header p {
  margin: 0;
  color: var(--muted);
  line-height: 1.6;
}

.topbar {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 18px;
}

.btn {
  border: none;
  border-radius: 999px;
  padding: 10px 16px;
  cursor: pointer;
  font-weight: 600;
}

.btn-primary {
  background: var(--primary);
  color: white;
}

.btn-primary:hover {
  background: var(--primary-dark);
}

.btn-secondary {
  background: #e2e8f0;
  color: #0f172a;
}

.stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  margin-top: 18px;
}

.stat {
  background: #f8fafc;
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 14px;
  text-align: center;
}

.stat .label {
  font-size: 12px;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.stat .value {
  margin-top: 6px;
  font-size: 22px;
  font-weight: 700;
}

.question-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 22px;
  margin-bottom: 16px;
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.04);
}

.question-title {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: flex-start;
  margin-bottom: 12px;
}

.question-title h3 {
  margin: 0;
  font-size: 18px;
}

.badge {
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  background: #e0f2fe;
  color: #0369a1;
}

.prompt {
  line-height: 1.7;
  color: #334155;
  margin-bottom: 16px;
}

.options {
  display: grid;
  gap: 10px;
}

.option {
  width: 100%;
  text-align: left;
  border: 1px solid var(--border);
  background: white;
  border-radius: 18px;
  padding: 12px 14px;
  cursor: pointer;
  transition: 0.15s ease;
}

.option:hover {
  background: #f8fafc;
}

.option.selected {
  border-color: var(--primary);
  background: #ecfeff;
}

.option.correct {
  border-color: var(--success);
  background: #dcfce7;
}

.option.wrong {
  border-color: var(--danger);
  background: #fee2e2;
}

.feedback {
  margin-top: 14px;
  padding: 14px;
  border-radius: 16px;
  background: #f8fafc;
  color: #334155;
  line-height: 1.7;
}

.panel {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 20px;
  position: sticky;
  top: 20px;
}

.grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
}

.small {
  font-size: 14px;
  color: var(--muted);
}

.select {
  width: 100%;
  padding: 10px 12px;
  border-radius: 14px;
  border: 1px solid var(--border);
  background: white;
}

.progress-wrap {
  margin-top: 12px;
  width: 100%;
  height: 10px;
  background: #e2e8f0;
  border-radius: 999px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  width: 0%;
  background: var(--primary);
  transition: width 0.3s ease;
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .panel {
    position: static;
  }
}

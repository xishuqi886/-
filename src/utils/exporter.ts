/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { dimensions, Dimension } from "../data";

/**
 * Utility to export the blank career decision-making questionnaire as a beautiful, print-ready, standalone HTML file.
 */
export function exportBlankHtml(): string {
  const dimensionRows = dimensions.map((dim, dimIdx) => {
    const questionItems = dim.questions.map((q, qIdx) => `
      <div class="question-card">
        <div class="question-header">
          <span class="question-number">${dimIdx + 1}.${qIdx + 1}</span>
          <span class="question-label">${q.label}</span>
        </div>
        <p class="question-tip">${q.tip}</p>
        <div class="scoring-box">
          <div class="score-option option-a">
            <span class="option-tag tag-a">A. 继续开店</span>
            <span class="score-blank">_______ 分</span>
            <span class="score-hint">(1-10分)</span>
          </div>
          <div class="score-option option-b">
            <span class="option-tag tag-b">B. 回原公司入股</span>
            <span class="score-blank">_______ 分</span>
            <span class="score-hint">(1-10分)</span>
          </div>
        </div>
        <div class="note-blank-box">
          <span class="note-label">心路历程 / 事实依据：</span>
          <div class="note-line"></div>
          <div class="note-line"></div>
        </div>
      </div>
    `).join("");

    return `
      <div class="dimension-section">
        <div class="dimension-header">
          <h2 class="dimension-title">${dim.name}</h2>
          <span class="dimension-desc">${dim.desc}</span>
          <span class="dimension-weight">默认权重: ${dim.defaultWeight.toFixed(1)}x</span>
        </div>
        <div class="questions-list">
          ${questionItems}
        </div>
      </div>
    `;
  }).join("");

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>创业与合伙抉择评估问卷 - 离线纸笔版</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    
    :root {
      --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans CJK SC", sans-serif;
      --color-bg: #faf9f6;
      --color-card: #ffffff;
      --color-text-main: #1c1917;
      --color-text-muted: #6b6661;
      --color-border: #e7e5e4;
      --color-emerald: #059669;
      --color-indigo: #4f46e5;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: var(--font-sans);
      background-color: var(--color-bg);
      color: var(--color-text-main);
      line-height: 1.6;
      padding: 40px 20px;
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
      background-color: var(--color-card);
      border: 1px solid var(--color-border);
      border-radius: 12px;
      padding: 40px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
    }

    header {
      border-bottom: 2px solid var(--color-text-main);
      padding-bottom: 24px;
      margin-bottom: 32px;
      text-align: center;
    }

    .app-title {
      font-size: 28px;
      font-weight: 700;
      letter-spacing: -0.02em;
      color: var(--color-text-main);
      margin-bottom: 8px;
    }

    .app-subtitle {
      font-size: 15px;
      color: var(--color-text-muted);
      max-width: 600px;
      margin: 0 auto;
    }

    .instructions {
      background-color: #f5f4f0;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 32px;
      font-size: 14px;
      color: var(--color-text-main);
      border-left: 4px solid var(--color-text-muted);
    }

    .instructions h3 {
      font-weight: 600;
      margin-bottom: 8px;
    }

    .instructions ul {
      padding-left: 20px;
    }

    .instructions li {
      margin-bottom: 4px;
    }

    .dimension-section {
      margin-bottom: 40px;
    }

    .dimension-header {
      border-bottom: 1px solid var(--color-text-main);
      padding-bottom: 8px;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 10px;
    }

    .dimension-title {
      font-size: 18px;
      font-weight: 700;
    }

    .dimension-desc {
      font-size: 14px;
      color: var(--color-text-muted);
      margin-right: auto;
      margin-left: 12px;
    }

    .dimension-weight {
      font-size: 12px;
      font-weight: 600;
      background-color: #f5f4f0;
      padding: 2px 8px;
      border-radius: 4px;
    }

    .question-card {
      padding: 16px 0;
      border-bottom: 1px dashed var(--color-border);
    }

    .question-card:last-child {
      border-bottom: none;
    }

    .question-header {
      display: flex;
      align-items: flex-start;
      margin-bottom: 4px;
    }

    .question-number {
      font-weight: 600;
      color: var(--color-text-main);
      margin-right: 8px;
      white-space: nowrap;
    }

    .question-label {
      font-weight: 500;
      color: var(--color-text-main);
    }

    .question-tip {
      font-size: 13px;
      color: var(--color-text-muted);
      padding-left: 28px;
      margin-bottom: 12px;
    }

    .scoring-box {
      display: flex;
      gap: 24px;
      padding-left: 28px;
      margin-bottom: 12px;
    }

    .score-option {
      flex: 1;
      display: flex;
      align-items: center;
      background: #fafaf9;
      border: 1px solid var(--color-border);
      padding: 8px 12px;
      border-radius: 6px;
    }

    .option-tag {
      font-size: 13px;
      font-weight: 600;
      margin-right: 12px;
    }

    .tag-a { color: var(--color-emerald); }
    .tag-b { color: var(--color-indigo); }

    .score-blank {
      font-family: monospace;
      font-size: 16px;
      font-weight: bold;
      color: #78716c;
    }

    .score-hint {
      font-size: 11px;
      color: #a8a29e;
      margin-left: auto;
    }

    .note-blank-box {
      padding-left: 28px;
      margin-top: 8px;
    }

    .note-label {
      font-size: 12px;
      color: var(--color-text-muted);
      display: block;
      margin-bottom: 6px;
    }

    .note-line {
      height: 1px;
      border-bottom: 1px dotted #d6d3d1;
      margin-bottom: 12px;
      width: 100%;
    }

    .summary-section {
      border: 2px solid var(--color-text-main);
      border-radius: 8px;
      padding: 24px;
      margin-top: 48px;
      background-color: #fafaf9;
    }

    .summary-title {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 16px;
      text-align: center;
      border-bottom: 1px solid var(--color-border);
      padding-bottom: 8px;
    }

    .summary-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .summary-col {
      padding: 16px;
      background: white;
      border: 1px solid var(--color-border);
      border-radius: 6px;
      text-align: center;
    }

    .summary-col h4 {
      font-size: 15px;
      font-weight: 600;
      margin-bottom: 12px;
    }

    .summary-col h4.col-a { color: var(--color-emerald); }
    .summary-col h4.col-b { color: var(--color-indigo); }

    .calc-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      font-size: 14px;
      border-bottom: 1px dashed var(--color-border);
      padding-bottom: 4px;
    }

    .calc-row:last-child {
      border-bottom: none;
      font-weight: bold;
      font-size: 16px;
      margin-top: 12px;
    }

    .decision-verdict {
      grid-column: span 2;
      background-color: #f5f4f0;
      border: 1px solid var(--color-border);
      padding: 16px;
      border-radius: 6px;
      text-align: center;
      font-weight: 600;
      font-size: 15px;
    }

    @media print {
      body {
        background-color: white;
        padding: 0;
      }
      .container {
        border: none;
        box-shadow: none;
        padding: 0;
      }
      .question-card {
        page-break-inside: avoid;
      }
      .dimension-section {
        page-break-inside: avoid;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1 class="app-title">创业与合伙抉择评估问卷</h1>
      <p class="app-subtitle">多维度、科学量化的职业与投资抉择评估工具 —— 离线评估纸笔版</p>
    </header>

    <div class="instructions">
      <h3>填表指南：</h3>
      <ul>
        <li>本问卷共包含 <strong>10大维度，32个具体评估细项</strong>。</li>
        <li>每个评估细项请分别针对 <strong>A.继续开店</strong> 和 <strong>B.回原公司入股</strong> 两个选项进行 <strong>1 至 10分</strong> 的评分。</li>
        <li><strong>评分标准：一律遵循“分值越高代表体验越好、越符合预期、越理想”的原则。</strong></li>
        <li>例如，“日常工作负荷”：10分代表极其轻松、负荷很低（非常理想）；1分代表极其繁重、一人干两人活（极不理想）。</li>
        <li>在每一项后面建议简短写下您的 <strong>“心路历程/事实依据”</strong>，这能帮助您理清真实动机、避免主观偏见。</li>
      </ul>
    </div>

    <form id="quiz-form">
      ${dimensionRows}

      <div class="summary-section">
        <h3 class="summary-title">总分统计公式</h3>
        <div class="summary-grid">
          <div class="summary-col">
            <h4 class="col-a">A：继续和原搭档开店</h4>
            <div class="calc-row"><span>1. 原始总分 (Sum)</span> <span>_________ 分</span></div>
            <div class="calc-row"><span>2. 加权总分 (Weighted)</span> <span>_________ 分</span></div>
          </div>
          <div class="summary-col">
            <h4 class="col-b">B：回原公司入股</h4>
            <div class="calc-row"><span>1. 原始总分 (Sum)</span> <span>_________ 分</span></div>
            <div class="calc-row"><span>2. 加权总分 (Weighted)</span> <span>_________ 分</span></div>
          </div>
          <div class="decision-verdict">
            最终推荐选择（得分更高者）：A. 继续和原搭档开店  /  B. 回原公司入股  (圈选其一)
          </div>
        </div>
      </div>
    </form>
  </div>
</body>
</html>
`;
}

/**
 * Utility to export the filled career decision report as a gorgeous, self-contained HTML file.
 */
export function exportReportHtml(
  scores: Record<string, { a: number; b: number; notes: string }>,
  weights: Record<string, number>
): string {
  // Compute totals
  let rawTotalA = 0;
  let rawTotalB = 0;
  let weightedTotalA = 0;
  let weightedTotalB = 0;
  let maxPossibleRaw = 32 * 10;
  let maxPossibleWeighted = 0;

  // Let's compute dimension averages & scores
  const dimensionReports = dimensions.map((dim, dimIdx) => {
    const weight = weights[dim.id] !== undefined ? weights[dim.id] : dim.defaultWeight;
    let dimRawA = 0;
    let dimRawB = 0;
    const dimMaxRaw = dim.questions.length * 10;
    maxPossibleWeighted += dimMaxRaw * weight;

    const questionRows = dim.questions.map((q, qIdx) => {
      const qScore = scores[q.id] || { a: 5, b: 5, notes: "" };
      rawTotalA += qScore.a;
      rawTotalB += qScore.b;
      weightedTotalA += qScore.a * weight;
      weightedTotalB += qScore.b * weight;

      dimRawA += qScore.a;
      dimRawB += qScore.b;

      const higherOpt = qScore.a > qScore.b ? "a" : qScore.b > qScore.a ? "b" : "equal";
      
      return `
        <div class="q-item">
          <div class="q-row-top">
            <div class="q-title-box">
              <span class="q-idx">${dimIdx + 1}.${qIdx + 1}</span>
              <span class="q-label">${q.label}</span>
            </div>
            <div class="q-scores">
              <div class="q-score-badge opt-a ${higherOpt === "a" ? "winner" : ""}">
                <span>A: ${qScore.a}分</span>
              </div>
              <div class="q-score-badge opt-b ${higherOpt === "b" ? "winner" : ""}">
                <span>B: ${qScore.b}分</span>
              </div>
            </div>
          </div>
          <p class="q-tip">${q.tip}</p>
          ${qScore.notes.trim() ? `
            <div class="q-notes-box">
              <span class="q-notes-tag">事实/心路依据：</span>
              <p class="q-notes-text">${escapeHtml(qScore.notes)}</p>
            </div>
          ` : ""}
        </div>
      `;
    }).join("");

    const dimAvgA = (dimRawA / dim.questions.length).toFixed(1);
    const dimAvgB = (dimRawB / dim.questions.length).toFixed(1);
    const dimWeightedA = (dimRawA * weight).toFixed(1);
    const dimWeightedB = (dimRawB * weight).toFixed(1);

    const winnerText = Number(dimAvgA) > Number(dimAvgB) 
      ? "继续开店占优" 
      : Number(dimAvgB) > Number(dimAvgA) 
      ? "回公司入股占优" 
      : "体验均等";
    const winnerClass = Number(dimAvgA) > Number(dimAvgB) 
      ? "win-a" 
      : Number(dimAvgB) > Number(dimAvgA) 
      ? "win-b" 
      : "win-equal";

    const progressPercentA = (dimRawA / dimMaxRaw) * 100;
    const progressPercentB = (dimRawB / dimMaxRaw) * 100;

    return {
      html: `
        <div class="dim-report-card">
          <div class="dim-report-header">
            <div class="dim-title-group">
              <h3 class="dim-title">${dim.name}</h3>
              <span class="dim-desc">${dim.desc}</span>
            </div>
            <div class="dim-badges">
              <span class="dim-badge weight-badge">权重: ${weight.toFixed(1)}x</span>
              <span class="dim-badge winner-badge ${winnerClass}">${winnerText}</span>
            </div>
          </div>

          <div class="dim-progress-grid">
            <div class="progress-col">
              <div class="progress-label-row">
                <span>A. 继续开店 (得: ${dimRawA}分 / 平均: ${dimAvgA}分)</span>
                <span class="weighted-indicator">加权: ${dimWeightedA}</span>
              </div>
              <div class="progress-track">
                <div class="progress-bar bar-a" style="width: ${progressPercentA}%"></div>
              </div>
            </div>
            <div class="progress-col">
              <div class="progress-label-row">
                <span>B. 回原公司入股 (得: ${dimRawB}分 / 平均: ${dimAvgB}分)</span>
                <span class="weighted-indicator">加权: ${dimWeightedB}</span>
              </div>
              <div class="progress-track">
                <div class="progress-bar bar-b" style="width: ${progressPercentB}%"></div>
              </div>
            </div>
          </div>

          <div class="dim-questions-sublist">
            ${questionRows}
          </div>
        </div>
      `,
      name: dim.name.replace(/^[一二三四五六七八九十]+、/, ""),
      avgA: Number(dimAvgA),
      avgB: Number(dimAvgB)
    };
  });

  const finalWinner = weightedTotalA > weightedTotalB 
    ? "A" 
    : weightedTotalB > weightedTotalA 
    ? "B" 
    : "EQUAL";

  const diffRaw = Math.abs(rawTotalA - rawTotalB);
  const diffWeighted = Math.abs(weightedTotalA - weightedTotalB).toFixed(1);

  // Generate radar-like chart comparison using HTML CSS
  const bentoStrengthsA = dimensions
    .filter((_, idx) => dimensionReports[idx].avgA > dimensionReports[idx].avgB)
    .map(dim => `<li><strong>${dim.name.split('、')[1]}</strong> (平均 ${dimensionReports[dimensions.indexOf(dim)].avgA}分 vs ${dimensionReports[dimensions.indexOf(dim)].avgB}分)</li>`)
    .join("");

  const bentoStrengthsB = dimensions
    .filter((_, idx) => dimensionReports[idx].avgB > dimensionReports[idx].avgA)
    .map(dim => `<li><strong>${dim.name.split('、')[1]}</strong> (平均 ${dimensionReports[dimensions.indexOf(dim)].avgB}分 vs ${dimensionReports[dimensions.indexOf(dim)].avgA}分)</li>`)
    .join("");

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>创业与合伙抉择评估报告 - 决策看板</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    
    :root {
      --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans CJK SC", sans-serif;
      --color-bg: #faf9f6;
      --color-card: #ffffff;
      --color-text-main: #1c1917;
      --color-text-muted: #6b6661;
      --color-border: #e7e5e4;
      
      --color-emerald-solid: #059669;
      --color-emerald-light: #ecfdf5;
      --color-emerald-border: #a7f3d0;
      
      --color-indigo-solid: #4f46e5;
      --color-indigo-light: #e0e7ff;
      --color-indigo-border: #c7d2fe;
      
      --color-amber-solid: #d97706;
      --color-amber-light: #fef3c7;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: var(--font-sans);
      background-color: var(--color-bg);
      color: var(--color-text-main);
      line-height: 1.6;
      padding: 40px 20px;
    }

    .container {
      max-width: 1000px;
      margin: 0 auto;
    }

    .back-btn-box {
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .print-btn {
      background-color: var(--color-text-main);
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      font-weight: 500;
      cursor: pointer;
      font-size: 14px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .print-btn:hover {
      opacity: 0.9;
    }

    header {
      background: white;
      border: 1px solid var(--color-border);
      border-radius: 12px;
      padding: 32px;
      text-align: center;
      margin-bottom: 24px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.01);
    }

    .report-badge {
      display: inline-block;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      background-color: #f5f4f0;
      padding: 4px 12px;
      border-radius: 100px;
      margin-bottom: 12px;
      color: var(--color-text-muted);
      border: 1px solid var(--color-border);
    }

    .app-title {
      font-size: 32px;
      font-weight: 700;
      letter-spacing: -0.02em;
      color: var(--color-text-main);
      margin-bottom: 8px;
    }

    .app-subtitle {
      font-size: 15px;
      color: var(--color-text-muted);
      max-width: 600px;
      margin: 0 auto;
    }

    /* Verdict Card */
    .verdict-card {
      background-color: white;
      border: 1px solid var(--color-border);
      border-radius: 12px;
      padding: 32px;
      margin-bottom: 32px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.02);
      display: grid;
      grid-template-columns: 1.2fr 1.8fr;
      gap: 32px;
      align-items: center;
    }

    @media (max-width: 768px) {
      .verdict-card {
        grid-template-columns: 1fr;
        gap: 24px;
      }
    }

    .verdict-left {
      text-align: center;
      border-right: 1px solid var(--color-border);
      padding-right: 32px;
    }

    @media (max-width: 768px) {
      .verdict-left {
        border-right: none;
        padding-right: 0;
        border-bottom: 1px solid var(--color-border);
        padding-bottom: 24px;
      }
    }

    .verdict-title {
      font-size: 14px;
      font-weight: 600;
      color: var(--color-text-muted);
      margin-bottom: 12px;
      text-transform: uppercase;
    }

    .verdict-hero {
      font-size: 36px;
      font-weight: 800;
      margin-bottom: 8px;
    }

    .hero-a { color: var(--color-emerald-solid); }
    .hero-b { color: var(--color-indigo-solid); }
    .hero-equal { color: var(--color-amber-solid); }

    .verdict-margin {
      font-size: 14px;
      color: var(--color-text-muted);
    }

    .verdict-right {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .scores-hero-row {
      display: flex;
      justify-content: space-between;
      gap: 20px;
    }

    .score-hero-box {
      flex: 1;
      padding: 16px;
      border-radius: 8px;
      border: 1px solid var(--color-border);
    }

    .score-hero-box.box-a {
      background-color: var(--color-emerald-light);
      border-color: var(--color-emerald-border);
    }

    .score-hero-box.box-b {
      background-color: var(--color-indigo-light);
      border-color: var(--color-indigo-border);
    }

    .score-hero-label {
      font-size: 13px;
      font-weight: 600;
      color: var(--color-text-muted);
      margin-bottom: 6px;
      display: block;
    }

    .score-hero-val {
      font-size: 24px;
      font-weight: 700;
    }

    .val-a { color: var(--color-emerald-solid); }
    .val-b { color: var(--color-indigo-solid); }

    .score-hero-subtext {
      font-size: 12px;
      color: var(--color-text-muted);
      margin-top: 4px;
    }

    .verdict-summary-p {
      font-size: 14px;
      color: var(--color-text-muted);
      line-height: 1.6;
    }

    /* Analysis Bento Grid */
    .analysis-bento {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-bottom: 32px;
    }

    @media (max-width: 640px) {
      .analysis-bento {
        grid-template-columns: 1fr;
      }
    }

    .bento-card {
      background: white;
      border: 1px solid var(--color-border);
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.01);
    }

    .bento-header {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .bento-header.header-a { color: var(--color-emerald-solid); }
    .bento-header.header-b { color: var(--color-indigo-solid); }

    .bento-list {
      padding-left: 18px;
      font-size: 14px;
      color: var(--color-text-muted);
    }

    .bento-list li {
      margin-bottom: 8px;
    }

    /* Report breakdown sections */
    .section-title {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 8px;
      border-bottom: 1px solid var(--color-border);
      padding-bottom: 8px;
    }

    .dim-report-card {
      background: white;
      border: 1px solid var(--color-border);
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 24px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.01);
    }

    .dim-report-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 1px solid #f5f4f0;
      padding-bottom: 16px;
      margin-bottom: 16px;
      flex-wrap: wrap;
      gap: 12px;
    }

    .dim-title {
      font-size: 18px;
      font-weight: 700;
    }

    .dim-desc {
      font-size: 13px;
      color: var(--color-text-muted);
      display: block;
      margin-top: 2px;
    }

    .dim-badges {
      display: flex;
      gap: 8px;
    }

    .dim-badge {
      font-size: 11px;
      font-weight: 600;
      padding: 3px 10px;
      border-radius: 4px;
    }

    .weight-badge {
      background-color: #fafaf9;
      border: 1px solid var(--color-border);
      color: var(--color-text-muted);
    }

    .winner-badge.win-a {
      background-color: var(--color-emerald-light);
      color: var(--color-emerald-solid);
      border: 1px solid var(--color-emerald-border);
    }

    .winner-badge.win-b {
      background-color: var(--color-indigo-light);
      color: var(--color-indigo-solid);
      border: 1px solid var(--color-indigo-border);
    }

    .winner-badge.win-equal {
      background-color: var(--color-amber-light);
      color: var(--color-amber-solid);
      border: 1px solid #fde68a;
    }

    .dim-progress-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      background: #fafaf9;
      padding: 16px;
      border-radius: 8px;
      margin-bottom: 20px;
    }

    @media (max-width: 640px) {
      .dim-progress-grid {
        grid-template-columns: 1fr;
        gap: 12px;
      }
    }

    .progress-col {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .progress-label-row {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      font-weight: 500;
      color: var(--color-text-muted);
    }

    .weighted-indicator {
      font-weight: 600;
    }

    .progress-track {
      height: 8px;
      background: #e7e5e4;
      border-radius: 100px;
      overflow: hidden;
    }

    .progress-bar {
      height: 100%;
      border-radius: 100px;
    }

    .progress-bar.bar-a { background-color: var(--color-emerald-solid); }
    .progress-bar.bar-b { background-color: var(--color-indigo-solid); }

    .dim-questions-sublist {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .q-item {
      padding: 14px 16px;
      border-radius: 8px;
      border: 1px solid #f5f5f4;
      background-color: #fafafa;
    }

    .q-row-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4px;
      gap: 12px;
    }

    .q-title-box {
      font-size: 14px;
      font-weight: 600;
    }

    .q-idx {
      color: var(--color-text-muted);
      margin-right: 6px;
    }

    .q-scores {
      display: flex;
      gap: 8px;
    }

    .q-score-badge {
      font-size: 12px;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: 4px;
      color: var(--color-text-muted);
      border: 1px solid var(--color-border);
      background-color: white;
    }

    .q-score-badge.opt-a.winner {
      background-color: var(--color-emerald-light);
      border-color: var(--color-emerald-border);
      color: var(--color-emerald-solid);
    }

    .q-score-badge.opt-b.winner {
      background-color: var(--color-indigo-light);
      border-color: var(--color-indigo-border);
      color: var(--color-indigo-solid);
    }

    .q-tip {
      font-size: 12px;
      color: var(--color-text-muted);
      margin-bottom: 8px;
    }

    .q-notes-box {
      border-top: 1px dashed var(--color-border);
      padding-top: 8px;
      margin-top: 8px;
    }

    .q-notes-tag {
      font-size: 11px;
      font-weight: 600;
      color: var(--color-text-muted);
    }

    .q-notes-text {
      font-size: 13px;
      color: #44403c;
      background: #fdfdfd;
      padding: 6px 10px;
      border-radius: 4px;
      border-left: 2px solid var(--color-border);
      margin-top: 2px;
    }

    /* Print styling */
    @media print {
      body {
        background-color: white;
        padding: 0;
      }
      .back-btn-box {
        display: none;
      }
      .dim-report-card {
        page-break-inside: avoid;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="back-btn-box">
      <span style="font-size: 14px; color: var(--color-text-muted);">
        导出日期: 2026-07-05 (根据本地时间计算)
      </span>
      <button onclick="window.print()" class="print-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
        打印 / 保存为 PDF
      </button>
    </div>

    <header>
      <span class="report-badge">CAREER EVALUATION REPORT</span>
      <h1 class="app-title">创业与合伙抉择评估报告</h1>
      <p class="app-subtitle">多维度、科学量化的职业与投资抉择深度评估报告</p>
    </header>

    <!-- Verdict -->
    <div class="verdict-card">
      <div class="verdict-left">
        <h4 class="verdict-title">最终评估推荐</h4>
        <div class="verdict-hero ${finalWinner === "A" ? "hero-a" : finalWinner === "B" ? "hero-b" : "hero-equal"}">
          ${finalWinner === "A" ? "继续独立开店" : finalWinner === "B" ? "回原公司入股" : "两者不相上下"}
        </div>
        <div class="verdict-margin">
          ${finalWinner !== "EQUAL" ? `加权优势差额：<strong>${diffWeighted}分</strong> (原始差额: ${diffRaw}分)` : "评分平局，请重点考量核心维度"}
        </div>
      </div>
      
      <div class="verdict-right">
        <div class="scores-hero-row">
          <div class="score-hero-box box-a">
            <span class="score-hero-label">A. 继续开店 (总分)</span>
            <div class="score-hero-val val-a">${weightedTotalA.toFixed(1)}</div>
            <div class="score-hero-subtext">原始得分: ${rawTotalA}分</div>
          </div>
          <div class="score-hero-box box-b">
            <span class="score-hero-label">B. 回原公司入股 (总分)</span>
            <div class="score-hero-val val-b">${weightedTotalB.toFixed(1)}</div>
            <div class="score-hero-subtext">原始得分: ${rawTotalB}分</div>
          </div>
        </div>
        
        <p class="verdict-summary-p">
          本评测涵盖了十个关键决策维度（包含经济效益、工作量、情绪价值、合伙人人品、时间自由、风险、成长性、合作稳定度、尊严、综合兜底）。
          加权计算规则能够排除一时冲动，真实地反映出您在底层价值观、体力承受力、预期收益及潜在风险防范上的平衡取舍。
        </p>
      </div>
    </div>

    <!-- Strengths Bento -->
    <div class="analysis-bento">
      <div class="bento-card">
        <h4 class="bento-header header-a">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
          选项 A (继续开店) 占优维度
        </h4>
        <ul class="bento-list">
          ${bentoStrengthsA || "<li>无明显优于B选项的维度</li>"}
        </ul>
      </div>

      <div class="bento-card">
        <h4 class="bento-header header-b">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          选项 B (回原公司入股) 占优维度
        </h4>
        <ul class="bento-list">
          ${bentoStrengthsB || "<li>无明显优于A选项的维度</li>"}
        </ul>
      </div>
    </div>

    <!-- Dimension Breakdown -->
    <h2 class="section-title">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
      十个决策维度深度对比
    </h2>

    <div class="dimensions-list">
      ${dimensionReports.map(dr => dr.html).join("")}
    </div>

    <footer style="text-align: center; color: var(--color-text-muted); font-size: 12px; margin-top: 60px; padding-top: 20px; border-top: 1px solid var(--color-border);">
      量化理性选择，做不后悔的决策。© 创业与合伙抉择评估器
    </footer>
  </div>
</body>
</html>
`;
}

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

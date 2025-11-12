// ✅ app.js — Pulls Google Sheet Data into Dashboard

const SHEETS_API_URL = "https://script.google.com/macros/s/AKfycbzc8udblouZ2GOkaimcGeQrvtkbQ447lvSoiRNvLCsT4rsD-grTcaR56pIFrB6ZrPoj/exec";

async function fetchCases() {
  try {
    const res = await fetch(SHEETS_API_URL);
    const json = await res.json();
    return json.cases || [];
  } catch (err) {
    console.error("Failed to fetch cases:", err);
    return [];
  }
}

function createCaseCard(c) {
  const li = document.createElement("li");
  li.className = "case-card";
  li.innerHTML = `
    <div class="card">
      <h3>${c["Case ID"] || "(No ID)"}</h3>
      <p><strong>Name:</strong> ${c["Name"] || ""}</p>
      <p><strong>Email:</strong> ${c["Email"] || ""}</p>
      <p><strong>Phone:</strong> ${c["Phone"] || ""}</p>
      <p><strong>Urgency:</strong> ${c["Urgency"] || ""}</p>
      <p><strong>Visa Route:</strong> ${c["Visa Route"] || ""}</p>
      <div class="btns">
        <a href="${c["Upload Documents Link"]}" target="_blank" class="btn">📄 Upload Docs</a>
        <a href="${c["Drive Folder Link"]}" target="_blank" class="btn">📁 Drive</a>
        <a href="${c["Intake Form Link"]}" target="_blank" class="btn">📋 Intake</a>
      </div>
    </div>
  `;
  return li;
}

function renderCaseList(cases) {
  const list = document.getElementById("case-list");
  list.innerHTML = "";
  cases.forEach(c => {
    const card = createCaseCard(c);
    list.appendChild(card);
  });
}

// Load on page load
window.addEventListener("DOMContentLoaded", async () => {
  const cases = await fetchCases();
  renderCaseList(cases);
});

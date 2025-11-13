const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTKbU_AB8xpsef-y3sQmoVQIGpg9WNZyfP91xGmfHiql7OIprnA0I5p0LT_ELQQZAr_gTypHT_GgvQz/pub?output=csv";

async function fetchSheetData() {
  const response = await fetch(SHEET_CSV_URL);
  const data = await response.text();
  const rows = data.split("\n").map(row => row.split(","));

  const headers = rows[0];
  const cases = rows.slice(1).map(row => {
    const obj = {};
    headers.forEach((key, i) => {
      obj[key.trim()] = row[i]?.trim();
    });
    return obj;
  });

  renderCasesFromSheet(cases);
}

function renderCasesFromSheet(cases) {
  const container = document.getElementById("case-list");
  if (!container) return;
  container.innerHTML = "";

  cases.forEach(c => {
    const div = document.createElement("div");
    div.className = "case-card";
    div.innerHTML = `
      <div class="case-header">
        <h3>${c["Client Name"] || "Unnamed Case"}</h3>
        <span class="badge ${c.Priority === "Urgent" ? "urgent" : "normal"}">
          ${c.Priority || "Normal"}
        </span>
      </div>
      <p><strong>Visa Type:</strong> ${c["Visa Type"]}</p>
      <p><strong>Status:</strong> ${c.Status}</p>
      <p><strong>Submitted:</strong> ${c["Submitted Date"]}</p>
    `;
    container.appendChild(div);
  });
}

// Call this when dashboard loads
fetchSheetData();

const SHEETS_API_URL = "https://script.google.com/macros/s/AKfycbzc8udblouZ2GOkaimcGeQrvtkbQ447lvSoiRNvLCsT4rsD-grTcaR56pIFrB6ZrPoj/exec"; // <- paste your web app URL here

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

// Example usage to hook into UI
document.addEventListener('DOMContentLoaded', function() {
  const list = document.getElementById("case-list");
  if (!list) return;
  fetchCases().then(cases => {
    list.innerHTML = "";
    cases.forEach(c => {
      const li = document.createElement("li");
      li.innerHTML = `
        <b>${c["Case ID"]}</b> - ${c.Name}<br>
        <a href="${c["Upload Documents Link"]}" target="_blank">Upload Docs</a> |
        <a href="${c["Drive Folder Link"]}" target="_blank">Drive</a> |
        <a href="${c["Intake Form Link"]}" target="_blank">Intake</a>
      `;
      list.appendChild(li);
    });
  });
});

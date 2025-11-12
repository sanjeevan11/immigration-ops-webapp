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

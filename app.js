// app.js – Final Version for Fetching & Displaying Immigration Cases

const API_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzc8udblouZ2GOkaimcGeQrvtkbQ447lvSoiRNvLCsT4rsD-grTcaR56pIFrB6ZrPoj/exec'; // Replace with your deployed Apps Script URL

const Dashboard = {
  loadCases: async function () {
    try {
      const res = await fetch(API_ENDPOINT);
      const data = await res.json();

      if (!data || !data.cases) {
        console.error("No data returned");
        return;
      }

      const cases = data.cases;
      this.updateStats(cases);
      this.renderCases(cases);
    } catch (err) {
      console.error("Error loading cases:", err);
    }
  },

  updateStats: function (cases) {
    const total = cases.length;
    const urgent = cases.filter(c => c.Urgency === "Urgent").length;
    const pending = cases.filter(c => c.Status && c.Status.toLowerCase().includes("waiting")).length;
    const newCases = cases.filter(c => c.Status && c.Status.toLowerCase().includes("new")).length;

    document.getElementById("total-cases").innerText = total;
    document.getElementById("urgent-cases").innerText = urgent;
    document.getElementById("pending-cases").innerText = pending;
    document.getElementById("new-cases").innerText = newCases;
  },

  renderCases: function (cases) {
    const container = document.getElementById("cases-list");
    if (!container) return;
    container.innerHTML = "";

    cases.forEach(c => {
      const el = document.createElement("div");
      el.className = "case-card";
      el.innerHTML = `
        <div class="case-header">
          <h3>${c["Case ID"] || "Unknown Case"}</h3>
          <span class="badge ${c.Urgency === 'Urgent' ? 'urgent' : 'normal'}">${c.Urgency || "Normal"}</span>
        </div>
        <p><b>Name:</b> ${c.Name || "N/A"}</p>
        <p><b>Email:</b> ${c.Email || "N/A"}</p>
        <p><b>Visa Route:</b> ${c["Visa Route"] || ""}</p>
        <p><b>Submitted:</b> ${new Date(c["Date Submitted"]).toLocaleString()}</p>
        <p><b>Status:</b> ${c.Status || ""}</p>
        <a href="${c["Upload Documents Link"]}" class="btn" target="_blank">Upload Docs</a>
        <a href="${c["Drive Folder Link"]}" class="btn" target="_blank">View Folder</a>
      `;
      container.appendChild(el);
    });
  }
};

// Load cases when the page loads
window.addEventListener('DOMContentLoaded', () => {
  Dashboard.loadCases();
});

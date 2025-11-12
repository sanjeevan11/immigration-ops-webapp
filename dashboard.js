/**
 * dashboard.js - Real-time case dashboard
 * Fetches from Apps Script (no API key needed!)
 */

const Dashboard = {
  // UPDATE THIS with your Apps Script URL
  APPS_SCRIPT_URL: "https://script.google.com/macros/d/YOUR_SCRIPT_ID/usercoderun",
  
  refreshInterval: null,
  AUTO_REFRESH: 10000, // 10 seconds

  async init() {
    await this.loadCases();
    this.startAutoRefresh();
  },

  async loadCases() {
    try {
      const res = await fetch(this.APPS_SCRIPT_URL);
      const data = await res.json();
      
      if (data.status === "success") {
        this.displayCases(data.cases);
      } else {
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Failed to load cases:", error);
    }
  },

  displayCases(cases) {
    const container = document.getElementById("cases-list");
    if (!container) return;
    
    if (!cases || cases.length === 0) {
      container.innerHTML = "<p>No cases yet.</p>";
      return;
    }
    
    const html = cases.map(c => this.createCaseHTML(c)).join("");
    container.innerHTML = html;
  },

  createCaseHTML(c) {
    const urgencyClass = c.Urgency === "Urgent" ? "urgent" : "normal";
    return `
      <div class="case-card">
        <div class="case-header">
          <h3>${this.escape(c.Name)}</h3>
          <span class="badge ${urgencyClass}">${c.Urgency}</span>
        </div>
        <div class="case-body">
          <p><strong>Case ID:</strong> ${this.escape(c["Case ID"])}</p>
          <p><strong>Email:</strong> ${this.escape(c.Email)}</p>
          <p><strong>Phone:</strong> ${this.escape(c.Phone)}</p>
          <p><strong>Visa Route:</strong> ${this.escape(c["Visa Route"])}</p>
          <p><strong>Status:</strong> ${this.escape(c.Status)}</p>
          <p><strong>Docs:</strong> ${c["Docs Received"] === "Yes" ? "✅ Yes" : "❌ No"}</p>
        </div>
        <div class="case-actions">
          ${c["Intake Form Link"] ? `<a href="${c["Intake Form Link"]}" target="_blank" class="btn btn-sm">Intake</a>` : ""}
          ${c["Upload Documents Link"] ? `<a href="${c["Upload Documents Link"]}" target="_blank" class="btn btn-sm">Upload</a>` : ""}
          ${c["Drive Folder Link"] ? `<a href="${c["Drive Folder Link"]}" target="_blank" class="btn btn-sm">Folder</a>` : ""}
        </div>
      </div>
    `;
  },

  escape(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  },

  startAutoRefresh() {
    this.refreshInterval = setInterval(() => this.loadCases(), this.AUTO_REFRESH);
  },

  stopAutoRefresh() {
    if (this.refreshInterval) clearInterval(this.refreshInterval);
  }
};

// Load on page ready
document.addEventListener("DOMContentLoaded", () => {
  Dashboard.init();
});

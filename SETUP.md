# UK Immigration Case Manager - Setup Guide

## 🚀 Quick Start

Your immigration case dashboard is now live! This web app displays real-time case data from your Google Sheets that's updated by your WhatsApp bot.

## 🔑 Configuration Required

### 1. Get Google Sheets API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Enable **Google Sheets API**
4. Go to **Credentials** → **Create Credentials** → **API Key**
5. **Restrict the API key**:
   - API restrictions: Select **Google Sheets API** only
   - (Optional) Add your GitHub Pages URL to HTTP referrers for security
6. Copy your API key

### 2. Update the Web App Configuration

Edit the `index.html` file and update line 50:

```javascript
const CONFIG = {
    SHEET_ID: '1qobSLoixuJILlkSP-nIo4qOHzVOLMpWv',  // Your Sheet ID
    API_KEY: 'YOUR_API_KEY_HERE',  // ⚠️ REPLACE WITH YOUR ACTUAL API KEY
    SHEET_NAME: 'Cases'  // Your sheet tab name
};
```

### 3. Make Google Sheet Public (Read-Only)

1. Open your Google Sheet: `https://docs.google.com/spreadsheets/d/1qobSLoixuJILlkSP-nIo4qOHzVOLMpWv/edit`
2. Click **Share** → **Change to "Anyone with the link"**
3. Set permission to **Viewer** (read-only)
4. Click **Done**

## 🌐 Enabling GitHub Pages

1. Go to your repository: https://github.com/sanjeevan11/immigration-ops-webapp
2. Click **Settings** tab
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select:
   - Branch: **main**
   - Folder: **/ (root)**
5. Click **Save**
6. Wait 1-2 minutes for deployment
7. Your live site: `https://sanjeevan11.github.io/immigration-ops-webapp/`

## ✅ How It Works

### Real-Time Data Flow

```
WhatsApp Bot (Flask) → Google Apps Script → Google Sheets → Web Dashboard
     │                         │                      │              │
     └────────────────────────────────────────────────────┘
                    NO CODE CHANGES NEEDED!
```

- ✅ **No Flask changes required** - your WhatsApp bot continues working as-is
- ✅ **No redeployment needed** - dashboard auto-refreshes every 10 seconds
- ✅ **Real-time updates** - new cases appear automatically
- ✅ **Free hosting** - GitHub Pages is completely free

## 📊 Dashboard Features

- **Live Statistics**: Total cases, urgent cases, pending, and new
- **Case Cards**: Display all case details from Google Sheets
- **Auto-Refresh**: Updates every 10 seconds automatically
- **Mobile Responsive**: Works on all devices
- **Direct Links**: Click to open Google Drive folders

## 🔧 Troubleshooting

### Error: "Failed to load dashboard"
- ✓ Check API key is correct in `index.html`
- ✓ Verify Sheet ID matches your Google Sheet
- ✓ Ensure sheet is public (Viewer access)
- ✓ Confirm Google Sheets API is enabled in Cloud Console

### Cases not showing
- ✓ Check sheet tab name is "Cases" (case-sensitive)
- ✓ Verify first row has headers matching your Apps Script
- ✓ Open browser console (F12) for error details
- ✓ Confirm your WhatsApp bot is writing to the correct sheet

### Real-time updates not working
- ✓ Check auto-refresh is enabled (should refresh every 10 seconds)
- ✓ Clear browser cache (Ctrl+Shift+Delete)
- ✓ Verify API quota not exceeded (free tier: 100 requests/100 seconds)

## 📦 What's Included

- `index.html` - Complete dashboard with real-time Google Sheets integration
- `SETUP.md` - This setup guide
- `README.md` - Project documentation

## 🔒 Security Notes

- The Google Sheet is read-only (Viewer access)
- API key is restricted to Sheets API only
- No sensitive data is stored in the web app
- All data remains in your Google Sheets
- Optional: Add HTTP referrer restrictions to your API key

## 📞 Support

For issues:
1. Check browser console (F12) for error messages
2. Verify all configuration steps above
3. Ensure your WhatsApp bot is writing to the correct Google Sheet
4. Test the Google Sheets API URL directly in your browser

## 🎉 You're Done!

Once configured, your dashboard will:
- Display all cases from your WhatsApp bot
- Update automatically every 10 seconds
- Work on any device with a browser
- Require zero maintenance

**Live URL**: `https://sanjeevan11.github.io/immigration-ops-webapp/`

Enjoy your real-time immigration case dashboard! 🚀

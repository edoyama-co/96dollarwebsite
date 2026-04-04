# Google Sheets Waitlist Backend Setup

## Sheet Created
- **Name:** 96 Dollar Website — Waitlist
- **URL:** https://docs.google.com/spreadsheets/d/1KoLtofN6UUZ7BItGJfIDNI2g3Inv42ctgTW5PMdvVhk/edit
- **Headers:** Name | Email | Business | Timestamp

## Apps Script Setup (5 minutes)

1. Open the sheet above
2. Click **Extensions > Apps Script**
3. Delete any existing code and paste this:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data.name,
    data.email,
    data.business,
    data.timestamp || new Date().toISOString()
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. Click **Deploy > New deployment**
5. Click the gear icon next to "Select type" and choose **Web app**
6. Set:
   - Description: "96 Dollar Website Waitlist"
   - Execute as: **Me**
   - Who has access: **Anyone**
7. Click **Deploy**
8. Copy the Web app URL (looks like `https://script.google.com/macros/s/.../exec`)

## Add to Vercel Environment

Run this command (replace YOUR_URL with the Apps Script URL):

```bash
cd ~/96dollarwebsite
vercel env add GOOGLE_SCRIPT_URL production
```

Paste the URL when prompted. Then redeploy:

```bash
vercel --prod
```

## Test

After redeploying, submit the form on the site. Check the Google Sheet -- a new row should appear.

const { google } = require("googleapis");
const path = require("path");

const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, "../credentials.json"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

async function appendToSheet(values) {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  
  // Add validation
  if (!spreadsheetId) {
    throw new Error("GOOGLE_SHEET_ID is not set in environment variables");
  }

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Sheet1!A:D",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [values],
    },
  });
}

module.exports = { appendToSheet };
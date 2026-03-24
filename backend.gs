/**
 * Google Apps Script for "Pirate Outing Planner"
 * Features: 
 * - Store/Fetch dynamic plan configuration (JSON)
 * - Record/Fetch user responses
 */

const CONFIG_SHEET_NAME = "Config";
const RESPONSES_SHEET_NAME = "Responses";

function doGet(e) {
  const action = e.parameter.action;
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  if (action === "getConfig") {
    const sheet = getOrCreateSheet(ss, CONFIG_SHEET_NAME);
    const data = sheet.getRange(1, 1).getValue();
    return ContentService.createTextOutput(data || "{}").setMimeType(ContentService.MimeType.JSON);
  }
  
  if (action === "getResponses") {
    const sheet = getOrCreateSheet(ss, RESPONSES_SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    if (data.length <= 1) return ContentService.createTextOutput("[]").setMimeType(ContentService.MimeType.JSON);
    
    const headers = data[0];
    const rows = data.slice(1);
    const result = rows.map(row => {
      let obj = {};
      headers.forEach((header, i) => obj[header] = row[i]);
      return obj;
    });
    return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService.createTextOutput(JSON.stringify({error: "Invalid action"})).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const postData = JSON.parse(e.postData.contents);
  const action = postData.action;

  if (action === "saveConfig") {
    const sheet = getOrCreateSheet(ss, CONFIG_SHEET_NAME);
    sheet.getRange(1, 1).setValue(JSON.stringify(postData.config));
    return ContentService.createTextOutput(JSON.stringify({success: true})).setMimeType(ContentService.MimeType.JSON);
  }

  if (action === "submitResponse") {
    const sheet = getOrCreateSheet(ss, RESPONSES_SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["name", "outing", "foodType", "date", "timestamp"]);
    }
    sheet.appendRow([
      postData.name,
      postData.outing,
      postData.foodType,
      postData.date,
      new Date().toISOString()
    ]);
    return ContentService.createTextOutput(JSON.stringify({success: true})).setMimeType(ContentService.MimeType.JSON);
  }

  if (action === "deleteResponse") {
    const sheet = getOrCreateSheet(ss, RESPONSES_SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    const timestampToDelete = postData.timestamp;
    
    // Find the header index for timestamp
    const headers = data[0];
    const tsIndex = headers.indexOf("timestamp");
    
    if (tsIndex !== -1) {
      for (let i = 1; i < data.length; i++) {
        if (data[i][tsIndex].toString() === timestampToDelete.toString()) {
          sheet.deleteRow(i + 1);
          return ContentService.createTextOutput(JSON.stringify({success: true})).setMimeType(ContentService.MimeType.JSON);
        }
      }
    }
    return ContentService.createTextOutput(JSON.stringify({error: "Entry not found"})).setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService.createTextOutput(JSON.stringify({error: "Invalid action"})).setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSheet(ss, name) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }
  return sheet;
}

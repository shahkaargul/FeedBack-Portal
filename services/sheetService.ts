import { FeedbackData } from "../types";

/**
 * --- GOOGLE SHEETS SETUP INSTRUCTIONS ---
 * 
 * 1. Go to https://sheets.google.com and create a new sheet.
 * 2. Go to Extensions > Apps Script.
 * 3. Paste the following code into the script editor (Code.gs):
 * 
 *    function doPost(e) {
 *      var lock = LockService.getScriptLock();
 *      lock.tryLock(10000);
 *      
 *      try {
 *        var doc = SpreadsheetApp.getActiveSpreadsheet();
 *        var sheet = doc.getActiveSheet();
 *        
 *        // If headers are missing, set them up (First run)
 *        if (sheet.getLastRow() === 0) {
 *           var headerRow = [
 *             "Timestamp", "Full Name", "Batch", "Email", "Role", 
 *             "Overall Satisfaction", "Content Quality", "Nostalgia", 
 *             "Registration", "Venue Comfort", "Food Quality", 
 *             "Best Moment", "Improvements", "Suggestions", "Files Uploaded"
 *           ];
 *           sheet.appendRow(headerRow);
 *        }
 *        
 *        var data = JSON.parse(e.postData.contents);
 *        var newRow = [
 *          new Date(),
 *          data.fullName,
 *          data.batchYear,
 *          data.email,
 *          data.currentRole,
 *          data.overallSatisfaction,
 *          data.contentQuality,
 *          data.nostalgiaFactor,
 *          data.registrationProcess,
 *          data.venueComfort,
 *          data.foodQuality,
 *          data.bestMoment,
 *          data.improvements,
 *          data.futureSuggestions,
 *          data.uploads ? data.uploads.join(", ") : ""
 *        ];
 *        
 *        sheet.appendRow(newRow);
 *        
 *        return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
 *          .setMimeType(ContentService.MimeType.JSON);
 *      } catch (e) {
 *        return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": e.toString() }))
 *          .setMimeType(ContentService.MimeType.JSON);
 *      } finally {
 *        lock.releaseLock();
 *      }
 *    }
 * 
 * 4. Click "Deploy" > "New Deployment".
 * 5. Select type: "Web app".
 * 6. Description: "Feedback Form".
 * 7. Execute as: "Me".
 * 8. Who has access: "Anyone" (Important!).
 * 9. Click "Deploy".
 * 10. Copy the "Web app URL" and paste it into the SCRIPT_URL variable below.
 */

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwzHv3C2yuYnE7pErCQJS7tWGaYgQrPbCvww6XYI_6f4J6hX9UE7Qs7P92ohPse4Ivx/exec'; // <--- PASTE YOUR WEB APP URL HERE

export const submitToGoogleSheets = async (data: FeedbackData): Promise<boolean> => {
  // If no URL is provided, simulate a successful submission for testing purposes
  if (!SCRIPT_URL) {
    console.warn("Google Sheet Script URL is not set. Data will not be saved.");
    console.log("Simulated Payload:", data);
    return new Promise((resolve) => setTimeout(() => resolve(true), 1500));
  }

  // Convert File objects to just names for the sheet (Sheets can't store binary file data directly via this method)
  const payload = {
    ...data,
    uploads: data.uploads.map(file => file.name)
  };

  try {
    // 'no-cors' mode is required for Google Apps Script Web Apps when fetching from client-side
    // This means we cannot read the response status/body, but the request will succeed.
    await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    return true;
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    return false;
  }
};
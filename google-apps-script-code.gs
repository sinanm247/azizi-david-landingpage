/**
 * Google Apps Script for Olfah by Alef Google Ads Sheet
 * Handles Sheet1 (Contact Form, Popup Form & Chatbot leads)
 */

// ============================================
// SHEET CONFIGURATION
// ============================================
const SHEET1_NAME = "Sheet1";

// Sheet1 column headers (must match your Google Sheet)
const SHEET1_HEADERS = [
  "Date & Time", 
  "Name", 
  "Phone Number", 
  "Email", 
  "Message", 
  "Source",
  "Configuration"
];

// Email recipients for notifications
const SHEET1_RECIPIENTS = "mohammedsinanchinnu07@gmail.com, sadikshaikh529@gmail.com, sales@propwiserealtyllc.com";

// Sheet link
const SHEET1_LINK = "https://docs.google.com/spreadsheets/d/10ILHRseDzaxx30QpgzW0tw253qa3ozLBecVRqqIANqw/edit?gid=0#gid=0";

// ============================================
// ONCHANGE TRIGGER (Handles Sheet1)
// ============================================
function sendEmailNotificationOnNewRow(e) {
  try {
    const sheet = e.source.getActiveSheet();
    const sheetName = sheet.getName();
    
    // Only handle Sheet1
    if (sheetName === SHEET1_NAME) {
      handleSheet1Change(e, sheet);
    }
  } catch (error) {
    console.error("Error in sendEmailNotificationOnNewRow:", error);
  }
}

// ============================================
// SHEET1 HANDLER (Contact Form, Popup Form & Chatbot)
// ============================================
function handleSheet1Change(e, sheet) {
  const lastRow = sheet.getLastRow();
  
  // Check if a new row is added
  const properties = PropertiesService.getScriptProperties();
  const previousRowCount = Number(properties.getProperty("lastRowCount_Sheet1")) || 0;
  
  // If the current row count is greater than the previous count, a new row was added
  if (lastRow > previousRowCount) {
    const message = `A new lead is added to Sheet1 (Contact Form/Popup Form/Chatbot). You can view it here: <a href="${SHEET1_LINK}"> Olfah by Alef Leads - Contact Leads</a>`;
    
    // Send the email notification to multiple recipients
    MailApp.sendEmail({
      to: SHEET1_RECIPIENTS,
      subject: "Olfah by Alef Leads",
      htmlBody: message
    });
  }
  
  // Update the last row count for Sheet1
  properties.setProperty("lastRowCount_Sheet1", lastRow.toString());
}

// ============================================
// WEB APP ENDPOINT (Receives form submissions)
// ============================================
function doPost(e) {
  try {
    // Parse the incoming data - handle both JSON and form-encoded
    let data;
    
    // Try to parse as JSON first (check both type and contents)
    if (e.postData && e.postData.contents) {
      try {
        // Try parsing as JSON
        data = JSON.parse(e.postData.contents);
      } catch (jsonError) {
        // If JSON parsing fails, try form-encoded
        data = e.parameter || {};
        // Convert string booleans back to actual booleans for visitedBefore
        if (data.visitedBefore === 'true') {
          data.visitedBefore = true;
        } else if (data.visitedBefore === 'false') {
          data.visitedBefore = false;
        } else if (data.visitedBefore === '' || data.visitedBefore === null || data.visitedBefore === undefined) {
          data.visitedBefore = null;
        }
      }
    } else {
      // Fallback to parameter-based (form-encoded)
      data = e.parameter || {};
      // Convert string booleans back to actual booleans for visitedBefore
      if (data.visitedBefore === 'true') {
        data.visitedBefore = true;
      } else if (data.visitedBefore === 'false') {
        data.visitedBefore = false;
      } else if (data.visitedBefore === '' || data.visitedBefore === null || data.visitedBefore === undefined) {
        data.visitedBefore = null;
      }
    }
    
    // Log for debugging (remove in production if needed)
    Logger.log("Received data: " + JSON.stringify(data));
    Logger.log("Source from data: " + data.source);
    Logger.log("Configuration from data: " + data.configuration);
    
    // Get Sheet1
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet1 = ss.getSheetByName(SHEET1_NAME);
    
    // Create Sheet1 if it doesn't exist
    if (!sheet1) {
      sheet1 = ss.insertSheet(SHEET1_NAME);
    }
    
    // Always ensure headers are correct (update if needed)
    const currentLastColumn = sheet1.getLastColumn();
    if (currentLastColumn < SHEET1_HEADERS.length) {
      // Update headers to include all columns
      sheet1.getRange(1, 1, 1, SHEET1_HEADERS.length).setValues([SHEET1_HEADERS]);
      // Format header row
      const headerRange = sheet1.getRange(1, 1, 1, SHEET1_HEADERS.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#302824");
      headerRange.setFontColor("#ffffff");
      Logger.log("Updated Sheet1 headers to include all " + SHEET1_HEADERS.length + " columns");
    } else {
      // Verify headers match (in case they're wrong)
      const currentHeaders = sheet1.getRange(1, 1, 1, SHEET1_HEADERS.length).getValues()[0];
      let headersMatch = true;
      for (let i = 0; i < SHEET1_HEADERS.length; i++) {
        if (currentHeaders[i] !== SHEET1_HEADERS[i]) {
          headersMatch = false;
          break;
        }
      }
      if (!headersMatch) {
        sheet1.getRange(1, 1, 1, SHEET1_HEADERS.length).setValues([SHEET1_HEADERS]);
        const headerRange = sheet1.getRange(1, 1, 1, SHEET1_HEADERS.length);
        headerRange.setFontWeight("bold");
        headerRange.setBackground("#302824");
        headerRange.setFontColor("#ffffff");
        Logger.log("Corrected Sheet1 headers");
      }
    }
    
    // Prepare row data
    const dateTime = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Dubai",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
    
    // Helper function to handle empty values
    const getValue = (value) => {
      if (value === null || value === undefined || value === "") {
        return "-";
      }
      return value.toString();
    };
    
    // Determine source (Chatbot, Contact Form, or Popup Form)
    // Check if source exists and is not empty, otherwise determine from other fields
    let source = "Contact Form"; // Default
    if (data.source !== undefined && data.source !== null && String(data.source).trim() !== "") {
      source = String(data.source).trim();
    } else if (data.selectedOption !== undefined && data.selectedOption !== null && String(data.selectedOption).trim() !== "") {
      source = "Chatbot";
    }
    
    // Use message as-is (already formatted in JavaScript for chatbot)
    const message = getValue(data.message);
    
    // Prepare row data with 7 fields
    const rowData = [
      dateTime,                                    // Date & Time
      getValue(data.name),                         // Name
      getValue(data.phone),                        // Phone Number
      getValue(data.email),                        // Email
      message,                                     // Message
      getValue(source),                            // Source
      getValue(data.configuration)                 // Configuration
    ];
    
    // Log before saving
    Logger.log("Determined source: " + source);
    Logger.log("Configuration value: " + data.configuration);
    Logger.log("Row data array length: " + rowData.length);
    Logger.log("Row data: " + JSON.stringify(rowData));
    
    // Get the next available row
    const nextRow = sheet1.getLastRow() + 1;
    
    // Write data to all columns using setValues (more reliable than appendRow)
    sheet1.getRange(nextRow, 1, 1, SHEET1_HEADERS.length).setValues([rowData]);
    
    // Log success with detailed information
    Logger.log("Data saved successfully to Sheet1 at row: " + nextRow);
    Logger.log("Number of columns written: " + SHEET1_HEADERS.length);
    Logger.log("Expected columns: " + SHEET1_HEADERS.join(", "));
    Logger.log("Source saved: " + getValue(source));
    Logger.log("Configuration saved: " + getValue(data.configuration));
    
    // Send email notification immediately after saving data
    try {
      const emailMessage = `
        <h2>New Lead Submission - Olfah by Alef</h2>
        <p>A new lead has been submitted through the Olfah by Alef website.</p>
        <hr>
        <p><strong>Name:</strong> ${getValue(data.name)}</p>
        <p><strong>Phone:</strong> ${getValue(data.phone)}</p>
        <p><strong>Email:</strong> ${getValue(data.email)}</p>
        <p><strong>Source:</strong> ${getValue(source)}</p>
        <p><strong>Configuration:</strong> ${getValue(data.configuration)}</p>
        <p><strong>Date & Time:</strong> ${dateTime}</p>
        <hr>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><a href="${SHEET1_LINK}" style="background-color: #8A957E; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">View in Google Sheet</a></p>
      `;
      
      MailApp.sendEmail({
        to: SHEET1_RECIPIENTS,
        subject: "Olfah by Alef Leads - New Lead Submission: " + getValue(data.name),
        htmlBody: emailMessage
      });
      
      Logger.log("Email notification sent successfully to: " + SHEET1_RECIPIENTS);
    } catch (emailError) {
      // Log email error but don't fail the form submission
      Logger.log("Error sending email notification: " + emailError.toString());
      Logger.log("Form data was saved successfully, but email notification failed.");
    }
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: "Data saved successfully" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log error for debugging
    Logger.log("Error in doPost: " + error.toString());
    Logger.log("Error stack: " + error.stack);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ============================================
// OPTIONS HANDLER (For CORS preflight requests)
// ============================================
function doOptions() {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.JSON);
}

// ============================================
// GET ENDPOINT (For testing)
// ============================================
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ message: "Google Apps Script is running", timestamp: new Date() }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ============================================
// SETUP FUNCTIONS
// ============================================

/**
 * Create onChange trigger programmatically
 * Run this function once to set up the trigger
 */
function createChangeTrigger() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Check if a trigger already exists to avoid duplicates
  const triggers = ScriptApp.getUserTriggers(ss);
  const triggerExists = triggers.some(trigger => 
    trigger.getHandlerFunction() === "sendEmailNotificationOnNewRow"
  );
  
  if (!triggerExists) {
    ScriptApp.newTrigger("sendEmailNotificationOnNewRow")
      .forSpreadsheet(ss)
      .onChange()
      .create();
    Logger.log("Change trigger created successfully");
  } else {
    Logger.log("Trigger already exists");
  }
}

/**
 * Initialize Sheet1 with headers if it doesn't exist
 * Run this function once to set up Sheet1
 */
function initializeSheet1() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet1 = ss.getSheetByName(SHEET1_NAME);
  
  if (!sheet1) {
    sheet1 = ss.insertSheet(SHEET1_NAME);
    // Add headers
    sheet1.getRange(1, 1, 1, SHEET1_HEADERS.length).setValues([SHEET1_HEADERS]);
    
    // Format header row
    const headerRange = sheet1.getRange(1, 1, 1, SHEET1_HEADERS.length);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#302824");
    headerRange.setFontColor("#ffffff");
    
    // Set column widths (7 columns)
    sheet1.setColumnWidth(1, 150);  // Date & Time
    sheet1.setColumnWidth(2, 150);  // Name
    sheet1.setColumnWidth(3, 150);  // Phone Number
    sheet1.setColumnWidth(4, 200);  // Email
    sheet1.setColumnWidth(5, 300);  // Message
    sheet1.setColumnWidth(6, 120);  // Source
    sheet1.setColumnWidth(7, 120);  // Configuration
    
    Logger.log("Sheet1 initialized successfully");
  } else {
    Logger.log("Sheet1 already exists");
  }
}

/**
 * Update existing Sheet1 with all required columns
 * Run this if your Sheet1 only has 5 columns and you need to add the new ones
 */
function updateSheet1Headers() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet1 = ss.getSheetByName(SHEET1_NAME);
  
  if (!sheet1) {
    Logger.log("Sheet1 does not exist. Run initializeSheet1() first.");
    return;
  }
  
  // Update headers to include all columns
  sheet1.getRange(1, 1, 1, SHEET1_HEADERS.length).setValues([SHEET1_HEADERS]);
  
  // Format header row
  const headerRange = sheet1.getRange(1, 1, 1, SHEET1_HEADERS.length);
  headerRange.setFontWeight("bold");
  headerRange.setBackground("#302824");
  headerRange.setFontColor("#ffffff");
  
  // Set column widths for all columns
  sheet1.setColumnWidth(1, 150);  // Date & Time
  sheet1.setColumnWidth(2, 150);  // Name
  sheet1.setColumnWidth(3, 150);  // Phone Number
  sheet1.setColumnWidth(4, 200);  // Email
  sheet1.setColumnWidth(5, 300);  // Message
  sheet1.setColumnWidth(6, 120);  // Source
  sheet1.setColumnWidth(7, 120);  // Configuration
  
  Logger.log("Sheet1 headers updated successfully with all columns");
}

/**
 * Verify and fix Sheet1 structure
 * Run this to ensure Sheet1 has all required columns
 */
function verifyAndFixSheet1() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet1 = ss.getSheetByName(SHEET1_NAME);
  
  if (!sheet1) {
    Logger.log("Sheet1 does not exist. Creating it...");
    initializeSheet1();
    return;
  }
  
  const currentLastColumn = sheet1.getLastColumn();
  Logger.log("Current Sheet1 has " + currentLastColumn + " columns");
  Logger.log("Required columns: " + SHEET1_HEADERS.length);
  
  if (currentLastColumn < SHEET1_HEADERS.length) {
    Logger.log("Sheet1 is missing columns. Updating headers...");
    // Update headers
    sheet1.getRange(1, 1, 1, SHEET1_HEADERS.length).setValues([SHEET1_HEADERS]);
    
    // Format header row
    const headerRange = sheet1.getRange(1, 1, 1, SHEET1_HEADERS.length);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#302824");
    headerRange.setFontColor("#ffffff");
    
    // Set column widths (7 columns)
    sheet1.setColumnWidth(1, 150);  // Date & Time
    sheet1.setColumnWidth(2, 150);  // Name
    sheet1.setColumnWidth(3, 150);  // Phone Number
    sheet1.setColumnWidth(4, 200);  // Email
    sheet1.setColumnWidth(5, 300);  // Message
    sheet1.setColumnWidth(6, 120);  // Source
    sheet1.setColumnWidth(7, 120);  // Configuration
    
    Logger.log("Sheet1 updated successfully! Now has " + SHEET1_HEADERS.length + " columns");
    Logger.log("Columns: " + SHEET1_HEADERS.join(", "));
  } else {
    // Verify headers match
    const currentHeaders = sheet1.getRange(1, 1, 1, SHEET1_HEADERS.length).getValues()[0];
    let headersMatch = true;
    for (let i = 0; i < SHEET1_HEADERS.length; i++) {
      if (currentHeaders[i] !== SHEET1_HEADERS[i]) {
        headersMatch = false;
        break;
      }
    }
    
    if (!headersMatch) {
      Logger.log("Headers don't match. Updating...");
      sheet1.getRange(1, 1, 1, SHEET1_HEADERS.length).setValues([SHEET1_HEADERS]);
      const headerRange = sheet1.getRange(1, 1, 1, SHEET1_HEADERS.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#302824");
      headerRange.setFontColor("#ffffff");
      Logger.log("Headers corrected!");
    } else {
      Logger.log("Sheet1 structure is correct! All " + SHEET1_HEADERS.length + " columns are present.");
    }
  }
}

/**
 * Test function for Contact Form/Popup Form submissions
 * Run this to test if doPost is working correctly
 */
function testDoPost() {
  const testData = {
    name: "Test User",
    phone: "+971501234567",
    email: "test@example.com",
    message: "Test message",
    source: "Contact Form",
    configuration: "2 BHK"
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData),
      type: "application/json"
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log("Result: " + result.getContent());
  Logger.log("Test completed - check Sheet1 for the new row");
}

/**
 * Test function for Chatbot submissions
 * Run this to test if chatbot data is saved correctly
 */
function testChatbotDoPost() {
  const testData = {
    name: "Chatbot Test User",
    phone: "+971509876543",
    email: "", // Chatbot doesn't collect email
    message: "Chatbot Inquiry Details:\nSelected Option: Pricing & Plans\nVisited Before: Yes\nConfiguration: 2 BHK\nPage URL: http://localhost:3001/",
    source: "Chatbot",
    selectedOption: "Pricing & Plans",
    visitedBefore: true, // boolean
    configuration: "2 BHK",
    pageUrl: "http://localhost:3001/"
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData),
      type: "application/json"
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log("Result: " + result.getContent());
  Logger.log("Chatbot test completed - check Sheet1 for the new row");
  Logger.log("Expected: Message with formatted chatbot details, Source = 'Chatbot'");
}

/**
 * Setup function - Run this once to initialize everything
 */
function setup() {
  initializeSheet1();
  createChangeTrigger();
  Logger.log("Setup completed successfully");
}
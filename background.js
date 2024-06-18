const level = require("level/index");
const path = require("path");

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(["helloValue"], (data) => {
    const dbPath = path.join(chrome.extension.getURL("_database_"), "leveldb");
    const db = level(dbPath, { valueEncoding: "json" });

    db.get("helloValue", (err, value) => {
      if (err) {
        console.error("Error fetching value:", err);
      } else {
        console.log("Stored value:", value);
        chrome.runtime.sendMessage({ action: "updateValue", value });
      }
      db.close();
    });
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "fetchValue") {
    chrome.storage.local.get(["helloValue"], (data) => {
      const dbPath = path.join(
        chrome.extension.getURL("_database_"),
        "leveldb"
      );
      const db = level(dbPath, { valueEncoding: "json" });

      db.get("helloValue", (err, value) => {
        if (err) {
          console.error("Error fetching value:", err);
          sendResponse({ value: null });
        } else {
          console.log("Stored value:", value);
          sendResponse({ value });
        }
        db.close();
      });
    });
  }
  return true;
});

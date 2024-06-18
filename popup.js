const storedValueElement = document.getElementById("stored-value");
const fetchValueButton = document.getElementById("fetch-value");

fetchValueButton.addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "fetchValue" }, (response) => {
    if (response.value) {
      storedValueElement.textContent = response.value;
    } else {
      storedValueElement.textContent = "Error fetching value";
    }
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "updateValue") {
    storedValueElement.textContent = request.value;
  }
});

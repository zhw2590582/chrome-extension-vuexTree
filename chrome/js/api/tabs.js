exports.sendMessageToTab = (tabId, data, callback) => {
  chrome.tabs.sendMessage(tabId, data, callback);
};

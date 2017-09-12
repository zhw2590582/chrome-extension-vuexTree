// https://developer.chrome.com/extensions/tabs

exports.sendMessageToTab = (tabId, data, callback) => {
  chrome.tabs.sendMessage(tabId, data, callback);
};

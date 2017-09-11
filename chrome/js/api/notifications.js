// https://developer.chrome.com/extensions/notifications

var opt = {
  type: "basic",
  title: "Primary Title",
  message: "Primary message to display",
  iconUrl: "../images/icon-128.png"
}

chrome.notifications.create(opt);

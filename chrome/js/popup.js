import { sendMessageToTab } from './api/tabs.js';
import 'normalize.css';
import '../scss/popup.scss';

// 注册长连接端口
const port = chrome.runtime.connect({ name: 'popup' });

// 获取当前Tab
chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  let tabId = tabs[0].id;
  port.postMessage({tabId: tabId});
});

// 接收自Background
port.onMessage.addListener(function(message, sender, sendResponse) {
  console.log(message);
});

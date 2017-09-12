import { hook } from '../../package.json';
import { removeElement } from '../utils/dom';

// 注册长连接端口
const port = chrome.runtime.connect({ name: 'content' });
port.postMessage({tabId: null});

// 注入script
const head = document.getElementsByTagName('head')[0];
const script = document.createElement('script');
script.setAttribute('data-id', chrome.runtime.id);
script.type = 'text/javascript';
script.src = chrome.extension.getURL('js/browser.js');
head && head.appendChild(script);

// 监听浏览器事件
script.addEventListener(hook, function(e) {
  if (!e.detail.type) throw new TypeError('事件分发的参数对象不能缺少 ‘type’ 属性');
  if (e.target.dataset.id !== chrome.runtime.id) return;
  e.detail.type === '@init' && removeElement(script);
  chrome.runtime.sendMessage(e.detail);
});

// 监听端口事件
port.onMessage.addListener(function(message, sender, sendResponse) {
  if (!message.type) throw new TypeError('事件分发的参数对象不能缺少 ‘type’ 属性');
})

// 监听后台事件
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (!message.type) throw new TypeError('事件分发的参数对象不能缺少 ‘type’ 属性');
});

// 监听message事件
window.addEventListener("message", function(event) {
  if (event.source != window) return;
}, false);

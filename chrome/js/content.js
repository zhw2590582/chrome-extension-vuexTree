// 注册长连接端口
const port = chrome.runtime.connect({ name: 'content' });
port.postMessage({tabId: null});

// 注入script
const hook = require('../../package.json').hook;
const head = document.getElementsByTagName('head')[0];
const script = document.createElement('script');
script.setAttribute('data-id', chrome.runtime.id);
script.type = 'text/javascript';
script.src = chrome.extension.getURL('js/browser.js');
head && head.appendChild(script);

// 监听浏览器事件
script.addEventListener('hookEvent', function(e) {
  if (e.target.dataset.id !== chrome.runtime.id) return;
  if (!e.detail.type) throw new TypeError('事件分发的参数对象不能缺少 ‘type’ 属性');
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

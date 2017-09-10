// 注入script
const hook = require('../../package.json').hook;
const head = document.getElementsByTagName('head')[0];
const script = document.createElement('script');
script.setAttribute('data-id', chrome.runtime.id);
script.type = 'text/javascript';
script.src = chrome.extension.getURL('js/browser.js');
head && head.appendChild(script);

// 监听事件
script.addEventListener('hookEvent', function(e) {
  chrome.runtime.sendMessage(e.detail);
});

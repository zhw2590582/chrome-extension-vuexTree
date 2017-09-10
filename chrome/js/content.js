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
  console.log(e);
  if(!e.detail.type) throw new TypeError('事件分发的参数对象不缺少 ‘type’ 属性');
  chrome.runtime.sendMessage(e.detail);
});

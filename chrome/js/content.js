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
  switch (e.detail.type) {
    case '@init': // 初始化
      script.parentNode.removeChild(script);
      chrome.runtime.sendMessage({
        type: '@init'
      });
      break;
    case 'update': // 更新
      chrome.runtime.sendMessage({
        type: 'update',
        state: e.detail
      });
      break;
    default: // 默认
      throw new TypeError('分发事件请指定 type 属性');
  }
});

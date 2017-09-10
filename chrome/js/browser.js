import '../scss/browser.scss';

const curScriptElement = document.currentScript;
const hook = require('../../package.json').hook;

// 绑定事件
window[hook] = function(data) {
  const hookEvent = new CustomEvent('hookEvent', {
    detail: data
  });
  curScriptElement.dispatchEvent(hookEvent);
};

// 初始化
window[hook]({ type: '@init' });

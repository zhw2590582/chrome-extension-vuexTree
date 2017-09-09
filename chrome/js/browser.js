const curScriptElement = document.currentScript;
const hook = require('../../package.json').hook;

// 绑定事件
window[hook] = function(state = {}) {
  state.hook = hook;
  const hookEvent = new CustomEvent('hookEvent', {
    detail: state
  });
  curScriptElement.dispatchEvent(hookEvent);
};

// 初始化
window[hook]({ type: '@init' });

import '../scss/browser.scss';
import { hook } from '../../package.json';

// 绑定事件
const currentScript = document.currentScript;
window[hook] = function(data) {
  currentScript.dispatchEvent(
    new CustomEvent(hook, {
      detail: data
    })
  );
};

// 初始化
window[hook]({ type: '@init' });

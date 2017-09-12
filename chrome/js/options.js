import 'normalize.css';
import '../scss/options.scss';

// 获取background
const bg = chrome.extension.getBackgroundPage();

chrome.runtime.sendMessage({
  type: '@options'
});

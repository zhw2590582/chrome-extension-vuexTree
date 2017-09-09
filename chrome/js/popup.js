import 'normalize.css';
import '../scss/popup.scss';

// 注册端口
const bg = chrome.runtime.connect({ name: 'popup' });
bg.postMessage({});

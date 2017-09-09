import 'normalize.css';
import '../scss/inject.scss';
console.log('inject');

// 注册端口
const bg = chrome.runtime.connect({ name: 'inject' });
bg.postMessage({});

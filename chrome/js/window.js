import 'normalize.css';
import '../scss/window.scss';
console.log('window');

// 注册端口
const bg = chrome.runtime.connect({ name: 'window' });
bg.postMessage({});

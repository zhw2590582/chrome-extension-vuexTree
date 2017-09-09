import 'normalize.css';
import '../scss/options.scss';

// 注册端口
const bg = chrome.runtime.connect({ name: 'options' });
bg.postMessage({});

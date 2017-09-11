import { tree } from 'd3-state-visualizer';
import { removeElement } from '../utils/dom';
import 'normalize.css';
import '../scss/devtools.scss';

// 注册长连接端口
const port = chrome.runtime.connect({ name: 'devtools' });
port.postMessage({tabId: chrome.devtools.inspectedWindow.tabId});

// 生成状态树
const config = {
  state: {},
  id: 'vuexTree',
  size: window.innerWidth - 20,
  aspectRatio: 0.5,
  isSorted: false,
  widthBetweenNodesCoeff: 1.5,
  heightBetweenNodesCoeff: 2,
  tooltipOptions: { offset: { left: 30, top: 10 }, indentationSize: 2 },
  transitionDuration: 700
}

const render = tree(document.getElementById('app'), config);

let stateOld = {};
port.onMessage.addListener(function(message, sender, sendResponse) {
  if(!message && JSON.stringify(stateOld) === '{}') return;
  if(JSON.stringify(message) === JSON.stringify(stateOld)) return;
  removeElement(document.getElementById('notFound'));
  stateOld = message;
  render(message);
});

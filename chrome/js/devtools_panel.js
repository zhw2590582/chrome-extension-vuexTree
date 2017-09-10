import { tree } from 'd3-state-visualizer';
import { removeElement } from '../utils/dom';
import 'normalize.css';
import '../scss/devtools.scss';

// 注册端口
const backgroundPageConnection = chrome.runtime.connect({ name: 'devtools' });
backgroundPageConnection.postMessage({
  tabId: chrome.devtools.inspectedWindow.tabId
});

// 生成状态树
const config = {
  state: {},
  id: 'vuexTree',
  size: window.innerWidth,
  aspectRatio: 0.5,
  isSorted: false,
  widthBetweenNodesCoeff: 1.5,
  heightBetweenNodesCoeff: 2,
  tooltipOptions: { offset: { left: 30, top: 10 }, indentationSize: 2 },
  transitionDuration: 700
}

const render = tree(document.getElementById('app'), config);

let stateOld = {};
backgroundPageConnection.onMessage.addListener(function(message, sender, sendResponse) {
  if(JSON.stringify(message) === JSON.stringify(stateOld)) return;
  removeElement(document.getElementById('notFound'));
  stateOld = message;
  render(message);
});

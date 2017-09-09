import { tree } from 'd3-state-visualizer';
import { removeElement } from '../utils/dom';
import 'normalize.css';
import '../scss/devtools.scss';

// 注册端口
const bg = chrome.runtime.connect({ name: 'devtools' });
bg.postMessage({
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
let notFound = document.getElementById('notFound');
bg.onMessage.addListener(function(message, sender, sendResponse) {
  if(chrome.devtools.inspectedWindow.tabId !== message.tabId) return;
  document.getElementById('test').innerText = JSON.stringify(message);
  // if(JSON.stringify(message) === JSON.stringify(stateOld)) return;
  // removeElement(notFound);
  // stateOld = message;
  // render(message);
});

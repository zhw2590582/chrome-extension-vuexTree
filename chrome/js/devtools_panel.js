import { tree } from 'd3-state-visualizer';
import 'normalize.css';
import '../scss/devtools.scss';

const bg = chrome.runtime.connect({ name: 'devtools' });
const stateDuration = 1000;
const render = tree(document.getElementById('app'), {
  state: {},
  id: 'treeExample',
  size: 1500,
  aspectRatio: 0.5,
  isSorted: false,
  widthBetweenNodesCoeff: 1.5,
  heightBetweenNodesCoeff: 2,
  style: { border: '1px solid black' },
  tooltipOptions: { offset: { left: 30, top: 10 }, indentationSize: 2 },
  transitionDuration: 700
});

let stateOld = {};
bg.onMessage.addListener(function(message, sender, sendResponse) {
  if(JSON.stringify(message) === JSON.stringify(stateOld)) return;
  stateOld = message;
  render(message);
});

setInterval(() => {
  bg.postMessage();
}, stateDuration);

import { tree } from 'd3-state-visualizer';
import 'normalize.css';
import '../scss/devtools.scss';

const bg = chrome.runtime.connect({ name: 'devtools' });
const stateDuration = 1000;
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
bg.onMessage.addListener(function(message, sender, sendResponse) {
  if(JSON.stringify(message) === JSON.stringify(stateOld)) return;
  stateOld = message;
  render(message);
});

setInterval(() => {
  bg.postMessage({});
}, stateDuration);

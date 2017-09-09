import { tree } from 'd3-state-visualizer';
import 'normalize.css';
import '../scss/popup.scss';

const backgroundPage = chrome.extension.getBackgroundPage().backgroundPage;
const defaultAppState = backgroundPage.state
const config = {
  state: backgroundPage.state,
  id: 'treeExample',
  size: 1000,
  aspectRatio: 0.5,
  isSorted: false,
  widthBetweenNodesCoeff: 1.5,
  heightBetweenNodesCoeff: 2,
  style: { border: '1px solid black' },
  tooltipOptions: { offset: { left: 30, top: 10 }, indentationSize: 2 },
  transitionDuration: 700
};

let render;
setTimeout(() => {
  render = tree(document.getElementById('app'), config);
}, 0)

setInterval(() => {
  render(backgroundPage.getState());
}, 1000);

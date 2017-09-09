import { tree } from 'd3-state-visualizer';
import 'normalize.css';
import '../scss/devtools.scss';

const bg = chrome.runtime.connect({ name: 'devtools' });

bg.onMessage.addListener(function(message, sender, sendResponse) {
  le config = {
    state: message || {},
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
    render(message);
  }, 0)
  
});

setInterval(() => {
  bg.postMessage();
}, 1000);

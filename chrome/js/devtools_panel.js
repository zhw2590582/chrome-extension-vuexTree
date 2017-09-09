import 'normalize.css';
import '../scss/devtools.scss';

const bg = chrome.runtime.connect({ name: 'devtools' });

bg.postMessage({ myProperty: 'value' });

bg.onMessage.addListener(function(message, sender, sendResponse) {
  document.getElementById('app').innerHTML = JSON.stringify(message);
});

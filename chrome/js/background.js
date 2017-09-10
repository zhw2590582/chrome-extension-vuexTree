import './background/browserAction';
import './background/runtime';
import './background/tabs';

let ports = {}
let states = {}

/**
* ================================== 长连接 ==================================
*/

chrome.runtime.onConnect.addListener(function(port) {
  !ports[port.name] && (ports[port.name] = {});
  if(port.name === 'devtools'){
    port.onMessage.addListener(function (message, sender, sendResponse) {
      ports[port.name][message.tabId] = port;
      port.postMessage(states[message.tabId]);
    });
  }
});

/**
* ================================== 订阅分发 ==================================
*/

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  switch (message.type) {
    case '@init':
      ports.devtools[sender.tab.id].postMessage(null);
      sendResponse(null);
      break;
    case '@update':
      states[sender.tab.id] = message.state;
      ports.devtools[sender.tab.id].postMessage(message.state);
      sendResponse(message);
      break;
    default:
  }
});

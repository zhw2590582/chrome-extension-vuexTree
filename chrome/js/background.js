import './background/browserAction';
import './background/runtime';
import './background/tabs';

/**
* ================================== 长连接集合 ==================================
*/

let ports = {}
chrome.runtime.onConnect.addListener(function(port) {
  !ports[port.name] && (ports[port.name] = {});
  if(port.name === 'devtools'){
    port.onMessage.addListener(function (message, sender, sendResponse) {
      ports[port.name][message.tabId] = port;
    });
  }
});

/**
* ================================== 订阅分发 ==================================
*/

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  switch (message.type) {
    case '@init': // 初始化
      console.log('前端初始化完成');
      break;
    case '@update': // 更新
      ports.devtools[sender.tab.id].postMessage(message.state);
      sendResponse(message);
      break;
    default: // 默认
  }
});

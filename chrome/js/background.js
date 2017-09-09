import './background/browserAction';
import './background/runtime';
import './background/tabs';

/**
* ================================== 页面信息 ==================================
*/

let state = null

/**
* ================================== 长连接集合 ==================================
*/

let ports = {};
let postMessage = (name, data) => {
  ports[name] && ports[name].postMessage(data)
};

chrome.runtime.onConnect.addListener(function(port) {
  ports[port.name] = port;
  if(port.name === 'devtools'){
    postMessage('devtools', state);
  }
});

/**
* ================================== 订阅分发 ==================================
*/

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  switch (request.type) {
    case '@init': // 初始化
      console.log('前端初始化完成');
      break;
    case '@update': // 更新
      state = request.data.state;
      postMessage('devtools', state);
      sendResponse(request);
      break;
    default: // 默认
  }
});

/**
* ================================== 标签变化 ==================================
*/

// 切换标签
chrome.tabs.onActivated.addListener(function(activeInfo) {
  console.log(activeInfo);
});

// 关闭标签
chrome.tabs.onRemoved.addListener(function(tabId) {
  console.log(tabId);
});

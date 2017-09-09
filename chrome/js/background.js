import './background/browserAction';
import './background/runtime';
import './background/tabs';

/**
* ================================== Background 全局对象 ==================================
*/

window.backgroundPage = {
  mutation: {},
  state: {},
  getMutation: () => backgroundPage.mutation,
  getState: () => backgroundPage.state
};


/**
* ================================== 消息订阅/分发中心 ==================================
*/

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(request, sender);
  switch (request.type) {
    case '@init': // 初始化
      console.log('初始化');
      break;
    case '@update': // 更新
      window.backgroundPage.mutation = request.data.mutation;
      window.backgroundPage.state = request.data.state;
      sendResponse(request);
      break;
    default: // 默认
      throw new TypeError('分发事件请指定 type 属性');
  }
});


/**
* ================================== 长连接 ==================================
*/

chrome.runtime.onConnect.addListener(function(port) {
  // devtools 面板
  if(port.name === 'devtools'){
    port.onMessage.addListener(function(message, sender, sendResponse) {
      port.postMessage(backgroundPage.getState());
    });
  }
});

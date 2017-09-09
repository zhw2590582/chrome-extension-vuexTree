import './background/browserAction';
import './background/runtime';
import './background/tabs';

/**
* ================================== 消息订阅/分发中心 ==================================
*/

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(request, sender);
  switch (request.type) {
    case '@init': // 初始化
      console.log('初始化');
      break;
    case 'update': // 更新
      console.log(request);
      break;
    default: // 默认
      throw new TypeError('分发事件请指定 type 属性');
  }
});

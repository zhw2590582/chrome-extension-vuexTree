/**
* ================================== 扩展状态 ==================================
*/

let ports = {
  devtools: {},
  popup: {},
  content: {},
};

let states = {};

/**
* ================================== 长连接中心 ==================================
*/

// 根据tabId保存所有port，并触发一次回调
// devtools、popup 通过 message 获取tabID
// content 通过 sender 获取tabID
chrome.runtime.onConnect.addListener(function(port) {
  if (!port.name) throw new TypeError('端口注册的参数对象不能缺少 ‘name’ 属性');
  port.name && !ports[port.name] && (ports[port.name] = {});
  port.onMessage.addListener(function(message, sender, sendResponse) {
    let tabId = message.tabId || sender.sender.tab.id;
    tabId && !ports[port.name][tabId] && (ports[port.name][tabId] = port);
    switch (port.name) {
      case 'devtools':
        port.postMessage(states[tabId]);
        break;
      case 'content':
        break;
      case 'popup':
        break;
      default:
    }
  });
});

/**
* ================================== 消息订阅中心 ==================================
*/

// 用于devtools、content、popup消息交流
// 根据tabId，保存不同的state，找到对应的port，并触发回调
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  console.log(message);
  if (!message.type) throw new TypeError('事件分发的参数对象不能缺少 ‘type’ 属性');
  let tabId = message.tabId || sender.tab.id;
  switch (message.type) {
    case '@init':
      break;
    case '@update':
      states[tabId] = message.state;
      ports.devtools[tabId] && ports.devtools[tabId].postMessage(message.state);
      break;
    default:
  }
});

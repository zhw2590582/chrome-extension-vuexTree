// https://developer.chrome.com/extensions/contextMenus

chrome.contextMenus.create({
  id: "some-command",
  title: "some title",
  contexts: ["all"]
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  console.log(info, tab);
});

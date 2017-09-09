const name = require('../../package.json').name;
chrome.devtools.panels.create(name, '', '../pages/devtools_panel.html');

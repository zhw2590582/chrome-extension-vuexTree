const name = require('../manifest.json').name;
chrome.devtools.panels.create(name, '', '../pages/devtools_panel.html');

var name = require('./package.json').name;
var fs = require('fs');
var ChromeExtension = require('crx');
var join = require('path').join;
var crx = new ChromeExtension({
  codebase: fs.readFileSync(join(__dirname, './' + name + '.crx')),
  privateKey: fs.readFileSync(join(__dirname, './' + name + '.pem'))
});

crx.load(join(__dirname, './' + name)).then(function() {
  return crx.pack().then(function(crxBuffer) {
    var updateXML = crx.generateUpdateXML();
    fs.writeFile(join(__dirname, 'update.xml'), updateXML);
    fs.writeFile(join(__dirname, name + '.crx'), crxBuffer);
  });
});

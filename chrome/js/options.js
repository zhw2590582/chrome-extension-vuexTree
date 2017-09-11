import 'normalize.css';
import '../scss/options.scss';

chrome.runtime.sendMessage({
  type: '@options'
});

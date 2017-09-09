exports.removeElement = el => {
  el && el.parentNode && el.parentNode.removeChild(el);
};


var jsdom = require('jsdom');
var domify = require('./domify');

module.exports = HTML;

/**
 * @param {Array} nodes
 */

function HTML(nodes){
  if (!(this instanceof HTML))
    return new HTML(nodes);
  nodes = typeof nodes == 'string'
    ? [nodes] : nodes;
  this.document = jsdom.jsdom();
  this.parse = domify.bind(this);
  this.nodes = this.add(nodes.join(''));
};

HTML.prototype.find = function(sel){
  return this.document.querySelector(sel);
};

HTML.prototype.findAll = function(sel){
  return this.document.querySelectorAll(sel);
};

HTML.prototype.add = function(html){
  var el = this.parse(html);
  this.document.body.appendChild(el);
  return this.document.body;
};




var Emitter = require('events').EventEmitter;
var inherits = require('util').inherits;
var RW = require('rework');
var HTML = require('./html');
var flags = require('./utils').flags;
var flagger = require('./utils').flagger;
var merge = require('./utils').merge;

module.exports = CSS;

inherits(CSS, Emitter);

function CSS(nodes, css, options){
  if (!(this instanceof CSS))
    return new CSS(nodes, css);
  options = options || {};
  this.options = merge(flags, options.flags || {});

  this._i = 0;
  this.rules = [];

  this.css = css;
  this.html = HTML.call(this, nodes);

  this.rework = RW(this.css);
  this.rework.use(walk(this));

  this.string = this.rework.toString();
  this.emit('review');
}

CSS.prototype.on('review', function(){
  var msg = msg;
  var idx = 1;
  var flags = this.rules.map(function(rule){return rule.flags[0]});
  if (flags.length < 1) return;
  flags.forEach(function(flag){
    if (!flag) return;
    process.stdout.write('\n');
    process.stdout.write('\033[0039m');
    process.stdout.write('\n  ' + idx + ') ');
    process.stdout.write('\033[0m')
    process.stdout.write('\033[0037m');
    process.stdout.write(flag.msg);
    process.stdout.write(' ');
    process.stdout.write(flag.sel.join(', '))
    process.stdout.write('\033[0m')
    process.stdout.write('\n\n');
    var start = flag.start;
    var end = flag.end;
    var string = flag.css.split('\n').map(function(str, i){
      if (i+1 < start.line || i+1 > end.line) return;
      process.stdout.write('     ');
      process.stdout.write('\033[30m');
      process.stdout.write(parseInt(start.line + i) + ' |')
      process.stdout.write('\033[0m')
      process.stdout.write('  ');
      flag.sel.forEach(function(s){
        str = str.replace(s, '\033[35m' + s + '\033[0m');
      });
      process.stdout.write(str + '\n')
    });
    idx++;
  });
});

function cut(string, delim, fn){
  if (typeof fn != 'function') fn = delim;
  string.split(delim || '\n');
  return string.map(fn);
}

CSS.prototype.flag = function(type, aux){
  var self = this;
  var flag = merge({type: type}, self.options[type]);
  var rule = self.rules[self._i];
  var out = flagger(flag, rule, self, aux);
  if (out) self.rules[self._i].flags.push(out);
};

function walk (grade) {
  return function(block){
    if (!block.rules) return;
    attachBlock(block, grade)
  };
}

function attachBlock(block, grade){
  block.rules.forEach(function(rule, i){
    grade._i = i;
    grade.rules[i] = rule;
    attachRules(rule, grade)
  });
}

function attachRules(rule, grade){
  if (!rule.selectors && rule.selectors.length) return;
  rule.selectors.forEach(function(sel){ attachSelectors(sel, rule, grade); });
}

function attachSelectors(selector, rule, grade){
  var sel = grade.html.find(selector);

  rule.flags = rule.flags || [];
  grade.rules[grade._i] = rule;

  if (!(sel && sel.innerHTML != 'undefined'))
    return grade.flag('css-orphan-selector', selector);

}



exports.flags = {
  'css-orphan-selector': {
    msg: 'No match on selector',
    display: true,
    aux: 'selectors'
  }
};

exports.flagger = function flagger(flag, rule, instance, aux){
  if (!flag.display) return;
  if (flag.aux && aux)
    rule[flag.aux] = [aux];
  var out = exports.merge(flag, rule.position);
  out.sel = rule.selectors;
  out.css = instance.css;
  return out;
};

exports.log = function log(msg, options){
  var args = Array.prototype.slice.call(arguments, 1);
  console.log.apply(null, [msg].concat(args));
};

/**
 * @param {String} msg
 * @param {Object} options
 *
 * Options:
 *   rule {Rule}
 */

exports.error = function error(msg, options){
  options = options || {};
  console.log(options);

  return exports.log(msg);
}

exports.merge = function(a,b){
  for (var k in b) a[k] = b[k];
  return a;
};

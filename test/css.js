
var CSS = require('../lib/css');

describe('css', function(){

  it('should work with matching selectors', function(){
    var nodes = '<h1>hi there</h1>';
    var styles = 'h1 { background: green }';
    var css = CSS(nodes, styles);
  });

  it('should break with mismatched selectors', function(){
    var nodes = '<h1>uh oh!</h1>';
    var styles = 'h2 { background: red } h3 { background: orange }'
    var css = CSS(nodes, styles);
  });

  it('should display multiple lines properly', function(){
    var nodes = '<div>hello</div>';
    var styles = [
      'p {',
      '  color: #ccc;',
      '}',
      '', '', '', '', '',
      'div, figure {',
      '  width: 10px',
      '}'
    ].join('\n');
    var css = CSS(nodes, styles);
  });

});

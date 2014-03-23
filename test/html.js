
var HTML = require('../lib/html');

describe('something', function(){
  it('should work', function(done){
    var nodes = [
      '<div>',
      '<ul>',
      '<li>list item 1</li>',
      '<li>list item 2</li>',
      '</ul>',
      '</div>'
    ];
    var html = HTML(nodes);
    done();
  });
});

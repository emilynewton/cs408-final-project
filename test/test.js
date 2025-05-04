import {sayHello} from '../js/main.js';
import {fetchLikeCount} from '../js/main.js'; 
import {addTopic} from '../js/main.js'; 
import {loadResponse} from '../js/main.js'; 
import {deleteItem} from '../js/main.js'; 

QUnit.module('hello', function() {

    QUnit.test('make sure the hello function says hello', function(assert) {
        var result = sayHello();
        assert.equal(result, 'hello');
    });


});

QUnit.module('fetch', function() {
    
    QUnit.test('making sure like count is properly fetched', function(assert) {
        count = fetchLikeCount("fermat-likes", "https://ff0fnmu6n5.execute-api.us-east-2.amazonaws.com/items/fermat-likes"); 
        assert.equal(count, "0"); 
    });

});

QUnit.module('addTopic', function() {

    QUnit.test('make sure the topic is added to the suggestions table', function(assert) {
        
    });

});

QUnit.module('loadResponse', function() {

    QUnit.test('make sure that the responses are loaded to the site', function(assert) {

    });

});

QUnit.module('deleteItem', function() {

    QUnit.test('make sure that the delete item works', function(assert) {
        assert.expect(2);
        const done = assert.async();
      
        const originalXhr = window.XMLHttpRequest;
        function MockXHR() {
          this.open = function(method, url) {
            assert.strictEqual(method, "DELETE");
            assert.ok(url.includes("/suggestions/item-123"));
          };
          this.setRequestHeader = function() {};
          this.send = function() { done(); };
          this.onload = function() {};
        }
        window.XMLHttpRequest = MockXHR;
        deleteItem("item-123");
        window.XMLHttpRequest = originalXhr;        
    });

});

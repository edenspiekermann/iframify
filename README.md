# Iframify

Replaces a node with an iframe version of itself. Read [the introduction article](http://dev.edenspiekermann.com/2016/04/05/introducing-iframify/).


## Usage

```js
// Single node
var component = document.querySelector('.component');
iframify(component);

// Collection of nodes
var components = document.querySelectorAll('.component');
Array.prototype.forEach.call(components, iframify);
```

Check out the [demo on CodePen](http://codepen.io/HugoGiraudel/pen/vGWpyr?editors=1000).


## Tests

```
python -m SimpleHTTPServer
open tests/index.html
```

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


## Notes

* External stylesheets cannot be parsed on the file system (`file:///`). It works fine with a local server though.
* On browsers which do not support the `srcdoc` attribute on `<iframe>`, iframes cannot be resized to fit the height of their component.
* JavaScript is not imported into the iframes.


## Tests

```
python -m SimpleHTTPServer
open tests/index.html
```

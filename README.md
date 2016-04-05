# Iframify

Replaces a node with an iframe version of itself.

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

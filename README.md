# Iframify

Replaces a node with an iframe version of itself. Read [the introduction article](http://dev.edenspiekermann.com/2016/04/05/introducing-iframify/).


## Usage

```js
// Single node
var component = document.querySelector('.component');
var iframe = iframify(component);

// Collection of nodes
var components = document.querySelectorAll('.component');
var iframes = Array.prototype.map.call(components, iframify);
```

It is also possible to pass extra CSS to be injected in the iframe.

```js
// Single node
var component = document.querySelector('.component');
var extraCSS = '.my-custom { content: ""; }';
var iframe = iframify(component, extraCSS);
```

Check out the [demo on CodePen](http://codepen.io/HugoGiraudel/pen/vGWpyr?editors=1000).


## Notes

* Does not work on browsers which do not support the `srcdoc` attribute on `<iframe>`.
* JavaScript is not imported into the iframes.


## Tests

```
open tests/index.html
```

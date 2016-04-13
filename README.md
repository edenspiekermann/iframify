# Iframify

Replaces a node with an iframe version of itself. Read [the introduction article](http://dev.edenspiekermann.com/2016/04/05/introducing-iframify/).


## Usage

```
iframify(HTMLElement, [options])
```

Where options is an object where keys can be:

* `styles` *(string)*: extra styles to be injected in a `<style>` tag in the `<head>`;
* `htmlAttr` *(object)*: an object of attributes to pass to the `<html>` element;
* `bodyAttr` *(object)*: an object of attributes to pass to the `<body>` element.

## Examples

```js
// Single node
var component = document.querySelector('.component');
var iframe = iframify(component);
```

```js
// Collection of nodes
var components = document.querySelectorAll('.component');
var iframes = Array.prototype.map.call(components, iframify);
```

```js
// <html> attributes
var component = document.querySelector('.component');
var iframe = iframify(component, {
  htmlAttr: { class: 'no-js', 'data-foo': 'bar' }
});
```

```js
// <body> attributes
var component = document.querySelector('.component');
var iframe = iframify(component, {
  bodyAttr: { class: 'body', id: 'top' }
});
```

```js
// Extra styles
var component = document.querySelector('.component');
var iframe = iframify(component, {
  styles: '.my-custom { content: ""; }'
});
```

Check out the [demo on CodePen](http://codepen.io/HugoGiraudel/pen/vGWpyr?editors=1000).


## Notes

* Does not work on browsers which do not support the `srcdoc` attribute on `<iframe>`.
* JavaScript is not imported into the iframes.


## Tests

```
open tests/index.html
```

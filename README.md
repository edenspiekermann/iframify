# Iframify

Replaces a node with an iframe version of itself. Read [the introduction article](http://dev.edenspiekermann.com/2016/04/05/introducing-iframify/).


## Usage

```
iframify(HTMLElement, [options])
```

Where options is an object where keys can be:

* **`styles`**  
  **Type:** `string`  
  **Default:** none  
  **Description:** Extra styles to be injected in a `<style>` tag in the `<head>`.  
  **Example:** `.component { color: red }`

* **`htmlAttr`**  
  **Type:** `object`  
  **Default:** none  
  **Description:** An object of attributes to pass to the `<html>` element.  
  **Example:** `{ class: 'no-js', 'data-foo': 'bar' }`

* **`bodyAttr`**  
  **Type:** `object`  
  **Default:** none  
  **Description:** An object of attributes to pass to the `<body>` element.  
  **Example:** `{ class: 'body', id: 'top' }`

* **`stylesSelector`**  
  **Type:** `string`  
  **Default:** `link[rel*=stylesheet], style`  
  **Description:** The selector to use to define what styles to import.  
  **Example:** `link[rel*=stylesheet]:not([href$="styleguide.css"]), style`

* **`metaCharset`**  
  **Type:** `string`  
  **Default:** the one in the outer document (if any).  
  **Description:** The string representation of the charset `<meta>` tag to import.  
  **Example:** `<meta charset="utf-8" />`

* **`metaViewport`**  
  **Type:** `string`  
  **Default:** the one in the outer document (if any).  
  **Description:** The string representation of the viewport `<meta>` tag to import.  
  **Example:** `<meta name="viewport" content="width=device-width, initial-scale=1">`

* **`sizingTimeout`**  
  **Type:** `number`  
  **Default:** `500`  
  **Description:** Number of milliseconds to wait before sizing the height of the iframe based on its content. Can be useful when injecting asynchronously loaded content.  
  **Example:** `1000`

## Examples

```js
// Single node
var component = document.querySelector('.component');
var iframe = iframify(component);
```

```js
// Collection of nodes
var components = document.querySelectorAll('.component');
var iframes = Array.prototype.map.call(components, function (component) {
  iframify(component, {});
});
```

```js
// With options
var component = document.querySelector('.component');
var iframe = iframify(component, {
  styles: '.component { color: red; }',
  metaViewport: '<meta name="viewport" content="width=device-width">'
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

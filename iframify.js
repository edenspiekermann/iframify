/**
 * iframify is a script that replaces a node with a dynamically generated iframe
 * verson of itself, including all its necessary styles to perform correctly.
 *
 * It can be useful when working with a styleguide displaying components, in
 * order to replicate element queries on a component level.
 *
 * For instance:
 *
 * var componentContainers = document.querySelectorAll('.styleguide-component-container')
 * Array.prototype.forEach.call(componentContainers, iframify)
 *
 * Demo:
 *
 * http://codepen.io/HugoGiraudel/pen/vGWpyr
 */

(function (global) {
  var metaViewport = document.querySelector('meta[name="viewport"]');
  var metaCharset = document.querySelector('meta[charset]');
  var stylesheets = Array.prototype.map.call(
    document.querySelectorAll('link[rel*=stylesheet], style'),
    function (stylesheet) { return stylesheet.outerHTML; }
  ).join('');

  /**
   * Get the content for the iframified version of a node.
   *
   * @param  {HTMLElement} node
   * @param  {Object} options
   * @return {String}
   */
  function getIframeContentForNode (node, options) {
    return '<!doctype html>' +
      '<html ' + formatAttributes(options.htmlAttr) + '>' +
      '<head>' +
        (metaCharset ? metaCharset.outerHTML : '') +
        (metaViewport ? metaViewport.outerHTML : '') +
        (stylesheets.length ? stylesheets : '') +
        (options.styles ? '<style>' + options.styles + '</style>' : '') +
      '</head>' +
      '<body ' + formatAttributes(options.bodyAttr) + '>' +
        node.innerHTML +
      '</body>' +
      '</html>';
  }

  /**
   * Format an object of attributes into a HTML string
   *
   * @param  {Object} attrObj
   * @return {String}
   */
  function formatAttributes (attrObj) {
    attrObj = attrObj || {};
    var attributes = [];

    for (var attribute in attrObj) {
      attributes.push(attribute + '="' + attrObj[attribute] + '"');
    }

    return attributes.join(' ');
  }

  /**
   * Get document height (stackoverflow.com/questions/1145850/)
   *
   * @param  {Document} doc
   * @return {Number}
   */
  function getDocumentHeight (doc) {
    doc = doc || document;
    var body = doc.body;
    var html = doc.documentElement;

    return Math.max(
      body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight
    );
  }

  /**
   * Transform a collection of nodes into an iframe version of themselves
   * including all the styles they need to perform correctly.
   *
   * @param  {HTMLElement} nodes
   * @param  {Object} options
   * @return undefined
   */
  function iframify (node, options) {
    options = options || {};
    var iframe = document.createElement('iframe');
    var html = getIframeContentForNode(node, options);
    iframe.srcdoc = html;

    if (!('srcdoc' in iframe)) {
      console.log(
        'Your browser does not support the `srcdoc` attribute on elements.' +
        'Therefore, it is not possible to wrap this node with an iframe due' +
        'to CORS policy.'
      );

      return null;
    }

    node.parentNode.replaceChild(iframe, node);

    setTimeout(function () {
      var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
      iframe.height = getDocumentHeight(iframeDocument);
    }, 500);

    return iframe;
  }

  global.iframify = iframify;
}(window));

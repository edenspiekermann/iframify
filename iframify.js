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
  function assign (target, source) {
    if (Object.assign) {
      return Object.assign.apply(null, arguments)
    }
  
    var from;
    var to = Object(target);
    var symbols;

    for (var s = 1; s < arguments.length; s++) {
      from = Object(arguments[s]);

      for (var key in from) {
        if (hasOwnProperty.call(from, key)) to[key] = from[key];
      }
    }

    return to;
  }

  function matches(node, selector) {
    var fn = (node.matches || node.msMatchesSelector);
    return fn.call(node, selector)
  }


  /**
   * Check whether a CSS rule matters in regard to a node.
   * 
   * @param {Node} node
   * @param {CSSStyleDeclaration} cssRule
   * @return {Boolean}
   */
  function shouldAddRule (node, cssRule) {
    if (cssRule.cssRules) { // @media rule
      for (var k = 0; k < cssRule.cssRules.length; k += 1) {
        if (matches(node, cssRule.cssRules[k].selectorText)) {
          return true;
        }
      }

      return false;
    }

    return node.matches(cssRule.selectorText);
  }

  /**
   * Get all the rules impacting a node as an object where the keys are the
   * rules, and the values are always `true`. Storing in an object instead of
   * a string or an array makes it possible to prevent duplicated rules without
   * having too much of a performance hit.
   * 
   * @param  {Node} node
   * @return {Object} - Keys are rules, values are `true`
   */
  function getRulesImpactingNode (node) {
    var stylesheets = document.styleSheets;
    var object = {};

    for (var i = 0; i < stylesheets.length; i += 1) {
      var cssRules = stylesheets[i].cssRules || stylesheets[i].rules;
      if (!cssRules) continue;

      for (var j = 0; j < cssRules.length; j += 1) {
        if (shouldAddRule(node, cssRules[j])) {
          object[cssRules[j].cssText] = true;
        }
      }
    } 

    return object;
  }

  /**
   * Get string representation of all the styles relevant to a root node and all
   * its children.
   *
   * 
   * @param  {Node} rootNode
   * @return {String}
   */
  function getStylesForTree (rootNode) {
    var children = rootNode.querySelectorAll('*');
    var rules = Array.prototype.reduce.call(children, function (tree, child) {
      return assign({}, tree, getRulesImpactingNode(child));
    }, getRulesImpactingNode(rootNode));

    return Object.keys(rules).join('');
  }

  /**
   * Get the content for the iframified version of a node.
   * @param  {Node} node
   * @return {String}
   */
  function getIframeContentForNode (node, extraCSS) {
    return '<!doctype html>'
      + '<html lang="en">'
      + '<head>'
      + '<style>' + getStylesForTree(node) + '</style>'
      + (extraCSS ? '<style>' + extraCSS + '</style>' : '')
      + '</head>'
      + '<body>' + node.innerHTML + '</body>'
      + '</html>';
  }

  /**
   * Get document height (stackoverflow.com/questions/1145850/)
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
   * @param  {NodeList} nodes
   * @return undefined
   */
  function iframify (node, extraCSS) {
    var iframe = document.createElement('iframe');
    var html = getIframeContentForNode(node, extraCSS);
    iframe.srcdoc = html;
    iframe.src = 'data:text/html;charset=utf-8,' + encodeURI(html);
    node.parentNode.replaceChild(iframe, node);

    // If `srcdoc` is supported, there is no CORS issue therefore we can
    // dynamically resize iframe height. The setTimeout is there to make sure
    // that any asynchronously loaded content inside the component has been
    // safely loaded before computing the height.
    if ('srcdoc' in iframe) {
      setTimeout(function () {
        var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        iframe.height = getDocumentHeight(iframeDocument);
      }, 500);
    }
  }

  global.iframify = iframify;

}(window))

describe('iframify', function () {
  after(function () {
    document.querySelector('.test-suite').style.display = 'none';
  })

  it('should create an iframe', function () {
    var test = document.querySelector('.test-0 > .iframify');
    var actual = iframify(test);
    expect(actual).to.be.ok();
  });

  it('should inject content in iframe', function (done) {
    var test = document.querySelector('.test-1 > .iframify');
    var initialHTML = test.innerHTML;
    var iframe = iframify(test);

    iframe.onload = function () {
      var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
      var actual = initialHTML;
      var expected = iframe.contentDocument.body.innerHTML;
      expect(actual).to.be.equal(expected);
      done();
    }
  });

  it('should import conserve inline styles', function (done) {
    var test = document.querySelector('.test-2 > .iframify');
    var iframe = iframify(test);

    iframe.onload = function () {
      var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
      var component = iframeDocument.querySelector('.component');
      var actual = component.getAttribute('style');
      var expected = 'color: red';
      expect(actual).to.be.equal(expected);
      done();
    }
  });

  it('should import relevant styles from <style> tags', function (done) {
    var test = document.querySelector('.test-3 > .iframify');
    var iframe = iframify(test);

    iframe.onload = function () {
      var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
      var component = iframeDocument.querySelector('.component');
      var actual = iframe.contentWindow.getComputedStyle(component).getPropertyValue('color');
      var expected = 'rgb(255, 0, 0)';
      expect(actual).to.be.equal(expected);
      done();
    }
  });

  it('should import relevant styles from external stylesheets', function (done) {
    var test = document.querySelector('.test-4 > .iframify');
    var iframe = iframify(test);

    iframe.onload = function () {
      var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
      var component = iframeDocument.querySelector('.component');
      var actual = iframe.contentWindow.getComputedStyle(component).getPropertyValue('color');
      var expected = 'rgb(0, 255, 0)';
      expect(actual).to.be.equal(expected);
      done();
    }
  });

  it('should import styles for children', function (done) {
    var test = document.querySelector('.test-5 > .iframify');
    var iframe = iframify(test);

    iframe.onload = function () {
      var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
      var component = iframeDocument.querySelector('.component__element');
      var actual = iframe.contentWindow.getComputedStyle(component).getPropertyValue('color');
      var expected = 'rgb(0, 0, 255)';
      expect(actual).to.be.equal(expected);
      actual = iframe.contentWindow.getComputedStyle(component).getPropertyValue('font-weight');
      expected = 'bold';
      expect(actual).to.be.equal(expected);
      done();
    }
  });

  it('should import @media declarations', function (done) {
    var test = document.querySelector('.test-6 > .iframify');
    var iframe = iframify(test);

    iframe.onload = function () {
      var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
      var component = iframeDocument.querySelector('.component');
      var actual = iframe.contentWindow.getComputedStyle(component).getPropertyValue('color');
      var expected = 'rgb(1, 33, 7)';
      expect(actual).to.be.equal(expected);
      done();
    }
  });

  it('should import @supports declarations', function (done) {
    var test = document.querySelector('.test-7 > .iframify');
    var iframe = iframify(test);

    iframe.onload = function () {
      var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
      var component = iframeDocument.querySelector('.component');
      var actual = iframe.contentWindow.getComputedStyle(component).getPropertyValue('color');
      var expected = 'rgb(0, 42, 0)';
      expect(actual).to.be.equal(expected);
      done();
    }
  });

  it('should allow passing extra CSS', function (done) {
    var test = document.querySelector('.test-8 > .iframify');
    var iframe = iframify(test, '.component--test-8 { font-style: italic }');

    iframe.onload = function () {
      var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
      var component = iframeDocument.querySelector('.component');
      var actual = iframe.contentWindow.getComputedStyle(component).getPropertyValue('font-style');
      var expected = 'italic';
      expect(actual).to.be.equal(expected);
      done();
    }
  });

  it('should import the meta viewport if any', function (done) {
    var test = document.querySelector('.test-9 > .iframify');
    var iframe = iframify(test);

    iframe.onload = function () {
      var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
      var meta = iframeDocument.querySelector('meta[name="viewport"]');
      var actual = meta;
      expect(actual).to.be.ok();
      done();
    }
  });

  it('should import the meta charset if any', function (done) {
    var test = document.querySelector('.test-10 > .iframify');
    var iframe = iframify(test);

    iframe.onload = function () {
      var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
      var meta = iframeDocument.querySelector('meta[charset]');
      var actual = meta;
      expect(actual).to.be.ok();
      done();
    }
  });
});

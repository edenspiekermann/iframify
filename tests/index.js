describe('iframify', function () {
  after(function () {
    document.querySelector('.test-suite').style.display = 'none';
  })

  it('should create an iframe', function () {
    var test = document.querySelector('.test-0 > .iframify');
    iframify(test);
    var iframe = document.querySelector('.test-0 > iframe');

    expect(iframe).to.be.ok();
  });

  it('should inject content in iframe', function (done) {
    var test = document.querySelector('.test-1 > .iframify');
    var initialHTML = test.innerHTML;
    iframify(test);
    var iframe = document.querySelector('.test-1 > iframe');

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
    iframify(test);
    var iframe = document.querySelector('.test-2 > iframe');

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
    iframify(test);
    var iframe = document.querySelector('.test-3 > iframe');

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
    iframify(test);
    var iframe = document.querySelector('.test-4 > iframe');

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
    iframify(test);
    var iframe = document.querySelector('.test-5 > iframe');

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
    iframify(test);
    var iframe = document.querySelector('.test-6 > iframe');

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
    iframify(test);
    var iframe = document.querySelector('.test-7 > iframe');

    iframe.onload = function () {
      var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
      var component = iframeDocument.querySelector('.component');

      var actual = iframe.contentWindow.getComputedStyle(component).getPropertyValue('color');
      var expected = 'rgb(0, 42, 0)';

      expect(actual).to.be.equal(expected);

      done();
    }
  });
});

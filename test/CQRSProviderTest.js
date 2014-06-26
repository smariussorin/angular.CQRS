describe('CQRSProvider', function () {

  var CQRSProvider;

  beforeEach(function () {
    // Initialize the service provider by injecting it to a fake module's config block
    var fakeModule = angular.module('testApp', function () {
    });

    fakeModule.config(function (_CQRSProvider_) {
      CQRSProvider = _CQRSProvider_;
    });

    // Initialize ngCQRS module injector
    angular.mock.module('ngCQRS', 'testApp');

    // Kickstart the injectors previously registered with calls to angular.mock.module
    inject(function () {
    });
  });


  describe('#setUrlFactory()', function () {
    it('should set url factory function successfully', function () {
      CQRSProvider.setUrlFactory(function (dataId) {
        return dataId;
      });
    });
  });

  describe('#toUrlGETParameterString()', function () {
    it('should build valid url GET parameter string', function () {
      var buildString = CQRSProvider.toUrlGETParameterString({one: '1', 2: 'two'});

      expect(buildString.charAt(0)).to.be('?');
      expect(buildString).to.contain('one=1');
      expect(buildString).to.contain('2=two');
      expect(buildString).to.contain('&');
    });
  });

  describe('#registerDenormalizerFunctions()', function () {
    it('should register denormalizer function successfully', function () {
      CQRSProvider.registerDenormalizerFunctions('myResource', 'myEventName', function (originalData, delta) {
        originalData[delta.id] = delta;
        return originalData;
      });
    });

    it('should not allow to register multiple functions for the same resource/event combination', function () {
      CQRSProvider.registerDenormalizerFunctions('myResource', 'myEventName', function () {
        //foo
      });

      expect(function () {
        CQRSProvider.registerDenormalizerFunctions('myResource', 'myEventName', function () {
          //foo
        });
      }).to.throwException();
    });
  });

});
'use strict';

define('ember-starter/tests/adapters/application.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | adapters/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/application.js should pass jshint.');
  });
});
define('ember-starter/tests/app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass jshint.');
  });
});
define('ember-starter/tests/controllers/events.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/events.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/events.js should pass jshint.');
  });
});
define('ember-starter/tests/controllers/events/edit.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/events/edit.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/events/edit.js should pass jshint.');
  });
});
define('ember-starter/tests/controllers/events/new.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/events/new.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/events/new.js should pass jshint.');
  });
});
define('ember-starter/tests/helpers/create-offline-ref', ['exports', 'firebase'], function (exports, _firebase) {
  exports['default'] = createOfflineRef;
  var DEFAULT_NAME = '[EmberFire offline test app]';

  exports.DEFAULT_NAME = DEFAULT_NAME;
  /**
   * Creates an offline firebase reference with optional initial data and url.
   *
   * Be sure to `stubfirebase()` and `unstubfirebase()` in your tests!
   *
   * @param  {!Object} [initialData]
   * @param  {string} [url]
   * @param  {string} [apiKey]
   * @return {!firebase.database.Reference}
   */

  function createOfflineRef(initialData) {
    var url = arguments.length <= 1 || arguments[1] === undefined ? 'https://emberfire-tests-2c814.firebaseio.com' : arguments[1];
    var apiKey = arguments.length <= 2 || arguments[2] === undefined ? 'AIzaSyC9-ndBb1WR05rRF1msVQDV6EBqB752m6o' : arguments[2];

    if (!_firebase['default']._unStub) {
      throw new Error('Please use stubFirebase() before calling this method');
    }

    var config = {
      apiKey: apiKey,
      authDomain: 'emberfire-tests-2c814.firebaseapp.com',
      databaseURL: url,
      storageBucket: ''
    };

    var app = undefined;

    try {
      app = _firebase['default'].app(DEFAULT_NAME);
    } catch (e) {
      app = _firebase['default'].initializeApp(config, DEFAULT_NAME);
    }

    var ref = app.database().ref();

    app.database().goOffline(); // must be called after the ref is created

    if (initialData) {
      ref.set(initialData);
    }

    return ref;
  }
});
define('ember-starter/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
  }
});
define('ember-starter/tests/helpers/destroy-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/destroy-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass jshint.');
  });
});
define('ember-starter/tests/helpers/destroy-firebase-apps', ['exports', 'ember', 'firebase'], function (exports, _ember, _firebase) {
  exports['default'] = destroyFirebaseApps;
  var run = _ember['default'].run;

  /**
   * Destroy all Firebase apps.
   */

  function destroyFirebaseApps() {
    var deletions = _firebase['default'].apps.map(function (app) {
      return app['delete']();
    });
    _ember['default'].RSVP.all(deletions).then(function () {
      return run(function () {
        // NOOP to delay run loop until the apps are destroyed
      });
    });
  }
});
define('ember-starter/tests/helpers/format-date.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/format-date.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/format-date.js should pass jshint.');
  });
});
define('ember-starter/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'ember', 'ember-starter/tests/helpers/start-app', 'ember-starter/tests/helpers/destroy-app'], function (exports, _qunit, _ember, _emberStarterTestsHelpersStartApp, _emberStarterTestsHelpersDestroyApp) {
  var Promise = _ember['default'].RSVP.Promise;

  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _emberStarterTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        var _this = this;

        var afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return Promise.resolve(afterEach).then(function () {
          return (0, _emberStarterTestsHelpersDestroyApp['default'])(_this.application);
        });
      }
    });
  };
});
define('ember-starter/tests/helpers/module-for-acceptance.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/module-for-acceptance.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass jshint.');
  });
});
define('ember-starter/tests/helpers/replace-app-ref', ['exports'], function (exports) {
  exports['default'] = replaceAppRef;
  /**
   * Updates the supplied app adapter's Firebase reference.
   *
   * @param  {!Ember.Application} app
   * @param  {!firebase.database.Reference} ref
   * @param  {string} [model]  The model, if overriding a model specific adapter
   */

  function replaceAppRef(app, ref) {
    var model = arguments.length <= 2 || arguments[2] === undefined ? 'application' : arguments[2];

    app.register('service:firebaseMock', ref, { instantiate: false, singleton: true });
    app.inject('adapter:firebase', 'firebase', 'service:firebaseMock');
    app.inject('adapter:' + model, 'firebase', 'service:firebaseMock');
  }
});
define('ember-starter/tests/helpers/replace-firebase-app-service', ['exports'], function (exports) {
  exports['default'] = replaceFirebaseAppService;
  /**
   * Replaces the `firebaseApp` service with your own using injection overrides.
   *
   * This is usually not needed in test modules, where you can re-register over
   * existing names in the registry, but in acceptance tests, some registry/inject
   * magic is needed.
   *
   * @param  {!Ember.Application} app
   * @param  {!Object} newService
   */

  function replaceFirebaseAppService(app, newService) {
    app.register('service:firebaseAppMock', newService, { instantiate: false, singleton: true });
    app.inject('torii-provider:firebase', 'firebaseApp', 'service:firebaseAppMock');
    app.inject('torii-adapter:firebase', 'firebaseApp', 'service:firebaseAppMock');
  }
});
define('ember-starter/tests/helpers/resolver', ['exports', 'ember-starter/resolver', 'ember-starter/config/environment'], function (exports, _emberStarterResolver, _emberStarterConfigEnvironment) {

  var resolver = _emberStarterResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _emberStarterConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _emberStarterConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('ember-starter/tests/helpers/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass jshint.');
  });
});
define('ember-starter/tests/helpers/start-app', ['exports', 'ember', 'ember-starter/app', 'ember-starter/config/environment'], function (exports, _ember, _emberStarterApp, _emberStarterConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    var attributes = _ember['default'].merge({}, _emberStarterConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    _ember['default'].run(function () {
      application = _emberStarterApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});
define('ember-starter/tests/helpers/start-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/start-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });
});
define('ember-starter/tests/helpers/stub-firebase', ['exports', 'firebase'], function (exports, _firebase) {
  exports['default'] = stubFirebase;

  /**
   * When a reference is in offline mode it will not call any callbacks
   * until it goes online and resyncs. The ref will have already
   * updated its internal cache with the changed values so we shortcut
   * the process and call the supplied callbacks immediately (asynchronously).
   */

  function stubFirebase() {
    // check for existing stubbing
    if (!_firebase['default']._unStub) {
      var originalSet = _firebase['default'].database.Reference.prototype.set;
      var originalUpdate = _firebase['default'].database.Reference.prototype.update;
      var originalRemove = _firebase['default'].database.Reference.prototype.remove;

      _firebase['default']._unStub = function () {
        _firebase['default'].database.Reference.prototype.set = originalSet;
        _firebase['default'].database.Reference.prototype.update = originalUpdate;
        _firebase['default'].database.Reference.prototype.remove = originalRemove;
      };

      _firebase['default'].database.Reference.prototype.set = function (data, cb) {
        originalSet.call(this, data);
        if (typeof cb === 'function') {
          setTimeout(cb, 0);
        }
      };

      _firebase['default'].database.Reference.prototype.update = function (data, cb) {
        originalUpdate.call(this, data);
        if (typeof cb === 'function') {
          setTimeout(cb, 0);
        }
      };

      _firebase['default'].database.Reference.prototype.remove = function (cb) {
        originalRemove.call(this);
        if (typeof cb === 'function') {
          setTimeout(cb, 0);
        }
      };
    }
  }
});
define('ember-starter/tests/helpers/unstub-firebase', ['exports', 'firebase'], function (exports, _firebase) {
  exports['default'] = unstubFirebase;

  function unstubFirebase() {
    if (typeof _firebase['default']._unStub === 'function') {
      _firebase['default']._unStub();
      delete _firebase['default']._unStub;
    }
  }
});
define('ember-starter/tests/models/event.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | models/event.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/event.js should pass jshint.');
  });
});
define('ember-starter/tests/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass jshint.');
  });
});
define('ember-starter/tests/router.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | router.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass jshint.');
  });
});
define('ember-starter/tests/routes/events.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/events.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/events.js should pass jshint.');
  });
});
define('ember-starter/tests/routes/events/edit.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/events/edit.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/events/edit.js should pass jshint.');
  });
});
define('ember-starter/tests/routes/events/new.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/events/new.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/events/new.js should pass jshint.');
  });
});
define('ember-starter/tests/test-helper', ['exports', 'ember-starter/tests/helpers/resolver', 'ember-qunit'], function (exports, _emberStarterTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_emberStarterTestsHelpersResolver['default']);
});
define('ember-starter/tests/test-helper.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | test-helper.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jshint.');
  });
});
define('ember-starter/tests/unit/controllers/events-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:events', 'Unit | Controller | events', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('ember-starter/tests/unit/controllers/events-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/controllers/events-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/events-test.js should pass jshint.');
  });
});
define('ember-starter/tests/unit/controllers/events/edit-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:events/edit', 'Unit | Controller | events/edit', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('ember-starter/tests/unit/controllers/events/edit-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/controllers/events/edit-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/events/edit-test.js should pass jshint.');
  });
});
define('ember-starter/tests/unit/controllers/events/new-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:events/new', 'Unit | Controller | events/new', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('ember-starter/tests/unit/controllers/events/new-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/controllers/events/new-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/events/new-test.js should pass jshint.');
  });
});
define('ember-starter/tests/unit/controllers/tasks/edit-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:tasks/edit', 'Unit | Controller | tasks/edit', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('ember-starter/tests/unit/controllers/tasks/edit-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/controllers/tasks/edit-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/tasks/edit-test.js should pass jshint.');
  });
});
define('ember-starter/tests/unit/models/event-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('event', 'Unit | Model | event', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('ember-starter/tests/unit/models/event-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/models/event-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/event-test.js should pass jshint.');
  });
});
define('ember-starter/tests/unit/routes/events-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:events', 'Unit | Route | events', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('ember-starter/tests/unit/routes/events-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/events-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/events-test.js should pass jshint.');
  });
});
define('ember-starter/tests/unit/routes/events/edit-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:events/edit', 'Unit | Route | events/edit', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('ember-starter/tests/unit/routes/events/edit-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/events/edit-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/events/edit-test.js should pass jshint.');
  });
});
define('ember-starter/tests/unit/routes/events/new-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:events/new', 'Unit | Route | events/new', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('ember-starter/tests/unit/routes/events/new-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/events/new-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/events/new-test.js should pass jshint.');
  });
});
define('ember-starter/tests/unit/routes/tasks/edit-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:tasks/edit', 'Unit | Route | tasks/edit', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('ember-starter/tests/unit/routes/tasks/edit-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/tasks/edit-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/tasks/edit-test.js should pass jshint.');
  });
});
/* jshint ignore:start */

require('ember-starter/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;

/* jshint ignore:end */
//# sourceMappingURL=tests.map

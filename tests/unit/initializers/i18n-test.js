import { A } from '@ember/array';
import EmberObject from '@ember/object';
import Application from '@ember/application';
import { run } from '@ember/runloop';
import { initialize } from '../../../initializers/i18n';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | i18n', {
  beforeEach() {
    run(function() {
      application = Application.create();
      application.deferReadiness();
    });
  }
});

test('it registers correctly', function(assert) {
  const mockApp = EmberObject.create({
    inject(type, propertyName, serviceName) {
      assert.equal(propertyName, 'i18n');
      assert.equal(serviceName, 'service:i18n');
    }
  });
  initialize(mockApp);
});

test('it registers following types', function(assert) {
  assert.expect(5);
  const types = A([
    'component',
    'controller',
    'model',
    'route',
    'view'
  ]);
  const mockApp = EmberObject.create({
    inject(type) {
      assert.ok(types.contains(type), `it should register type: ${type}`);
    }
  });
  initialize(mockApp);
});

test('it works with (registry, application)', function(assert) {
  const mockApp = EmberObject.create({
    inject() {
      assert.ok(true, 'it should be called');
    }
  });
  initialize(null, mockApp);
});

test('it works with (application)', function(assert) {
  const mockApp = EmberObject.create({
    inject() {
      assert.ok(true, 'it should be called');
    }
  });
  initialize(mockApp);
});

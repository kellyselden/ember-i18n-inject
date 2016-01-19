import Ember from 'ember';
import { initialize } from '../../../initializers/i18n';
import { module, test } from 'qunit';

var container, application;

module('Unit | Initializer | i18n', {
  beforeEach: function() {
    Ember.run(function() {
      application = Ember.Application.create();
      container = application.__container__;
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it registers correctly', function(assert) {
  const mockApp = Ember.Object.create({
    inject(type, propertyName, serviceName) {
      assert.equal(propertyName, 'i18n');
      assert.equal(serviceName, 'service:i18n');
    }
  });
  initialize(container, mockApp);
});

test('it registers following types', function(assert) {
  const types = Ember.A([
    'component',
    'controller',
    'model',
    'route',
    'view'
  ]);
  const mockApp = Ember.Object.create({
    inject(type) {
      assert.ok(types.contains(type), `it should register type: ${type}`);
    }
  });
  initialize(container, mockApp);
});

test('it works with (registry, application)', function(assert) {
  const mockApp = Ember.Object.create({
    inject() {
      assert.ok(true, 'it should be called');
    }
  });
  initialize(container, mockApp);
});

test('it works with (application)', function(assert) {
  const mockApp = Ember.Object.create({
    inject() {
      assert.ok(true, 'it should be called');
    }
  });
  initialize(mockApp);
});

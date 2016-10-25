'use strict';

var _common = require('./common');

var _chai = require('chai');

describe('test getDefaultValue', function () {
  it('is object', function () {
    var value = (0, _common.getDefaultValue)();
    _chai.assert.isObject(value);
  });

  it('is not extensible', function () {
    var value = (0, _common.getDefaultValue)();
    _chai.assert.isNotExtensible(value);
  });
});

describe('test setter', function () {
  it('don\'t edit previous state', function () {

    var value1 = (0, _common.getDefaultValue)();
    var value2 = (0, _common.set)(value1, { a: 100 });

    _chai.assert.notStrictEqual(value1, value2);
    _chai.assert.propertyVal(value2, 'a', 100);
  });
});
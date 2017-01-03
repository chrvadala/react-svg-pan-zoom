import { getDefaultValue, set } from './common';

import { assert } from 'chai';

describe('test getDefaultValue', function () {
  it('is object', function () {
    var value = getDefaultValue();
    assert.isObject(value);
  });

  it('is not extensible', function () {
    var value = getDefaultValue();
    assert.isNotExtensible(value);
  });
});

describe('test setter', function () {
  it('don\'t edit previous state', function () {

    var value1 = getDefaultValue();
    var value2 = set(value1, { a: 100 });

    assert.notStrictEqual(value1, value2);
    assert.propertyVal(value2, 'a', 100);
  });
});
import {getDefaultValue, set} from './common';

import {assert} from 'chai';

describe('test getDefaultValue', () => {
  it('is object', () => {
    let value = getDefaultValue();
    assert.isObject(value);
  });

  it('is not extensible', () => {
    let value = getDefaultValue();
    assert.isNotExtensible(value);
  })
});

describe('test setter', () => {
  it('don\'t edit previous state', () => {

    let value1 = getDefaultValue();
    let value2 = set(value1, {a: 100});

    assert.notStrictEqual(value1, value2);
    assert.propertyVal(value2, 'a', 100);
  })
});

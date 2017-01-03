import { pan } from './pan';

import { assert } from 'chai';

describe('test pan', function () {
  it('is panned', function () {

    var value = pan(null, 100, 100);
    assert.isObject(value);
  });
});
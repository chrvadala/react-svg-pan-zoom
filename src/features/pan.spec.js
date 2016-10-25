import {pan} from './pan';

import {assert} from 'chai';

describe('test pan', () => {
  it('is panned', () => {

    let value = pan(null, 100, 100);
    assert.isObject(value);



  });

});

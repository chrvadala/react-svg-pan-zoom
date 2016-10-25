'use strict';

var _pan = require('./pan');

var _chai = require('chai');

describe('test pan', function () {
  it('is panned', function () {

    var value = (0, _pan.pan)(null, 100, 100);
    _chai.assert.isObject(value);
  });
});
'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.all_test = {

  setUp: function(done) {
    done();
  },

  keep_default: function(test) {
    var pattern = 'tmp/keep_default.*.js';
    var actual = grunt.file.expand(pattern);

    test.expect(1);
    test.equal(actual.length, 10, 'Should be equal.');
    test.done();
  },

  keep_five: function(test) {
    var pattern = 'tmp/keep_five.*.js';
    var actual = grunt.file.expand(pattern);

    test.expect(1);
    test.equal(actual.length, 5, 'Should be equal.');
    test.done();
  },

  multiple_src_mappings: function(test) {
    var pattern1 = 'tmp/multiple_src_mappings_one.*.js';
    var actual1 = grunt.file.expand(pattern1);

    var pattern2 = 'tmp/multiple_src_mappings_two.*.js';
    var actual2 = grunt.file.expand(pattern2);

    test.expect(1);
    test.equal(actual1.length + actual2.length, 10, 'Should be equal.');
    test.done();
  }

};

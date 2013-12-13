/*
 * grunt-funky-cleanv
 * https://github.com/davemedema/grunt-funky-cleanv
 *
 * Copyright (c) 2013 Dave Medema
 * Licensed under the MIT license.
 */

'use strict';

var semver = require('semver');

/**
 * Exports.
 *
 * @param {Object} grunt
 */
module.exports = function(grunt) {

  var utils = require('funky-grunt-utils')(grunt);

  // register task
  grunt.registerMultiTask('cleanv', function() {
    var opts = this.options({
      keep: 10
    });

    var cleaned = 0;
    var regexp  = /\d+(\.\d+)+/;

    if (this.files.length <= opts.keep) {
      grunt.log.ok(cleaned + ' file(s) cleaned.');
      return;
    }

    // build filepaths
    var filepaths = [];

    this.files.forEach(function(fm) {
      fm.src.forEach(function(filepath) {
        filepaths.push(filepath);
      });
    });

    // sort filepaths
    filepaths.sort(function(a, b) {
      var av = a.match(regexp);
      var bv = b.match(regexp);
      return (semver.gt(av[0], bv[0])) ? 1 : -1;
    });

    // delete old files
    var take = filepaths.length - opts.keep;
    filepaths.slice(0, take).forEach(function(filepath) {
      grunt.file['delete'](filepath);
      cleaned++;
    });

    // inform
    grunt.log.ok(cleaned + ' file(s) cleaned.');
  });

};

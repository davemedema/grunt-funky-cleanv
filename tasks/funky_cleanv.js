/*
 * grunt-funky-cleanv
 * https://github.com/davemedema/grunt-funky-cleanv
 *
 * Copyright (c) 2013 Dave Medema
 * Licensed under the MIT license.
 */

'use strict';

var semver = require('semver');

module.exports = function(grunt) {

  /**
   * Failed.
   */
  function fail(message, error) {
    if (error) grunt.log.error(error);
    grunt.fail.warn(message || 'Task failed.');
  }

  /**
   * Register task.
   */
  grunt.registerMultiTask('funky_cleanv', 'Clean versioned files.', function() {
    var opts = this.options({
      keep: 10
    });

    var cleaned = 0;
    var regexp  = /\d+(\.\d+)+/;

    // Loop through source mappings
    if (this.files.length > opts.keep) {
      var filepaths = [];

      // Build filepaths
      this.files.forEach(function(fileMapping) {
        fileMapping.src.forEach(function(filepath) {
          filepaths.push(filepath);
        });
      });

      // Sort filepaths
      filepaths.sort(function(a, b) {
        var av = a.match(regexp);
        var bv = b.match(regexp);
        return (semver.gt(av[0], bv[0])) ? 1 : -1;
      });

      var take = filepaths.length - opts.keep;
      filepaths.slice(0, take).forEach(function(filepath) {
        grunt.file['delete'](filepath);
        cleaned++;
      });
    }

    grunt.log.ok(cleaned + ' file(s) cleaned.');
  });

};

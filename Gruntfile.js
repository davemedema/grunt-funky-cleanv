'use strict';

module.exports = function(grunt) {

  // Config
  // ---

  grunt.initConfig({

    // package.json
    pkg: grunt.file.readJSON('package.json'),

    // `clean`
    clean: {
      all: ['tmp']
    },

    // `funky_cleanv`
    funky_cleanv: {
      keep_default: {
        src: ['tmp/keep_default.*.js'],
        expand: true
      },
      keep_five: {
        options: {
          keep: 5
        },
        src: ['tmp/keep_five.*.js'],
        expand: true
      },
      multiple_src_dest: {
        files: [
          {
            src: ['tmp/multiple_src_dest_one.*.js'],
            expand: true
          },
          {
            src: ['tmp/multiple_src_dest_two.*.js'],
            expand: true
          }
        ]
      }
    },

    // `jshint`
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'tasks/**/*.js',
        '<%= nodeunit.files %>'
      ]
    },

    // `nodeunit`
    nodeunit: {
      files: ['test/**/*_test.js']
    }

  });

  // Load tasks
  // ---

  grunt.loadTasks('tasks');

  // npm tasks
  // ---

  require('load-grunt-tasks')(grunt);

  // Task aliases
  // ---

  grunt.registerTask('default', ['test']);

  grunt.registerTask('release', function(type) {
    grunt.task.run('test');
    grunt.task.run('funky_bump:' + (type || 'patch'));
    grunt.task.run('funky_tag');
  });

  grunt.registerTask('test', ['clean', 'jshint', 'test_fixtures', 'funky_cleanv', 'nodeunit']);
  grunt.registerTask('t', ['test']);

  grunt.registerTask('test_fixtures', function() {
    for (var i = 0; i < 20; i++) {
      var version = '1.0.' + i;
      grunt.file.write('tmp/keep_default.' + version + '.js');
      grunt.file.write('tmp/keep_five.' + version + '.js');
      grunt.file.write('tmp/multiple_src_dest_one.' + version + '.js');
      grunt.file.write('tmp/multiple_src_dest_two.' + version + '.js');
    }
    grunt.log.ok();
  });

};

/*
 * grunt-hull-dox
 * based on https://github.com/mattmcmanus/grunt-hull-dox
 * This is a custom dox generator which parses documentation and templates for the aura/hull widgets, and generates an index.
 *
 * Copyright (c) 2012 Matt McManus, Hull
 * Licensed under the MIT license.
 */

var exec = require('child_process').exec,
    fs = require('fs'),
    rimraf = require('rimraf'),
    path = require('path'),
    dox = require('dox');

module.exports = function(grunt) {

  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/cowboy/grunt/blob/master/docs/toc.md

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerMultiTask('dox', 'Generate dox output ', function() {
    var done = this.async();
    for (var i = this.files.length - 1; i >= 0; i--) {
      var files = this.files[i];
      var sources = files.src,
          dest = files.dest,
          baseDir = path.resolve(files.baseDir || '') + '/',
          done = this.async(),
          index={ widgets:[] };

      // Cleanup any existing docs
      rimraf.sync(dest);
      grunt.log.writeln('Doxxing ' + sources+ 'with dox v'+dox.version);

      function writeFile (file, bn) {
        var widget = dox.parseComments(grunt.file.read(file));
        var templates = {}
        var t = grunt.file.expand(path.dirname(file)+'/*.hbs');
        for (var i = t.length - 1; i >= 0; i--) {
          var template = t[i];
          template_basename = path.basename(template,'.hbs');
          templates[template_basename]=grunt.file.read(template);
        };
        return {
          widget : widget,
          templates: templates
        };
      }

      for (var i = sources.length - 1; i >= 0; i--) {
        var file = sources[i];
        var dn = path.resolve(path.dirname(file)).replace(baseDir, '');
        var entry = writeFile(file, dn);
        grunt.file.write(dest+'/'+dn+'/main.json', JSON.stringify(entry));
        grunt.log.writeln('Widget "' + file + '" doxxed.');
        index.widgets.push(dn)
      }

      grunt.file.write(dest+'/index.json', JSON.stringify(index));
      grunt.log.writeln('All done doxxing.');
      done();
    };

  });

};

/*
 * grunt-dox
 * https://github.com/mattmcmanus/grunt-dox
 *
 * Copyright (c) 2012 Matt McManus
 * Licensed under the MIT license.
 */

var exec = require('child_process').exec,
    fs = require('fs'),
    rimraf = require('rimraf');
    path = require('path');

module.exports = function(grunt) {

  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/cowboy/grunt/blob/master/docs/toc.md

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerMultiTask('dox', 'Generate dox output ', function() {
    
    var files = grunt.file.expandFiles(this.file.src),
        dest = this.file.dest;
        done = this.async();

    // Cleanup any existing docs
    rimraf.sync(dest);

    function writeFile (file, bn) {
      return function(error, stout, sterr){
        var widget = JSON.parse(stout);
        var templates = {}
        var t = grunt.file.expand(path.dirname(file)+'/*.hbs');
        for (var i = t.length - 1; i >= 0; i--) {
          var template = t[i];
          template_basename = path.basename(template,'.hbs');
          templates[template_basename]=grunt.file.read(template)
        };

        var content = {
          widget : widget,
          templates: templates
        }

        grunt.file.write(dest+'/'+bn+'.json', JSON.stringify(content));
        grunt.log.writeln('File "' + file + '" doxxed.');
      };
    }

    for (var i = files.length - 1; i >= 0; i--) {
      var file = files[i];
      var dn = path.basename(path.dirname(file))
      var bn = path.basename(file, '.js');
      exec('cat '+file+' | dox ', writeFile(file, dn));
    }
  });

};

# grunt-hull-dox

Dox grunt plugin to automatically generate documentation for your Aura/hull widgets, along with a dump of the  associated handlebars templates

## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-hull-dox`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-hull-dox');
```

[grunt]: https://github.com/cowboy/grunt
[getting_started]: https://github.com/cowboy/grunt/blob/master/docs/getting_started.md

## Documentation
Inside of your grunt file, add:
```javascript
dox: {
  files: {
    src: ['widgets/**/main.js', 'lib/widgets/**/main.js'],
    dest: 'docs'
  }
},
```

This will run all of your files through dox, generate an index and a subdirectory for each widget containing a main.json object.

**Note:** This will completely delete and recreate the destination folder

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].

## License
Copyright (c) 2012 P'unk Ave, Hull
Licensed under the MIT license.

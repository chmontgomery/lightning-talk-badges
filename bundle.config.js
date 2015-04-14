var path = require('path'),
  transformHelper = require('gulp-bundle-assets').transformHelper,
  srcPath = './src/public';

module.exports = {
  bundle: {
    vendor: {
      scripts: [
        {
          src: './bower_components/jquery/dist/jquery.js',
          minSrc: './bower_components/jquery/dist/jquery.min.js'
        },
        {
          src: './bower_components/angular/angular.js',
          minSrc: './bower_components/angular/angular.min.js'
        },
        {
          src: './bower_components/lodash/lodash.js',
          minSrc: './bower_components/lodash/lodash.min.js'
        },
        './bower_components/spin.js/spin.js',
        './bower_components/spin.js/jquery.spin.js'
      ],
      options: {
        useMin: ['production'],
        rev: ['production'],
        watch: {
          styles: false
        }
      }
    },
    main: {
      scripts: srcPath + '/**/*.js',
      styles: srcPath + '/**/*.less',
      options: {
        uglify: ['production'],
        minCSS: ['production'],
        rev: ['production'],
        transforms: {
          styles: transformHelper.less({
            paths: [path.join(__dirname, 'bower_components', 'bootstrap', 'less')]
          })
        }
      }
    }
  },
  copy: [
    {
      src: srcPath + '/**/*.{png,html,ico,svg,ttf,woff}',
      base: srcPath
    },
    {
      src: './bower_components/bootstrap/dist/fonts/*',
      base: './bower_components/bootstrap/dist/',
      watch: false
    }
  ]
};

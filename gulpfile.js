var gulp = require('gulp');

// gulp plugins and utils
var gutil = require('gulp-util');
var livereload = require('gulp-livereload');
var zip = require('gulp-zip');

// Stylesheet plugins
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');

var swallowError = function swallowError(error) {
  gutil.log(error.toString());
  gutil.beep();
  this.emit('end');
};

var nodemonServerInit = function() {
  livereload.listen(1234);
};

gulp.task('build', ['sass'], function(/* cb */) {
  return nodemonServerInit();
});

gulp.task('sass', function() {
  return gulp
    .src('assets/stylesheets/application.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(
      cssnano({
        autoprefixer: {
          browsers: ['last 2 versions'],
          add: true,
        },
      })
    )
    .pipe(gulp.dest('./assets/built/'));
});

gulp.task('watch', function() {
  gulp.watch('assets/stylesheets/**/*.scss', ['sass']);
});

gulp.task('zip', ['css'], function() {
  var targetDir = 'dist/';
  var themeName = require('./package.json').name;
  var filename = themeName + '.zip';

  return gulp
    .src([
      '**',
      '!node_modules',
      '!node_modules/**',
      '!dist',
      '!dist/**',
      '!_bak',
      '!_bak/**',
    ])
    .pipe(zip(filename))
    .pipe(gulp.dest(targetDir));
});

gulp.task('default', ['build'], function() {
  gulp.start('watch');
});

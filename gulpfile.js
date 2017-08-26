var gulp = require('gulp'),
    watch = require('gulp-watch'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssvars = require('postcss-simple-vars'),
    nested = require('postcss-nested'),
    cssImport = require('postcss-import'),
    browserSync = require('browser-sync').create();

gulp.task('default', function() {
  console.log('Hooray - you´ve created a Gulp file.');
});

gulp.task('html', function() {
  browserSync.reload();
});

gulp.task('css', function() {
  return gulp.src('./app/assets/css/styles.css')
    .pipe(postcss([cssImport, nested, cssvars, autoprefixer]))
    .pipe(gulp.dest('./public/assets/css'));
});

gulp.task('images', function() {
  return gulp.src('./app/assets/images/**/**.*')
    .pipe(gulp.dest('./public/assets/images'));
});

gulp.task('cssInject', ['css'], function(){
  gulp.src('./app/assets/css/styles.css')
    .pipe(browserSync.stream());
});

gulp.task('default', ['html', 'css', 'images', 'watch']);

gulp.task('watch', function() {

  browserSync.init({
    notify: false,
    server: {
      baseDir: "public"
    }
  });

  watch('./public/index.html', function() {
    gulp.start('html');
  });

  watch('./app/assets/css/**/*.css', function() {
    gulp.start('cssInject');
  });

  watch('./app/assets/images/**/**.*', function() {
    gulp.start('images');
  });

});

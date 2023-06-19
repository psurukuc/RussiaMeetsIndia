'use strict';

var gulp = require('gulp');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass')(require('sass'));
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// compile scss to css
gulp.task('sass', function () {
    return gulp.src('./sass/styles.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({basename: 'styles.min'}))
        .pipe(gulp.dest('./css'));
});

// watch changes in scss files and run sass task
gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});

// minify js
gulp.task('minify-js', function () {
    return gulp.src('./js/scripts.js')
        .pipe(uglify())
        .pipe(rename({basename: 'scripts.min'}))
        .pipe(gulp.dest('./js'));
});

gulp.task('webserver', function() {
    gulp.src('/Users/psurukuc/Applications/RussiaMeetsIndia/')
      .pipe(webserver({
        livereload: true,
        directoryListing: true,
        open: false,
        fallback: 'index.html'
      }));
});
gulp.task('default', gulp.series('sass', 'minify-js', 'webserver'));

// gulp.task('webserver', function() {
//     gulp.src('')
//       .pipe(webserver({
//         livereload: true,
//         directoryListing: true,
//         open: true,
//         fallback: 'index.html'
//       }));
// });
// gulp.task('default', gulp.series('sass', 'minify-js'));
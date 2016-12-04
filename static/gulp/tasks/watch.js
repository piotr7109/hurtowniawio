'use strict';

var gulp = require('gulp'),
    bs = require('browser-sync').create(),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer');


gulp.task('watch', ['browser-sync'], function () {
    gulp.start('build-css');
    gulp.start('scripts');
    gulp.watch('src/**/*.scss', ['build-css']);
    gulp.watch("*.html").on('change', bs.reload);
    gulp.watch('src/**/*.js', ['scripts']);
});


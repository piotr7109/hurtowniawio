'use strict';

var gulp = require('gulp'),
    bs = require('browser-sync').create(),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer');


gulp.task('watch', ['browser-sync'], function () {
    gulp.start('build-css');
    gulp.watch('src/**/*.scss', ['build-css']);
    gulp.watch("*.html").on('change', bs.reload);
});


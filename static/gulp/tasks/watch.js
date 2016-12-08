'use strict';

let gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    classNames = require('classnames');


gulp.task('watch', () => {
    gulp.start('build-css');
    gulp.start('scripts');
    gulp.watch('src/**/*.scss', ['build-css']);
    gulp.watch('src/**/*.js', ['scripts']);
});


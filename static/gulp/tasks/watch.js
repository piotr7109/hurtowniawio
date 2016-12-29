'use strict';

let gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer');


gulp.task('watch', () => {
    gulp.start('build-css');
    gulp.start('typescript-bundle');
    gulp.watch('src/**/*.scss', ['build-css']);
    gulp.watch("src/**/*.{ts,tsx}", ['typescript-bundle']);
});

gulp.task('compile', () => {
    gulp.start('build-css');
    gulp.start('typescript-bundle');
});

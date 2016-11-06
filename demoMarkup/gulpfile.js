var gulp       = require('gulp'),
    jshint     = require('gulp-jshint'),
    sass       = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('watch', function() {
    gulp.watch('src/scss/**/*.scss', ['build-css']);
});
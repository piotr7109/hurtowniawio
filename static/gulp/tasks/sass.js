var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    bs = require('browser-sync'),
    gutil = require('gulp-util');

gulp.task('build-css', function () {
    return gulp.src('src/scss/**/main.scss')
        .pipe(sourcemaps.init())  // Process the original sources
        .pipe(sass())
        .on('error', gutil.log)
        .pipe(sourcemaps.write()) // Add the map to modified source.
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('public/assets/css'))
        .pipe(bs.reload({stream: true}));
});
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('build-css', function () {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())  // Process the original sources
        .pipe(sass())
        .pipe(sourcemaps.write()) // Add the map to modified source.
		.pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('public/assets/css'));
});
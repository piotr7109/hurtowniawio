var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    bs = require('browser-sync'),
    gutil = require('gulp-util'),
    bulk = require('gulp-sass-bulk-import'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('build-css', function () {
    return gulp.src('src/scss/**/main.scss')
        .pipe(sourcemaps.init())  // Process the original sources
        .pipe(bulk())
        .pipe(sass())
        .on('error', swallowError)
        .pipe(autoprefixer({
            browsers: ['last 10 versions', 'iOS 7', 'IE 11', 'Firefox <= 20', 'Firefox ESR', 'Firefox < 20'],
            cascade: false
        }))
        .on('error', gutil.log)
        .pipe(sourcemaps.write()) // Add the map to modified source.
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('public/assets/css'))
        .pipe(bs.reload({stream: true}));
});

function swallowError (error) {
    console.log(error.toString());
    this.emit('end');
}
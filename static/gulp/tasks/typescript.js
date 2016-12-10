'use strict';

var gulp = require('gulp'),
    typescript = require('typescript'),
    ts = require('gulp-typescript'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    del = require('del');

var project = ts.createProject('src/tsconfig.json', {typescript: typescript});

gulp.task('typescript-compile', function () {
    var tsResult = gulp.src("src/**/*.{ts,tsx}") // or tsProject.src()
        .pipe(project());
    return tsResult.js.pipe(gulp.dest('tmpDir'));
});

gulp.task('typescript-bundle', ['typescript-compile'], function () {
    var b = browserify('tmpDir/app.js');
    return b.bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('public/assets/js'))
        ;
});

gulp.task('clean', function (done) {
    //del(['tmp'], done.bind(this));
});

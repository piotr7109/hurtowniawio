'use strict';

let gulp = require('gulp'),
    typescript = require('typescript'),
    ts = require('gulp-typescript'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    del = require('del'),
    project = ts.createProject('src/tsconfig.json', {typescript: typescript});

gulp.task('typescript-compile', function () {
    let tsResult = project.src() // or tsProject.src()
        .pipe(project());
    return tsResult.js.pipe(gulp.dest('tmpDir'));
});

gulp.task('typescript-bundle', ['typescript-compile'], function () {
    let b = browserify('tmpDir/app.js');
    return b.bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('public/assets/js'));
});

gulp.task('clean', function (done) {
    //del(['tmp'], done.bind(this));
});

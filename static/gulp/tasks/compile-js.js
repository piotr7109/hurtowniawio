'use strict'

let gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    gutil = require('gulp-util'),
    babelify = require('babelify');

let dependencies = [
    'react',
    'react-dom'
];
let scriptsCount = 0;

gulp.task('scripts', function () {
    bundleApp(false);
});

gulp.task('deploy', function () {
    bundleApp(true);
});

gulp.task('default', ['scripts', 'watch']);

function bundleApp(isProduction) {
    scriptsCount++;
    let appBundler = browserify({
        entries: './src/app.js',
        debug: true
    });

    if (!isProduction && scriptsCount === 1) {
        browserify({
            require: dependencies,
            debug: true
        })
            .bundle()
            .on('error', gutil.log)
            .pipe(source('vendors.js'))
            .pipe(gulp.dest('public/assets/js/'));
    }
    if (!isProduction) {
        dependencies.forEach(function (dep) {
            appBundler.external(dep);
        })
    }

    appBundler
        .transform("babelify", {presets: ["es2015", "react"]})
        .bundle()
        .on('error', gutil.log)
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('public/assets/js/'));
}
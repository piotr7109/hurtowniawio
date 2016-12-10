var gulp = require('gulp'),
    bs = require('browser-sync');

gulp.task('browser-sync', function () {
    var files = [
        '*.html'
    ];

    bs.init(files, {
        server: {
            baseDir: "./"
        }
    });
});
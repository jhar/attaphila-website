'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var less = require('gulp-less');
var util = require('gulp-util');

/* Compile Less Files */

gulp.task('compile-less', function() {
    gulp.src('./public/src/css/main.less')
        .pipe(less())
        .on('error', util.log)
        .pipe(gulp.dest('./public/dist/css/'))
        .on('error', util.log);
});

/* Babel Browserify Transform */

gulp.task('transpile-js', function() {
    return browserify({ entries: './public/src/app.js', debug: true })
        .transform('babelify', { presets: ['es2015', 'react']})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./public/dist/'));
});

gulp.task('default', ['compile-less', 'transpile-js']);
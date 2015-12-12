'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var less = require('gulp-less');
var util = require('gulp-util');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');

/* Compile Less Files */

gulp.task('compile-less', function() {
    return gulp.src('./public/src/css/main.less')
        .pipe(less())
        .on('error', util.log)
        .pipe(gulp.dest('./public/src/css/'))
        .on('error', util.log);
});

/* Babel Browserify Transform */

gulp.task('transpile-js', function() {
    return browserify({ entries: './public/src/app.js', debug: true })
        .transform('babelify', { presets: ['es2015', 'react']})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./public/src/'));
});

/* Package JavaScript */

gulp.task('scripts', function() {
    return gulp.src(['./public/src/lib/jquery/dist/jquery.min.js', './public/src/lib/bootstrap/js/modal.js', './public/src/bundle.js'])
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/dist/'));
});

/* Package CSS */

gulp.task('styles', function() {
    return gulp.src(['./public/src/lib/bootstrap/dist/css/bootstrap.min.css', './public/src/css/main.css'])
        .pipe(concat('all.css'))
        .pipe(uglifycss())
        .pipe(gulp.dest('./public/dist'));
});

gulp.task('compile', ['compile-less', 'transpile-js']);
gulp.task('package', ['scripts', 'styles']);
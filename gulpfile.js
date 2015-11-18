"use strict"

//gulp+
var gulp = require ('gulp');

//gulp-sass+
var sass = require ('gulp-sass');

//gulp-plumber+
var plumber = require('gulp-plumber');

//gulp-concat-css-
var concatCss = require('gulp-concat-css');

//gulp-imagemin-
var imageMin = require('gulp-imagemin');

//gulp-rename+
var rename = require('gulp-rename');

//gulp-autoprefixer-
var autoprefixer = require('gulp-autoprefixer');


//sass
gulp.task('sass', function () {
    gulp.src('./scss/**/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest('./css'));
});
//sass-min
gulp.task('sass-min', function () {
    gulp.src('./scss/**/*.scss')
        .pipe(plumber())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest('./css'));
});
//styles
gulp.task('styles', ['sass', 'sass-min'], function (){

});
//sass:watch
gulp.task('sass:watch', function () {
    gulp.watch('./scss/**/*.scss', ['sass', 'sass-min']);
});


//concatCss
gulp.task('concatCss', function () {
    return gulp.src('css/**/*.css')
        .pipe(plumber())
        .pipe(concatCss("styles/bundle.css"))
        .pipe(gulp.dest('out/'));
});


//imageMin
gulp.task('imageMin', function () {
    return gulp.src('/images/*')
        .pipe(imagemin({
            progressive: true,
        }))
        .pipe(gulp.dest('/images-min'));
});


//default
gulp.task('default', function() {
    console.log("123")
    // place code for your default task here
});


"use strict"


//gulp
var gulp = require ('gulp');

var watch = require('gulp-watch');

var plumber = require('gulp-plumber');

var gutil = require('gulp-util');

var sourcemaps = require('gulp-sourcemaps');

//link file
var rigger = require('gulp-rigger');

// browserSync
var browserSync = require("browser-sync").create();
var reload = browserSync.reload;

//gulp-sass
var sass = require ('gulp-sass');

//minifyCssJS
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');

//imageMin
var imageMin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
//gulp-autoprefixer
var autoprefixer = require('gulp-autoprefixer');

//var postcss = require('gulp-postcss');
//var autoprefixer = require('autoprefixer-core');
//gulp-rename
var rename = require('gulp-rename');

<<<<<<< HEAD
//gulp-postcss_&_autoprefixer+
var autoprefixer = require('autoprefixer-core');
var postcss = require('gulp-postcss');

//sass
gulp.task('sass', function () {
    gulp.src('./scss/**/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([ autoprefixer({ browsers: ["> 0%"] }) ]))
        .pipe(gulp.dest('./css'));
});
//sass-min
gulp.task('sass-min', function () {
    gulp.src('./scss/**/*.scss')
        .pipe(plumber())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(postcss([ autoprefixer({ browsers: ["> 0%"] }) ]))
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest('./css'));
=======


var path = {
    build: {
        static: { //Версия билда для разработки
            html: 'build/static/',
            js: 'build/static/scripts/',
            css: 'build/static/styles/',
            img: 'build/static/images/',
            fonts: 'build/static/fonts/'
        },
    },
    src: { //Исходники проекта
        glob: 'app/*.*',
        html: 'app/*.html',
        js: 'app/scripts/main.js',
        sass: 'app/styles/styles.scss',
        img: 'app/images/**/*.*',
        fonts: 'app/fonts/**/*.*'
    },
    watch: { //Пути для наблюдателя
        glob: 'app/*.*',
        html: 'app/**/*.html',
        js: 'app/scripts/**/*.js',
        style: 'app/styles/**/*.scss',
        img: 'app/images/**/*.*',
        fonts: 'app/fonts/**/*.*'
    },
    clean: './build' //Удаление скомпиленых файлов
};

//Конфигурация для сервера
var config = {
    server: {
        baseDir: "./build/static",
        directory: true
    },
    //proxy: 'hostname',
    host: 'localhost',
    port: 9000,
    logPrefix: "DEV local server"
};

//Node сервер
gulp.task('webserver', function () {
    browserSync.init(config);
>>>>>>> 192e56b8e2dde77f361478b08402ea575f7a9091
});

<<<<<<< HEAD
});
//sass:watch
gulp.task('styles:watch', function () {
    gulp.watch('./scss/**/*.scss', ['sass', 'sass-min']);
});
=======
>>>>>>> 192e56b8e2dde77f361478b08402ea575f7a9091

gulp.task('styles:static', function () {
    return gulp.src(path.src.sass)
        .pipe(plumber({errorHandler: errorPretify}))
        .pipe(sourcemaps.init())
        .pipe(sass())
        //.pipe(autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.build.static.css))
        //.pipe(minifyCss())
        //.pipe(gulp.dest(path.build.sitecore.css))
        .pipe(reload({stream: true}));
});

gulp.task('js:static', function () {
    return gulp.src(path.src.js)
        .pipe(plumber({errorHandler: errorPretify}))
        .pipe(rigger())
        .pipe(sourcemaps.init())
        //.pipe(eslint())
        //.pipe(eslint.format())
        .pipe(uglify())
        //.pipe(gulp.dest(path.build.sitecore.js))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.build.static.js))
        .pipe(reload({stream: true}));
});

gulp.task('html:static', function () {
    return gulp.src(path.src.html)
        .pipe(plumber({errorHandler: errorPretify}))
        .pipe(rigger())
        .pipe(gulp.dest(path.build.static.html))
        .pipe(reload({stream: true}));
});

gulp.task('image:static', function () {
    return gulp.src([path.src.img, '!app/images/sprites/**' ])
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false,
                cleanupIDs: false
            }],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(path.build.static.img));
});

gulp.task('font:static', function () {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.static.fonts));
});


//Версия для разработки
gulp.task('static', [
    'html:static',
    'styles:static',
    //'image:static',
    'js:static',
    'font:static',
    //'sprite:static',
]);




//Наблюдатель за исходниками
gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:static');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('styles:static');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:static');
    });
    //watch([path.watch.img, '!app/images/sprites/**'], function(event, cb) {
    //     gulp.start('image:static');
    // });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('font:static');
    });

<<<<<<< HEAD
//default
gulp.task('default',["styles"], function() {

=======
>>>>>>> 192e56b8e2dde77f361478b08402ea575f7a9091
});



//default
gulp.task('default', ['static', 'webserver', 'watch']);

function errorPretify(error) {
    var c = gutil.colors;
    gutil.beep();
    gutil.log(
        gutil.template(c.red('<%= name %>') + ' in ' + c.bold.cyan('<%= plugin %>') + '\n' + c.bgRed('<%= message %>'), error)
    );
    this.emit('end');
}
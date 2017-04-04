// Require

var gulp = require('gulp');

var loadPluginsOptions = {
  pattern: ['gulp-*', 'gulp.*'],
  replaceString: /\bgulp[\-.]/
};
var $ = require('gulp-load-plugins')(loadPluginsOptions);
var del = require('del');
var runSequence = require('run-sequence');

// Config

var dir = {
  scss: 'src/_scss/',
  js: 'src/_js/',
  dest: 'test/',
  dist: 'dist/'
};

var documentRoot = dir.dest;

var name = {
  js: {
    bundle: 'bundle.js',
    app: 'demo.js'
  }
};

var src = {
  scss: dir.scss + '**/*.scss',
  js: [
    dir.js + '**/*.js',
    '!' + dir.js + '**/' + name.js.app
  ]
};

var webserverOptions = {
  livereload: true,
  open: true
};

var pleeeaseOptions = {
  autoprefixer: {
    browsers: ['last 2 versions']
  },
  minifier: false,
  sourcemaps: false,
  sass: false,
  mqpacker: true
};

var watching = false;

// Tasks

gulp.task('webserver', function(){
  gulp.src(documentRoot)
    .pipe($.webserver(webserverOptions));
});

gulp.task('sass', function(){
  return gulp.src(src.scss)
    .pipe($.plumber({errorHandler: $.notify.onError('<%= error.message %>')}))
    .pipe($.cached())
    .pipe($.sass({outputStyle: 'expanded'}).on('error', $.sass.logError))
    .pipe($.pleeease(pleeeaseOptions))
    .pipe(gulp.dest(dir.dest));
});

gulp.task('css:build', function(){
  return gulp.src(src.scss)
    .pipe($.sass({outputStyle: 'expanded'}).on('error', $.sass.logError))
    .pipe($.pleeease(pleeeaseOptions))
    .pipe(gulp.dest(dir.dist))
    .pipe($.pleeease({minifier: true}))
    .pipe($.rename({suffix: '.min'}))
    .pipe(gulp.dest(dir.dist));
});

gulp.task('browserify', $.watchify(function(watchify){
  return gulp.src(dir.js + name.js.app)
    .pipe(watchify({watch: watching}))
    .pipe($.plumber({errorHandler: $.notify.onError('<%= error.message %>')}))
    // .pipe(buffer())
    .pipe($.streamify($.uglify()))
    .pipe($.rename({basename: 'bundle'}))
    .pipe(gulp.dest(dir.dest));

}));

gulp.task('js:build', function(){
  return gulp.src(src.js)
    .pipe(gulp.dest(dir.dist))
    .pipe($.uglify())
    .pipe($.rename({suffix: '.min'}))
    .pipe(gulp.dest(dir.dist));
});

gulp.task('clean', function(){
  return del([dir.dest + '**/*{css,js}', dir.dist + '**/*']);
});

gulp.task('build', function(callback){
  runSequence(
    'clean',
    ['sass', 'browserify'],
    ['js:build', 'css:build'],
    callback
  );
});

gulp.task('enable-watch-mode', function(){
  watching = true;
});

gulp.task('watchify', ['enable-watch-mode', 'browserify']);

gulp.task('default', ['webserver', 'watchify', 'sass'], function(){

  $.watch(src.scss, function(){
    return gulp.start(['sass']);
  });
});

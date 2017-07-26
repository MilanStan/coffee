var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var wait = require('gulp-wait');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
//var jimp = require("gulp-jimp-resize");
var responsive = require('gulp-responsive-images');

// Basic Gulp task syntax
gulp.task('hello', function() {
  console.log('Hello Zell!');
})

// Development Tasks 
// -----------------

// Start browserSync server
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
  })
})

gulp.task('sass', function() {
  return gulp.src('app/scss/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(wait(500))
    .pipe(sass().on('error', sass.logError)) // Passes it through a gulp-sass, log errors to console
    .pipe(autoprefixer({ browsers: ['last 3 versions'] }))
    .pipe(gulp.dest('app/css')) // Outputs it in the css folder
    .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
    }));
})

// Watchers
gulp.task('watch', function() {
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
})

// Optimization Tasks 
// ------------------

// Optimizing CSS and JavaScript 
gulp.task('useref', function() {

  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('docs'));
});

// Optimizing Images 
gulp.task('images', function() {
  return gulp.src('app/img/**/*.+(png|jpg|jpeg|gif|svg)')
    // Caching images that ran through imagemin
    .pipe(cache(imagemin({
      interlaced: true,
    })))
    .pipe(gulp.dest('docs/img'))
});

// Copying fonts 
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('docs/fonts'))
})

// Cleaning 
gulp.task('clean', function() {
  return del.sync('docs').then(function(cb) {
    return cache.clearAll(cb);
  });
})

gulp.task('clean:docs', function() {
  return del.sync(['docs/**/*', '!docs/img', '!docs/img/**/*']);
});

// Build Sequences
// ---------------

gulp.task('default', function(callback) {
  runSequence(['sass', 'browserSync'], 'watch',
    callback
  )
})

gulp.task('build', function(callback) {
  runSequence(
    'clean:docs',
    'sass',
    ['useref', 'images', 'fonts'],
    callback
  )
})

// Image resizing 
// -----------------
//gulp.task('resize', function() {
//    return gulp.src(
//        'app/img/**/*.{png,jpg,bmp}'
//        )
//    .pipe(jimp({
//        sizes: [
//            {"suffix": "md", "width": 960, "height":1000, "crop": true},
 //           {"suffix": "sm", "width": 480}
 //       ]
 //   }))
 //   .pipe(gulp.dest('app/resized/'));
//});
gulp.task("resize", function () {
  gulp.src("app/img/*")
    .pipe(responsive({
      "*.jpg": [{
        width: 1200,   
        suffix: "-lg",
        quality: 80
      }, {
        width: 800,
        height: 800,
        crop: true,
        gravity: "SouthEast",
        suffix: '-md',
        quality:80
      },{
        width: 800,
        height: 800,
        crop: true,
        gravity: "SouthEast",
        suffix: '-sm',
        quality: 70
      }]
    }))
    .pipe(gulp.dest("app/img"));
});

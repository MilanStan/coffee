var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');


// Start browserSync server
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
  })
})

gulp.task('sass', function(){
    gulp.src('app/scss/main.scss')
	.pipe(sass({
		outputStyle: 'compressed',
		errLogToConsole: false,
		onError: function(error) {
			notify({
				title: "SASS ERROR",
				message: "line " + error.line + " in " + error.file.replace(/^.*[\\\/]/, '') + "\n" + error.message
			}).write(error);
		}
	}))
	.pipe(autoprefixer({ browsers: ['last 3 versions'] }))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({ // Reloading with Browser Sync
		stream: true
    }));	
});


// Watchers
gulp.task('watch', function() {
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
})


// Default task

gulp.task('default', function(callback) {
  runSequence(['sass', 'browserSync'], 'watch',
    callback
  )
})

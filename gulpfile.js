const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const concat = require('gulp-concat-css');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();

// compile scss into css
function style(){
	return gulp.src('./scss/**/*.scss')
	
	.pipe(sass({outputStyle:'compressed'}).on('error', sass.logError))
	.pipe(concat('all.css'))
	.pipe(rename({dirname: "./css/min", suffix: '.min'}))
	.pipe(cleanCSS())
  .pipe(gulp.dest('./'))
	.pipe(browserSync.stream());
	
}

gulp.task('html', function(){
	return gulp.src('*.html')
	.pipe(browserSync.reload({stream: true}))
});

function watch(){
	browserSync.init({
		server: {
			baseDir: './'
		}
	});
	gulp.watch('./scss/**/*.scss', gulp.parallel('style'));
	gulp.watch('./*.html', gulp.parallel('html'))
	gulp.watch('./js/**/*.js', gulp.parallel('html'));

}
exports.watch = watch;
exports.style = style;

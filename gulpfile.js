const gulp = require('gulp')
const sass = require('gulp-sass')
const concat = require('gulp-concat')
const babel = require('gulp-babel')
const autoprefixer = require('gulp-autoprefixer')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload

gulp.task('styles', () => {
	return gulp.src('./styles/**/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer('last 2 versions', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
	.pipe(concat('styles.css'))
	.pipe(gulp.dest('./styles/'))
})

gulp.task('scripts', () => {
	return gulp.src('./scripts/main.js')
	.pipe(babel({
		presets: ['es2015']
	}))
	.pipe(gulp.dest('./scripts/'))
	.pipe(reload({stream: true}))
})

gulp.task('browser-sync', () => {
	browserSync.init({
		server: '.'
	})
})

gulp.task('watch', () => {
	gulp.watch('./styles/**/*.scss', ['styles'])
	gulp.watch('./scripts/main.js', ['scripts'])
	gulp.watch('*.html', reload)
})

gulp.task('default', ['browser-sync', 'styles', 'scripts', 'watch'])
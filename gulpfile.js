const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const sourcemaps = require("gulp-sourcemaps");
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require("browser-sync").create();

const style = () => {
    return (
        gulp.src("src/scss/style.scss")
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cssnano())
        .on("error", sass.logError)
        .pipe(sourcemaps.write())
        .pipe(concat("style.min.css"))
        .pipe(gulp.dest("src/build/css/"))
    );
}

const js = () => {
    gulp.src("src/js/**/*.js")
    .pipe(concat("app.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("src/build/js/"))
}

const watch = () => {
	browserSync.init({ 
		server: {
            baseDir: "./",
            index: "./pages/index.html"
        }
    });

    gulp.watch("src/scss/**/*.scss").on("change", gulp.parallel(style, browserSync.reload));
    gulp.watch("src/js/**/*.js").on("change", gulp.parallel(js, browserSync.reload));
    gulp.watch("./pages/**/*.html").on("change", browserSync.reload);
}

exports.watch = watch;
exports.style = style;
exports.js = js;

exports.default = gulp.parallel(watch);
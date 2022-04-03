let preprocessor = 'sass';

const { src, dest, parallel, series, watch } = require('gulp');

const browserSync = require('browser-sync').create();
const plumber = require('gulp-plumber'); // gulp не вываливается при ошибке js
const rigger = require('gulp-rigger');
const rename = require('gulp-rename')
// js
// const concat = require('gulp-concat'); // лучше rigger
const uglify = require('gulp-uglify-es').default; // сжатие
const sourcemaps = require('gulp-sourcemaps');
// style
const sass = require('gulp-sass');
const shorthand = require('gulp-shorthand');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
// images
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const del = require('del');
// sprite svg
const svgsprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');

function browsersync() {
	browserSync.init({
		server: { baseDir: 'src/'},
		notify: false,
		online: true
	});
}
function layout() {
	return src('src/pages/*.html')
		.pipe(plumber())
		.pipe(rigger())
		.pipe(dest('src/'))
		.pipe(browserSync.stream())
}
function scripts() {
	return src('src/js/function.js')
		.pipe(plumber())
		.pipe(rigger())
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(rename({ suffix: '.min' }))
		.pipe(dest('src/js/'))
		.pipe(browserSync.stream());
}
function styles() {
	return src('src/sass/style.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(shorthand())
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 2 versions'],
			cascade: false
		}))
		.pipe(cleancss( { level: { 1: { specialComments: 0 } }/*, format: 'beautify'*/ } ))
		.pipe(sourcemaps.write())
		.pipe(rename('style.min.css'))
		.pipe(dest('src/css/'))
		.pipe(browserSync.stream())
}
async function images() {
	return src('src/img/**/*') // исходники
		.pipe(newer('src/images/')) // оптимизированные
		.pipe(imagemin())
		.pipe(dest('src/images/'))
		// .pipe(browserSync.reload())
}
function svgcss() {
	return src('src/icons/icons-css/*')
        .pipe(svgmin({ js2svg: { pretty: true } }))
        .pipe(svgsprite({
            encoding: 'utf-8',
            mode: {
                css: {
                    sprite: '../sprite.css.svg',
                    prefix: '.%s',
                    dimensions: true,
                    bust: false,
                    render: {
                        scss: {
                            dest: '../../sass/_sprite-css.scss',
                            template: 'src/sass/tmpl/svgcss-tmpl.scss'
                        }
                    }
                }
            }
        }))
        .pipe(dest('src/images/'));
}
function svgsimbol() {
	return src('src/icons/icons-symbol/*')
        .pipe(svgmin({ js2svg: { pretty: true } }))
        .pipe(svgsprite({
            encoding: 'utf-8',
            mode: {
                symbol: {
                    sprite: '../sprite.symbol.svg',
                    prefix: '.%s',
                    dimensions: '%s',
                    render: {
                        scss: {
                            dest: '../../sass/_sprite-symbol.scss',
                            template: 'src/sass/tmpl/svgsimbol-tmpl.scss'
                        }
                    }
                }
            }
        }))
        .pipe(dest('src/images/'));
}
function svgstack() {
	return src('src/icons/icons-stack/*')
        .pipe(svgmin({ js2svg: { pretty: true } }))
        .pipe(svgsprite({
            encoding: 'utf-8',
            mode: {
                stack: {
                    sprite: '../sprite.stack.svg',
                    prefix: '.%s',
                    dimensions: '%s',
                    bust: false,
                    render: {
                        scss: {
                            dest: '../../sass/_sprite-stack.scss',
                            template: 'src/sass/tmpl/svgstack-tmpl.scss'
                        }
                    }
                }
            }
        }))
        .pipe(dest('src/images/'));
}
function cleanimg() {
	return del('src/images/**/*', { force: true })
}
function cleanbuild() {
	return del('build/**/*', { force: true })
}
function buildcopy() {
	return src([
		'src/fonts/**/*',
		'src/css/**/*.min.css',
		'src/js/**/*.min.js',
		'src/images/**/*',
		'src/*.html'
		], { base: 'src' })
	.pipe(dest('build'))
}

function startwatch() {
	watch('src/pages/**/*.html', layout);
	watch(['src/**/*.js', '!src/**/*.min.js'], scripts);
	watch('src/sass/**/*', styles);
	watch('src/img/**/*', images);
}

exports.layout = layout;
exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
exports.svgcss = svgcss;
exports.svgsimbol = svgsimbol;
exports.svgstack = svgstack;
exports.cleanimg = cleanimg;
exports.browsersync = browsersync;
exports.cleanbuild = cleanbuild;

exports.build = series(cleanbuild, layout, scripts, styles, buildcopy);
exports.default = parallel(styles, scripts, browsersync, startwatch);

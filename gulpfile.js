let project_folder = 'dist';
let src_folder = 'src';

let path = {
    build: {
        html: project_folder + '/',
        css: project_folder + '/css/',
        js: project_folder + '/js/',
        img: project_folder + '/img/',
        plugins: project_folder + '/plugins/'
    },
    src: {
        html: [src_folder + '/pug/**/*.pug', '!' + src_folder + '/pug/**/_*.pug'],
        css: src_folder + '/scss/style.scss',
        js: src_folder + '/js/main.js',
        img: src_folder + '/img/**/*.+(png|jpg|gif|ico|svg|webp)',
        plugins: src_folder + '/plugins/**'
    },
    watch: {
        html: src_folder + '/**/*.pug',
        css: src_folder + '/scss/**/*.scss',
        js: src_folder + '/js/**/*.js',
        img: src_folder + '/img/**/*.+(png|jpg|gif|ico|svg|webp)',
    },
    clean: './' + project_folder + '/',
}

let { src, dest } = require('gulp'),
    gulp = require('gulp'),
    pug = require('gulp-pug'),
    scss = require('gulp-sass'),
    babel = require('gulp-babel'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    fileinclude = require('gulp-file-include'),
    ghPages = require('gulp-gh-pages');
    del = require('del');

    function html() {
        return src(path.src.html)
            .pipe(pug({
                pretty: true,
              }))
            .pipe(dest(path.build.html));
    };

    function css() {
        return src(path.src.css)
        .pipe(scss({
            outputStyle:'expanded'
        }))
        .pipe(autoprefixer())
        .pipe(dest(path.build.css));
    };

    function js() {
        return src(path.src.js)
        .pipe(fileinclude())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(dest(path.build.js));
    };

    function img() {
        return src(path.src.img)
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            optimizationLevel: 3,
            svgoPlugins: [{removeViewBox: true}]
        }))
        .pipe(dest(path.build.img));
    };

    function plugins() {
        return src(path.src.plugins)
        .pipe(dest(path.build.plugins));
    };

    function clean () {
        return del(path.clean);
    };

    function watchFiles() {
        gulp.watch([path.watch.html], html);
        gulp.watch([path.watch.css], css);
        gulp.watch([path.watch.js], js);
        gulp.watch([path.watch.img], img);
    };

    function deploy () {
        return gulp.src('./dist/**/*')
        .pipe(ghPages());
    }

let build = gulp.series(clean, gulp.parallel(html, css, js, img, plugins));
let watch = gulp.parallel(build, watchFiles);

exports.deploy = deploy;
exports.default = watch;
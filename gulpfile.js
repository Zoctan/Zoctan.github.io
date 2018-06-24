// 入门指南 https://www.gulpjs.com.cn/docs/getting-started/
var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var htmlclean = require('gulp-htmlclean');
var imagemin = require('gulp-imagemin');

// 压缩 public 目录 css
// https://github.com/jakubpawlowicz/clean-css#how-to-use-clean-css-api
gulp.task('minify-css', function () {
    return gulp.src('./public/**/*.css')
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('./public'));
});

// 压缩 public 目录 html
// https://github.com/kangax/html-minifier
gulp.task('minify-html', function () {
    return gulp.src('./public/**/*.html')
        .pipe(htmlclean())
        .pipe(htmlmin({
            removeComments: true, //清除HTML注释
            collapseWhitespace: true, //压缩HTML
            collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input checked />
            removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
            removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
            minifyJS: true, //压缩页面JS
            minifyCSS: true, //压缩页面CSS
            minifyURLs: true //url属性使用相对路径
        }))
        .on('error', function (err) {
            console.log('html Error!', err.message);
            this.end();
        })
        .pipe(gulp.dest('./public'));
});

// 压缩 public/js 目录 js
// https://github.com/mishoo/UglifyJS2#minify-options
gulp.task('minify-js', function () {
    return gulp.src('./public/**/*.js')
        .pipe(uglify({
            ie8: true
        }))
        .pipe(gulp.dest('./public'));
});

// 压缩 public/img 目录图片
// 如果出现错误 jpegtran ENOENT 或者 optipng ENOENT
// npm rebuild jpegtran-bin optipng-bin
gulp.task('minify-image', function () {
    return gulp.src(['./public/**/*.jpg', './public/**/*.png'])
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest('./public'));
});

// 执行 gulp 命令时执行的任务
gulp.task('default', [
    'minify-html', 'minify-css', 'minify-js'//, 'minify-image'
]);

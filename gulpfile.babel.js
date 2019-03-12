'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import clean from 'gulp-clean';
import jslint from 'gulp-jslint';
import minify from 'gulp-minify';
import watch from 'gulp-watch';
import htmlmin from 'gulp-htmlmin';
import browserSync from 'browser-sync';
import webpack from 'webpack-stream';

const dirs = {
    src: 'source',
    dest: 'build'
};



const stylePaths = {
    src: `${dirs.src}/styles/*.scss`,
    dest: `${dirs.dest}/styles/`
};

gulp.task('clean-styles', () => {
    return gulp.src(`${stylePaths.dest}*`, {read: false})
        .pipe(clean());
});

gulp.task('styles', gulp.series('clean-styles', () => {
    return gulp.src(stylePaths.src)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(stylePaths.dest))
        .pipe(browserSync.stream())
}));

gulp.task('watch-styles', () => {
    return watch(stylePaths.src, gulp.series('styles'))
});



const jsPaths = {
    src: `${dirs.src}/scripts/*.js`,
    dest: `${dirs.dest}/scripts/`
};

gulp.task('clean-scripts', () => {
    return gulp.src(`${jsPaths.dest}*`, {read: false})
        .pipe(clean());
});

gulp.task('scripts', gulp.series('clean-scripts', () => {
    return gulp.src(jsPaths.src)
        .pipe(jslint())
        .pipe(minify({
            ext:{
                min:'.min.js'
            }
        }))
        .pipe(webpack( require('./webpack.config.js') ))
        .pipe(gulp.dest(jsPaths.dest))
        .pipe(browserSync.reload({
            stream: true
        }))
}));

gulp.task('watch-scripts', () => {
    return watch(jsPaths.src, gulp.series('scripts'))
});



const htmlPaths = {
    src: `${dirs.src}/*.html`,
    dest: `${dirs.dest}/`
};

gulp.task('clean-html', () => {
    return gulp.src(`${htmlPaths.dest}*.html`, {read: false})
        .pipe(clean());
});

gulp.task('html', gulp.series('clean-html', () => {
    return gulp.src(htmlPaths.src)
        .pipe(htmlmin({
            collapseBooleanAttributes: true,
            collapseInlineTagWhitespace: true,
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true
        }))
        .pipe(gulp.dest(htmlPaths.dest))
        .pipe(browserSync.reload({
            stream: true
        }))
}));

gulp.task('watch-html', () => {
    return watch(htmlPaths.src, gulp.series('html'))
});



gulp.task('browserSync', () => {
    browserSync.init({
        server: {
            baseDir: dirs.dest
        },
    })
});




gulp.task('watch', gulp.parallel('browserSync','watch-scripts','watch-styles','watch-html'));



gulp.task('default', gulp.series('scripts','styles','html','watch'));

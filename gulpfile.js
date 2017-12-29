'use strict';

const child = require('child_process');
const browserSync = require('browser-sync').create();

const gulp = require('gulp');
const concat = require('gulp-concat');
const gutil = require('gulp-util');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const minify = require('gulp-babel-minify');

const siteRoot = '_site';
const cssDevFiles = '_dev/stylesheets/**/*.?(s)css';
const jsDevFiles = '_dev/javascripts/**/*.js';

gulp.task('concatJS', () => {
  return gulp.src([
      '_dev/vendor/bootstrap/**/*.js',
      '_dev/vendor/twitter/**/*.js',
      '_dev/vendor/slick/**/*.js',
      jsDevFiles
    ])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('assets/servedJS'));
});

gulp.task('minifyJS', ['concatJS'], () => {
  return gulp.src('assets/servedJS/all.js')
    .pipe(minify())
    .on('error', (err) => { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(gulp.dest('assets/servedJS'));
});

gulp.task('concatCSS', () => {
  return gulp.src([
      cssDevFiles
    ])
    .pipe(sass())
    .pipe(concat('all.css'))
    .pipe(gulp.dest('assets/servedCSS'));
});

gulp.task('minifyCSS', ['concatCSS'], () => {
  return gulp.src('assets/servedCSS/all.css')
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest('assets/servedCSS'));
});

gulp.task('jekyll', () => {
  const jekyll = child.spawn('jekyll', [
    'build',
    '--watch',
    '--incremental',
    '--drafts'
  ]);
  const jekyllLogger = (buffer) => {
    buffer.toString()
      .split(/\n/)
      .forEach((message) => gutil.log('Jekyll: ' + message));
  };
  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
});

gulp.task('serve', () => {
  browserSync.init({
    files: [siteRoot + '/**'],
    port: 4000,
    server: {
      baseDir: siteRoot
    }
  });
  gulp.watch([cssDevFiles, jsDevFiles], ['minifyCSS', 'minifyJS']);
});

gulp.task('default', ['minifyCSS', 'minifyJS', 'jekyll', 'serve']);
'use strict';
/**
 * User: igor
 * Date: 12.04.2017(Time:2:04)
 */
//----------------------------------------------
//                  Plugins
//----------------------------------------------

const gulp = require('gulp'); // Сообственно Gulp JS;
const multipipe = require('multipipe');   //для удобного отлова ошибок последовательностью https://www.npmjs.com/package/multipipe
const debug = require('gulp-debug'); // для отладки   https://www.npmjs.com/package/gulp-debug
const notify = require('gulp-notify'); // просто красивый вывод событий  https://www.npmjs.com/package/gulp-notify
// const cached = require('gulp-cached'); // фильтер файлов сравнением содержимо го  https://www.npmjs.com/package/gulp-cached
// const livereload = require('gulp-livereload'); // Livereload для Gulp работает через плагин в браузере
// const watch     = require('gulp-watch');  //Следит за всеми указанными файлами или целыми директориями и в случае каких-либо изменений выполняет описанные в конфигурациях таски.
// const path      = require('path');    // Полные пути к файлам

// 3 js
const concat = require('gulp-concat'); // Склейка файлов
const uglify = require('gulp-uglify-es').default; // JavaScript компрессор.
const fixmyjs = require("gulp-fixmyjs"); // автоматически исправляет простые ошибки в коде после линта выполненного на основе JSHint (gulp-jshint).   https://github.com/kirjs/gulp-fixmyjs


//----------------------------------------------
//  + 6 Собираем JS
//     (задача через заглушку, без заглушки - внизу )
//-----
module.exports = function (options) {
  return function (callback) {

    return multipipe(
      gulp.src(options.watch.scripts),   // Где ищим исключая vendor
      debug({title: "Нашли : "}),
      // cached( options.src.scripts ),      // фильтер файлов сравнением содержимого работает через "watch"
      fixmyjs(),             // исправляет простые ошибки
      concat('index.js'),  // Собираем все JS, кроме тех которые находятся в ./assets/js/vendor/**
      uglify(),              // Минификация JS
      gulp.dest(options.build.scripts),  // Куда записываем
      debug({title: "Записали : "}),
      // livereload() //Сейчас работает через browserSync. Старая версия через(livereload/connect) и 1 строчку в наблюдении.
      options.browserSync.stream({stream: true}), // Обновление страници у browserSync
    ).on('error', notify.onError(function (err) {
      return {
        title: 'JavaScript',
        message: err.message,
        sound: true
      };
    }));

  };
};

/*
//----------------------------------------------
//  + 6 Собираем JS
//  (задача без заглушки)
//-----
gulp.task('js', function() {

  return multipipe(
    gulp.src([jsDir, '!./assets/js/vendor/** /*.js']),   // Где ищим исключая vendor
    debug({title:"Нашли : "}),
    cached(jsDir),      // фильтер файлов сравнением содержимого работает через "watch"
    fixmyjs(),             // исправляет простые ошибки
    //concat('index.js'),  // Собираем все JS, кроме тех которые находятся в ./assets/js/vendor/**
    uglify(),              // Минификация JS
    gulp.dest(jsDirMini),  // Куда записываем
    debug({title:"Записали : "}),
    // livereload() //Сейчас работает через browserSync. Старая версия через(livereload/connect) и 1 строчку в наблюдении.
  ).on('error', notify.onError(function(err){
      return  {
        title:'JavaScript',
        message:err.message,
        sound: true
      };
    }))
});
*/

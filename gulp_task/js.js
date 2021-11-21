/**
 * User: igor
 * Date: 12.04.2017(Time:2:04)
 */
'use strict';
//----------------------------------------------
//                  Plagins
//----------------------------------------------

const gulp      = require('gulp'); // Сообственно Gulp JS;
const multipipe = require('multipipe');   //для удобного отлова ошибок последовательностью https://www.npmjs.com/package/multipipe
const debug     = require('gulp-debug'); // для отладки   https://www.npmjs.com/package/gulp-debug
const notify    = require('gulp-notify'); // просто красивый вывод событий  https://www.npmjs.com/package/gulp-notify
const cached    = require('gulp-cached'); // фильтер файлов сравнением содержимо го  https://www.npmjs.com/package/gulp-cached
const livereload = require('gulp-livereload'); // Livereload для Gulp работает через плагин в браузере
//const watch     = require('gulp-watch');  //Следит за всеми указанными файлами или целыми директориями и в случае каких-либо изменений выполняет описанные в конфигурациях таски.
//const path      = require('path');    // Полные пути к файлам
// 3 js
const concat    = require('gulp-concat'); // Склейка файлов
const uglify    = require('gulp-uglify'); // JavaScript компрессор.
const fixmyjs   = require("gulp-fixmyjs"); // автоматически исправляет простые ошибки в коде после линта выполненного на основе JSHint (gulp-jshint).   https://github.com/kirjs/gulp-fixmyjs


//----------------------------------------------
//  + 6 Собираем JS
//     (задача через заглушку, без заглушки - внизу )
//-----
module.exports = function(options) {
  return function(callback) {

    return multipipe(
      gulp.src([ options.src_dev , '!./assets/js/vendor/**/*.js']),   // Где ищим исключая vendor
      debug({title: "Нашли : "}),
      cached( options.src_dev ),      // фильтер файлов сравнением содержимого работает через "watch"
      fixmyjs(),             // исправляет простые ошибки
      //concat('all.js'),  // Собираем все JS, кроме тех которые находятся в ./assets/js/vendor/**
      uglify(),              // Минификация JS
      //gulp.dest('html / brain_akademy / brain_akademy_DZ / 09 / js /'),  // Куда записываем
      gulp.dest( options.src_project ),  // Куда записываем
      debug({title: "Записали : "}),
      livereload()      // Работает через плагин и 1 строчку в наблюдении и без РНР
    ).on('error', notify.onError(function (err) {
        return {
          title  : 'JavaScript',
          message: err.message,
          sound  : true
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
    //concat('all.js'),  // Собираем все JS, кроме тех которые находятся в ./assets/js/vendor/**
    uglify(),              // Минификация JS
    gulp.dest(jsDirMini),  // Куда записываем
    debug({title:"Записали : "}),
    livereload()      // Работает через плагин и 1 строчку в наблюдении и без РНР
  ).on('error', notify.onError(function(err){
      return  {
        title:'JavaScript',
        message:err.message,
        sound: true
      };
    }))
});

*/



/*

//----------------------------------------------
//                variables
//                  (old)
//----------------------------------------------
//  variables projects


var publication = "brain_akademy_DZ";
var public_version = "09";
//var publication = "1";

//  variables assets
var allAssets   = 'html / brain_akademy / 0_dev / ';
var htmlDir     = 'html / brain_akademy / 0_dev / html/** /**.html';
//var stylusDir   = 'html / brain_akademy / 0_dev / css/** /*.{styl,css,sass}';
var stylusDir   = 'html / brain_akademy / 0_dev / css/** /styles.styl';
var stylusDirWatch   = 'html / brain_akademy / 0_dev / css/** /*.styl';
//var fontDir     = 'html / brain_akademy / 0_dev / css/fonts/** /*.*';
var fontDir     = 'html / brain_akademy / 0_dev / css/fonts/** /*.{eot,otf,ttf,woff,svg,css}';
var jsDir       = 'html / brain_akademy / 0_dev / js/** /*.js';
var imgDir      = 'html / brain_akademy / 0_dev / img/** /*.{img,png,jpeg,jpg,gif}';
var Sprite_Dir  = 'html / brain_akademy / 0_dev / sprite/** /*.{png,jpeg,jpg}';
var Sprite_Styl = 'html / brain_akademy / 0_dev / css/';
//var Sprite_IMG  = 'html / brain_akademy / 0_dev / img/';
//  variables complete
var allPublic_mini  = 'html / brain_akademy / brain_akademy_DZ / 09 / ';
var htmlDirMini     = 'html / brain_akademy / brain_akademy_DZ / 09 / html /';
var cssDirMini      = 'html / brain_akademy / brain_akademy_DZ / 09 / css /';
var fontDirMini     = 'html / brain_akademy / brain_akademy_DZ / 09 / css /fonts/';
var jsDirMini       = 'html / brain_akademy / brain_akademy_DZ / 09 / js /' ;
var imgDirMini      = 'html / brain_akademy / brain_akademy_DZ / 09 / img /';


  */

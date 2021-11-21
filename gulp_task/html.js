'use strict';
/**
 * User: igor
 * Date: 12.04.2017(Time:1:47)
 */
//----------------------------------------------
//                  Plugins
//----------------------------------------------

const gulp      = require('gulp'); // Сообственно Gulp JS;
const multipipe = require('multipipe');   //для удобного отлова ошибок последовательностью https://www.npmjs.com/package/multipipe
const debug     = require('gulp-debug'); // для отладки   https://www.npmjs.com/package/gulp-debug
const notify    = require('gulp-notify'); // просто красивый вывод событий  https://www.npmjs.com/package/gulp-notify
const fileinclude = require('gulp-file-include'); // https://www.npmjs.com/package/gulp-file-include
// const htmlmin   = require('gulp-htmlmin');  // Минификация html.  https://github.com/jonschlinkert/gulp-htmlmin
// const cached    = require('gulp-cached'); // фильтер файлов сравнением содержимо го  https://www.npmjs.com/package/gulp-cached
// const path      = require('path');    // Полные пути к файлам
// const livereload = require('gulp-livereload'); // Livereload для Gulp работает через плагин в браузере

//----------------------------------------------
//  + 1 HTML
//     (задача через заглушку)
//-----
module.exports = function(options) {
  return function(callback) {
    return multipipe(
      gulp.src( options.watch.html ),  // откуда берем
      debug({title: "Нашли : "}), // количество для отладки
      // cached( options.src.html ),  //откуда будут изменения для релоуда, сравнением содержимого работает через "watch"
      fileinclude(),
      // htmlmin({collapseWhitespace: true}),    // Минификация html.
      gulp.dest( options.build.html ),       // куда пихаем
      debug({title: "Записали : "}),    // количество для отладки
      // livereload() //Сейчас работает через browserSync. Старая версия через(livereload/connect) и 1 строчку в наблюдении.
      options.browserSync.stream(), // Обновление страници у browserSync
    ).on('error', notify.onError(function (err) {
        return {
          title  : 'html',
          message: err.message,
          sound  : true
        };
      }));

  };
};



/*

 //----------------------------------------------
 //  + 1 HTML
 //     (задача без заглушки)
 //-----
gulp.task('html', function() {
  return multipipe(
    gulp.src(htmlDir),  // Не обработанные
    debug({title:"Нашли : "}), // количество для отладки
    cached("htmlDir"),      // фильтер файлов сравнением содержимого работает через "watch"
    //htmlmin({collapseWhitespace: true}),    // Минификация html.
    gulp.dest(htmlDirMini),       // Обработанные
    debug({title:"Записали : "}),    // количество для отладки
    // livereload() //Сейчас работает через browserSync. Старая версия через(livereload/connect) и 1 строчку в наблюдении.
  ).on('error', notify.onError(function(err){
      return  {
        title:'html',
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
var jsDirMini       = 'html / brain_akademy / brain_akademy_DZ / 09 / js /';
var imgDirMini      = 'html / brain_akademy / brain_akademy_DZ / 09 / img /';


  */

/**
 * User: igor
 * Date: 12.04.2017(Time:2:05)
 */
'use strict';
//----------------------------------------------
//                  Plagins
//----------------------------------------------

const gulp      = require('gulp'); // Сообственно Gulp JS;
//const multipipe = require('multipipe');   //для удобного отлова ошибок последовательностью https://www.npmjs.com/package/multipipe
//const debug     = require('gulp-debug'); // для отладки   https://www.npmjs.com/package/gulp-debug
//const notify    = require('gulp-notify'); // просто красивый вывод событий  https://www.npmjs.com/package/gulp-notify
//const cached    = require('gulp-cached'); // фильтер файлов сравнением содержимо го  https://www.npmjs.com/package/gulp-cached
//const livereload = require('gulp-livereload'); // Livereload для Gulp работает через плагин в браузере
////const watch     = require('gulp-watch');  //Следит за всеми указанными файлами или целыми директориями и в случае каких-либо изменений выполняет описанные в конфигурациях таски.
////const path      = require('path');    // Полные пути к файлам

const del       = require('del'); // для удаления - Зачистки    Error: Cannot find module 'del'

//----------------------------------------------
//  + 0 Удаление - Зачистка
//      (задача через заглушку)
//-----
module.exports = function(options) {
  return function(callback) {
    //return del( 'html / brain_akademy / brain_akademy_DZ / 09 / ' )+console.log(" Удаленно : " +  'html / brain_akademy / brain_akademy_DZ / 09 / ' );
    return del( options.src_project ) + console.log(" Удаленно : " + options.src_project );
  };
};


/*
 //----------------------------------------------
 //  + 0 Удаление - Зачистка
 //     (задача без заглушки)
 //-----
gulp.task('clean', function() {
  return del(allPublic_mini)+console.log(" Удаленно : "+allPublic_mini );
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

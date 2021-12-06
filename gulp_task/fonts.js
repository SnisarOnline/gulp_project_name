'use strict';
/**
 * User: igor
 * Date: 12.04.2017(Time:2:03)
 */
//----------------------------------------------
//                  Plugins
//----------------------------------------------

const gulp = require('gulp'); // Сообственно Gulp JS;
const multipipe = require('multipipe');   //для удобного отлова ошибок последовательностью https://www.npmjs.com/package/multipipe
const debug = require('gulp-debug'); // для отладки   https://www.npmjs.com/package/gulp-debug
const notify = require('gulp-notify'); // просто красивый вывод событий  https://www.npmjs.com/package/gulp-notify
const ttf2woff = require('gulp-ttf2woff'); // https://www.npmjs.com/package/gulp-ttf2woff
const ttf2woff2 = require('gulp-ttf2woff2'); // https://www.npmjs.com/package/gulp-ttf2woff2
const fonter = require('gulp-fonter'); // https://www.npmjs.com/package/gulp-fonter

//----------------------------------------------
//  + 5 Шрифты - находим otf/ttf и генерим из них woff/woff2
//     (задача через заглушку, без заглушки - внизу )
//-----
module.exports = function (options) {
  return function (callback) {

    return multipipe(
      gulp.src(options.watch.fonts + '**/*.otf'), // Указываем где искать
      debug({title: "Нашли otf: "}), // количество для отладки
      fonter({
        format: ['ttf']
      }),
      gulp.dest(options.src.fonts), // Куда записываем
      debug({title: "Записали ttf : "}),  // количество для отладки


      gulp.src(options.watch.fonts + '**/*.ttf'), // Указываем где искать
      debug({title: "Нашли ttf: "}), // количество для отладки
      ttf2woff(),
      gulp.dest(options.build.fonts), // Куда записываем
      debug({title: "Записали woff : "}),  // количество для отладки

      gulp.src(options.watch.fonts + '**/*.ttf'), // Указываем где искать
      debug({title: "Нашли : "}), // количество для отладки
      ttf2woff2(),
      gulp.dest(options.build.fonts),   // Куда записываем
      debug({title: "Записали woff2: "}),  // количество для отладки

      options.browserSync.stream(), // Обновление страници у browserSync todo: переписать без етой строки
    ).on('error', notify.onError(function (err) {
      return {
        title: 'fonts / Css',
        message: err.message,
        sound: true
      };
    }));

  };
};


/*
//----------------------------------------------
//  + 5 Тупо Копируем Шрифты
//       (задача без заглушки)
//-----
gulp.task('font', function() {

  return multipipe(
    gulp.src(fontDir),           // Указываем где искать
    debug({title:"Нашли : "}),   // количество для отладки
    gulp.dest(fontDirMini),    // Куда записываем
    debug({title:"Записали : "}), // количество для отладки
    livereload()      // Работает через плагин или 1 строчку в наблюдении и без РНР
  ).on('error', notify.onError(function(err){
      return  {
        title:'styles / Css',
        message:err.message,
        sound: true
      };
    }))
});
*/

'use strict';
/**
 * User: igor
 * Date: 12.04.2017(Time:1:57)
 */
//----------------------------------------------
//                  Plugins
//----------------------------------------------
const gulp = require('gulp'); // Сообственно Gulp JS;
const multipipe = require('multipipe');   //для удобного отлова ошибок последовательностью https://www.npmjs.com/package/multipipe
const debug = require('gulp-debug'); // для отладки   https://www.npmjs.com/package/gulp-debug
const notify = require('gulp-notify'); // просто красивый вывод событий  https://www.npmjs.com/package/gulp-notify

// 4 img
//const newer     = require('gulp-newer');       // фильтер для картинок   - https://www.npmjs.com/package/gulp-newer
const imagemin = require('gulp-imagemin'); // Сжатие изображений -  https://github.com/sindresorhus/gulp-imagemin
// const imageResize = require('gulp-image-resize'); // Делаем Retina Изображение зависимость от (apt-get install graphicsmagick)  https://github.com/scalableminds/gulp-image-resize
// const rename      = require("gulp-rename");      // add a suffix or prefix     https://www.npmjs.com/package/gulp-rename/

//----------------------------------------------
//  + 3 Копируем и минимизируем изображения
//     (задача через заглушку, без заглушки - внизу )
//-----
module.exports = function (options) {
  return function (callback) {

    return multipipe(
      gulp.src(options.watch.image),  // Указываем где искать
      debug({title: "Нашли : "}),    // для отладки, сколько нашли
      //newer(imgDirMini), //проблема тут. Незаменяет спрайт картинку. фильтер файлов для картинок, указывать где хранятся зжатые
      imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.svgo({
          plugins: [
            {
              name: 'removeViewBox',
              active: true
            },
            {
              name: 'cleanupIDs',
              active: false
            }
          ]
        })
      ]),
      gulp.dest(options.build.image),    // Куда записываем
      debug({title: "Записали : "}),    // для отладки, и сколько обработано
      // livereload() //Сейчас работает через browserSync. Старая версия через(livereload/connect) и 1 строчку в наблюдении.
      options.browserSync.stream(), // Обновление страници у browserSync todo: переписать без етой строки
    ).on('error', notify.onError(function (err) {
      return {
        title: 'Images',
        message: err.message,
        sound: true
      };
    }));

  };
};


/*
//----------------------------------------------
//  + 3 Копируем и минимизируем изображения
//         (задача без заглушки)
//-----
gulp.task('img', function() {

  return  multipipe(
    gulp.src(imgDir),         // Указываем где искать all_files
    debug({title:"Нашли : "}),    // для отладки, сколько нашли
    //newer(imgDirMini), //проблема тут. Незаменяет спрайт картинку. фильтер файлов для картинок, указывать где хранятся зжатые
    imageResize({
      //format:'png',   // формат файла на выходе
      quality:1, // Определяет качество изображения. 0 ~ 0.2 ~ 1 (Default:1)
      percentage: 100  // процентное увеличение 100 = база
    }),
    imagemin({optimizationLevel: 5}),  // Минификация изображений  options {optimizationLevel: 5}
    gulp.dest(imgDirMini),    // Куда записываем
    debug({title:"Записали : "}), // для отладки, и сколько обработано
    // livereload() //Сейчас работает через browserSync. Старая версия через(livereload/connect) и 1 строчку в наблюдении.
  ).on('error', notify.onError(function(err){
      return  {
        title:'Images',
        message:err.message,
        sound: true
      };
    }))
});

*/

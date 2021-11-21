'use strict';
/**
 * User: igor
 * Date: 12.04.2017(Time:2:01)
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


// 2 css
// const stylus    = require('gulp-stylus'); // Плагин для Stylus ( Sass смысла нету потому что его файлы Stylus - тоже хавает)
// const nib       = require('nib');  // Плагин для Stylus (библиотека миксинов)
const sass = require('gulp-sass')(require('sass')); // https://www.npmjs.com/package/gulp-sass
const autoprefixer = require('gulp-autoprefixer');//  добавляем префиксы(gulp-myth - хуже чем автопрефиксер)
// const csso = require('gulp-csso'); // Минификация CSS   https://github.com/ben-eb/gulp-csso
const sourcemaps = require('gulp-sourcemaps'); // https://www.npmjs.com/package/gulp-sourcemaps


//----------------------------------------------
//  + 4 Собираем Css из Stylus или SASS
//     (задача через заглушку, без заглушки - внизу )
//-----

module.exports = function (options) {
  return function (callback) {

    return multipipe(
      gulp.src(options.watch.styles),    // Указываем где искать
      debug({title: "Нашли : "}),  // количество для отладки
      // cached(options.src.styles),     // фильтер файлов сравнением содержимого работает через "watch" отключать если через 1 файл переподключаем
      /*
      stylus({
        define : {url: require('stylus').resolver()},
        'resolve url': true,
        //compress: true,       //Убираем коментарии + минимизировать размер css
        'include css': true,
        use : [nib()]         // stylus({use:[nib()]}) ето пример подключения библиотеки
      }),
      */
      sourcemaps.init(),
      sass({
        outputStyle: 'expanded'
      }),
      autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}), // Создаем префиксы
      /*
      csso({
        restructure: false,
        sourceMap: true,
        debug: true
      }),    // минимизировать размер css
      */
      sourcemaps.write(),
      gulp.dest(options.build.styles),   // Куда записываем css
      debug({title: "Записали : "}),  // количество для отладки
      // livereload() //Сейчас работает через browserSync. Старая версия через(livereload/connect) и 1 строчку в наблюдении.
      options.browserSync.stream({stream: true}), // Обновление страници у browserSync
    ).on('error', notify.onError(function (err) {
      return {
        title: 'styles / Css',
        message: err.message,
        sound: true
        //icon: path.join(__dirname, 'coulson.jpg')
      };
    }));
  };
};

/*
//----------------------------------------------
//  + 4 Собираем Css из Stylus или SASS
//           (задача без заглушки)
//-----
gulp.task('css', function() {

  return multipipe(
    gulp.src(stylusDir),           // Указываем где искать
    debug({title:"Нашли : "}),      // количество для отладки
    cached("stylusDir"),      // фильтер файлов сравнением содержимого работает через "watch" отключать если через 1 файл переподключаем
    stylus({
      define: {url: require('stylus').resolver()},
      'resolve url': true,
      //compress: true, //Убираем коментарии
      'include css': true,
      use:[nib()]  // stylus({use:[nib()]}) ето пример подключения библиотеки
    }),    // собираем stylus по умолчанию off
    //sass(), // Смысла нету stylus все хавает и sass и stylus - Лес непроверял
//    shorthand(),      //изза него ИНОГДА невыводит полный путь к месту ошибки  обьединение свойст в 1 правило
    autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }), // Создаем префиксы
    //csso(),                // минимизировать размер css
    gulp.dest(cssDirMini),   // Куда записываем css
    debug({title:"Записали : "}), // количество для отладки
    // livereload() //Сейчас работает через browserSync. Старая версия через(livereload/connect) и 1 строчку в наблюдении.
  ).on('error', notify.onError(function(err){
      return  {
        title:'styles / Css',
        message:err.message,
        sound: true
        //icon: path.join(__dirname, 'coulson.jpg')
      };
    }))
});
*/

'use strict';
/**
 * Created by igor on 21.11.2021.
 */
//----------------------------------------------
//                  Plugins
//----------------------------------------------
const gulp = require('gulp'); // Сообственно Gulp JS;
const browserSync = require('browser-sync').create(); // https://browsersync.io/docs/gulp
// const livereload = require('gulp-livereload');
// const connect = require('gulp-connect'); // Livereload - https://www.npmjs.com/package/gulp-connect

//----------------------------------------------
//                global variables
//----------------------------------------------
//  variables projects
const site_name = `.`; // in linux console $pwd
const src = `${site_name}/src`;
const build = `${site_name}/build`;
const version = "";

const paths = {
  src: { // Откуда Берем = Среда разработки
    main: `${src}`,
    html: `${src}/html/`,
    styles: `${src}/scss/`, // styl_dev - компилируем только 1 файл
    scripts: `${src}/js/index.js`, // компилируем только 1 файл
    image: `${src}/img/`,
    fonts: `${src}/fonts/`, // формат уже указан
  },
  build: { // Куда Записываем = Готовый Проект
    main: `${build}/${version}`,
    html: `${build}/${version}/`,
    styles: `${build}/${version}/css/`,
    scripts: `${build}/${version}/js/`,
    image: `${build}/${version}/img/`,
    fonts: `${build}/${version}/fonts/`, // формат уже указан
  },
  watch: { // следим за файлами
    html: [`${src}/**/*.html`, `!${src}/html/**/_*.html`],
    styles: [`${src}/scss/**/*.{css,styl,scss,sass}`, `!${src}/css/**/*.{css,styl,scss,sass}`],
    scripts: `${src}/js/**/*.js`,
    image: `${src}/img/**/*.{jpeg,jpg,png,svg,gif,ico,icon,webp}`,
    fonts: `${src}/fonts/`, // формат уже указан
  },
  gulp_task: 'gulp_task' // папка хранения разных задач для gulp
};


// todo: Переписать под новую структуру
// src_dev: Откуда Берем = Среда разработки
const s_retina_dev_src = `${src}/sprite/**/*.{png,jpeg,jpg}`;
const s_retina_dev_styl = `${src}/scss/`;
const s_retina_dev_img = `${src}/img/`;
const svg_dev = `${src}/img/**/*.svg`;

//src_project: Куда Записываем = Готовый Проект
const s_retina_project_img = `${build}/${version}/img/`;
const svg_project = `${build}/${version}/img/`;

// -------------------------------------------------------------------------------------
// ------------------------------ lazyLoading tasks
// Заглушка - динамический подтягивает(require) задачу если она была вызвана.
function lazyRequireTask(name, pathLoading, options = {}) {
  options.runTaskName = name;
  options.browserSync = browserSync;
  const opt = Object.assign(options, paths);

  gulp.task(name, function (callback) {
    let task = require(pathLoading).call(this, opt);
    return task(callback);
  });
}
//----------------------------------------------
//  + Удаление - Зачистка
//      (задача через заглушку, без заглушки - в нутри файла )
//-----
lazyRequireTask("del", `./${paths.gulp_task}/clean`, {});
//----------------------------------------------
//  + HTML
//     (задача через заглушку, без заглушки - в нутри файла )
//-----
lazyRequireTask("1_html", `./${paths.gulp_task}/html`, {});
//----------------------------------------------
//  + Собираем Css из Stylus или SASS
//     (задача через заглушку, без заглушки - в нутри файла )
//-----
lazyRequireTask("2_styl_css", `./${paths.gulp_task}/styl`, {});
//----------------------------------------------
//  + Собираем JS
//     (задача через заглушку, без заглушки - в нутри файла )
//-----
lazyRequireTask("3_js", `./${paths.gulp_task}/js`, {});
//----------------------------------------------
//  + Копируем и минимизируем изображения
//     (задача через заглушку, без заглушки - в нутри файла )
//-----
lazyRequireTask("4_img_mini", `./${paths.gulp_task}/task_img/img`, {});
//----------------------------------------------
//  + Шрифты - находим otf/ttf и генерим из них woff/woff2
//     (задача через заглушку, без заглушки - в нутри файла )
//-----
lazyRequireTask("5_fonts", `./${paths.gulp_task}/fonts`, {});
//----------------------------------------------
//  todo: задача для генерирование файла с подключением woff/woff2
//-----
lazyRequireTask("5.1_fonts", `./${paths.gulp_task}/fonts`, {});
//----------------------------------------------
//  + создаем retina и спрайты и минимизируем все ето
//     (задача через заглушку, без заглушки - в нутри файла )
//-----
lazyRequireTask("6_sprite_retina", `./${paths.gulp_task}/task_img/sprite-retina`, {
  src_dev_src: s_retina_dev_src,
  src_dev_styl: s_retina_dev_styl,
  src_dev_img: s_retina_dev_img,
  src_project: s_retina_project_img
});
//----------------------------------------------
//  + создаем SVG и спрайты и минимизируем все ето
//     (задача через заглушку, без заглушки - в нутри файла )
//-----
lazyRequireTask("7_SVG_mini", `./${paths.gulp_task}/task_img/sprite-SVG`, {
  src_dev: svg_dev,
  src_project: svg_project
});
//----------------------------------------------
//  todo: авто подмена путей к файлам (спрайтам, стилям, т.п. подключениям)
//-----



// -------------------------------------------------------------------------------------
// ------------------------------ System tasks
// Наблюдение за изменениями в файлах
gulp.task("__watch", function () {
  gulp.watch(paths.watch.html, gulp.series("1_html"));
  gulp.watch(paths.watch.styles, gulp.series("2_styl_css"));
  gulp.watch(paths.watch.scripts, gulp.series("3_js"));
  gulp.watch(paths.watch.image, gulp.series("4_img_mini"));
  gulp.watch(paths.watch.image, gulp.series("5_fonts"));
  // gulp.watch(s_retina_dev_src, gulp.series("6_sprite_retina", "2_styl_css"));
  // gulp.watch(svg_dev, gulp.series("7_SVG_mini"));
  // livereload.listen();     // Старая версия. Сейчас работает через browserSync
});

// Старая версия Обновления страницы. Сейчас работает через __browserSync
/*
gulp.task("__connect", function () {
  // Старая версия обновления страници через(livereload and gulp-connect) и 1 строчку в наблюдении.
  connect.server({
    root: `${paths.build.html}`,
    livereload: true
  });
});
*/

gulp.task("__browserSync", function () {
  // BrowserSync - бновление страницы вместо livereload
  browserSync.init({
    server: {
      baseDir: paths.build.html
    },
    port: 3000,
    notify: false,
    open: false,
  });
  // browserSync.watch(`${paths.build.main}`, browserSync.reload);
});



// -------------------------------------------------------------------------------------
// ------------------------------ Used tasks
gulp.task('default', function () {
  return (
      console.log(" =   =   =   ="),
          console.log(`+ Дерикт.Разработки  =>  ${paths.src.main}`),
          console.log(` - Шрифты из .  =>  ${paths.src.fonts}`),
          console.log(` - Стили  из . =>  ${paths.src.styles}`),
          console.log(` - Спрайты  из . =>  ${s_retina_dev_src}`),
          console.log(` - Картинки  из . =>  ${paths.src.image}`),
          console.log(` - JavaScript из . =>  ${paths.src.scripts}`),
          console.log(" -  -  -  -  -  "),
          console.log(`+ дерикт. проектирования =>  ${paths.build.main}`),
          console.log(` - Картинки и Спрайты в =>  ${paths.build.image}`),
          console.log(` - Шрифты и Стили  в . =>  ${paths.build.fonts}`),
          console.log(" =   =   =   =")
  );
});

gulp.task('build', gulp.series('1_html','2_styl_css','3_js','4_img_mini','5_fonts') );

gulp.task("start", gulp.parallel('__watch', '__browserSync'));

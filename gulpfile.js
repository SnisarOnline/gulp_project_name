/**
 * Created by igor on 10.12.16.
 */
'use strict';
//----------------------------------------------
//                  Plugins
//----------------------------------------------
const gulp      = require('gulp'); // Сообственно Gulp JS;
// const browserSync = require('browser-sync').create(); // https://browsersync.io/docs/gulp
const livereload = require('gulp-livereload'); // Livereload для Gulp работает через плагин в браузере
const connect = require('gulp-connect'); // Livereload - https://www.npmjs.com/package/gulp-connect

//----------------------------------------------
//                global variables
//----------------------------------------------
//  variables projects
const full_path_url = "/home/user/Project/BeetrootAcademy--all_lessons/34-Gulp"; // linux console $pwd
const site_name = "gulp_project_name";
const assets = "frontend-dev";
const publication = "frontend-prod";
const version = "v.0.0.1";

/*
// todo: переписать на обьект
const paths = {
  styles: {
    src: 'src/styles/!**!/!*.less',
    dest: 'assets/styles/'
  },
  scripts: {
    src: 'src/scripts/!**!/!*.js',
    dest: 'assets/scripts/'
  }
};
*/
// src_dev: Откуда Берем = Среда разработки
const dev_src           = `/${site_name}/${assets}` ;
const html_dev          = full_path_url +`/${site_name}/${assets}/html/**/**.html`;
const fonts_dev         = full_path_url +`/${site_name}/${assets}/css/fonts/**/*.{eot,otf,ttf,woff,svg,css}`;
const styl_dev          = full_path_url +`/${site_name}/${assets}/css/**/**.css`; // както добавить (*.css) формат для копирайта.
const styl_dev_Watch    = full_path_url +`/${site_name}/${assets}/css/**/*.{styl,scss,sass}`;
const js_dev            = full_path_url +`/${site_name}/${assets}/js/**/*.js`;
const s_retina_dev_src  = full_path_url +`/${site_name}/${assets}/sprite/**/*.{png,jpeg,jpg}`;
const s_retina_dev_styl = full_path_url +`/${site_name}/${assets}/css/`;
const s_retina_dev_img  = full_path_url +`/${site_name}/${assets}/img/`;
const svg_dev           = full_path_url +`/${site_name}/${assets}/img/**/*.svg`;
const img_dev           = full_path_url +`/${site_name}/${assets}/img/**/*.{icon,png,jpeg,jpg,gif}`;
//src_project: Куда Записываем = Готовый Проект
const project               = full_path_url +`/${site_name}/${publication}/${version}` ;
const html_project          = full_path_url +`/${site_name}/${publication}/${version}/html/`;
const fonts_project         = full_path_url +`/${site_name}/${publication}/${version}/css/fonts/`;
const styl_project          = full_path_url +`/${site_name}/${publication}/${version}/css/`;
const js_project            = full_path_url +`/${site_name}/${publication}/${version}/js/`;
const s_retina_project_img  = full_path_url +`/${site_name}/${publication}/${version}/img/`;
const svg_project           = full_path_url +`/${site_name}/${publication}/${version}/img/`;
const img_project           = full_path_url +`/${site_name}/${publication}/${version}/img/`;

//----------------------------------------------
//                Tasks
//  Default options
//-----
gulp.task('default', function() {
  return (
    console.log( " =   =   =   ="),
    console.log( `+ Дерикт.Разработки  =>  ${site_name}/${assets}`),
    console.log( ` - Dir_Разработки из =>  ${dev_src}`),
    console.log( ` - Шрифты из .  =>  ${fonts_dev}`),
    console.log( ` - Стили  из . =>  ${styl_dev}`),
    console.log( ` - Спрайты  из . =>  ${s_retina_dev_src}`),
    console.log( ` - Картинки  из . =>  ${img_dev}`),
    console.log( ` - JavaScript из . =>  ${js_dev}`),
    console.log( " -  -  -  -  -  "),
    console.log( `+ дерикт. проектирования =>  ${site_name}/${publication}`),
    console.log( ` - Dir_Публикации  в .  =>  ${project}`),
    console.log( ` - Шрифты и Стили  в . =>  ${styl_project}`),
    console.log( ` - Картинки и Спрайты в =>  ${img_project}`),
    console.log( " =   =   =   =")
   );
});
//----------------------------------------------
//  + 0 Заглушка - динамический подтягивает задачу если она нужна.
//-----
function lazyRequireTask(taskName, path, options) {
  options = options || {};     // необизательный параметр
  options.taskName = taskName;   // необизательный параметр
  gulp.task(taskName, function(callback) {
    let task = require(path).call(this, options);

    return task(callback);
  });
}

const gulp_task = `gulp_task`; // папка хранения задач для gulp
//----------------------------------------------
//  + 0 Удаление - Зачистка
//      (задача через заглушку, без заглушки - в нутри файла )
//-----
lazyRequireTask("del_project", `./${gulp_task}/clean`, {
  //src_dev: html_dev,
  src_project: project
});
//----------------------------------------------
//  + 1 HTML
//     (задача через заглушку, без заглушки - в нутри файла )
//-----
lazyRequireTask("1_html", `./${gulp_task}/html`, {
  src_dev: html_dev,
  src_project: html_project
});
//----------------------------------------------
//  + 2 создаем retina и спрайты и минимизируем все ето
//     (задача через заглушку, без заглушки - в нутри файла )
//-----
lazyRequireTask("2_sprite_retina", `./${gulp_task}/img/sprite-retina`, {
  src_dev_src : s_retina_dev_src,
  src_dev_styl: s_retina_dev_styl,
  src_dev_img : s_retina_dev_img,
  src_project: s_retina_project_img
});
//----------------------------------------------
//  + 3 создаем SVG и спрайты и минимизируем все ето
//     (задача через заглушку, без заглушки - в нутри файла )
//-----
lazyRequireTask("3_SVG_mini", `./${gulp_task}/img/sprite-SVG`, {
  src_dev: svg_dev,
  src_project: svg_project
});
//----------------------------------------------
//  + 4 Копируем и минимизируем изображения
//     (задача через заглушку, без заглушки - в нутри файла )
//-----
lazyRequireTask("4_img_mini", `./${gulp_task}/img/img`, {
  src_dev: img_dev,
  src_project: img_project
});
//----------------------------------------------
//  + 5 Тупо Копируем Шрифты
//     (задача через заглушку, без заглушки - в нутри файла )
//-----
lazyRequireTask("5_fonts", `./${gulp_task}/fonts`, {
  src_dev: fonts_dev,
  src_project: fonts_project
});
//----------------------------------------------
//  + 6 Собираем Css из Stylus или SASS
//     (задача через заглушку, без заглушки - в нутри файла )
//-----
lazyRequireTask("6_styl_css", `./${gulp_task}/styl`, {
  src_dev: styl_dev,
  src_project: styl_project
});
//----------------------------------------------
//  + 7 Собираем JS
//     (задача через заглушку, без заглушки - в нутри файла )
//-----
lazyRequireTask("7_js", `./${gulp_task}/js`, {
  src_dev: js_dev,
  src_project: js_project
});

//----------------------------------------------
//  - 8 авто подмена путей к файлам (спрайтам, стилям, т.п. подключениям)
//-----
//----------------------------------------------
//  - 9
//-----


//----------------------------------------------
//  + Наблюдение за изменениями в файлах
//       (задача без заглушки)
//--------------
gulp.task("__watch", function() {
  gulp.watch(html_dev, gulp.series("1_html"));
  //.on("unlink", function(filepath){
  //  delete cached.caches.html_dev[path.resolve(filepath)];
  //});
  gulp.watch( s_retina_dev_src, gulp.series("2_sprite_retina","6_styl_css"));
  gulp.watch( img_dev, gulp.series("4_img_mini"));
  gulp.watch( svg_dev, gulp.series("3_SVG_mini"));
  gulp.watch( styl_dev_Watch, gulp.series("6_styl_css"));
  //.on("unlink", function(filepath){
  //  delete cached.caches.styl_dev_Watch[path.resolve(filepath)];
  //});
  gulp.watch(js_dev, gulp.series("7_js"));
  //.on("unlink", function(filepath){
  //  delete cached.caches.js_dev[path.resolve(filepath)];
  //});

  livereload.listen();     // Работает через плагин,без РНР и ету строчку в наблюдении
});

gulp.task("__connect", function() {
  // @info https://youtu.be/bK3kzGhbJR0
  connect.server({
    root: `${html_project}`,
    livereload: true
  });
});

gulp.task("__browser-sync", function() {
// todo: дописать https://browsersync.io/docs/gulp
  browserSync.init({
      server: {
          baseDir: `${project}`
      }
  });
  browserSync.watch(`${project}`, browserSync.reload);
});

gulp.task("build", function() {
  // todo: дописать билд проекта.
});

gulp.task("start", gulp.parallel('__connect', '__watch'));


 
# Подключение и использование конфигурации
 1) Установка всех зависимостей и Gulp поставить Локально и Глобально.
 2) Чтобы подхватить файл с настройками, он должен называтся "gulpfile.js"
 

# Install GULP
+ [WebSite](https://gulpjs.com/)
+ [GitHub](https://github.com/gulpjs/gulp)

#### [Install](https://gulpjs.com/docs/en/getting-started/quick-start) 
+ local package Gulp. `npm i gulp`
+ global package Gulp. `sudo npm i -g gulp`

<b>Не обезательно ставить глобальный пакет.</b> Но тогда прийдется использовать Gulp из "node_modules" проекта.
Для етого, пакет "Gulp" нужно добавить в переменное окружение в систему "$PATH"
```json
    echo $PATH
    source ~/.bashrc
```

#### Установка всех зависимостей для данной структуры
```json
  npm i --save-dev gulp-sourcemaps del gulp gulp-autoprefixer gulp-cached gulp-cheerio gulp-concat gulp-connect gulp-csso gulp-debug gulp-fixmyjs gulp-htmlmin gulp-image-resize gulp-imagemin gulp-livereload gulp-notify gulp-rename gulp-replace gulp-shorthand gulp-stylus gulp-svgmin gulp-uglify gulp-watch gulp.spritesmith multipipe nib stylus
```

#### Подключенные плагины
Plugin name         | Command       | Description
---                 | ---           | ---
[del](https://www.npmjs.com/package/del) | `npm i --save-dev del` | Delete files and folders
[gulp-rename](https://www.npmjs.com/package/gulp-rename) | `npm i --save-dev gulp-rename` | simple file renaming methods.
[multipipe](https://www.npmjs.com/package/multipipe) | `npm i --save-dev multipipe` | Allows you to handle errors in one place.
[gulp-notify](https://www.npmjs.com/package/gulp-notify) | `npm i --save-dev gulp-notify` | notification plugin for gulp
[gulp-debug](https://www.npmjs.com/package/gulp-debug) | `npm i --save-dev gulp-debug` | Debug file streams 
[gulp-cached](https://www.npmjs.com/package/gulp-cached) | `npm i --save-dev gulp-cached`  | File cache for gulp
[gulp-livereload](https://www.npmjs.com/package/gulp-livereload) | `npm i --save-dev gulp-livereload` | Авто Обновление страници
[gulp-watch](https://www.npmjs.com/package/gulp-watch) | `npm i --save-dev gulp-watch` | Наблюдение за изменениями
[gulp-cheerio](https://www.npmjs.com/package/gulp-cheerio) | `npm i --save-dev gulp-cheerio` | manipulate html and xml files
[gulp-replace](https://www.npmjs.com/package/gulp-replace) | `npm i --save-dev gulp-replace` | A string replace URL plugin
[gulp-htmlmin](https://www.npmjs.com/package/gulp-htmlmin) | `npm i --save-dev gulp-htmlmin` | minify HTML.
[gulp-stylus](https://www.npmjs.com/package/gulp-stylus) | `npm i --save-dev gulp-stylus` | gulp-Препроцессор
[stylus](https://www.npmjs.com/package/stylus) | `npm i --save-dev stylus` | [Stylus](http://stylus-lang.com/), [GitHub](https://github.com/shama/stylus-loader)
[gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps) | `npm i --save-dev gulp-sourcemaps`  | gulp-sourcemaps
[nib](https://github.com/stylus/nib) | `npm i --save-dev nib`  | Stylus mixins, utilities, components, and gradient image generation.
[gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer) | `npm i --save-dev gulp-autoprefixer`  | Prefix CSS with Autoprefixer
[gulp-concat](https://www.npmjs.com/package/gulp-concat) | `npm i --save-dev gulp-concat`  | Concatenates files
[gulp-csso](https://www.npmjs.com/package/gulp-csso) | `npm i --save-dev gulp-csso`     |  Minify CSS 
[gulp-shorthand](https://www.npmjs.com/package/gulp-shorthand) | `npm i --save-dev gulp-shorthand` | lighter CSS files and more readable
[gulp-image-resize](https://www.npmjs.com/package/gulp-image-resize) | `npm i --save-dev gulp-image-resize` | Resize images (GraphicsMagick or ImageMagick).
[gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin) | `npm i --save-dev gulp-imagemin` | Minify PNG, JPEG, GIF and SVG images (imagemin)
[gulp.spritesmith](https://www.npmjs.com/package/gulp.spritesmith) | `npm i --save-dev gulp.spritesmith` | Convert a set of images into a spritesheet and CSS variables
[gulp-svgmin](https://www.npmjs.com/package/gulp-svgmin) | `npm i --save-dev gulp-svgmin` | Minify SVG with SVGO.
[gulp-fixmyjs](https://www.npmjs.com/package/gulp-fixmyjs) | `npm i --save-dev gulp-fixmyjs` | Проверка ошибок в js
[gulp-uglify](https://www.npmjs.com/package/gulp-uglify) | `npm i --save-dev gulp-uglify` | Minify JavaScript 

-----

[YouTube - Guide to use (ru)](https://www.youtube.com/playlist?list=PLxZpOFEb1t7MDTyixGjvyS7eECEcV6w4N)
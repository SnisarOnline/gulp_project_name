'use strict';
/**
 * User: igor
 * Date: 12.04.2017(Time:2:05)
 */

const del = require('del'); // для удаления - Зачистки

//----------------------------------------------
//  Удаление - Зачистка
//      (задача через заглушку)
//-----
module.exports = function(options) {
  return function(callback) {
    return del( options.build.main ) + console.log(" Удаленно : " + options.build.main );
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

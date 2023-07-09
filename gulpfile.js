
const { src, dest, watch, series , parallel } = require('gulp');
//css y sas
const autoprefixer = require('autoprefixer');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
//imagenes
const imagemin = require('gulp-imagemin'); //npm install --save-dev gulp-imagemin@7.1.0
const webp = require('gulp-webp'); //npm i --save-dev gulp-webp
const avif = require('gulp-avif'); //npm i --save-dev gulp-avif


function css(done){
    //compilar sass
    //pasos: 1- identificar archivos, 2- complilarla, 3- guardar el .css
    src('src/scss/app.scss')
        .pipe( sass() )
        .pipe(postcss([autoprefixer()]))
        .pipe( dest('build/css') )
        done();
} 

function imagenes(done){
    src('src/img/**/*')
    .pipe(imagemin({optimizationLevel: 3}))
    .pipe(dest('build/img'));

    done();
}

function versionWebp(){
    return src('src/img/**/*.{png,jpg}')    //identifico el archivo
            .pipe(webp())                   //se combierte a webp
            .pipe(dest('build/img'));       //y las guarda con dest en la 'build/img'

}
function versionAvif(){
    return src('src/img/**/*.{png,jpg}')    //identificar el archivo
            .pipe(avif())                   //se combierte a avif
            .pipe(dest('build/img'));       //y las guarda con dest en la 'build/img'
}
function dev(){
    watch('src/scss/**/*.scss', css);
   watch('src/img/**/*', imagenes);
    
    
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = series( imagenes, css, dev );
//exports.default = series( imagenes, versionWebp,versionAvif ,css, dev );

//series-
//parallel-
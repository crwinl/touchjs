var fs = require('fs')
var build = require('buildModules')

var buildDirectory = __dirname+'/generatedBuilds/'
if(!fs.existsSync(buildDirectory)) {
    fs.mkdirSync(buildDirectory)
}

var touch = fs.readFileSync(__dirname + '/touch.js').toString()
var copywrite = '/* Copyright (c) 2013 Billy Tetrud - Free to use for any purpose: MIT License*/'

console.log('building and minifying...')
build(buildDirectory, 'touch', copywrite, touch)
console.log('done')
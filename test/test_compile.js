var fs = require('fs');
var os = require('os');

var boards = require('../boards');
var platform = require('../platform');
var Q = require('q');


//var master = require('../master');
//var compile = require('../compile');
//var uploader = require('../uploader');
//var platform = require('../platform');
//var boards = require('../boards');

//clean the build path
//var outpath = "build/out";
//var BUILD_DIR = os.tmpdir() + '/build/out';





//var sketchPath = '/Users/josh/projects/Digistump/hardware/digistump/avr/libraries/SPI/examples/DigitalPotControl';
//var sketchPath = '/Users/josh/Documents/Arduino/BetterName2';
//var sketchPath = '/Users/josh/Documents/Arduino/BleRobot2';
//var sketchPath = '/Users/josh/Documents/Arduino/DigitalPotControl';
//var sketchPath = '/Users/josh/Documents/Arduino/DrawBot2';

/*

//setup standard options
var options = {
    name: sketchPath.substring(sketchPath.lastIndexOf('/')),
}
options.device = boards.getBoard('uno');
options.device = boards.getBoard('digispark-pro');
//options.device = boards.getBoard('flora');
if(options.device == null) {
    throw new Error('Device Not Found');
}
options.platform = platform.getPlatform(options.device);


var debug = function(res) {
    console.log("LOG",res.message);
}

options.platform.installIfNeeded(function() {
    compile.compile(sketchPath,BUILD_DIR,options, debug, sketchPath, function() {
        console.log("done with compiling");
    });
},debug);
*/

//var code = fs.readFileSync(sketchPath+'/DrawBot2.ino').toString();

var Compiler = {
    buildSketch: function(sketchPath, boardId) {
        var OPTIONS = { userlibs: platform.getSettings().userlibs };
        OPTIONS.device =  boards.getBoard(boardId);
        OPTIONS.platform = platform.getPlatform(OPTIONS.device);
        return OPTIONS.platform
            .installIfNeeded_P()
            .then(this.compile_P());
    },
    compile_P: function() {
        return Q.fcall(function() {
            console.log('compiling');
        });
    }
};

var sketchPath = 'test/examples/NESTest/';
Compiler.buildSketch(sketchPath, 'uno')
    .then(function(result){
        console.log("done with the result");
    }, function() {
        console.log('error')
    }, function(d) {
        console.log("notify",d);
    })
    .done();
/*
exports.doCompile = function(code,board,sketch, cb, publishEvent) {
    var BUILD_DIR = os.tmpdir() + '/build';
    publishEvent({ type:'compile', message:BUILD_DIR});
    console.log("compiling with build dir:", BUILD_DIR);
    //create output dir
    if(!fs.existsSync(BUILD_DIR)) {
        fs.mkdirSync(BUILD_DIR);
    }
    var outpath    = makeCleanDir(BUILD_DIR+'/out');
    var sketchpath = makeCleanDir(BUILD_DIR+"/tmp");
    var inoFile = path.join(sketchpath, sketch + '.ino');
    fs.writeFileSync(inoFile, code);

    publishEvent({ type:'compile', message:'writing to ' + inoFile });

    var foundBoard = null;
    BOARDS.forEach(function(bd) {
        if(bd.id == board) foundBoard = bd;
    })
    OPTIONS.device = foundBoard;
    OPTIONS.platform = platform.getPlatform(OPTIONS.device);
    OPTIONS.platform.installIfNeeded(function() {
        OPTIONS.name = sketch;
        compile.compile(sketchpath,outpath,OPTIONS, publishEvent,
            path.join(OPTIONS.platform.getUserSketchesDir(), sketch), cb);
    }, function(per) {
        console.log("percentage = ",per);
    });
}
*/
/*
var code = fs.readFileSync(sketchPath+'NESTest.ino').toString();
//console.log('code = ', code);
master.doCompile(code, "uno", 'DrawBot2',
    function() {
        console.log('called back');
    },
    function() {
        console.log('errored');
    }
);
*/
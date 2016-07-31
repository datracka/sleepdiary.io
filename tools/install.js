// -----------------------------------------------------------
// version 1.00
// -----------------------------------------------------------
"use strict";

var debugging = false;

var fs = require('fs');
var cp = require('child_process');
var path = require('path');

// /Users/vicensfayos/Projects/sleepdiary.io-shared/app

if (process.argv.length < 3) {
    console.log("Argument: shared project for symlink is missing. Symlink will not be created");
    process.exit(1);
}
console.log("number ", process.argv.length);
var sleepdiarySharedAppPath = process.argv[2];
var sharedAppPath = '../app/src/shared/';

// console.log("Installing NativeScript support files...");
// cp.execSync('npm install', {cwd: 'nativescript'});

console.log("Configuring...");

// remove previous symlinks if they exist
try {
  if (fs.existsSync(resolve(sharedAppPath))) {
    fs.unlinkSync(resolve(sharedAppPath));
  }
} catch (err) {
}

// We need to create a symlink
try {
    createSymLink();
} catch (err) {
    if (debugging) {
        console.log("Symlink error: ", err);
    }
    // Failed, which means they weren't running root; so lets try to get root
    AttemptRootSymlink();
}

// Might silent fail on OSX, so we have to see if it exists
// if (!fs.existsSync(resolve(nativescriptComponentsPath))) {
//     AttemptRootSymlink();
// }

displayFinalHelp();

if (!fs.existsSync(resolve(sharedAppPath))) {
    console.log("We were unable to create a symlink  - from -");
    console.log("  ", resolve(sleepdiarySharedAppPath), "    - to - ");
    console.log("  ", resolve(sharedAppPath));
    console.log("If you don't create this symlink, you will have to manually copy the code each time you change it.");
}


return 0;

/**
 * This will attempt to run the install script as root to make a symlink
 *
 */
function AttemptRootSymlink() {

    if (process.platform === 'win32') {
      var curPath = resolve("./");
      if (debugging) {
          console.log("RootSymlink Base path is", curPath);
      }
      cp.execSync("powershell -Command \"Start-Process 'node' -ArgumentList '"+curPath+"/install.js symlink' -verb runas\"");
    } else {        
      console.log("To automatically create a SymLink between your web app and NativeScript, we need root for a second.");
      cp.execSync("sudo "+process.argv[0] + " " + process.argv[1] +" symlink");
    }
}


/**
 * Create Symlink
 */
function createSymLink() {
    if (debugging) {
        console.log("Attempting to Symlink", sleepdiarySharedAppPath);
    }
    fs.symlinkSync(resolve(sleepdiarySharedAppPath), resolve(sharedAppPath), 'junction');
  
}

/**
 * Display final help screen!
 */
function displayFinalHelp()
{
    console.log("------------------------ Angular 2 is Now Ready ----------------------------");
    console.log("");
    console.log("Run your web app with:");
    console.log("  npm start");
    console.log("");
    console.log("-----------------------------------------------------------------------------------------");
    console.log("");
}

function splitPath(v) {
    var x;
    if (v.indexOf('/') !== -1) {
        x = v.split('/');
    } else {
        x = v.split("\\");
    }
    return x;
}

function resolve(v) {
    var cwdPath = splitPath(process.argv[1]);
    // Kill the Script name
    cwdPath.length = cwdPath.length - 1;

    var resolvePath = splitPath(v);

    // Eliminate a trailing slash/backslash
    if (cwdPath[cwdPath.length-1] === "") { cwdPath.pop(); }

    if (v[0] === '/' || v[0] === "\\") { cwdPath = []; }
    for (var i=0;i<resolvePath.length;i++) {
        if (resolvePath[i] === '.' || resolvePath[i] === "") { continue; }
        if (resolvePath[i] === '..') { cwdPath.pop(); }
        else { cwdPath.push(resolvePath[i]); }
    }
    if (process.platform === 'win32') {
        var winResult = cwdPath.join("\\");
        if (winResult[winResult.length-1] === "\\") { winResult = winResult.substring(0, winResult.length - 1); }
        return winResult;
    } else {
		var result = cwdPath.join('/');
		if (result[0] !== '/') { result = '/' + result; }
		if (result[result.length-1] === '/') { result = result.substring(0, result.length - 1); }
        return result;
    }

}

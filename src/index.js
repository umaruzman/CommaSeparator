const electron = require('electron');
const path = require('path');
const { remote } = require('electron');
const BrowserWindow = electron.remote.BrowserWindow;
const ipc = require('electron').ipcRenderer;

// Function Start Runs after the window completes loading...

function start () {

    /*
        [START] Dropdown Control
    */

    var btnSeparatorType = document.getElementById('btnSeparatorType');

    // Dropdown Comma(,) Selection
    var ddComma = document.getElementById('ddComma');

    ddComma.addEventListener('click', function () {
        btnSeparatorType.innerHTML = ",";
    });

    // Dropdoen Colon(:) Selection
    var ddColon = document.getElementById('ddColon');

    ddColon.addEventListener('click', function () {
        btnSeparatorType.innerHTML = ":";
    });

    // Dropdoen SemiColon(;) Selection
    var ddSemiColon = document.getElementById('ddSemiColon');

    ddSemiColon.addEventListener('click', function () {
        btnSeparatorType.innerHTML = ";";
    });

    // Dropdoen Dash(-) Selection
    var ddDash = document.getElementById('ddDash');

    ddDash.addEventListener('click', function () {
        btnSeparatorType.innerHTML = "-";
    });

    // Dropdoen Slash(/) Selection
    var ddSlash = document.getElementById('ddSlash');

    ddSlash.addEventListener('click', function () {
        btnSeparatorType.innerHTML = "/";
    });

    // Dropdoen HLine(|) Selection
    var ddHLine = document.getElementById('ddHLine');

    ddHLine.addEventListener('click', function () {
        btnSeparatorType.innerHTML = "|";
    });

    // Dropdoen Space( ) Selection
    var ddSpace = document.getElementById('ddSpace');

    ddSpace.addEventListener('click', function () {
        btnSeparatorType.innerHTML = "Space";
    });

    ddCustom.addEventListener('click', function () {
        openCustomWindow();
    });

    
    /*
        [END] Dropdown Control
    */

    /*
        [START] Separate Multiline Text Button (>>)
    */

    var separatorType = document.getElementById('btnSeparatorType').innerHTML;
        
    var btnSeperateMultiline = document.getElementById('btnSeperateMultiline');

    btnSeperateMultiline.addEventListener('click', function () {
        separatorType = document.getElementById('btnSeparatorType').innerHTML;
        if (separatorType == "Space") {
            document.getElementById('txtOutput').value = separateMultiline(" ");
        } else {
            document.getElementById('txtOutput').value = separateMultiline(separatorType);
        }

    });

    /*
        [END] Separate Multiline Text Button (>>)
    */

    /*
        [START] Separate Singleline Text Button (<<)
    */
        
   var btnSeperateSingleLine = document.getElementById('btnSeperateSingleLine');

   btnSeperateSingleLine.addEventListener('click', function () {
        separatorType = document.getElementById('btnSeparatorType').innerHTML;
        if (separatorType == "Space") {
                document.getElementById('txtInput').value = separateSingleLine(" ");
        } else {
                document.getElementById('txtInput').value = separateSingleLine(separatorType);
        }
   });

   /*
       [END] Separate Singleline Text Button (<<)
   */

   /*
       [START] Clear Button
   */

    var btnClear = document.getElementById('btnClear');

    btnClear.addEventListener('click', function () {
        document.getElementById('txtInput').value = "";
        document.getElementById('txtOutput').value = "";
    });

   /*
       [END] Clear Button
   */

}


// Function for Separate Multiline Text


function separateMultiline (separator) {
    var inputText = document.getElementById('txtInput').value;

    var inputTextArr = inputText.split("\n");

    var outputText = "";

    for (i of inputTextArr) {
        outputText = outputText + i.toLocaleString() + separator.toLocaleString();
    }

    return outputText.slice(0, outputText.length - 1);
}


// Function for Separate SingleLine Text


function separateSingleLine (separator) {
    var outputText = document.getElementById('txtOutput').value;

    var textArr = outputText.split(separator);

    var resultText = "";

    for (i of textArr) {
        resultText = resultText + i.toLocaleString() + "\n";
    }

    return resultText.slice(0, resultText.length - 1);
}


// Function to open Custom Window

function openCustomWindow () {
    const modalPath = path.join('file://', __dirname, 'custom.html');
    let win = new BrowserWindow({
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        resizable:false,
        width: 300,
        height: 200,
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.on('close', function () {win = null});
    win.loadURL(modalPath);
    win.show();

    //win.webContents.openDevTools()

}

// This calls the Start Function after loading the window..

var body = document.getElementsByTagName('body')[0];

body.onload = function () {
    start();
};

ipc.on ('new-selector', function(event,arg){
    var newSelector = String(arg);
    btnSeparatorType.innerHTML = newSelector.toLocaleString('en');
});
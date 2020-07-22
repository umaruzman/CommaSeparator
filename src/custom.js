const electron = require('electron');
const path = require('path');
//const { ipcMain } = require('electron');
const remote = electron.remote;
const ipc = require('electron').ipcRenderer;



function start() {

    var btnCancel = document.getElementById('btnCancel');
    var btnOk = document.getElementById('btnOk');

    //Button Cancel
    btnCancel.addEventListener('click', function (){
        var window = remote.getCurrentWindow();
        window.close();
    });

    // Button OK
    btnOk.addEventListener('click', function(){
        ipc.send('update-selector', document.getElementById('txtCustomSeparator').value);

        var window = remote.getCurrentWindow();
        window.close();
    });
}






// This calls the Start Function after loading the window..

var body = document.getElementsByTagName('body')[0];

body.onload = function () {
    start();
};
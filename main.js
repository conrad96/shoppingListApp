const {app, BrowserWindow} = require('electron');
const url = require('url');
const path = require('path');

let window;
function mainWindow(){
    window = new BrowserWindow({});
    window.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
}
//listen for app to be ready
app.on('ready', mainWindow);
//close when all windows are closed
app.on('window-all-closed', ()=>{
    window = null;
    app.quit();
});

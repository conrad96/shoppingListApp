const {app, BrowserWindow, Menu} = require('electron');
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
//new window functions
function addItemWindow(){
    addItemWindow = new BrowserWindow({
        width: 500,
        height: 165,
        title: 'Add Shopping List Item',
        parent: window,
        autoHideMenuBar: true       
    });
    addItemWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'addItem.html'),
        protocol: 'file:',
        slashes: true
    }));
}
//create menu
const menu = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Add Item',
                click: ()=>{
                    addItemWindow()
                }
            },
            {
                label: 'Clear Items'
            },
            {
                label: 'Quit',
                click: ()=> {
                    app.quit()
                }
            },
        ]
    }
];

const mainMenu = Menu.buildFromTemplate(menu)
Menu.setApplicationMenu(mainMenu);
//close when all windows are closed
app.on('window-all-closed', ()=>{
    window = null;
    app.quit();
});

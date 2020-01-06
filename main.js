const {app, BrowserWindow, Menu, ipcMain} = require('electron');
const url = require('url');
const path = require('path');
const {getItems, addItem} = require('./dataStore');

let window;
function mainWindow(){
    window = new BrowserWindow({webPreferences: {nodeIntegration: true}});    

    window.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));    
    //use the webcontents api to send ipc message
    window.webContents.on('did-finish-load', ()=>{
        window.webContents.send('get-items', getItems());
    })
    
    //open dev tools
    window.webContents.openDevTools();
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

//IPC MAIN listen to channels
ipcMain.on('add-item', (event, item)=>{
    //add new item to list
    addItem(item);
    window.send('get-items', getItems());
});

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

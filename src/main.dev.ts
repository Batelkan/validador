/* eslint-disable prettier/prettier */
/* eslint global-require: off, no-console: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build:main`, this file is compiled to
 * `./src/main.prod.js` using webpack. This gives us some performance wins.
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import path from 'path';
import { app, BrowserWindow, shell,webFrame } from 'electron';
import unhandled from 'electron-unhandled';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';

const ipcmain = require('electron').ipcMain;
const fs = require('fs');
const CfdiToJson = require('cfdi-to-json');

unhandled({

	showDialog: true
});


export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1280,
    height: 728,
    minWidth: 1280,
    minHeight: 728,
    autoHideMenuBar: true,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.webContents.setZoomFactor(0.6);
  mainWindow.webContents
    .setVisualZoomLevelLimits(0.2, 1)
    .catch((err) => console.log(err));
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
      require('./services/sqlservice');
      require('./services/sqlserviceComplementos');
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.whenReady().then(createWindow).catch(console.log);

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});

ipcmain.on('loadXmlMainProcess', (event :any, data:[]) => {
  const result = data.map((val:string) =>
        {
          const tempjson = CfdiToJson.parse({ path: val });
          tempjson.EstaGuardado = false;
          return tempjson;
        });
  if (mainWindow != null)
  {
    mainWindow.webContents.send('loadJsonCfdi', result);
  }
});

ipcmain.on('reloadXmlMainProcess', (event: any, data: []) => {
  let result = data.map((val: string) => {
    return CfdiToJson.parse({ path: val });
  });

  if (mainWindow != null) {
    mainWindow.webContents.send('loadSingleCfdi', result);
    result = [];
  }
});

ipcmain.on('cloadXmlMainProcess', (event :any, data:[]) => {
    try {
          const result = data.map((val:string) =>
            {
              const tempjson = CfdiToJson.parse({ path: val });
              tempjson.EstaGuardado = false;
              return tempjson;
            });

          if (mainWindow != null)
            {
              mainWindow.webContents.send('cloadJsonCfdi', result);
            }
        }
      catch (error:any) {
            unhandled.logError(new Error(error), {title: 'Erro en el archivo cfdi'});
          }
});

ipcmain.on('creloadXmlMainProcess', (event: any, data: []) => {
  let result = data.map((val: string) => {
    return CfdiToJson.parse({ path: val });
  });

  if (mainWindow != null) {
    mainWindow.webContents.send('cloadSingleCfdi', result);
    result = [];
  }
});

const { contextBridge, ipcRenderer } = require('electron')

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Platform info
  platform: process.platform,
  
  // App info
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  getPlatform: () => ipcRenderer.invoke('get-platform'),
  
  // File operations
  showSaveDialog: (options) => ipcRenderer.invoke('show-save-dialog', options),
  showOpenDialog: (options) => ipcRenderer.invoke('show-open-dialog', options),
  readFile: (filePath) => ipcRenderer.invoke('read-file', filePath),
  writeFile: (filePath, data) => ipcRenderer.invoke('write-file', filePath, data),
  
  // External links
  openExternal: (url) => ipcRenderer.invoke('open-external', url),
  
  // Menu event listeners
  onMenuNewPresentation: (callback) => ipcRenderer.on('menu-new-presentation', callback),
  onMenuOpenFile: (callback) => ipcRenderer.on('menu-open-file', callback),
  onMenuSave: (callback) => ipcRenderer.on('menu-save', callback),
  onMenuExport: (callback) => ipcRenderer.on('menu-export', callback),
  onMenuBrowseTemplates: (callback) => ipcRenderer.on('menu-browse-templates', callback),
  onMenuUploadTemplate: (callback) => ipcRenderer.on('menu-upload-template', callback),
  onMenuToggleChat: (callback) => ipcRenderer.on('menu-toggle-chat', callback),
  onMenuAIGenerate: (callback) => ipcRenderer.on('menu-ai-generate', callback),
  onMenuUploadDocument: (callback) => ipcRenderer.on('menu-upload-document', callback),
  
  // Remove listeners
  removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel)
})

// Notify when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('Electron preload script loaded')
  
  // Add electron class to body for styling
  document.body.classList.add('electron-app')
})

// preload.ts

import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Video management
  uploadVideos: () => ipcRenderer.invoke('upload-videos'),
  getAllVideos: () => ipcRenderer.invoke('get-all-videos'),

  // Video pairing
  pairVideos: (video1Id: string, video2Id: string) =>
    ipcRenderer.invoke('pair-videos', video1Id, video2Id),
  unpairVideos: (pairId: string) =>
    ipcRenderer.invoke('unpair-videos', pairId),

  // Video processing
  processMedia: (videoIds: string[]) =>
    ipcRenderer.invoke('process-media', videoIds),

  // Event listeners
  onVideosUpdated: (callback: FunctionConstructor) =>
    ipcRenderer.on('videos-updated', (_event, data) => callback(data)),
  onMediaProcessed: (callback: FunctionConstructor) =>
    ipcRenderer.on('media-processed', (_event, data) => callback(data)),
  // Remove event listeners
  removeAllListeners: (channel: string) =>
    ipcRenderer.removeAllListeners(channel)
});
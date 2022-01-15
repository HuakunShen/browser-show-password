chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason == 'install') {
    chrome.storage.sync.set({ mode: 'Mouse Over', autoMode: false, copyOnDoubleClick: false });
  } else if (details.reason == 'update') {
    chrome.storage.sync.get(['autoMode', 'mode'], ({ autoMode, mode }) => {
      if (autoMode == undefined || mode == undefined) {
        // init
        chrome.storage.sync.set({ mode: 'Mouse Over', autoMode: false });
      }
    });
  }
});

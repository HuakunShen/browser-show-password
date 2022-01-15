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

chrome.runtime.onMessage.addListener((req, sender, sendRes) => {
  const { cmd, title, message, type } = req;
  if (cmd === 'notification') {
    chrome.notifications.create({ title, message, type, iconUrl: 'icons/logo.png' }, (res) => {
      console.log(res);
    });
  }
});

const sendCmd = (cmd) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { cmd });
  });
};

chrome.commands.onCommand.addListener((command) => {
  if (command === 'toggle-password') {
    sendCmd('Toggle Display Password');
  }
});

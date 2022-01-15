const init = () => {
  const inputEles = document.querySelectorAll("input[type='password']:not([origtype='password']");
  inputEles.forEach((ele) => {
    ele.setAttribute('origtype', ele.getAttribute('type'));
  });
};

const showTextOnHover = (event) => {
  event.target.click();
  event.target.setAttribute('type', 'text');
};
const showPasswordOnMouseOut = (event) => event.target.setAttribute('type', 'password');

const revealOnMouseOver = () => {
  const passwordInputs = document.querySelectorAll("input[origtype='password']");
  passwordInputs.forEach((ele) => {
    ele.addEventListener('mouseover', showTextOnHover);
    ele.addEventListener('mouseout', showPasswordOnMouseOut);
  });
};

const undoRevealOnHover = () => {
  const passwordInputs = document.querySelectorAll("input[origtype='password']");
  passwordInputs.forEach((ele) => {
    ele.removeEventListener('mouseover', showTextOnHover);
    ele.removeEventListener('mouseout', showPasswordOnMouseOut);
  });
};

const showAllPassword = () => {
  const passwordInputs = document.querySelectorAll("input[origtype='password']");
  passwordInputs.forEach((ele) => {
    ele.setAttribute('type', 'text');
  });
};

const hideAllPassword = () => {
  const passwordInputs = document.querySelectorAll("input[origtype='password']");
  passwordInputs.forEach((ele) => {
    ele.setAttribute('type', 'password');
  });
};

const doubleClickHandler = (event) => {
  const content = event.target.value;
  navigator.clipboard.writeText(content);
  console.log('Copy to Clipboard');
  chrome.runtime.sendMessage({
    cmd: 'notification',
    title: 'Password Peeper',
    message: 'Password Copied to Your Clipboard',
    type: 'basic',
  });
};

const addCopyOnDoubleClick = () => {
  const passwordInputs = document.querySelectorAll("input[origtype='password']");
  passwordInputs.forEach((ele) => {
    ele.addEventListener('dblclick', doubleClickHandler);
  });
};

const removeCopyOnDoubleClick = () => {
  const passwordInputs = document.querySelectorAll("input[origtype='password']");
  passwordInputs.forEach((ele) => {
    ele.removeEventListener('dblclick', doubleClickHandler);
  });
};

const handleRequest = (cmd) => {
  init();
  switch (cmd) {
    case 'Mouse Over':
      revealOnMouseOver();
      break;
    case 'undoRevealOnHover':
      undoRevealOnHover();
      break;
    case 'Display Directly':
      console.log('Display Directly');
      undoRevealOnHover();
      showAllPassword();
      break;
    case 'Hide Password':
      hideAllPassword();
      break;
    case 'Disable':
      undoRevealOnHover();
      hideAllPassword();
      break;
    case 'copyOnDoubleClick':
      addCopyOnDoubleClick();
      break;
    case 'disableCopyOnDoubleClick':
      removeCopyOnDoubleClick();
      break;
  }
};

chrome.storage.sync.get(
  ['mode', 'autoMode', 'copyOnDoubleClick'],
  ({ mode, autoMode, copyOnDoubleClick }) => {
    if (autoMode) handleRequest(mode);
    if (copyOnDoubleClick) handleRequest('copyOnDoubleClick');
  }
);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  handleRequest(request.cmd);
});

// setTimeout(() => {
//   const btn = document.createElement('button');
//   btn.style.position = 'fixed';
//   btn.innerText = 'Copied to Clipboard';
//   document.body.appendChild(btn);
// }, 2000);

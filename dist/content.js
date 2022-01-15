const init = () => {
  const inputEles = document.querySelectorAll("input[type='password']:not([origtype='password']");
  inputEles.forEach((ele) => {
    ele.setAttribute('origtype', ele.getAttribute('type'));
  });
};

const showTextOnHover = (event) => event.target.setAttribute('type', 'text');
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

const handleRequest = (cmd) => {
  switch (cmd) {
    case 'Mouse Over':
      init();
      revealOnMouseOver();
      break;
    case 'undoRevealOnHover':
      init();
      undoRevealOnHover();
      break;
    case 'Display Directly':
      console.log('Display Directly');
      init();
      undoRevealOnHover();
      showAllPassword();
      break;
    case 'Hide Password':
      init();
      hideAllPassword();
      break;
    case 'Disable':
      console.log('Disable');
      undoRevealOnHover();
      hideAllPassword();
      break;
  }
};

chrome.storage.sync.get(['mode', 'autoMode'], ({ mode, autoMode }) => {
  if (autoMode) {
    handleRequest(mode);
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  handleRequest(request.cmd);
});

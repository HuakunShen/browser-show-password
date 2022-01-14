const init = () => {
  const inputEles = document.querySelectorAll("input[type='password']:not([origtype='password']");
  inputEles.forEach((ele) => {
    ele.setAttribute('origtype', ele.getAttribute('type'));
  });

  const inputEles = document.querySelectorAll("input[type='password']");
  inputEles.forEach((ele) => {
    ele.setAttribute('origtype', ele.getAttribute('type'));
  });
};

const showTextOnHover = (event) => event.target.setAttribute('type', 'text');
const showPasswordOnMouseOut = (event) => event.target.setAttribute('type', 'password');

const revealOnHover = () => {
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

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.cmd) {
    case 'revealOnHover':
      init();
      revealOnHover();
      break;
    case 'undoRevealOnHover':
      init();
      undoRevealOnHover();
      break;
    case 'showAllPassword':
      init();
      showAllPassword();
      break;
  }
});

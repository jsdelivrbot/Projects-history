const Popup = function () {
  this.elements = [];
  this.statistic = [];
  this.element = '';
  this.isEditMode = false;
};

Popup.prototype.createPopup = function createPopup() {
  var container = document.createElement('div');
  container.classList.add('popuptext');
  container.style.display = 'none';
  container.id = 'myPopup';

  var firstInputContainer = document.createElement('div');
  var firstInput = document.createElement('input');
  firstInput.title = 'text-input';
  firstInput.id = 'popup-first-input';
  firstInput.value = 'new button';
  firstInputContainer.appendChild(firstInput);
  container.appendChild(firstInputContainer);

  var secondInputContainer = document.createElement('div');
  var secondInput = document.createElement('input');
  secondInput.title = 'time-input';
  secondInput.id = 'popup-second-input';
  secondInput.value = '0';
  secondInputContainer.appendChild(secondInput);
  container.appendChild(secondInputContainer);

  var buttonsContainer = document.createElement('div');
  var okButton = document.createElement('button');
  okButton.onclick = this.submitPopup.bind(this);
  okButton.name = 'popup-ok';
  okButton.innerText = 'Ok';
  buttonsContainer.appendChild(okButton);

  var cancelButton = document.createElement('button');
  cancelButton.onclick = this.cancelPopup.bind(this);
  cancelButton.name = 'popup-cancel';
  cancelButton.innerText = 'Cancel';
  buttonsContainer.appendChild(cancelButton);

  var editButton = document.createElement('button');
  editButton.name = 'smart-bar__edit';
  editButton.classList.add('smart-bar__edit');
  editButton.innerHTML = 'Edit off';

  container.appendChild(buttonsContainer);

  document.body.appendChild(container);
  document.body.appendChild(editButton);
};

Popup.injectStyles = function injectStyles() {
  var styles = document.createElement('style');
  styles.innerHTML = '.popuptext{width:auto;display:inline-block;cursor:pointer;'
    + 'background-color:#555;color:#fff;text-align:center;border-radius:6px;'
    + 'padding:15px;position:absolute;z-index:1111111}.popuptext::after{'
    + 'content:"";position:absolute;top:100%;left:50%;margin-left:-5px;'
    + 'border-width:5px;border-style:solid;border-color:#555 transparent transparent}'
    + '.popuptext input{color: black;}.popuptext button {color: black;}'
    + '.smart-bar__edit{position:fixed;bottom:10%;left:20px;width:70px;'
    + 'height:70px;border:none;background-color:#58a7d4;color:white;'
    + 'border-radius:50px;outline:none;'
    + 'box-shadow:0px 7px 11px -1px rgba(45,87,110,0.7)}'
    + '.smart-bar__edit:active,.smart-bar__edit:focus{outline:none;}'
    + '.smart-bar__edit_on{background-color:#59d45d}';

  document.body.appendChild(styles);
};

Popup.prototype.checkForUpdates = function checkForUpdates() {
  popup.elements.map(function (element) {
    if (element.text) {
      let childID = document.getElementById(element.id);
      if (Date.now() >= element.time) {
        childID.innerHTML = element.text;
        childID.value = element.text;
      }
    }
  });
};

Popup.prototype.onClicker = function onClicker(e) {
  let target = e.target.id;
  let result = popup.statistic.filter(function (element) {
    return element.id === target;
  });
  if(result[0]) {
    result[0].clicks++;
  }
};

Popup.prototype.onMouser = function onMouser(e) {
  let result = popup.statistic.filter(function (element) {
    return element.id === e.target.id;
  });
  if(result[0]) {
    result[0].overs++;
  }
};

Popup.prototype.check = function check(e) {
  if (e.target.classList.contains('smart-bar__edit') || !this.isEditMode){
    return;
  }

  e.preventDefault();
  e.stopPropagation();

  let input = e.target.id;
  if (!input) {
    // e.preventDefault();
    // e.stopPropagation();
    input = e.target.value && e.target.value.length ? e.target.value : e.target.innerHTML;
    e.target.id = input;
  }
  let check = popup.statistic.filter(function (element) {
    return element.id === input;
  });
  let pushCondition = check[0] === undefined &&
      input !== 'Cancel' &&
      input !== 'edit-mode' &&
      input !== 'Ok' &&
      input !== 'popup-first-input' &&
      input !== 'popup-second-input' &&
      input !== 'statistic-button' &&
      input !== 'myPopup' &&
      input !== 'popup-cancel' &&
      input !== 'popup-ok' &&
      input !== 'popup-textarea' &&
      input !== 'EDIT' &&
      input !== 'SAVE';

  if (pushCondition) {
    let elementForPush = {
      id: input
    };
    popup.elements.push(elementForPush);
    let elem = document.getElementById(input);
    if (elem) {

      elem.addEventListener('click', popup.onClicker);
      elem.addEventListener('mouseover', popup.onMouser);
      elem.addEventListener('click', this.showPopup.bind(this));
      elem.style.opacity = '0.7';

      let elementForStatistic = {
        id: elem.id,
        clicks: 0,
        overs: 0
      };

      popup.statistic.push(elementForStatistic);

      popup.showPopup(e);
    }
  }
};

Popup.prototype.addShowStatisticEvent = function addShowStatisticEvent () {
    let showStatistic = document.getElementById('statistic-button');
    // showStatistic.addEventListener('click', popup.showStatistic);
};

Popup.prototype.showStatistic = function showStatistic () {
  console.log('Statistic: ');
    popup.statistic.map(function (div) {
        console.log('Statistic for %s, clicks: %s, overs: %s ', div.id, div.clicks, div.overs);
    });
};

Popup.prototype.onSave = function onSave() {
  document.body.addEventListener('click', popup.check);
};

Popup.prototype.showPopup = function showPopup(e) {
  if (e.target.classList.contains('smart-bar__edit') || !this.isEditMode){
    return;
  }

  popup.element = e.target.id;
  popup.element = e.target;
  let myPopup = document.getElementById('myPopup');

  if (myPopup.style.display === 'none') {
    myPopup.style.position = 'absolute';
    myPopup.style.display = 'block';
    let Xcoord = e.pageX - 100 + 'px';
    let Ycoord = e.pageY - 180 + 'px';

    if (e.target.tagName === 'INPUT') {
      myPopup.querySelector('#popup-first-input').value = e.target.value;
    } else {
      myPopup.querySelector('#popup-first-input').value = e.target.text || e.target.innerHTML;
    }

    myPopup.style.top = Ycoord;
    myPopup.style.left = Xcoord;
  }
};

Popup.prototype.submitPopup = function submitPopup() {

  let text = document.getElementById('popup-first-input').value;
  let time = document.getElementById('popup-second-input').value;

  let target = popup.element;

  let elementsFilter = popup.elements.filter(function (element) {
    return element.id === target.id;
  });

  let reformatTime = 0;
  if (time) {
    reformatTime = Date.now() + time * 1000;
  }
  else {
    reformatTime = Date.now();
  }

  elementsFilter[0].text = text;
  elementsFilter[0].time = reformatTime;

  let popup1 = document.getElementById('myPopup');
  popup1.style.display = 'none';
};

Popup.prototype.cancelPopup = function cancelPopup() {
  let popup1 = document.getElementById('myPopup');
  popup1.style.display = 'none';
};

Popup.prototype.editModeOn = function editModeOn() {
  this.isEditMode = true;
  document.querySelector('[name="smart-bar__edit"]').innerHTML = 'Edit on';
  document.querySelector('[name="smart-bar__edit"]').classList.add('smart-bar__edit_on');

  document.addEventListener('click', handler, true);
  document.addEventListener('submit', handler, true);
};

Popup.prototype.editModeOff = function editModeOff() {
  this.isEditMode = false;
  document.querySelector('[name="smart-bar__edit"]').innerHTML = 'Edit off';
  document.querySelector('[name="smart-bar__edit"]').classList.remove('smart-bar__edit_on');

  document.removeEventListener('click', handler, true);
  document.removeEventListener('submit', handler, true);
};

Popup.prototype.handleEditModeClick = function handleEditModeClick() {
  if (this.isEditMode) {
    this.editModeOff();
  } else {
    this.editModeOn();
  }
};

Popup.prototype.setEditModeHandler = function setEditModeHandler() {
  document.body.addEventListener('click', this.check.bind(this));
  document.querySelector('[name="smart-bar__edit"]').onclick = this.handleEditModeClick.bind(this);
};

window.Popup = Popup;
Popup.injectStyles();
let popup = new Popup();
popup.createPopup();
popup.addShowStatisticEvent();
popup.setEditModeHandler();
// popup.onSave();

function handler(e) {
  if (
    e.target.id === 'popup-first-input'
    || e.target.id === 'popup-second-input'
  ) {
    return;
  }

  if (
    e.target.tagName === 'A'
    || e.target.tagName === 'INPUT'
    || e.target.parentNode.tagName === 'A'
    || e.target.tagName === 'BUTTON'
    && e.target.name !== 'popup-ok'
    && e.target.name !== 'popup-cancel'
    && !e.target.classList.contains('smart-bar__edit')
  ) {
    e.preventDefault();
    e.stopPropagation();
    popup.check(e);
    popup.showPopup(e);
    return false;
  }
}

setInterval(() => {
  popup.checkForUpdates();
}, 500);

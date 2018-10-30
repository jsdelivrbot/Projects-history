var smartbar = (function() {
  function SmartBar() {
    this.elements = [];
    this.statistics = [];
    this.editMode = false;
    this.popup = null;
    this.experimentId = null;
  }

  SmartBar.apiUrl = {
    create: '//localhost:3000/experiment/create',
    fetch: '//localhost:3000/experiment/getAll',
  };

  SmartBar.prototype.selectElement = function selectElement(event) {
    if (!this.editMode) return;

    var elementClass = event.target.className;
    if (elementClass.includes('sb-popup') || elementClass.includes('sb-button')) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    var id = '';
    var selected = event.target;

    if (selected.id) {
      id = selected.id;
    } else {
      selected.id = selected.text || selected.innerHTML;
      id = selected.id;
    }

    var initialContent = '';
    var elementIndex = this.elements.findIndex(function (item) {
      return item.id === id;
    });

    if (elementIndex === -1) {
      initialContent = selected.text || selected.innerHTML;
      this.popup.querySelector('.sb-popup__content').value = initialContent;
    } else {
      initialContent = this.elements[elementIndex].initialValue;
      this.popup.querySelector('.sb-popup__content').value = this.elements[elementIndex].newValue;
    }

    this.popup.querySelector('.sb-popup__save').onclick = (function () {
      this.savePopup(selected, id, initialContent);
    }).bind(this);

    this.showPopup(event);
  };

  SmartBar.prototype.savePopup = function savePopup(selectedElement, id, initialContent) {
    var newContent = this.popup.querySelector('[name="sb-popup__content"]').value;

    var elementIndex = this.elements.findIndex(function (item) {
      return item.id === id;
    });

    if (elementIndex === -1) {
      this.elements.push({
        id: id,
        initialValue: initialContent,
        newValue: newContent,
      });
    } else {
      this.elements[elementIndex].newValue = newContent;
    }

    if (selectedElement.text) {
      selectedElement.text = newContent;
    } else if (selectedElement.innerHTML) {
      selectedElement.innerHTML = newContent;
    }

    this.hidePopup();
  };

  SmartBar.prototype.cancelPopup = function cancelPopup() {
    this.hidePopup();
  };

  SmartBar.prototype.showPopup = function showPopup(event) {
    this.popup.style.display = 'block';

    var popupTop = event.pageY - 175;
    var popupLeft = event.pageX;

    if ((event.pageX + this.popup.offsetWidth) > window.innerWidth) {
      this.popup.classList.remove('sb-popup--l');
      this.popup.classList.add('sb-popup--r');
      popupLeft -= this.popup.offsetWidth - 5;
    } else {
      this.popup.classList.remove('sb-popup--r');
      this.popup.classList.add('sb-popup--l');
      popupLeft -= 45;
    }

    if ((event.clientY - this.popup.offsetHeight) < 0) {
      this.popup.classList.add('sb-popup--t');
      this.popup.classList.remove('sb-popup--b');
      popupTop += 165;
    } else {
      this.popup.classList.add('sb-popup--b');
      this.popup.classList.remove('sb-popup--t');
      popupTop -= 15;
    }

    this.popup.style.top = popupTop + 'px';
    this.popup.style.left = popupLeft + 'px';
  };

  SmartBar.prototype.hidePopup = function hidePopup() {
    this.popup.style.display = 'none';
  };

  SmartBar.prototype.handleEditModeClick = function handleEditModeClick() {
    if (this.editMode) {
      this.editModeOff();
    } else {
      this.editModeOn();
    }
  };

  SmartBar.prototype.editModeOn = function editModeOn() {
    this.editMode = true;
    document.querySelector('#sb-button').innerHTML = 'Edit on';
    document.querySelector('#sb-button').classList.add('sb-button_on');
  };

  SmartBar.prototype.editModeOff = function editModeOff() {
    this.editMode = false;
    document.querySelector('#sb-button').innerHTML = 'Edit off';
    document.querySelector('#sb-button').classList.remove('sb-button_on');
  };

  SmartBar.fetchExperiment = function fetchExperiment() {
    var experimentId = 'exp1';
    var path = '/my/page';

    var request = new XMLHttpRequest();
    request.open('POST', this.apiUrl.fetch, true);
    request.setRequestHeader('Content-Type', 'application/json');

    request.onload = function() {
      console.log(this.response);
    };

    var requestBody = {
      experimentId: experimentId,
      path: path,
    };

    request.send(JSON.stringify(requestBody));
  };

  SmartBar.prototype.createElementRequest = function createElementRequest(element) {
    // var experimentId = window.location.hostname; // for a while
    // var path = window.location.pathname;
  };

  SmartBar.prototype.createEditModeButton = function createEditModeButton() {
    var editButton = document.createElement('div');
    editButton.id = 'sb-button';
    editButton.classList.add('sb-button');
    editButton.innerHTML = 'Edit off';
    editButton.addEventListener('click', this.handleEditModeClick.bind(this));

    document.body.appendChild(editButton);
  };

  SmartBar.prototype.createPopup = function createPopup() {
    var container = document.createElement('div');
    container.classList.add('sb-popup');

    var contentInput = document.createElement('textarea');
    contentInput.classList.add('sb-popup__content');
    contentInput.name = 'sb-popup__content';
    contentInput.onkeydown = this.handleContentKeyDown.bind(this);

    var saveButton = document.createElement('div');
    saveButton.classList.add('sb-popup__save');
    saveButton.innerHTML = 'Save';
    // saveButton.addEventListener('click', this.savePopup.bind(this));

    var cancelButton = document.createElement('div');
    cancelButton.classList.add('sb-popup__cancel');
    cancelButton.innerHTML = 'Cancel';
    cancelButton.addEventListener('click', this.cancelPopup.bind(this));

    container.appendChild(contentInput);
    container.appendChild(saveButton);
    container.appendChild(cancelButton);

    this.popup = container;

    document.body.appendChild(this.popup);
  };

  SmartBar.prototype.handleContentKeyDown = function handleContentKeyDown(e) {
    setTimeout(function () {
      if (e.which === 13) {
        var value = e.target.value.split('');
        var offset = e.target.selectionStart;
        var br = '</br>\n';

        value.splice(offset - 1, 1, br);
        e.target.value = value.join('');

        var newOffset = offset + br.length - 1;
        e.target.selectionStart = newOffset;
        e.target.selectionEnd = newOffset;
      }
    }, 0);
  };

  SmartBar.injectStyles = function injectStyles() {
    var styles = document.createElement('style');

    styles.innerHTML =
      '.sb-popup--r:after,.sb-popup--rt:after{right:10px}.sb-popup{z-index:214748364;margin:20px;\
      display:none;position:absolute;top:0;left:0;width:300px;padding:10px;\
      background-color:#58a7d4;border-radius:5px;\
      box-shadow:0 7px 11px -1px rgba(45,87,110,.7)}.sb-popup:after{\
      display:block;position:absolute;content:\'\';border:15px solid #58a7d4}\
      .sb-popup--l:after{left:10px}.sb-popup--b:after{top:99%;\
      border-color:#58a7d4 transparent transparent}.sb-popup--rt:after,\
      .sb-popup--t:after{top:-25px;border-color:transparent transparent #58a7d4}\
      .sb-popup__content{font-size:0.9rem;margin:0;padding:10px;display:block;min-width:280px;\
      min-height:100px;max-height:100px;border:none;font-family:sans-serif}\
      .sb-popup__cancel:focus,.sb-popup__content:focus,.sb-popup__save:focus{\
      outline:0}.sb-popup__cancel,.sb-popup__save{text-align:center;color:#222;\
      display:inline-block;padding:5px 15px;font-size:0.9rem;\
      margin-top:10px;margin-right:10px;background-color:#fff;border:none;\
      border-radius:2px;cursor:pointer}.sb-popup__cancel:hover,.sb-popup__save:hover\
      {background-color:#eee}.sb-popup__cancel:active,.sb-popup__save:active{\
      background-color:#ccc} \
      \
      .sb-button{font-size:0.9rem;display:flex;justify-content: center;align-items: center;\
      cursor:pointer;text-align:center;padding:0;margin:0;\
      position:fixed;bottom:10%;left:20px;width:70px; \
      height:70px;border:none;background-color:#58a7d4;color:white; \
      border-radius:50px;outline:none;box-shadow:0px 7px 11px -1px rgba(45,87,110,0.7)} \
      .sb-button:active,.sb-button:focus{outline:none;} \
      .sb-button_on{background-color:#59d45d}';

    document.body.appendChild(styles);
  };

  SmartBar.prototype.setBodyClickHandler = function setBodyClickHandler() {
    document.body.addEventListener('click', this.selectElement.bind(this));
  };

  return {
    init: function initSmartBar(domain, path) {
      this.domain = domain;
      this.path = path;

      SmartBar.fetchExperiment();
      SmartBar.injectStyles();

      var smartBar = new SmartBar();
      smartBar.createEditModeButton();
      smartBar.createPopup();
      smartBar.setBodyClickHandler();
    },
  };
}());

window.smartbar = smartbar;

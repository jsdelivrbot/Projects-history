function Notes() {
  this.notes = [];

  this.editButton = qs('#edit-mode');
  this.okButton = qs('#ok-mode');
  this.okButton.style.display = 'none';
  this.isEditMode = false;
  this.documentClickAdded = false;

  this.noteHalfWidth = 120;
  this.arrowHeight = 20;
}

Notes.prototype.init = function notesInit() {
  this.addEditModeEvent();
  this.addOkModeEvent();
  document.addEventListener('click', this.addNoteHandler.bind(this));
};

Notes.prototype.addEditModeEvent = function addEditModeEvent() {
  var self = this;

  this.editButton.onclick = function editButtonClick() {
    self.editButton.style.display = 'none';
    self.okButton.style.display = 'block';
    self.isEditMode = true;
    qs('.wrapper').style.pointerEvents = 'none';

    qsAll('.note:not(#note-template)').forEach(function (note) {
      note.style.display = 'block';
    });
  };
};

Notes.prototype.addOkModeEvent = function addOkModeEvent() {
  var self = this;

  this.okButton.onclick = function okButtonClick() {
    self.okButton.style.display = 'none';
    self.editButton.style.display = 'block';
    self.isEditMode = false;
    qs('.wrapper').style.pointerEvents = 'auto';

    qsAll('.note:not(#note-template)').forEach(function (note) {
      note.style.display = 'none';
    });
  };
};

Notes.prototype.editNoteHandler = function editNoteHandler(event) {
  var id = parseInt(event.target.parentNode.dataset.id, 10);

  var noteIndex = this.notes.findIndex(function (note) {
    return note.id === id;
  });

  if (noteIndex === -1) {
    return;
  }

  this.notes[noteIndex].text = event.target.innerHTML;
};

Notes.prototype.deleteNoteHandler = function deleteNoteHandler(event) {
  var id = parseInt(event.target.parentNode.dataset.id, 10);

  var noteIndex = this.notes.findIndex(function (note) {
    return note.id === id;
  });

  if (noteIndex === -1) {
    return;
  }

  this.notes.splice(noteIndex, 1);

  qs('body').removeChild(event.target.parentNode);
};

Notes.prototype.focusHandler = function focusHandler(event) {
  var maxZIndex = this.notes.reduce(function (max, note) {
    return note.zIndex > max ? note.zIndex : max;
  }, 0);

  var id = parseInt(event.target.parentNode.dataset.id, 10);

  var noteIndex = this.notes.findIndex(function (note) {
    return note.id === id;
  });

  if (noteIndex === -1) {
    return;
  }

  this.notes[noteIndex].zIndex = maxZIndex + 1;
  event.target.parentNode.style.zIndex = '9999' + maxZIndex + 1;
};

Notes.prototype.addNoteHandler = function addNoteHandler(event) {
  if (!this.isEditMode) {
    return;
  }

  if (event.target.classList.contains('not-for-notes')) {
    return;
  }

  var x = event.pageX - this.noteHalfWidth;
  var y = event.pageY + this.arrowHeight;

  this.addNote(x, y);
};

Notes.prototype.addNote = function addNote(x, y) {
  var maxNoteId = this.notes.reduce(function (max, note) {
    return note.id > max ? note.id : max;
  }, 0);

  var maxZIndex = this.notes.reduce(function (max, note) {
    return note.zIndex > max ? note.zIndex : max;
  }, 0);

  var note = new Note(maxNoteId + 1, x, y);
  note.zIndex = maxZIndex + 1;

  this.notes.push(note);

  var newNoteNode = qs('#note-template').cloneNode(true);
  newNoteNode.style.left = note.x + 'px';
  newNoteNode.style.top = note.y + 'px';
  newNoteNode.id = 'note-' + note.id;
  newNoteNode.dataset.id = note.id;
  newNoteNode.style.display = 'block';

  var textNode = newNoteNode.querySelector('.note__text');
  textNode.addEventListener('focus', this.focusHandler.bind(this));
  textNode.addEventListener('keyup', this.editNoteHandler.bind(this));

  var closeNode = newNoteNode.querySelector('.note__close');
  closeNode.addEventListener('click', this.deleteNoteHandler.bind(this));

  qs('body').appendChild(newNoteNode);
};

function Note(id, x, y, text) {
  this.id = id || null;
  this.x = x || null;
  this.y = y || null;
  this.text = text || '';
  this.zIndex = 9999;
}

function qs(selector) {
  return document.querySelector(selector);
}

function qsAll(selector) {
  return document.querySelectorAll(selector);
}

var notes = new Notes();
notes.init();

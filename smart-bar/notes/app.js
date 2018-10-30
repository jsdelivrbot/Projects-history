const Popup = function () {
    this.elements = [];
    this.statistic = [];
    this.element = "";
    this.isEditing = false;
    this.notesArray = [];
    this.oldInput = '';
};

Popup.prototype.check = function check (e) {
    let input = e.target.id;
    if (!input) {
        input = e.target.value ? e.target.value : e.target.innerHTML;
        e.target.id = input;
    }
    let check = popup.elements.filter(function( element ) {
        return  element.id === input;
    });
    let elementsContainer = document.body;

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
        input !== 'notes-show' &&
        input !== 'show-notes-button' &&
        input !== 'notes' &&
        e.target !== elementsContainer;
    if(pushCondition) {
            let elementForPush = {
                id: input
            };
            popup.elements.push(elementForPush);
            let elem = document.getElementById(input);
            if (elem) {
            elem.addEventListener("click", popup.showPopup);
            elem.style.opacity = "0.7";
        }
    }

};

Popup.prototype.onSave = function onSave () {

    let editButton = document.getElementById("edit-mode");
    let okButton = document.getElementById("ok-mode");
    let elementsContainer = document.body;

    if (okButton.style.display === 'none') {
        okButton.style.display = 'inline-block';
        editButton.style.display = 'none';
        elementsContainer.addEventListener ("click", popup.check);
        popup.isEditing = true;
    }
    else {
        okButton.style.display = 'none';
        editButton.style.display = 'inline-block';
        elementsContainer.removeEventListener ("click", popup.check);
            popup.elements.map(function(element) {

                    let doc = document.getElementById(element.id);
                    if (doc) {
                    doc.style.opacity = 1;
                }
            });
        popup.isEditing = false;
    }
};

Popup.prototype.showPopup = function showPopup (e) {

    popup.element = e.target;

    let myPopup = document.getElementById("myPopup");
    let firstInput = document.getElementById("popup-textarea");

    let result = popup.elements.filter(function( element ) {
        return  element.id === popup.element.id;
    });

    if (result && result[0].text) {
        firstInput.value = result[0].text;
    }
     else {
        firstInput.value = e.target.value || e.target.innerHTML;
    }

    if (popup.isEditing) {
        myPopup.style.display = 'block';
        let Xcoord = e.pageX-100+'px';
        let Ycoord = e.pageY-120+'px';
        myPopup.style.top = Ycoord;
        myPopup.style.left = Xcoord;
    }

};

Popup.prototype.submitPopup = function submitPopup () {

    let text = document.getElementById('popup-textarea').value;
    let target = popup.element;

    let elementsFilter = popup.elements.filter(function( element ){
        return  element.id === target.id;
    });

    elementsFilter[0].text = text;

    let popup1 = document.getElementById("myPopup");
        popup1.style.display = 'none';
};

Popup.prototype.cancelPopup = function cancelPopup () {

    let popup1 = document.getElementById("myPopup");
        popup1.style.display = 'none';
};

Popup.prototype.showNotes = function showNotes () {

    let notesInput = document.getElementById('notes');
    popup.elements.map( function (element) {

        if(!popup.notesArray.includes(element.text) && element.text)
        {
        popup.notesArray.push(element.text);
        let newDiv = document.createElement('div');
        newDiv.id = 'div-'+ element.text;

        let newParagraph = document.createElement('p');
        newParagraph.id = 'note-'+ element.text;
        newParagraph.innerHTML = element.text;
        newParagraph.style.display = 'inline-block';

        let newInput = document.createElement('input');
        newInput.id = 'input-'+ element.text;
        newInput.value = element.text;
        newInput.style.display = 'none';
        notesInput.appendChild(newDiv);

        let editBtn = document.createElement('button');
        editBtn.id='btn-edit-'+element.text;
        editBtn.onclick = popup.handleEdit;
        editBtn.innerHTML = 'edit';

        let saveBtn = document.createElement('button');
        saveBtn.id='btn-save-'+element.text;
        saveBtn.onclick = popup.handleSave;
        saveBtn.style.display = 'none';
        saveBtn.innerHTML = 'save';
            newDiv.appendChild(newParagraph);
            newDiv.appendChild(newInput);
            newDiv.appendChild(editBtn);
            newDiv.appendChild(saveBtn);
        }
    });

};

Popup.prototype.handleEdit = function handleEdit (e) {
    let id = e.target.id.slice(9);
    let newParagraph = document.getElementById('note-'+id);
    let newInput = document.getElementById('input-'+id);
    let saveBtn = document.getElementById('btn-save-'+id);
    let editBtn = document.getElementById('btn-edit-'+id);
    newInput.style.display = 'inline-block';
    newParagraph.style.display = 'none';
    saveBtn.style.display = 'inline-block';
    editBtn.style.display = 'none';
    popup.oldInput = newInput.value;

};

Popup.prototype.handleSave = function handleEdit (e) {
    let id = e.target.id.slice(9);
    let indexToChangeNote = popup.notesArray.indexOf(popup.oldInput);
    let result = popup.elements.filter( function (element) {
        return element.text === popup.oldInput;
    });
    let indexToChangeElements = popup.elements.indexOf(result[0]);
    let newParagraph = document.getElementById('note-'+id);
    let newInput = document.getElementById('input-'+id);
    let saveBtn = document.getElementById('btn-save-'+id);
    let editBtn = document.getElementById('btn-edit-'+id);
    newParagraph.style.display = 'inline-block';
    newInput.style.display = 'none';
    editBtn.style.display = 'inline-block';
    saveBtn.style.display = 'none';
    popup.notesArray[indexToChangeNote] = newInput.value;
    popup.elements[indexToChangeElements].text = newInput.value;
    newParagraph.innerHTML = newInput.value;
};

window.Popup = Popup;
let popup = new Popup();

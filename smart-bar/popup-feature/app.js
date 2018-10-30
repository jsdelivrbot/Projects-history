const Popup = function () {
    this.elements = [];
    this.statistic = [];
    this.element = "";
};

Popup.prototype.checkForUpdates = function checkForUpdates () {
    popup.elements.map(function(element){
        if(element.text) {
            let childID = document.getElementById(element.id);
                if(Date.now() >= element.time  ){
                childID.innerHTML = element.text;
                childID.value = element.text;
            }
        }
    });
};

Popup.prototype.onClicker = function onClicker (e) {
    let target = e.target.id;
    let result = popup.statistic.filter(function( element ){
        return  element.id === target;
    });
    result[0].clicks++;
};

Popup.prototype.onMouser = function onMouser (e) {
    let result = popup.statistic.filter(function( element ) {
        return  element.id === e.target.id;
    });
    result[0].overs++;
};

Popup.prototype.check = function check (e) {
    let input = e.target.id;
    if (!input) {
        input = e.target.value ? e.target.value : e.target.innerHTML;
        e.target.id = input;
    }
    let check = popup.statistic.filter(function( element ){
        return  element.id === input;
    });
    let pushCondition = check[0] === undefined &&
                        input !== 'Cancel' &&
                        input !== 'edit-mode' &&
                        input !== 'Ok' &&
                        input !== 'popup-first-input' &&
                        input !== 'popup-second-input' &&
                        input !== 'statistic-button' &&
                        input !== 'myPopup';
    if(pushCondition) {
            let elementForPush = {
                id: input
            };
            popup.elements.push(elementForPush);
            let elem = document.getElementById(input);
            if (elem) {

            elem.addEventListener("click", popup.onClicker);
            elem.addEventListener("mouseover", popup.onMouser);
            elem.addEventListener("click", popup.showPopup);
            elem.style.opacity = "0.7";

                let elementForStatistic = {
                    id: elem.id,
                    clicks: 0,
                    overs: 0
                };

            popup.statistic.push(elementForStatistic);
        }
    }
};

Popup.prototype.addShowStatisticEvent = function addShowStatisticEvent () {
    let showStatistic = document.getElementById('statistic-button');
    showStatistic.addEventListener("click", popup.showStatistic);
};

Popup.prototype.showStatistic = function showStatistic () {
    console.log("Statistic: ");
    popup.statistic.map(function (div) {
        console.log("Statistic for %s, clicks: %s, overs: %s ", div.id, div.clicks, div.overs);
    });
};

Popup.prototype.onSave = function onSave () {

    let editButton = document.getElementById("edit-mode");
    let okButton = document.getElementById("ok-mode");
    let elementsContainer = document.body;

    if (okButton.style.display === 'none') {
        okButton.style.display = 'inline-block';
        editButton.style.display = 'none';
        elementsContainer.addEventListener ("click", popup.check);
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
    }
};

Popup.prototype.showPopup = function showPopup (e) {

    popup.element = e.target.id;
    popup.element = e.target;
    let myPopup = document.getElementById("myPopup");

    if (myPopup.style.display === 'none') {
        myPopup.style.display = 'block';
        let Xcoord = e.pageX-100+'px';
        let Ycoord = e.pageY-120+'px';
        myPopup.style.top = Ycoord;
        myPopup.style.left = Xcoord;
    }

};

Popup.prototype.submitPopup = function submitPopup () {

    let text = document.getElementById('popup-first-input').value;
    let time = document.getElementById('popup-second-input').value;

    let target = popup.element;

    let elementsFilter = popup.elements.filter(function( element ){
        return  element.id === target.id;
    });

    let reformatTime = 0;
    if(time){
        reformatTime = Date.now() + time*1000;}
    else{
        reformatTime = Date.now();
    }
    elementsFilter[0].text= text;
    elementsFilter[0].time= reformatTime;

    let popup1 = document.getElementById("myPopup");
        popup1.style.display = 'none';
};

Popup.prototype.cancelPopup = function cancelPopup () {

    let popup1 = document.getElementById("myPopup");
    popup1.style.display = 'none';
};

window.Popup = Popup;
let popup = new Popup();
popup.addShowStatisticEvent();

setInterval(() => {
    popup.checkForUpdates ();
}, 500);

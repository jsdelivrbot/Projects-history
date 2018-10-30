(function () {

        var SmartBar = function () {
            __self = this;
            this.editMode = false;
            this.storage = chrome.storage;
        };

        SmartBar.prototype.modeOn = function () {
            this.editMode = true;
            document.querySelector('#sb-button').innerHTML = 'Edit on';
            document.querySelector('#sb-button').classList.add('sb-button_on');
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {type: "active"}, function (response) {});
            });

        };

        SmartBar.prototype.modeOff = function () {
            this.editMode = false;
            document.querySelector('#sb-button').innerHTML = 'Edit off';
            document.querySelector('#sb-button').classList.remove('sb-button_on');
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {type: "nonactive"}, function (response) {});
            });


        };

        SmartBar.prototype.handleEditModeClick = function () {
            if(__self.editMode){
                __self.modeOff();
            }
            else __self.modeOn();
        };

        SmartBar.prototype.eventListner = function () {
            var button = document.querySelector('#sb-button');
            button.addEventListener('click',__self.handleEditModeClick);
        };

        SmartBar.prototype.checkStatus = function (storage) {
            storage.local.get('status', function (items) {

                if (items.status === 'On'){
                    __self.modeOn();
                }
                else if (items.status === 'Off'){
                    __self.modeOff();
                }
            })
        };

        SmartBar.prototype.init = function () {
            this.eventListner();
            this.checkStatus(this.storage);
        };

    window.sb = new SmartBar();
    window.sb.init();

})();


var form = document.querySelector('.auth>div>form');
var email = document.querySelector('input[id=email]');
var pass = document.querySelector('input[id=pass]');

form.onsubmit = function (e) {
    e.preventDefault();
    SignIn(email.value,pass.value);
};


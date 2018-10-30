"use strict";

var Experiments = function() {
    function Experiments(calcApiUrl) {
        this.calcApiUrl = calcApiUrl;
        this.experiments = {};
    }
    Experiments.prototype.loadScopes = function(scopes) {
        var _this = this;
        scopes.forEach(function(scope) {
            return _this.loadScope(scope);
        });
    };
    Experiments.prototype.loadScope = function(scope) {
        var url = this.calcApiUrl(scope);
        document.write('<script src="' + url + '"></script>');
    };
    Experiments.prototype.addJsonp = function(junk, experiments) {
        this.add(experiments);
    };
    Experiments.prototype.add = function(experiments) {
        var _this = this;
        Object.keys(experiments).forEach(function(key) {
            _this.experiments[key] = experiments[key];
        });
    };
    Experiments.prototype.get = function(key) {
        return this.experiments[key];
    };
    Experiments.prototype.enabled = function(key) {
        return this.experiments[key] === "true";
    };
    Experiments.prototype.all = function() {
        return this.experiments;
    };
    return Experiments;
}();

window.experiments = new Experiments(function(scope) {
    return "/_api/wix-laboratory-server/laboratory/conductAllInScope?scope=" + scope + "&accept=jsonp&callback=experiments.addJsonp";
});
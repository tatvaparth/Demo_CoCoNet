/// <reference path='../../_all.ts' />
var Demo;
(function (Demo) {
    'use strict';
    var AccountService = (function () {
        function AccountService(http, $q) {
            var _this = this;
            this.success = function (response) { return response.data; };
            this.fail = function (error) {
                var msg = error.data.description;
                var reason = 'query for people failed.';
                return _this.$q.reject(msg);
            };
            this._http = http;
            this.$q = $q;
        }
        AccountService.prototype.saveAccountInfo = function ($scope) {
            return this._http.post("/config/saveCustomizedWidget/" + JSON.parse(dashboardWidgetMaster.widgetFormat).widgetFormatId, dashboardWidgetMaster)
                .then(this.success)["catch"](this.fail);
        };
        return AccountService;
    }());
    AccountService.$inject = ["$http", "$q"];
    Demo.AccountService = AccountService;
    angular.module("Demo").service("accountService", AccountService);
})(Demo || (Demo = {}));

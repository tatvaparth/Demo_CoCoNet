/// <reference path='../../_all.ts' />
var Demo;
(function (Demo) {
    'use strict';
    var ConfigService = (function () {
        function ConfigService(http, $q) {
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
        ConfigService.prototype.GetWidgetList = function ($scope) {
            return this._http.get('getWidgetList')
                .then(this.success)
                .catch(this.fail);
        };
        ConfigService.prototype.GetWidgetFormatList = function ($scope) {
            return this._http.get('getWidgetFormatList')
                .then(this.success)
                .catch(this.fail);
        };
        ConfigService.prototype.getDefaultTemplat = function ($scope, widgetFormatId) {
            return this._http.post("/widgetFormat/getTemplate/", JSON.parse(widgetFormatId).widgetFormatId)
                .then(this.success)
                .catch(this.fail);
        };
        ConfigService.prototype.saveCustomizedWidget = function ($scope, dashboardWidgetMaster) {
            return this._http.post("/config/saveCustomizedWidget/" + JSON.parse(dashboardWidgetMaster.widgetFormat).widgetFormatId, dashboardWidgetMaster)
                .then(this.success)
                .catch(this.fail);
        };
        ConfigService.prototype.updateCustomizedWidget = function ($scope, dashboardWidgetMaster) {
            console.log(dashboardWidgetMaster);
            return this._http.post("/config/updateCustomizedWidget/" + dashboardWidgetMaster.widgetFormat.widgetFormatId, dashboardWidgetMaster)
                .then(this.success)
                .catch(this.fail);
        };
        ConfigService.prototype.getWidget = function ($scope, widgetId) {
            return this._http.post('/config/getWidget', widgetId)
                .then(this.success)
                .catch(this.fail);
        };
        ConfigService.prototype.deleteWidget = function ($scope, widgetId) {
            return this._http.post('/config/deleteWidget', widgetId)
                .then(this.success)
                .catch(this.fail);
        };
        ConfigService.$inject = ["$http", "$q"];
        return ConfigService;
    }());
    Demo.ConfigService = ConfigService;
    angular.module("Demo").service("configService", ConfigService);
})(Demo || (Demo = {}));

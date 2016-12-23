/// <reference path='../../_all.ts' />
var Demo;
(function (Demo) {
    'use strict';
    var DashboardService = (function () {
        function DashboardService(http, $q) {
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
        DashboardService.prototype.GetDashboardWidgets = function ($scope) {
            return this._http.get('/widget/dashboardWidgets')
                .then(this.success)
                .catch(this.fail);
        };
        DashboardService.$inject = ["$http", "$q"];
        return DashboardService;
    }());
    Demo.DashboardService = DashboardService;
    angular.module("Demo").service("dashboardService", DashboardService);
})(Demo || (Demo = {}));

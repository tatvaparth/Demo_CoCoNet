/// <reference path='../../_all.ts' />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Demo;
(function (Demo) {
    var DashboardController = (function (_super) {
        __extends(DashboardController, _super);
        /// Conctructor
        function DashboardController($scope, $location, dashboardService) {
            var _this = this;
            _super.call(this, $scope);
            this.$scope = $scope;
            this.$location = $location;
            this.dashboardService = dashboardService;
            this.widgets = $scope.widgets = new Array();
            this.count = 0;
            $scope.vm = this;
            this.dashboardService.GetDashboardWidgets(this.$scope).then(function (data) {
                _this.widgets = data;
                $scope.vm = data;
                console.log(' widgets = ', $scope.vm);
            });
        }
        // Init
        DashboardController.prototype.Init = function () {
            _super.prototype.BaseInit.call(this);
        };
        DashboardController.$inject = [
            '$scope',
            '$location',
            'dashboardService'
        ];
        return DashboardController;
    }(Demo.BaseController));
    Demo.DashboardController = DashboardController;
    angular.module("Demo").controller("dashboardController", DashboardController);
})(Demo || (Demo = {}));

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
            var _this = _super.call(this, $scope) || this;
            _this.$scope = $scope;
            _this.$location = $location;
            _this.dashboardService = dashboardService;
            _this.widgets = $scope.widgets = new Array();
            _this.count = 0;
            $scope.vm = _this;
            _this.dashboardService.GetDashboardWidgets(_this.$scope).then(function (data) {
                _this.widgets = data;
                $scope.vm = data;
                console.log(' widgets = ', $scope.vm);
            });
            return _this;
        }
        // Init
        DashboardController.prototype.Init = function () {
            _super.prototype.BaseInit.call(this);
        };
        return DashboardController;
    }(Demo.BaseController));
    DashboardController.$inject = [
        '$scope',
        '$location',
        'dashboardService'
    ];
    Demo.DashboardController = DashboardController;
    angular.module("Demo").controller("dashboardController", DashboardController);
})(Demo || (Demo = {}));

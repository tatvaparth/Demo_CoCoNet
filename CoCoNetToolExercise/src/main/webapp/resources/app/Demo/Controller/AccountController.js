/// <reference path='../../_all.ts' />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Demo;
(function (Demo) {
    var AccountController = (function (_super) {
        __extends(AccountController, _super);
        /// Conctructor
        function AccountController($scope, $location, $accountService) {
            var _this = _super.call(this, $scope) || this;
            _this.$scope = $scope;
            _this.$location = $location;
            _this.$accountService = $accountService;
            debugger;
            _this.count = 0;
            $scope.vm = _this;
            return _this;
        }
        // Init
        AccountController.prototype.Init = function () {
            _super.prototype.BaseInit.call(this);
        };
        AccountController.prototype.SaveDetails = function () {
            debugger;
            var firstName = this.$scope.firstName;
            var lastName = this.$scope.lastName;
            var email = this.$scope.email;
            var password = this.$scope.password;
            var designation = this.$scope.designation;
            var aboutyou = this.$scope.aboutyou;
            var gender = this.$scope.gender;
            var termandconditions = this.$scope.termandconditions;
            this.$accountService.saveAccountInfo(this.$scope).then();
        };
        return AccountController;
    }(Demo.BaseController));
    AccountController.$inject = [
        '$scope',
        '$location',
        'accountService'
    ];
    Demo.AccountController = AccountController;
    angular.module("Demo").controller("accountController", AccountController);
})(Demo || (Demo = {}));

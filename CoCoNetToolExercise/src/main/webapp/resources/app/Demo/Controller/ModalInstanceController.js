/// <reference path='../../_all.ts' />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Demo;
(function (Demo) {
    var ModalInstanceController = (function (_super) {
        __extends(ModalInstanceController, _super);
        function ModalInstanceController($scope, $modalInstance, $window, configService) {
            _super.call(this, $scope);
            this.$scope = $scope;
            this.$modalInstance = $modalInstance;
            this.$window = $window;
            this.configService = configService;
        }
        ModalInstanceController.prototype.onConfirm = function (id) {
            var _this = this;
            this.configService.deleteWidget(this.$scope, id).then(function (data) {
                _this.$modalInstance.dismiss('cancel');
                if (data == "Deleted") {
                    _this.$window.location.href = "/config/config-widget";
                }
            });
        };
        ;
        ModalInstanceController.prototype.close = function () {
            this.$modalInstance.dismiss('cancel');
        };
        ;
        ModalInstanceController.$inject = ['$scope', '$modalInstance', '$window', 'configService'];
        return ModalInstanceController;
    }(Demo.BaseController));
    Demo.ModalInstanceController = ModalInstanceController;
    angular.module("Demo").controller("modalInstanceController", ModalInstanceController);
})(Demo || (Demo = {}));

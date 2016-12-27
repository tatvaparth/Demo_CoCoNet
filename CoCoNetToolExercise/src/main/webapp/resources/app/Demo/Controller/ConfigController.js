/// <reference path='../../_all.ts' />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Demo;
(function (Demo) {
    var ConfigController = (function (_super) {
        __extends(ConfigController, _super);
        /// Conctructor
        function ConfigController($scope, $location, $window, $modal, configService) {
            var _this = _super.call(this, $scope) || this;
            _this.$scope = $scope;
            _this.$location = $location;
            _this.$window = $window;
            _this.$modal = $modal;
            _this.configService = configService;
            $scope.vm = _this;
            return _this;
        }
        ConfigController.prototype.getWidgetList = function () {
            var _this = this;
            this.dashboardWidgetMasters = this.$scope.dashboardWidgetMasters = new Array();
            this.configService.GetWidgetList(this.$scope).then(function (data) {
                _this.dashboardWidgetMasters = data;
                _this.$scope.dashboardWidgetMasters = data;
                console.log(' widgetList = ', _this.$scope.dashboardWidgetMasters);
            });
        };
        ConfigController.prototype.getWidgetFormatList = function () {
            var _this = this;
            this.widgetFormatList = this.$scope.widgetFormatList = new Array();
            this.configService.GetWidgetFormatList(this.$scope).then(function (data) {
                _this.widgetFormatList = data;
                _this.$scope.widgetFormatList = data;
                console.log(' widgetFormatList = ', _this.$scope.widgetFormatList);
            });
        };
        ConfigController.prototype.getDefaultTemplat = function (widgetFormatId) {
            if (widgetFormatId != null) {
                this.configService.getDefaultTemplat(this.$scope, widgetFormatId).then(function (data) {
                    CKEDITOR.instances.editor1.setData(data);
                    console.log(' widgetFormatList = ', data);
                });
            }
            else {
                CKEDITOR.instances.editor1.setData();
            }
        };
        ConfigController.prototype.onSave = function (flag) {
            var _this = this;
            if (this.$scope.editCustomizeWidgetForm != undefined || this.$scope.customizeWidgetForm != undefined) {
                this.$scope.widget.widgetBody = CKEDITOR.instances.editor1.getData();
                if (flag == 1) {
                    if (this.$scope.customizeWidgetForm.$valid) {
                        this.configService.saveCustomizedWidget(this.$scope, this.$scope.widget).then(function (data) {
                            if (data == 'success') {
                                _this.$window.location.href = "/config/config-widget";
                            }
                        });
                    }
                }
                else if (flag == 0) {
                    if (this.$scope.editCustomizeWidgetForm.$valid) {
                        this.configService.updateCustomizedWidget(this.$scope, this.$scope.widget).then(function (data) {
                            if (data == 'success') {
                                _this.$window.location.href = "/config/config-widget";
                            }
                        });
                    }
                }
            }
        };
        ConfigController.prototype.onEdit = function (id) {
            if (id != null) {
                this.$window.location.href = "/config/customize-widget?widgetId=" + id;
            }
        };
        ConfigController.prototype.initializeWidgetData = function (id, formatId) {
            this.configService.getWidget(this.$scope, id).then(function (data) {
                editor.on('instanceReady', function () {
                    CKEDITOR.instances.editor1.setData(data.widgetBody);
                });
            });
        };
        ConfigController.prototype.onDelete = function (id) {
            this.$modal.open({
                template: '<div class="modal-header"><h3 class="modal-title">Confirm</h3></div><div class="modal-body">Are you sure you want to delete this widget ?</div><div class="modal-footer"><button class="btn btn-primary" type="button" ng-click="modal.onConfirm(' + id + ')">Ok</button><button class="btn btn-default" type="button" ng-click="modal.close()">Cancel</button></div>',
                controller: 'modalInstanceController',
                controllerAs: 'modal'
            });
        };
        // Init
        ConfigController.prototype.Init = function () {
            _super.prototype.BaseInit.call(this);
        };
        return ConfigController;
    }(Demo.BaseController));
    ConfigController.$inject = [
        '$scope',
        '$location',
        '$window',
        '$modal',
        'configService',
    ];
    Demo.ConfigController = ConfigController;
    angular.module("Demo").controller("configController", ConfigController);
})(Demo || (Demo = {}));

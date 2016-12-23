/// <reference path='../../_all.ts' />

module Demo {
    export class ModalInstanceController extends BaseController {
    	'use strict';
    	
        public static $inject = ['$scope', '$modalInstance', '$window', 'configService'];
        
        constructor(private $scope: ICOCOScope, private $modalInstance: ng.ui.bootstrap.IModalServiceInstance, private $window: ng.IWindowService, private configService: IConfigService) {
        	super($scope);
        }

        onConfirm(id : any): void {
        	this.configService.deleteWidget(this.$scope, id).then((data) => {
        		this.$modalInstance.dismiss('cancel');
        		if(data == "Deleted") {
        			this.$window.location.href="/config/config-widget";
        		}
        	});
        };

        close(): void {
            this.$modalInstance.dismiss('cancel');
        };
       
    }
    
    angular.module("Demo").controller("modalInstanceController", ModalInstanceController);
}
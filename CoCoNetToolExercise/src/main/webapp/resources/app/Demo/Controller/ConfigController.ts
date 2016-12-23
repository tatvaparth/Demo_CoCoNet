/// <reference path='../../_all.ts' />

module Demo {
    export class ConfigController extends BaseController {
        'use strict';

        dashboardWidgetMasters: DashboardWidgetMaster[];
        widgetFormatList: WidgetFormatMaster[];
        
        widget : DashboardWidgetMaster;
        widgetFormat : WidgetFormatMaster;

        public static $inject = [
            '$scope',
            '$location',
            '$window',
            '$modal',
            'configService',
        ];

        /// Conctructor
        constructor(private $scope: ICOCOScope, private $location: ng.ILocationService, private $window: ng.IWindowService, private $modal: ng.ui.bootstrap.IModalService, private configService: IConfigService) {
            super($scope);

           $scope.vm = this;
        }

        getWidgetList() {
        	this.dashboardWidgetMasters = this.$scope.dashboardWidgetMasters = new Array<DashboardWidgetMaster>();
        	this.configService.GetWidgetList(this.$scope).then((data) => {
        		   this.dashboardWidgetMasters = data as DashboardWidgetMaster[];
        		   this.$scope.dashboardWidgetMasters = data as DashboardWidgetMaster[];
                   console.log(' widgetList = ', this.$scope.dashboardWidgetMasters);
               });
        }
        
        getWidgetFormatList() {
        	this.widgetFormatList = this.$scope.widgetFormatList = new Array<WidgetFormatMaster>();
        	this.configService.GetWidgetFormatList(this.$scope).then((data) => {
     		   this.widgetFormatList = data as WidgetFormatMaster[];
     		   this.$scope.widgetFormatList = data as WidgetFormatMaster[];
                console.log(' widgetFormatList = ', this.$scope.widgetFormatList);
            });
        }
        
        getDefaultTemplat(widgetFormatId : any){
    		if(widgetFormatId != null) {
    			this.configService.getDefaultTemplat(this.$scope, widgetFormatId).then((data) => {
    				CKEDITOR.instances.editor1.setData(data as string);
    				console.log(' widgetFormatList = ', data as string);
    		    });
    		} else {
    			CKEDITOR.instances.editor1.setData();
    		}
    	}
        
        onSave(flag : any) {
            if(this.$scope.editCustomizeWidgetForm != undefined || this.$scope.customizeWidgetForm != undefined)
            {
            	this.$scope.widget.widgetBody = CKEDITOR.instances.editor1.getData();
            	
            	if(flag == 1){
            		
            		if(this.$scope.customizeWidgetForm.$valid) {
            	
            			this.configService.saveCustomizedWidget(this.$scope, this.$scope.widget).then((data) => {
            				if(data == 'success'){
            					this.$window.location.href="/config/config-widget";
            		    	}
                       	});
            		}		
	            } else if (flag == 0) {
	            	if(this.$scope.editCustomizeWidgetForm.$valid){
	            		
	            		this.configService.updateCustomizedWidget(this.$scope, this.$scope.widget).then((data) => {
            				if(data == 'success'){
            					this.$window.location.href="/config/config-widget";
            		    	}
                       	});
	            	}
	            }
            }
        }
        
        onEdit(id : any) {
        	if(id != null) {
        		this.$window.location.href="/config/customize-widget?widgetId="+id;
        	}
        }
        
        initializeWidgetData(id : any, formatId : any){
        	this.configService.getWidget(this.$scope, id).then((data) => {
    			 editor.on( 'instanceReady', function() {
    				 CKEDITOR.instances.editor1.setData(data.widgetBody);
    			 });
    		});
        } 	
        
        onDelete(id : any) {
        	this.$modal.open({
                template: '<div class="modal-header"><h3 class="modal-title">Confirm</h3></div><div class="modal-body">Are you sure you want to delete this widget ?</div><div class="modal-footer"><button class="btn btn-primary" type="button" ng-click="modal.onConfirm(' + id + ')">Ok</button><button class="btn btn-default" type="button" ng-click="modal.close()">Cancel</button></div>',
                controller: 'modalInstanceController',
                controllerAs : 'modal'
            });
        }  
        
       
        // Init
        public Init() {
            super.BaseInit();
        }

    }

    angular.module("Demo").controller("configController", ConfigController);
}
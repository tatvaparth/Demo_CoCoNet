/// <reference path='../../_all.ts' />

module Demo {
    export class DashboardController extends BaseController {
        'use strict';

        widgets: Widgets[];
        private count: number;
        public static $inject = [
            '$scope',
            '$location',
            'dashboardService'
        ];

        /// Conctructor
        constructor(private $scope: ICOCOScope, private $location: ng.ILocationService, private dashboardService: IDashboardService) {
            super($scope);

            this.widgets = $scope.widgets = new Array<Widgets>();
            this.count = 0;

            $scope.vm = this;
            this.dashboardService.GetDashboardWidgets(this.$scope).then((data) => {
		        this.widgets = data;
		        $scope.vm = data;
		        console.log(' widgets = ',$scope.vm);
		      });
           
        }

        // Init
        public Init() {
            super.BaseInit();
        }

        
    }
    
    angular.module("Demo").controller("dashboardController", DashboardController);
}
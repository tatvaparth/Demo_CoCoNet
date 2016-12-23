/// <reference path='../../_all.ts' />

module Demo {
    'use strict';

    export class ConfigService implements IConfigService {

        private _http: ng.IHttpService;
        private $q: ng.IQService;


        static $inject = ["$http", "$q"];

        constructor(http: ng.IHttpService, $q: ng.IQService) {
            this._http = http;
            this.$q = $q;
        }



        public GetWidgetList($scope: ICOCOScope): ng.IHttpPromise<DashboardWidgetMaster[]> {
            return this._http.get('getWidgetList')
                .then(this.success)
                .catch(this.fail);
        }

        public GetWidgetFormatList($scope: ICOCOScope): ng.IHttpPromise<WidgetFormatMaster[]> {
            return this._http.get('getWidgetFormatList')
                .then(this.success)
                .catch(this.fail);
        }

        public getDefaultTemplat($scope: ICOCOScope, widgetFormatId : any): ng.IHttpPromise<string> {
        	return this._http.post("/widgetFormat/getTemplate/",JSON.parse(widgetFormatId).widgetFormatId)
        		.then(this.success)
        		.catch(this.fail);
	    }
        
        public saveCustomizedWidget($scope: ICOCOScope, dashboardWidgetMaster : DashboardWidgetMaster): ng.IHttpPromise<string> {
        	return this._http.post("/config/saveCustomizedWidget/"+JSON.parse(dashboardWidgetMaster.widgetFormat).widgetFormatId, dashboardWidgetMaster)
        		.then(this.success)
        		.catch(this.fail);
	    }
       
        public updateCustomizedWidget($scope: ICOCOScope, dashboardWidgetMaster : DashboardWidgetMaster): ng.IHttpPromise<string> {
        	console.log(dashboardWidgetMaster);
        	return this._http.post("/config/updateCustomizedWidget/"+dashboardWidgetMaster.widgetFormat.widgetFormatId, dashboardWidgetMaster)
        		.then(this.success)
        		.catch(this.fail);
	    }
        
        public getWidget($scope: ICOCOScope, widgetId : any): ng.IHttpPromise<DashboardWidgetMaster> {
        	return this._http.post('/config/getWidget',widgetId)
        		.then(this.success)
        		.catch(this.fail);
	    }
        
        public deleteWidget($scope: ICOCOScope, widgetId : any): ng.IHttpPromise<string> {
        	return this._http.post('/config/deleteWidget',widgetId)
        		.then(this.success)
        		.catch(this.fail);
	    }
        
        private success: (response: any) => {} = (response) => response.data;

        private fail: (error: any) => {} = (error) => {
            var msg = error.data.description;
            var reason = 'query for people failed.';
            return this.$q.reject(msg);
        }
    }

    angular.module("Demo").service("configService", ConfigService);

}
/// <reference path='../../_all.ts' />

module Demo {
    'use strict';

    export class AccountService implements IAccountService {

        private _http: ng.IHttpService;
        private $q: ng.IQService;


        static $inject = ["$http", "$q"];

        constructor(http: ng.IHttpService, $q: ng.IQService) {
            this._http = http;
            this.$q = $q;
        }

        private success: (response: any) => {} = (response) => response.data;

        private fail: (error: any) => {} = (error) => {
            var msg = error.data.description;
            var reason = 'query for people failed.';
            return this.$q.reject(msg);
        }
        
         public saveAccountInfo($scope: IMyAccountScope): ng.IHttpPromise<string> {
        	return this._http.post("/config/saveCustomizedWidget/"+JSON.parse(dashboardWidgetMaster.widgetFormat).widgetFormatId, dashboardWidgetMaster)
        		.then(this.success)
        		.catch(this.fail);
	    }
    }

    angular.module("Demo").service("accountService", AccountService);

}
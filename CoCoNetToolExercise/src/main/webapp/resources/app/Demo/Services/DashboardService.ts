/// <reference path='../../_all.ts' />

module Demo {
    'use strict';

    export class DashboardService implements IDashboardService {

        private _http: ng.IHttpService;
        private $q: ng.IQService;


        static $inject = ["$http", "$q"];

        constructor(http: ng.IHttpService, $q: ng.IQService) {
            this._http = http;
            this.$q = $q;
        }



        public GetDashboardWidgets($scope: ICOCOScope): ng.IHttpPromise<Widgets[]> {
            return this._http.get('/widget/dashboardWidgets')
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

    angular.module("Demo").service("dashboardService", DashboardService);

}
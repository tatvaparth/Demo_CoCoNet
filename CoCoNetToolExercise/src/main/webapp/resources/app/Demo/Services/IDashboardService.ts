/// <reference path='../../_all.ts' />

module Demo {
    export interface IDashboardService {
    	GetDashboardWidgets:($scope: ICOCOScope) => ng.IPromise<Array<any>>;
    }
}
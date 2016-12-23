/// <reference path='../../_all.ts' />

module Demo {
    export interface IConfigService {
        GetWidgetList : ($scope: ICOCOScope) => ng.IPromise<Array<DashboardWidgetMaster>>;
        
        GetWidgetFormatList : ($scope: ICOCOScope) => ng.IPromise<Array<WidgetFormatMaster>>;
        
        getDefaultTemplat : ($scope: ICOCOScope, widgetFormatId : any) => ng.IPromise<string>;
        
        saveCustomizedWidget : ($scope: ICOCOScope, dashboardWidgetMaster : DashboardWidgetMaster)  => ng.IPromise<string>;
        
        updateCustomizedWidget : ($scope: ICOCOScope, dashboardWidgetMaster : DashboardWidgetMaster)  => ng.IPromise<string>;
        
        getWidget : ($scope: ICOCOScope, widgetId : any)  => ng.IPromise<DashboardWidgetMaster>;
        
        deleteWidget : ($scope: ICOCOScope, widgetId : any)  => ng.IPromise<string>;
        
    }
}
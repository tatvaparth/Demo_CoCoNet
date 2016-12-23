/// <reference path='../../_all.ts' />

module Demo {
    export interface ICOCOScope extends ng.IScope {
        widgets: Widgets[];
        dashboardWidgetMasters: DashboardWidgetMaster[];
    	widgetFormatList : WidgetFormatMaster[];
    	widget : DashboardWidgetMaster;
    	widgetFormat : WidgetFormatMaster;
        vm: any;
    
    	customizeWidgetForm : any;
    	editCustomizeWidgetForm : any;
    }
}
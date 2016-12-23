package com.tatvacoconet.service;

import java.util.List;

import com.tatvacoconet.entity.DashboardWidgetMaster;

/**
 * 
 * @author TatvaSoft
 *
 */
public interface IDashboardWidgetService {
	
	public void createWidget(DashboardWidgetMaster widget);
	
	public void updateWidget(DashboardWidgetMaster widget);
	
	public void deleteWidget(Integer widgetid);
	
	public List<DashboardWidgetMaster> findAllWidget();
	
	public DashboardWidgetMaster find(Integer widgetId);
	
	public List<DashboardWidgetMaster> findAllActiveWidget();
	
	
}

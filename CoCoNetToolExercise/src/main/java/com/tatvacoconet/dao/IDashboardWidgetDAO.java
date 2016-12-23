package com.tatvacoconet.dao;

import java.util.List;

import com.tatvacoconet.entity.DashboardWidgetMaster;

/**
 * 
 * @author TatvaSoft
 *
 */
public interface IDashboardWidgetDAO {
	
	public void createWidget(DashboardWidgetMaster widget);
	
	public void updateWidget(DashboardWidgetMaster widget); 
	
	public void deleteWidget(Integer widgetid);
	
	public List<DashboardWidgetMaster> findAllWidget();
	
	public DashboardWidgetMaster findEntity(Integer widgetId);
	
	public List<DashboardWidgetMaster> findAllActiveWidget();
	
}


package com.tatvacoconet.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tatvacoconet.dao.IDashboardWidgetDAO;
import com.tatvacoconet.entity.DashboardWidgetMaster;

/**
 * 
 * @author TatvaSoft
 *
 */
@Service
@Transactional
public class DashbboardWidgetServiceImpl implements IDashboardWidgetService {

	@Autowired
	private IDashboardWidgetDAO widgetDAO;
		
	@Override
	public void createWidget(DashboardWidgetMaster widget) {
		widgetDAO.createWidget(widget);
	}

	@Override
	public void updateWidget(DashboardWidgetMaster widget) {
		widgetDAO.updateWidget(widget);
	}

	@Override
	public void deleteWidget(Integer widgetid) {
		widgetDAO.deleteWidget(widgetid);
	}

	@Override
	public List<DashboardWidgetMaster> findAllWidget() {
		return widgetDAO.findAllWidget();
	}

	@Override
	public DashboardWidgetMaster find(Integer widgetId) {
		return widgetDAO.findEntity(widgetId);
	}

	@Override
	public List<DashboardWidgetMaster> findAllActiveWidget() {
		return widgetDAO.findAllActiveWidget();
	}
	
}

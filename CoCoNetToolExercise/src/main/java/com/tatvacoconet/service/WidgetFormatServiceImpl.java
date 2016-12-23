package com.tatvacoconet.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tatvacoconet.dao.IWidgetFormatDAO;
import com.tatvacoconet.entity.WidgetFormatMaster;

/**
 * 
 * @author TatvaSoft
 *
 */
@Service
@Transactional
public class WidgetFormatServiceImpl implements IWidgetFormatService {

	@Autowired
	private IWidgetFormatDAO widgetFormatDAO;
	
	@Override
	public WidgetFormatMaster find(Integer widgetFormatId) {
		return widgetFormatDAO.findEntity(widgetFormatId);
	}
	
	@Override
	public List<WidgetFormatMaster> getWidgetFormatList() {
		return widgetFormatDAO.getWidgetFormatList();
	}

	@Override
	public WidgetFormatMaster getWidgetFormatById(int formatId) {
		return widgetFormatDAO.getWidgetFormatById(formatId);
	}
	
	@Override
	public void create(WidgetFormatMaster widgetFormatMaster) {
		 widgetFormatDAO.create(widgetFormatMaster);
	}

}

package com.tatvacoconet.service;

import java.util.List;

import com.tatvacoconet.entity.WidgetFormatMaster;

/**
 * 
 * @author TatvaSoft
 *
 */
public interface IWidgetFormatService {
	
	public List<WidgetFormatMaster> getWidgetFormatList();
	
	public WidgetFormatMaster getWidgetFormatById(int formatId);
	
	public WidgetFormatMaster find(Integer widgetFormatId);
	
	public void create(WidgetFormatMaster widgetFormatMaster);

}

package com.tatvacoconet.dao;

import java.util.List;

import com.tatvacoconet.entity.WidgetFormatMaster;

/**
 * 
 * @author TatvaSoft
 *
 */
public interface IWidgetFormatDAO {

	public List<WidgetFormatMaster> getWidgetFormatList();
	
	public WidgetFormatMaster getWidgetFormatById(int formatId);
	
	public WidgetFormatMaster findEntity(Integer widgetFormatId);
	
	public void create(WidgetFormatMaster widgetFormatMaster);
}

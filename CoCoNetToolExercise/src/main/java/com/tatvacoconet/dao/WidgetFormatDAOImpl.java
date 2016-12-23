package com.tatvacoconet.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.tatvacoconet.entity.WidgetFormatMaster;

/**
 * 
 * @author TatvaSoft
 *
 */
@Repository
public class WidgetFormatDAOImpl extends TatvaSoftDAOImpl<WidgetFormatMaster, Integer> implements IWidgetFormatDAO {

	public WidgetFormatDAOImpl() {
		super(WidgetFormatMaster.class);
	}

	@Override
	public WidgetFormatMaster findEntity(Integer widgetFormatId) {
		return find(widgetFormatId);
	}
	
	@Override
	public List<WidgetFormatMaster> getWidgetFormatList() {
		return findAll();
	}

	@Override
	public WidgetFormatMaster getWidgetFormatById(int formatId) {
		return find(formatId);
	}
	
	@Override
	public void create(WidgetFormatMaster widgetFormatMaster) {
		save(widgetFormatMaster);
	}

}

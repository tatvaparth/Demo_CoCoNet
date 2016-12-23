package com.tatvacoconet.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.tatvacoconet.entity.DashboardWidgetMaster;

/**
 * @author TatvaSoft
 *
 */
@Repository
public class DashboardWidgetDAOImpl extends TatvaSoftDAOImpl<DashboardWidgetMaster, Integer> implements IDashboardWidgetDAO {
  
 	public DashboardWidgetDAOImpl() {
		super(DashboardWidgetMaster.class);
	}


	@Override
	public void createWidget(DashboardWidgetMaster widget) {
		save(widget);
	}


	@Override
	public void updateWidget(DashboardWidgetMaster widget) {
		persist(widget);
	}


	@Override
	public void deleteWidget(Integer widgetid) {
		delete(widgetid);
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<DashboardWidgetMaster> findAllWidget() {
		Criteria cr = getSessionFactory().getCurrentSession().createCriteria(DashboardWidgetMaster.class);
		return cr.list();
	}


	@Override
	public DashboardWidgetMaster findEntity(Integer widgetId) {
		return find(widgetId);
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<DashboardWidgetMaster> findAllActiveWidget() {
		Criteria cr = getSessionFactory().getCurrentSession().createCriteria(DashboardWidgetMaster.class);
		cr.add(Restrictions.eq("widgetIsActive", true));
		return cr.list();
	}

  
}
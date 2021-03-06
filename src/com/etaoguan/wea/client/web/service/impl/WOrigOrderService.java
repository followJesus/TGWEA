package com.etaoguan.wea.client.web.service.impl;

import org.springframework.stereotype.Service;

import com.etaoguan.wea.client.vo.SortParam;
import com.etaoguan.wea.client.web.service.IWOrigOrderService;
import com.etaoguan.wea.client.web.vo.OrigOrderSearch;
import com.etaoguan.wea.client.web.vo.WPage;
import com.etaoguan.wea.client.web.vo.WPagingRequest;
import com.etaoguan.wea.common.DataCriteria;
import com.etaoguan.wea.common.DataSet;
import com.etaoguan.wea.common.OffsetRequest;
import com.etaoguan.wea.service.impl.OrigOrderService;

@Service("worigOrderService")
public class WOrigOrderService extends OrigOrderService implements IWOrigOrderService{

	
	@Override
	@SuppressWarnings("rawtypes")
	public WPage listOrigOrders(OrigOrderSearch origOrderSearch, SortParam sortParam,
			WPagingRequest wpagingRequest) {
		OffsetRequest offsetRequest = wpagingRequest.format2OffsetRequest();
		DataCriteria dataCriteria = new DataCriteria();
		dataCriteria.setParam("ownerNum", origOrderSearch.getOwnerNum());
		dataCriteria.setParam("custNum", origOrderSearch.getCustNum());
		DataSet dataSet = listOrigOrders(dataCriteria, offsetRequest);
		
		return new WPage(wpagingRequest,dataSet);
	}
	
}

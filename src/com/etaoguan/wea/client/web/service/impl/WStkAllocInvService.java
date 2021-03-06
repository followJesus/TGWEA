package com.etaoguan.wea.client.web.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.etaoguan.wea.client.vo.SortParam;
import com.etaoguan.wea.client.web.service.IWStkAllocInvService;
import com.etaoguan.wea.client.web.service.IWWareHouseService;
import com.etaoguan.wea.client.web.vo.StkAllocInvSearch;
import com.etaoguan.wea.client.web.vo.WPage;
import com.etaoguan.wea.client.web.vo.WPagingRequest;
import com.etaoguan.wea.common.DataCriteria;
import com.etaoguan.wea.common.DataSet;
import com.etaoguan.wea.common.OffsetRequest;
import com.etaoguan.wea.service.impl.StkAllocInvService;
import com.etaoguan.wea.vo.StockAllocateInvoice;

@Service("wstkAllocInvService")
public class WStkAllocInvService extends StkAllocInvService implements IWStkAllocInvService{

	@Autowired
	IWWareHouseService iWWareHouseService;

	@Override
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public Map getEditStkAllocInvInitData(String ownerNum, String stkAllocNum) {
		Map dataMap = new HashMap();
		dataMap.put("warehouses",iWWareHouseService.getAllWarehouses(ownerNum));
		if(StringUtils.isNotEmpty(stkAllocNum)){
			dataMap.put("stkAllocInv",getStkAllocInv(stkAllocNum));
		}
		return dataMap;
	}

	@Override
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public Map getListStkAllocInvsSearchInitData(String ownerNum) {
		Map dataMap = new HashMap();
		dataMap.put("warehouses",iWWareHouseService.getAllWarehouses(ownerNum));
		return dataMap;
	}

	@Override
	@SuppressWarnings("rawtypes")
	public WPage listStkAllocInvs(StkAllocInvSearch stkAllocInvSearch,
			SortParam sortParam, WPagingRequest wpagingRequest) {
		OffsetRequest offsetRequest = wpagingRequest.format2OffsetRequest();
		DataCriteria dataCriteria = new DataCriteria();
		dataCriteria.setParam("ownerNum", stkAllocInvSearch.getOwnerNum());
		dataCriteria.setParam("prodName", stkAllocInvSearch.getProdName());
		dataCriteria.setParam("fromWhNum", stkAllocInvSearch.getFromWhNum());
		dataCriteria.setParam("toWhNum", stkAllocInvSearch.getToWhNum());
		DataSet dataSet = listStkAllocInvs(dataCriteria, offsetRequest);
		
		return new WPage(wpagingRequest,dataSet);
	}

	@Override
	public void saveOrUpdateStkAllocInv(StockAllocateInvoice StkAllocInv) {
		if(StringUtils.isEmpty(StkAllocInv.getStkAllocNum())){
			addStkAllocInv(StkAllocInv);
		}else{
			updateStkAllocInv(StkAllocInv);
		}
		
	}


}

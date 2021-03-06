package com.etaoguan.wea.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.etaoguan.wea.common.DataCriteria;
import com.etaoguan.wea.common.DataSet;
import com.etaoguan.wea.common.OffsetRequest;
import com.etaoguan.wea.common.WeaException;
import com.etaoguan.wea.constant.WeaConstant;
import com.etaoguan.wea.dao.IGodownInvDao;
import com.etaoguan.wea.service.IGodownInvService;
import com.etaoguan.wea.service.IKeyGenService;
import com.etaoguan.wea.service.IProdStockService;
import com.etaoguan.wea.vo.GodownInvoice;
import com.etaoguan.wea.vo.GodownInvoiceItem;
import com.etaoguan.wea.vo.ProdQty;
import com.etaoguan.wea.vo.ProdStockDelta;

@Service("godownInvService")
public class GodownInvService extends BaseService implements IGodownInvService{

	@Autowired
	IGodownInvDao iGodownInvDao;
	
	@Resource(name="godownKeyGenService") 
	protected IKeyGenService  iKeyGenService;
	
	@Resource(name="prodStockService")
	private IProdStockService iProdStockService;
	
	@Override
	public void addGodownInv(GodownInvoice godownInvoice) {
		if(godownInvoice.getGodownInvItemList()==null||godownInvoice.getGodownInvItemList().size()==0){
			throw new WeaException("无效的产品信息");
		}
		String gdNum = iKeyGenService.saveNGetKey();
		godownInvoice.setGdNum(gdNum);
		godownInvoice.setCreateBy(getCurrentOperator());
		godownInvoice.setUpdateBy(getCurrentOperator());
		iGodownInvDao.addGodownInv(godownInvoice);
		
		for(GodownInvoiceItem godownInvoiceItem:godownInvoice.getGodownInvItemList()){
			godownInvoiceItem.setGdNum(gdNum);
			iGodownInvDao.addGodownInvItem(godownInvoiceItem);
		}

		
	}

	@Override
	public void saveGodownInvoiceItem(GodownInvoiceItem godownInvoiceItem) {
		iGodownInvDao.addGodownInvItem(godownInvoiceItem);
		
	}

	@Override
	public void delGodownInv(String gdNum) {
		if(havePutin2WH(gdNum)){
			throw new WeaException("产品已入库");
		}
		DataCriteria dataCriteria = new DataCriteria();
		dataCriteria.setParam("gdNum",gdNum);
		iGodownInvDao.delGodownInv(dataCriteria);
	}

	@Override
	public GodownInvoice getGodownInv(String gdNum) {
		DataCriteria dataCriteria = new DataCriteria();
		dataCriteria.setParam("gdNum",gdNum);
		GodownInvoice godownInvoice = iGodownInvDao.getGodownInv(dataCriteria);
		List<GodownInvoiceItem> godownInvoiceItems = iGodownInvDao.getGodownInvItems(dataCriteria);
		godownInvoice.setGodownInvItemList(godownInvoiceItems);
		return godownInvoice;
	}
	
	@Override
	public GodownInvoice getGodownInvHeader(String gdNum) {
		DataCriteria dataCriteria = new DataCriteria();
		dataCriteria.setParam("gdNum",gdNum);
		return iGodownInvDao.getGodownInv(dataCriteria);
	}


	@Override
	public List<GodownInvoiceItem> getGodownInvItems(String gdNum) {
		DataCriteria dataCriteria = new DataCriteria();
		dataCriteria.setParam("gdNum",gdNum);
		return iGodownInvDao.getGodownInvItems(dataCriteria);
	}

	@Override
	@SuppressWarnings("rawtypes")
	public DataSet listGodownInvs(DataCriteria dataCriteria,
			OffsetRequest offsetRequest) {
		
		return iGodownInvDao.getGodownInvs(dataCriteria, offsetRequest);
	}

	@Override
	public void updateGodownInv(GodownInvoice godownInvoice) {
		if(godownInvoice.getGodownInvItemList()==null||godownInvoice.getGodownInvItemList().size()==0){
			throw new WeaException("无效的产品信息");
		}
		if(havePutin2WH(godownInvoice.getGdNum())){
			throw new WeaException("产品已入库");
		}
		godownInvoice.setUpdateBy(getCurrentOperator());
		iGodownInvDao.updateGodownInv(godownInvoice);
		DataCriteria dataCriteria = new DataCriteria();
		dataCriteria.setParam("gdNum",godownInvoice.getGdNum());
		iGodownInvDao.delGodownInvItem(dataCriteria);

		for(GodownInvoiceItem godownInvoiceItem:godownInvoice.getGodownInvItemList()){
			godownInvoiceItem.setGdNum(godownInvoice.getGdNum());
			iGodownInvDao.addGodownInvItem(godownInvoiceItem);
		}
		
	}

	@Override
	public boolean havePutin2WH(String gdNum) {
		if(getGodownInvHeader(gdNum).getGdStatus()==WeaConstant.GODOWNINV_PUTINSTATUS_PUTIN){
			return true;
		}
		return false;
	}

	@Override
	public void saveGodownInvStockChange(String gdNum) {
		GodownInvoice godownInv = getGodownInv(gdNum);
		List<ProdQty> prodQtyList =  new ArrayList<ProdQty>();
		for(GodownInvoiceItem godownInvItem:godownInv.getGodownInvItemList()){
			ProdQty prodQty = new ProdQty();
			prodQty.setProdNum(godownInvItem.getProdNum());
			prodQty.setProdName(godownInvItem.getProdName());
			prodQty.setDifferName(godownInvItem.getDifferName());
			prodQty.setCases(godownInvItem.getCases());
			prodQty.setPieces(godownInvItem.getPieces());
			prodQtyList.add(prodQty);
		}
		ProdStockDelta prodStockDelta = new ProdStockDelta();
		prodStockDelta.setProdQtyList(prodQtyList);
		prodStockDelta.setOwnerNum(godownInv.getOwnerNum());
		prodStockDelta.setWhNum(godownInv.getWhNum());
		prodStockDelta.setWhName(godownInv.getWhName());
		prodStockDelta.setReferNum(godownInv.getGdNum());
		prodStockDelta.setReferModule(WeaConstant.MODULE_GODOWN);
		iProdStockService.updateRaiseStock(prodStockDelta);
		
		updateGodownInv2Putin(godownInv.getGdNum());
		
	}

	@Override
	public void updateGodownInv2Putin(String gdNum) {
		DataCriteria dataCriteria = new DataCriteria();
		dataCriteria.setParam("gdNum",gdNum);
		dataCriteria.setParam("gdStatus",WeaConstant.GODOWNINV_PUTINSTATUS_PUTIN);
		dataCriteria.setParam("updateBy",getCurrentOperator());
		iGodownInvDao.updateGodownInv(dataCriteria);
	}


}

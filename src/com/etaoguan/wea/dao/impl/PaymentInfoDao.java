package com.etaoguan.wea.dao.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.etaoguan.wea.common.DataCriteria;
import com.etaoguan.wea.dao.IPaymentInfoDao;
import com.etaoguan.wea.vo.SupportOnlinePayType;
import com.ibatis.sqlmap.client.SqlMapClient;

/**
 * @author cunli
 * 客户支付宝的key
 */
@Repository
public class PaymentInfoDao extends SpringBaseDao implements IPaymentInfoDao{

	@Override
	@Resource(name="paymentSqlMapClient")
	public void setSbiSqlMapClient(SqlMapClient sqlMapClient){
		
		super.setSqlMapClient(sqlMapClient);
	}

	@Override
	public SupportOnlinePayType getSupportOnlinePayType(
			DataCriteria dataCriteria) {

		return (SupportOnlinePayType)this.getSqlMapClientTemplate().queryForObject("getSupportOnlinePayType", dataCriteria.getParams());
	}
	
	
}

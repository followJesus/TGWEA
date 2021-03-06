package com.etaoguan.wea.dao.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.etaoguan.wea.common.DataCriteria;
import com.etaoguan.wea.dao.IWechatPictureTextDao;
import com.etaoguan.wea.wechat.vo.WechatMassMpnews;
import com.ibatis.sqlmap.client.SqlMapClient;

/**
 * @author cunli
 * 图文消息详情
 */
@Repository
public class WechatPictureTextDao extends SpringBaseDao implements IWechatPictureTextDao{

	@Override
	@Resource(name="wechatPictureTextSqlMapClient")
	public void setSbiSqlMapClient(SqlMapClient sqlMapClient){
		
		super.setSqlMapClient(sqlMapClient);
	}

	/* (non-Javadoc) 添加图文消息详情
	 * @see com.etaoguan.wea.dao.IWechatPictureTextDao#addWechatPictureText(com.etaoguan.wea.wechat.vo.WechatPictureText)
	 */
	@Override
	public void addWechatPictureText(WechatMassMpnews wechatPictureText) {
		this.getSqlMapClientTemplate().insert("createWechatPictureText", wechatPictureText);
	}

	/* (non-Javadoc)根据某次发送图文的id 获取详细信息
	 * @see com.etaoguan.wea.dao.IWechatPictureTextDao#wechatPictureTexts(long)
	 */
	@Override
	@SuppressWarnings("unchecked")
		public List<WechatMassMpnews> wechatPictureTexts(DataCriteria dataCriteria) {
		return this.getSqlMapClientTemplate().queryForList("getDetailsById", dataCriteria.getParams());
	}

	@Override
	public void deleteWechatMassMpnews(DataCriteria dataCriteria) {
		this.getSqlMapClientTemplate().delete("deleteWechatMassMpnews", dataCriteria.getParams());
		
	}

	@Override
	public void updateWechatPictureText(WechatMassMpnews wechatPictureText) {
		this.getSqlMapClientTemplate().update("updateWechatPictureText", wechatPictureText);
		
	}
}

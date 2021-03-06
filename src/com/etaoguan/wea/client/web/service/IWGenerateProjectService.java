package com.etaoguan.wea.client.web.service;

import com.etaoguan.wea.service.IGenerateProjectService;
import com.etaoguan.wea.vo.OwnerMobileGeneration;

/** 
 * @author cunli 记录生成mobile项目的时间和是否生成
 *
 */
public interface IWGenerateProjectService extends IGenerateProjectService{
	
	/**
	 * @param generateProject 记录生成mobile项目的时间
	 */
	public void addWGenerateProject(OwnerMobileGeneration generateProject);
	/**
	 * @param generateProject 再次生成
	 */
	public void updateWGenerateProject(OwnerMobileGeneration generateProject);

}

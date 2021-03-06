package com.etaoguan.wea.job;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;

import com.etaoguan.wea.common.WeaDataCache;
import com.etaoguan.wea.service.IPushMessageJobService;


@Service("pushMessageJob")
public class PushMessageJob implements BaseJob {
	
	@Resource(name="pushMessageJobService") 
	protected IPushMessageJobService iPushMessageJobService;

	@Override
	public void execute() {
		if(WeaDataCache.getCache().getAppSettingAllowPushMessage()){
			iPushMessageJobService.getNSendPushMessages();
		}
		
	}


}

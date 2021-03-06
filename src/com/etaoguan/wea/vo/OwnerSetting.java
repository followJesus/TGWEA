package com.etaoguan.wea.vo;

public class OwnerSetting extends BaseVo{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private long settingId;
	
	private String ownerNum;
	
	private Owner owner;

	private String paramName;
	
	private String paramValue;
	
	private String showName;


	public long getSettingId() {
		return settingId;
	}

	public void setSettingId(long settingId) {
		this.settingId = settingId;
	}
	public String getParamName() {
		return paramName;
	}

	public void setParamName(String paramName) {
		this.paramName = paramName;
	}

	public String getParamValue() {
		return paramValue;
	}

	public void setParamValue(String paramValue) {
		this.paramValue = paramValue;
	}

	public String getShowName() {
		return showName;
	}

	public void setShowName(String showName) {
		this.showName = showName;
	}

	public String getOwnerNum() {
		return ownerNum;
	}

	public void setOwnerNum(String ownerNum) {
		this.ownerNum = ownerNum;
	}

	public Owner getOwner() {
		return owner;
	}

	public void setOwner(Owner owner) {
		this.owner = owner;
	}

	
}

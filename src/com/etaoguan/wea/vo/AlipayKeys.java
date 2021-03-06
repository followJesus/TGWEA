package com.etaoguan.wea.vo;


/**
 * @author cunli 所有客户的支付宝的 密钥
 * 
 */
public class AlipayKeys extends BaseVo {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String ownerNum;
	private String ownerPartner;
	private String ownerKey;
	private String ownerAccountName;
	
	private String companyName;

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public String getOwnerAccountName() {
		return ownerAccountName;
	}

	public void setOwnerAccountName(String ownerAccountName) {
		this.ownerAccountName = ownerAccountName;
	}

	public String getOwnerNum() {
		return ownerNum;
	}

	public void setOwnerNum(String ownerNum) {
		this.ownerNum = ownerNum;
	}

	public String getOwnerPartner() {
		return ownerPartner;
	}

	public void setOwnerPartner(String ownerPartner) {
		this.ownerPartner = ownerPartner;
	}

	public String getOwnerKey() {
		return ownerKey;
	}

	public void setOwnerKey(String ownerKey) {
		this.ownerKey = ownerKey;
	}

}

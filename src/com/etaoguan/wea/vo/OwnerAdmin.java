package com.etaoguan.wea.vo;

import java.util.Date;
import java.util.List;

public class OwnerAdmin extends BaseVo{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int adminId;
	private String ownerNum;
	private String adminName;
	private String adminPwd;
	private Date loginDate;
	private int reserveFlag;
	private Owner owner;
	private List<AccessOperation> accessOperationList;
	public int getAdminId() {
		return adminId;
	}
	public void setAdminId(int adminId) {
		this.adminId = adminId;
	}
	public String getOwnerNum() {
		return ownerNum;
	}
	public void setOwnerNum(String ownerNum) {
		this.ownerNum = ownerNum;
	}
	public String getAdminName() {
		return adminName;
	}
	public void setAdminName(String adminName) {
		this.adminName = adminName;
	}
	public String getAdminPwd() {
		return adminPwd;
	}
	public void setAdminPwd(String adminPwd) {
		this.adminPwd = adminPwd;
	}
	public Date getLoginDate() {
		return loginDate;
	}
	public void setLoginDate(Date loginDate) {
		this.loginDate = loginDate;
	}
	public List<AccessOperation> getAccessOperationList() {
		return accessOperationList;
	}
	public void setAccessOperationList(List<AccessOperation> accessOperationList) {
		this.accessOperationList = accessOperationList;
	}
	public int getReserveFlag() {
		return reserveFlag;
	}
	public void setReserveFlag(int reserveFlag) {
		this.reserveFlag = reserveFlag;
	}
	public Owner getOwner() {
		return owner;
	}
	public void setOwner(Owner owner) {
		this.owner = owner;
	}

	
}

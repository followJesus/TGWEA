package com.etaoguan.wea.client.web.action.owner;

import java.io.File;
import java.io.IOException;
import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.stereotype.Controller;

import com.etaoguan.wea.annotation.WeaFunction;
import com.etaoguan.wea.annotation.WeaModule;
import com.etaoguan.wea.client.web.action.WOwnerBaseAction;
import com.etaoguan.wea.client.web.service.IWOwnerBannerService;
import com.etaoguan.wea.client.web.vo.ImgNode;
import com.etaoguan.wea.client.web.vo.WOwnerBanner;
import com.etaoguan.wea.common.FileGenRequest;
import com.etaoguan.wea.vo.OwnerBanner;

@WeaModule(mname="企业展示图管理")
@Controller("ownerWOwnerBannerAction")
public class WOwnerBannerAction extends WOwnerBaseAction{
	
	private static final long serialVersionUID = 7795006660848155392L;

	private OwnerBanner ownerBanner;
	
	private ImgNode imgNode;
	
	private File imgFile; 
	
	private String imgFileFileContentType;  
	
    private String imgFileFileName;  

	@Resource(name="wownerBannerService")
	private IWOwnerBannerService iwOwnerBannerService;
	@WeaFunction(fname="查看展示图列表",oname=WeaFunction.Operation.READ)
	@Action(value="wListOwnerBanners",results = { @Result(name = "success", type = "dispatcher",location="/owner/list_ownerbanners.jsp")})
	public String listOwnerBanners() throws IOException {

		return SUCCESS;
	}
	@WeaFunction(fname="查看展示图列表",oname=WeaFunction.Operation.READ)
	@Action(value="wListOwnerBannersData")
	public String listOwnerBannersData() throws IOException {
		List<WOwnerBanner> wownerBannerList = iwOwnerBannerService.getWOwnerBanners(getCurrentOwnerAdmin().getOwnerNum());
		weaResponse.setRespData(wownerBannerList);
		return JSONRESPONSE;
	}
	@WeaFunction(fname="删除展示图",oname=WeaFunction.Operation.DELETE)
	@Action(value="wDelOwnerBanner")
	public String delOwnerBanner() throws IOException {
		String bannerId = getRequestParamValue("bannerId");
		iwOwnerBannerService.delOwnerBanner(Long.parseLong(bannerId));
		return JSONRESPONSE;
	}
	
	@WeaFunction(fname="更新展示图",oname=WeaFunction.Operation.UPDATE)
	@Action(value="wEditOwnerBanner",results = { @Result(name = "success", type = "dispatcher",location="/owner/edit_ownerbanner.jsp")})
	public String editOwner() throws IOException {
		return SUCCESS;
	}
	@WeaFunction(fname="更新展示图",oname=WeaFunction.Operation.UPDATE)
	@Action(value="wSaveEditOwnerBanner")
	public String saveEditOwnerBanner() {
		ownerBanner.setOwnerNum(getCurrentOwnerAdmin().getOwnerNum());
		iwOwnerBannerService.saveOrUpdateOwnerBanner(ownerBanner,imgNode);
		return JSONRESPONSE;
	}
	@WeaFunction(fname="获取展示图信息",oname=WeaFunction.Operation.UPDATE)
	@Action(value="wGetEditOwnerBannerInitData")
	public String getEditOwnerBannerInitData() throws IOException {
		String bannerId = getRequestParamValue("bannerId");
		if(StringUtils.isNotEmpty(bannerId)){
			OwnerBanner ownerBanner = iwOwnerBannerService.getOwnerBanner(Long.parseLong(bannerId));
			weaResponse.setRespData(ownerBanner);
		}
		return JSONRESPONSE;
	}
	@WeaFunction(fname="上传展示图片",oname=WeaFunction.Operation.CREATE)
	@Action(value="wUploadOwnerBannerImg")
	public String uploadOwnerBannerImg() throws IOException {
			String ownerNum = getCurrentOwnerAdmin().getOwnerNum();
			FileGenRequest fileGenRequest =  new FileGenRequest(imgFile,imgFileFileName);
			ImgNode imgNode = iwOwnerBannerService.genOwnerBannerTmpImgFile(fileGenRequest, ownerNum);
			weaResponse.setRespData(imgNode);
		return JSONRESPONSE;
	}
	@WeaFunction(fname="展示图排序",oname=WeaFunction.Operation.UPDATE)
	@Action(value="wExchangeOwnerBannerSequence")
	public String exchangeOwnerBannerSequence() throws IOException {
		String preBannerId = getRequestParamValue("preBannerId");
		String bannerId = getRequestParamValue("bannerId");
		iwOwnerBannerService.updateOwnerBannerSeqence(Long.parseLong(preBannerId), Long.parseLong(bannerId));
		return JSONRESPONSE;
	}
	
	public File getImgFile() {
		return imgFile;
	}

	public void setImgFile(File imgFile) {
		this.imgFile = imgFile;
	}

	public String getImgFileFileContentType() {
		return imgFileFileContentType;
	}

	public void setImgFileFileContentType(String imgFileFileContentType) {
		this.imgFileFileContentType = imgFileFileContentType;
	}

	public String getImgFileFileName() {
		return imgFileFileName;
	}

	public void setImgFileFileName(String imgFileFileName) {
		this.imgFileFileName = imgFileFileName;
	}

	public ImgNode getImgNode() {
		return imgNode;
	}

	public void setImgNode(ImgNode imgNode) {
		this.imgNode = imgNode;
	}

	public OwnerBanner getOwnerBanner() {
		return ownerBanner;
	}

	public void setOwnerBanner(OwnerBanner ownerBanner) {
		this.ownerBanner = ownerBanner;
	}


}

package com.etaoguan.wea.client.web.action.owner;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;

import com.etaoguan.wea.annotation.WeaFunction;
import com.etaoguan.wea.annotation.WeaModule;
import com.etaoguan.wea.client.web.action.WOwnerBaseAction;
import com.etaoguan.wea.client.web.service.IWProdCatService;
import com.etaoguan.wea.client.web.service.IWProductService;
import com.etaoguan.wea.client.web.vo.BatchFlagChange;
import com.etaoguan.wea.client.web.vo.ProdImgNode;
import com.etaoguan.wea.client.web.vo.ProdSearch;
import com.etaoguan.wea.client.web.vo.WPage;
import com.etaoguan.wea.common.FileGenRequest;
import com.etaoguan.wea.common.WeaApplication;
import com.etaoguan.wea.util.Help;
import com.etaoguan.wea.vo.ProdCat;
import com.etaoguan.wea.vo.ProdDiffer;
import com.etaoguan.wea.vo.Product;


@SuppressWarnings("serial")
@WeaModule(mname="产品管理")
@Service("ownerWProdAction") @Scope("prototype")
public class WProdAction extends WOwnerBaseAction{
	
	@Resource(name="wprodCatService")
	private IWProdCatService iwProdCatService;
	
	private ProdSearch prodSearch = new ProdSearch();
	
	private BatchFlagChange batchFlagChange;
	
	private Product product;
	
	private String[] prodNums;
	
	private List<ProdImgNode> prodImgNodes;
	
	private File imgFile; 
	
	private String imgFileFileContentType;  
	
    private String imgFileFileName;  
    
    
	 	private File upload; 
	    private String uploadFileName;  
	    

		public File getUpload() {
			return upload;
		}

		public void setUpload(File upload) {
			this.upload = upload;
		}

		public String getUploadFileName() {
			return uploadFileName;
		}

		public void setUploadFileName(String uploadFileName) {
			this.uploadFileName = uploadFileName;
		}
		
		private final static Log logger = LogFactory.getLog(WProdAction.class);
		
//		@WeaFunction(fname="上传产品图片",oname=WeaFunction.Operation.UPDATE)
		@Action(value="uupp")
		public String hhyy() throws IOException {
			
			String thumbWidth=getRequestParamValue("thumbWidth");
			String ownerNum = "1688b2b-1912298818";
//			String ownerNum = getCurrentOwnerAdmin().getOwnerNum();
			
			FileGenRequest fileGenRequest =  new FileGenRequest(imgFile,imgFileFileName);
			ProdImgNode genProdImgNode = iwProductService.genOwnerProdTmpImgNThumbFile(fileGenRequest, thumbWidth,ownerNum);
			weaResponse.setRespData(genProdImgNode);
			return JSONRESPONSE;
		}
		
		
		
		
		
		
		
		

		@Action(value="wCkeditor")
		public void ckeditor() throws IOException {
				
				 String imgtype = uploadFileName.substring(uploadFileName.lastIndexOf("."));
			        String localhostUrl = "wea_owner_res/"+getCurrentOwnerAdmin().getOwnerNum()+"/";
			        String realPath = WeaApplication.getInstance().getImgSaveAddr().replace("\\", "/");//图片服务器 地址
//			        String realPath=WeaApplication.getInstance().getAppRealPath();//本地 地址
			        String ctxPath = (new StringBuilder(realPath)).append(localhostUrl).toString();
			        File dirPath = new File(ctxPath);
			        if(!dirPath.exists())
			            dirPath.mkdir();
			        uploadFileName = (new StringBuilder(String.valueOf(String.valueOf(Math.random())))).append(imgtype).toString();
			        File uploadFile = new File((new StringBuilder(String.valueOf(ctxPath))).append(uploadFileName).toString());
			        FileCopyUtils.copy(upload, uploadFile);
			        
			        
			
				String v1="<script type=\"text/javascript\">";
		        String callbackUrl = (new StringBuilder(WeaApplication.getInstance().getImgSvrAddr())).append(localhostUrl).append(uploadFileName).toString();
//		        String callbackUrl = (new StringBuilder(getDomainBaseUrl())).append(localhostUrl).append(uploadFileName).toString();
				String callback = getRequestParamValue("CKEditorFuncNum");
				String v2=new StringBuilder("window.parent.CKEDITOR.tools.callFunction(").append(callback).append(",'").append(callbackUrl).append("','')").toString();
				String v3="</script>";
				String responseMsg=v1+v2+v3;
				writeResponse(responseMsg);
				
				
		}
		

	@WeaFunction(fname="公开或隐藏产品",oname=WeaFunction.Operation.UPDATE)
	@Action(value="wBatchUpdateIsPublic")
	public String batchUpdateIsPublic() throws IOException {
		iwProductService.updateBatchIsPublic(batchFlagChange);
		return JSONRESPONSE;
	}

	@Resource(name="wproductService")
	private IWProductService iwProductService;
	@WeaFunction(fname="搜索选择产品",oname=WeaFunction.Operation.READ)
	@Action(value="wListSearchProds",results = { @Result(name = "success", type = "dispatcher",location="/owner/select_prod.jsp")})
	public String listSearchProds() throws IOException {
		return SUCCESS;
	}
	
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@WeaFunction(fname="搜索选择产品",oname=WeaFunction.Operation.READ)
	@Action(value="wListSearchProdsData")
	public String listSearchProdsData() throws IOException {
		prodSearch.setOwnerNum(getCurrentOwnerAdmin().getOwnerNum());
		String chanpin=prodSearch.getChanpin();
		List<Help> lHelps=(List<Help>) getSessionAttribute("prodcp");
		if (lHelps != null && lHelps.size() > 0) {
			for (Help help : lHelps) {
				chanpin+=","+help.getAttribute1();
			}
		}
		if (StringUtils.isNotBlank(chanpin)) {
			
			String[] productNums=chanpin.split(",");
			prodSearch.setProductNums(productNums);
		}
		WPage wpage = iwProductService.listProducts(prodSearch, sortParam, wpagingRequest);
		
		weaResponse.setRows(wpage.getDataList());
		weaResponse.setTotal(wpage.getWpagingNavInfo().getTotalRecNum());
		weaResponse.setRespData(null);
		return JSONRESPONSE;
	}

	@WeaFunction(fname="搜索选择产品详情",oname=WeaFunction.Operation.READ)
	@Action(value="wListSearchCompProds",results = { @Result(name = "success", type = "dispatcher",location="/owner/select_compprod.jsp")})
	public String listSearchCompProds() throws IOException {
		return SUCCESS;
	}
	
	@WeaFunction(fname="获取产品品类信息",oname=WeaFunction.Operation.READ)
	@Action(value="wGetProdDifferData")
	public String getProdDifferData() throws IOException {
		String prodNum = getRequestParamValue("prodNum");
		List<ProdDiffer> prodDiffers  = iwProductService.listProdDiffers(prodNum);
		weaResponse.setRespData(prodDiffers);
		return JSONRESPONSE;
	}
	
	@SuppressWarnings("rawtypes")
	@WeaFunction(fname="搜索选择产品详情",oname=WeaFunction.Operation.READ)
	@Action(value="wListSearchCompProdsData")
	public String listSearchCompProdsData() throws IOException {
		prodSearch.setOwnerNum(getCurrentOwnerAdmin().getOwnerNum());
		WPage wpage = iwProductService.listCompProducts(prodSearch, sortParam, wpagingRequest);
		weaResponse.setRows(wpage.getDataList());
		weaResponse.setTotal(wpage.getWpagingNavInfo().getTotalRecNum());
		weaResponse.setRespData(null);
		return JSONRESPONSE;
	}
	
	@WeaFunction(fname="查看产品列表",oname=WeaFunction.Operation.READ)
	@Action(value="wListProds",results = { @Result(name = "success", type = "dispatcher",location="/owner/list_prods.jsp")})
	public String listProds() throws IOException {

		return SUCCESS;
	}
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@WeaFunction(fname="查看产品列表",oname=WeaFunction.Operation.READ)
	@Action(value="wListProdsData")
	public String listProdsData() throws IOException {
		prodSearch.setOwnerNum(getCurrentOwnerAdmin().getOwnerNum());
		WPage wpage = iwProductService.listProducts(prodSearch, sortParam, wpagingRequest);
		
		List<Product> list = wpage.getDataList();
		try {
			for (Product product : list) {
				String prodCatId = product.getProdCatId();
				ProdCat productName  =iwProdCatService.getProdCatById(prodCatId);
				if (productName != null) {
					product.setProdCatId(productName.getProdCatName());
				}
			}
		} catch (Exception e) {
			System.out.println("********WProdAction********listProdsData()****have an error***");
		}
		
		
		weaResponse.setRows(list);
		weaResponse.setTotal(wpage.getWpagingNavInfo().getTotalRecNum());
		weaResponse.setRespData(null);
		return JSONRESPONSE;
	}
	@SuppressWarnings("rawtypes")
	@WeaFunction(fname="获取产品列表查询条件",oname=WeaFunction.Operation.READ)
	@Action(value="wGetListProdsSearchInitData")
	public String getListProdsSearchInitData() throws IOException {
		String trackKey = this.getClass().getName()+".listProdsData";
		setPageSearchMap(trackKey);
		Map initSearchDataMap = iwProductService.getListProdsSearchInitData(getCurrentOwnerAdmin().getOwnerNum());
		weaResponse.setRespData(initSearchDataMap);
		return JSONRESPONSE;
	}
	
	@WeaFunction(fname="删除产品",oname=WeaFunction.Operation.DELETE)
	@Action(value="wDelProd")
	public String delProd() throws IOException {
		String prodNum = getRequestParamValue("prodNum");
		iwProductService.delProduct(prodNum);
		return JSONRESPONSE;
	}
	
	@WeaFunction(fname="批量删除产品",oname=WeaFunction.Operation.DELETE)
	@Action(value="wBatchDelProd")
	public String batchDelProd() throws IOException {
		iwProductService.delBatchProduct(prodNums);
		return JSONRESPONSE;
	}	
	
	@WeaFunction(fname="更新热卖产品标识",oname=WeaFunction.Operation.UPDATE)
	@Action(value="wBatchUpdateHotFlag")
	public String batchUpdateHotFlag() throws IOException {
		iwProductService.updateBatchHotFlag(batchFlagChange);
		return JSONRESPONSE;
	}
	
	@WeaFunction(fname="更新新品标识",oname=WeaFunction.Operation.UPDATE)
	@Action(value="wBatchUpdateNewFlag")
	public String batchUpdateNewFlag() throws IOException {
		iwProductService.updateBatchNewFlag(batchFlagChange);
		return JSONRESPONSE;
	}
	
	@WeaFunction(fname="更新上架产品标识",oname=WeaFunction.Operation.UPDATE)
	@Action(value="wBatchUpdateShowFlag")
	public String batchUpdateShowFlag() throws IOException {
		iwProductService.updateBatchShowFlag(batchFlagChange);
		return JSONRESPONSE;
	}
	
	@WeaFunction(fname="更新置顶产品标识",oname=WeaFunction.Operation.UPDATE)
	@Action(value="wBatchUpdateTopFlag")
	public String batchUpdateTopFlag() throws IOException {
		iwProductService.updateBatchTopFlag(batchFlagChange);
		return JSONRESPONSE;
	}
	
	@WeaFunction(fname="产品排序",oname=WeaFunction.Operation.UPDATE)
	@Action(value="wExchangeProdSequence")
	public String exchangeProdSequence() throws IOException {
		String preProdNum = getRequestParamValue("preProdNum");
		String prodNum = getRequestParamValue("prodNum");
		iwProductService.updatePosSeqence(preProdNum, prodNum);
		return JSONRESPONSE;
	}
	
	@WeaFunction(fname="编辑产品",oname=WeaFunction.Operation.UPDATE)
	@Action(value="wEditProd",results = { @Result(name = "success", type = "dispatcher",location="/owner/edit_prod.jsp")})
	public String editProd() throws IOException {
		return SUCCESS;
	}
	
	@WeaFunction(fname="编辑产品",oname=WeaFunction.Operation.UPDATE)
	@Action(value="wSaveEditProd")
	public String saveEditProd() throws IOException {
		product.setOwnerNum(getCurrentOwnerAdmin().getOwnerNum());
		iwProductService.saveOrUpdateProduct(product,prodImgNodes);
		return JSONRESPONSE;
	}
	
	@SuppressWarnings("rawtypes")
	@WeaFunction(fname="获取产品信息",oname=WeaFunction.Operation.READ)
	@Action(value="wGetEditProdInitData")
	public String getEditProdInitData() throws IOException {
		String prodNum = getRequestParamValue("prodNum");
		String ownerNum = getCurrentOwnerAdmin().getOwnerNum();
		Map initProdDataMap = iwProductService.getEditProdInitData(ownerNum,prodNum);
		weaResponse.setRespData(initProdDataMap);
		return JSONRESPONSE;
	}

	@WeaFunction(fname="上传产品图片",oname=WeaFunction.Operation.UPDATE)
	@Action(value="wUploadProdImg")
	public String uploadProdImg() throws IOException {
		String thumbWidth=getRequestParamValue("thumbWidth");
		String ownerNum = getCurrentOwnerAdmin().getOwnerNum();
		FileGenRequest fileGenRequest =  new FileGenRequest(imgFile,imgFileFileName);
		ProdImgNode genProdImgNode = iwProductService.genOwnerProdTmpImgNThumbFile(fileGenRequest, thumbWidth,ownerNum);
		weaResponse.setRespData(genProdImgNode);
		return JSONRESPONSE;
	}
	
	public ProdSearch getProdSearch() {
		return prodSearch;
	}

	public void setProdSearch(ProdSearch prodSearch) {
		this.prodSearch = prodSearch;
	}

	public BatchFlagChange getBatchFlagChange() {
		return batchFlagChange;
	}

	public void setBatchFlagChange(BatchFlagChange batchFlagChange) {
		this.batchFlagChange = batchFlagChange;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
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

	public List<ProdImgNode> getProdImgNodes() {
		return prodImgNodes;
	}

	public void setProdImgNodes(List<ProdImgNode> prodImgNodes) {
		this.prodImgNodes = prodImgNodes;
	}

	public String[] getProdNums() {
		return prodNums;
	}

	public void setProdNums(String[] prodNums) {
		this.prodNums = prodNums;
	}



}

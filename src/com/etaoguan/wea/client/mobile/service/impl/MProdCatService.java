package com.etaoguan.wea.client.mobile.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.etaoguan.wea.client.mobile.service.IMProdCatService;
import com.etaoguan.wea.client.mobile.vo.ProdCatHier;
import com.etaoguan.wea.service.impl.ProdCatService;
import com.etaoguan.wea.vo.ProdCat;

@Service("mprodCatService")
public class MProdCatService extends ProdCatService implements IMProdCatService{

	@Override
	public List<ProdCatHier> getProdCatHier(String ownerNum){
		
		List<ProdCatHier> prodCatHiers = new ArrayList<ProdCatHier>();
		List<ProdCat> prodCats = getProdCatsByOwnerNum(ownerNum);
		generateProdCatHier(prodCats,prodCatHiers,iKeyGenService.getRootKey());
		return prodCatHiers;
	}

	private void generateProdCatHier(List<ProdCat> prodCats,List<ProdCatHier> prodCatHiers,String pid){
		
		for(ProdCat prodCat:prodCats){
			if(prodCat.getParentProdCatId().equals(pid)){
				ProdCatHier prodCatHier = new ProdCatHier();
				prodCatHier.setProdCat(prodCat);
				prodCatHiers.add(prodCatHier);
				generateProdCatHier(prodCats,prodCatHier.getChildProdCatHiers(),prodCat.getProdCatId());
			}
		}
	}
	
}

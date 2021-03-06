package com.etaoguan.wea.client.mobile.service.impl;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.etaoguan.wea.client.mobile.service.IMPaymentService;
import com.etaoguan.wea.client.mobile.vo.OrderPay;
import com.etaoguan.wea.client.mobile.vo.PayNav;
import com.etaoguan.wea.common.WeaException;
import com.etaoguan.wea.constant.WeaConstant;
import com.etaoguan.wea.service.IAlipayWapPaymentService;
import com.etaoguan.wea.service.IWechatPaymentService;
import com.etaoguan.wea.wechat.vo.BrandWCPayRequest;

@Service("mpaymentService")
public class MPaymentService implements IMPaymentService{

	@Autowired
	private IAlipayWapPaymentService alipayWapPaymentService;
	
	@Autowired
	private IWechatPaymentService wechatPaymentService;

	@Override
	public PayNav processPayOrder(OrderPay orderPay,String domainBaseUrl) {
		PayNav payNav = new PayNav();;
		switch(orderPay.getPayType()){
		case WeaConstant.PAY_ALIPAY_WAP:
			String form = alipayWapPaymentService.processPay(orderPay.getOrderNum(),domainBaseUrl);
			payNav.setNavType(PayNav.OUTPUT);
			payNav.setNavContent(form);
			break;
		case WeaConstant.PAY_WECHAT:
			String url = wechatPaymentService.getAssembleUrl(orderPay.getOrderNum(), domainBaseUrl);
			payNav.setNavType(PayNav.REDIRECT);
			payNav.setNavContent(url);
			break;
		default:
			break;
		
		}
		return payNav;
	}

	@SuppressWarnings("rawtypes")
	@Override
	public void processAlipayWapResp(Map requestParams) {
		alipayWapPaymentService.processAlipayWapResp(requestParams);
	}

	@Override
	public void processWechatPayResp(HttpServletRequest httpRequest) {
		InputStream  is = null;
		try{
			is = httpRequest.getInputStream();
	        //已HTTP请求输入流建立一个BufferedReader对象
	
	        BufferedReader br = new BufferedReader(new InputStreamReader(is,"UTF-8"));
	
	        //读取HTTP请求内容
	
	        String buffer = null;
	        StringBuffer  sb = new StringBuffer();
	
	        while ((buffer = br.readLine()) != null) {
	
	     	   //Sb就是接收到的xml字符串。
	            sb.append(buffer);
	        }
			wechatPaymentService.saveWechatpayResult(sb.toString());
		}catch(Exception ex){
			ex.printStackTrace();
			throw new WeaException(ex);
		}finally{
			if(is!=null){
				try{
					is.close();
				}catch(Exception ex){
					
				}
			}
		}
		
	}

	@SuppressWarnings("rawtypes")
	@Override
	public BrandWCPayRequest addWechatOrder(Map requestParams, String ip,
			String domainBaseUrl) {
		return wechatPaymentService.addWechatOrder(requestParams, ip, domainBaseUrl);
		
	}
	
	@Override
	public String getWechatAssembleUrl(String orderNum, String domainBaseUrl) {
		return wechatPaymentService.getAssembleUrl(orderNum, domainBaseUrl);
		
	}
}

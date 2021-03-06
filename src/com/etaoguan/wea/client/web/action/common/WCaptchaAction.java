package com.etaoguan.wea.client.web.action.common;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;

import javax.imageio.ImageIO;
import javax.imageio.stream.ImageOutputStream;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.etaoguan.wea.client.web.action.WCommonBaseAction;
import com.google.code.kaptcha.Producer;

/**
 * @author cunli
 *
 */
@SuppressWarnings("serial")
@Service(value = "wcaptchaAction") @Scope("prototype")
public class WCaptchaAction extends WCommonBaseAction{
	@Autowired
	private Producer captchaProducer;
	
	public static final String CAPTCHA_IMAGE_FORMAT = "jpeg";
	
	private ByteArrayInputStream inputStream;
	
	public ByteArrayInputStream getInputStream() {
		return inputStream;
	}
	public void setInputStream(ByteArrayInputStream inputStream) {
		this.inputStream = inputStream;
	}

	
	/**
	 * @return 图片验证码
	 * @throws Exception
	 */
	@Action(value="captchas",results = { @Result(name="success",type="stream",params={"contentType","applicationnd.jpeg", "inputName","inputStream"})})
	public String jcaptcha() throws Exception {
		
		String capText = captchaProducer.createText();
		getSession().setAttribute("REG_CODE", capText.trim());// 图片上的验证码
		
		BufferedImage bi = captchaProducer.createImage(capText);
		 bi.flush();
	        
		  ByteArrayOutputStream bs = new ByteArrayOutputStream();  
		 ImageOutputStream  imOut = ImageIO.createImageOutputStream(bs); 
	             
	            ImageIO.write(bi, "jpeg",imOut); 
	             
	            inputStream= new ByteArrayInputStream(bs.toByteArray()); 
	             
		return SUCCESS;
	}
	
	
	
}

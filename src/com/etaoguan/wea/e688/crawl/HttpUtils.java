package com.etaoguan.wea.e688.crawl;

import java.nio.charset.Charset;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.http.Consts;
import org.apache.http.Header;
import org.apache.http.HeaderElement;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.GzipDecompressingEntity;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;


@SuppressWarnings({"deprecation" })
public class HttpUtils {

	final static Log logger = LogFactory.getLog(HttpUtils.class);
	
	public static String HTTP_USER_AGENT="Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E)";
	
	public static String PAGE_CHARSET = "UTF-8";
	
	public static String URL_ENCODING = "UTF-8";
	
	public static String getEnitiyAsString(HttpEntity entity) throws Exception {
		boolean isGZIP = false;
		String sCharSet = PAGE_CHARSET;
		Header ceheader = entity.getContentEncoding();
		if (ceheader != null) {
			for (HeaderElement element : ceheader.getElements()) {
				if (element.getName().equalsIgnoreCase("gzip")) {
					isGZIP = true;
					break;
				}
			}
		}
		Charset charset = ContentType.getOrDefault(entity).getCharset();
		if(charset!=null&&StringUtils.isNotEmpty(charset.name())){
			sCharSet = charset.name();
		}
		logger.info("PageCharset = "+sCharSet);
		byte[] bytes;
		if(isGZIP){
			bytes = EntityUtils.toByteArray(new GzipDecompressingEntity(entity));
		}else{
			bytes = EntityUtils.toByteArray(entity);
		}
		String outstring = new String(bytes, sCharSet);
		EntityUtils.consume(entity);
		return outstring;
	}

	public static HttpAliResponse submitPostRequestWithParamReturnString(
			DefaultHttpClient httpclient, String url, List<NameValuePair> nvps)
			throws Exception {
		HttpAliResponse httpGuahaoResponse = new HttpAliResponse();
		HttpPost httpost = getHttpPost(url);
		httpost.setEntity(new UrlEncodedFormEntity(nvps, Consts.UTF_8));
		//System.out.println(getRequestEnitiyAsString(httpost.getEntity()));
		HttpResponse response = httpclient.execute(httpost);
		httpGuahaoResponse.setStatusCode(response.getStatusLine().getStatusCode());
		httpGuahaoResponse.setResponseHeaders(response.getAllHeaders());
		httpGuahaoResponse.setResponseHTML(getEnitiyAsString(response.getEntity()));
		httpost.releaseConnection();
		return httpGuahaoResponse;
	}
	public static HttpAliResponse submitPostRequestWithParamReturnString(
			DefaultHttpClient httpclient, String url, String params)
			throws Exception {
		HttpAliResponse httpGuahaoResponse = new HttpAliResponse();
		HttpPost httpost = getHttpPost(url);
		httpost.setEntity(new StringEntity(params,URL_ENCODING));
		//System.out.println(getRequestEnitiyAsString(httpost.getEntity()));
		HttpResponse response = httpclient.execute(httpost);
		httpGuahaoResponse.setStatusCode(response.getStatusLine().getStatusCode());
		httpGuahaoResponse.setResponseHeaders(response.getAllHeaders());
		httpGuahaoResponse.setResponseHTML(getEnitiyAsString(response.getEntity()));
		httpost.releaseConnection();
		return httpGuahaoResponse;
	}
	
	public static HttpAliResponse submitPostRequestNoParamReturnString(
			DefaultHttpClient httpclient, String url)
			throws Exception {
		HttpAliResponse httpGuahaoResponse = new HttpAliResponse();
		HttpPost httpost = getHttpPost(url);
		HttpResponse response = httpclient.execute(httpost);
		httpGuahaoResponse.setStatusCode(response.getStatusLine().getStatusCode());
		httpGuahaoResponse.setResponseHeaders(response.getAllHeaders());
		httpGuahaoResponse.setResponseHTML(getEnitiyAsString(response.getEntity()));
		httpost.releaseConnection();
		return httpGuahaoResponse;
	}
	public static HttpAliResponse submitPostRequestNoParamReturnString(
			DefaultHttpClient httpclient, HttpPost httppost)
			throws Exception {
		HttpAliResponse httpGuahaoResponse = new HttpAliResponse();
		HttpResponse response = httpclient.execute(httppost);
		httpGuahaoResponse.setStatusCode(response.getStatusLine().getStatusCode());
		httpGuahaoResponse.setResponseHeaders(response.getAllHeaders());
		httpGuahaoResponse.setResponseHTML(getEnitiyAsString(response.getEntity()));
		httppost.releaseConnection();
		return httpGuahaoResponse;
	}
	
	public static HttpAliResponse submitPostRequestNoParamReturnBytes(
			DefaultHttpClient httpclient, String url)
			throws Exception {
		HttpAliResponse httpGuahaoResponse = new HttpAliResponse();
		HttpPost httpost = getHttpPost(url);
		HttpResponse response = httpclient.execute(httpost);
		httpGuahaoResponse.setStatusCode(response.getStatusLine().getStatusCode());
		httpGuahaoResponse.setResponseHeaders(response.getAllHeaders());
		httpGuahaoResponse.setResponeBytes(getEnitiyBytes(response.getEntity()));
		httpost.releaseConnection();
		return httpGuahaoResponse;
	}
	
	public static HttpAliResponse submitGetRequestReturnBytes(
			DefaultHttpClient httpclient, String url)
			throws Exception {
		HttpAliResponse httpGuahaoResponse = new HttpAliResponse();
		HttpGet httpget = getHttpGet(url);
		HttpResponse response = httpclient.execute(httpget);
		httpGuahaoResponse.setStatusCode(response.getStatusLine().getStatusCode());
		httpGuahaoResponse.setResponseHeaders(response.getAllHeaders());
		httpGuahaoResponse.setResponeBytes(getEnitiyBytes(response.getEntity()));
		httpget.releaseConnection();
		return httpGuahaoResponse;
	}
	

	
	public static HttpAliResponse submitGetRequestReturnString(DefaultHttpClient httpclient,
			String url) throws Exception {
		HttpAliResponse httpGuahaoResponse = new HttpAliResponse();
		HttpGet httpget = getHttpGet(url);
		HttpResponse response = httpclient.execute(httpget);
//		Header[] allheaders = response.getAllHeaders();
//		for(Header header:allheaders){
//			logger.info(header.getName()+":"+header.getValue());
//		}
		httpGuahaoResponse.setStatusCode(response.getStatusLine().getStatusCode());
		httpGuahaoResponse.setResponseHeaders(response.getAllHeaders());
		httpGuahaoResponse.setResponseHTML(getEnitiyAsString(response.getEntity()));
		httpget.releaseConnection();
		return httpGuahaoResponse;
	}

	public static HttpPost getHttpPost(String url) {
		HttpPost httpost = new HttpPost(url);
		httpost.addHeader("User-Agent",
				HTTP_USER_AGENT);
		httpost.addHeader("Referer", url);
		httpost.addHeader("Accept", "text/html, application/xhtml+xml, */*");
		httpost.addHeader("Accept-Encoding", "gzip, deflate");
		httpost.addHeader("Accept-Language", "zh-CN");
		return httpost;
	}

	public static HttpGet getHttpGet(String url) {
		HttpGet httpget = new HttpGet(url);
		httpget.addHeader("User-Agent",
				HTTP_USER_AGENT);
		httpget.addHeader("Referer", url);
		httpget.addHeader("Accept", "*/*");
		httpget.addHeader("Accept-Encoding", "gzip,deflate");
		httpget.addHeader("Accept-Language", "zh-CN,zh;q=0.8");

		return httpget;
	}
	
	public static String getRequestEnitiyAsString(HttpEntity entity) throws Exception {

		String sCharSet = PAGE_CHARSET;
		Charset charset = ContentType.getOrDefault(entity).getCharset();
		if(charset!=null&&StringUtils.isNotEmpty(charset.name())){
			sCharSet = charset.name();
		}
		byte[] bytes = EntityUtils.toByteArray(entity);
		String outstring = new String(bytes, sCharSet);
		return outstring;
	}
	
	public static byte[] getEnitiyBytes(HttpEntity entity) throws Exception {

		byte[] bytes = EntityUtils.toByteArray(entity);
		EntityUtils.consume(entity);
		return bytes;

	}
	public static String replaceUrlChar(String url){
		url = url.replace(":", "%3A");
		url = url.replace("#", "%23");
		url = url.replace(",", "%2C");
		
		return url;
	}
}

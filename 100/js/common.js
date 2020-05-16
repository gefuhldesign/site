/*****

userAgent

******/
var ua = navigator.userAgent;

function checkOS(){
	//Windows
	if(/win/i.test(ua)){ return 'win'; }
	
	//Mac
	if(/mac/i.test(ua)){ return 'mac'; }
		
	return '';	
}
function checkBR(){
	//Safari
	if(/safari/i.test(ua)){
		if(/version\/3/i.test(ua)){ return 'Safari3'; }
		if(/version\/4/i.test(ua)){ return 'Safari4'; }
		if(/version\/5/i.test(ua)){ return 'Safari5'; }		
	}
	//Firefox
	if(/firefox\/2/i.test(ua)){ return 'ff2'; }
	if(/firefox\/3/i.test(ua)){ return 'ff3'; }
	if(/firefox\/4/i.test(ua)){ return 'ff4'; }
	//IE
	if(/msie 6/i.test(ua)){ return 'ie6'; }
	if(/msie 7/i.test(ua)){ return 'ie7'; }
	if(/msie 8/i.test(ua)){ return 'ie8'; }
	if(/msie 9/i.test(ua)){ return 'ie9'; }
	//Chrome
	if(/chrome\/2/i.test(ua)){ return 'chrome2'; }
	if(/chrome\/3/i.test(ua)){ return 'chrome3'; }
	if(/chrome\/5/i.test(ua)){ return 'chrome5'; }
	//Opera
	if(/opera/i.test(ua)){ return 'Opera'; }
	
	return '';
}
$(document).ready(function(){
	var userOS = checkOS();
	var userBR = checkBR();
	
	$('body').addClass(userOS).addClass(userBR);
});

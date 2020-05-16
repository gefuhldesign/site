var _data;
var map;
var center;
var iconImage;
//クリックの当該マーカー
var iconImageOn;
//クリックの他マーカー
var iconImageOnOther;
var _width;
//マーカーを格納する配列
var iconArr = [];
var nameJa;
var nameEn;
var height;
var mapN;
var mapE;
var lat;
var lng
var index;

jQuery.event.add(window, "load", function(){
	//#########################################################//
	//
	// JSON
	//
	//#########################################################//
	/*if(window.ActiveXObject){
		try{
			httpObj = new ActiveXObject("Msxml2.XMLHTTP");
		}catch(e){
			try{
				httpObj = new ActiveXObject("Microsoft.XMLHTTP");
			}catch(e){
				httpObj = null;
			}
		}
	}else if(window.XMLHttpRequest){
		httpObj = new XMLHttpRequest();
	}else{
		httpObj = null;
	}
	//httpObj = new XMLHttpRequest();
	httpObj.open("get", "./mountain.json", true);
	httpObj.onload = function(){
		data = JSON.parse(this.responseText);
		initialize(data);
	}
	httpObj.send(null);*/
	
	$.getJSON("./mountain.json", function(data){
		initialize(data);
	});
	
});


function initialize(data) {
	_data = data;
	map;
	center = new google.maps.LatLng(38.594682, 136.625573);
	var stylez =
	[
	{
		featureType: "water",
		stylers: [
		{ visibility: "on" },
		{ saturation: -49 },
		{ gamma: 0.4 },
		{ hue: "#00ffd5" },
		{ lightness: 5 }
		]
	},{
		featureType: "landscape.man_made",
		stylers: [
		{ visibility: "off" }
		]
	},{
		featureType: "transit",
		stylers: [
		{ visibility: "off" }
		]
	},{
		featureType: "road",
		stylers: [
		{ visibility: "off" }
		]
	},{
		elementType: "labels",
		stylers: [
		{ visibility: "off" }
		]
	},{
		featureType: "poi",
		stylers: [
		{ visibility: "off" }
		]
	},{
		featureType: "administrative",
		stylers: [
		{ visibility: "off" }
		]
	}
	];
	//#########################################################//
	//
	// GoogleMapの設定
	//
	//#########################################################//
	var mapOptions = {
		zoom: 6,
		center: center,
		navigationControl: false,
		mapTypeControl: false,
		scaleControl: false,
		scrollwheel: false,
		streetViewControl:false
	};
	map = new google.maps.Map(document.getElementById("map"),
		mapOptions);
	
	var styledMapOptions = {
		name: "customStyle"
	}
	
	var originalStyle = new google.maps.StyledMapType(
		stylez, styledMapOptions);
	
	map.mapTypes.set('original', originalStyle);
	map.setMapTypeId('original');
	
	
	//デフォルトのマーカー
	iconImage = new google.maps.MarkerImage("img/point.png",
		new google.maps.Size(8, 8),
		new google.maps.Point(0,0),
		new google.maps.Point(4, 4));
	//クリックの当該マーカー
	iconImageOn = new google.maps.MarkerImage("img/point_red.png",
		new google.maps.Size(26, 37),
		new google.maps.Point(0,0),
		new google.maps.Point(13, 37));
	//クリックの他マーカー
	iconImageOnOther = new google.maps.MarkerImage("img/point_large.png",
		new google.maps.Size(8, 8),
		new google.maps.Point(0,0),
		new google.maps.Point(4, 4));
	
		
	/*全体の横幅*/
	_width = _data.item.length * 30;
	$("nav ul").css("width", _width);
	$("#graph").css("width", _width);
	
	for (var i = 0; i < _data.item.length; i++){
		//各地点をmtLatlngに格納し、マーカーを配置
	 	var mtLatlng = new google.maps.LatLng(_data.item[i].lat, _data.item[i].lng);
	 	var marker = new google.maps.Marker({
			position: mtLatlng, 
			map: map,
			icon: iconImage
		});
		iconArr.push(marker);
		
		//グラフの高さ
		$("<canvas></canvas>").appendTo("#graph").css("height", (_data.item[i].height * 0.21));
		
		//山の名前
		$("<li></li>").text(_data.item[i].nameJa).appendTo("nav ul").click(function(){
			//クリックした山が何番目か
			index = ($("nav ul li").index(this));
			
			dispData(_data);
		});
	}
			
	$('html, body').delay(1500).animate({scrollLeft: _width});

	var _switch = false;
	var timer;
	$("#switch img").click(function(){
		if(_switch == false){
			_switch = true;
			$(this).attr({src:"img/btnAuto_on.png"});

			if(index == undefined || index == 0){
				index = _data.item.length - 1;
			}else if(index < _data.item.length){
				index --;	
			}
			
			dispData(_data);

			timer = setInterval("autoChange(_data)", 5000);
		}else{
			_switch = false;
			$(this).attr({src:"img/btnAuto.png"});
			clearInterval(timer);
		}
	});
}

function autoChange(data){
	var _data = data;
	//インクリメントの場合
	/*if(index < data.item.length){
		index ++;	
	}else{
		index = 0;
	}*/
	//デクリメントの場合
	if(index == undefined || index == 0){
		index = _data.item.length - 1;
	}else if(index < _data.item.length){
		index --;	
	}
	
	dispData(_data);
	
	//クリックに合わせて全体をずらす
	var leftNum;
	if(index == 0){
		leftNum = 0;
	}else{
		leftNum = 30 * index;
	}
	//if(leftNum > -(_width - $(window).width() + 30)){
	/*if((_width - $(window).width()) >= leftNum){
		$('html, body').animate({scrollLeft: leftNum - 60});
	}else{
		//("nav").animate({left: leftNum});
		//$("#graph").animate({left: leftNum});
	}*/
	
	//if((_width - $(window).width()) >= leftNum  && leftNum != 0){
	/*if(leftNum != 0){
		$('html, body').animate({scrollLeft: leftNum - 60});
	}else if(leftNum < ($(window).width()) && leftNum != 0){
		$('html, body').animate({scrollLeft: 0});
	}else{
		$('html, body').animate({scrollLeft: leftNum});
	}*/
	if(leftNum != 0){
		$('html, body').animate({scrollLeft: leftNum - 60});
	}else{
		$('html, body').animate({scrollLeft: leftNum});
	}
}
function dispData(data){
	//山の名前
	for(i = 0; i < data.item.length; i++){
		iconArr[i].setIcon(iconImageOnOther);
	}
	iconArr[index].setIcon(iconImageOn);
	iconArr[index].setAnimation(google.maps.Animation.DROP);
	
	//クリックした山にクラスを付ける
	if($("nav ul li").hasClass("selectName")){
		$("nav ul > li").removeClass("selectName");
	}
	$("nav ul li").eq(index).addClass("selectName");
	
	//クリックした山のグラフにクラスを付ける
	if($("#graph canvas").eq(index).hasClass("select")){
		return false;
	}else if($("#graph canvas").hasClass("select")){
		$("#graph > canvas").removeClass("select");
	}
	$("#graph canvas").eq(index).addClass("select");
	$("#graph canvas").eq(index).css("height", 0);
	$("#graph canvas").eq(index).animate({height: (data.item[index].height * 0.21)});

	//クリックした山の詳細
	$("#detail").css("display", "none");
	$("#detail").fadeIn("slow");
	$("#detail p.place").html(data.item[index].place);
	$("#detail p.nameJa").html(data.item[index].nameJa);
	$("#detail p.nameEn").html(data.item[index].nameEn);
	$("#detail p.height").html(changeFH(data.item[index].height) + "m");
	$("#detail p.mapN").html(changeFH(data.item[index].mapN));
	$("#detail p.mapE").html(changeFH(data.item[index].mapE));

	//クリックした山に合わせてGoogleMapを変化
	map.setZoom(8);
	var newCenter = new google.maps.LatLng(data.item[index].lat, data.item[index].lng);
	//map.setCenter(newCenter);
	map.panTo(newCenter);
}
//JSONの半角英数を全角英数に変更
function changeFH(str){
	var full = new Array("１","２","３","４","５","６","７","８","９","０","Ｎ","Ｅ");
	var half = new Array(1,2,3,4,5,6,7,8,9,0,"N","E");
	var char = str;
		while(char.match(/[0-9]/)){
			for(var count = 0; count < full.length; count++){
				char = char.replace(half[count], full[count]);
			}
		}
	return(char);
}

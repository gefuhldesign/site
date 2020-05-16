jQuery.event.add(window, "load", function(){
	var canvas = document.getElementsByTagName("canvas");
	if(! canvas || ! canvas.getContext){
		return false;
	}
	var ctx = canvas.getContext("2d");
	ctx.beginPath();
	ctx.fillRect(0, 0, 20, 1);
});


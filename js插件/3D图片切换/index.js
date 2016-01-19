window.onload = function() {
	var oStage = document.getElementById('stage');
	var oImgList = document.getElementById('imgList');
	var aLi = oImgList.getElementsByTagName('li');
	var oBtn = document.getElementById('btn');
	var aBtn = oBtn.getElementsByTagName('li');
	var iOneWidth = 25;
	var iAllWidth = oImgList.clientWidth;
	var iNum = iAllWidth/iOneWidth;		//共有多少个li
	var iZIndex = 0;
	var iNow = 0;	//当前执行到哪一个
	var timer = null;
	
	for (var i = 0; i < iNum; i++) {
		var oLi = document.createElement("li");
		oLi.innerHTML = '<a href="#"></a><a href="#"></a><a href="#"></a><a href="#"></a>';
		//以中间位置开始算起，越往左越在下层，越往右也越在下层
		if (i > iNum/2) {
				iZIndex--;
		} else {
			iZIndex++;
		}
		oLi.style.zIndex = iZIndex;
		//调整图片位置
		for (var j = 0; j < oLi.getElementsByTagName('a').length; j++) {
			oLi.getElementsByTagName('a')[j].style.backgroundPosition = (-i*iOneWidth) + "px 0";
		};
		oImgList.appendChild(oLi);
	};

	//每个按钮的点击事件
	for (var i = 0; i < aBtn.length; i++) {
		aBtn[i].onclick = (function(index){
			return function() {
				clearInterval(timer);
				change(index,iNow);
				iNow = index;
				timer = setInterval(function(){
					if (iNow == aBtn.length-1) {
						change(0,iNow);
						iNow = 0;
					} else {
						change(iNow+1,iNow);
						iNow++;
					}
				},5000);
			}
		})(i)
	};

	//定时翻转
	timer = setInterval(function(){
		if (iNow == aBtn.length-1) {
			change(0,iNow);
			iNow = 0;
		} else {
			change(iNow+1,iNow);
			iNow++;
		}
	},5000);

	//执行翻转
	function change(index,iNow) {
		aBtn[iNow].className = "";
		aBtn[index].className = "active";

		for (var i = 0; i < aLi.length; i++) {
			// 通过过渡和延时改变li的翻转实现
			// 其中每翻转过一张图片0.5s（当前图片和翻转图片之间差值的绝对值*0.5）
			// 每个li翻转延时为当前的下标*50ms
			var tCss = "transition:" + 0.5*Math.abs(iNow-index)+"s "+i*50+"ms all;-webkit-transform: translateZ(-180px) rotateX(-" + index*90 + "deg);transform: translateZ(-180px) rotateX(-" + index*90 + "deg);";
			aLi[i].style.cssText += tCss;
		};
	}
}
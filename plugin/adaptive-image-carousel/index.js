window.onload = function() {
	var oBanner = document.getElementById('banner');
	var oImgList = document.getElementById('banner_imgList');
	var aLi = oImgList.getElementsByTagName('li');
	var aImg = oImgList.getElementsByTagName('img');
	var aMenu = document.getElementById('banner_menu').getElementsByTagName('a');

	var imgWidth = aLi[0].offsetWidth;		//图片宽度
	var iNow = 0;
	var iNow2 = 0;
	var timer = null;

	oImgList.style.width = imgWidth * aLi.length + "px";	//设置列表的总宽度

	//使图片始终居中显示
	function beCenter() {
		var winWidth = document.documentElement.clientWidth;	//可视区宽度

		if (winWidth > 1000) {
			for (var i = 0; i < aImg.length; i++) {
				aImg[i].style.left = (winWidth - imgWidth)/2 + "px";
			};
		};
	}
	beCenter();
	//窗口大小变化时执行
	window.onresize = function() {
		beCenter();
	}

	//点击切换图片
	for (var i = 0; i < aMenu.length; i++) {
		aMenu[i].index = i;
		aMenu[i].onclick = function() {
			clearInterval(timer);
			for (var i = 0; i < aMenu.length; i++) {
				aMenu[i].className = "";
			};
			this.className = "active";
			startMove(oImgList,{left : - this.index * imgWidth});
			iNow = this.index;
			iNow2 = this.index;
			timer = setInterval(toRun,3000);
		}
	};

	//定时切换图片
	timer = setInterval(toRun,3000);
	function toRun() {
		if (iNow == aMenu.length - 1) {
			aLi[0].style.position = "relative";
			aLi[0].style.left = aLi.length * imgWidth + "px";
			iNow = 0;
		} else {
			iNow++;
		}

		iNow2++;

		for (var i = 0; i < aMenu.length; i++) {
			aMenu[i].className = "";
		};
		aMenu[iNow].className = "active";
		startMove(oImgList,{left : - iNow2 * imgWidth},function() {
			if(iNow == 0) {
				aLi[0].style.position = 'static';
				oImgList.style.left = 0;
				iNow2 = 0;
			}
		});
	}
}

function startMove(obj,json,endFn){
	clearInterval(obj.timer);
	
	obj.timer = setInterval(function(){
		var bBtn = true;
		
		for (var attr in json) {
			var iCur = 0;
		
			if (attr == 'opacity') {
				if (Math.round(parseFloat(getStyle(obj,attr))*100)==0) {
					iCur = Math.round(parseFloat(getStyle(obj,attr))*100);
				} else {
					iCur = Math.round(parseFloat(getStyle(obj,attr))*100) || 100;
				}	
			} else {
				iCur = parseInt(getStyle(obj,attr)) || 0;
			}
			
			var iSpeed = (json[attr] - iCur)/8;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			if (iCur != json[attr]) {
				bBtn = false;
			}
			
			if (attr == 'opacity') {
				obj.style.filter = 'alpha(opacity=' +(iCur + iSpeed)+ ')';
				obj.style.opacity = (iCur + iSpeed)/100;
			} else {
				obj.style[attr] = iCur + iSpeed + 'px';
			}
		}
		
		if(bBtn){
			clearInterval(obj.timer);
			
			if(endFn){
				endFn.call(obj);
			}
		}
	},30);
}

function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,false)[attr];
	}
}
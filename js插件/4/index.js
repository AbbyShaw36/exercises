window.onload = function() {
	var oImgList = document.getElementById('imgList');
	var oUl = oImgList.getElementsByTagName('ul')[0];
	var aLi = oImgList.getElementsByTagName('li');
	var oNext = document.getElementById('next');

	var oneSize = aLi[0].offsetWidth + 10;
	var iNum = 1;	//每次移动的个数
	var bBtn = true;

	function setWidth() {
		oUl.style.width = aLi.length * oneSize + "px";
	}
	setWidth();

	oNext.onclick = function() {
		if (!bBtn) {
			return;
		} else {
			bBtn = false;
		}

		//复制
		for (var i = 0; i < iNum; i++) {
			var oNode = aLi[i].cloneNode(true);
			oUl.appendChild(oNode);
		};
		setWidth();

		//移动
		startMove(oUl,{left : - iNum * oneSize},function() {
			for (var i = 0; i < iNum; i++) {
				oUl.removeChild(aLi[0]);
				oUl.style.left = 0;
			};
			bBtn = true;
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
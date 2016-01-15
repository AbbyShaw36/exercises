window.onload = function() {
	//获取各个元素
	var oDiv = document.getElementById("imgList");
	var oUl = oDiv.getElementsByTagName("ul")[0];
	var aLi = oUl.getElementsByTagName("li");
	var oLeft = document.getElementById("toLeft");
	var oRight = document.getElementById("toRight");

	var timer = null;	//定时器
	var speed = 10;		//滚动速度

	oUl.innerHTML += oUl.innerHTML;		//将图片列表自我复制
	oUl.style.width = aLi[0].offsetWidth * aLi.length + "px";		//动态设置列表宽度

	timer = setInterval(imgScroll,100);		//定时器

	//向左移动
	oLeft.onmouseover = function() {
		speed = 10;
	}

	//向右移动
	oRight.onmouseover = function() {
		speed = -10;
	}

	//鼠标移入停止滚动
	oUl.onmouseover = function() {
		clearInterval(timer);
	}

	//鼠标移出继续滚动
	oUl.onmouseout = function() {
		timer = setInterval(imgScroll,100);
	}

	function imgScroll() {
		oUl.style.left = oUl.offsetLeft - speed + "px";
		if (oUl.offsetLeft <= -oUl.offsetWidth/2) {
			//当到达中间位置时（即到达原列表的最后一个），移至初始位置
			oUl.style.left = "0px";
		} else if (oUl.offsetLeft > 0) {
			//当左移至初始位置时，移动到中间位置
			oUl.style.left = -oUl.offsetWidth/2 + "px";
		}
	}
}
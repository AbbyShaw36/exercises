window.onload = function() {
	var oStage = document.getElementById('stage');
	var oProgress = document.getElementById('progress');
	var oHover = document.getElementById('hover');
	var aImg = oStage.getElementsByTagName('img');
	var iImgCount = 77;
	var iLoaded = 1;

	//控制展示台在屏幕正中显示
	function position() {
		oStage.style.top = document.documentElement.clientHeight/2 - oStage.offsetHeight/2 + "px";
		oStage.style.left = document.documentElement.clientWidth/2 - oStage.offsetWidth/2 + "px";
	}

	position();
	window.onresize = position;

	//加载图片
	for (var i = 1; i < iImgCount; i++) {
		(function(i){
			var oImg = new Image();

			oImg.src = "img/img (" + i + ").jpg";
			oImg.onload = function() {
				var oNewImg = document.createElement("img");
				var oSpan = oProgress.getElementsByTagName("span")[0];
				var oP = oProgress.getElementsByTagName("p")[0];
				var iprecent = iLoaded/iImgCount;

				oNewImg.src = this.src;
				oNewImg.style.display = "none";
				oStage.appendChild(oNewImg);
				oImg.onload = null;

				oP.innerHTML = oSpan.style.width = Math.ceil(100 * iLoaded/iImgCount) + "%";
				if (++iLoaded == iImgCount) {
					show();
				};
			}
		})(i);
	};

	function show() {
		for (var i = 0; i < iImgCount; i++) {
			if (!aImg[i]) {
				alert("页面加载失败，请刷新重试！");
				return;
			};
		};

		oProgress.style.display = oHover.style.display = "none";

		var lastImg = aImg[0];
		var x = 0;
		var lastX = 0;
		var iSpeed = 0;
		var timer = null;

		document.onmousedown = function(ev) {
			var oEvent = ev || event;
			//减去之前拖动的距离（初始为0），从同一起点开始算起
			var disX = oEvent.clientX - x;

			document.onmousemove = function(ev) {
				var oEvent = ev || event;
				//鼠标拖动的距离
				x = oEvent.clientX - disX;

				move();

				iSpeed = x - lastX;
				lastX = x;

				return false;

			}

			document.onmouseup = function(ev) {
				document.onmousemove = null;
				document.onmouseup = null;

				timer = setInterval(function() {
					x += iSpeed;

					if (iSpeed == 0) {
						clearInterval(timer);
					} else if (iSpeed > 0) {
						iSpeed--;
					} else {
						iSpeed++;
					}

					move();
				},30);
			}

			return false;

			function move() {
				//移动多少像素才变换一张图片，除以10使移动速度放慢（即移动10个像素才换1张图片）
				var num = -parseInt((x)/10);

				//处理当num超过77时返回0，为负数时转为正数
				if (num > 0) {
					num = num % iImgCount;
				} else {
					num = num - Math.floor(num/iImgCount) * iImgCount;
				}

				//旋转，即切换图片
				if (lastImg != aImg[num]) {
					lastImg.style.display = "none";
					aImg[num].style.display = "block";
					lastImg = aImg[num];
				};
			}
		}
	}
}
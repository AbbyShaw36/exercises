window.onload = function() {
	var oImgList = document.getElementById('imgList');
	var oLoader = document.getElementById('loader');
	var iWidth = 200;	//图片宽度
	var iSpace = 10;	//图片间隔
	var iOuterWidth = iWidth + iSpace;		//列实际宽度
	var iCell = 0;		//列数
	var arrL = [];
	var arrT = [];
	var bBtn = true;

	//计算列数
	function getCell() {
		iCell = Math.floor(document.documentElement.clientWidth/iOuterWidth);
		oImgList.style.width = iCell * iOuterWidth - iSpace + "px";
	}
	getCell();

	for (var i = 0; i < iCell; i++) {
		arrL[i] = iOuterWidth * i;
		arrT[i] = 0;
	};

	function getImgRequest() {
		if (!bBtn) {
			return;
		};
		bBtn = false;
		oLoader.style.display = "block";
		var request = createRequest();
		if (request == null) {
			alert("Unable to create request!");
		} else {
			var url = "index.php";
			request.onreadystatechange = showImg;
			request.open("GET",url,true);
			request.send(null);
		}
	}
	getImgRequest();

	function showImg() {
		if (request.readyState == 4 && request.status == 200) {
			var data = JSON.parse(request.responseText);
			for (var i in data) {
				var obj = data[i];
				var oImg = document.createElement("img");
				var iHeight = iWidth/obj['width'] * obj['height'];
				oImg.style.cssText = "width:" + iWidth + "px;height:" + iHeight + "px";
				oImg.src = obj["src"];

				var _index = getMin();
				oImg.style.cssText += "left:" + arrL[_index] + "px;top:" + arrT[_index] + "px";

				arrT[_index] += iHeight + 10;

				oImgList.appendChild(oImg);
			};
			var maxIndex = getMax();
			oImgList.style.height = arrT[maxIndex] + "px";
			oLoader.style.display = "none";
			bBtn = true;
		};
	}

	window.onscroll = function() {
		if (arrT[getMin()] < document.documentElement.clientHeight + document.body.scrollTop + document.documentElement.scrollTop) {
			getImgRequest();
		};
	}

	function getMin() {
		var v = arrT[0];
		var _index = 0;

		for (var i = 0; i < arrT.length; i++) {
			if (arrT[i] < v) {
				v = arrT[i];
				_index = i;
			};
		};

		return _index;
	}

	function getMax() {
		var v = arrT[0];
		var _index = 0;

		for (var i = 0; i < arrT.length; i++) {
			if (arrT[i] > v) {
				v = arrT[i];
				_index = i;
			}
		};

		return _index;
	}

	window.onresize = function() {
		var oldCell = iCell;
		getCell();
		if (iCell == oldCell) {
			return;
		};
		arrT = [];
		arrL = [];
		for (var i = 0; i < iCell; i++) {
			arrT[i] = 0;
			arrL[i] = i * iOuterWidth;
		};
		var oImgs = oImgList.getElementsByTagName('img');
		for (var i in oImgs) {
			if (typeof oImgs[i] != "object") {
				continue;
			};
			var _index = getMin();
			oImgs[i].style.left = arrL[_index] + "px";
			oImgs[i].style.top = arrT[_index] + "px";
			arrT[_index] += oImgs[i].offsetHeight + 10;
		};
	};
}

function createRequest() {
	try {
		request = new XMLHttpRequest();
	} catch (tryMS) {
		try {
			request = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (otherMS) {
			try {
				request = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (failed) {
				request = null;
			}
		}
	}
	return request;
}
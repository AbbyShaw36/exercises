window.onload = function() {
	var oShow = document.getElementById('show');
	var oSmall = getByClass(oShow,"smallImg")[0];
	var oHover = getByClass(oShow,"hover")[0];
	var oPiece = getByClass(oShow,"piece")[0];
	var oBig = getByClass(oShow,"bigImg")[0];
	var oBigImg = oBig.getElementsByTagName('img')[0];

	//移入显示
	oHover.onmouseover = function() {
		oPiece.style.display = "block";
		oBig.style.display = "block";
	}

	//移出隐藏
	oHover.onmouseout = function() {
		oPiece.style.display = "none";
		oBig.style.display = "none";
	}

	oHover.onmousemove = function(ev) {
		var oEvent = ev || event;
		var l = oEvent.clientX - oPiece.offsetWidth/2;
		var t = oEvent.clientY - oPiece.offsetHeight/2;

		//将小方块锁定在小图片的范围内
		if (l <= 0) {
			l = 0;
		} else if (l >= oSmall.offsetWidth - oPiece.offsetWidth) {
			l = oSmall.offsetWidth - oPiece.offsetWidth;
		}

		if (t <= 0) {
			t = 0;
		} else if (t >= oSmall.offsetHeight - oPiece.offsetHeight) {
			t = oSmall.offsetHeight - oPiece.offsetHeight;
		}

		//确定消方块的位置
		oPiece.style.left = l + "px";
		oPiece.style.top = t + "px";

		var iPercentX = l/(oSmall.offsetWidth - oPiece.offsetWidth);
		var iPercentY = t/(oSmall.offsetHeight - oPiece.offsetHeight);

		//确定大图片的显示位置
		oBigImg.style.left = -(oBigImg.offsetWidth - oSmall.offsetWidth) * iPercentX + "px";
		oBigImg.style.top = -(oBigImg.offsetHeight - oSmall.offsetHeight) * iPercentY + "px";

		//将鼠标显示为十字
		this.style.cursor = "crosshair";
	}
}

function getByClass(oParent,sClass) {
	var aTags = oParent.getElementsByTagName('*');
	var arr = [];

	for (var i = 0; i < aTags.length; i++) {
		if (aTags[i].className == sClass) {
			arr.push(aTags[i]);
		};
	};

	return arr;
}
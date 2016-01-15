window.onload = function() {
	var oPage = document.getElementById("page");
	page({
		id: 'pageList',
		nowPage: 4,
		allPage: 10,
		callBack: function(now,all) {
			oPage.innerHTML = "当前页：" + now + "，总页数：" + all;
		}
	});
}

function page(opt) {
	if (opt.id) {
		var obj = document.getElementById(opt.id);
	} else {
		return false;
	}

	var nowPage = opt.nowPage || 1;
	var allPage = opt.allPage || 5;
	var callBack = opt.callBack || function() {};

	callBack(nowPage,allPage);

	// 添加“首页”
	if (nowPage >= 4 && allPage > 5) {
		var oA = document.createElement("a");
		oA.href = "#1";
		oA.innerHTML = "首页";
		obj.appendChild(oA);
	};

	//添加“上一页”
	if (nowPage > 1) {
		var oA = document.createElement("a");
		oA.href = '#' + (nowPage - 1);
		oA.innerHTML = "上一页";
		obj.appendChild(oA);
	};

	//添加中间5个页数
	if (allPage <= 5) {
		for (var i = 1; i <= allPage; i++) {
			var oA = document.createElement("a");
			oA.href = "#" + i;

			if (i == nowPage) {
				oA.innerHTML = i;
			} else{
				oA.innerHTML = '[' + i + ']';
			};

			obj.appendChild(oA);
		};
	} else {
		for (var i = 1; i <= 5; i++) {
			var oA = document.createElement("a");

			if (nowPage <= 2) {
				oA.href = '#' + i;

				if (i == nowPage) {
					oA.innerHTML = i;
				} else {
					oA.innerHTML = '[' + i + ']';
				}
			} else if ((allPage - nowPage) <= 1){
				oA.href = '#' + (allPage - 5 + i);

				if ((allPage - 5 + i) == nowPage) {
					oA.innerHTML = nowPage;
				} else {
					oA.innerHTML = '[' + (allPage - 5 + i) + ']';
				}
			} else {
				oA.href = '#' + (nowPage - 3 + i);

				if (i == 3) {
					oA.innerHTML = nowPage - 3 + i;
				} else{
					oA.innerHTML = '[' + (nowPage - 3 + i) + ']';
				};
			};

			obj.appendChild(oA);
		};
	}

	// 添加“下一页”
	if (nowPage < allPage) {
		var oA = document.createElement("a");
		oA.href = '#' + (nowPage + 1);
		oA.innerHTML = "下一页";
		obj.appendChild(oA);
	};

	// 添加“尾页”
	if (nowPage <= (allPage - 3)) {
		var oA = document.createElement("a");
		oA.href = "#" + allPage;
		oA.innerHTML = "尾页";
		obj.appendChild(oA);
	};

	//点击换页事件
	var aA = obj.getElementsByTagName('a');
	for (var i = 0; i < aA.length; i++) {
		aA[i].onclick = function() {
			var nowPage = parseInt(this.getAttribute('href').substring(1));
			obj.innerHTML = "";
			page({
				id: opt.id,
				nowPage: nowPage,
				allPage: allPage,
				callBack: callBack
			});

			return false;
		}
	};
}
window.onload = function() {
	var oCalendar = document.getElementById('calendar');

	var oDate = new Date();
	var iYear = oDate.getFullYear();
	var iMonth = oDate.getMonth() + 1;

	showDate(oCalendar,iYear,iMonth,true);
}

function showDate(obj,year,month,bBtn) {
	//判断是否有创建过，使该部分内容（静态内容）只创建一次
	if (bBtn) {
		//创建table标签
		var oTable = document.createElement("table");

		//创建caption标签
		var oCaption = document.createElement("caption");
		oTable.appendChild(oCaption);

		//创建thead部分
		var oThead = document.createElement("thead");
		var oTr = document.createElement("tr");
		var arr = ['一','二','三','四','五','六','日'];
		var oFrag = document.createDocumentFragment();

		for (var i = 0; i < 7; i++) {
			var oTh = document.createElement("th");
			if (i == 5 || i == 6) {
				oTh.className = "red";
			};
			oTh.innerHTML = arr[i];
			oFrag.appendChild(oTh);
		};

		oTr.appendChild(oFrag);
		oThead.appendChild(oTr);
		oTable.appendChild(oThead);

		//创建tbody部分
		var oTbody = document.createElement("tbody");

		for (var i = 0; i < 6; i++) {
			var oTr = document.createElement("tr");
			for (var j = 0; j < 7; j++) {
				var oTd = document.createElement("td");
				oTr.appendChild(oTd);
			};
			oTbody.appendChild(oTr);
		};
		oTable.appendChild(oTbody);

		//最后将所有标签都添加到页面中
		obj.appendChild(oTable);
	}

	//添加caption中的内容
	var oTitle = obj.getElementsByTagName('caption')[0];
	oTitle.innerHTML = '<span class="l">< '+(month == 1 ? 12 : month - 1)+'月</span><span>'+year+'年'+month+'月</span><span class="r">'+(month == 12 ? 1 : month + 1)+'月 ></span>';

	var oDate = new Date();
	var dayNum = 0;		//该月（即显示）的天数

	if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
		dayNum = 31;
	} else if (month == 4 || month == 6 || month == 9 || month == 11) {
		dayNum = 30;
	} else if (month == 2 && isLeapYear(year)) {
		dayNum = 29;
	} else {
		dayNum = 28;
	}

	var aTd = obj.getElementsByTagName('td');
	var startDay = 0;	//开始填入的空

	//每次填入之前，先将之前的内容清除
	for (var i = 0; i < aTd.length; i++) {
		aTd[i].innerHTML = "";
		aTd[i].className = "";
	};

	oDate.setFullYear(year);
	oDate.setMonth(month - 1);
	oDate.setDate(1);

	if (oDate.getDay() == 0) {
		startDay = 6;
	} else{
		startDay = oDate.getDay() - 1;
	};

	oDate = new Date();
	var todayY = oDate.getFullYear();
	var todayM = oDate.getMonth();
	var todayD = oDate.getDate();

	for (var i = 0; i < dayNum; i++) {
		//如果是今天，显示为红色字体
		if (year == todayY && month == todayM + 1 && i == todayD - 1) {
			aTd[startDay].className = "red";
		}
		aTd[startDay].innerHTML = i + 1;
		startDay++;
	};

	//前一个月和后一个月的点击事件
	var oL = getByClass(obj,'l')[0];
	var oR = getByClass(obj,'r')[0];

	oL.onclick = function() {
		if (month == 1) {
			showDate(obj,year-1,12);
		} else{
			showDate(obj,year,month-1);
		};
	}

	oR.onclick = function() {
		if (month == 12) {
			showDate(obj,year+1,1);
		} else{
			showDate(obj,year,month+1);
		};
	}

	//删除空白行
	var aTr = obj.getElementsByTagName('tr');
	for (var i = 0; i < aTr.length; i++) {
		var aTd = aTr[i].getElementsByTagName('td');
		if (aTd.length != 0 && aTd[0].innerHTML == "" && aTd[6].innerHTML == "") {
			aTr[i].style.display = "none";
		} else {
			aTr[i].style.display = "table-row";
		}
	};
}

function isLeapYear(year) {
	if ((year % 4 == 0) && ((year % 100 == 0)||(year % 400 == 0))) {
		return true;
	} else {
		return false;
	}
}

function getByClass(oParent,sClass) {
	var aEle = oParent.getElementsByTagName("*");
	var result = [];
	var re = new RegExp('\\b' + sClass + '\\b','i');

	for (var i = 0; i < aEle.length; i++) {
		if (re.test(aEle[i].className)) {
			result.push(aEle[i]);
		}
	};

	return result;
}
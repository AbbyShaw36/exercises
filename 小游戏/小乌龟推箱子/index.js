window.onload = function() {
	var oStage = document.getElementById('stage');
	Game.init(oStage);
}

var Game = {
	// 关卡
	gk : [
		{
			map : [
				1,1,2,2,2,2,1,1,
				1,1,2,3,3,2,1,1,
				1,2,2,0,3,2,2,1,
				1,2,0,0,0,3,2,1,
				2,2,0,0,0,0,2,2,
				2,0,0,2,0,0,0,2,
				2,0,0,0,0,0,0,2,
				2,2,2,2,2,2,2,2
			],
			box : [
				{x:4,y:3},
				{x:3,y:4},
				{x:4,y:5},
				{x:5,y:5}
			],
			person : {x:3,y:6}
		},
		{
			map : [
				1,1,1,1,2,2,2,2,2,2,2,1,
				1,1,1,1,2,0,0,2,0,0,2,1,
				1,1,1,1,2,0,0,0,0,0,2,1,
				2,2,2,2,2,0,0,2,0,0,2,1,
				3,3,3,2,2,2,0,2,0,0,2,2,
				3,0,0,2,0,0,0,0,2,0,0,2,
				3,0,0,0,0,0,0,0,0,0,0,2,
				3,0,0,2,0,0,0,0,2,0,0,2,
				3,3,3,2,2,2,0,2,0,0,2,2,
				2,2,2,2,2,0,0,0,0,0,2,1,
				1,1,1,1,2,0,0,2,0,0,2,1,
				1,1,1,1,2,2,2,2,2,2,2,1
			],
			box : [
				{x : 5 , y : 6},
				{x : 6 , y : 3},
				{x : 6 , y : 5},
				{x : 6 , y : 7},
				{x : 6 , y : 9},
				{x : 7 , y : 2},
				{x : 8 , y : 2},
				{x : 9 , y : 6},
			],
			person : { x : 5 , y : 9 }
		}
	],
	//初始化
	init : function(oParent) {
		this.oParent = oParent;
		this.iNow = 0;		//当前关数
		this.createMap();
	},
	//创建地图
	createMap: function() {
		if (this.iNow == this.gk.length) {
			alert("You win!");
			return;
		};

		var map = this.gk[this.iNow]['map'];
		document.title = "小乌龟推箱子-第" + (this.iNow+1) + "关";
		this.oParent.innerHTML = "";
		this.oParent.style.width = Math.sqrt(map.length) * 50 + "px";

		for (var i = 0; i < map.length; i++) {
			var oDiv = document.createElement("div");
			oDiv.className = "pos" + map[i];
			this.oParent.appendChild(oDiv);
		};

		this.createBox();
		this.createPerson();
	},
	//创建箱子
	createBox : function() {
		var box = this.gk[this.iNow]['box'];
		this.aBoxs = [];
		for (var i = 0; i < box.length; i++) {
			var oDiv = document.createElement("div");
			var top = box[i].y * 50;
			var left = box[i].x * 50;
			oDiv.className = "box";
			oDiv.style.cssText = "top:" + top + "px; left:" + left + "px;";
			this.oParent.appendChild(oDiv);
			this.aBoxs.push(oDiv);
		};
	},
	//创建人物
	createPerson : function() {
		var person = this.gk[this.iNow]['person'];
		var oDiv = document.createElement("div");
		var top = person.y * 50;
		var left = person.x * 50;
		oDiv.className = "person";
		oDiv.style.cssText = "top:" + top + "px; left:" + left + "px;";
		this.oParent.appendChild(oDiv);
		this.person = oDiv;
		this.personX = person.x;
		this.personY = person.y;
		this.bindPerson();
	},
	// 操作人物
	bindPerson : function() {
		var This = this;
		document.onkeydown = function(ev) {
			var keyNum = window.event ? ev.keyCode : ev.which;
			switch(keyNum) {
				case 37 :    //←
					This.person.style.backgroundPosition = "-150px 0";
					This.movePerson({x:-1});
					break;
				case 38 :    //上
					This.person.style.backgroundPosition = "0 0";
					This.movePerson({y:-1});
					break;
				case 39 :    //→
					This.person.style.backgroundPosition = "-50px 0";
					This.movePerson({x:1});
					break;
				case 40 :    //下
					This.person.style.backgroundPosition = "-100px 0";
					This.movePerson({y:1});
					break;
			}
		}
	},
	// 移动人物
	movePerson : function(opt) {
		var x = opt.x || 0;
		var y = opt.y || 0;
		//判断前方是否为墙
		if (this.gk[this.iNow].map[(this.personY+y) * Math.sqrt(this.gk[this.iNow]["map"].length)+(this.personX+x)] != 2) {
			this.person.style.top = ((this.personY+y) * 50) + "px";
			this.person.style.left = ((this.personX+x) * 50) + "px";
			this.personX += x;
			this.personY += y;

			for (var i = 0; i < this.aBoxs.length; i++) {
				//判断前方是否有箱子，并且箱子前边是否为墙
				if (this.pz(this.person,this.aBoxs[i]) && this.gk[this.iNow].map[(this.personY+y) * Math.sqrt(this.gk[this.iNow]["map"].length)+(this.personX+x)] != 2) {
					this.aBoxs[i].style.top = ((this.personY+y) * 50) + "px";
					this.aBoxs[i].style.left = ((this.personX+x) * 50) + "px";

					for (var j = 0; j < this.aBoxs.length; j++) {
						//判断箱子前方是否有其他箱子
						if (this.pz(this.aBoxs[i],this.aBoxs[j]) && this.aBoxs[j] != this.aBoxs[i]) {
							this.aBoxs[i].style.top = ((this.personY) * 50) + "px";
							this.aBoxs[i].style.left = ((this.personX) * 50) + "px";
							
							this.person.style.top = ((this.personY-y) * 50) + "px";
							this.person.style.left = ((this.personX-x) * 50) + "px";
							this.personX -= x;
							this.personY -= y;
						};
					};
				} else if (this.pz(this.person,this.aBoxs[i])) {
					this.person.style.top = ((this.personY-y) * 50) + "px";
					this.person.style.left = ((this.personX-x) * 50) + "px";
					this.personX -= x;
					this.personY -= y;
				}
			};
		};

		this.checkWin();
	},
	// 检查碰撞
	pz : function(obj1,obj2) {
		var L1 = obj1.offsetLeft;
		var R1 = obj1.offsetLeft + obj1.clientWidth;
		var T1 = obj1.offsetTop;
		var B1 = obj1.offsetTop + obj1.clientHeight;

		var L2 = obj2.offsetLeft;
		var R2 = obj2.offsetLeft + obj2.clientWidth;
		var T2 = obj2.offsetTop;
		var B2 = obj2.offsetTop + obj2.clientHeight;

		if (L1 >= R2 || R1 <= L2 || T1 >= B2 || B1 <= T2) {
			return false;
		} else{
			return true;
		};
	},
	// 检查是否过关
	checkWin : function() {
		var iNum = 0;
		var aRedDiv = getByClass(this.oParent,"pos3");

		for (var i = 0; i < aRedDiv.length; i++) {
			for (var j = 0; j < this.aBoxs.length; j++) {
				if (this.pz(aRedDiv[i],this.aBoxs[j])) {
					iNum++;
				};
			};
		};
		if (iNum == aRedDiv.length) {
			this.iNow++;
			this.createMap();
		};
	}
}

function getByClass(oParent,className) {
	var arr = oParent.getElementsByTagName('*');
	var result = [];

	for (var i = 0; i < arr.length; i++) {
		if (arr[i].className == className) {
			result.push(arr[i]);
		};
	};

	return result;
}
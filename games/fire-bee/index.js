window.onload = function() {
	var oGame = document.getElementById('game');
	var oBtn = document.getElementById('btn');
	oBtn.onclick = function() {
		this.style.display = "none";
		Game.init(oGame);
	}
}

var Game = {
	oEnemy : {   //敌人的数据
		e1 : {style:'enemy1',blood:1,speed:5,score:1},
		e2 : {style:'enemy2',blood:2,speed:7,score:2},
		e3 : {style:'enemy3',blood:3,speed:10,score:3}
	},
	gk : [  //关卡的数据
		{
			eMap : [
				'e2','e2','e2','e2','e2','e2','e2','e2','e2','e2',
				'e2','e2','e2','e2','e2','e2','e2','e2','e2','e2',
				'e2','e2','e2','e2','e2','e2','e2','e2','e2','e2',
				'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
				'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
				'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1'
			],
			colNum : 10,	// 每行的蜜蜂个数
			iSpeedX : 10,	// 蜂群水平移动距离
			iSpeedY : 10,	// 蜂群竖直移动距离
			times : 2000	// 随机蜜蜂个体攻击相隔时间
		},
		{
			eMap : [
				'e3','e3','e3','e3','e3','e3','e3','e3','e3','e3',
				'e3','e3','e3','e3','e3','e3','e3','e3','e3','e3',
				'e3','e3','e3','e3','e3','e3','e3','e3','e3','e3',
				'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
				'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
				'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1'
			],
			colNum : 10,
			iSpeedX : 10,
			iSpeedY : 10,
			times : 2000
		}
	],
	air : {  //飞机的数据
		style : 'air1',
		bulletStyle : 'bullet'
	},
	init : function(obj) {    //初始化
		this.oParent = obj;
		this.gkNum = 0;

		this.createScore();
		this.createBee();
		this.createAir();
	},
	createScore : function() {    //创建得分
		var oScore = document.createElement("div");
		oScore.id = "score";
		oScore.innerHTML = "得分：<span>0</span>";
		this.oParent.appendChild(oScore);
		this.oScore = oScore.getElementsByTagName('span')[0];
	},
	createBee : function() {    //创建蜜蜂群
		//如果已经到达最后一关，则胜利
		if (this.gkNum == this.gk.length) {
			alert("You win!");
			return;
		};

		//每次创建前将之前创建的清空
		if (this.oBee) {
			this.oParent.removeChild(this.oBee);
			clearInterval(this.oBee.timer);
		};

		//蜜蜂群体
		var oBee = document.createElement("ul");
		oBee.id = "bee";

		//循环创建蜜蜂个体，每个个体都携带各自的属性
		var map = this.gk[this.gkNum]["eMap"];
		for (var i = 0; i < map.length; i++) {
			var oLi = document.createElement("li");
			oLi.className = this.oEnemy[map[i]]["style"];
			oLi.blood = this.oEnemy[map[i]]["blood"];
			oLi.speed = this.oEnemy[map[i]]["speed"];
			oLi.score = this.oEnemy[map[i]]["score"];
			oBee.appendChild(oLi);
		};
		this.oParent.appendChild(oBee);

		var arr = [];
		var aLi = oBee.getElementsByTagName('li');

		// 确定蜜蜂群体的宽度以及初始位置
		oBee.style.width = this.gk[this.gkNum]['colNum'] * aLi[0].offsetWidth + "px";
		oBee.style.left = (this.oParent.offsetWidth - oBee.offsetWidth)/2 + "px";

		//将蜂群个体改为绝对定位
		for (var i = 0; i < aLi.length; i++) {
			arr.push([aLi[i].offsetLeft,aLi[i].offsetTop]);
		};

		for (var i = 0; i < aLi.length; i++) {
			aLi[i].style.position = "absolute";
			aLi[i].style.left = arr[i][0] + "px";
			aLi[i].style.top = arr[i][1] + "px";
		};

		this.oBee = oBee;
		this.aLi = aLi;
		this.moveBee();
	},
	moveBee : function() {    //移动蜂群
		var This = this;

		This.oBee.timer = setInterval(function(){
			var left = This.oBee.offsetLeft;
			var top = This.oBee.offsetTop;
			var speedX = This.gk[This.gkNum]['iSpeedX'];
			var speedY = This.gk[This.gkNum]['iSpeedY'];

			//当蜂群到达左右边框时，回弹并向下移动
			if (left <= 0 || left >= This.oParent.offsetWidth - This.oBee.offsetWidth) {
				speedX = -speedX;
				This.gk[This.gkNum]['iSpeedX'] = speedX;
				This.oBee.style.top = top + speedY + "px";
			}

			This.oBee.style.left = left + speedX + "px";
		},200);

		setInterval(function(){
			This.oneMove();
		},This.gk[This.gkNum].times);
	},
	oneMove : function() {		//单兵作战
		// 随机选取一个蜜蜂
		var nowLi = this.aLi[Math.floor(Math.random()*this.aLi.length)];
		var This = this;

		nowLi.timer = setInterval(function(){
			var a = (This.oAir.offsetLeft + This.oAir.offsetWidth/2) - (nowLi.offsetLeft + This.oBee.offsetLeft + nowLi.offsetWidth);
			var b = (This.oAir.offsetTop + This.oAir.offsetHeight/2) - (nowLi.offsetTop + This.oBee.offsetTop + nowLi.offsetHeight);
			var c = Math.sqrt(a*a + b*b);

			var speedX = nowLi.speed * a/c;
			var speedY = nowLi.speed * b/c;

			nowLi.style.left = nowLi.offsetLeft + speedX + "px";
			nowLi.style.top = nowLi.offsetTop + speedY + "px";

			if (This.pz(nowLi,This.oAir)) {
				alert("游戏结束");
				window.location.reload();
			};
		},30);

	},
	createAir : function() {    //创建飞机
		var oAir = document.createElement("div");
		oAir.className = this.air["style"];
		oAir.bulletStyle = this.air['bulletStyle'];

		this.oParent.appendChild(oAir);
		this.oAir = oAir;

		oAir.style.left = (this.oParent.offsetWidth - oAir.offsetWidth)/2 + "px";
		oAir.style.top = this.oParent.offsetHeight - oAir.offsetHeight + "px";

		this.moveAir();
	},
	moveAir : function() {    //操作飞机
		var key = 0;
		var timer = null;
		var This = this;

		document.onkeydown = function(ev) {
			var keyNum = window.event ? ev.keyCode : ev.which;

			if (!timer) {
				timer = setInterval(move,30);
			}

			if (keyNum == 37) {		// ←
				key = 1;
			} else if (keyNum == 39){	// →
				key = 2;
			};
		}

		document.onkeyup = function(ev) {
			var keyNum = window.event ? ev.keyCode : ev.which;
			clearInterval(timer);
			key = 0;
			timer = null;

			if (keyNum == 32) {		//空格（发射）
				This.createBullet();
			};
		}

		function move() {
			var left = This.oAir.offsetLeft;

			// 移动
			if (key == 1) {
				left = left - 10;
			} else if (key == 2){
				left = left + 10;
			};

			// 控制飞机不出左右边框
			if (left < 0) {
				left = 0;
			} else if (left > This.oParent.offsetWidth - This.oAir.offsetWidth) {
				left = This.oParent.offsetWidth - This.oAir.offsetWidth;
			};

			This.oAir.style.left = left + "px";
		}
	},
	createBullet : function() {		// 创建子弹
		var oBullet = document.createElement("div");
		oBullet.className = this.oAir.bulletStyle;
		this.oParent.appendChild(oBullet);
		oBullet.style.left = this.oAir.offsetLeft + this.oAir.offsetWidth/2 - oBullet.offsetWidth/2 + "px";
		oBullet.style.top = this.oAir.offsetTop - oBullet.offsetHeight + "px";
		this.moveBullet(oBullet);
	},
	moveBullet : function(oBullet) {	//子弹移动
		var This = this;
		oBullet.timer = setInterval(function(){
			var T = oBullet.offsetTop - 10;

			// 如果已经移出上边框，则将其删除，否则继续移动
			if (T <= -oBullet.offsetHeight) {
				clearInterval(oBullet.timer);
				oBullet.parentNode.removeChild(oBullet);
			} else {
				oBullet.style.top = T + "px";
			}

			//检查子弹与蜜蜂是否碰撞，碰撞减蜜蜂血量（blood值），血量为0时将蜜蜂删除
			for (var i = 0; i < This.aLi.length; i++) {
				if (This.pz(This.aLi[i],oBullet)) {
					clearInterval(oBullet.timer);
					This.oParent.removeChild(oBullet);

					if (This.aLi[i].blood == 1) {
						This.oScore.innerHTML = parseInt(This.oScore.innerHTML) + This.aLi[i].score;
						clearInterval(This.aLi[i].timer);
						This.oBee.removeChild(This.aLi[i]);
						This.checkWin();
					} else {
						This.aLi[i].blood--;
					}
				};
			};
		},30)
	},
	pz : function(obj1,obj2) {		//碰撞，obj1为蜜蜂
		var L1 = obj1.offsetLeft + obj1.parentNode.offsetLeft;
		var R1 = L1 + obj1.offsetWidth;
		var T1 = obj1.offsetTop + obj1.parentNode.offsetTop;
		var B1 = T1 + obj1.offsetHeight;

		var L2 = obj2.offsetLeft;
		var R2 = L2 + obj1.offsetWidth;
		var T2 = obj2.offsetTop;
		var B2 = T2 + obj1.offsetHeight;

		if (L1 > R2 || R1 < L2 || T1 > B2 || B1 < T2) {
			return false;
		} else{
			return true;
		};
	},
	checkWin : function() {
		if (this.aLi.length == 0) {
			this.gkNum++;
			this.createBee();
		};
	}
}
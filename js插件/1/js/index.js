window.onload = function() {
	var stepsObj = $("steps");
	var fieldsetObj = $("infoForm").getElementsByTagName('fieldset');
	var inputListObj = $("infoForm").getElementsByTagName("input");
	var formNavObj = $("formNav");
	var navListObj = formNavObj.getElementsByTagName('li');

	//对每个input进行检查
	for (var i = 0; i < inputListObj.length; i++) {
		inputListObj[i].onblur = check;
	};

	// 点击导航菜单切换，同时检查各项是否填写完整
	for (var i = 0; i < navListObj.length; i++) {
		navListObj[i].i = i;
		navListObj[i].onclick = function() {
			var i = this.i;
			var width = 600;
			var end = i * width;
			var left = stepsObj.style.left;

			// 检查
			//通过left值获取当前fieldset的下标
			if (left == "") {
				left = -0;
			} else {
				left = parseInt(left);
			}
			var index = -(left / width);
			// 获取当前fieldset下的所有input对象
			var inputListObj = fieldsetObj[index].getElementsByTagName("input");
			// 先将导航选项“选中”样式去除
			navListObj[index].className = "";
			// 如果有未填写或与正则表达式不符，则导航菜单栏相应选项出现“错误”样式
			for (var j = 0; j < inputListObj.length; j++) {
				if (inputListObj[j].type == "submit") {
					continue;
				};
				if (inputListObj[j].className == "error" || inputListObj[j].value == "") {
					navListObj[index].className = "error";
				} else {
					navListObj[index].className = "checked";
				}
			};

			// 切换
			stepsObj.style.left = -end + "px";
			navListObj[i].className = "selected";

			return false;
		}
	};
}

// 每个input所对应的正则表达式
var checkArr = {
	userName: /^\w+$/,
	email: /^\w+@[\da-z]+\.[a-z]+$/,
	pw: /^[0-9a-z]+$/,
	confirmPw: /^[0-9a-z]+$/,
	name: /^[\u4e00-\u9fa5]+$/,
	country: /^[\u4e00-\u9fa5]+$/,
	phone: /^[0-9]{11}$/,
	website: /^(http:\/\/)[a-z]+\.[0-9a-z]+\.[a-z]+$/,
	cardNum: /^[0-9]{18}$/,
	secure: /^[a-z0-9\u4e00-\u9fa5]+$/,
	nameCard: /^[\u4e00-\u9fa5]+$/,
	tagname: /^[a-z0-9\u4e00-\u9fa5]+$/
};

function $(id) {
	return document.getElementById(id);
}

function check() {
	var name = this.name;
	var value = this.value;

	// 如果不匹配正则表达式则呈现"错误"的样式
	if (checkArr[name].test(value)) {
		this.className = ""
	} else {
		this.className = "error";
	}

	// 如果密码和验证密码不一致则呈现“错误”的样式
	if ($("pw").value != $("confirmPw").value) {
		$("pw").className = $("confirmPw").className = "error";
	} else {
		$("pw").className = $("confirmPw").className = "";
	}
}
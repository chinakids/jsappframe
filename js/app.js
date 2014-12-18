"use strict";
/*
	name : 模拟菜单插件
 */
(function($) {
	/*
	menu.open(config,id);
	config   json     菜单列表名称&钩子   [{name:"回 复",class:"jq-re"},{name:"删 除",class:"jq-del"}...]
	id 		 string	  对应唯一标识符      "123"
	 */
	var menu = window.menu = {

		val: {

			menucss: false,
			id: ""

		},

		close: function() {

			$("#menuBox").slideToggle(300);

			$("#menuBoxZz").fadeOut(300);

			var time = setTimeout(function() {

				$("#menuBox,#menuBoxZz").remove();

			}, 300)

		},

		css: function() {

			var _this = this,
				status = _this.val.menucss;

			var css = "<style>#menuBox ul,li{margin:0;padding:0;list-style:none}#menuBoxZz{background:rgba(0,0,0,0.2);position:fixed;top:0;left:0;width:100%;height:100%;display:none;z-index:99999}#menuBox{width:100%;height:auto;padding:10px;background:#fff;border-top:1px solid #ddd;position:fixed;bottom:0;left:0;box-sizing:border-box;-o-box-sizing:border-box;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;-ms-box-sizing:border-box;display:none;font-family:arial;z-index:999999}#menuBox ul{padding-bottom:10px;padding-top:5px}#menuBox li{line-height:30px;width:100%;text-align:center;border-radius:10px;border:1px solid #ddd;margin-bottom:10px;cursor:pointer}#menuBox .exit{display:block;line-height:30px;width:100%;text-align:center;border-radius:10px;border:1px solid #ddd;cursor:pointer;color:#000;text-decoration:none}</style>";
			//console.log("before:"+_this.val.menucss);
			if (!status) {

				$("head").prepend(css);

				_this.val.menucss = true;

			}
			//console.log("after:"+_this.val.menucss);
		},

		open: function(config, id) {

			var _this = this,
				menuList = "";

			_this.val.id = id;

			for (var i = 0, mun = config.length; i < mun; i++) {

				menuList += "<li class='" + config[i].class + "' data-id='" + id + "'>" + config[i].name + "</li>";

			}

			var htmbox = "<div id='menuBoxZz'></div><div id='menuBox'><ul>" + menuList + "</ul><a href='javascript:;' class='exit'>取 消</a></div>";

			_this.css();

			if ($("#menuBox").size() > 0) {

				return false;

			} else {

				$("body").append(htmbox);

				$("#menuBox").slideToggle(300);

				$("#menuBoxZz").fadeIn(300);

			}

			$("#menuBox .exit,#menuBoxZz").on("click", function() {

				_this.close();

			})

		}

	};

})(jQuery)
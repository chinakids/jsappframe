var i = 1,
	gentry = null,
	w = null;
var hl = null,
	le = null,
	de = null,
	ie = null;
var unv = true;
// H5 plus事件处理
function plusReady() {
	// 获取摄像头目录对象
	plus.io.resolveLocalFileSystemURL("_doc/", function(entry) {
		entry.getDirectory("camera", {
			create: true
		}, function(dir) {
			gentry = dir;
			updateHistory();
		}, function(e) {
			console.log("Get directory \"camera\" failed: " + e.message);
		});
	}, function(e) {
		console.log("Resolve \"_doc/\" failed: " + e.message);
	});
}

if (window.plus) {
	plusReady();
} else {
	document.addEventListener("plusready", plusReady, false);
}

// 拍照
function getImage() {
	console.log("开始拍照：");
	var cmr = plus.camera.getCamera();
	cmr.captureImage(function(p) {
		console.log("成功：" + p);
		plus.io.resolveLocalFileSystemURL(p, function(entry) {
			createItem(entry);
//			var ret = '';
//			for(var i in entry) {
//			    ret+=i+':'+entry[i]+"++++++++";
//			}
//			alert(ret);
		}, function(e) {
			console.log("读取拍照文件错误：" + e.message);
		});
	}, function(e) {
		console.log("失败：" + e.message);
	}, {
		filename: "_doc/camera/",
		index: i
	});
}


function galleryImg() {
	// 从相册中选择图片
	console.log("从相册中选择图片:");
	plus.gallery.pick(function(path) {
		var entry = path; 
		createItem(entry);
	}, function(e) {
		console.log("取消选择图片");
	});
}

 // 添加列表
function createItem(entry) {
	var type = typeof(entry);
	if(type == "object"){
		var li = document.createElement("li");
		li.innerHTML = '<img src="'+entry.fullPath+'" data-id="'+entry.fullPath+'" />';
		li.setAttribute("onclick", "menu.open([{name:'删除',class:'jq-delImg'}],'"+entry.fullPath+"');");
		document.getElementById("uploadImgBox").insertBefore(li,document.getElementById("uploadImgBox").childNodes[0]);
	}else if(type == "string"){
		var fullPath = entry;
		if (entry.indexOf("file://") >= 0) {
			var newArr = entry.split("://");
			fullPath = newArr[1];
		}
		var li = document.createElement("li");
		li.innerHTML = '<img src="'+fullPath+'" data-id="'+fullPath+'"/>';
		li.setAttribute("onclick", "menu.open([{name:'删除',class:'jq-delImg'}],'"+fullPath+"');");
		document.getElementById("uploadImgBox").insertBefore(li,document.getElementById("uploadImgBox").childNodes[0]);
	}
	
}
//function createItem2(path) {
//	alert(typeof(path))
//	var fullPath = path;
//	if (path.indexOf("file://") >= 0) {
//		var newArr = path.split("://");
//		fullPath = newArr[1];
//	}
//	var li = document.createElement("li");
//	li.innerHTML = '<img src="'+fullPath+'" data-id="'+fullPath+'"/>';
//	li.setAttribute("onclick", "menu.open([{name:'删除',class:'jq-delImg'}],'"+fullPath+"');");
//	document.getElementById("uploadImgBox").insertBefore(li,document.getElementById("uploadImgBox").childNodes[0]);
//}

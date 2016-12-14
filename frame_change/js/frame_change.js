
//根据浏览器判断加载哪一种js
var fnJsLoad = function(url, callback) {
    callback = callback || function() {};

    var eleScript = document.createElement('script');
    
    eleScript.onload = function() {
        if (!eleScript.isInited) {
            eleScript.isInited = true;
            callback();
        }
    };
    // 一般而言，低版本IE走这个
    eleScript.onreadystatechange = function() {
        if (!eleScript.isInited && /^loaded|complete$/.test(eleScript.readyState)) {
            eleScript.isInited = true;
            callback();
        }
    };

    eleScript.src = url;

    doc.getElementsByTagName('head')[0].appendChild(eleScript);
};

$(function(){
	// IE10+加载zepto.js
	// IE7-IE9加载jQuery
	var URLLIB = '/js/zepto.js';

	if (!history.pushState) {
	    URLLIB = '/js/jquery.min.js';
	}

	fnJsLoad(URLLIB, function() {
	    // 业务脚本初始化 init();
		equalizeHeights($(".inline_box"),$(window).width());
	});

});

$(window).resize(function(event) {
	/* Act on the event */
	equalizeHeights($(".inline_box"),$(window).width());
});

function equalizeHeights(obj,w){
	var inline_items_h = obj.children().map(function(index, elem) {
		return $(this).height();
	});
	if(w>=768){
		obj.children().height(Math.max.apply(obj.children(),inline_items_h));
	}else{
		obj.children(':last-child').height("auto");
		obj.children(':not(:last-child)').height(Math.max.apply(obj.children(),inline_items_h));
		// console.log("window's width is:'%s'<br/>this name is:'%o'<br />this height is:'%s'",w,obj.children(':last-child'),obj.children(':last-child').height());
	}
	console.count("equalizeHeights() go");
	// console.log(inline_items_h);
	
}
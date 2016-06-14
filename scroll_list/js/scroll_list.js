$(document).ready(function(){

	//垂直滚动列表，参数分别为父元素、子元素
	scroll_list($(".list_box"),$(".list_content"));

});

window.onload = function(){
	//预留
}

function scroll_list(obj,subobj){
	//console.log("start!");
	
	var str = "";
	
	//默认父元素等于全屏高度。也许可以是个定值？
	//对，可以是个定值        ---2015-3-26 by xl
	obj.height($(window).height());
	
	/* 方式一 */
	/*obj.scroll(function(){
		//console.log(subobj);
		if(obj.scrollTop() + obj.height() >= subobj.height()){
			//console.log("add");
			for (var i = 0; i < 10; i++) {
				str += "<li>列表内容"+ i +"</li>";
			};
			subobj.children("ul").append(str);
		}
	});*/
	
	/* 方式二 */
	obj.on({
		scrollstart:function(){			
			if(obj.scrollTop() + obj.height() >= subobj.height()){
				for (var i = 0; i < 10; i++) {
					str += "<li>列表内容"+ i +"</li>";
				};
			}
		},
		scrollstop:function(){
			if(obj.scrollTop() + obj.height() >= subobj.height()){
				subobj.children("ul").append(str);
				console.log(subobj.children(".more"));
				subobj.find(".more").insertAfter(subobj.find("li:last"));
				str = "";
			}
		}
	});
}
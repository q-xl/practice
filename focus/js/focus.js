$(document).ready(function(){
	//预留
});

window.onload = function(){
	//横向切换
	focus_change($(".focus_box"),$(".pic_box"));
}

function focus_change(obj,subobj){
	
	var show_pic = 0,static_f = subobj.offset().left;
	var pics = subobj.children("img");
	//console.log(obj.children("img").length);
	pics.width(parseInt($(window).width()*0.98));
	//console.log(pics.width(),pics.length,pics.width()*(pics.length+1));
	subobj.css({
		width:parseInt(pics.width()*(pics.length+1)),
		left:-(subobj.offset().left)
	});
	
	/* 方式一 */
	/* 普通滚动，无特殊交互方式 */
	/*obj.scroll(function(){
		//console.log(obj.scrollLeft());

	});*/

	/* 方式二 */
	/* 经测试可用 */
	obj.on({
		swipeleft:function(){
			if(show_pic != pics.length-1){
				subobj.animate({
					left:-(pics.width())*++show_pic
				},1000);
			}else{
				subobj.append(subobj.children("img:first").clone());
				subobj.animate({
					left:-(pics.width())*++show_pic
				},1000,function(){
							subobj.css({left:-static_f});
							subobj.children("img:last").remove();
						});
				show_pic = 0;
			}
		},
		swiperight:function(){
			if(show_pic != 0){
				subobj.animate({
					left:-(pics.width())*--show_pic
				},1000);
			}else{
				subobj.prepend(subobj.children("img:last").clone());
				subobj.css({left:-pics.width()});
				subobj.animate({
					left:-(pics.width())*show_pic
				},1000,function(){
						subobj.css({left:-(subobj.width()-pics.width()*2)});
						subobj.children("img:first").remove();
						});
				show_pic = pics.length-2;
			}
		}
	});
}

$(document).ready(function () {
    reset_frame();

	scroll_list($("#list_box"),$("#list_content"));

});

function reset_frame(){
	var main_h = $(window).height()-$("header").height()-$("footer").height();
	$(".main").height(main_h);
	$(".index_content").height($(".main").height());
	$(".product_list_type1").children('.list_content').height(main_h-$(".list_title").height());
	$(".product_content").height(main_h-$(".product_sub_tab").height());
}

/**
 * 垂直滚动列表
 * @param  obj obj    父元素
 * @param  obj subobj 子元素
 * @return null        
 */
function scroll_list(obj,subobj){

	// 高度设置，预留
	// obj.height($(window).height());

	obj.on({
		swipeUp:function(){	
			if(obj.scrollTop() + obj.height() >= subobj.height()){
				var temp_data,
					temp_more = subobj.children('#list_more').clone();
				subobj.children('#list_more').remove();
				
				//以下为静态页临时赋值，正式使用时请使用正式数据
				//{
				temp_data = subobj.children().clone();
				// }

				subobj.append(temp_data).append(temp_more);
			}
		}
	});
}
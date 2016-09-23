var i,
	key,
	city_select_flag = true,
	address_array = {},
	address_str = "";

$(document).ready(function() {

	$("#city_select").click(function(event) {
		if(city_select_flag){
			$(".city_select_box").show();

			change_content($(".choose_items").children('div[id]'),$(".choose_items").children('div[id]:first'),$(".city_type_tab").children("a[class~='select_type']"),$(".city_type_tab").children('a:first'));

			city_select_flag = false;
		}else{
			get_address($(this));
			// console.log(city_select_flag,address_array,address_str);
		}
	});

	$(".city_type_tab").children('a').click(function(event) {

		change_content($(".choose_items").children('div[id]'),$("#"+$(this).attr("id").slice(0,-5)+"_collection"),$(this).siblings("a[class~='select_type']"),$(this));

		event.stopPropagation();
	});

	$(".choose_items").children('div[id]').find('a').bind({
		click:function(){

			var address_attr = $(this).attr("name");

			$("#"+address_attr).text($(this).text());
			address_array[address_attr] = $(this).text();

			if($("#"+address_attr).next().length!=0){
				
				//get data here.
				
				change_content($("#"+address_attr.slice(0,-5)+"_collection"),$("#"+address_attr.slice(0,-5)+"_collection").next(),$("#"+address_attr),$("#"+address_attr).next());
			}else{
				get_address($("#city_select"));
			}

			event.stopPropagation();
		}
	});

});

/**
 * 地址文字结果获取
 * @param  obj obj 需要显示结果的对象
 * @return null    
 */
function get_address(obj){
	obj.children('span').empty();
	for(key in address_array){
		address_str += address_array[key];
	}
	obj.children('span').text(address_str);
	$(".city_select_box").hide();
	city_select_flag = true;
	address_str = "";
}

/**
 * 地址行政分级条件内容切换
 * @param  obj main_content   内容区域的所有元素
 * @param  obj select_content 需要显示的内容区域
 * @param  obj old_link       上一个选中的行政分级tab
 * @param  obj active_link    点击后触发的行政分级tab
 * @return null               
 */
function change_content(main_content,select_content,old_link,active_link){
	main_content.hide();
	select_content.show();
	old_link.removeClass('select_type').addClass('normal_type');
	active_link.removeClass('normal_type').addClass('select_type');
}
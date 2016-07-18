var i,
	city_select_flag = true,
	address_array = new Array(),
	address_str = "";
	address_attr = ["provice","city","area","street"];

$(document).ready(function() {
	$("#city_select").click(function(event) {
		if(city_select_flag){
			$(".city_select_box").show();
			$(".choose_items").children('div[id]:first').show();
			city_select_flag = false;
		}else{
			// $(this).children('span').empty();
			for (i=0; i<address_array.length; i++) {
				address_str += address_array[i];
			}
			$(this).children('span').text(address_str);
			$(".city_select_box").hide();
			city_select_flag = true;
			console.log(city_select_flag,address_array,address_str);
		}
	});

	$(".city_type_tab").children('a').click(function(event) {
		$(".choose_items").children('div[id]').hide();
		// console.log($(this).attr("id").slice(0,-5));
		$(this).siblings("a[class~='select_type']").removeClass('select_type').addClass('normal_type');
		$(this).removeClass('normal_type').addClass('select_type');
		$("#"+$(this).attr("id").slice(0,-5)+"_collection").show();
		event.stopPropagation();
	});

	$(".choose_items").children('div[id]').hide();

	$(".choose_items").children('div[id]').find('a').bind({
		click:function(){
			$("#"+$(this).attr("name")).text($(this).text());
			address_array[$(this).attr("name")] = $(this).text();
			// console.log($(this).attr("name"),$("#"+address_attr[$(this).attr("name")]+"_name"));
			$("#"+address_attr[$(this).attr("name")]+"_name").removeClass('select_type').addClass('normal_type');
			$("#"+address_attr[$(this).attr("name")]+"_name").next().removeClass('normal_type').addClass('select_type');
			$("#"+address_attr[$(this).attr("name")]+"_collection").hide();
			$("#"+address_attr[$(this).attr("name")]+"_collection").next().show();
			event.stopPropagation();
		}
	});

});

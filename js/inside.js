var w = $(window).width(),
	h = $(window).height();

$(document).ready(function() {
	choose_label($(".content_table"));
});

window.onload = function(){
	//code here
}

function choose_label(obj){
	var change_action = function(type){
			for (var i = 0; i < obj.find("input[type='"+ type +"']").length; i++) {
				obj.find("input[type='"+ type +"']").eq(i).change(function(event) {
						// console.log($(this).siblings("input[type='"+ type +"']").prop("checked"));
						if(!$(this).siblings("input[type='"+ type +"']").prop("checked")){
							$(this).siblings("input[type='"+ type +"']").next("label").children('img').attr('src','images/4.jpg');
						}else{
							$(this).siblings("input[type='"+ type +"']").next("label").children('img').attr('src','images/ck.jpg');
						}
						if(!$(this).prop("checked")){
							$(this).next("label").children('img').attr('src','images/4.jpg');
						}else{
							$(this).next("label").children('img').attr('src','images/ck.jpg');
						}
				});
			}
		};
		change_action("radio");
		change_action("checkbox");
}
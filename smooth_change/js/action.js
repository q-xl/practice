$(document).ready(function(){
	var flag = 1;
	$("body").height($(window).height());
	$("section").height($(window).height());
	$("a[id]").on("click",function(){
		//console.log($(this).eq());
		var a_index = parseInt($(this).attr("id").slice(-1));
		if(a_index!=1){
			a_index > flag?$(".content").css("transform","translateY(-"+ $("section").height()*(a_index-1) +"px)"):/*$(".content").css("transform","translateY("+ $("section").height() +"px)")*/console.log("error?");
		}else{
			$(".content").css("transform","translateY(0px)");
		}
		flag = a_index;
		//console.log(flag);
	});
});
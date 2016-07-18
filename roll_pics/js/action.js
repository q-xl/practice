
var roll_position = 0,
	roll_pics_count = 4;

$(document).ready(function() {
	$("#roll_pics_area").width($("#roll_pics_area").children('dl').length*258);
});

/**
 * 图片左右切换
 * @param  {string} direction 滚动方向值
 * @return {}           
 */
function roll_pics(direction){
	// console.log(direction);
	switch (direction){
		case "left":
			if(roll_position>-($("#roll_pics_area").children('dl').length-4)*258){
				if((roll_pics_count+4)<$("#roll_pics_area").children('dl').length){
					roll_position-=258 * 4;
					roll_pics_count += 4;
				}else{
					roll_position-=258*($("#roll_pics_area").children('dl').length-roll_pics_count);
					roll_pics_count = $("#roll_pics_area").children('dl').length;
				}
			}
			break;
		case "right":
			if(roll_position<0){
				if((roll_pics_count-4)>4){
					roll_position+=258 * 4;
					roll_pics_count -= 4;
				}else{
					roll_position+=258*(roll_pics_count-4);
					roll_pics_count = 4;
				}
			}
			break;
		default:break;
	}
	console.log(roll_position);
	// $("#roll_pics_area").css("left",roll_position);
	$("#roll_pics_area").animate({left: roll_position}, 1000);
}

var roll_position = 0,
	roll_area = {},
	pic_box_w = 258;
	roll_pics_count = 4,
	roll_step = roll_pics_count,
	roll_pics = function(direction,obj){
		roll_area = $(obj);
		roll_area.width(roll_area.children('dl').length*pic_box_w);
		switch (direction){
		case "left":
			if(roll_position>-(roll_area.children('dl').length-roll_pics_count)*pic_box_w){
				if((roll_step+roll_pics_count)<roll_area.children('dl').length){
					roll_position-=pic_box_w * roll_pics_count;
					roll_step += roll_pics_count;
				}else{
					roll_position-=pic_box_w*(roll_area.children('dl').length-roll_step);
					roll_step = roll_area.children('dl').length;
				}
			}
			break;
		case "right":
			if(roll_position<0){
				if((roll_step-roll_pics_count)>roll_pics_count){
					roll_position+=pic_box_w * roll_pics_count;
					roll_step -= roll_pics_count;
				}else{
					roll_position+=pic_box_w*(roll_step-roll_pics_count);
					roll_step = roll_pics_count;
				}
			}
			break;
		default:break;
		}
		// console.log(roll_position);
		// roll_area.css("left",roll_position);
		roll_area.animate({left: roll_position}, 1000);
	};

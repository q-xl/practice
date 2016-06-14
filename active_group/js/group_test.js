/*
	动态群组架构图
	by q&xl
	2016.04.29
*/ 

//全局变量
var i,
	j,
	circle = 10,//圆形半径，需要与css对应
	group_blank = 50,//层间距，需要与css对应
	nodes_max = 6;//最底层每行显示最大节点数

//零件定义（HTML封装）
/*
	second_group：第二层
	second_nodes：第二层节点
	third_group：第三层
	third_nodes_type1：第三层节点状态一
	third_nodes_type1：第三层节点状态一
	third_nodes_typeN：第三层节点状态N(以后扩展)
	x_line：横线
	y_line：主竖线
*/
var second_group = "<div class='second_group'></div>",
	second_nodes = "<div class='second_nodes'><div class='x_line'></div><div class='circle'></div></div>",
	third_group = "<div class='third_group'></div>",
	third_nodes_type1 = "<div class='third_nodes third_nodes_type1'><div class='x_line'></div><div class='circle'></div></div>",
	third_nodes_type2 = "<div class='third_nodes third_nodes_type2'><div class='x_line'></div><div class='circle'></div></div>",
	//third_nodes_typeN...
	x_line = "<div class='x_line'></div>",
	y_line = "<div class='y_line sub_y'></div>";

window.onload = function(){
	var second_num = 7,//第二层总数
		second_objs = {},//用于装载所有第二层的对象
		third_objs = {
			"0":[0,1,1,0,0,1,0,1],
			"1":[0,1,0,1,0,0],
			"2":[0,1,0],
			"3":[1,0,1,0,1,0,1],
			"4":[1,0,1,0,1,0,0,1,1,1,1,1,0,1,0,0],
			"5":[0,1,0,1],
			"6":[0,0,1,0,0]
		},//第三层节点内容
		main_y_h = 0;//主竖线高度

	//循环封装输出，生成第二层与第三层
	for (i = 0; i < second_num; i++) {
		var new_group = $(second_group),
			new_subgroup = $(third_group);
		for(j = 0; j < third_objs[i].length; j++){
			
			//当第三层节点数超过上限时的判断
			if(j!=0 && j%nodes_max==0){
				new_subgroup.append(y_line);
			}
			//判断第三层节点状态，加载不同的样式
			switch(third_objs[i][j]){
				case 0:new_subgroup.append(third_nodes_type1);break;
				case 1:new_subgroup.append(third_nodes_type2);break;
				default:break;
			}
		}
		new_group.append(second_nodes).append(x_line).append(new_subgroup);
		new_group.children('.x_line').css("display","none");
		$(".sub_area").append(new_group);
	}
	// console.log(new_group,new_subgroup);
	second_objs = $(".sub_area").children(".second_group");

	//定义第二层的高度 & 计算主竖线高度 & 点击切换第三层显隐事件
	for(i = 0; i<second_objs.length; i++){
		second_objs.eq(i).height(second_objs.eq(i).children(".third_group").height());
		// console.log(second_objs.eq(i),second_objs.eq(i).height());
		if((i+1)==second_objs.length){
			main_y_h += circle*2;
		}else{
			main_y_h += second_objs.eq(i).height();
		}
		second_objs.eq(i).click(function(){
			if($(this).children(".x_line").css("display")=="none"){
				$(this).children(".x_line").css("display","inline-block");
				$(this).children(".third_group").css("display","inline-block");
			}else{
				$(this).children(".x_line").css("display","none");
				$(this).children(".third_group").css("display","none");
			}
		});
	}

	//主竖线高度计算补丁处理，处理未计算的间距及多余的零件高度
	$(".main_y").height(main_y_h+group_blank*(second_objs.length-1)-circle*2);
}

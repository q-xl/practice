var w = $(window).width(),
	h = $(window).height();

$(document).ready(function() {
	var top = $(".top");
	// console.log(w,h,top);
	$(".main").height(h-top.outerHeight()-3);
	$(".sidebar_sub").click(function(){
		sidebar_sub_change($(this),"open_sub","close_sub");
	});
	//content_tabgroup($(".sidebar_content"),$(".content_tab"),$("#content_iframe"));
	content_tab($(".sidebar_content"),$(".content_tab"),$("#content_iframe"));
});

window.onload = function(){
	//code here
}

//方法：sidebar_sub_change
//作用：侧边栏子菜单切换控制
//参数：触发对象/显示classname/隐藏classname
//modify:q&xl 2015/11/30
function sidebar_sub_change(obj,open_type,close_type){
	// console.log(obj);
	obj.siblings().children('ul').removeClass(open_type).addClass(close_type);
	obj.children('ul').removeClass(close_type).addClass(open_type);
}

/**
 * 方法：content_tab by q&xl 2016/12/13 新方法，建议使用
 * @param  obj link_content  触发对象
 * @param  obj tab_obj       标签放置对象
 * @param  obj frame_content 装载内容对象（一般情况下为iframe）
 * @return null              
 */
function content_tab(link_content,tab_obj,frame_content){
	//对象变量定义：link_tab--tab对象集
	var link_tab = {
			"content_link0":["","download.html"]//初始化默认显示的tab
		},
		//创建tab
		create_link_tab = function(tabs){
			link_content.click(function(e){
				// console.log(e.target.name);
				for(key in link_tab){
					if(key==e.target.name){
						// console.log("get!");
						tab_obj.children("span").removeClass('selected_tab').addClass('normal_tab');
						link_content.find("li").removeClass('selected_link');
						// console.log(tab_obj.children("#"+key),key);
						if(tab_obj.children("#"+key).length == 0){
							// console.table(tab_obj.children("span"));
							tab_obj.append(tabs[key][0]);
						}
						$("#"+key).removeClass('normal_tab').addClass('selected_tab');
						$(e.target).parent().addClass('selected_link');
						break;
					}
				}
				click_link_tab(key,tabs[key][1]);
				close_link_tab(key,tabs);
			});
		},
		//点击tab
		click_link_tab = function(tab_id,tab_url){
			$("#"+tab_id).click(function(){
				tab_obj.children("span").removeClass('selected_tab').addClass('normal_tab');
				$("#"+tab_id).removeClass('normal_tab').addClass('selected_tab');
				frame_content.attr("src",tab_url);
				link_content.find('li').removeClass('selected_link');
				if(link_tab[tab_id]!=undefined){
					$("[name='"+ tab_id +"']").parent().addClass('selected_link');
				}
			});
		},
		//关闭tab
		close_link_tab = function(tab_id,tabs){
			$("#close_"+tab_id).click(function() {
				// console.log($("#"+tab_id).attr('class'));
				if($("#"+tab_id).attr('class') == 'selected_tab'){
					$("#"+tab_id).prev().removeClass('normal_tab').addClass('selected_tab');
					frame_content.attr("src",tabs[$("#"+tab_id).prev().attr("id")][1]);
					// $("[name="+ $("#"+tab_id).prev().attr("id") +"]").parent().siblings().removeClass('selected_link');
					link_content.find('li').removeClass('selected_link');
					$("[name="+ $("#"+tab_id).prev().attr("id") +"]").parent().addClass('selected_link');
				}
				$("#"+tab_id).remove();
			});
		};

		//reset link_group & link_tab
		//初始化 link_group 和 link_tab 对象
		for (var i = 0; i < link_content.find('li').children('a').length; i++) {
			var link = link_content.find('li').children('a').eq(i);
			link_tab[link.attr("name")] = [
				"<span id='"+ link.attr("name") +"' href='"+ link.attr("href") +"' class='selected_tab' >"+ link.html() +"&nbsp;<a href='javascript:void(0)' id='close_"+ link.attr("name") +"'>X</a></span>",
				link.attr("href")
				];
		};
		create_link_tab(link_tab);
		//为固定tab增加点击事件
		click_link_tab("content_link0","download.html");
	}

//方法：content_tabgroup
//作用：内容区域tab标签控制（旧方法，可行，不建议使用）
//参数：触发对象/标签放置对象/装载内容对象（一般情况下为iframe）
//modify:q&xl 2015/12/4
function content_tab2(link_content,tab_obj,frame_content){
	//对象变量定义：link_group--触发对象集,link_tab--tab对象集
	var link_group = {},
		link_tab = {
			"content_link0":["","","download.html"]
		},
		//创建tab
		create_link_tab = function(link,tabs){
			// console.log(link[0],"|",tabs[0],"|",link[1],"|",tabs[1]);
			link[1].click(function(){
				tab_obj.children("span").removeClass('selected_tab').addClass('normal_tab');
				link[1].parent().siblings().removeClass('selected_link');
				if(!tab_obj.children("span").is("#"+tabs[1])){
					tab_obj.append(tabs[0]);
				}
				$("#"+tabs[1]).removeClass('normal_tab').addClass('selected_tab');
				link[1].parent().addClass('selected_link');
				click_link_tab(tabs[1],tabs[2]);
				close_link_tab(tabs[1],link_tab);
			});
		},
		//点击tab
		click_link_tab = function(tab_id,tab_url){
			$("#"+tab_id).click(function(){
				tab_obj.children("span").removeClass('selected_tab').addClass('normal_tab');
				$("#"+tab_id).removeClass('normal_tab').addClass('selected_tab');
				frame_content.attr("src",tab_url);
				link_content.find('li').removeClass('selected_link');
				if(link_group[tab_id]!=undefined){
					link_group[tab_id][1].parent().addClass('selected_link');
				}
			});
		},
		//关闭tab
		close_link_tab = function(tab_id,tabs){
			$("#close_"+tab_id).click(function() {
				// console.log($("#"+tab_id).attr('class'));
				if($("#"+tab_id).attr('class') == 'selected_tab'){
					$("#"+tab_id).prev().removeClass('normal_tab').addClass('selected_tab');
					frame_content.attr("src",tabs[$("#"+tab_id).prev().attr("id")][2]);
					if(link_group[$("#"+tab_id).prev().attr("id")]!=null){
						link_group[$("#"+tab_id).prev().attr("id")][1].parent().siblings().removeClass('selected_link');
						link_group[$("#"+tab_id).prev().attr("id")][1].parent().addClass('selected_link');
					}else{
						link_content.find('li').removeClass('selected_link');
					}
				}
				$("#"+tab_id).remove();
			});
		};

	//reset link_group & link_tab
	//初始化 link_group 和 link_tab 对象
	for (var i = 0; i < link_content.find('li').children('a').length; i++) {
		var link = link_content.find('li').children('a').eq(i);
		link_group[link.attr("name")] = [
			link.html(),
			link
			];
		link_tab[link.attr("name")] = [
			"<span id='"+ link.attr("name") +"' href='"+ link.attr("href") +"' class='selected_tab' >"+ link.html() +"&nbsp;<a href='javascript:void(0)' id='close_"+ link.attr("name") +"'>X</a></span>",
			link.attr("name"),
			link.attr("href")
			];
		create_link_tab(link_group[link.attr("name")],link_tab[link.attr("name")]);
	};
	//为固定tab增加点击事件
	click_link_tab("content_link0","download.html");
}

//方法：content_tab
//作用：内容区域tab标签控制(旧方法，不建议使用)
//参数：触发对象/标签放置对象/默认首页链接
//modify:q&xl 2015/12/2
function content_tab1(link_obj,tab_obj,index_page){
	/* create tab success*/
	var tab_name,tab_src;
	link_obj.click(function(){
		var link_obj = $(this);
		link_obj.parent().siblings().removeClass("selected_link");
		link_obj.parent().addClass("selected_link");
		tab_name = link_obj.attr("name");
		tab_src = link_obj.attr("href");
		if(!tab_obj.children("span").is("#"+tab_name)){

			/* create tab */
			tab_obj.append("<span id="+ tab_name +" href="+ tab_src +"></span>");
			$("#"+tab_name).append(link_obj.text()+"&nbsp;<a href='javascript:void(0)' id='close_"+ tab_name +"'>X</a>");
			$("#"+tab_name).siblings().toggleClass('normal_tab');
			$("#"+tab_name).toggleClass('selected_tab');
					
			/* click tab */
			$("#"+tab_name).click(function(){
				$(this).siblings().toggleClass('normal_tab');
				$(this).toggleClass('selected_tab');
				$("#content_iframe").attr("src",$(this).attr("href"));
				link_obj.parent().siblings().removeClass("selected_link");
				link_obj.parent().addClass("selected_link");
				});
			
			/* close tab */
			$("#"+ tab_name +" > a").click(function(){
				link_obj.parent().removeClass('selected_link');
				$(this).parents("span").siblings().toggleClass('normal_tab');
				if($(this).parnts("span").prev().html()!=null){                
					$("#content_iframe").attr("src",$(this).parents("span").prev().attr("href"));
					$(this).parents("span").prev().toggleClass('selected_tab');
					link_obj.parent().siblings().has("[name='"+ $(this).parents("span").prev().attr('id') +"']").addClass('selected_link');
					// console.log(link_obj.parent().siblings().has("[name='"+ $(this).parents("span").prev().attr('id') +"']"));
					}else if($(this).parents("span").next().html()!=null){
						$("#content_iframe").attr("src",$(this).parents("span").next().attr("href"));
						$(this).parents("span").next().toggleClass('selected_tab');
							link_obj.parent().siblings().has("[name='"+ $(this).parents("span").next().attr('id') +"']").addClass('selected_link');
						}else{
							$("#content_iframe").attr("src",index_page);
							}
				$(this).parent().remove();
				});
 			}else{
				$("#"+tab_name).siblings().toggleClass('normal_tab');
				$("#"+tab_name).toggleClass('selected_tab');
				}
		});
	/* create tab end*/
}

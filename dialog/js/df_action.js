
//***根据 am-team dialog.js插件修改***//
//2015-8-21 finish by q&xl

//初始化df，设置为window下的某一对象
window.df = window.df||{};

//dialog匿名函数开始
(function(){
  var dialog = {};//定义dialog对象

  /*
    定义dialog基本属性，可扩展
    top:dialog顶部距离
    title:dialog标题
    content:dialog文字内容
    type:dialog类型，分为alert和confirm两种，默认为alert
  */
  dialog.set = {
    "top":"10%",
    "title":"标题",
    "content":"内容",
    "type":"alert"
  };

  /*
    show方法，主要用于dialog生成，参数为：
    set：基本属性对象
    fn：回调函数
  */

  dialog.show = function(set,fn){
    var dialog_box = {};
    var set_arr = {
      "top":this.set.top,
      "title":this.set.title,
      "content":this.set.content,
      "type":this.set.type
    };
    //console.log($.type(set));
    if($.type(set)=="object"){
      var key;
      for(key in set){
        set_arr[key] = set[key];
      }
    }
    if($.type(fn)=="function"){
      this.callback = fn;
    }
    var bgmask_h = $(document).height() > $(window).height() ? $(document).height() : $(window).height();
    $("body").append("<div class='df_bgmask' style='height:"+ bgmask_h +"px;'></div><div class='df_dialog'><div class='df_dialg_title'>"+set_arr.title+"</div><div class='df_dialog_content'>"+set_arr.content+"</div><div class='df_dialog_button'></div></div>").css("overflow","hidden");
    switch(set_arr.type){
      case "alert":
        set_arr.button = "<a href='javascript:void(0)'>确定</a>";
        $(".df_dialog_button").append(set_arr.button);
        $(".df_dialog_button > a").click(function(){
              //console.log(dialog.callback);
              dialog.callback("ok");
              dialog.hide();
            });
        break;
      case "confirm":
        set_arr.button = "<a id='cancel' href='javascript:void(0)'>取消</a>&nbsp;&nbsp;<a id='apply' href='javascript:void(0)'>确定</a>";
        $(".df_dialog_button").append(set_arr.button);
        $("#cancel").click(function(){
          dialog.callback("cancel");
          dialog.hide();
        });
        $("#apply").click(function(){
          dialog.callback("ok");
          dialog.hide();
        });
        break;
      default:
        set_arr.button = "<a href='javascript:void(0)'>确定</a>";
        $(".df_dialog_button").append(set_arr.button);
        $(".df_dialog_button > a").click(function(){
              //console.log(dialog.callback);
              dialog.callback("ok");
              dialog.hide();
            });
        break;
    }
    dialog_box = $(".df_dialog");
    dialog_box.css("top",set_arr.top);
    //console.log($(dialog_box),$(".df_dialog"));
  };

  /*
    hide方法，主要用于关闭dialog
  */

  dialog.hide = function(){
    $(".df_bgmask").remove();
    $(".df_dialog").remove();
    $("body").css("overflow","auto");
  };

  /*
    callback方法，主要用于回调
  */

  dialog.callback = function(){};

  //添加dialog对象至df内
  window.df.dialog = dialog;
})();
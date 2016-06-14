//切换主方法
var updateCalendar = function (year, month) {
      var data = [];
      var d = new Date(year, month - 1, 1);
      var currentDate = (new Date()).getDate();
      var totalDays = new Date(year, month, 0).getDate();
      var htmlStr = '';
      var text = '';
      var day;

      $(".days").empty();

      // 空白的渲染
      for (var i = 0; i < d.getDay(); i++) {
          data.push({empty: true});
      }

      // 日历部分的渲染
      for (var j = d.getDate(); j <= totalDays; j++) {
          text = getFestival(year, month, j);
          day = (new Date(year, month - 1, j)).getDay();

          text = text ? text : j; // 日期显示内容
          if (currentDate == j) { // ‘今天’优先级最高
              data.push({today: true, date: text});
          } else if (day == 6 || day == 0) { // 周六日的情况
              data.push({weekend: true, date: text});
          } else {
              data.push({normal: true, date: text}); // 普通日期情况
          }
      }

      htmlStr = Mustache.render($('textarea').val(), {data: data});
      $(".days").append(htmlStr);
      $(".year-month").text(year+" / "+month);
      $("#CalendarSelect").show();
      //$calendarPanel.find('.days').html(htmlStr);
  };

//获取节假日，保留方法
var getFestival = function (year, month, day) {
      var key = '' + year + (month < 10 ? '0' + month : month) +
          (day < 10 ? '0' + day : day);
      return Data.festival[key];
  };
var Data = {
  //节假日列表
  festival: {
      //'20150620': '端午',
      //'20150820': '七夕',
      //'20150828': '中元',
  },
  show_calendar:{
    "year":1900 + new Date().getYear(),
    "month":new Date().getMonth() + 1
  }
}

//获取日期
var send_date = function(year, month, day){
  //console.log(year,month,day);
  $("#get_date").val(year+"/"+month+"/"+day);
  $("#CalendarSelect").hide();
}

$(document).ready(function(){
  //切换至前一月
  $("#prev_month").click(function(){
    if(Data.show_calendar["month"]==1){
      updateCalendar(Data.show_calendar["year"]-1,12);
      Data.show_calendar["year"] = Data.show_calendar["year"]-1;
      Data.show_calendar["month"] = 12;
    }else{
      updateCalendar(Data.show_calendar["year"],Data.show_calendar["month"]-1);
      Data.show_calendar["month"] = Data.show_calendar["month"]-1;
    }
  });

  //切换至后一月
  $("#next_month").click(function(){
    if(Data.show_calendar["month"]==12){
      updateCalendar(Data.show_calendar["year"]+1,1);
      Data.show_calendar["year"] = Data.show_calendar["year"]+1;
      Data.show_calendar["month"] = 1;
    }else{
      updateCalendar(Data.show_calendar["year"],Data.show_calendar["month"]+1);
      Data.show_calendar["month"] = Data.show_calendar["month"]+1;
    }
  });
});
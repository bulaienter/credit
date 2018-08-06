$(function() {
  var nowDate = new Date(),
    nyear = nowDate.getFullYear(),
    nmonth = nowDate.getMonth(),
    ndate = nowDate.getDate(); //当前日期
  //生成日历
  getCalendar(nowDate);
  //假设今天已签到
  $('#nowday').addClass('am'); //上午已签到状态
  $('#nowday').addClass('pm'); //下午已签到状态
  //上一月
  $('#pre').click(function() {
    nmonth = nmonth - 1;
    var pre = new Date(nyear, nmonth, ndate);
    getCalendar(pre);
  });
  //下一月
  $('#next').click(function() {
    console.log(nmonth)
    if(nmonth > 10) {
      alert('只能查看今年以前的');
    } else {
      nmonth = nmonth + 1;
    }
    var next = new Date(nyear, nmonth, ndate);
    getCalendar(next);
  })
  //签到功能
  //	$('.qdtop .btn').click(function(){
  //		var state = $(this).attr('data-status');
  //		if(state == 0){
  //			$(this).attr('data-status','1');
  //			$('#nowday').addClass('am');
  //			$('#nowday').addClass('pm');
  //			alert("恭喜您，签到成功");	
  //		}else {
  //			alert('亲，您已经签过到了！')
  //		}
  //	});
});

function getServerDate() {
  return new Date($.ajax({
    async: false
  }).getResponseHeader("Date"));
}

function getCalendar(nowdate) {
  //var nowdate = new Date();  //当前日期
  var days = new Date(nowdate.getFullYear(), (nowdate.getMonth() + 1), 0).getDate(); //本月天数
  var year = nowdate.getFullYear();
  var deforedays = new Date(nowdate.getFullYear(), (nowdate.getMonth()), 0).getDate(); //上月天数
  var month = nowdate.getMonth() + 1,
    date = nowdate.getDate(),
    week = nowdate.getDay();
  var firstday = nowdate; //本月第一天的日期
  firstday.setDate(1);
  var firstdayweek = firstday.getDay(); //本月第一天星期几
  console.log('今天是' + year + '年' + +month + '月' + date + '日，星期' + week);
  //	console.log(firstdayweek);
  //生成年月
  $('.date').html(year + '年' + +month + '月');
  //判断星期
  $('.rl-main .week span').each(function(index, item) {
    if(index == week) {
      $('.rl-main .week span').removeClass('active');
      $(this).addClass('active');
    }
  });
  //生成日历
  var dayinfo = '',
    num = 0,
    numaft = 0;
  for(var i = 1; i <= 6; i++) {
    dayinfo += '<div class="day">'
    for(var j = 1; j <= 7; j++) {
      if(i == 1 && j == 1) {
        for(var beforeday = firstdayweek - 1; beforeday >= 0; beforeday--) {
          dayinfo += '<span class="before">';
          dayinfo += Number(deforedays - beforeday);
          dayinfo += '</span>'
        }
      } else if(i == 1 && j > firstdayweek) {
        if(num == date - 1) {
          dayinfo += '<span class="active" id="nowday">' + (++num) + '</span>'
        } else {
          dayinfo += '<span>' + (++num) + '</span>'
        }
      } else if(i > 1) {
        if(num == days) {
          dayinfo += '<span class="before">' + (++numaft) + '</span>'
        } else {
          if(num == date - 1) {
            dayinfo += '<span class="active" id="nowday">' + (++num) + '</span>'
          } else {
            dayinfo += '<span>' + (++num) + '</span>'
          }
        }
      }
    }
    dayinfo += '</div>'
  }
  $('#cal').html(dayinfo);
  //	console.log(dayinfo);
}

function dateTimeFormate(date) {
  console.log(date)
  if(!date) {
    return
  } else {
    var d = new Date(date);
    var year = d.getFullYear();
    var month = ('0' + (d.getMonth() + 1)).slice(-2);
    var day = ('0' + (d.getDate())).slice(-2);
    var hour = ('0' + (d.getHours())).slice(-2);
    var minutes = ('0' + (d.getMinutes())).slice(-2);
    var seconds = ('0' + (d.getSeconds())).slice(-2);
    return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
  }
}
var bdId = ''
$(function() {
	//获取初始bdId
	bdId = $('#menu-list li').eq(0).find('span').eq(0).text();
	//初始化数据
	initPage();

	//为第一个tab菜单添加效果
	$('#menu-list li').removeClass('layui-this').eq(0).addClass('layui-this');
	//tab菜单点击
	$('#menu-list li').click(function() {
		var tabName = $(this).find('a').eq(0).text();
		bdId = $(this).find('span').eq(0).text();
		initPage();
	});

	$('.check-the-month').click(function() {
		var year = parseInt($("#year").html());
		var month = $(this).parent().find('em').eq(0).html();
		if (month.length == 1) {
			month = '0' + month;
		}
		yearMonth = year + '-' + month;
	});
	
	//点击去年同步a时 大于0的颜色变为红色
	$("#a-checkbox").click(function(){
  		$('.column-type .a-span').removeClass('over');
  		if($(this).find('input').eq(0).prop("checked") == true){
  	  		$('.column-type .a-span').each(function(){
  	  			var $cube = $(this).find('i').eq(0);
  	  			if($cube.html().replace('+','').replace('%','') * 1 > 0){
  	  				$(this).addClass('over');
  	  			}
  	  		});
  		}
  	});
  	
	//鼠标滑动时去除红色样式
	$("li.column-type").hover(function(){
		$(this).find('.a-span').removeClass('over');
	},function(){
		if($("#a-checkbox").find('input').eq(0).prop("checked") == true){
  	  		$('.column-type .a-span').each(function(){
  	  			var $cube = $(this).find('i').eq(0);
  	  			if($cube.html().replace('+','').replace('%','') * 1 > 0){
  	  				$(this).addClass('over');
  	  			}
  	  		});
  		}
	});
});

function initPage() {
	var year = parseInt($("#year").html());
	$.ajax({
		url : URL + "/preview/calendar/fourValueOfYear",
		type : "post",
		dataType : "json",
		data : {
			"bdId" : bdId,
			"date" : year
		},
		cache : false,
		success : function(result) {
			console.log(result)
			var list1 = result.list1; //年度汇总
			var list2 = result.list2; //月度汇总

			/** 年度汇总 */
			//先清空
			$('#year-ul li.column-type').each(function() {
				$(this).find('div').eq(0).find('div').eq(0).find('strong').eq(0).html('/');
				$(this).find('div').eq(0).find('div').eq(1).find('i').eq(0).html('/');
			});
			//后赋值
			for (var i = 0, len = list1.length; i < len; i++) {
				var data = list1[i];
				var $cube = $('#year-ul li.' + data.columnType).eq(0);
				$cube.find('div').eq(0).find('div').eq(0).find('strong').eq(0).html(addZeroBeforePoint(data.nowTotal));
				$cube.find('div').eq(0).find('div').eq(1).find('i').eq(0).html(addZeroBeforePoint(data.percent));
			}

			/** 月度汇总 */
			//先清空
			$('#month-ul li.column-type dl dd').each(function() {
				$(this).find('strong').eq(0).find('span').eq(0).html('/');
				$(this).find('span').eq(1).find('i').eq(0).html('/');
			});
			//后赋值
			for (var i = 0, len = list2.length; i < len; i++) {
				var data = list2[i];
				var $cube = $('#month-ul li.column-type').eq(data.nowMonth.substring(5) * 1 - 1).find('dd.' + data.columnType);
				$cube.find('strong').eq(0).find('span').eq(0).html(addZeroBeforePoint(data.nowTotal));
				$cube.find('span').eq(1).find('i').eq(0).html(addZeroBeforePoint(data.percent));

			}
			
			$('.column-type .a-span').removeClass('over');
			if($('#a-checkbox').find('input').eq(0).prop("checked") == true){
	  	  		$('.column-type .a-span').each(function(){
	  	  			var $cube = $(this).find('i').eq(0);
	  	  			if($cube.html().replace('+','').replace('%','') * 1 > 0){
	  	  				$(this).addClass('over');
	  	  			}
	  	  		});
	  		}
		}
	});
}

function addZeroBeforePoint(num){
	if(num == null || num == undefined || num == ''){
		return '\\';
	}
	
	var f = '';//符号 (+或者 -)
	if((num+'').substring(0,1) == '+' || (num+'').substring(0,1) == '-'){
		f = (num+'').substring(0,1);
		num = (num+'').substring(1);
	}
	if((num+'').substring(0,1) == '.'){
		return f + '0' + num;
	}
	return f + num;
}

function toCalendarDay(month) {
	var year = parseInt($("#year").html());
	if((month+'').length == 1){
		month = '0' + month;
	}
	var date = year + '-' +month;
	window.location.href = URL+"/preview/calendar/calendarDay?bdId=" + bdId + "&date=" + date;
}

function toEnergyConsumptionYear() {
	var year = parseInt($("#year").html());
	window.location.href = URL+"/analyse/energyConsumption/yearEnergyConsumption?type=2&bdId=" + bdId + "&energyYearDate=" + year;
}

function toCarbonEmissionYear() {
	var year = parseInt($("#year").html());
	window.location.href = URL+"/analyse/carbonEmission/yearCarbonEmission?type=2&bdId=" + bdId + "&time=" + year;
}

function toNaturalGasConsumeYear() {
	var year = parseInt($("#year").html());
	window.location.href = URL+"/monitor/naturalGasConsume/yearNaturalGasConsume?type=2&bdId=" + bdId + "&yearDate=" + year;
}

function toEnergyConsumptionMonth(month) {
	var year = parseInt($("#year").html());
	if((month+'').length == 1){
		month = '0' + month;
	}
	var date = year + '-' +month;
	window.location.href = URL+"/analyse/energyConsumption/monthEnergyConsumption?type=2&bdId=" + bdId + "&energyMonthDate=" + date;
}

function toCarbonEmissionMonth(month) {
	var year = parseInt($("#year").html());
	if((month+'').length == 1){
		month = '0' + month;
	}
	var date = year + '-' +month;
	window.location.href = URL+"/analyse/carbonEmission/monthCarbonEmission?type=2&bdId=" + bdId + "&time=" + date;
}

function toNaturalGasConsumeMonth(month) {
	var year = parseInt($("#year").html());
	if((month+'').length == 1){
		month = '0' + month;
	}
	var date = year + '-' +month;
	window.location.href = URL+"/monitor/naturalGasConsume/monthNaturalGasConsume?type=2&bdId=" + bdId + "&monthDate=" + date;
}

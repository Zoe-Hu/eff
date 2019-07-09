//获取第一个默认选中的tab对应的bdId
var bdId = '';

$(function(){
	//获取初始bdId
	bdId = $('#menu-list li').eq(0).find('span').eq(0).text();
	//初始化数据
	initPage();
	
	//为第一个tab菜单添加效果
	$('#menu-list li').removeClass('layui-this').eq(0).addClass('layui-this');
	//tab菜单点击
  	$('#menu-list li').click(function(){
  		var tabName = $(this).find('a').eq(0).text();
  		bdId = $(this).find('span').eq(0).text(); 
  		initPage();
  	});
  	
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
  	
	$("td.column-type").hover(function(){
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

})

function initPage(){
	var year = $("#year").html();
	var month = $("#month").html();
	if((month+'').length == 1){
		month = '0' + month;
	}
	var date = year + '-' +month;
	
	$.ajax({
		url : URL + "/preview/calendar/fourValueOfMonth",
		type : "post",
		dataType : "json",
		data : {
			"bdId" : bdId,
			"date" : date
		},
		cache : false,
		success : function(result) {
			console.log(result)
			
			/** 重置页面 */
			resetPage(result.monthDay, result.weekDay);
			
			/** 月度汇总 */
			var list1 = result.list1;
			//先清空
			$('#month-ul li.column-type').each(function(){
				$(this).find('div').eq(0).find('div').eq(0).find('strong').eq(0).html('/');
				$(this).find('div').eq(0).find('div').eq(1).find('i').eq(0).html('/');
			});
			//后赋值
			for(var i = 0, len = list1.length; i < len; i++){
				var data = list1[i];
				var $cube = $('#month-ul li.' + data.columnType).eq(0);
				$cube.find('div').eq(0).find('div').eq(0).find('strong').eq(0).html(addZeroBeforePoint(data.nowTotal));
				$cube.find('div').eq(0).find('div').eq(1).find('i').eq(0).html(addZeroBeforePoint(data.percent));
			}
			
			/** 每日汇总 */
			var list2 = result.list2;
			//先清空
			$('#day-table li.column-type dl dd').each(function(){
				$(this).find('strong').eq(0).find('span').eq(0).html('/');
				$(this).find('span').eq(1).find('i').eq(0).html('/');
			});
			//后赋值
			for(var i = 0, len = list2.length; i < len; i++){
				var data = list2[i];
				var $cube = $('#day-table td.column-type').eq(data.nowDay.substring(8) * 1 - 1).find('dd.'+data.columnType);
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

//根据当月的总天数和起始日的星期重新绘制页面
function resetPage(monthDay, weekDay){
	//将参数从字符串类型转化为数字类型
	monthDay = monthDay * 1;
	weekDay = weekDay * 1;
	
	var pageStr = "";
	for(var i = 1, len = monthDay; i <= monthDay; i++){
		if(i==1 || (weekDay+i-1)%7 == 0){
			pageStr += '<tr>';
		}
		
		if(i == 1 && weekDay != 7){
			for(var j = 0, jl = weekDay; j < jl; j++){
				pageStr += '<td></td>';
			}
		}
		
		pageStr += '<td class="column-type">';
		pageStr += '<dl class="clear">';
		pageStr += '<dt class="clear">';
		pageStr += '<span><em>'+i+'</em></span>';
		pageStr += '<button class="layui-btn">';
		pageStr += '查看该月<i>》</i>';
		pageStr += '</button>';
		pageStr += '</dt>';
		pageStr += '<dd class="c_e_csme">';
		pageStr += '<h6>综合能耗</h6>';
		pageStr += '<strong>';
		pageStr += '<span style="font-weight:bold;font-size:14px;">/</span>';
		pageStr += '<em></em>';
		pageStr += '</strong>';
		pageStr += '<span class="a-span">A:<i>/</i></span>';
		pageStr += '</dd>';
		pageStr += '<dd class="o_g_s_csme">';
		pageStr += '<h6>单耗</h6>';
		pageStr += '<strong>';
		pageStr += '<span style="font-weight:bold;font-size:14px;">/</span>';
		pageStr += '<em></em>';
		pageStr += '</strong>';
		pageStr += '<span class="a-span">A:<i>/</i></span>';
		pageStr += '</dd>';
		pageStr += '<dd class="c_e_carbon">';
		pageStr += '<h6>碳排放</h6>';
		pageStr += '<strong>';
		pageStr += '<span style="font-weight:bold;font-size:14px;">/</span>';
		pageStr += '<em></em>';
		pageStr += '</strong>';
		pageStr += '<span class="a-span">A:<i>/</i></span>';
		pageStr += '</dd>';
		pageStr += '<dd class="g_d_carbon">';
		pageStr += '<h6>天然气排空</h6>';
		pageStr += '<strong>';
		pageStr += '<span style="font-weight:bold;font-size:14px;">/</span>';
		pageStr += '<em></em>';
		pageStr += '</strong>';
		pageStr += '<span class="a-span">A:<i>/</i></span>';
		pageStr += '</dd>';
		pageStr += '</dl>';
		pageStr += '</td>';
		
		if(i == monthDay || (weekDay+i)%7 == 0){
			pageStr += '</tr>';
		}
	}
	
	$('#calendar-page').html(pageStr);
}

function toEnergyConsumptionMonth() {
	var year = $("#year").html();
	var month = $("#month").html();
	if((month+'').length == 1){
		month = '0' + month;
	}
	var date = year + '-' +month;
	window.location.href = URL+"/analyse/energyConsumption/monthEnergyConsumption?type=2&bdId=" + bdId + "&energyMonthDate=" + date;
}

function toCarbonEmissionMonth() {
	var year = $("#year").html();
	var month = $("#month").html();
	if((month+'').length == 1){
		month = '0' + month;
	}
	var date = year + '-' +month;
	window.location.href = URL+"/analyse/carbonEmission/monthCarbonEmission?type=2&bdId=" + bdId + "&time=" + date;
}

function toNaturalGasConsumeMonth() {
	var year = $("#year").html();
	var month = $("#month").html();
	if((month+'').length == 1){
		month = '0' + month;
	}
	var date = year + '-' +month;
	window.location.href = URL+"/monitor/naturalGasConsume/monthNaturalGasConsume?type=2&bdId=" + bdId + "&monthDate=" + date;
}


function toYearPageBack() {
	alert(pageBack)
	var year = $("#year").html();
	window.location.href = URL+"modules/preview/calendar/calendarMonth?date="+year;
}



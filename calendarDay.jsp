<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<html>
<head>
<meta charset="utf-8">
<title>日历天</title>
<%@include file="/WEB-INF/views/include/head.jsp"%>
<link rel="stylesheet" href="${ctxStatic}/eemcs/css/style.css"
	media="all">
<script src="${ctxWebapp}/js/preview/calendar/calendar.js"></script>
<script src="${ctxWebapp}/js/preview/calendar/calendarDay.js"></script>
</head>
<body>
	<div class="layui-fluid container dcalendar calendar">
		<div class="layui-tab layui-tab-card subtab">
			<div class="layui-tab-title">
				<ul class="pull-left" id="menu-list">
					<c:forEach items="${baseData}" var="plat" varStatus="status">
						<c:choose>
							<c:when test="${status.index}==0">
								<li>
									<a href="javascript:void(0)">${plat.name}</a>
									<span hidden="hidden">${plat.bdId}</span>
								</li>
							</c:when>
							<c:otherwise>
								<li>
									<a href="javascript:void(0)">${plat.name}</a>
									<span hidden="hidden">${plat.bdId}</span>
								</li>
							</c:otherwise>
						</c:choose>
					</c:forEach>
				</ul>
				 <form class="layui-form pull-right">
					<div class="layui-form-item">
						<label class="layui-form-label primary">标红超标项：</label>
						<div class="layui-inline">
							<sapn id="a-checkbox"><input type="checkbox" lay-skin="primary" value="" title="去年同步：A"	name="" checked="checked"></span>
							<input type="checkbox" lay-skin="primary" value="" title="对比目标线：B" name="" disabled>
						</div>
					</div>
				</form> 
			</div>
			<div class="layui-tab-content">
				<div class="layui-tab-item layui-show">
					<div class="layui-card">
						<div class="layui-card-header">
							<ul id="month-ul">
								<li class="column-type c_e_csme">
									<h5>综合能耗</h5>
									<div class="clear">
										<div class="pull-left">
											<span><strong>/</strong>吨标准</span>
										</div>
										<div class="pull-right">
											<span>A:<i>/</i></span>
											<span>B<i>/</i></span>
										</div>
									</div> <a href="javascript:void(0);" onclick="toEnergyConsumptionMonth()">详情<i>》</i></a>
								</li>
								<li class="column-type o_g_s_csme">
									<h5>油气单耗</h5>
									<div class="clear">
										<div class="pull-left">
											<span><strong>/</strong>标准煤/吨</span>
										</div>
										<div class="pull-right">
											<span>A:<i>/</i></span>
											<span>B:<i>/</i></span>
										</div>
									</div> <a href="javascript:void(0);" onclick="toEnergyConsumptionMonth()">详情<i>》</i></a>
								</li>
								<li class="time">
									<div class="date data-year">
										<a class="btn-prev change-date" href="javascript:void(0)">&lt;</a>
										<a id="year" class="data-txt" href="javascript:void(0)">${year}</a>
										<a class="btn-next change-date" href="javascript:void(0)">&gt;</a>
									</div>
									<div class="date data-month">
										<a class="btn-prev change-date" href="javascript:void(0)">&lt;</a>
										<a id='month' class="data-txt" href="javascript:void(0)">${month}</a>
										<a class="btn-next change-date" href="javascript:void(0)">&gt;</a>
									</div>
									<span>月度总值</span>
								</li>
								<li class="column-type c_e_carbon">
									<h5>碳排放</h5>
									<div class="clear">
										<div class="pull-left">
											<span><strong>/</strong>吨二氧化碳</span>
										</div>
										<div class="pull-right">
											<span>A:<i>/</i></span>
											<span>B:<i>/</i></span>
										</div>
									</div> <a href="javascript:void(0);" onclick="toEnergyConsumptionMonth()">详情<i>》</i></a>
								</li>
								<li class="column-type g_d_carbon">
									<h5>天然气排空</h5>
									<div class="clear">
										<div class="pull-left">
											<span><strong>/</strong>万方</span>
										</div>
										<div class="pull-right">
											<span>A:<i>/</i></span>
											<span>B:<i>/</i></span>
										</div>
									</div> <a href="javascript:void(0);" onclick="toNaturalGasConsumeMonth()">详情<i>》</i></a>
								</li>
							</ul>
							<a href="javascript:void(0);" onclick="toYeah()"><i> <!--&and;-->
							</i>返回上级</a>
						</div>
						<div class="layui-card-body">
							<table id="day-table" class="layui-table">
								<thead>
									<tr>
										<th>星期日<small>sun</small></th>
										<th>星期一<small>mon</small></th>
										<th>星期二<small>tue</small></th>
										<th>星期三<small>wed</small></th>
										<th>星期四<small>thu</small></th>
										<th>星期五<small>fri</small></th>
										<th>星期六<small>sat</small></th>
									</tr>
								</thead>
								<tbody id="calendar-page">
									<c:set var="weekDay" scope="page" value="${weekDay}"/>
									<c:set var="monthDay" scope="page" value="${monthDay}"/>
									<c:forEach begin="1" end="${monthDay}" step="1" var="item">
									<c:if test="${item==1 || (weekDay+item-1)%7==0}">
									<tr>
									</c:if>
										<c:if test="${item==1 && weekDay!=7}">
										<c:forEach begin="1" end="${weekDay}" step="1">
										<td></td>
										</c:forEach>
										</c:if>
										<td class="column-type">
											<dl class="clear">
												<dt class="clear">
													<span><em>${item}</em></span>
													<button class="layui-btn">
														查看该月<i>》</i>
													</button>
												</dt>
												<dd class="c_e_csme">
													<h6>综合能耗</h6>
													<strong>
														<span style="font-weight:bold;font-size:14px;">/</span>
														<em></em>
													</strong>
													<span class="a-span">A:<i>/</i></span>
													<!-- <span>B:<i>/</i></span> -->
												</dd>
												<dd class="o_g_s_csme">
													<h6>单耗</h6>
													<strong>
														<span style="font-weight:bold;font-size:14px;">/</span>
														<em></em>
													</strong>
													<span class="a-span">A:<i>/</i></span>
													<!-- <span>B:<i>/</i></span> -->
												</dd>
												<dd class="c_e_carbon">
													<h6>碳排放</h6>
													<strong>
														<span style="font-weight:bold;font-size:14px;">/</span>
														<em></em>
													</strong>
													<span class="a-span">A:<i>/</i></span>
													<!-- <span>B:<i>/</i></span> -->
												</dd>
												<dd class="g_d_carbon">
													<h6>天然气排空</h6>
													<strong>
														<span style="font-weight:bold;font-size:14px;">/</span>
														<em></em>
													</strong>
													<span class="a-span">A:<i>/</i></span>
													<!-- <span>B:<i>/</i></span> -->
												</dd>
											</dl>
										</td>
									<c:if test="${item==monthDay ||(weekDay+item)%7==0}">
									</tr>
									</c:if>
									</c:forEach>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<%@include file="/WEB-INF/views/include/bottom.jsp"%>

</body>
</html>
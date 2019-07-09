<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<html>
<head>
	<meta charset="utf-8"/>
	<title>日历天</title>
	<%@include file="/WEB-INF/views/include/head.jsp"%>
	<link rel="stylesheet" href="${ctxStatic}/eemcs/css/style.css" media="all">
	<script src="${ctxWebapp}/js/preview/calendar/calendar.js"></script>
	<script src="${ctxWebapp}/js/preview/calendar/calendarMonth.js"></script>
</head>
<body>
	<div class="layui-fluid container mcalendar calendar">
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
							<sapn id="a-checkbox"><input type="checkbox" lay-skin="primary" value="" title="去年同步：A"
								name="" checked></sapn> <input type="checkbox"
								lay-skin="primary" value="" title="对比目标线：B" name="" disabled>
						</div>
					</div>
				</form>
			</div>
			<div class="layui-tab-content">
				<div id="content" class="layui-tab-item layui-show">
					<div class="layui-card">
						<div class="layui-card-header">
							<ul id="year-ul">
								<li class="column-type c_e_csme">
									<h5>综合能耗</h5>
									<div class="clear">
										<div class="pull-left">
											<span><strong>/</strong>标准煤/吨</span>
										</div>
										<div class="pull-right">
											<span class="a-span">A:<i>/</i></span>
											<span>B:<i>/</i></span>
										</div>
									</div> <a href="javascript:void(0);" onclick="toEnergyConsumptionYear()">详情<i>》</i></a>
								</li>
								<li class="column-type o_g_s_csme">
									<h5>油气单耗</h5>
									<div class="clear">
										<div class="pull-left"> 	
											<span><strong>/</strong>标准煤/吨</span>
										</div>
										<div class="pull-right">
											<span class="a-span">A:<i>/</i></span>
											<span>B:<i>/</i></span>
										</div>
									</div> <a href="javascript:void(0);" onclick="toEnergyConsumptionYear()">详情<i>》</i></a>
								</li>
								<li class="time">
									<div class="date data-year">
										<a class="btn-prev" href="javascript:void(0)">&lt;</a>
										<fmt:formatDate value="<%=new java.util.Date()%>" pattern="yyyy" var="currentYear"/>
										<a id='year' class="data-txt" href="javascript:void(0)">${currentYear}</a>
										<a class="btn-next" href="javascript:void(0)">&gt;</a>
									</div>
									<span>年度总值</span>
								</li>
								<li class="column-type c_e_carbon">
									<h5>碳排放</h5>
									<div class="clear">
										<div class="pull-left">
											<span><strong>/</strong>吨</span>
										</div>
										<div class="pull-right">
											<span class="a-span">A:<i>/</i></span>
											<span>B:<i>/</i></span>
										</div>
									</div> <a href="javascript:void(0);" onclick="toCarbonEmissionYear()">详情<i>》</i></a>
								</li>
								<li class="column-type g_d_carbon">
									<h5>天然气排空</h5>
									<div class="clear">
										<div class="pull-left">
											<span><strong>/</strong>方</span>
										</div>
										<div class="pull-right">
											<span class="a-span">A:<i>/</i></span>
											<span>B:<i>/</i></span>
										</div>
									</div> <a href="javascript:void(0);" onclick="toNaturalGasConsumeYear()">详情<i>》</i></a>
								</li>
							</ul>
						</div>
						<div class="layui-card-body">
							<ul id="month-ul">
								<c:forEach begin="1" end="12" step="1" var="item">
									<li class="column-type">
										<dl class="clear">
											<dt class="clear">
												<span><em>${item}</em>月</span>
												<a class="layui-btn check-the-month" onclick="toCalendarDay(${item})">查看该月<i>》</i></a>
											</dt>
											<dd class="c_e_csme">
												<h6>综合能耗</h6>
												<strong>
													<span>/</span>
													<em>吨标煤/吨</em>
												</strong>
												<span class="a-span">A:<i>/</i></span>
												<span>B:<i>/</i></span>
												<button class="layui-btn" onclick="toEnergyConsumptionMonth(${item})">详情<i>》</i></button>
											</dd>
											<dd class="o_g_s_csme">
												<h6>油气单耗</h6>
												<strong>
													<span>/</span>
													<em>标准煤/吨</em>
												</strong>
												<span class="a-span">A:<i>/</i></span>
												<span>B:<i>/</i></span>
												<button class="layui-btn" onclick="toEnergyConsumptionMonth(${item})">详情<i>》</i></button>
											</dd>
											<dd class="c_e_carbon">
												<h6>碳排放</h6>
												<strong>
													<span>/</span>
													<em>吨</em>
												</strong>
												<span class="a-span">A:<i>/</i></span>
												<span>B:<i>/</i></span>
												<button class="layui-btn" onclick="toCarbonEmissionMonth(${item})">详情<i>》</i></button>
											</dd>
											<dd class="g_d_carbon">
												<h6>天然气排空</h6>
												<strong>
													<span>/</span>
													<em>方</em>
												</strong>
												<span class="a-span">A:<i>/</i></span>
												<span>B:<i>/</i></span>
												<button class="layui-btn" onclick="toNaturalGasConsumeMonth(${item})">详情<i>》</i></button>
											</dd>
										</dl>
									</li>
								</c:forEach>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<%@include file="/WEB-INF/views/include/bottom.jsp"%>
</body>
</html>
var MyNg = {
	createTable: function(args){
		var tableTemplate = "";
		var app;
		if("title" in args){
			args.title = "表格";
		}
		if("app" in args){
			app = args.app;
		}
		tableTemplate += '<div class="cl pd-5 bg-1 bk-gray mt-20">' +
    		'<span class="l">'+args.title+'</span>';
		
		if(Array.isArray(args.columns)){
			var thsStr = "";
			var tdsStr = "";
			
			for(var i in args.columns){
				var column = args.columns[i];
				
				if("text" in column){//若text属性存在，组装列，兼容ie8
					thsStr += '<th>'+column.text+'</th>';
					if(column.xtype != "actioncolumn"){
						tdsStr += '<td>{{obj.'+column.dataIndex;
						if("format" in column){tdsStr += ' | '+column.format;}
							tdsStr += '}}</td>';
					}else{
						tdsStr += '<td>'+column.actionBtns+'</td>';
					}
				}
				
			}
			
			tableTemplate += '<span class="r">共有数据：<strong>{{page.totalCount}}</strong> 条</span>' +
			'</div>' +
	        '<table class="table table-border table-bordered table-bg">' +
				'<thead>' +
					'<tr class="text-c">' + 
					thsStr + 
					'</tr>' + 
					'<tr class="text-c" ng-repeat="obj in lists">' + 
					tdsStr + 
					'</tr>' + 
				'</thead>' + 
			'</table>' + 
			'<div class="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite">显示 {{page.startRow}} 到 {{page.endRow}} ，共 {{lists.length}} 条</div>' + 
			'<div class="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate">' + 
				'<a class="paginate_button previous disabled" aria-controls="DataTables_Table_0" data-dt-idx="0" tabindex="0" ng-click="prePage()">上一页</a>' + 
				'<span><a class="paginate_button current" aria-controls="DataTables_Table_0" data-dt-idx="1" tabindex="0">{{page.page}}</a></span>' + 
				'<a class="paginate_button next disabled" aria-controls="DataTables_Table_0" data-dt-idx="2" tabindex="0" ng-click="nextPage()">下一页</a>' + 
			'</div>';
		}

		/*var app = angular.module('myApp', []);
		app.filter('formatTime', function () {
		    return function (value) {
		    	if (!value) return '';
		        return new Date(value).Format("yyyy-MM-dd");
		    };
		}).filter('formatZt', function () {
		    return function (value) {
		    	if (!value) return '';
		    	if(value == 1) return "待审核";
		    	if(value == 2) return "预审通过";
		    	if(value == 3) return "审核不通过";
		    	if(value == 4) return "审核通过";
		    };
		}).*/
		app.filter('formatTime', function () {
		    return function (value) {
		    	if (!value) return '';
		        return new Date(value).Format("yyyy-MM-dd");
		    };
		});
		
		app.directive('mytable', [ function(){
		    return {
		        // scope: false, // 默认值，共享父级作用域
		        // controller: function($scope, $element, $attrs, $transclude) {},
		        restrict: 'AE', // E = Element, A = Attribute, C = Class, M = Comment
		        template: tableTemplate
		    };
		}]);
		
		return app;
	}
}

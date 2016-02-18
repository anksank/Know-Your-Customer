if(!sap){
	var sap={};
}

if ( !sap.ui ) {
	sap.ui = {};
}

if ( !sap.ui.graph ) {
	sap.ui.graph = { colors : ["#9DC869","#26ABCE","#F99E53","#A25482","#415E79"]};
}



sap.ui.graph.ActualTarget = (function(){
	
	var obj = {};
	var count = 1;
	var groups = [];
	
	obj.create = function(group,metaData) {
		 	var graph = new sap.ui.core.HTML({ width : metaData.width + "px" , height : metaData.height + "px" , afterRendering : function(event){
 		 	}});
//		 	graph.setContent("<div width=\""+metaData.width+"\" height=\""+metaData.height+"\" ><canvas id=\"atcanvas"+count+"\" class=\"atcanvas"+count+"\" width=\""+metaData.width+"\" height=\""+metaData.height+"\" ></canvas></div>");
		 	graph.setContent("<canvas id=\"atcanvas"+count+"\" class=\"atcanvas"+count+"\" width=\""+metaData.width+"\" height=\""+metaData.height+"\" ></canvas>");

		 	if ( groups.indexOf(group) == -1 ) {
		 		groups.push(group);
		 		group.render = function() {
		 			obj.render(group);
		 		};
		 	}
		 	if ( !group.items ) {
		 		group.items = [];
		 	}
		 	group.items.push({ graph : graph , metaData : metaData , canvasId : "atcanvas" + count });
		 	count++;
		 	
		 	return graph;
	};
	
	obj.render = function(group) {
		var actual = 0;
		var target = 0;
		
		for ( var i = 0; i < group.items.length; i++ ) {
			var data = group.items[i].metaData;
			
			if ( data[data.actualField] < actual )
				actual = data[data.actualField];

			if ( data[data.targetField] > target )
				target = data[data.targetField];
			
		}
		
		if ( actual == 0 )
			actual = -10;
		
		target += 20;
		
		for ( i = 0; i < group.items.length; i++ ) {
			obj.renderChart(group.items[i],actual,target);
		}
		

	};
	
	obj.renderChart = function(item,actual,target) {
		var canvasId = item.canvasId;
		var data = item.metaData;
		
		var canvas = document.getElementById(canvasId);
		var context = canvas.getContext('2d');
		
		obj.clear(canvas,context);
		
		var left = 2;
		var top = 2;
		
		var width = data.width - 2*left;
		var height = data.height - 2*top;
		
		sap.ui.canvas.drawRect(context,{x:left,y:top,width:width,height:height},{fillStyle : "#F1F0EE"});
		
		var offsetValue = width/(target - actual);
		var barHeight = height/3;

		sap.ui.canvas.animateRect(context,{x:left,y:top+height/2 - barHeight/2,width:offsetValue * ( data[data.actualField] - actual),height:barHeight},{fillStyle : "#81CA44"},"horizontal",1);

		sap.ui.canvas.animateRect(context,{x:offsetValue * ( data[data.targetField] - actual ) + left,y:top,width:3,height:height},{fillStyle : "#666460"},"vertical",1);

	};
	
	
	
	obj.clear = function(canvas,context) {
		if ( canvas != null && context != null )
			context.clearRect(0,0,canvas.width,canvas.height);
	};
	
	
	return obj;

})();

sap.ui.graph.SingleBarChart = (function(){
	
	var obj = {};
	var count = 1;
	var groups = [];
	
	obj.create = function(group,metaData) {
		 	var graph = new sap.ui.core.HTML({ width : metaData.width + "px" , height : metaData.height + "px" , afterRendering : function(event){
 		 	}});
//		 	graph.setContent("<div width=\""+metaData.width+"\" height=\""+metaData.height+"\" ><canvas id=\"atcanvas"+count+"\" class=\"atcanvas"+count+"\" width=\""+metaData.width+"\" height=\""+metaData.height+"\" ></canvas></div>");
		 	graph.setContent("<canvas id=\"sbcanvas"+count+"\" class=\"sbcanvas"+count+"\" width=\""+metaData.width+"\" height=\""+metaData.height+"\" ></canvas>");

		 	if ( groups.indexOf(group) == -1 ) {
		 		groups.push(group);
		 		group.render = function() {
		 			obj.render(group);
		 		};
		 	}
		 	if ( !group.items ) {
		 		group.items = [];
		 	}
		 	
		 	metaData.showBackground = false;
		 	
		 	group.items.push({ graph : graph , metaData : metaData , canvasId : "sbcanvas" + count });
		 	count++;
		 	
		 	return graph;
	};
	
	obj.render = function(group) {
		var min;
		var max;
		
		for ( var i = 0; i < group.items.length; i++ ) {
			var data = group.items[i].metaData;
			
			if ( !min )
				min = data[data.valueField];
			if ( !max )
				max = data[data.valueField];
			
			if ( data[data.valueField] < min )
				min = data[data.valueField];

			if ( data[data.valueField] > max )
				max = data[data.valueField];
			
		}
				
		min -= 10;
		max += 20;
		
		for ( i = 0; i < group.items.length; i++ ) {
			obj.renderChart(group.items[i],min,max);
		}
		

	};
	
	obj.renderChart = function(item,min,max) {
		var canvasId = item.canvasId;
		var data = item.metaData;
		
		var canvas = document.getElementById(canvasId);
		var context = canvas.getContext('2d');
		
		obj.clear(canvas,context);
		
		var left = 2;
		var top = 2;
		
		var width = data.width - 2*left;
		var height = data.height - 2*top;
		
		var offsetValue = width/(max - min);
		var barHeight = height;
		
		var barWidth = offsetValue * ( data[data.valueField] - min);
		
		if ( data.showBackground ) {
			sap.ui.canvas.drawRect(context,{x:left,y:top+height/2 - barHeight/2,width:width,height:barHeight},{fillStyle : "#F1F0EE"});
		}

		sap.ui.canvas.animateRect(context,{x:left,y:top+height/2 - barHeight/2,width:barWidth,height:barHeight},{fillStyle : "#81CA44"},"horizontal",1);


	};
	
	
	
	obj.clear = function(canvas,context) {
		if ( canvas != null && context != null )
			context.clearRect(0,0,canvas.width,canvas.height);
	};
	
	
	return obj;

})();

sap.ui.graph.BarChart = (function(){
	
	var obj = {};
	var count = 1;
	var groups = [];
	
	obj.create = function(metaData) {
			var mData = {};
		 	var graph = new sap.ui.core.HTML({ width : metaData.width + "px" , height : metaData.height + "px" , afterRendering : function(event){
		 		obj.render(mData);
 		 	}});
//		 	graph.setContent("<div width=\""+metaData.width+"\" height=\""+metaData.height+"\" ><canvas id=\"atcanvas"+count+"\" class=\"atcanvas"+count+"\" width=\""+metaData.width+"\" height=\""+metaData.height+"\" ></canvas></div>");
		 	graph.setContent("<canvas id=\"bcanvas"+count+"\" class=\"bcanvas"+count+"\" width=\""+metaData.width+"\" height=\""+metaData.height+"\" ></canvas>");

		 	mData.content = graph;
		 	mData.width = metaData.width;
		 	mData.height = metaData.height;
		 	mData.canvasId = "bcanvas"+count;
		 	mData.setData = function(data) {
		 		mData.data = data;
		 		graph.rerender();
		 	};

		 	count++;
		 	
		 	return mData;
	};
	
	obj.render = function(mData) {
		
		var min = mData.minValue;
		var max = mData.maxValue;
		
		var data = mData.data;

		var canvasId = mData.canvasId;
		
		var canvas = document.getElementById(canvasId);
		var context = canvas.getContext('2d');

		obj.clear(canvas,context);
		if ( data.length == 0 )	return;
		
		for ( var i = 0; i < data.length; i++ ) {
				
				if ( min == undefined )
					min = data[i][mData.valueField];
				if ( max == undefined )
					max = data[i][mData.valueField];
				
				if ( data[i][mData.valueField] < min )
					min = data[i][mData.valueField];
	
				if ( data[i][mData.valueField] > max )
					max = data[i][mData.valueField];
			
		}
		
		
		if ( min == 0 && max == 0 )
			return;
		
		
		var left = 2;
		var top = 2;
		
		var width = canvas.width - 2*left;
		var height = canvas.height - 2*top;
		
		if ( mData.showLabels ) {
			height -= 20;
			width -= 85;
		}		
		sap.ui.canvas.drawRect(context,{x:left,y:top,width:width,height:height},{fillStyle : "#C0C0C0"});
		
		//width -= 30;
		
		var offsetValue = width/(max - min);
		var barHeight = 25;
		var verticalGap = (height - (barHeight * data.length)) / (data.length + 1);
		
		var yOffset = top+height - verticalGap -barHeight;

		
		for ( var j = 0; j < data.length; j++ ) {
			sap.ui.canvas.animateRect(context,{x:left,y:yOffset,width:offsetValue * (data[j][mData.valueField] - min) - 2 ,height:barHeight},{fillStyle : "#00A58D" },"horizontal",1);
			
			if ( mData.showLabels ) {
				context.fillStyle="black";
				context.lineWidth=1;
				context.fillText(data[j][mData.labelField],canvas.width - 2*left - 75,yOffset+verticalGap);
			}
			yOffset -= verticalGap + barHeight;

		}

		if ( mData.showLabels ) {
			context.fillStyle="black";
			context.lineWidth=1;
			context.fillText(min,left,canvas.height - 10);
			
			context.fillStyle="black";
			context.lineWidth=1;
			context.fillText(max,canvas.width - 2*left - 85,canvas.height -10);
		}

	};	
	
	
	obj.clear = function(canvas,context) {
		if ( canvas != null && context != null )
			context.clearRect(0,0,canvas.width,canvas.height);
	};
	
	
	return obj;

})();


sap.ui.graph.SingleStackedBarChart = (function(){
	
	var obj = {};
	var count = 1;
	var groups = [];
	
	obj.create = function(group,metaData) {
		 	var graph = new sap.ui.core.HTML({ width : metaData.width + "px" , height : metaData.height + "px" , afterRendering : function(event){
 		 	}});
//		 	graph.setContent("<div width=\""+metaData.width+"\" height=\""+metaData.height+"\" ><canvas id=\"atcanvas"+count+"\" class=\"atcanvas"+count+"\" width=\""+metaData.width+"\" height=\""+metaData.height+"\" ></canvas></div>");
		 	graph.setContent("<canvas id=\"ssbcanvas"+count+"\" class=\"ssbcanvas"+count+"\" width=\""+metaData.width+"\" height=\""+metaData.height+"\" ></canvas>");

		 	if ( groups.indexOf(group) == -1 ) {
		 		groups.push(group);
		 		group.render = function() {
		 			obj.render(group);
		 		};
		 	}
		 	if ( !group.items ) {
		 		group.items = [];
		 	}
		 	group.items.push({ graph : graph , metaData : metaData , canvasId : "ssbcanvas" + count });
		 	count++;
		 	
		 	return graph;
	};
		
	obj.render = function(group) {
		var min = 0;
		var max;
		var series = [];
		var seriesDict = {};
		var colors = group.colors;
		
		if ( !colors )
			colors = sap.ui.graph.colors;
		
		var anIndex = 0;
		
		for ( var i = 0; i < group.items.length; i++ ) {
			
			var metaData = group.items[i].metaData;
			var data = group.items[i].metaData.data;
			
			var total = 0;
			
			for ( var j = 0; j < data.length; j++ ) {
				
				var seriesObj = undefined;
				seriesObj = seriesDict[data[j][metaData.seriesField]];
				
				if ( !seriesObj ) {
					seriesObj = { name : data[j][metaData.seriesField] , color : colors[anIndex++]};
					seriesDict[data[j][metaData.seriesField]] = seriesObj;
					series.push(seriesObj);
				}
				
				total += data[j][metaData.valueField];
			}
			
			if ( !max )
				max = total;
			
			if ( total > max )
				max = total;
			
		}
		
		group.series = series;
						
		for ( i = 0; i < group.items.length; i++ ) {
			obj.renderChart(group.items[i],series,min,max);
		}
		
		group.getLegend = function(options) {
			return obj.getLegend(group,options);
		};

	};
	
	obj.renderChart = function(item,series,min,max) {
		
		var metaData = item.metaData;
		var data = item.metaData.data;

		var canvasId = item.canvasId;
		
		var canvas = document.getElementById(canvasId);
		var context = canvas.getContext('2d');
		
		obj.clear(canvas,context);
		
		var left = 5;
		var top = 2;
		
		var width = metaData.width - 2*left;
		var height = metaData.height - 2*top;
		
		var offsetValue = width/(max - min);
		var barHeight = height;
		
		for ( var i = 0; i < series.length; i++ ) {
			for ( var j = 0; j < data.length; j++ ) {
				if ( data[j][metaData.seriesField] != series[i].name ) continue; 
				sap.ui.canvas.animateRect(context,{x:left,y:top+height/2 - barHeight/2,width:offsetValue * data[j][metaData.valueField],height:barHeight},{fillStyle : series[i].color},"horizontal",1);
				left += offsetValue * data[j][metaData.valueField];
			}
		}



	};
	
	
	obj.getLegend = function(group,options) {
		
		if ( !group.series )
			return undefined;
		
	 	var legend = new sap.ui.core.HTML();
	 	
	 	//var content = "<div>";
	 	var content = "<div>";
	 	
	 	var elementName = "span";
	 	if ( !options && options.direction == "vertical" )
	 		elementName = "div";
	 	
	 	/*for ( var i = 0; i < group.series.length; i++ ) {
	 		content += "&nbsp;&nbsp;<"+elementName+">&nbsp;<span style=\"width:8px;height:8px;background-color:"+group.series[i].color+"\">&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;"+group.series[i].name+"</"+elementName+">";
	 	}*/
	 	for ( var i = 0; i < group.series.length; i++ ) {
	 		content += "&nbsp;&nbsp;<"+elementName+ " style=\"font-size: 9px\""+">&nbsp;<span style=\"width:8px;height:8px;background-color:"+group.series[i].color+"\">&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;"+
	 		"<span style=\"font-family:Arial;font-size:11px; color:#979797\">" + group.series[i].name+"</"+elementName+">" + "</"+elementName+">";
	 	}
	 	
	 	legend.setContent(content);
	 	return legend;
	};
	
	
	obj.clear = function(canvas,context) {
		if ( canvas != null && context != null )
			context.clearRect(0,0,canvas.width,canvas.height);
	};
	
	
	return obj;

})();




sap.ui.graph.LineChart = (function(){
	var obj = {};
	var count = 1;
	
	obj.create = function(metaData) {
		 	var graph = new sap.ui.core.HTML({ width : metaData.width + "px" , height : metaData.height + "px" , afterRendering : function(event){
 		 	}});
		 	graph.setContent("<canvas id=\"lccanvas"+count+"\" class=\"lccanvas"+count+"\" width=\""+metaData.width+"\" height=\""+metaData.height+"\" ></canvas>");

		 	
		 	var mData = {};
		 	mData.content = graph;
		 	mData.width = metaData.width;
		 	mData.height = metaData.height;
		 	mData.canvasId = "lccanvas"+count;

		 	count++;

		 	return mData;
	};
	
	obj.render = function(mData) {
		var min;
		var max;
		
		var data = mData.data;
		var measures = mData.measures;
		
		var canvasId = mData.canvasId;
		
		var canvas = document.getElementById(canvasId);
		var context = canvas.getContext('2d');

		obj.clear(canvas,context);
		if ( data.length == 0 )	return;
		
		for ( var i = 0; i < data.length; i++ ) {
			for ( var j = 0; j < measures.length; j++ ) {
				
				if ( !min )
					min = data[i][measures[j]];
				if ( !max )
					max = data[i][measures[j]];
				
				if ( data[i][measures[j]] < min )
					min = data[i][measures[j]];
	
				if ( data[i][measures[j]] > max )
					max = data[i][measures[j]];
			}
			
		}
		
		if ( min == 0 && max == 0 )
			return;
		
		
		var left = 2;
		var top = 2;
		
		var width = canvas.width - 2*left;
		var height = canvas.height - 2*top;
		
		sap.ui.canvas.drawRect(context,{x:left,y:top,width:width,height:height},{fillStyle : "#F1F0EE"});
		
		context.moveTo(left,top+height);
		context.lineTo(left+width,top+height);
		context.lineWidth = 2;
		context.strokeStyle = '#C3C3C3';
		context.stroke();
		
		height -= 4;
		top += 4;

		var xOffset = width / (data.length - 1);
		var yOffset = height / ( max - min ) ;
		
		
		var currentX = 0;
		var points = [];

		for ( var j = 0; j < measures.length; j++ ) {
			currentX = left;
			//context.moveTo(currentX,top+height);
			for ( var i = 0; i < data.length; i++ ) {
				points.push({ x : left+xOffset * (i), y : top+height-yOffset * ( data[i][measures[j]] - min ) });
				//context.lineTo(left+xOffset * (i+1),top+height-yOffset * data[i][measures[j]] );
			}
			points.reverse();
			obj.renderLine(context,points,100,true);
			
		}
	};	

	obj.renderLine = function(context,points,time,start) {
		var point = points.pop();
		if ( point == undefined )	return;
		if ( start ) {
			context.beginPath();
			context.moveTo(point.x,point.y );
		} else {
			context.lineTo(point.x,point.y );
			context.lineWidth = 1;
			context.strokeStyle = '#99CB4D';
			context.stroke();
		}
		if ( points.length > 0 )
		setTimeout(function(){
			obj.renderLine(context,points,time,false);
		},time);
	};

	obj.clear = function(canvas,context) {
		if ( canvas != null && context != null )
			context.clearRect(0,0,canvas.width,canvas.height);
	};
	
	return obj;
})();

//sap.ui.graph.BubbleChart = (function(){
//	var obj = {};
//	var count = 1;
//	
//	obj.create = function(metaData) {
//		 	var graph = new sap.ui.core.HTML({ width : metaData.width + "px" , height : metaData.height + "px" , afterRendering : function(event){
// 		 	}});
//		 	graph.setContent("<canvas id=\"bccanvas"+count+"\" class=\"bccanvas"+count+"\" width=\""+metaData.width+"\" height=\""+metaData.height+"\" ></canvas>");
//
//		 	
//		 	var mData = {};
//		 	mData.content = graph;
//		 	mData.width = metaData.width;
//		 	mData.height = metaData.height;
//		 	mData.canvasId = "bccanvas"+count;
//
//		 	count++;
//
//		 	return mData;
//	};
//	
//	obj.render = function(mData) {
//		var min;
//		var max;
//		
//		var data = mData.data;
//		var measures = mData.measures;
//		
//		var canvasId = mData.canvasId;
//		
//		var canvas = document.getElementById(canvasId);
//		var context = canvas.getContext('2d');
//
//		obj.clear(canvas,context);
//		if ( data.length == 0 )	return;
//		
//		for ( var i = 0; i < data.length; i++ ) {
//			for ( var j = 0; j < measures.length; j++ ) {
//				
//				if ( !min )
//					min = data[i][measures[j]];
//				if ( !max )
//					max = data[i][measures[j]];
//				
//				if ( data[i][measures[j]] < min )
//					min = data[i][measures[j]];
//	
//				if ( data[i][measures[j]] > max )
//					max = data[i][measures[j]];
//			}
//			
//		}
//		
//		if ( min == 0 && max == 0 )
//			return;
//		
//		
//		var left = 2;
//		var top = 2;
//		
//		var width = canvas.width - 2*left;
//		var height = canvas.height - 2*top;
//		
//		sap.ui.canvas.drawRect(context,{x:left,y:top,width:width,height:height},{fillStyle : "#F1F0EE"});
//		
//		context.moveTo(left,top+height);
//		context.lineTo(left+width,top+height);
//		context.lineWidth = 2;
//		context.strokeStyle = '#C3C3C3';
//		context.stroke();
//		
//		height -= 4;
//		top += 4;
//
//		var xOffset = width / (data.length - 1);
//		var yOffset = height / ( max - min ) ;
//		
//		
//		var currentX = 0;
//		var points = [];
//
//		for ( var j = 0; j < measures.length; j++ ) {
//			currentX = left;
//			//context.moveTo(currentX,top+height);
//			for ( var i = 0; i < data.length; i++ ) {
//				points.push({ x : left+xOffset * (i), y : top+height-yOffset * ( data[i][measures[j]] - min ) });
//				//context.lineTo(left+xOffset * (i+1),top+height-yOffset * data[i][measures[j]] );
//			}
//			points.reverse();
//			obj.renderLine(context,points,100,true);
//			
//		}
//	};	
//
//	obj.renderLine = function(context,points,time,start) {
//		var point = points.pop();
//		if ( point == undefined )	return;
//		if ( start ) {
//			context.beginPath();
//			context.moveTo(point.x,point.y );
//		} else {
//			context.lineTo(point.x,point.y );
//			context.lineWidth = 1;
//			context.strokeStyle = '#99CB4D';
//			context.stroke();
//		}
//		if ( points.length > 0 )
//		setTimeout(function(){
//			obj.renderLine(context,points,time,false);
//		},time);
//	};
//
//	obj.clear = function(canvas,context) {
//		if ( canvas != null && context != null )
//			context.clearRect(0,0,canvas.width,canvas.height);
//	};
//	
//	return obj;
//})();

sap.ui.graph.BubbleChart = (function(){
	var obj = {};
	var count = 1;
	var dict = {};
	
	obj.create = function(metaData) {
		 	var graph = new sap.ui.core.HTML({ width : metaData.width + "px" , height : metaData.height + "px" });
		 	//graph.setContent("<canvas id=\"bccanvas"+count+"\" class=\"bccanvas"+count+"\" width=\""+metaData.width+"\" height=\""+metaData.height+"\" ></canvas>");

		 	
		 	var mData = {};
		 	mData.content = graph;
		 	mData.width = metaData.width;
		 	mData.height = metaData.height;
		 	mData.canvasId = "bccanvas"+count;
		 	mData.showRange = true;
		 	mData.render = function() {
		 		obj.render(mData);
		 	};
		 	
		 	dict[mData.canvasId] = mData;

		 	count++;

		 	return mData;
	};
	
	obj.render = function(mData) {
		
		var minX;
		var maxX;
		var minY;
		var maxY;
		var bubbleMin;
		var bubbleMax;
		var categoryMin;
		var categoryMax;
		
		var data = mData.data;
		var xAxis = mData.xAxis;
		var yAxis = mData.yAxis;
		var category = mData.category;
		var bubble = mData.bubble;
		
		var legendHeight = 20;

		var left = 2;
		var top = 2 + legendHeight + 18;
		var labelHeight = 20;
		var xAxisLabelHeight = 20;
		
		var width = mData.width - left - labelHeight ;
		var height = mData.height - top - labelHeight - xAxisLabelHeight ;
		
		var svg = sap.ui.svg.startSVG(mData.width,mData.height);

		if ( data.length == 0 )	{
			svg += sap.ui.svg.drawText({ x : left + (width-sap.ui.svg.measureText("No Data",15))/2  , y : top+height/2 , style: "font-size:15;font-family:Arial;" , fill : "black" },"No Data");
			svg += sap.ui.svg.endSVG();
			mData.content.setContent("<div>"+svg+"</div>");
			return;
		}
		
		for ( var i = 0; i < data.length; i++ ) {
				
			if ( minX == undefined )
				minX = data[i][xAxis.value];
			if ( maxX == undefined )
				maxX = data[i][xAxis.value];
			
			if ( minY == undefined )
				minY = data[i][yAxis.value];
			if ( maxY == undefined )
				maxY = data[i][yAxis.value];
			
			if ( bubbleMin == undefined )
				bubbleMin = data[i][bubble.value];
			if ( bubbleMax == undefined )
				bubbleMax = data[i][bubble.value];
			
			if ( categoryMin == undefined )
				categoryMin = data[i][category.value];
			if ( categoryMax == undefined )
				categoryMax = data[i][category.value];
			
			
			if ( data[i][xAxis.value] < minX )
				minX = data[i][xAxis.value];

			if ( data[i][yAxis.value] < minY )
				minY = data[i][yAxis.value];

			if ( data[i][xAxis.value] > maxX )
				maxX = data[i][xAxis.value];
			
			if ( data[i][yAxis.value] > maxY )
				maxY = data[i][yAxis.value];

			if ( data[i][bubble.value] < bubbleMin )
				bubbleMin = data[i][bubble.value];

			if ( data[i][bubble.value] > bubbleMax )
				bubbleMax = data[i][bubble.value];
			
			if ( data[i][category.value] < categoryMin )
				categoryMin = data[i][category.value];

			if ( data[i][category.value] > categoryMax )
				categoryMax = data[i][category.value];
			

		}
		
//		if ( bubbleMin == 0 && bubbleMax == 0 )
//			return;

		
		//var legend = {};
		
		var legend = "";
		

		//Drawing Background
		//sap.ui.canvas.drawRect(context,{x:left,y:top,width:width,height:height},{fillStyle : "#F1F0EE"});
		
		svg += sap.ui.svg.drawLine(left,top+height,left+width,top+height,'#DCD9D5',1);
		svg += sap.ui.svg.drawText({ x : left + width-sap.ui.svg.measureText(xAxis.label)  , y : top+height+xAxisLabelHeight+12 , style: "font-size:11;font-family:Arial;" , fill : "black" },xAxis.label);


		svg += sap.ui.svg.drawLine(left+width,top+height,left+width,top,'#DCD9D5',1);
		svg += sap.ui.svg.drawText({ x : "-0"  , y : "-" + (left+width+ 5) , transform : "rotate(90 -20,20)" , style: "font-size:11;font-family:Arial;" , fill : "black" },yAxis.label);

		svg += sap.ui.svg.drawLine(left,top,left+width,top,'#DCD9D5',1);
		svg += sap.ui.svg.drawLine(left,top,left,top+height,'#DCD9D5',1);
		
		var maxBubbleRadius = 40;
		var offsetBubbleRadius = (maxBubbleRadius - 5 ) / ( bubbleMax - bubbleMin);
		var marginRadiusOffset = 1.2;
		
		if ( bubbleMax <= (maxBubbleRadius - 5) && bubbleMin >= 0 ) {
			offsetBubbleRadius = (maxBubbleRadius - 5)/bubbleMax;
			if ( offsetBubbleRadius < 1 )
				offsetBubbleRadius = 1;
			bubbleMin = 0;
		}

		var xOffset = (width - (maxBubbleRadius * marginRadiusOffset * 2)) / (maxX - minX);
		var yOffset = (height - (maxBubbleRadius * marginRadiusOffset * 2))  / ( maxY - minY ) ;

		var offsetMinX = minX - (maxBubbleRadius / xOffset) * marginRadiusOffset;
		var offsetMaxX = maxX + (maxBubbleRadius / xOffset) * marginRadiusOffset;
		var offsetMinY = minY - (maxBubbleRadius / yOffset) * marginRadiusOffset;
		var offsetMaxY = maxY + (maxBubbleRadius / yOffset) * marginRadiusOffset;
		
		mData.bounds = { minX : left , minY : top , maxX : left + width , maxY : top + height };
		
		var horizontalPartitions = 5;
		var verticalPartitions = 5;
		
		var xGap = (offsetMaxX - offsetMinX ) / horizontalPartitions;
		var yGap = (offsetMaxY - offsetMinY ) / verticalPartitions;
		
		var horizontalGap = width / horizontalPartitions;
		var verticalGap = height / verticalPartitions;
		
		var decimalCount = xAxis.decimalCount;
		if ( decimalCount == undefined )
			decimalCount = 2;
		
		var currentValue = offsetMinX.toFixed(decimalCount) + "";
		if ( offsetMinX >= 0)
			svg += sap.ui.svg.drawText({ x : left + 2  , y : top+height+xAxisLabelHeight-5 , style: "font-size:11;font-family:Arial;" , fill : "#989898" },currentValue);

		for ( var i = 1; i < horizontalPartitions+1; i++ ) {

			svg += sap.ui.svg.drawLine(left+(horizontalGap * i),top,left+(horizontalGap * i),top+height,'#E7E5E2',0.5);
			var currentValue = (offsetMinX + (xGap * i)).toFixed(decimalCount) + "";
			svg += sap.ui.svg.drawText({ x : left + (horizontalGap * i)-sap.ui.svg.measureText(currentValue) -5  , y : top+height+xAxisLabelHeight-5 , style: "font-size:11;font-family:Arial;" , fill : "#989898" },currentValue);
		}

		decimalCount = yAxis.decimalCount;
		if ( decimalCount == undefined )
			decimalCount = 2;
		

		currentValue = (offsetMaxY).toFixed(decimalCount) + "";
		
		//if ( offsetMaxY >= 0)
			svg += sap.ui.svg.drawText({ x : left + width-sap.ui.svg.measureText(currentValue)-5  , y : top+12 , style: "font-size:11;font-family:Arial;" , fill : "#989898" },currentValue);

		for ( var j = 1; j < verticalPartitions+1; j++ ) {

			svg += sap.ui.svg.drawLine(left,top+(verticalGap * j),left+width,top+(verticalGap * j),'#E7E5E2',0.5);
			var currentValue = (offsetMaxY - (yGap * j)).toFixed(decimalCount) + "";
			if ( currentValue.indexOf("-") != 0 || j != verticalPartitions )
			svg += sap.ui.svg.drawText({ x : left + width-sap.ui.svg.measureText(currentValue) -5  , y : top+(verticalGap * j)-5 , style: "font-size:11;font-family:Arial;" , fill : "#989898" },currentValue);

		}
		
		var colors = mData.colors;
		if ( colors == undefined )
			colors = sap.ui.graph.colors;

		var colors = JSON.parse(JSON.stringify(colors));
		
		var rangeLabel = "Range: "+bubbleMin + " - "+ bubbleMax;
		var rangeLabelSVG = sap.ui.svg.drawText({ x : left + width - sap.ui.svg.measureText(rangeLabel)  , y : legendHeight-4 , style: "font-size:11;font-family:Arial;" , fill : "#989898" },rangeLabel);

		
		left += maxBubbleRadius * marginRadiusOffset;
		top -= maxBubbleRadius * marginRadiusOffset;
		
		var legendOffset = 0;//65;
		var legendIndex = 0;

		var legendData = {};

		var segmentsCount;
		var userSegments = mData.segmentData;
		
		if ( bubbleMin == 0 && bubbleMax == 0 ) {
			
		} else {
		
			if ( userSegments && categoryMin == categoryMax )
				userSegments = false;
			
			if ( userSegments ) {
				segmentsCount = mData.segmentsCount;
				
				if ( segmentsCount == undefined || segmentsCount == 0 )
					segmentsCount = 4;
				
				var segmentOffset = (categoryMax - categoryMin)/segmentsCount;

				for ( var i = 0; i < segmentsCount; i++ ) {
					if ( category.formatType == "P" ) {
						legendData[i] = { min : i * 100 / segmentsCount, max : ( i + 1 ) * 100 / segmentsCount };
					} else {
						legendData[i] = { min : categoryMin + ( i * segmentOffset) , max : categoryMin + ((i+1)* segmentOffset) };
					}
					legendData[i].label = sap.util.frameNumber(legendData[i].min,category.formatType) + " - " + sap.util.frameNumber(legendData[i].max,category.formatType);
					legendData[i].color = colors[i];
					
					legend += sap.ui.svg.animateCircle({cx : legendOffset + 7, 
						cy : 2 + legendHeight/2, 
						r : legendHeight/2 - 4, 
						fill : legendData[i].color , 
						stroke : legendData[i].color
						});
					
					legendOffset += legendHeight;
					legend += sap.ui.svg.drawText({ x : legendOffset  , y : legendHeight-4 , style: "font-size:11;font-family:Arial;" , fill : "#989898" },legendData[i].label);
					legendOffset += sap.ui.svg.measureText(legendData[i].label) + 25;
	
				}
				
				
			} else {
				colors.reverse();
			}
			
			
			
			for ( var i = 0; i < data.length; i++ ) {
				
				var legendItem = null;
				var categoryValue = null;
				categoryValue = data[i][category.value];
				
				if ( userSegments ) {
					for ( var j = 0; j < segmentsCount; j++ ) {
						if ( categoryValue >= legendData[j].min && categoryValue < legendData[j].max ) {
							legendItem = legendData[j];
							break;
						}
					}
					if ( !legendItem )
						legendItem = legendData[segmentsCount-1];
				} else {
					
					legendItem = legendData[categoryValue];
					if ( !legendItem ) {
						legendItem = {};
						legendItem.label = categoryValue;
						legendItem.color = colors.pop();
						legendData[categoryValue] = legendItem;
		
						legend += sap.ui.svg.animateCircle({cx : legendOffset + 7, 
							cy : 2 + legendHeight/2, 
							r : legendHeight/2 - 4, 
							fill : legendItem.color , 
							stroke : legendItem.color
							});
						
						legendOffset += legendHeight;
						legend += sap.ui.svg.drawText({ x : legendOffset  , y : legendHeight-4 , style: "font-size:11;font-family:Arial;" , fill : "#989898" },sap.util.frameNumber(data[i][category.value],category.formatType));
		
						legendIndex++;
						legendOffset += sap.ui.svg.measureText(data[i][category.value]) + 15;
					}
				}
				
				
				
				svg += sap.ui.svg.animateCircle({cx : left + xOffset * (data[i][xAxis.value] - minX) , 
												cy : top + height - yOffset * (data[i][yAxis.value] - minY), 
												r : offsetBubbleRadius * ((data[i][bubble.value] - bubbleMin ) ) + 5, 
												fill : legendItem.color , 
												stroke : legendItem.color,
												"stroke-width" : 1,
												"fill-opacity":"0.9",
												onmouseover : "sap.ui.graph.BubbleChart.onBubbleOver(event,'"+mData.canvasId+"',"+i+");",
												onmouseout : "sap.ui.graph.BubbleChart.onBubbleOut(event);"
												});
			}
			
			svg += legend;
			
			if ( mData.showRange)
				svg += rangeLabelSVG;
	
			
			svg += "<g id=\"infoContainer\" class=\"bubbleInfoLabel\" style=\"font-size:11;font-family:Arial;display:none;\">";
			
			svg += "<path/>";
	
			svg += sap.ui.svg.createElement("text",{ id : "xAxisProperty" , fill : "#989898" , style : "" , x : "5" , y : "15"}, xAxis.displayLabel + " :");
			svg += sap.ui.svg.createElement("text",{ id : "xAxisValue" , fill : "#008ED2" , style : "font-weight:bold;" , x : "120" , y : "15"}, xAxis.displayLabel);
			
			svg += sap.ui.svg.createElement("text",{ id : "yAxisProperty" , fill : "#989898" , style : "" , x : "5" , y : "35"}, yAxis.displayLabel + " :");
			svg += sap.ui.svg.createElement("text",{ id : "yAxisValue" , fill : "#008ED2" , style : "font-weight:bold;" , x : "120" , y : "35"}, yAxis.displayLabel);
			
			svg += sap.ui.svg.createElement("text",{ id : "bubbleProperty" ,fill : "#989898" , style : "" , x : "5" , y : "55"}, bubble.displayLabel + " :");
			svg += sap.ui.svg.createElement("text",{ id : "bubbleValue" , fill : "#008ED2" , style : "font-weight:bold;" , x : "120" , y : "55"}, bubble.displayLabel);
			
			svg += sap.ui.svg.createElement("text",{ id : "categoryProperty" ,fill : "#989898" , style : "" , x : "5" , y : "75"}, category.displayLabel + " :");
			svg += sap.ui.svg.createElement("text",{ id : "categoryValue" , fill : "#008ED2" , style : "font-weight:bold;" , x : "120" , y : "75"}, category.displayLabel);
			
			
			svg += "</g>";
				
			}
		
		svg += sap.ui.svg.endSVG();
		
		mData.content.setContent("<div>"+svg+"</div>");

	};
	
	obj.onBubbleOver = function(event,chartId,dataIndex) {
		//obj.onBubbleOut(event);
		var mData = dict[chartId];
		var data = mData.data[dataIndex];
		
		var circle = event.target;
		circle.setAttribute("stroke","black");
		circle.setAttribute("stroke-width","1");
		
		var x = parseFloat(circle.getAttribute("cx"));
		var y = parseFloat(circle.getAttribute("cy"));
		var r = parseFloat(circle.getAttribute("r"));

		
		var hAlign = "right";
		var vAlign = "middle";
		
		var height = 80;
		var width = 200;
		var knobWidth = 10;
		
		var left = x - knobWidth - width;
		var top = y - height / 2;

		

		if ( left < mData.bounds.minX ) {
			hAlign = "left";
			left = x + knobWidth;
		}
		
		if ( top < mData.bounds.minY ) {
			vAlign = "top";
			left = x - (width/2);
			top  = y + knobWidth;
		} else if ( top + height > mData.bounds.maxY ) {
			vAlign = "bottom";
			left = x - (width/2);
			top = y - height - knobWidth;
		}

		var svg = circle.parentNode;
		var container = svg.getElementById("infoContainer");
		container.style.display = 'block';
		//container.setAttribute("style","display:block");
		container.setAttribute("transform","translate("+left+","+top +")");
		
		left = 0;
		top = 0;

		var points = "M"+left + " " + top ;
		if ( vAlign == "top" ) {
			points += " L"+ ( left - knobWidth + (width/2)) + " " + top;
			points += " L"+ ( left + (width/2)) + " " + (top - knobWidth);
			points += " L"+ ( left + knobWidth + (width/2)) + " " + top;
		}
		points += " L"+ ( left + width) + " " + top;
		
		if ( hAlign == "right" ) {
			points += " L"+ (left + width) + " " + (top - knobWidth + (height/2));
			points += " L"+ ( left + width + knobWidth) + " " + (top + (height/2));
			points += " L"+ (left + width) + " " + (top + knobWidth + (height/2));
		}
		points += " L"+ ( left + width) + " " + (top + height);
		
		if ( vAlign == "bottom" ) {
			points += " L"+ ( left + knobWidth + (width/2)) + " " + (top + height);
			points += " L"+ ( left + (width/2)) + " " + (top + height + knobWidth);
			points += " L"+ ( left - knobWidth + (width/2)) + " " + (top + height);
		}
		points += " L"+ left + " " + (top + height);
		
		if ( hAlign == "left" ) {
			points += " L"+ ( left ) + " " + (top + height/2 + knobWidth);
			points += " L"+ ( left - knobWidth) + " " + (top + height/2 );
			points += " L"+ ( left ) + " " + (top + height/2 - knobWidth);
		}
		points += " L"+ left + " " + top;
		points += " Z";
		

		var path = svg.getElementsByTagName("path")[0];
		//var path = document.createElement("path");
		//path.setAttribute("id",chartId +dataIndex + "info");
		path.setAttribute("d",points);
		path.setAttribute("fill","white");
		path.setAttribute("stroke","#97D1E8");
		path.setAttribute("stroke-width","1");
		
		svg.getElementById("xAxisValue").textContent = data[mData.xAxis.value];
		svg.getElementById("yAxisValue").textContent = data[mData.yAxis.value];
		svg.getElementById("bubbleValue").textContent = data[mData.bubble.value];
		svg.getElementById("categoryValue").textContent = sap.util.frameNumber(data[mData.category.value],mData.category.formatType);
		
		
	};
	
	obj.onBubbleOut = function(event) {
		var svg = event.target.parentNode;
		var container = svg.getElementById("infoContainer");
		container.style.display = 'none';
		event.target.setAttribute("stroke",event.target.getAttribute("fill"));
		event.target.setAttribute("stroke-width","1");

		//container.setAttribute("style","display:none");
	};

	obj.clear = function(canvas,context) {
		if ( canvas != null && context != null )
			context.clearRect(0,0,canvas.width,canvas.height);
	};
	
	return obj;
})();

sap.ui.graph.TimeLineChart = (function(){
	var obj = {};
	var count = 1;
	var colors = [{ color : "#9DC869" , style : "tllegend1" } ,
	              { color : "#26ABCE",  style : "tllegend2" } ,
	              { color : "#F99E53",  style : "tllegend3" },
	              { color : "#A25482" , style : "tllegend4" },
	              { color : "#415E79" , style : "tllegend5" }];

	obj.colors = colors;
	
	obj.create = function(metaData,mData) {
			if ( !mData )
				mData = {};
			
		 	var graph = new sap.ui.core.HTML({ width : metaData.width + "px" , afterRendering : function(event){
		    	  obj.render(mData);
 		 	}});
		 	graph.setContent("<div width=\""+metaData.width+"\" height=\""+metaData.height+"\" ><canvas id=\"tlccanvas"+count+"\" class=\"tlccanvas"+count+"\" width=\""+metaData.width+"\" height=\""+metaData.height+"\" ></canvas></div>");

		 	mData.content = graph;
		 	mData.width = metaData.width;
		 	mData.height = metaData.height;
		 	mData.canvasId = "tlccanvas"+count;
		 	mData.messageGap = 20;
		 	mData.activityGap = 40;
		 	mData.allowFullScreen = metaData.allowFullScreen;
		 	mData.setData = function(data) {
		 		if ( mData.data != data ) {
		 			mData.data = data;
		 			mData.dataChangeFlag = true;
		 		}
		 	};
		 	
		 	count++;

		 	return mData;
	};
	
	obj.openFullScreen = function(data) {
		
		var height = data.measuredHeight;
		
		if( height < window.screen.height )
			height = window.screen.height;
		
		var mData = obj.create({ width : window.screen.width , height : height});
		mData.data = data.data;
		mData.frequency = data.frequency;
		mData.dateField = data.dateField;
		mData.typeField = data.typeField;
		mData.activityField = data.activityField;
		mData.colors = data.colors;
	 	mData.allowFullScreen = false;
	 	
	 	var oOverlayContainer = new sap.ui.ux3.OverlayContainer({ openButtonVisible : false , close : function(event){
	    	oOverlayContainer.removeAllContent();
		  }});
    	  
	 	var layout = new sap.ui.commons.layout.HorizontalLayout({ width : window.screen.width + "px" , height : height + "px" });
	 	layout.addContent(mData.content);
    	  oOverlayContainer.addContent(layout);
    	  oOverlayContainer.open();
    	  
    	  obj.render(mData);

	};
	
	_getPeriod = function(item,mData) {
		if ( mData.frequency == "Y" )
			return item[mData.dateField].getFullYear();
		if ( mData.frequency == "M" )
			return item[mData.dateField].getMonthName() + " " + item[mData.dateField].getFullYear();
		if ( mData.frequency == "D" )
			return item[mData.dateField].getDate() + "/" + item[mData.dateField].getMonth() + "/" + item[mData.dateField].getFullYear();
	},

	obj.render = function(mData) {
//		if ( mData.dataChangeFlag ) {
			obj._render(mData,true);
//			mData.dataChangeFlag = false;
//		}
	},

	obj._render = function(mData,measure) {
		
		if ( !mData || !mData.data )
			return;
		
		var data = mData.data;
		
		var canvasId = mData.canvasId;

		var canvas = document.getElementById(canvasId);
		var context = canvas.getContext('2d');

		
		if ( !canvas )	return;
		
		obj.clear(canvas,context);

		if ( data.length == 0 )	return;
		
		data.sort(function(a,b){
			return (b[mData.dateField]).getTime() - (a[mData.dateField]).getTime();
		});
		
		var graphData = {};
		var graphArray = [];
		
		for ( var i = 0; i < data.length; i++ ) {
			var period = _getPeriod(data[i],mData);
			
			var periodObj = null;
			periodObj = graphData[period];
			
			if ( !periodObj ) {
				periodObj = { period : period , activities : [] };
				graphData[period] = periodObj;
				graphArray.push(periodObj);
			}
			
			periodObj.activities.push(data[i]);
			
		}
		
		
		
		
		var left = 2;
		var top = 2;
		
		var width = canvas.width - 2*left;
		var height = canvas.height - 2*top;
		
//		var fullScrRect = {x:0,y:10,width:20,height:20};
		
//		if ( mData.allowFullScreen ) {
//			fullScrRect.x = left + width - 20;
//			sap.ui.canvas.drawImage(context,"images/full_screen_24.png",fullScrRect.x,fullScrRect.y);
//			
//		}
//		$("#"+canvasId).click(function(event){
//			if ( mData.allowFullScreen ) {
//				var x;
//				var y;
//				if ( event.offsetX != undefined )
//					x = event.offsetX;
//				else
//					x = event.layerX;
//	
//				if ( event.offsetY != undefined )
//					y = event.offsetY;
//				else
//					y = event.layerY;
//				
//				if ( x >= fullScrRect.x && x <= fullScrRect.x + fullScrRect.width && y >= fullScrRect.y && y <= fullScrRect.y + fullScrRect.height ) {
//					obj.openFullScreen(mData);
//				}
//			
//			}
//		});

		
		var currentX = width / 2 + left;

	 	mData.activityWidth = ((mData.width - 2 )/2 - mData.messageGap) * 0.8;

		var currentY = 10;
		var periodHeight = 20;
		var activityGap = mData.activityGap;
		
		var directionCounter = 0;
		
		for ( var i = 0; i < graphArray.length; i++ ) {
			var periodObj = graphArray[i];
			obj.renderPeriod(context,{x:currentX,y:currentY,height:periodHeight},periodObj.period);
			currentY += periodHeight;
			
			context.beginPath();
			context.moveTo(currentX,currentY );
			context.lineTo(currentX,currentY+activityGap );
			context.lineWidth = 1;
			context.fillStyle = "#CECAC5";
			context.strokeStyle = "#CECAC5";
			context.stroke();

			
			for ( var j = 0; j < periodObj.activities.length; j++ ) {
				currentY = currentY+activityGap;
				obj.renderActivity(context,{x:currentX,y:currentY},periodObj.activities[j],(directionCounter%2==0?true:false),mData);
				directionCounter++;
			}
			currentY = currentY+activityGap;

		}
		
		mData.measuredHeight = currentY + 20;
		
		if ( mData.measuredHeight > mData.height ) {
		}
		
	};
	
	

	obj.renderPeriod = function(context,rect,period) {
		context.font="10px Arial";
		rect.width = context.measureText(period).width + 20;
		
		rect.x -= rect.width / 2;
		
		sap.ui.canvas.drawRect(context,rect,{strokeStyle : "#CECAC5" , lineWidth : 1 });
		
		context.fillStyle="#CECAC5";
		context.lineWidth=1;
		context.fillText(period,rect.x + 10,rect.y + 15);
	};

	obj.renderActivity = function(context,point,activity,left,mData) {
		var messageGap = 40;
		
		var activityGap = mData.activityGap;
		var activityWidth = mData.activityWidth;
		
		context.beginPath();
		context.moveTo(point.x,point.y );
		context.lineTo(point.x,point.y+activityGap );
		context.lineWidth = 1;
		context.fillStyle = '#CECAC5';
		context.strokeStyle = '#CECAC5';
		context.stroke();
		
		var color = mData.colors[activity[mData.typeField]];


		
		var rect = {};
		
		context.font="11px Arial";
		
		var text = activity[mData.activityField];
		if ( !text )
			text = " ";
		var measureRect = sap.ui.canvas.wrapText(context, text, {x:0,y:0,width:activityWidth - 5,height:25},true);
		measureRect.width += 10;
		measureRect.height += 10;

		measureRect.y = point.y - (measureRect.height/2);
		
		if ( left ) {
			measureRect.x = point.x - measureRect.width - messageGap;
			
			context.beginPath();
			context.moveTo(point.x,point.y );
			context.lineTo(point.x-messageGap,point.y );
			context.lineWidth = 1;
			context.strokeStyle = '#CECAC5';
			context.fillStyle = '#CECAC5';
			context.stroke();

			
		} else {
			measureRect.x = point.x + messageGap;

			context.beginPath();
			context.moveTo(point.x,point.y );
			context.lineTo(point.x+messageGap,point.y );
			context.lineWidth = 1;
			context.strokeStyle = '#CECAC5';
			context.fillStyle = '#CECAC5';
			context.stroke();
		}

		sap.ui.canvas.drawCircle(context,point, 3,{fillStyle:color.color , strokeStyle : color.color});

		
		//sap.ui.canvas.drawRect(context,measureRect,{fillStyle : "#DBE6E9"});
		sap.ui.canvas.drawRect(context,measureRect,{strokeStyle : "#CECAC5" , lineWidth : 1 });

		context.beginPath();
		context.moveTo(measureRect.x,measureRect.y + measureRect.height );
		context.lineTo(measureRect.x+measureRect.width,measureRect.y + measureRect.height );
		context.lineWidth = 2;
		context.strokeStyle = color.color;
		context.fillStyle = color.color;
		context.stroke();
		
		
		sap.ui.canvas.wrapText(context, activity[mData.dateField].getDateMonthYear(), {x:measureRect.x + 5,y:measureRect.y+14,width:measureRect.width,height:20},false,{ strokeStyle : "#CECAC5" , fillStyle : "#CECAC5"});
		
		sap.ui.canvas.wrapText(context, text, {x:measureRect.x + 5,y:measureRect.y+29,width:measureRect.width-5,height:15},false,{ strokeStyle : "black" , fillStyle : "black"});
		
	};

	obj.clear = function(canvas,context) {
		if ( canvas != null && context != null )
			context.clearRect(0,0,canvas.width,canvas.height);
	};
	
	return obj;
})();


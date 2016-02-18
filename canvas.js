
if(!sap){
	var sap={};
}

if ( !sap.ui ) {
	sap.ui = {};
}


sap.ui.canvas = (function(){
	
	var obj = {};
	
	obj.drawImage = function(context,src,x,y) {
		var img = new Image();
		

		img.onload = function() {
			context.drawImage(img,x,y);
		};
		img.src = src;
	};
	
	obj.drawCircle = function(context,point, radius,settings) {
		if ( !settings ) {
			settings = {fillStyle : 'green' , strokeStyle : 'green' , lineWidth : 1};
		}
		
		context.beginPath();
		context.arc(point.x, point.y, radius, 0, 2 * Math.PI, false);
		context.fillStyle = settings.fillStyle;
		context.fill();
		context.lineWidth = 3;
		context.strokeStyle = settings.strokeStyle;
		context.stroke();
				
	};
	
	obj.wrapText = function(context, text, rect,measure,settings) {
		
		if ( !text )
			return null;
		
		if ( !settings ) {
			settings = {fillStyle : 'green' , strokeStyle : 'green' , lineWidth : 1};
		}
		var words = text.split(' ');
		var line = '';
		var lineHeight = rect.height;

		if ( !measure )
			context.fillStyle = settings.fillStyle;

		for(var n = 0; n < words.length; n++) {
			var currentLine = line + words[n] + ' ';
			var metrics = context.measureText(currentLine);
			if (metrics.width > rect.width && n > 0) {
				if (!measure)
					context.fillText(line, rect.x, rect.y);
				line = words[n] + ' ';
				if (measure)
					rect.height += lineHeight;
				else
					rect.y += lineHeight;
			} else {
				line = currentLine;
			}
		}
		if (!measure)
			context.fillText(line, rect.x, rect.y);
        
		return rect;
      };
	
	obj.drawRect = function(context,rect,settings) {
		if ( !settings ) {
			settings = {fillStyle : '#A9D0F5' , strokeStyle : 'black' , lineWidth : 1};
		}
				
		if ( settings.fillStyle ) {
			context.fillStyle = settings.fillStyle;
			context.fillRect(rect.x,rect.y,rect.width,rect.height);
		}
		
		if ( settings.strokeStyle ) {
			context.strokeStyle = settings.strokeStyle;
			context.lineWidth = settings.lineWidth;
			context.strokeRect(rect.x,rect.y,rect.width,rect.height);
		}
		
		
	};
	
	obj.animateRect = function(context,rect,settings,direction,order) {
		var finalRect;
		var offset;
		var count = 30;
		if ( direction == "horizontal") {
			offset = (rect.width + 1) / count;
			finalRect = { x : rect.x , y : rect.y , width : offset +0.5 , height : rect.height };
		}else if ( direction == "vertical") {
			offset = (rect.height + 1) / count;
			finalRect = { x : rect.x , y : rect.y , width : rect.width , height : offset +0.5 };
		}
		
		offset = offset * order;
		
		var fun = function(context,finalRect,settings,count,direction,offset) {
			if ( count == 0 ){
				if ( direction == "horizontal" ) {
					finalRect.width -=0.5;
				}else if ( direction == "vertical" ) {
					finalRect.height -=0.5;
				}
			}
			obj.drawRect(context,finalRect,settings);
			count--;
			if ( count > 0 ){
				if ( direction == "horizontal" ) {
					finalRect.x +=offset;
				}else if ( direction == "vertical" ) {
					finalRect.y +=offset;
				}
				setTimeout(function(){
					fun(context,finalRect,settings,count,direction,offset);
					
				},25);
			}
		};
		

		fun(context,finalRect,settings,count,direction,offset);
	};

	
	return obj;
})();

	
sap.ui.svg = (function(){
	var obj = {};
	obj.startSVG = function(width,height) {
		return "<svg width=\""+width+"\" height=\""+height+"\">";
	};
	
	obj.endSVG = function() {
		return "</svg>";
	};
	
	obj.measureText = function(text,fontSize) {
		if ( text != undefined )
			text = text.toString();
		if ( !text || text.length == 0 )	return 0;
		if ( fontSize == undefined )
			fontSize = 11;
		fontSize--;
		return text.length * fontSize/2;
	};
	
	obj.drawText = function(attributes,label) {
		return obj.createElement("text",attributes,label);
		//return "<text x=\""+x+"\" y=\""+y+"\" fill=\""+color+"\" style=\"font-size:11;font-family:Arial;\" >"+text+"</text>";
	};
	
	obj.drawLine = function(x1,y1,x2,y2,color,lineWidth) {
		return "<line x1=\""+x1+"\" y1=\""+y1+"\" x2=\""+x2+"\" y2=\""+y2+"\" style=\"stroke:"+color+";stroke-width:"+lineWidth+"\" />";
	};

	obj.drawCircle = function(x,y,r,fillColor,strokeColor,lineWidth,mouseOver,mouseOut) {
		return "<circle cx=\""+x+"\" cy=\""+y+"\" r=\""+r+"\" fill=\""+fillColor+"\" stroke=\""+strokeColor+"\" stroke-width=\""+lineWidth+"\" onmouseover=\""+mouseOver+"\" onmouseout=\""+mouseOut+"\"/>";
	};
	
	obj.animateCircle = function(attributes) {
//		return "<circle cx=\""+x+"\" cy=\""+y+"\" r=\""+0+"\" fill=\""+fillColor+"\" stroke=\""+strokeColor+"\" stroke-width=\""+lineWidth+"\" onmouseover=\""+mouseOver+"\" onmouseout=\""+mouseOut+"\">"+
//				"<animate attributeName=\"r\" attributeType=\"XML\" begin=\"0s\" dur=\"1s\" fill=\"freeze\" from=\"0\" to=\""+r+"\" /></circle>";
		var animation = obj.createAnimation({ attributeName : "r" , attributeType : "XML" , begin : "0s" , dur : "1s" ,fill : "freeze" , from : "0" ,to : attributes.r });
		attributes.r = "0";
		return obj.createElement("circle",attributes,animation);
	};

	obj.drawPath = function(attributes) {
		return obj.createElement("path",attributes);
	};
	
	obj.createAnimation = function(attributes) {
		return obj.createElement("animate",attributes);
	};
	
	obj.createElement = function(elementName,attributes,content) {
		var str = "<" + elementName;
		for ( attribute in attributes ) {
			str += " " + attribute + "=\"" + attributes[attribute] + "\"";
		}
		
		if ( content == undefined ) {
			str += "/>";
		} else {
			str += ">" + content + "</" + elementName + ">";
		}
		return str;
		
	};
	
	

	return obj;
})();

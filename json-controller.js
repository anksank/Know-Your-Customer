if(!sap){
	var sap={};
}
//.............................................



sap.ui.core.BusyIndicator.attachOpen(function(oEvent) {
    if (sap.ui.getCore().getConfiguration().getTheme() == "sap_goldreflection") { // this line is a hack, the rest of this coding is what a BusyIndicator hijacker could do
        $Busy = oEvent.getParameter("$Busy");
        iBusyPageWidth = jQuery(document.body).width();
        $Busy.css("top", "0").css("width", iBusyPageWidth + "px");
        bBusyAnimate = true;
        iBusyLeft = $Busy[0].offsetLeft;
        window.setTimeout(animationStep, iBusyTimeStep);
    }
});
sap.ui.core.BusyIndicator.attachClose(function(oEvent) {
    bBusyAnimate = false;
});

var bBusyAnimate = false;
var iBusyLeft = 0;
var iBusyDelta = 60;
var iBusyTimeStep = 50;
var iBusyWidth = 500;
var iBusyPageWidth;
var $Busy;

function animationStep() {
    if (bBusyAnimate) {
        iBusyLeft += iBusyDelta;
        if (iBusyLeft > iBusyPageWidth) {
            iBusyLeft = -iBusyWidth;
        }
        $Busy.css("background-position", iBusyLeft + "px 0px");
        window.setTimeout(animationStep, iBusyTimeStep);
    }
}


sap.json = (function(){

	var object = {};
	
object.execute = function(json,method,callbacks) {
		
		url = "/sap/Wth/Server/self.xsjs";
		sap.ui.core.BusyIndicator.show();
		var startTime = new Date().getTime();

		try {
		$.ajax({
			url: url,
			type: method,
			data: json,
			dataType: "json",
			success: function(data) {
				sap.ui.core.BusyIndicator.hide();
				var totalTime = new Date().getTime() - startTime;
				callbacks(data,totalTime);
			},
			
			contentType: "json"
			});
		} catch (ex) {
			sap.ui.core.BusyIndicator.hide();
			throw new Error(10022, ex.message);
			callbacks("");
		}
	};
	
	
	return object;
	
})();

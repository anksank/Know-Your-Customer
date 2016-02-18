sap.ui.controller("Client.customer", {


/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
*/
   onInit: function() {
    sap.ui.globalParameters.customerPageControlCont = this;
     this.custSegmLoad();  
     that = this;  
	 
   },
   
   customerProfileHandler : function(event){
       var control = sap.ui.globalParameters.customerPageControlCont;
       var PassingParam = {};
      PassingParam.trending = true;
      var k = event.getSource().getAlt();
     // PassingParam.id = "C" + (20000 + parseInt(k)).toString();
      PassingParam.id = k;
      sap.ui.globalParameters.currentId = PassingParam.id;
      var that = this;
       var handler={};
      handler.callback=function(data){
            control.getView().createOverlay(data);
        };
      sap.json.execute(PassingParam,"GET",handler.callback); 
       
   },
   
   custSegmLoad : function(){
       var control = sap.ui.globalParameters.customerPageControlCont;
       var PassingParam = {};
      PassingParam.segCount = true;
      var that = this;
       var handler={};
      handler.callback=function(data){
            control.getView().renderSegmentation(data);
        };
      sap.json.execute(PassingParam,"GET",handler.callback); 
       
   },
   
   loadSegmentData : function(){
       
        var control = sap.ui.globalParameters.customerPageControlCont;
        sap.ui.globalParameters.segmentSelected = event.target.text;
        segment = event.target.text;
        var PassingParam = {};
        PassingParam.segment = segment;
        var that = this;
        var handler={};
        handler.callback=function(data){
            control.getView().renderNewProfiles(data);
        };
        sap.json.execute(PassingParam,"GET",handler.callback);
     
   },
  
   
   	



/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
*/
   onBeforeRendering: function() {
          
   },

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
*/
//   onAfterRendering: function() {
//
//   },

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
*/
//   onExit: function() {
//
//   }

});

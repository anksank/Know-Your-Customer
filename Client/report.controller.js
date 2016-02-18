sap.ui.controller("Client.report", {


/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
*/
   onInit: function() {
       
       this.buttonHandler();
       
   },
    buttonHandler : function (event){
        
        var PassingParam = {};
        var param1 = this.oDropdownBox1.getSelectedKey();
        var param2 = this.oDropdownBox2.getSelectedKey();
       PassingParam.year = param2;
       PassingParam.attr = param1;
       PassingParam.generateReport = true;
       var that = this;
       var handler={};
        handler.callback=function(data){
            that.getView().renderGraph(data);
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

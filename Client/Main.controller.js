sap.ui.controller("Client.Main", {


/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
*/
   onInit: function() {
	 
	 that = this;
	 this.getView().dashboardIcon.attachPress(that.dashboardHandler,that);
	 this.getView().productIcon.attachPress(that.productHandler,that);
	 this.getView().titleLogo.attachPress(that.homeHandler,that);
	 this.getView().customerIcon.attachPress(that.customerHandler, that);
	 this.getView().reportIcon.attachPress(that.reportHandler, that);
   },
   
   customerHandler : function(){
     this.getView().customerLoad();
   },
   
   dashboardHandler: function(event){
      this.getView().loadDashboard();
   },
   
   productHandler : function(event){

        this.getView().productLoad();
   },
   
   homeHandler : function (event){
        this.getView().homeLoad(); 
   },
   
   reportHandler : function (event){
        this.getView().reportLoad();
   }
   	



/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
*/
//   onBeforeRendering: function() {
//
//   },

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
